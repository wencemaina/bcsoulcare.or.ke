import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
	try {
		const db = await connectToDatabase();
		const eventsCollection = db.collection("events");

		const events = await eventsCollection
			.find({ status: "published" })
			.sort({ date: 1 }) // Upcoming events first
			.toArray();

		return NextResponse.json({ events });
	} catch (error) {
		console.error("Error fetching events:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
