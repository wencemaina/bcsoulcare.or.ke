import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Initialize S3 client for Cloudflare R2
const s3Client = new S3Client({
	region: "auto",
	endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
	credentials: {
		accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
		secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
	},
});

export async function POST(request: Request) {
	try {
		const formData = await request.formData();
		const file = formData.get("file") as File;

		if (!file) {
			return NextResponse.json(
				{ error: "No file provided" },
				{ status: 400 },
			);
		}

		// Validate file type
		const allowedTypes = [
			"image/jpeg",
			"image/jpg",
			"image/png",
			"image/gif",
			"image/webp",
		];
		if (!allowedTypes.includes(file.type)) {
			return NextResponse.json(
				{ error: "Invalid file type" },
				{ status: 400 },
			);
		}

		// Validate file size (10MB max)
		const maxSize = 10 * 1024 * 1024;
		if (file.size > maxSize) {
			return NextResponse.json(
				{ error: "File too large" },
				{ status: 400 },
			);
		}

		// Generate unique filename
		const timestamp = Date.now();
		const randomString = Math.random().toString(36).substring(2, 15);
		const fileExtension = file.name.split(".").pop();
		const fileName = `images/${timestamp}-${randomString}.${fileExtension}`;

		// Convert file to buffer
		const buffer = Buffer.from(await file.arrayBuffer());

		// Upload to R2
		await s3Client.send(
			new PutObjectCommand({
				Bucket: process.env.R2_BUCKET_NAME,
				Key: fileName,
				Body: buffer,
				ContentType: file.type,
				CacheControl: "public, max-age=31536000", // 1 year cache
			}),
		);

		// Construct public URL
		const imageUrl = `${process.env.R2_PUBLIC_URL}/${fileName}`;

		return NextResponse.json({ url: imageUrl });
	} catch (error) {
		console.error("Error uploading image to R2:", error);
		return NextResponse.json({ error: "Upload failed" }, { status: 500 });
	}
}
