import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { randomBytes } from "crypto";

// Helper to generate a random 8-character string for lessonId
function generateLessonId(): string {
	return randomBytes(4).toString("hex");
}

export async function POST(req: NextRequest) {
	try {
		const {
			courseId,
			moduleId,
			title,
			slug,
			content,
			excerpt,
			order,
			duration,
			status,
		} = await req.json();

		const db = await connectToDatabase();
		const lessonsCollection = db.collection("lessons");

		// Basic validation
		if (!courseId || !moduleId || !title || !slug || !content) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 },
			);
		}

		// Check for duplicate slug within the same course
		const existingLesson = await lessonsCollection.findOne({
			courseId,
			slug,
		});
		if (existingLesson) {
			return NextResponse.json(
				{
					error: "A lesson with this slug already exists in this course",
				},
				{ status: 409 },
			);
		}

		const lessonId = generateLessonId();
		const now = new Date();

		// TODO: Get actual user ID from session when auth is fully integrated
		const mockUserId = new ObjectId();

		const newLesson = {
			lessonId,
			courseId,
			moduleId,
			title,
			slug,
			content,
			excerpt: excerpt || "",
			order: order || 0,
			duration: duration ? parseInt(duration) : 0,
			status: status || "draft",
			isPublished: status === "published",
			publishedAt: status === "published" ? now : undefined,
			viewCount: 0,
			completionCount: 0,
			createdAt: now,
			updatedAt: now,
			createdBy: mockUserId,
			lastModifiedBy: mockUserId,
		};

		const result = await lessonsCollection.insertOne(newLesson);

		return NextResponse.json(
			{
				message: "Lesson created successfully",
				lessonId: lessonId,
				_id: result.insertedId,
			},
			{ status: 201 },
		);
	} catch (error) {
		console.error("Error creating lesson:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
