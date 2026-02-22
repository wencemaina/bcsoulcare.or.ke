import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { SoulCareResource } from "@/types/database";
import { auth } from "@/auth";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth();
        if (!session?.user || (session.user as any).role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const db = await connectToDatabase();
        const resource = await db
            .collection<SoulCareResource>("soul_care_resources")
            .findOne({ resourceId: params.id });

        if (!resource) {
            return NextResponse.json({ error: "Resource not found" }, { status: 404 });
        }

        return NextResponse.json({ resource });
    } catch (error) {
        console.error("Error fetching resource:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
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
            status,
        } = data;

        const db = await connectToDatabase();
        const result = await db.collection<SoulCareResource>("soul_care_resources").updateOne(
            { resourceId: params.id },
            {
                $set: {
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
                    status,
                    updatedAt: new Date(),
                },
            }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ error: "Resource not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Resource updated successfully" });
    } catch (error) {
        console.error("Error updating resource:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth();
        if (!session?.user || (session.user as any).role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const db = await connectToDatabase();
        const result = await db
            .collection<SoulCareResource>("soul_care_resources")
            .deleteOne({ resourceId: params.id });

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: "Resource not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Resource deleted successfully" });
    } catch (error) {
        console.error("Error deleting resource:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
