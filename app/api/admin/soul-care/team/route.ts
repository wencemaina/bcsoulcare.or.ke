import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase, SoulCareTeamMember } from "@/lib/mongodb";
import { auth } from "@/auth";
import { v4 as uuid } from "uuid";

export async function GET(req: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user || (session.user as any).role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const db = await connectToDatabase();
        const team = await db
            .collection<SoulCareTeamMember>("soul_care_team")
            .find({})
            .sort({ createdAt: -1 })
            .toArray();

        return NextResponse.json({ team });
    } catch (error) {
        console.error("Error fetching team members:", error);
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
        const { name, title, specialties, credentials, image } = data;

        if (!name || !title) {
            return NextResponse.json({ error: "Name and title are required" }, { status: 400 });
        }

        const db = await connectToDatabase();
        const newMember: SoulCareTeamMember = {
            memberId: uuid(),
            name,
            title,
            specialties: specialties || [],
            credentials: credentials || "",
            image: image || "",
            status: "active",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await db.collection<SoulCareTeamMember>("soul_care_team").insertOne(newMember);

        return NextResponse.json({ message: "Team member created successfully", member: newMember }, { status: 201 });
    } catch (error) {
        console.error("Error creating team member:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
