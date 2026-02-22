import { ObjectId } from "mongodb";

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
	membershipTierId?: string;
	membershipTierName?: string;
	subscriptionStartDate?: Date;
	subscriptionEndDate?: Date;
	subscriptionStatus?: "active" | "expired" | "canceled" | "past_due";
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

export interface MembershipTier {
	_id?: ObjectId;
	tierId: string; // Custom unique ID
	name: string;
	description: string;
	price: number;
	billingCycle: "monthly" | "yearly" | "one-time";
	features: string[]; // List of benefits
	status: "active" | "archived";
	subscribersCount: number;

	createdAt: Date;
	updatedAt: Date;
}

export interface NewsletterSubscription {
	_id?: ObjectId;
	email: string;
	subscribedAt: Date;
	status: "active" | "unsubscribed";
}

export interface SoulCareService {
	_id?: ObjectId;
	serviceId: string;
	title: string;
	description: string;
	features: string[];
	duration: string;
	availability: string;
	status: "active" | "archived";
	createdAt: Date;
	updatedAt: Date;
}

export interface BlogPost {
	_id?: ObjectId;
	blogId: string; // Unique 8-character ID
	slug: string; // URL-friendly title
	title: string;
	excerpt: string;
	content: string; // HTML content from Tiptap
	author: string;
	authorId: string; // References User.userId
	category: string;
	tags: string[];
	image?: string;
	status: "draft" | "published" | "archived";
	readTime?: string;
	createdAt: Date;
	updatedAt: Date;
}


export interface SoulCareTeamMember {
	_id?: ObjectId;
	memberId: string;
	name: string;
	title: string;
	specialties: string[];
	credentials: string;
	image: string; // URL from R2
	status: "active" | "archived";
	createdAt: Date;
	updatedAt: Date;
}

export interface SoulCareResource {
	_id?: ObjectId;
	resourceId: string;
	title: string;
	description: string;
	category: "article" | "study" | "audio" | "book" | "worksheet";
	type: string;
	author: string;
	date: Date;
	downloadUrl: string;
	readTime?: string;
	pages?: string;
	duration?: string;
	rating?: string;
	featured: boolean;
	status: "active" | "archived";
	createdAt: Date;
	updatedAt: Date;
}

export interface SiteSettings {
	_id?: ObjectId;
	settingsId: "global"; // Singleton record
	logoUrl?: string;
	organizationName: string;
	contactEmail?: string;
	contactPhone?: string;
	socialLinks?: {
		facebook?: string;
		twitter?: string;
		instagram?: string;
		linkedin?: string;
	};
	updatedAt: Date;
}
