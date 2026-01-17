import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import {
	ArrowLeft,
	Share2,
	Facebook,
	Twitter,
	Linkedin,
} from "lucide-react";
import React from "react";
import { connectToDatabase } from "@/lib/mongodb";
import { notFound } from "next/navigation";

export default async function BlogDetailPage({
	params,
}: {
	params: { id: string };
}) {
	const { id: slug } = await params;

	const db = await connectToDatabase();
	const article = await db.collection("blogs").findOne({ slug });

	if (!article) {
		notFound();
	}

	return (
		<div className="min-h-screen bg-background">
			{/* Header with back button */}
			<div className="border-b">
				<div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
					<Button variant="ghost" size="sm" asChild>
						<Link href="/blog" className="gap-2">
							<ArrowLeft className="h-4 w-4" />
							Back to Blog
						</Link>
					</Button>
				</div>
			</div>

			{/* Hero Section */}
			<div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
				<div className="max-w-4xl mx-auto">
					{/* Category and metadata */}
					<div className="flex items-center gap-4 mb-6">
						<Badge
							variant="secondary"
							className="bg-primary/10 text-primary border-none"
						>
							{article.category}
						</Badge>
					</div>

					{/* Title */}
					<h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
						{article.title}
					</h1>

					{/* Header actions */}
					<div className="flex items-center justify-end mb-8 pb-8 border-b">

						{/* Share buttons */}
						<div className="flex items-center gap-2">
							<Button variant="outline" size="sm">
								<Share2 className="h-4 w-4 mr-2" />
								Share
							</Button>
						</div>
					</div>

					{/* Featured Image */}
					<div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-12 border">
						<Image
							src={article.image || "/placeholder.svg"}
							alt={article.title}
							fill
							className="object-cover"
							priority
						/>
					</div>

					{/* Article Content */}
					<div className="prose prose-lg max-w-none">
						<div className="text-xl text-muted-foreground mb-8 font-medium leading-relaxed">
							{article.excerpt}
						</div>

						<div
							className="space-y-6 text-foreground/90 leading-relaxed"
							dangerouslySetInnerHTML={{
								__html: article.content,
							}}
						/>
					</div>

					{/* Social Share Section */}
					<div className="mt-16 pt-8 border-t">
						<h3 className="text-lg font-semibold mb-4">
							Share this article
						</h3>
						<div className="flex gap-3">
							<Button
								variant="outline"
								size="sm"
								className="gap-2"
							>
								<Facebook className="h-4 w-4" />
								Facebook
							</Button>
							<Button
								variant="outline"
								size="sm"
								className="gap-2"
							>
								<Twitter className="h-4 w-4" />
								Twitter
							</Button>
							<Button
								variant="outline"
								size="sm"
								className="gap-2"
							>
								<Linkedin className="h-4 w-4" />
								LinkedIn
							</Button>
						</div>
					</div>

					{/* Related Articles */}
					<div className="mt-16 pt-8 border-t">
						<h3 className="text-2xl font-bold mb-8">
							More Articles
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							{(
								await db
									.collection("blogs")
									.find({ slug: { $ne: slug } })
									.limit(2)
									.toArray()
							).map((relatedArticle, i) => (
								<Link
									key={i}
									href={`/blog/${relatedArticle.slug}`}
									className="group"
								>
									<Card className="overflow-hidden border hover:border-primary transition-colors">
										<div className="relative w-full aspect-video">
											<Image
												src={
													relatedArticle.image ||
													"/placeholder.svg"
												}
												alt={relatedArticle.title}
												fill
												className="object-cover transition-transform duration-500 group-hover:scale-105"
											/>
										</div>
										<CardContent className="p-6">
											<Badge
												variant="secondary"
												className="bg-primary/10 text-primary border-none mb-3"
											>
												{relatedArticle.category}
											</Badge>
											<h4 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
												{relatedArticle.title}
											</h4>
											<p className="text-sm text-muted-foreground line-clamp-2">
												{relatedArticle.excerpt}
											</p>
										</CardContent>
									</Card>
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
