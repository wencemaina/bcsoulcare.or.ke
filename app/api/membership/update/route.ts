import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { User, MembershipTier } from "@/types/database";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 },
            );
        }

        const { tierId } = await req.json();

        if (!tierId) {
            return NextResponse.json(
                { error: "Missing membership tier ID" },
                { status: 400 },
            );
        }

        const db = await connectToDatabase();
        const userId = (session.user as any).userId;

        // Validate tier
        const tier = await db
            .collection<MembershipTier>("membership_tiers")
            .findOne({ tierId });

        if (!tier) {
            return NextResponse.json(
                { error: "Invalid membership tier" },
                { status: 400 },
            );
        }

        const user = await db.collection<User>("users").findOne({ userId });
        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 },
            );
        }

        // Calculate new subscription end date
        const now = new Date();
        let startDate = user.subscriptionStartDate || now;
        let endDate = user.subscriptionEndDate || now;

        // If user is renewing the same plan or upgrading/downgrading
        // and the current subscription is still active, we might want to append?
        // For simplicity, let's start from 'now' or 'current end date' if it's in the future.

        const baseDate = endDate > now ? endDate : now;
        const newEndDate = new Date(baseDate);

        if (tier.billingCycle === "monthly") {
            newEndDate.setMonth(baseDate.getMonth() + 1);
        } else if (tier.billingCycle === "yearly") {
            newEndDate.setFullYear(baseDate.getFullYear() + 1);
        } else if (tier.billingCycle === "one-time") {
            newEndDate.setFullYear(baseDate.getFullYear() + 100);
        }

        // Update user
        await db.collection<User>("users").updateOne(
            { userId },
            {
                $set: {
                    membershipTierId: tier.tierId,
                    membershipTierName: tier.name,
                    subscriptionStartDate: startDate > now ? now : startDate, // If expired, start from now
                    subscriptionEndDate: newEndDate,
                    subscriptionStatus: "active",
                    updatedAt: new Date(),
                },
            }
        );

        return NextResponse.json({
            message: "Membership updated successfully",
            endDate: newEndDate,
        });
    } catch (error) {
        console.error("Error updating membership:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 },
        );
    }
}
