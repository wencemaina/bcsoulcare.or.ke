import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
	throw new Error("Please add your MongoDB URI to .env.local");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
	// In development mode, use a global variable to preserve the connection across hot reloads
	const globalWithMongo = global as typeof global & {
		_mongoClientPromise?: Promise<MongoClient>;
	};

	if (!globalWithMongo._mongoClientPromise) {
		client = new MongoClient(uri, {
			serverApi: {
				version: ServerApiVersion.v1,
				strict: true,
				deprecationErrors: true,
			},
		});
		globalWithMongo._mongoClientPromise = client.connect();
	}
	clientPromise = globalWithMongo._mongoClientPromise!;
} else {
	// In production mode, it's best to not use a global variable
	client = new MongoClient(uri, {
		serverApi: {
			version: ServerApiVersion.v1,
			strict: true,
			deprecationErrors: true,
		},
	});
	clientPromise = client.connect();
}

export async function connectToDatabase() {
	const client = await clientPromise;
	return client.db("bcsoulcare");
}

export default clientPromise;

// Types for our database models
export interface User {
	_id?: ObjectId; // MongoDB's auto-generated ID (optional)
	userId: string; // Custom 8-character user ID
	email: string;
	password: string;
	name?: string;
	firstName?: string;
	lastName?: string;
	role: "admin" | "user";
	isActive?: boolean;
	isVerified?: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface Session {
	userId: string; // References User.userId (not MongoDB _id)
	refreshToken: string;
	expiresAt: Date;
	createdAt: Date;
	updatedAt: Date;
	userAgent?: string;
	ip?: string;
	isActive: boolean;
}

export interface Course {
	_id?: ObjectId;
	courseId: string; // Custom unique ID
	title: string;
	slug: string;
	description: string;
	shortDescription?: string;
	thumbnail: string;
	coverImage: string;
	category: string;
	tags: string[];
	skillLevel: "beginner" | "intermediate" | "advanced";
	language: string;
	instructorId: ObjectId; // reference to users collection
	instructorName: string;
	requiredTierIds: ObjectId[]; // which membership tiers can access
	isPremium: boolean;
	price?: number; // in KES if sold separately

	modules: Array<{
		moduleId: string;
		moduleNumber: number;
		title: string;
		description: string;
		order: number;
	}>;

	learningOutcomes: string[];
	prerequisites?: ObjectId[]; // other course IDs

	status: "draft" | "published" | "archived";
	isPublished: boolean;
	publishedAt?: Date;

	enrollmentCount: number;
	completionRate: number;
	averageRating: number;
	reviewCount: number;

	createdAt: Date;
	updatedAt: Date;
	createdBy: ObjectId; // admin user ID
	lastModifiedBy: ObjectId;
}

export interface Lesson {
	_id?: ObjectId;
	lessonId: string; // Custom unique ID
	courseId: string; // References Course.courseId
	moduleId: string; // References module within course
	title: string;
	slug: string;
	content: string; // HTML content from Tiptap
	excerpt?: string;
	order: number; // Order within module
	duration?: number; // Estimated duration in minutes

	status: "draft" | "published" | "archived";
	isPublished: boolean;
	publishedAt?: Date;

	viewCount: number;
	completionCount: number;

	createdAt: Date;
	updatedAt: Date;
	createdBy: ObjectId; // admin user ID
	lastModifiedBy: ObjectId;
}

export interface Event {
	_id?: ObjectId;
	eventId: string; // Custom unique ID
	title: string;
	slug: string;
	category: "workshop" | "retreat" | "fellowship" | "service" | "study";
	date: Date; // Event date
	startTime: string; // e.g., "9:00 AM"
	endTime: string; // e.g., "5:00 PM"
	location: string;
	description: string;
	image: string; // URL from R2 storage
	maxSpots: number; // Maximum attendees
	registeredCount: number; // Current registrations
	price: number; // Event cost (0 for free)
	isFeatured: boolean; // Show in featured section

	status: "draft" | "published" | "archived";
	isPublished: boolean;
	publishedAt?: Date;

	createdAt: Date;
	updatedAt: Date;
	createdBy: ObjectId; // admin user ID
	lastModifiedBy: ObjectId;
}
