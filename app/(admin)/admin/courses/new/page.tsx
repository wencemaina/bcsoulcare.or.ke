"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ImageUpload } from "@/components/admin/image-upload";

const moduleSchema = z.object({
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
	tags: z.string().optional(), // Comma separated string for input
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

export default function CreateCoursePage() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

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

	async function onSubmit(data: CourseFormValues) {
		setIsLoading(true);
		try {
			// Transform tags string to array
			const tagsArray = data.tags
				? data.tags
						.split(",")
						.map((tag) => tag.trim())
						.filter((tag) => tag !== "")
				: [];

			// Transform learning outcomes to simple string array
			const outcomesArray = data.learningOutcomes
				? data.learningOutcomes.map((o) => o.value)
				: [];

			// Transform modules to match interface (add moduleId, number, order)
			const transformedModules = data.modules?.map((mod, index) => ({
				moduleId: `mod_${index + 1}_${Date.now()}`, // simple generation
				moduleNumber: index + 1,
				order: index,
				title: mod.title,
				description: mod.description,
			}));

			const payload = {
				...data,
				tags: tagsArray,
				learningOutcomes: outcomesArray,
				modules: transformedModules,
			};

			const response = await fetch("/api/admin/courses", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || "Failed to create course");
			}

			toast.success("Course created successfully");
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

	return (
		<div className="flex flex-col gap-6 p-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">
					Create Course
				</h1>
				<p className="text-muted-foreground">
					Add a new course to the catalog.
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
												placeholder="Detailed course description..."
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
											<Input
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

					{/* Media & categorization */}
					<Card>
						<CardHeader>
							<CardTitle>Media & Categorization</CardTitle>
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
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="category"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Category</FormLabel>
										<FormControl>
											<Input
												placeholder="e.g. Technology"
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
										<FormLabel>
											Tags (comma separated)
										</FormLabel>
										<FormControl>
											<Input
												placeholder="react, typescript, web dev"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</CardContent>
					</Card>

					{/* Details & Pricing */}
					<Card>
						<CardHeader>
							<CardTitle>Details & Pricing</CardTitle>
						</CardHeader>
						<CardContent className="grid gap-6 md:grid-cols-2">
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
													<SelectValue placeholder="Select level" />
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
							<FormField
								control={form.control}
								name="accessType"
								render={({ field }) => (
									<FormItem className="md:col-span-2">
										<FormLabel>Access Type</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<SelectTrigger>
													<SelectValue placeholder="Select access type" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="free">
														Free - Anyone can access
													</SelectItem>
													<SelectItem value="membership">
														Membership Required -
														Requires active
														membership
													</SelectItem>
													<SelectItem value="paid">
														Paid - One-time purchase
													</SelectItem>
												</SelectContent>
											</Select>
										</FormControl>
										<FormDescription>
											Choose who can access this course
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</CardContent>
					</Card>

					{/* Curriculum */}
					<Card>
						<CardHeader>
							<CardTitle>Curriculum (Modules)</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							{moduleFields.map((field, index) => (
								<div
									key={field.id}
									className="flex gap-4 items-start border p-4 rounded-md"
								>
									<div className="grid gap-4 flex-1">
										<FormField
											control={form.control}
											name={`modules.${index}.title`}
											render={({ field }) => (
												<FormItem>
													<FormLabel className="text-xs">
														Module {index + 1} Title
													</FormLabel>
													<FormControl>
														<Input
															{...field}
															placeholder="Introduction"
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
													<FormControl>
														<Textarea
															{...field}
															placeholder="What's in this module?"
															className="min-h-[60px]"
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
										className="mt-6"
									>
										<TbTrash className="h-4 w-4 text-destructive" />
									</Button>
								</div>
							))}
							<Button
								type="button"
								variant="outline"
								size="sm"
								className="mt-2"
								onClick={() =>
									appendModule({ title: "", description: "" })
								}
							>
								<TbPlus className="mr-2 h-4 w-4" /> Add Module
							</Button>
						</CardContent>
					</Card>

					{/* Learning Outcomes */}
					<Card>
						<CardHeader>
							<CardTitle>Learning Outcomes</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							{outcomeFields.map((field, index) => (
								<div
									key={field.id}
									className="flex gap-2 items-center"
								>
									<FormField
										control={form.control}
										name={`learningOutcomes.${index}.value`}
										render={({ field }) => (
											<FormItem className="flex-1">
												<FormControl>
													<Input
														{...field}
														placeholder={`Outcome ${
															index + 1
														}`}
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
							<Button
								type="button"
								variant="outline"
								size="sm"
								className="mt-2"
								onClick={() => appendOutcome({ value: "" })}
							>
								<TbPlus className="mr-2 h-4 w-4" /> Add Outcome
							</Button>
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
							Create Course
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
