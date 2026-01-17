import { NextResponse } from "next/server";
import { connectToDatabase, User, Course, Event, MembershipTier } from "@/lib/mongodb";
import { auth } from "@/auth";

interface BlogPost {
	status: "published" | "draft";
	// Add other fields if needed, but for stats we only need status
}

export async function GET() {
	try {
		const session = await auth();
		if (!session?.user || (session.user as any).role !== "admin") {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const db = await connectToDatabase();

		const [
			userCount,
			courseCount,
			eventCount,
			membershipTierCount,
			blogPosts,
			recentUsers,
		] = await Promise.all([
			db.collection<User>("users").countDocuments({ role: "user" }),
			db.collection<Course>("courses").countDocuments({}),
			db.collection<Event>("events").countDocuments({}),
			db.collection<MembershipTier>("membership_tiers").countDocuments({}),
			db.collection<BlogPost>("blog_posts").find({}).project({ status: 1 }).toArray(),
			db.collection<User>("users")
				.find({ role: "user" })
				.sort({ createdAt: -1 })
				.limit(10)
				.project({ password: 0 }) // Exclude passwords
				.toArray(),
		]);

		const publishedBlogPosts = blogPosts.filter(post => post.status === "published").length;
		const draftBlogPosts = blogPosts.filter(post => post.status === "draft").length;

		return NextResponse.json({
			users: userCount,
			courses: courseCount,
			events: eventCount,
			membershipTiers: membershipTierCount,
			blog: {
				total: blogPosts.length,
				published: publishedBlogPosts,
				draft: draftBlogPosts,
			},
			recentUsers,
		});
	} catch (error) {
		console.error("Error fetching admin stats:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
