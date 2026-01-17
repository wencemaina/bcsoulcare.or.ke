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

// Helper functions to generate unique IDs and slugs
function generateBlogId(): string {
	// Generate a random 8-character alphanumeric ID
	const chars =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let result = "";
	for (let i = 0; i < 8; i++) {
		result += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return result;
}

function generateSlug(title: string): string {
	// Convert title to URL-friendly slug
	return title
		.toLowerCase()
		.replace(/[^a-z0-9\\s-]/g, "") // Remove special characters
		.replace(/\\s+/g, "-") // Replace spaces with hyphens
		.trim();
}

export async function POST(request: NextRequest) {
	try {
		const db = await connectToDatabase();

		const body = await request.json();

		// Validate required fields
		if (!body.title?.trim()) {
			return Response.json(
				{ error: "Title is required" },
				{ status: 400 },
			);
		}

		if (!body.excerpt?.trim()) {
			return Response.json(
				{ error: "Excerpt is required" },
				{ status: 400 },
			);
		}

		if (!body.content?.trim()) {
			return Response.json(
				{ error: "Content is required" },
				{ status: 400 },
			);
		}

		if (!body.author?.trim()) {
			return Response.json(
				{ error: "Author is required" },
				{ status: 400 },
			);
		}

		if (!body.category) {
			return Response.json(
				{ error: "Category is required" },
				{ status: 400 },
			);
		}

		// Generate a unique blog ID and slug
		const blogId = generateBlogId();
		const slug = generateSlug(body.title);

		// Prepare the blog post object
		const blogPost: Omit<BlogPost, "_id"> = {
			blogId,
			slug,
			title: body.title,
			excerpt: body.excerpt,
			content: body.content,
			author: body.author,
			authorId: "", // This would come from authentication in a real implementation
			category: body.category,
			tags: body.tags
				? (Array.isArray(body.tags)
						? body.tags
						: body.tags.split(",")
				  ).map((tag: string) => tag.trim())
				: [],
			status:
				(body.status as "draft" | "published" | "archived") || "draft",
			createdAt: new Date(),
			updatedAt: new Date(),
			// Optional fields
			image: body.image,
			readTime: undefined,
		};

		// Insert the blog post into the database
		const result = await db.collection("blogs").insertOne(blogPost);

		// Return the created blog post with the new ID
		const createdBlogPost: BlogPost = {
			...blogPost,
			_id: result.insertedId,
		};

		return Response.json(
			{
				message: "Blog post created successfully",
				blogPost: createdBlogPost,
			},
			{ status: 201 },
		);
	} catch (error) {
		console.error("Error creating blog post:", error);
		return Response.json(
			{ error: "Failed to create blog post" },
			{ status: 500 },
		);
	}
}

export async function GET(request: NextRequest) {
	try {
		const db = await connectToDatabase();

		// Get query parameters
		const url = new URL(request.url);
		const page = parseInt(url.searchParams.get("page") || "1");
		const limit = parseInt(url.searchParams.get("limit") || "10");
		const status = url.searchParams.get("status") || "";
		const category = url.searchParams.get("category") || "";
		const search = url.searchParams.get("search") || "";

		// Build query
		const query: any = {};
		if (status) query.status = status;
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

		// Fetch blog posts with pagination and filtering
		const blogPosts = await db
			.collection<BlogPost>("blogs")
			.find(query)
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
			{ status: 500 },
		);
	}
}
