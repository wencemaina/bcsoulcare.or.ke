import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase, SoulCareResource } from "@/lib/mongodb";
import { auth } from "@/auth";
import { v4 as uuid } from "uuid";

export async function GET(req: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user || (session.user as any).role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const db = await connectToDatabase();
        const resources = await db
            .collection<SoulCareResource>("soul_care_resources")
            .find({})
            .sort({ createdAt: -1 })
            .toArray();

        return NextResponse.json({ resources });
    } catch (error) {
        console.error("Error fetching resources:", error);
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
        const {
            title,
            description,
            category,
            type,
            author,
            downloadUrl,
            readTime,
            pages,
            duration,
            rating,
            featured,
        } = data;

        if (!title || !category || !downloadUrl) {
            return NextResponse.json(
                { error: "Title, category, and download URL are required" },
                { status: 400 }
            );
        }

        const db = await connectToDatabase();
        const newResource: SoulCareResource = {
            resourceId: uuid(),
            title,
            description: description || "",
            category,
            type: type || "",
            author: author || "Soul Care Team",
            date: new Date(),
            downloadUrl,
            readTime,
            pages,
            duration,
            rating,
            featured: !!featured,
            status: "active",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await db.collection<SoulCareResource>("soul_care_resources").insertOne(newResource);

        return NextResponse.json(
            { message: "Resource created successfully", resource: newResource },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating resource:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
