import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(
	req: NextRequest,
	{ params }: { params: { slug: string } },
) {
	try {
		const { slug } = await params;
		const db = await connectToDatabase();
		const blog = await db.collection("blogs").findOne({ slug });

		if (!blog) {
			return NextResponse.json(
				{ error: "Blog post not found" },
				{ status: 404 },
			);
		}

		return NextResponse.json({ blog });
	} catch (error) {
		console.error("Error fetching blog post:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
