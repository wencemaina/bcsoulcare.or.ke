import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
	try {
		const db = await connectToDatabase();
		const coursesCollection = db.collection("courses");

		// Fetch only necessary fields for the dropdown
		const courses = await coursesCollection
			.find({ status: { $ne: "archived" } })
			.project({
				courseId: 1,
				title: 1,
				modules: 1,
			})
			.sort({ title: 1 })
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
