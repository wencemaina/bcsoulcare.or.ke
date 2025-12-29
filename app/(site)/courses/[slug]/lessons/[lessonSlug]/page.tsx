"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
	TbLoader2,
	TbChevronLeft,
	TbChevronRight,
	TbCheck,
} from "react-icons/tb";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface Lesson {
	lessonId: string;
	courseId: string;
	moduleId: string;
	title: string;
	slug: string;
	content: string;
	excerpt?: string;
	order: number;
	duration?: number;
}

export default function LessonPage({
	params,
}: {
	params: { slug: string; lessonSlug: string };
}) {
	const router = useRouter();
	const [lesson, setLesson] = useState<Lesson | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetchLesson();
	}, [params.lessonSlug]);

	async function fetchLesson() {
		try {
			const response = await fetch(`/api/lessons/${params.lessonSlug}`);
			if (!response.ok) {
				throw new Error("Failed to fetch lesson");
			}
			const data = await response.json();
			setLesson(data.lesson);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	}

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<TbLoader2 className="h-12 w-12 animate-spin text-primary" />
			</div>
		);
	}

	if (!lesson) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen">
				<h1 className="text-2xl font-bold mb-4">Lesson not found</h1>
				<Button onClick={() => router.push(`/courses/${params.slug}`)}>
					Back to Course
				</Button>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-background">
			{/* Header */}
			<div className="border-b sticky top-0 bg-background z-10">
				<div className="container mx-auto px-4 py-4">
					<div className="flex items-center justify-between">
						<Button
							variant="ghost"
							onClick={() =>
								router.push(`/courses/${params.slug}`)
							}
						>
							<TbChevronLeft className="mr-2 h-4 w-4" />
							Back to Course
						</Button>
						<div className="flex items-center gap-2">
							{lesson.duration && (
								<Badge variant="outline">
									{lesson.duration} min
								</Badge>
							)}
							<Button size="sm">
								<TbCheck className="mr-2 h-4 w-4" />
								Mark Complete
							</Button>
						</div>
					</div>
				</div>
			</div>

			{/* Content */}
			<div className="container mx-auto px-4 py-8">
				<div className="max-w-4xl mx-auto">
					<h1 className="text-3xl md:text-4xl font-bold mb-4">
						{lesson.title}
					</h1>
					{lesson.excerpt && (
						<p className="text-lg text-muted-foreground mb-8">
							{lesson.excerpt}
						</p>
					)}
					<Separator className="mb-8" />

					{/* Lesson Content */}
					<Card className="p-6 md:p-8">
						<div
							className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none"
							dangerouslySetInnerHTML={{ __html: lesson.content }}
						/>
					</Card>

					{/* Navigation */}
					<div className="flex items-center justify-between mt-8">
						<Button variant="outline">
							<TbChevronLeft className="mr-2 h-4 w-4" />
							Previous Lesson
						</Button>
						<Button>
							Next Lesson
							<TbChevronRight className="ml-2 h-4 w-4" />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
