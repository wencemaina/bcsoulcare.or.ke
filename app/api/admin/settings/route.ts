import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { SiteSettings } from "@/types/database";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user || (session.user as any).role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const db = await connectToDatabase();
        const settings = await db.collection<SiteSettings>("site_settings").findOne({
            settingsId: "global"
        });

        if (!settings) {
            // Return default settings if not found
            const defaultSettings: Partial<SiteSettings> = {
                settingsId: "global",
                organizationName: "CCMWA",
                updatedAt: new Date(),
            };
            return NextResponse.json(defaultSettings);
        }

        return NextResponse.json(settings);
    } catch (error) {
        console.error("Error fetching site settings:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user || (session.user as any).role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { logoUrl, organizationName, contactEmail, contactPhone, socialLinks } = body;

        if (!organizationName) {
            return NextResponse.json({ error: "Organization name is required" }, { status: 400 });
        }

        const db = await connectToDatabase();
        
        const updateData: Partial<SiteSettings> = {
            logoUrl,
            organizationName,
            contactEmail,
            contactPhone,
            socialLinks,
            updatedAt: new Date(),
        };

        await db.collection<SiteSettings>("site_settings").updateOne(
            { settingsId: "global" },
            { $set: updateData },
            { upsert: true }
        );

        return NextResponse.json({ message: "Settings updated successfully" });
    } catch (error) {
        console.error("Error updating site settings:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
