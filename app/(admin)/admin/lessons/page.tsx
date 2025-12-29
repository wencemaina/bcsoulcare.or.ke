"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
	TbPlus,
	TbLoader2,
	TbEdit,
	TbTrash,
	TbEye,
	TbFilter,
} from "react-icons/tb";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

interface Lesson {
	_id: string;
	lessonId: string;
	courseId: string;
	moduleId: string;
	title: string;
	slug: string;
	order: number;
	duration?: number;
	status: string;
	viewCount: number;
	completionCount: number;
	createdAt: string;
}

interface Course {
	courseId: string;
	title: string;
}

export default function LessonsPage() {
	const router = useRouter();
	const [lessons, setLessons] = useState<Lesson[]>([]);
	const [courses, setCourses] = useState<Course[]>([]);
	const [selectedCourse, setSelectedCourse] = useState<string>("all");
	const [isLoading, setIsLoading] = useState(true);
	const [isFetchingCourses, setIsFetchingCourses] = useState(true);

	useEffect(() => {
		fetchCourses();
		fetchLessons();
	}, []);

	useEffect(() => {
		fetchLessons(selectedCourse === "all" ? undefined : selectedCourse);
	}, [selectedCourse]);

	async function fetchCourses() {
		try {
			const response = await fetch("/api/admin/lessons/courses");
			if (!response.ok) {
				throw new Error("Failed to fetch courses");
			}
			const data = await response.json();
			setCourses(data.courses || []);
		} catch (error) {
			console.error(error);
			toast.error("Failed to load courses");
		} finally {
			setIsFetchingCourses(false);
		}
	}

	async function fetchLessons(courseId?: string) {
		setIsLoading(true);
		try {
			const url = courseId
				? `/api/admin/lessons?courseId=${courseId}`
				: "/api/admin/lessons";
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error("Failed to fetch lessons");
			}
			const data = await response.json();
			setLessons(data.lessons || []);
		} catch (error) {
			console.error(error);
			toast.error("Failed to load lessons");
		} finally {
			setIsLoading(false);
		}
	}

	const getStatusBadge = (status: string) => {
		const variants: Record<string, "default" | "secondary" | "outline"> = {
			published: "default",
			draft: "secondary",
			archived: "outline",
		};
		return (
			<Badge variant={variants[status] || "default"}>
				{status.charAt(0).toUpperCase() + status.slice(1)}
			</Badge>
		);
	};

	const getCourseTitle = (courseId: string) => {
		const course = courses.find((c) => c.courseId === courseId);
		return course?.title || courseId;
	};

	return (
		<div className="flex flex-col gap-6 p-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						All Lessons
					</h1>
					<p className="text-muted-foreground">
						Manage your course lessons
					</p>
				</div>
				<Button onClick={() => router.push("/admin/lessons/new")}>
					<TbPlus className="mr-2 h-4 w-4" />
					Create Lesson
				</Button>
			</div>
			<Separator />

			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<CardTitle>Lessons ({lessons.length})</CardTitle>
						<div className="flex items-center gap-2">
							<TbFilter className="h-4 w-4 text-muted-foreground" />
							<Select
								value={selectedCourse}
								onValueChange={setSelectedCourse}
								disabled={isFetchingCourses}
							>
								<SelectTrigger className="w-[200px]">
									<SelectValue placeholder="Filter by course" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">
										All Courses
									</SelectItem>
									{courses.map((course) => (
										<SelectItem
											key={course.courseId}
											value={course.courseId}
										>
											{course.title}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					{isLoading ? (
						<div className="flex items-center justify-center py-8">
							<TbLoader2 className="h-8 w-8 animate-spin text-muted-foreground" />
						</div>
					) : lessons.length === 0 ? (
						<div className="flex flex-col items-center justify-center py-8 text-center">
							<p className="text-muted-foreground">
								No lessons found
							</p>
							<Button
								variant="link"
								onClick={() =>
									router.push("/admin/lessons/new")
								}
							>
								Create your first lesson
							</Button>
						</div>
					) : (
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Title</TableHead>
									<TableHead>Course</TableHead>
									<TableHead>Order</TableHead>
									<TableHead>Duration</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Views</TableHead>
									<TableHead>Completions</TableHead>
									<TableHead className="text-right">
										Actions
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{lessons.map((lesson) => (
									<TableRow key={lesson.lessonId}>
										<TableCell className="font-medium">
											{lesson.title}
										</TableCell>
										<TableCell>
											{getCourseTitle(lesson.courseId)}
										</TableCell>
										<TableCell>{lesson.order}</TableCell>
										<TableCell>
											{lesson.duration
												? `${lesson.duration} min`
												: "-"}
										</TableCell>
										<TableCell>
											{getStatusBadge(lesson.status)}
										</TableCell>
										<TableCell>
											{lesson.viewCount}
										</TableCell>
										<TableCell>
											{lesson.completionCount}
										</TableCell>
										<TableCell className="text-right">
											<div className="flex justify-end gap-2">
												<Button
													variant="ghost"
													size="icon"
													onClick={() =>
														router.push(
															`/admin/lessons/${lesson.lessonId}`,
														)
													}
												>
													<TbEye className="h-4 w-4" />
												</Button>
												<Button
													variant="ghost"
													size="icon"
													onClick={() =>
														router.push(
															`/admin/lessons/${lesson.lessonId}/edit`,
														)
													}
												>
													<TbEdit className="h-4 w-4" />
												</Button>
												<Button
													variant="ghost"
													size="icon"
												>
													<TbTrash className="h-4 w-4 text-destructive" />
												</Button>
											</div>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
