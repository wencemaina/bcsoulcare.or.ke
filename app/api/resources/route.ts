import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase, SoulCareResource } from "@/lib/mongodb";

export async function GET(req: NextRequest) {
    try {
        const db = await connectToDatabase();
        const resources = await db
            .collection<SoulCareResource>("soul_care_resources")
            .find({ status: "active" })
            .sort({ createdAt: -1 })
            .toArray();

        return NextResponse.json({ resources });
    } catch (error) {
        console.error("Error fetching resources:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
