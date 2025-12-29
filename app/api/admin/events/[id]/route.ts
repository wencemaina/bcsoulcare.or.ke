import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;
		const db = await connectToDatabase();
		const eventsCollection = db.collection("events");

		const event = await eventsCollection.findOne({ eventId: id });

		if (!event) {
			return NextResponse.json(
				{ error: "Event not found" },
				{ status: 404 },
			);
		}

		return NextResponse.json({ event });
	} catch (error) {
		console.error("Error fetching event:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}

export async function PUT(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;
		const updateData = await req.json();

		const db = await connectToDatabase();
		const eventsCollection = db.collection("events");

		// Remove fields that shouldn't be updated directly
		const { _id, eventId, createdAt, createdBy, ...allowedUpdates } =
			updateData;

		// Add update timestamp
		const now = new Date();
		const mockUserId = new ObjectId(); // TODO: Get from session

		// Convert date string to Date object if present
		if (allowedUpdates.date) {
			allowedUpdates.date = new Date(allowedUpdates.date);
		}

		// Convert numeric fields
		if (allowedUpdates.maxSpots) {
			allowedUpdates.maxSpots = parseInt(allowedUpdates.maxSpots);
		}
		if (allowedUpdates.price !== undefined) {
			allowedUpdates.price = parseFloat(allowedUpdates.price);
		}

		const result = await eventsCollection.updateOne(
			{ eventId: id },
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
				{ error: "Event not found" },
				{ status: 404 },
			);
		}

		return NextResponse.json({ message: "Event updated successfully" });
	} catch (error) {
		console.error("Error updating event:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}

export async function DELETE(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;
		const db = await connectToDatabase();
		const eventsCollection = db.collection("events");

		const result = await eventsCollection.deleteOne({ eventId: id });

		if (result.deletedCount === 0) {
			return NextResponse.json(
				{ error: "Event not found" },
				{ status: 404 },
			);
		}

		return NextResponse.json({ message: "Event deleted successfully" });
	} catch (error) {
		console.error("Error deleting event:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
