"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
	TbClock,
	TbUsers,
	TbStar,
	TbLoader2,
	TbBook,
	TbChevronDown,
} from "react-icons/tb";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

interface Lesson {
	lessonId: string;
	title: string;
	slug: string;
	excerpt?: string;
	order: number;
	duration?: number;
}

interface Module {
	moduleId: string;
	moduleNumber: number;
	title: string;
	description: string;
	order: number;
	lessons: Lesson[];
}

interface Course {
	courseId: string;
	title: string;
	slug: string;
	description: string;
	coverImage: string;
	category: string;
	skillLevel: string;
	language: string;
	instructorName: string;
	isPremium: boolean;
	price?: number;
	modules: Module[];
	learningOutcomes: string[];
	enrollmentCount: number;
	averageRating: number;
	reviewCount: number;
}

export default function CoursePage({ params }: { params: { slug: string } }) {
	const router = useRouter();
	const [course, setCourse] = useState<Course | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetchCourse();
	}, [params.slug]);

	async function fetchCourse() {
		try {
			const response = await fetch(`/api/courses/${params.slug}`);
			if (!response.ok) {
				throw new Error("Failed to fetch course");
			}
			const data = await response.json();
			setCourse(data.course);
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

	if (!course) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen">
				<h1 className="text-2xl font-bold mb-4">Course not found</h1>
				<Button onClick={() => router.push("/courses")}>
					Back to Courses
				</Button>
			</div>
		);
	}

	const totalLessons = course.modules.reduce(
		(acc, module) => acc + module.lessons.length,
		0,
	);
	const totalDuration = course.modules.reduce(
		(acc, module) =>
			acc +
			module.lessons.reduce(
				(sum, lesson) => sum + (lesson.duration || 0),
				0,
			),
		0,
	);

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="relative h-[400px] w-full">
				{course.coverImage ? (
					<Image
						src={course.coverImage}
						alt={course.title}
						fill
						className="object-cover"
					/>
				) : (
					<div className="h-full w-full bg-gradient-to-br from-primary/20 to-primary/5" />
				)}
				<div className="absolute inset-0 bg-black/50" />
				<div className="absolute inset-0 flex items-center">
					<div className="container mx-auto px-4">
						<div className="max-w-3xl">
							<Badge className="mb-4">{course.category}</Badge>
							<h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
								{course.title}
							</h1>
							<p className="text-lg text-white/90 mb-6">
								{course.description}
							</p>
							<div className="flex items-center gap-6 text-white/80">
								<div className="flex items-center gap-2">
									<TbBook className="h-5 w-5" />
									<span>{totalLessons} lessons</span>
								</div>
								{totalDuration > 0 && (
									<div className="flex items-center gap-2">
										<TbClock className="h-5 w-5" />
										<span>
											{Math.floor(totalDuration / 60)}h{" "}
											{totalDuration % 60}m
										</span>
									</div>
								)}
								<div className="flex items-center gap-2">
									<TbUsers className="h-5 w-5" />
									<span>
										{course.enrollmentCount} enrolled
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Content */}
			<section className="py-12">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{/* Main Content */}
						<div className="lg:col-span-2 space-y-8">
							{/* Learning Outcomes */}
							{course.learningOutcomes &&
								course.learningOutcomes.length > 0 && (
									<Card>
										<CardHeader>
											<CardTitle>
												What You'll Learn
											</CardTitle>
										</CardHeader>
										<CardContent>
											<ul className="space-y-2">
												{course.learningOutcomes.map(
													(outcome, index) => (
														<li
															key={index}
															className="flex items-start gap-2"
														>
															<span className="text-primary mt-1">
																✓
															</span>
															<span>
																{outcome}
															</span>
														</li>
													),
												)}
											</ul>
										</CardContent>
									</Card>
								)}

							{/* Course Content */}
							<Card>
								<CardHeader>
									<CardTitle>Course Content</CardTitle>
								</CardHeader>
								<CardContent>
									<Accordion
										type="multiple"
										className="w-full"
									>
										{course.modules.map((module) => (
											<AccordionItem
												key={module.moduleId}
												value={module.moduleId}
											>
												<AccordionTrigger>
													<div className="flex items-center justify-between w-full pr-4">
														<span className="font-semibold">
															Module{" "}
															{
																module.moduleNumber
															}
															: {module.title}
														</span>
														<span className="text-sm text-muted-foreground">
															{
																module.lessons
																	.length
															}{" "}
															lessons
														</span>
													</div>
												</AccordionTrigger>
												<AccordionContent>
													<p className="text-sm text-muted-foreground mb-4">
														{module.description}
													</p>
													<div className="space-y-2">
														{module.lessons.map(
															(lesson) => (
																<div
																	key={
																		lesson.lessonId
																	}
																	className="flex items-center justify-between p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors"
																	onClick={() =>
																		router.push(
																			`/courses/${course.slug}/lessons/${lesson.slug}`,
																		)
																	}
																>
																	<div className="flex items-center gap-3">
																		<TbBook className="h-4 w-4 text-muted-foreground" />
																		<div>
																			<p className="font-medium">
																				{
																					lesson.title
																				}
																			</p>
																			{lesson.excerpt && (
																				<p className="text-sm text-muted-foreground">
																					{
																						lesson.excerpt
																					}
																				</p>
																			)}
																		</div>
																	</div>
																	{lesson.duration && (
																		<span className="text-sm text-muted-foreground">
																			{
																				lesson.duration
																			}{" "}
																			min
																		</span>
																	)}
																</div>
															),
														)}
													</div>
												</AccordionContent>
											</AccordionItem>
										))}
									</Accordion>
								</CardContent>
							</Card>
						</div>

						{/* Sidebar */}
						<div className="lg:col-span-1">
							<Card className="sticky top-4">
								<CardContent className="pt-6">
									<div className="space-y-4">
										<div>
											<p className="text-sm text-muted-foreground mb-1">
												Instructor
											</p>
											<p className="font-semibold">
												{course.instructorName}
											</p>
										</div>
										<Separator />
										<div>
											<p className="text-sm text-muted-foreground mb-1">
												Skill Level
											</p>
											<Badge className="capitalize">
												{course.skillLevel}
											</Badge>
										</div>
										<Separator />
										<div>
											<p className="text-sm text-muted-foreground mb-1">
												Language
											</p>
											<p className="font-semibold">
												{course.language}
											</p>
										</div>
										<Separator />
										<div>
											<p className="text-sm text-muted-foreground mb-1">
												Price
											</p>
											{course.isPremium ? (
												course.price &&
												course.price > 0 ? (
													<p className="text-2xl font-bold">
														KES {course.price}
													</p>
												) : (
													<Badge variant="secondary">
														Membership Required
													</Badge>
												)
											) : (
												<Badge variant="outline">
													Free
												</Badge>
											)}
										</div>
										<Button className="w-full" size="lg">
											{course.isPremium
												? "Enroll Now"
												: "Start Learning"}
										</Button>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
