import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { SiteSettings } from "@/types/database";

export async function GET(req: NextRequest) {
    try {
        const db = await connectToDatabase();
        const settings = await db.collection<SiteSettings>("site_settings").findOne(
            { settingsId: "global" },
            { projection: { _id: 0, settingsId: 0 } }
        );

        if (!settings) {
            return NextResponse.json({
                organizationName: "CCMWA",
            });
        }

        return NextResponse.json(settings, {
            headers: {
                "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
            },
        });
    } catch (error) {
        console.error("Error fetching public settings:", error);
        return NextResponse.json({ organizationName: "CCMWA" });
    }
}
