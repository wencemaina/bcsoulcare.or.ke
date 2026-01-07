import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase, SoulCareService } from "@/lib/mongodb";
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
        const service = await db
            .collection<SoulCareService>("soul_care_services")
            .findOne({ serviceId: params.id });

        if (!service) {
            return NextResponse.json({ error: "Service not found" }, { status: 404 });
        }

        return NextResponse.json({ service });
    } catch (error) {
        console.error("Error fetching service:", error);
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
        const { title, description, features, duration, availability, status } = data;

        const db = await connectToDatabase();
        const result = await db.collection<SoulCareService>("soul_care_services").updateOne(
            { serviceId: params.id },
            {
                $set: {
                    title,
                    description,
                    features,
                    duration,
                    availability,
                    status,
                    updatedAt: new Date(),
                },
            }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ error: "Service not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Service updated successfully" });
    } catch (error) {
        console.error("Error updating service:", error);
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
            .collection<SoulCareService>("soul_care_services")
            .deleteOne({ serviceId: params.id });

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: "Service not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Service deleted successfully" });
    } catch (error) {
        console.error("Error deleting service:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
