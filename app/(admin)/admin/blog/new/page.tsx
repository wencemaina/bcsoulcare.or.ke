"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Calendar,
	FileText,
	AlertCircle,
	ArrowLeft,
	Hash,
	User,
	Image as ImageIcon,
	X,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";

export default function CreateBlogPostPage() {
	const [formData, setFormData] = useState({
		title: "",
		excerpt: "",
		content: "",
		author: "",
		category: "",
		tags: "",
		status: "draft",
		image: "",
	});

	const [errors, setErrors] = useState<Record<string, string>>({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

		// Clear error when user starts typing
		if (errors[name]) {
			setErrors((prev) => {
				const newErrors = { ...prev };
				delete newErrors[name];
				return newErrors;
			});
		}
	};

	const handleSelectChange = (name: string, value: string) => {
		setFormData((prev) => ({ ...prev, [name]: value }));

		// Clear error when user selects an option
		if (errors[name]) {
			setErrors((prev) => {
				const newErrors = { ...prev };
				delete newErrors[name];
				return newErrors;
			});
		}
	};

	const handleContentChange = (content: string) => {
		setFormData((prev) => ({ ...prev, content }));

		if (errors.content) {
			setErrors((prev) => {
				const newErrors = { ...prev };
				delete newErrors.content;
				return newErrors;
			});
		}
	};

	const validateForm = () => {
		const newErrors: Record<string, string> = {};

		if (!formData.title.trim()) newErrors.title = "Post title is required";
		if (!formData.excerpt.trim()) newErrors.excerpt = "Excerpt is required";
		if (!formData.content.trim()) newErrors.content = "Content is required";
		if (!formData.author.trim()) newErrors.author = "Author is required";
		if (!formData.category) newErrors.category = "Category is required";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) return;

		setIsSubmitting(true);

		try {
			const response = await fetch("/api/admin/blog", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Failed to create blog post");
			}

			console.log("Blog post created successfully:", data);
			alert("Blog post created successfully!");
			window.location.href = "/admin/blog";
		} catch (error: any) {
			console.error("Error creating blog post:", error);
			alert(error.message || "Failed to create blog post");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-4">
					<Button variant="outline" size="icon" asChild>
						<Link href="/admin/blog">
							<ArrowLeft className="h-4 w-4" />
						</Link>
					</Button>
					<div>
						<h1 className="text-2xl font-bold tracking-tight">
							Create New Blog Post
						</h1>
						<p className="text-sm text-muted-foreground">
							Write and publish a new article for the blog
						</p>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<div className="lg:col-span-2">
					<Card>
						<CardHeader>
							<CardTitle>Post Content</CardTitle>
							<CardDescription>
								Provide the content for your blog post
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							{Object.keys(errors).length > 0 && (
								<Alert variant="destructive">
									<AlertCircle className="h-4 w-4" />
									<AlertDescription>
										Please fix the errors in the form before
										submitting
									</AlertDescription>
								</Alert>
							)}

							<form onSubmit={handleSubmit}>
								<div className="space-y-4">
									{/* Title */}
									<div className="space-y-2">
										<Label htmlFor="title">Title *</Label>
										<div className="relative">
											<FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
											<Input
												id="title"
												name="title"
												placeholder="Enter post title"
												className="pl-10"
												value={formData.title}
												onChange={handleInputChange}
												aria-invalid={!!errors.title}
											/>
										</div>
										{errors.title && (
											<p className="text-sm text-destructive">
												{errors.title}
											</p>
										)}
									</div>

									{/* Excerpt */}
									<div className="space-y-2">
										<Label htmlFor="excerpt">
											Excerpt *
										</Label>
										<Textarea
											id="excerpt"
											name="excerpt"
											placeholder="Brief description of the post (appears in listings)"
											rows={3}
											value={formData.excerpt}
											onChange={handleInputChange}
											aria-invalid={!!errors.excerpt}
										/>
										{errors.excerpt && (
											<p className="text-sm text-destructive">
												{errors.excerpt}
											</p>
										)}
									</div>

									{/* Content */}
									<div className="space-y-2">
										<Label htmlFor="content">
											Content *
										</Label>
										<div className="w-full max-w-[calc(100vw-2rem)] lg:max-w-none overflow-hidden rounded-md border bg-card">
											<SimpleEditor
												value={formData.content}
												onChange={handleContentChange}
											/>
										</div>
										{errors.content && (
											<p className="text-sm text-destructive">
												{errors.content}
											</p>
										)}
									</div>

									{/* Tags */}
									<div className="space-y-2">
										<Label htmlFor="tags">Tags</Label>
										<div className="relative">
											<Hash className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
											<Input
												id="tags"
												name="tags"
												placeholder="Enter tags separated by commas (e.g. agriculture, farming, kenya)"
												className="pl-10"
												value={formData.tags}
												onChange={handleInputChange}
											/>
										</div>
									</div>
								</div>

								<div className="flex justify-end space-x-4 mt-8">
									<Button variant="outline" asChild>
										<Link href="/admin/blog">Cancel</Link>
									</Button>
									<Button
										type="submit"
										disabled={isSubmitting}
									>
										{isSubmitting
											? "Publishing..."
											: "Publish Post"}
									</Button>
								</div>
							</form>
						</CardContent>
					</Card>
				</div>

				<div className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Post Information</CardTitle>
							<CardDescription>
								Additional details about the post
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							{/* Author */}
							<div className="space-y-2">
								<Label htmlFor="author">Author *</Label>
								<div className="relative">
									<User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
									<Input
										id="author"
										name="author"
										placeholder="Author name"
										className="pl-10"
										value={formData.author}
										onChange={handleInputChange}
										aria-invalid={!!errors.author}
									/>
								</div>
								{errors.author && (
									<p className="text-sm text-destructive">
										{errors.author}
									</p>
								)}
							</div>

							{/* Category */}
							<div className="space-y-2">
								<Label htmlFor="category">Category *</Label>
								<Input
									id="category"
									name="category"
									value={formData.category}
									onChange={handleInputChange}
									placeholder="e.g. Agriculture, Soul Care, Events"
									aria-invalid={!!errors.category}
								/>
								{errors.category && (
									<p className="text-sm text-destructive">
										{errors.category}
									</p>
								)}
							</div>

							{/* Status */}
							<div className="space-y-2">
								<Label htmlFor="status">Status</Label>
								<Select
									value={formData.status}
									onValueChange={(value) =>
										handleSelectChange("status", value)
									}
								>
									<SelectTrigger id="status">
										<SelectValue />
									</SelectTrigger>
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
							</div>

							{/* Featured Image */}
							<div className="space-y-2">
								<Label htmlFor="image">Featured Image</Label>
								<div className="flex flex-col gap-4">
									{formData.image ? (
										<div className="relative aspect-video w-full overflow-hidden rounded-lg border">
											<img
												src={formData.image}
												alt="Featured"
												className="h-full w-full object-cover"
											/>
											<Button
												type="button"
												variant="destructive"
												size="icon"
												className="absolute right-2 top-2 h-8 w-8"
												onClick={() => {
													// Optional: Delete image from R2 immediately if removed from preview
													// For now, we just remove from form state
													setFormData((prev) => ({
														...prev,
														image: "",
													}));
												}}
											>
												<X className="h-4 w-4" />
											</Button>
										</div>
									) : (
										<div
											className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors relative"
											onClick={() =>
												document
													.getElementById(
														"image-upload",
													)
													?.click()
											}
										>
											<input
												id="image-upload"
												type="file"
												accept="image/*"
												className="hidden"
												onChange={async (e) => {
													const file =
														e.target.files?.[0];
													if (!file) return;

													// Show loading state or optimized preview here if needed
													setIsSubmitting(true);
													try {
														const formData =
															new FormData();
														formData.append(
															"file",
															file,
														);

														const res = await fetch(
															"/api/upload-image",
															{
																method: "POST",
																body: formData,
															},
														);
														const data =
															await res.json();
														if (!res.ok)
															throw new Error(
																data.error,
															);

														setFormData((prev) => ({
															...prev,
															image: data.url,
														}));
													} catch (err: any) {
														console.error(
															"Upload failed:",
															err,
														);
														alert(
															"Failed to upload image: " +
															err.message,
														);
													} finally {
														setIsSubmitting(false);
													}
												}}
											/>
											<ImageIcon className="mx-auto h-8 w-8 text-muted-foreground" />
											<p className="mt-2 text-sm text-muted-foreground">
												Click to upload image
											</p>
											<p className="text-xs text-muted-foreground">
												Recommended: 1200x600 pixels
											</p>
										</div>
									)}
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Post Preview</CardTitle>
							<CardDescription>
								How the post will appear to readers
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div>
									<h3 className="font-semibold text-lg">
										{formData.title || "Post Title"}
									</h3>
									<div className="flex items-center text-sm text-muted-foreground mt-1">
										<User className="mr-1 h-4 w-4" />
										<span>
											{formData.author || "Author Name"}
										</span>
										<span className="mx-2">•</span>
										<Calendar className="mr-1 h-4 w-4" />
										<span>Today</span>
									</div>
								</div>

								<div className="text-sm text-muted-foreground line-clamp-3">
									{formData.excerpt ||
										"Post excerpt will appear here..."}
								</div>

								<div className="flex flex-wrap gap-2 pt-2">
									{formData.tags ? (
										formData.tags
											.split(",")
											.slice(0, 3)
											.map((tag, index) => (
												<Badge
													key={index}
													variant="secondary"
													className="text-xs"
												>
													{tag.trim()}
												</Badge>
											))
									) : (
										<Badge
											variant="secondary"
											className="text-xs"
										>
											tag1
										</Badge>
									)}
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
