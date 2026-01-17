import { NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// Separate function to call the delete-image API logic internally
// so we don't have to make an HTTP request to our own API
async function deleteImageFromR2(imageUrl: string) {
	try {
		const url = new URL(
			process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
		); // Base URL fallback
		const deleteUrl = new URL("/api/delete-image", url);
		deleteUrl.searchParams.set("url", imageUrl);

		// In a real server-side context, it's often better to import the logic directly
		// to avoid self-signed cert issues or network overhead, but for simplicity/modularity
		// we can fetch the route if the environment allows.
		// HOWEVER, importing the function from route.ts is tricky in Next.js App Router
		// because of how exports work.

		// ALTERNATIVE: Re-implement the S3 delete logic here or move it to a shared lib.
		// Let's re-implement for safety and zero-network overhead.

		// NOTE: We need to dynamically import/require to avoid build-time issues if deps are missing,
		// but since we installed the SDK, we can use it.
		const { S3Client, DeleteObjectCommand } = await import(
			"@aws-sdk/client-s3"
		);

		const s3Client = new S3Client({
			region: "auto",
			endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
			credentials: {
				accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
				secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
			},
		});

		let key;
		try {
			const urlObj = new URL(imageUrl);
			key = urlObj.pathname.substring(1);
		} catch (e) {
			key = imageUrl.split("/").pop();
		}

		if (imageUrl.startsWith("/")) {
			key = imageUrl.substring(1);
		}

		if (!key || key === "placeholder.svg" || key.includes("placeholder")) {
			return;
		}

		const command = new DeleteObjectCommand({
			Bucket: process.env.R2_BUCKET_NAME,
			Key: decodeURIComponent(key),
		});

		await s3Client.send(command);
		console.log(`Deleted image from R2: ${key}`);
	} catch (error) {
		console.error("Failed to delete image from R2:", error);
		// We generally don't want to stop the blog deletion if image deletion fails,
		// but logging it is critical.
	}
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;

		if (!id) {
			return Response.json(
				{ error: "Blog ID is required" },
				{ status: 400 },
			);
		}

		const db = await connectToDatabase();

		// Find by either _id (if valid ObjectId) or our custom blogId
		let query;
		if (ObjectId.isValid(id)) {
			query = { _id: new ObjectId(id) };
		} else {
			query = { blogId: id }; // Fallback to custom ID if used
		}

		// 1. Get the blog post first to find the image URL
		const blogPost = await db.collection("blogs").findOne(query);

		if (!blogPost) {
			return Response.json(
				{ error: "Blog post not found" },
				{ status: 404 },
			);
		}

		// 2. Delete the image from Cloudflare R2 if it exists
		const imageUrlsToDelete: string[] = [];
		if (blogPost.image) {
			imageUrlsToDelete.push(blogPost.image);
		}

		// Extract images from content
		if (blogPost.content) {
			const imgRegex = /<img[^>]+src="([^">]+)"/g;
			let match;
			while ((match = imgRegex.exec(blogPost.content)) !== null) {
				const url = match[1];
				// Only delete if it's an R2 URL (prevents deleting external images or data URIs if any)
				if (url.includes("r2.cloudflarestorage.com") || url.includes(process.env.R2_PUBLIC_URL || "")) {
					imageUrlsToDelete.push(url);
				}
			}
		}

		// Delete all collected images
		await Promise.all(
			imageUrlsToDelete.map((url) => deleteImageFromR2(url)),
		);

		// 3. Delete the blog post from MongoDB
		const result = await db.collection("blogs").deleteOne(query);

		if (result.deletedCount === 0) {
			return Response.json(
				{ error: "Blog post not found" },
				{ status: 404 },
			);
		}

		return Response.json({
			message: "Blog post deleted successfully",
		});
	} catch (error) {
		console.error("Error deleting blog post:", error);
		return Response.json(
			{ error: "Failed to delete blog post" },
			{ status: 500 },
		);
	}
}
