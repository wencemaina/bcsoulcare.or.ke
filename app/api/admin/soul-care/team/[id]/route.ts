import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { SoulCareTeamMember } from "@/types/database";
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
        const member = await db
            .collection<SoulCareTeamMember>("soul_care_team")
            .findOne({ memberId: params.id });

        if (!member) {
            return NextResponse.json({ error: "Team member not found" }, { status: 404 });
        }

        return NextResponse.json({ member });
    } catch (error) {
        console.error("Error fetching team member:", error);
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
        const { name, title, specialties, credentials, image, status } = data;

        const db = await connectToDatabase();
        const result = await db.collection<SoulCareTeamMember>("soul_care_team").updateOne(
            { memberId: params.id },
            {
                $set: {
                    name,
                    title,
                    specialties,
                    credentials,
                    image,
                    status,
                    updatedAt: new Date(),
                },
            }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ error: "Team member not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Team member updated successfully" });
    } catch (error) {
        console.error("Error updating team member:", error);
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
            .collection<SoulCareTeamMember>("soul_care_team")
            .deleteOne({ memberId: params.id });

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: "Team member not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Team member deleted successfully" });
    } catch (error) {
        console.error("Error deleting team member:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
