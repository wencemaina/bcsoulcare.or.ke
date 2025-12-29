import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(
	req: NextRequest,
	{ params }: { params: { slug: string } },
) {
	try {
		const { slug } = params;
		const db = await connectToDatabase();
		const coursesCollection = db.collection("courses");
		const lessonsCollection = db.collection("lessons");

		// Fetch course details
		const course = await coursesCollection.findOne({
			slug,
			status: "published",
			isPublished: true,
		});

		if (!course) {
			return NextResponse.json(
				{ error: "Course not found" },
				{ status: 404 },
			);
		}

		// Fetch published lessons for this course
		const lessons = await lessonsCollection
			.find({
				courseId: course.courseId,
				status: "published",
				isPublished: true,
			})
			.project({
				lessonId: 1,
				moduleId: 1,
				title: 1,
				slug: 1,
				excerpt: 1,
				order: 1,
				duration: 1,
			})
			.sort({ moduleId: 1, order: 1 })
			.toArray();

		// Group lessons by module
		const modulesWithLessons = course.modules.map((module: any) => ({
			...module,
			lessons: lessons.filter(
				(lesson: any) => lesson.moduleId === module.moduleId,
			),
		}));

		return NextResponse.json({
			course: {
				...course,
				modules: modulesWithLessons,
			},
		});
	} catch (error) {
		console.error("Error fetching course:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
