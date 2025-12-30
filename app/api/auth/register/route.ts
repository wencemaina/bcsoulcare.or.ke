import { NextRequest, NextResponse } from "next/server";
import {
	connectToDatabase,
	User,
	Session,
	MembershipTier,
} from "@/lib/mongodb";
import { hash } from "bcryptjs";
import { v4 as uuid } from "uuid";
import { SignJWT } from "jose";
import { ObjectId } from "mongodb";

const SECRET_KEY = new TextEncoder().encode(
	process.env.JWT_SECRET || "default-secret-key",
);

export async function POST(req: NextRequest) {
	try {
		const {
			firstName,
			lastName,
			email,
			password,
			phone,
			membershipTierId,
		} = await req.json();

		if (
			!firstName ||
			!lastName ||
			!email ||
			!password ||
			!membershipTierId
		) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 },
			);
		}

		const db = await connectToDatabase();

		// Check if user exists
		const existingUser = await db
			.collection<User>("users")
			.findOne({ email });
		if (existingUser) {
			return NextResponse.json(
				{ error: "User already exists" },
				{ status: 400 },
			);
		}

		// Validate tier
		const tier = await db
			.collection<MembershipTier>("membership_tiers")
			.findOne({ tierId: membershipTierId });
		if (!tier) {
			return NextResponse.json(
				{ error: "Invalid membership tier" },
				{ status: 400 },
			);
		}

		const hashedPassword = await hash(password, 12);
		const userId = uuid();

		const newUser: User = {
			userId: userId,
			firstName,
			lastName,
			name: `${firstName} ${lastName}`,
			email,
			password: hashedPassword,
			role: "user",
			isActive: true,
			isVerified: false,
			membershipTierId: tier.tierId,
			membershipTierName: tier.name,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		await db.collection<User>("users").insertOne(newUser);

		return NextResponse.json(
			{
				message: "User registered successfully",
				user: { ...newUser, password: undefined },
			},
			{ status: 201 },
		);
	} catch (error) {
		console.error("Error registering user:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
