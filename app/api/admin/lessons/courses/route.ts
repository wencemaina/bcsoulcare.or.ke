import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
	try {
		const db = await connectToDatabase();
		const coursesCollection = db.collection("courses");

		// Fetch courses that are draft or published (exclude archived)
		const courses = await coursesCollection
			.find({ status: { $in: ["draft", "published"] } })
			.project({
				courseId: 1,
				title: 1,
				modules: 1, // Include modules array
			})
			.sort({ title: 1 })
			.toArray();

		// Log to debug
		console.log("Fetched courses:", courses.length);
		if (courses.length > 0) {
			console.log("First course modules:", courses[0].modules);
		}

		return NextResponse.json({ courses });
	} catch (error) {
		console.error("Error fetching courses:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
