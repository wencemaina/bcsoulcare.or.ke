import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(
	req: NextRequest,
	{ params }: { params: { id: string } },
) {
	try {
		const { id } = params;
		const db = await connectToDatabase();
		const coursesCollection = db.collection("courses");

		const course = await coursesCollection.findOne({ courseId: id });

		if (!course) {
			return NextResponse.json(
				{ error: "Course not found" },
				{ status: 404 },
			);
		}

		return NextResponse.json({ course });
	} catch (error) {
		console.error("Error fetching course:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}

export async function PUT(
	req: NextRequest,
	{ params }: { params: { id: string } },
) {
	try {
		const { id } = params;
		const updateData = await req.json();

		const db = await connectToDatabase();
		const coursesCollection = db.collection("courses");

		// Remove fields that shouldn't be updated directly
		const { _id, courseId, createdAt, createdBy, ...allowedUpdates } =
			updateData;

		// Add update timestamp
		const now = new Date();
		const mockUserId = new ObjectId(); // TODO: Get from session

		const result = await coursesCollection.updateOne(
			{ courseId: id },
			{
				$set: {
					...allowedUpdates,
					updatedAt: now,
					lastModifiedBy: mockUserId,
					isPublished: allowedUpdates.status === "published",
					publishedAt:
						allowedUpdates.status === "published" &&
						!updateData.publishedAt
							? now
							: updateData.publishedAt,
				},
			},
		);

		if (result.matchedCount === 0) {
			return NextResponse.json(
				{ error: "Course not found" },
				{ status: 404 },
			);
		}

		return NextResponse.json({ message: "Course updated successfully" });
	} catch (error) {
		console.error("Error updating course:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
