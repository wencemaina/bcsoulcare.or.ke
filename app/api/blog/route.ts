import { NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

interface BlogPost {
    _id?: ObjectId;
    blogId: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    authorId: string;
    category: string;
    tags: string[];
    image?: string;
    status: "draft" | "published" | "archived";
    readTime?: string;
    createdAt: Date;
    updatedAt: Date;
}

interface BlogPostListing {
    _id?: ObjectId;
    title: string;
    excerpt: string;
    author: string;
    category: string;
    slug: string;
    image?: string;
    status: "draft" | "published" | "archived";
    createdAt: Date;
    tags: string[];
}

export async function GET(request: NextRequest) {
    try {
        const db = await connectToDatabase();

        // Get query parameters
        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get("page") || "1");
        const limit = parseInt(url.searchParams.get("limit") || "10");
        const status = url.searchParams.get("status") || "published"; // Only published by default
        const category = url.searchParams.get("category") || "";
        const search = url.searchParams.get("search") || "";

        // Build query - only fetch published posts by default
        const query: any = { status: "published" };
        if (status && status !== "published") query.status = status; // Only override if a specific status is requested
        if (category) query.category = category;
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { excerpt: { $regex: search, $options: "i" } },
                { author: { $regex: search, $options: "i" } },
            ];
        }

        // Calculate skip value for pagination
        const skip = (page - 1) * limit;

        // Fetch blog posts with pagination and filtering - only select needed fields
        const blogPosts = await db
            .collection<BlogPostListing>("blogs")
            .find(query, {
                projection: {
                    title: 1,
                    excerpt: 1,
                    author: 1,
                    category: 1,
                    slug: 1,
                    image: 1,
                    status: 1,
                    createdAt: 1,
                    tags: 1
                }
            })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .toArray();

        // Get total count for pagination info
        const total = await db.collection("blogs").countDocuments(query);

        return Response.json({
            blogPosts,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("Error fetching blog posts:", error);
        return Response.json(
            { error: "Failed to fetch blog posts" },
            { status: 500 }
        );
    }
}