import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { randomBytes } from "crypto";

// Helper to generate a random 8-character string for courseId
function generateCourseId(): string {
	return randomBytes(4).toString("hex");
}

export async function GET() {
	try {
		const db = await connectToDatabase();
		const coursesCollection = db.collection("courses");

		const courses = await coursesCollection
			.find({})
			.sort({ createdAt: -1 })
			.toArray();

		return NextResponse.json({ courses });
	} catch (error) {
		console.error("Error fetching courses:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}

export async function POST(req: NextRequest) {
	try {
		const {
			title,
			slug,
			description,
			shortDescription,
			thumbnail,
			coverImage,
			category,
			tags,
			skillLevel,
			language,
			instructorName,
			accessType,
			price,
			modules,
			learningOutcomes,
			status,
		} = await req.json();

		const client = await connectToDatabase();
		const coursesCollection = client.collection("courses");

		// Basic validation
		if (!title || !slug || !description) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 },
			);
		}

		// Check for duplicate slug
		const existingCourse = await coursesCollection.findOne({ slug });
		if (existingCourse) {
			return NextResponse.json(
				{ error: "A course with this slug already exists" },
				{ status: 409 },
			);
		}

		const courseId = generateCourseId();
		const now = new Date();

		// TODO: Get actual user ID from session when auth is fully integrated
		// For now, we'll use a placeholder or assume the request includes it if strictly needed,
		// but the prompt didn't strictly require auth check implementation details in this file yet.
		// We'll create a new ObjectId for createdBy to satisfy the interface for now.
		const mockUserId = new ObjectId();

		const newCourse = {
			courseId,
			title,
			slug,
			description,
			shortDescription,
			thumbnail,
			coverImage,
			category,
			tags: tags || [],
			skillLevel,
			language: language || "English",
			instructorId: mockUserId, // value to be updated with real auth
			instructorName,
			requiredTierIds: [], // Default empty
			isPremium: accessType !== "free", // true if membership or paid
			price: accessType === "paid" && price ? parseFloat(price) : 0,
			modules: modules || [],
			learningOutcomes: learningOutcomes || [],
			prerequisites: [],
			status: status || "draft",
			isPublished: status === "published",
			publishedAt: status === "published" ? now : undefined,
			enrollmentCount: 0,
			completionRate: 0,
			averageRating: 0,
			reviewCount: 0,
			createdAt: now,
			updatedAt: now,
			createdBy: mockUserId,
			lastModifiedBy: mockUserId,
		};

		const result = await coursesCollection.insertOne(newCourse);

		return NextResponse.json(
			{
				message: "Course created successfully",
				courseId: courseId,
				_id: result.insertedId,
			},
			{ status: 201 },
		);
	} catch (error) {
		console.error("Error creating course:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
