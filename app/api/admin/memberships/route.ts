import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase, MembershipTier } from "@/lib/mongodb";
import { v4 as uuid } from "uuid";

const createTierSchema = z.object({
	name: z.string().min(2),
	description: z.string().min(10),
	price: z.number().min(0),
	billingCycle: z.enum(["monthly", "yearly", "one-time"]),
	features: z.array(z.string()),
	status: z.enum(["active", "archived"]),
});

export async function GET() {
	try {
		const db = await connectToDatabase();
		const tiers = await db
			.collection<MembershipTier>("membership_tiers")
			.find({})
			.sort({ createdAt: -1 })
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

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const validationResult = createTierSchema.safeParse(body);

		if (!validationResult.success) {
			return NextResponse.json(
				{ error: "Invalid input", details: validationResult.error },
				{ status: 400 },
			);
		}

		const data = validationResult.data;
		const db = await connectToDatabase();

		const newTier: MembershipTier = {
			tierId: uuid(),
			name: data.name,
			description: data.description,
			price: data.price,
			billingCycle: data.billingCycle,
			features: data.features,
			status: data.status,
			subscribersCount: 0,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		await db
			.collection<MembershipTier>("membership_tiers")
			.insertOne(newTier);

		return NextResponse.json({ tier: newTier }, { status: 201 });
	} catch (error) {
		console.error("Error creating membership tier:", error);
		return NextResponse.json(
			{ error: "Failed to create membership tier" },
			{ status: 500 },
		);
	}
}
