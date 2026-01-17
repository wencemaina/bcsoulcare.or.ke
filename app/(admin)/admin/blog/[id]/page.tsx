"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { Separator } from "@/components/ui/separator";
import {
	ArrowLeft,
	Download,
	Trash,
	User,
	Share2,
	MessageSquare,
	Heart,
	Edit3,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { useParams } from "next/navigation";

export default function BlogDetailPage() {
	const { id } = useParams();

	// Mock blog post data
	const blogPost = {
		id: "POST-001",
		title: "5 Tips for Sustainable Agriculture in Kenya",
		author: "Jane Mwangi",
		date: "2024-05-15",
		status: "Published",
		category: "Agriculture",
		excerpt:
			"Learn how to implement sustainable farming practices that can improve your yields while protecting the environment.",
		content:
			"Sustainable agriculture is crucial for Kenya's food security and environmental health. Here are five key tips to implement sustainable farming practices:\n\n1. Crop rotation: Rotate different crops to maintain soil fertility and reduce pest buildup.\n2. Organic farming: Use natural fertilizers and pest control methods.\n3. Water conservation: Implement drip irrigation and rainwater harvesting.\n4. Soil conservation: Use cover crops and terracing to prevent erosion.\n5. Integrated pest management: Combine biological, cultural, and mechanical methods to control pests.",
		tags: ["sustainable agriculture", "farming", "environment", "Kenya"],
		views: 1245,
		likes: 89,
		comments: 23,
		publishedDate: "2024-05-15T09:30:00Z",
		lastModified: "2024-05-14T14:20:00Z",
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
							{blogPost.title}
						</h1>
						<div className="flex items-center space-x-2 text-sm text-muted-foreground">
							<span>Post ID: {blogPost.id}</span>
							<span>•</span>
							<Badge
								variant="secondary"
								className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 border-none"
							>
								Published
							</Badge>
						</div>
					</div>
				</div>
				<div className="flex space-x-2">
					<Button variant="outline">
						<Share2 className="mr-2 h-4 w-4" /> Share
					</Button>
					<Button variant="outline">
						<Download className="mr-2 h-4 w-4" /> Export
					</Button>
					<Button variant="destructive">
						<Trash className="mr-2 h-4 w-4" /> Delete
					</Button>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Left Column - Content */}
				<div className="lg:col-span-2 space-y-6">
					{/* Post Content */}
					<Card>
						<CardHeader>
							<CardTitle>Post Content</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label className="text-sm font-medium text-muted-foreground">
									Title
								</Label>
								<h1 className="text-2xl font-bold">
									{blogPost.title}
								</h1>
							</div>

							<div className="space-y-2">
								<Label className="text-sm font-medium text-muted-foreground">
									Excerpt
								</Label>
								<p className="text-muted-foreground">
									{blogPost.excerpt}
								</p>
							</div>

							<div className="space-y-2">
								<Label className="text-sm font-medium text-muted-foreground">
									Content
								</Label>
								<div className="prose max-w-none">
									{blogPost.content
										.split("\n\n")
										.map((paragraph, index) => (
											<p key={index} className="mb-4">
												{paragraph}
											</p>
										))}
								</div>
							</div>

							<div className="space-y-2">
								<Label className="text-sm font-medium text-muted-foreground">
									Tags
								</Label>
								<div className="flex flex-wrap gap-2">
									{blogPost.tags.map((tag, index) => (
										<Badge key={index} variant="secondary">
											{tag}
										</Badge>
									))}
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Comments Section */}
					<Card>
						<CardHeader>
							<CardTitle>
								Comments ({blogPost.comments})
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-4">
								{/* Mock comments */}
								<div className="border-b pb-4 last:border-0 last:pb-0">
									<div className="flex items-start space-x-3">
										<div className="bg-muted rounded-full h-10 w-10 flex items-center justify-center">
											<User className="h-5 w-5 text-muted-foreground" />
										</div>
										<div className="flex-1">
											<div className="flex items-center justify-between">
												<h4 className="font-medium">
													Samuel Kariuki
												</h4>
												<span className="text-xs text-muted-foreground">
													2 hours ago
												</span>
											</div>
											<p className="text-sm mt-1 text-muted-foreground">
												Great article! I've been
												implementing crop rotation and
												have seen significant
												improvements in soil health.
											</p>
											<div className="flex space-x-4 mt-2">
												<Button
													variant="ghost"
													size="sm"
													className="h-6 text-xs"
												>
													<MessageSquare className="mr-1 h-3 w-3" />{" "}
													Reply
												</Button>
												<Button
													variant="ghost"
													size="sm"
													className="h-6 text-xs"
												>
													<Heart className="mr-1 h-3 w-3" />{" "}
													Like
												</Button>
											</div>
										</div>
									</div>
								</div>

								<div className="border-b pb-4 last:border-0 last:pb-0">
									<div className="flex items-start space-x-3">
										<div className="bg-muted rounded-full h-10 w-10 flex items-center justify-center">
											<User className="h-5 w-5 text-muted-foreground" />
										</div>
										<div className="flex-1">
											<div className="flex items-center justify-between">
												<h4 className="font-medium">
													Grace Wanjiku
												</h4>
												<span className="text-xs text-muted-foreground">
													1 day ago
												</span>
											</div>
											<p className="text-sm mt-1 text-muted-foreground">
												Very informative. Would love to
												read more about water
												conservation techniques.
											</p>
											<div className="flex space-x-4 mt-2">
												<Button
													variant="ghost"
													size="sm"
													className="h-6 text-xs"
												>
													<MessageSquare className="mr-1 h-3 w-3" />{" "}
													Reply
												</Button>
												<Button
													variant="ghost"
													size="sm"
													className="h-6 text-xs"
												>
													<Heart className="mr-1 h-3 w-3" />{" "}
													Like
												</Button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Right Column - Meta & Actions */}
				<div className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Post Status</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label>Post Status</Label>
								<Select defaultValue="published">
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="published">
											Published
										</SelectItem>
										<SelectItem value="draft">
											Draft
										</SelectItem>
										<SelectItem value="archived">
											Archived
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<Button className="w-full">Update Status</Button>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Post Information</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-3">
								<div className="flex justify-between">
									<span className="text-sm text-muted-foreground">
										Author
									</span>
									<span className="font-medium">
										{blogPost.author}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-sm text-muted-foreground">
										Category
									</span>
									<Badge variant="outline">
										{blogPost.category}
									</Badge>
								</div>
								<div className="flex justify-between">
									<span className="text-sm text-muted-foreground">
										Published Date
									</span>
									<span className="font-medium">
										{blogPost.date}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-sm text-muted-foreground">
										Last Modified
									</span>
									<span className="font-medium">
										May 14, 2024
									</span>
								</div>
								<Separator />
								<div className="flex justify-between">
									<span className="text-sm text-muted-foreground">
										Views
									</span>
									<span className="font-medium">
										{blogPost.views}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-sm text-muted-foreground">
										Likes
									</span>
									<span className="font-medium">
										{blogPost.likes}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-sm text-muted-foreground">
										Comments
									</span>
									<span className="font-medium">
										{blogPost.comments}
									</span>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Post Actions</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<Button variant="outline" className="w-full">
								<Edit3 className="mr-2 h-4 w-4" /> Edit Post
							</Button>
							<Button variant="outline" className="w-full">
								<Share2 className="mr-2 h-4 w-4" /> Share
							</Button>
							<Button variant="outline" className="w-full">
								<Download className="mr-2 h-4 w-4" /> Download
								as PDF
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
