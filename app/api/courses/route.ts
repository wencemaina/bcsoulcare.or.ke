import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
	try {
		const db = await connectToDatabase();
		const coursesCollection = db.collection("courses");

		const courses = await coursesCollection
			.find({ status: "published" })
			.project({
				courseId: 1,
				title: 1,
				slug: 1,
				description: 1,
				shortDescription: 1,
				thumbnail: 1,
				category: 1,
				tags: 1,
				skillLevel: 1,
				language: 1,
				instructorName: 1,
				isPremium: 1,
				price: 1,
				enrollmentCount: 1,
				averageRating: 1,
				reviewCount: 1,
			})
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
