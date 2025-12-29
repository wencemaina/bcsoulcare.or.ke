import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { randomBytes } from "crypto";

// Helper to generate a random 8-character string for eventId
function generateEventId(): string {
	return randomBytes(4).toString("hex");
}

export async function GET() {
	try {
		const db = await connectToDatabase();
		const eventsCollection = db.collection("events");

		const events = await eventsCollection
			.find({})
			.sort({ date: -1 })
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

export async function POST(req: NextRequest) {
	try {
		const {
			title,
			slug,
			category,
			date,
			startTime,
			endTime,
			location,
			description,
			image,
			maxSpots,
			price,
			isFeatured,
			status,
		} = await req.json();

		const db = await connectToDatabase();
		const eventsCollection = db.collection("events");

		// Basic validation
		if (!title || !slug || !date) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 },
			);
		}

		// Check for duplicate slug
		const existingEvent = await eventsCollection.findOne({ slug });
		if (existingEvent) {
			return NextResponse.json(
				{ error: "An event with this slug already exists" },
				{ status: 409 },
			);
		}

		const eventId = generateEventId();
		const now = new Date();
		const mockUserId = new ObjectId(); // TODO: Get from session

		const newEvent = {
			eventId,
			title,
			slug,
			category: category || "fellowship",
			date: new Date(date),
			startTime: startTime || "",
			endTime: endTime || "",
			location: location || "",
			description: description || "",
			image: image || "",
			maxSpots: parseInt(maxSpots) || 0,
			registeredCount: 0,
			price: parseFloat(price) || 0,
			isFeatured: isFeatured || false,
			status: status || "draft",
			isPublished: status === "published",
			publishedAt: status === "published" ? now : undefined,
			createdAt: now,
			updatedAt: now,
			createdBy: mockUserId,
			lastModifiedBy: mockUserId,
		};

		const result = await eventsCollection.insertOne(newEvent);

		return NextResponse.json(
			{
				message: "Event created successfully",
				eventId: eventId,
				_id: result.insertedId,
			},
			{ status: 201 },
		);
	} catch (error) {
		console.error("Error creating event:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
