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
			"application/pdf",
			"application/msword", // .doc
			"application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
			"application/vnd.ms-excel", // .xls
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
			"text/plain",
			"text/csv",
		];

		if (!allowedTypes.includes(file.type)) {
			return NextResponse.json(
				{
					error: "Invalid file type. Only PDF, Word, Excel, CSV, and Text files are allowed.",
				},
				{ status: 400 },
			);
		}

		// Validate file size (20MB max for docs)
		const maxSize = 20 * 1024 * 1024;
		if (file.size > maxSize) {
			return NextResponse.json(
				{ error: "File too large (Max 20MB)" },
				{ status: 400 },
			);
		}

		// Generate unique filename
		const timestamp = Date.now();
		// Sanitize filename: replace spaces with hyphens, remove special chars
		const sanitizedOriginalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "-");
		const fileName = `documents/${timestamp}-${sanitizedOriginalName}`;

		// Convert file to buffer
		const buffer = Buffer.from(await file.arrayBuffer());

		// Upload to R2
		await s3Client.send(
			new PutObjectCommand({
				Bucket: process.env.R2_BUCKET_NAME,
				Key: fileName,
				Body: buffer,
				ContentType: file.type,
				// Documents might change, maybe standard cache or no-cache?
				// Let's stick to 1 year for immutable named files, but if we overwrite we might have issues.
				// Our naming convention uses timestamp so it's immutable.
				CacheControl: "public, max-age=31536000",
			}),
		);

		// Construct public URL
		const documentUrl = `${process.env.R2_PUBLIC_URL}/${fileName}`;

		return NextResponse.json({ url: documentUrl });
	} catch (error) {
		console.error("Error uploading document to R2:", error);
		return NextResponse.json({ error: "Upload failed" }, { status: 500 });
	}
}
