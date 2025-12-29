"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TbPlus, TbLoader2, TbEdit, TbTrash, TbEye } from "react-icons/tb";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

interface Course {
	_id: string;
	courseId: string;
	title: string;
	slug: string;
	category: string;
	skillLevel: string;
	status: string;
	isPremium: boolean;
	price?: number;
	enrollmentCount: number;
	createdAt: string;
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
			const response = await fetch("/api/admin/courses");
			if (!response.ok) {
				throw new Error("Failed to fetch courses");
			}
			const data = await response.json();
			setCourses(data.courses || []);
		} catch (error) {
			console.error(error);
			toast.error("Failed to load courses");
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

	return (
		<div className="flex flex-col gap-6 p-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						All Courses
					</h1>
					<p className="text-muted-foreground">
						Manage your course catalog
					</p>
				</div>
				<Button onClick={() => router.push("/admin/courses/new")}>
					<TbPlus className="mr-2 h-4 w-4" />
					Create Course
				</Button>
			</div>
			<Separator />

			<Card>
				<CardHeader>
					<CardTitle>Courses ({courses.length})</CardTitle>
				</CardHeader>
				<CardContent>
					{isLoading ? (
						<div className="flex items-center justify-center py-8">
							<TbLoader2 className="h-8 w-8 animate-spin text-muted-foreground" />
						</div>
					) : courses.length === 0 ? (
						<div className="flex flex-col items-center justify-center py-8 text-center">
							<p className="text-muted-foreground">
								No courses found
							</p>
							<Button
								variant="link"
								onClick={() =>
									router.push("/admin/courses/new")
								}
							>
								Create your first course
							</Button>
						</div>
					) : (
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Title</TableHead>
									<TableHead>Category</TableHead>
									<TableHead>Level</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Type</TableHead>
									<TableHead>Enrollments</TableHead>
									<TableHead className="text-right">
										Actions
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{courses.map((course) => (
									<TableRow key={course.courseId}>
										<TableCell className="font-medium">
											{course.title}
										</TableCell>
										<TableCell>{course.category}</TableCell>
										<TableCell className="capitalize">
											{course.skillLevel}
										</TableCell>
										<TableCell>
											{getStatusBadge(course.status)}
										</TableCell>
										<TableCell>
											{course.isPremium ? (
												<Badge variant="secondary">
													Premium
												</Badge>
											) : (
												<Badge variant="outline">
													Free
												</Badge>
											)}
										</TableCell>
										<TableCell>
											{course.enrollmentCount}
										</TableCell>
										<TableCell className="text-right">
											<div className="flex justify-end gap-2">
												<Button
													variant="ghost"
													size="icon"
													onClick={() =>
														router.push(
															`/admin/courses/${course.courseId}`,
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
															`/admin/courses/${course.courseId}`,
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
