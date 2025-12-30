"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { TbClock, TbUsers, TbStar, TbLoader2 } from "react-icons/tb";

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Course {
	courseId: string;
	title: string;
	slug: string;
	description: string;
	shortDescription?: string;
	thumbnail: string;
	category: string;
	tags: string[];
	skillLevel: string;
	instructorName: string;
	isPremium: boolean;
	price?: number;
	enrollmentCount: number;
	averageRating: number;
	reviewCount: number;
}

export default function CoursesPage() {
	const router = useRouter();
	const [courses, setCourses] = useState<Course[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetchCourses();
	}, []);

	async function fetchCourses() {
		try {
			const response = await fetch("/api/courses");
			if (!response.ok) {
				throw new Error("Failed to fetch courses");
			}
			const data = await response.json();
			setCourses(data.courses || []);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	}

	const getSkillLevelColor = (level: string) => {
		const colors: Record<string, string> = {
			beginner:
				"bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
			intermediate:
				"bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
			advanced:
				"bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
		};
		return colors[level] || "bg-gray-100 text-gray-800";
	};

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="bg-gradient-to-b from-primary/10 to-background py-16">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto text-center">
						<h1 className="text-4xl md:text-5xl font-bold mb-4">
							Explore Our Courses
						</h1>
						<p className="text-lg text-muted-foreground">
							Discover courses designed to help you grow in your
							faith and knowledge
						</p>
					</div>
				</div>
			</section>

			{/* Courses Grid */}
			<section className="py-12">
				<div className="container mx-auto px-4">
					{isLoading ? (
						<div className="flex items-center justify-center py-16">
							<TbLoader2 className="h-12 w-12 animate-spin text-primary" />
						</div>
					) : courses.length === 0 ? (
						<div className="text-center py-16">
							<p className="text-muted-foreground text-lg">
								No courses available at the moment
							</p>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{courses.map((course) => (
								<Card
									key={course.courseId}
									className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
									onClick={() =>
										router.push(`/courses/${course.slug}`)
									}
								>
									<div className="relative h-48 w-full">
										{course.thumbnail ? (
											<Image
												src={course.thumbnail}
												alt={course.title}
												fill
												className="object-cover"
											/>
										) : (
											<div className="h-full w-full bg-gradient-to-br from-primary/20 to-primary/5" />
										)}
										<div className="absolute top-2 right-2">
											<Badge
												className={getSkillLevelColor(
													course.skillLevel,
												)}
											>
												{course.skillLevel}
											</Badge>
										</div>
									</div>
									<CardHeader>
										<div className="flex items-start justify-between gap-2">
											<h3 className="font-semibold text-lg line-clamp-2">
												{course.title}
											</h3>
										</div>
										<p className="text-sm text-muted-foreground">
											{course.instructorName}
										</p>
									</CardHeader>
									<CardContent>
										<p className="text-sm text-muted-foreground line-clamp-3">
											{course.shortDescription ||
												course.description}
										</p>
										<div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
											<div className="flex items-center gap-1">
												<TbUsers className="h-4 w-4" />
												<span>
													{course.enrollmentCount}
												</span>
											</div>
											{course.averageRating > 0 && (
												<div className="flex items-center gap-1">
													<TbStar className="h-4 w-4 fill-yellow-400 text-yellow-400" />
													<span>
														{course.averageRating.toFixed(
															1,
														)}
													</span>
													<span>
														({course.reviewCount})
													</span>
												</div>
											)}
										</div>
									</CardContent>
									<Separator />
									<CardFooter className="pt-4">
										<Button size="sm" className="w-full">
											View Course
										</Button>
									</CardFooter>
								</Card>
							))}
						</div>
					)}
				</div>
			</section>
		</div>
	);
}
