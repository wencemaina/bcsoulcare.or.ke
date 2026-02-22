import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { SoulCareService } from "@/types/database";
import { auth } from "@/auth";
import { v4 as uuid } from "uuid";

export async function GET(req: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user || (session.user as any).role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const db = await connectToDatabase();
        const services = await db
            .collection<SoulCareService>("soul_care_services")
            .find({})
            .sort({ createdAt: -1 })
            .toArray();

        return NextResponse.json({ services });
    } catch (error) {
        console.error("Error fetching services:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user || (session.user as any).role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const data = await req.json();
        const { title, description, features, duration, availability } = data;

        if (!title || !description) {
            return NextResponse.json({ error: "Title and description are required" }, { status: 400 });
        }

        const db = await connectToDatabase();
        const newService: SoulCareService = {
            serviceId: uuid(),
            title,
            description,
            features: features || [],
            duration: duration || "",
            availability: availability || "",
            status: "active",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await db.collection<SoulCareService>("soul_care_services").insertOne(newService);

        return NextResponse.json({ message: "Service created successfully", service: newService }, { status: 201 });
    } catch (error) {
        console.error("Error creating service:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
