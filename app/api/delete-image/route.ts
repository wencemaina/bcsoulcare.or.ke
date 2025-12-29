import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

// Initialize S3 client
const s3Client = new S3Client({
	region: "auto",
	endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
	credentials: {
		accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
		secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
	},
});

export async function DELETE(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const imageUrl = searchParams.get("url");

		if (!imageUrl) {
			return NextResponse.json(
				{ success: false, error: "Image URL is required" },
				{ status: 400 },
			);
		}

		// Extract the key from the full URL
		// Example URL: https://pub-xxx.r2.dev/images/filename.jpg
		// Key should be: images/filename.jpg
		let key;
		try {
			const urlObj = new URL(imageUrl);
			// Remove the leading slash
			key = urlObj.pathname.substring(1);
		} catch (e) {
			// Fallback if URL parsing fails: assume it might be just the key or construct differently
			key = imageUrl.split("/").pop();
		}

		// If the URL is just the path (e.g. /images/...) because next/image usage
		if (imageUrl.startsWith("/")) {
			key = imageUrl.substring(1);
		}

		// Skip deletion for placeholder images or if key couldn't be determined
		if (!key || key === "placeholder.svg" || key.includes("placeholder")) {
			return NextResponse.json({ success: true });
		}

		// Ensure we decoding any URI components (spaces, etc)
		key = decodeURIComponent(key);

		const command = new DeleteObjectCommand({
			Bucket: process.env.R2_BUCKET_NAME,
			Key: key,
		});

		await s3Client.send(command);

		return NextResponse.json({
			success: true,
			message: "Image deleted successfully",
		});
	} catch (error: any) {
		console.error("Error deleting image:", error);
		return NextResponse.json(
			{
				success: false,
				error: "Failed to delete image",
				message: error.message,
			},
			{ status: 500 },
		);
	}
}
