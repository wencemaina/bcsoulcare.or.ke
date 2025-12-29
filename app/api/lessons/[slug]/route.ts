import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(
	req: NextRequest,
	{ params }: { params: { slug: string } },
) {
	try {
		const { slug } = params;
		const db = await connectToDatabase();
		const lessonsCollection = db.collection("lessons");

		const lesson = await lessonsCollection.findOne({
			slug,
			status: "published",
			isPublished: true,
		});

		if (!lesson) {
			return NextResponse.json(
				{ error: "Lesson not found" },
				{ status: 404 },
			);
		}

		// Increment view count
		await lessonsCollection.updateOne(
			{ lessonId: lesson.lessonId },
			{ $inc: { viewCount: 1 } },
		);

		return NextResponse.json({ lesson });
	} catch (error) {
		console.error("Error fetching lesson:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
