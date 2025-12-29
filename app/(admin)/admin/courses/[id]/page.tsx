"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { TbPlus, TbTrash, TbLoader2 } from "react-icons/tb";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
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
import { ImageUpload } from "@/components/admin/image-upload";

const moduleSchema = z.object({
	moduleId: z.string().optional(),
	title: z.string().min(1, "Module title is required"),
	description: z.string().min(1, "Module description is required"),
});

const courseSchema = z.object({
	title: z.string().min(2, "Title must be at least 2 characters"),
	slug: z.string().min(2, "Slug must be at least 2 characters"),
	description: z
		.string()
		.min(10, "Description must be at least 10 characters"),
	shortDescription: z.string().optional(),
	thumbnail: z.string().min(1, "Thumbnail is required"),
	coverImage: z.string().min(1, "Cover image is required"),
	category: z.string().min(1, "Category is required"),
	tags: z.string().optional(),
	skillLevel: z.enum(["beginner", "intermediate", "advanced"]),
	language: z.string().min(1, "Language is required"),
	instructorName: z.string().min(1, "Instructor name is required"),
	accessType: z.enum(["free", "membership", "paid"]).default("free"),
	price: z.preprocess(
		(val) => (val === "" ? undefined : Number(val)),
		z.number().min(0).optional(),
	),
	status: z.enum(["draft", "published", "archived"]),
	modules: z.array(moduleSchema).optional(),
	learningOutcomes: z.array(z.object({ value: z.string() })).optional(),
});

type CourseFormValues = z.infer<typeof courseSchema>;

export default function EditCoursePage() {
	const router = useRouter();
	const params = useParams();
	const courseId = params.id as string;
	const [isLoading, setIsLoading] = useState(false);
	const [isFetching, setIsFetching] = useState(true);

	const form = useForm<CourseFormValues>({
		resolver: zodResolver(courseSchema),
		defaultValues: {
			title: "",
			slug: "",
			description: "",
			shortDescription: "",
			thumbnail: "",
			coverImage: "",
			category: "",
			tags: "",
			skillLevel: "beginner",
			language: "English",
			instructorName: "",
			accessType: "free",
			price: 0,
			status: "draft",
			modules: [],
			learningOutcomes: [],
		},
	});

	const {
		fields: moduleFields,
		append: appendModule,
		remove: removeModule,
	} = useFieldArray({
		control: form.control,
		name: "modules",
	});

	const {
		fields: outcomeFields,
		append: appendOutcome,
		remove: removeOutcome,
	} = useFieldArray({
		control: form.control,
		name: "learningOutcomes",
	});

	useEffect(() => {
		if (courseId) {
			fetchCourse();
		}
	}, [courseId]);

	async function fetchCourse() {
		try {
			const response = await fetch(`/api/admin/courses/${courseId}`);
			if (!response.ok) {
				throw new Error("Failed to fetch course");
			}
			const data = await response.json();
			const course = data.course;

			// Populate form with course data
			form.reset({
				title: course.title,
				slug: course.slug,
				description: course.description,
				shortDescription: course.shortDescription || "",
				thumbnail: course.thumbnail,
				coverImage: course.coverImage,
				category: course.category,
				tags: course.tags?.join(", ") || "",
				skillLevel: course.skillLevel,
				language: course.language,
				instructorName: course.instructorName,
				accessType: course.isPremium
					? course.price > 0
						? "paid"
						: "membership"
					: "free",
				price: course.price || 0,
				status: course.status,
				modules: course.modules || [],
				learningOutcomes:
					course.learningOutcomes?.map((outcome: string) => ({
						value: outcome,
					})) || [],
			});
		} catch (error) {
			console.error(error);
			toast.error("Failed to load course");
			router.push("/admin/courses");
		} finally {
			setIsFetching(false);
		}
	}

	async function onSubmit(data: CourseFormValues) {
		setIsLoading(true);
		try {
			const tagsArray = data.tags
				? data.tags.split(",").map((tag) => tag.trim())
				: [];
			const outcomesArray =
				data.learningOutcomes?.map((outcome) => outcome.value) || [];

			// Process modules
			const modulesArray =
				data.modules?.map((module, index) => ({
					moduleId:
						module.moduleId || `mod_${index + 1}_${Date.now()}`,
					moduleNumber: index + 1,
					order: index,
					title: module.title,
					description: module.description,
				})) || [];

			const payload = {
				title: data.title,
				slug: data.slug,
				description: data.description,
				shortDescription: data.shortDescription,
				thumbnail: data.thumbnail,
				coverImage: data.coverImage,
				category: data.category,
				tags: tagsArray,
				skillLevel: data.skillLevel,
				language: data.language,
				instructorName: data.instructorName,
				isPremium: data.accessType !== "free",
				price: data.accessType === "paid" ? data.price : 0,
				status: data.status,
				modules: modulesArray,
				learningOutcomes: outcomesArray,
			};

			const response = await fetch(`/api/admin/courses/${courseId}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || "Failed to update course");
			}

			toast.success("Course updated successfully");
			router.push("/admin/courses");
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

	if (isFetching) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<TbLoader2 className="h-12 w-12 animate-spin text-primary" />
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-6 p-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">
					Edit Course
				</h1>
				<p className="text-muted-foreground">
					Update course information and settings.
				</p>
			</div>
			<Separator />

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8"
				>
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
												placeholder="Course Title"
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
												placeholder="course-url-slug"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem className="md:col-span-2">
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Detailed course description"
												className="min-h-[100px]"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="shortDescription"
								render={({ field }) => (
									<FormItem className="md:col-span-2">
										<FormLabel>Short Description</FormLabel>
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
						</CardContent>
					</Card>

					{/* Images */}
					<Card>
						<CardHeader>
							<CardTitle>Images</CardTitle>
						</CardHeader>
						<CardContent className="grid gap-6 md:grid-cols-2">
							<FormField
								control={form.control}
								name="thumbnail"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Thumbnail</FormLabel>
										<FormControl>
											<ImageUpload
												value={field.value}
												onChange={field.onChange}
												label="Upload Thumbnail"
											/>
										</FormControl>
										<FormDescription>
											Recommended size: 400x300px
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="coverImage"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Cover Image</FormLabel>
										<FormControl>
											<ImageUpload
												value={field.value}
												onChange={field.onChange}
												label="Upload Cover Image"
											/>
										</FormControl>
										<FormDescription>
											Recommended size: 1200x400px
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</CardContent>
					</Card>

					{/* Course Details */}
					<Card>
						<CardHeader>
							<CardTitle>Course Details</CardTitle>
						</CardHeader>
						<CardContent className="grid gap-6 md:grid-cols-2">
							<FormField
								control={form.control}
								name="category"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Category</FormLabel>
										<FormControl>
											<Input
												placeholder="e.g., Bible Study"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="tags"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tags</FormLabel>
										<FormControl>
											<Input
												placeholder="Comma separated tags"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="skillLevel"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Skill Level</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select skill level" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="beginner">
													Beginner
												</SelectItem>
												<SelectItem value="intermediate">
													Intermediate
												</SelectItem>
												<SelectItem value="advanced">
													Advanced
												</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="language"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Language</FormLabel>
										<FormControl>
											<Input
												placeholder="English"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="instructorName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Instructor Name</FormLabel>
										<FormControl>
											<Input
												placeholder="John Doe"
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

					{/* Access & Pricing */}
					<Card>
						<CardHeader>
							<CardTitle>Access Type</CardTitle>
						</CardHeader>
						<CardContent className="grid gap-6 md:grid-cols-2">
							<FormField
								control={form.control}
								name="accessType"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Access Type</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select access type" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="free">
													Free
												</SelectItem>
												<SelectItem value="membership">
													Membership Only
												</SelectItem>
												<SelectItem value="paid">
													Paid
												</SelectItem>
											</SelectContent>
										</Select>
										<FormDescription>
											Who can access this course
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							{form.watch("accessType") === "paid" && (
								<FormField
									control={form.control}
									name="price"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Price (KES)</FormLabel>
											<FormControl>
												<Input
													type="number"
													step="0.01"
													placeholder="99.99"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							)}
						</CardContent>
					</Card>

					{/* Modules */}
					<Card>
						<CardHeader>
							<div className="flex items-center justify-between">
								<CardTitle>Modules</CardTitle>
								<Button
									type="button"
									variant="outline"
									size="sm"
									onClick={() =>
										appendModule({
											title: "",
											description: "",
										})
									}
								>
									<TbPlus className="mr-2 h-4 w-4" />
									Add Module
								</Button>
							</div>
						</CardHeader>
						<CardContent className="space-y-4">
							{moduleFields.map((field, index) => (
								<div
									key={field.id}
									className="flex gap-4 items-start border p-4 rounded-lg"
								>
									<div className="flex-1 space-y-4">
										<FormField
											control={form.control}
											name={`modules.${index}.title`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Module {index + 1} Title
													</FormLabel>
													<FormControl>
														<Input
															placeholder="Module title"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`modules.${index}.description`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Description
													</FormLabel>
													<FormControl>
														<Textarea
															placeholder="Module description"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<Button
										type="button"
										variant="ghost"
										size="icon"
										onClick={() => removeModule(index)}
									>
										<TbTrash className="h-4 w-4 text-destructive" />
									</Button>
								</div>
							))}
							{moduleFields.length === 0 && (
								<p className="text-sm text-muted-foreground text-center py-4">
									No modules added yet. Click "Add Module" to
									get started.
								</p>
							)}
						</CardContent>
					</Card>

					{/* Learning Outcomes */}
					<Card>
						<CardHeader>
							<div className="flex items-center justify-between">
								<CardTitle>Learning Outcomes</CardTitle>
								<Button
									type="button"
									variant="outline"
									size="sm"
									onClick={() => appendOutcome({ value: "" })}
								>
									<TbPlus className="mr-2 h-4 w-4" />
									Add Outcome
								</Button>
							</div>
						</CardHeader>
						<CardContent className="space-y-4">
							{outcomeFields.map((field, index) => (
								<div
									key={field.id}
									className="flex gap-4 items-center"
								>
									<FormField
										control={form.control}
										name={`learningOutcomes.${index}.value`}
										render={({ field }) => (
											<FormItem className="flex-1">
												<FormControl>
													<Input
														placeholder="What will students learn?"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<Button
										type="button"
										variant="ghost"
										size="icon"
										onClick={() => removeOutcome(index)}
									>
										<TbTrash className="h-4 w-4 text-destructive" />
									</Button>
								</div>
							))}
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
							Update Course
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
