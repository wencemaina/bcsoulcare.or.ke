import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { NewsletterSubscription } from "@/types/database";

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();

        if (!email || !email.includes("@")) {
            return NextResponse.json(
                { error: "Please provide a valid email address." },
                { status: 400 },
            );
        }

        const db = await connectToDatabase();

        // Check if already subscribed
        const existing = await db
            .collection<NewsletterSubscription>("newsletter_subscriptions")
            .findOne({ email: email.toLowerCase() });

        if (existing) {
            if (existing.status === "active") {
                return NextResponse.json(
                    { message: "You are already subscribed to our newsletter!" },
                    { status: 200 },
                );
            } else {
                // Reactivate subscription
                await db.collection<NewsletterSubscription>("newsletter_subscriptions").updateOne(
                    { email: email.toLowerCase() },
                    { $set: { status: "active", subscribedAt: new Date() } }
                );
                return NextResponse.json(
                    { message: "Welcome back! Your subscription has been reactivated." },
                    { status: 200 },
                );
            }
        }

        // New subscription
        const newSubscription: NewsletterSubscription = {
            email: email.toLowerCase(),
            subscribedAt: new Date(),
            status: "active",
        };

        await db.collection<NewsletterSubscription>("newsletter_subscriptions").insertOne(newSubscription);

        return NextResponse.json(
            { message: "Thank you for subscribing to our newsletter!" },
            { status: 201 },
        );
    } catch (error) {
        console.error("Newsletter subscription error:", error);
        return NextResponse.json(
            { error: "Internal server error. Please try again later." },
            { status: 500 },
        );
    }
}
