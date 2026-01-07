import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { auth } from "@/auth";

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
        const session = await auth();
        if (!session?.user || (session.user as any).role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

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
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "text/plain",
            "text/csv",
            "audio/mpeg", // mp3
            "audio/wav",
            "audio/ogg",
            "audio/mp4",
            "audio/x-m4a",
            "video/mp4",
            "video/mpeg",
            "video/webm",
            "image/jpeg",
            "image/png",
            "image/webp",
        ];

        if (!allowedTypes.includes(file.type)) {
            console.log("Rejected file type:", file.type);
            return NextResponse.json(
                {
                    error: "Invalid file type. Allowed: PDF, Word, Excel, CSV, Text, MP3, WAV, MP4, JPEG, PNG, WEBP.",
                },
                { status: 400 },
            );
        }

        // Validate file size (50MB max for resources)
        const maxSize = 50 * 1024 * 1024;
        if (file.size > maxSize) {
            return NextResponse.json(
                { error: "File too large (Max 50MB)" },
                { status: 400 },
            );
        }

        // Generate unique filename
        const timestamp = Date.now();
        const sanitizedOriginalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "-");
        const fileName = `resources/${timestamp}-${sanitizedOriginalName}`;

        // Convert file to buffer
        const buffer = Buffer.from(await file.arrayBuffer());

        // Upload to R2
        await s3Client.send(
            new PutObjectCommand({
                Bucket: process.env.R2_BUCKET_NAME,
                Key: fileName,
                Body: buffer,
                ContentType: file.type,
                CacheControl: "public, max-age=31536000",
            }),
        );

        // Construct public URL
        const resourceUrl = `${process.env.R2_PUBLIC_URL}/${fileName}`;

        return NextResponse.json({ url: resourceUrl });
    } catch (error) {
        console.error("Error uploading resource to R2:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
