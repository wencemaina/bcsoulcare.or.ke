"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { TbLoader2 } from "react-icons/tb";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
	LessonEditor,
	type LessonEditorRef,
} from "@/components/admin/lesson-editor";

const lessonSchema = z.object({
	courseId: z.string().min(1, "Course is required"),
	moduleId: z.string().min(1, "Module is required"),
	title: z.string().min(2, "Title must be at least 2 characters"),
	slug: z.string().min(2, "Slug must be at least 2 characters"),
	excerpt: z.string().optional(),
	order: z.preprocess(
		(val) => (val === "" ? 0 : Number(val)),
		z.number().min(0),
	),
	duration: z.preprocess(
		(val) => (val === "" ? undefined : Number(val)),
		z.number().min(0).optional(),
	),
	status: z.enum(["draft", "published", "archived"]),
});

type LessonFormValues = z.infer<typeof lessonSchema>;

interface Course {
	_id: string;
	courseId: string;
	title: string;
	modules: Array<{
		moduleId: string;
		title: string;
		moduleNumber: number;
	}>;
}

export default function CreateLessonPage() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [courses, setCourses] = useState<Course[]>([]);
	const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
	const [isFetchingCourses, setIsFetchingCourses] = useState(true);
	const editorRef = useRef<LessonEditorRef>(null);

	const form = useForm<LessonFormValues>({
		resolver: zodResolver(lessonSchema),
		defaultValues: {
			courseId: "",
			moduleId: "",
			title: "",
			slug: "",
			excerpt: "",
			order: 0,
			duration: 0,
			status: "draft",
		},
	});

	useEffect(() => {
		fetchCourses();
	}, []);

	async function fetchCourses() {
		try {
			setIsFetchingCourses(true);
			const response = await fetch("/api/admin/lessons/courses");
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			console.log("CreateLessonPage: Fetched data:", data);

			if (data.courses && Array.isArray(data.courses)) {
				console.log(
					`CreateLessonPage: Loaded ${data.courses.length} courses`,
				);
				setCourses(data.courses);
			} else {
				console.warn(
					"CreateLessonPage: courses data is missing or not an array:",
					data,
				);
				setCourses([]);
			}
		} catch (error) {
			console.error("CreateLessonPage: Error fetching courses:", error);
			toast.error("Failed to load courses");
		} finally {
			setIsFetchingCourses(false);
		}
	}

	async function onSubmit(data: LessonFormValues) {
		if (!editorRef.current) {
			toast.error("Editor not initialized");
			return;
		}

		const content = editorRef.current.getHTML();
		if (!content || content === "<p></p>") {
			toast.error("Lesson content is required");
			return;
		}

		setIsLoading(true);
		try {
			const payload = {
				...data,
				content,
			};

			const response = await fetch("/api/admin/lessons", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || "Failed to create lesson");
			}

			toast.success("Lesson created successfully");
			router.push("/admin/lessons");
			router.refresh();
		} catch (error) {
			console.error(error);
			toast.error(
				error instanceof Error ? error.message : "Something went wrong",
			);
		} finally {
			setIsLoading(false);
		}
	}

	const handleCourseChange = (courseId: string) => {
		console.log("CreateLessonPage: Selected Course ID:", courseId);
		const course = courses.find((c) => c.courseId === courseId);

		if (course) {
			console.log("CreateLessonPage: Found Course:", course.title);
			console.log(
				"CreateLessonPage: Modules count:",
				course.modules?.length || 0,
			);
			setSelectedCourse(course);
		} else {
			console.error(
				"CreateLessonPage: Course not found in state:",
				courseId,
			);
			setSelectedCourse(null);
		}

		form.setValue("courseId", courseId);
		form.setValue("moduleId", ""); // Reset module selection
	};

	return (
		<div className="flex flex-col gap-6 p-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">
					Create Lesson
				</h1>
				<p className="text-muted-foreground">
					Add a new lesson to a course module.
				</p>
			</div>
			<Separator />

			{/* Metadata Form */}
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8"
				>
					{/* Course & Module Selection */}
					<Card>
						<CardHeader>
							<CardTitle>Course & Module</CardTitle>
						</CardHeader>
						<CardContent className="grid gap-6 md:grid-cols-2">
							<FormField
								control={form.control}
								name="courseId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Course</FormLabel>
										<Select
											onValueChange={handleCourseChange}
											defaultValue={field.value}
											disabled={isFetchingCourses}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select a course" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
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
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="moduleId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Module</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
											disabled={!selectedCourse}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select a module" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{selectedCourse?.modules.map(
													(module) => (
														<SelectItem
															key={
																module.moduleId
															}
															value={
																module.moduleId
															}
														>
															Module{" "}
															{
																module.moduleNumber
															}
															: {module.title}
														</SelectItem>
													),
												)}
											</SelectContent>
										</Select>
										<FormDescription>
											{!selectedCourse &&
												"Select a course first"}
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</CardContent>
					</Card>

					{/* Basic Information */}
					<Card>
						<CardHeader>
							<CardTitle>Basic Information</CardTitle>
						</CardHeader>
						<CardContent className="grid gap-6 md:grid-cols-2">
							<FormField
								control={form.control}
								name="title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Title</FormLabel>
										<FormControl>
											<Input
												placeholder="Lesson Title"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="slug"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Slug</FormLabel>
										<FormControl>
											<Input
												placeholder="lesson-url-slug"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="excerpt"
								render={({ field }) => (
									<FormItem className="md:col-span-2">
										<FormLabel>Excerpt</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Brief summary (optional)"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="order"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Order</FormLabel>
										<FormControl>
											<Input
												type="number"
												placeholder="0"
												{...field}
											/>
										</FormControl>
										<FormDescription>
											Order within the module
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="duration"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Duration (minutes)
										</FormLabel>
										<FormControl>
											<Input
												type="number"
												placeholder="30"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="status"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Status</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select status" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="draft">
													Draft
												</SelectItem>
												<SelectItem value="published">
													Published
												</SelectItem>
												<SelectItem value="archived">
													Archived
												</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</CardContent>
					</Card>

					<div className="flex justify-end gap-4">
						<Button
							type="button"
							variant="outline"
							onClick={() => router.back()}
							disabled={isLoading}
						>
							Cancel
						</Button>
						<Button type="submit" disabled={isLoading}>
							{isLoading && (
								<TbLoader2 className="mr-2 h-4 w-4 animate-spin" />
							)}
							Create Lesson
						</Button>
					</div>
				</form>
			</Form>

			{/* Lesson Content Editor */}
			<Card>
				<CardHeader>
					<CardTitle>Lesson Content</CardTitle>
				</CardHeader>
				<CardContent className="overflow-hidden">
					<div className="w-full max-w-full">
						<LessonEditor ref={editorRef} />
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
