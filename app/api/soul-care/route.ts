import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase, SoulCareService, SoulCareTeamMember } from "@/lib/mongodb";

export async function GET(req: NextRequest) {
    try {
        const db = await connectToDatabase();

        const [services, team] = await Promise.all([
            db.collection<SoulCareService>("soul_care_services")
                .find({ status: "active" })
                .sort({ createdAt: 1 })
                .toArray(),
            db.collection<SoulCareTeamMember>("soul_care_team")
                .find({ status: "active" })
                .sort({ createdAt: 1 })
                .toArray()
        ]);

        return NextResponse.json({ services, team });
    } catch (error) {
        console.error("Error fetching soul care data:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
