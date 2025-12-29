"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function BlogPage() {
	return (
		<div className="min-h-screen flex flex-col">
			<main className="flex-grow">
				{/* Hero Section */}
				<section className="bg-gradient-to-b from-primary/5 to-background py-16">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
							Latest from Our Blog
						</h1>
						<p className="text-xl text-muted-foreground text-pretty">
							Insights on soul-care, counseling, and spiritual
							growth from our team.
						</p>
					</div>
				</section>

				{/* Blog Content */}
				<section className="py-16">
					<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="bg-white rounded-lg shadow-lg p-8">
							<h2 className="text-2xl font-bold text-foreground mb-6">
								Recent Articles
							</h2>

							<div className="prose max-w-none">
								<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 my-12">
									{[1, 2, 3, 4, 5, 6].map((item) => (
										<Card
											key={item}
											className="flex flex-col"
										>
											<div className="aspect-video bg-muted rounded-t-lg" />
											<CardHeader>
												<CardTitle>
													Understanding Biblical
													Counseling
												</CardTitle>
												<CardDescription>
													June 15, 2024 • 5 min read
												</CardDescription>
											</CardHeader>
											<CardContent className="flex-grow">
												<p className="text-muted-foreground mb-4">
													Exploring how Scripture
													provides wisdom for
													addressing life's
													challenges.
												</p>
												<Button
													variant="outline"
													className="mt-auto"
													asChild
												>
													<Link href="#">
														Read Article
													</Link>
												</Button>
											</CardContent>
										</Card>
									))}
								</div>

								<div className="flex justify-center mt-12">
									<div className="flex space-x-2">
										<Button variant="outline">1</Button>
										<Button variant="outline">2</Button>
										<Button variant="outline">3</Button>
										<Button variant="outline">Next</Button>
									</div>
								</div>
							</div>

							<div className="mt-12 text-center">
								<Button asChild>
									<Link href="/support-us">
										Back to Support Us
									</Link>
								</Button>
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
