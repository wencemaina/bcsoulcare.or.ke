import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { MembershipTier } from "@/types/database";

export async function GET() {
	try {
		const db = await connectToDatabase();
		const tiers = await db
			.collection<MembershipTier>("membership_tiers")
			.find({ status: "active" }) // Only fetch active tiers
			.sort({ price: 1 }) // Sort by price ascending
			.toArray();

		return NextResponse.json({ tiers });
	} catch (error) {
		console.error("Error fetching membership tiers:", error);
		return NextResponse.json(
			{ error: "Failed to fetch membership tiers" },
			{ status: 500 },
		);
	}
}
