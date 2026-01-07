"use client";

import { useEffect, useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { NewsletterSignup } from "@/components/newsletter-signup";
import {
	BookOpen,
	Download,
	Play,
	Search,
	Filter,
	Calendar,
	User,
	Loader2,
} from "lucide-react";
import { SoulCareResource } from "@/lib/mongodb";

export default function ResourcesPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [resources, setResources] = useState<SoulCareResource[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const categories = [
		{ value: "all", label: "All Resources" },
		{ value: "article", label: "Articles" },
		{ value: "study", label: "Study Guides" },
		{ value: "audio", label: "Audio/Video" },
		{ value: "book", label: "Recommended Books" },
		{ value: "worksheet", label: "Worksheets" },
	];

	useEffect(() => {
		async function fetchResources() {
			try {
				const res = await fetch("/api/resources");
				const data = await res.json();
				if (res.ok) {
					setResources(data.resources);
				}
			} catch (error) {
				console.error("Error fetching resources:", error);
			} finally {
				setIsLoading(false);
			}
		}

		fetchResources();
	}, []);

	const filteredResources = resources.filter((resource) => {
		const matchesSearch =
			resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			resource.description
				.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			resource.author.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesCategory =
			selectedCategory === "all" ||
			resource.category === selectedCategory;
		return matchesSearch && matchesCategory;
	});

	const featuredResources = resources.filter((resource) => resource.featured);

	const getCategoryColor = (category: string) => {
		const colors = {
			article: "bg-blue-100 text-blue-800",
			study: "bg-green-100 text-green-800",
			audio: "bg-purple-100 text-purple-800",
			book: "bg-orange-100 text-orange-800",
			worksheet: "bg-red-100 text-red-800",
		};
		return (
			colors[category as keyof typeof colors] ||
			"bg-gray-100 text-gray-800"
		);
	};

	const getIcon = (category: string) => {
		const icons = {
			article: BookOpen,
			study: BookOpen,
			audio: Play,
			book: BookOpen,
			worksheet: Download,
		};
		return icons[category as keyof typeof icons] || BookOpen;
	};

	return (
		<>
			<main>
				{/* Hero Section */}
				<section className="bg-gradient-to-b from-primary/5 to-background py-16">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
							Resources
						</h1>
						<p className="text-xl text-muted-foreground text-pretty">
							Discover articles, study guides, audio teachings,
							and recommended books to support your spiritual
							growth and faith journey.
						</p>
					</div>
				</section>

				{/* Featured Resources */}
				{!isLoading && featuredResources.length > 0 && (
					<section className="py-16 bg-muted/30">
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
							<h2 className="text-3xl font-bold text-foreground mb-8 text-center">
								Featured Resources
							</h2>
							<div className="grid md:grid-cols-3 gap-8">
								{featuredResources.map((resource) => {
									const Icon = getIcon(resource.category);
									return (
										<Card
											key={resource.resourceId}
											className="h-full hover:shadow-lg transition-shadow duration-300"
										>
											<CardHeader>
												<div className="flex items-center justify-between mb-2">
													<Badge
														className={getCategoryColor(
															resource.category,
														)}
													>
														{
															categories.find(
																(c) =>
																	c.value ===
																	resource.category,
															)?.label
														}
													</Badge>
													<Icon className="h-5 w-5 text-muted-foreground" />
												</div>
												<CardTitle className="text-lg">
													{resource.title}
												</CardTitle>
												<CardDescription className="text-sm leading-relaxed">
													{resource.description}
												</CardDescription>
											</CardHeader>
											<CardContent className="space-y-4">
												<div className="space-y-2 text-sm text-muted-foreground">
													<div className="flex items-center gap-2">
														<User className="h-4 w-4" />
														<span>
															{resource.author}
														</span>
													</div>
													<div className="flex items-center gap-2">
														<Calendar className="h-4 w-4" />
														<span>
															{new Date(
																resource.date,
															).toLocaleDateString()}
														</span>
													</div>
													{resource.readTime && (
														<div className="flex items-center gap-2">
															<span>
																{
																	resource.readTime
																}
															</span>
														</div>
													)}
													{resource.pages && (
														<div className="flex items-center gap-2">
															<span>
																{resource.pages}
															</span>
														</div>
													)}
													{resource.duration && (
														<div className="flex items-center gap-2">
															<Play className="h-4 w-4" />
															<span>
																{
																	resource.duration
																}
															</span>
														</div>
													)}
												</div>
												<Button className="w-full flex items-center justify-center gap-2" asChild>
													<a href={resource.downloadUrl} target="_blank" rel="noopener noreferrer">
														<Download className="h-4 w-4" />
														Access Resource
													</a>
												</Button>
											</CardContent>
										</Card>
									);
								})}
							</div>
						</div>
					</section>
				)}

				{/* Search and Filter */}
				<section className="py-8 bg-background">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex flex-col md:flex-row gap-4 items-center">
							<div className="relative flex-1 max-w-md">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
								<Input
									placeholder="Search resources..."
									value={searchTerm}
									onChange={(e) =>
										setSearchTerm(e.target.value)
									}
									className="pl-10"
								/>
							</div>
							<div className="flex items-center gap-2">
								<Filter className="h-4 w-4 text-muted-foreground" />
								<select
									value={selectedCategory}
									onChange={(e) =>
										setSelectedCategory(e.target.value)
									}
									className="px-3 py-2 border border-input rounded-md bg-background"
								>
									{categories.map((category) => (
										<option
											key={category.value}
											value={category.value}
										>
											{category.label}
										</option>
									))}
								</select>
							</div>
						</div>
					</div>
				</section>

				{/* All Resources */}
				<section className="py-16">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<h2 className="text-3xl font-bold text-foreground mb-8 text-center">
							All Resources
						</h2>
						{isLoading ? (
							<div className="flex items-center justify-center py-20">
								<Loader2 className="h-8 w-8 animate-spin text-primary" />
							</div>
						) : filteredResources.length === 0 ? (
							<div className="text-center py-12">
								<p className="text-muted-foreground text-lg">
									No resources found matching your criteria.
								</p>
								<Button
									variant="outline"
									onClick={() => {
										setSearchTerm("");
										setSelectedCategory("all");
									}}
									className="mt-4"
								>
									Clear Filters
								</Button>
							</div>
						) : (
							<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
								{filteredResources.map((resource) => {
									const Icon = getIcon(resource.category);
									return (
										<Card
											key={resource.resourceId}
											className="h-full hover:shadow-lg transition-shadow duration-300"
										>
											<CardHeader>
												<div className="flex items-center justify-between mb-2">
													<Badge
														className={getCategoryColor(
															resource.category,
														)}
													>
														{
															categories.find(
																(c) =>
																	c.value ===
																	resource.category,
															)?.label
														}
													</Badge>
													<Icon className="h-4 w-4 text-muted-foreground" />
												</div>
												<CardTitle className="text-lg">
													{resource.title}
												</CardTitle>
												<CardDescription className="text-sm leading-relaxed">
													{resource.description}
												</CardDescription>
											</CardHeader>
											<CardContent className="space-y-4">
												<div className="space-y-1 text-xs text-muted-foreground">
													<div className="flex items-center gap-2">
														<User className="h-3 w-3" />
														<span>
															{resource.author}
														</span>
													</div>
													<div className="flex items-center gap-2">
														<Calendar className="h-3 w-3" />
														<span>
															{new Date(
																resource.date,
															).toLocaleDateString()}
														</span>
													</div>
													{(resource.readTime ||
														resource.pages ||
														resource.duration) && (
															<div className="flex items-center gap-2">
																<span>
																	{resource.readTime ||
																		resource.pages ||
																		resource.duration}
																</span>
															</div>
														)}
												</div>
												<Button
													variant="outline"
													className="w-full flex items-center justify-center gap-2 bg-transparent"
													asChild
												>
													<a href={resource.downloadUrl} target="_blank" rel="noopener noreferrer">
														<Download className="h-4 w-4" />
														Access
													</a>
												</Button>
											</CardContent>
										</Card>
									);
								})}
							</div>
						)}
					</div>
				</section>

				{/* External Resources */}
				<section className="py-16 bg-muted/30">
					<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
						<h2 className="text-3xl font-bold text-foreground mb-8 text-center">
							External Resources
						</h2>
						<p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
							Discover additional resources from trusted partners
							and organizations that align with our biblical
							counseling approach.
						</p>

						<div className="grid md:grid-cols-2 gap-8">
							<Card className="h-full hover:shadow-lg transition-shadow duration-300">
								<CardHeader>
									<div className="flex items-center justify-between mb-2">
										<Badge className="bg-blue-100 text-blue-800">
											Biblical Counseling
										</Badge>
										<BookOpen className="h-5 w-5 text-muted-foreground" />
									</div>
									<CardTitle className="text-xl">
										Biblical Counseling Center - Resource
										Center
									</CardTitle>
									<CardDescription className="text-sm leading-relaxed">
										Comprehensive biblical counseling
										resources including articles, training
										materials, and practical tools for
										Christ-centered counseling and soul
										care.
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="space-y-2 text-sm text-muted-foreground">
										<div className="flex items-center gap-2">
											<span>
												• Training materials and courses
											</span>
										</div>
										<div className="flex items-center gap-2">
											<span>
												• Biblical counseling articles
											</span>
										</div>
										<div className="flex items-center gap-2">
											<span>
												• Practical ministry tools
											</span>
										</div>
									</div>
									<Button
										className="w-full flex items-center justify-center gap-2"
										onClick={() =>
											window.open(
												"https://biblicalcounselingcenter.org/resource-center/",
												"_blank",
											)
										}
									>
										<BookOpen className="h-4 w-4" />
										Visit Resource Center
									</Button>
								</CardContent>
							</Card>

							<Card className="h-full hover:shadow-lg transition-shadow duration-300">
								<CardHeader>
									<div className="flex items-center justify-between mb-2">
										<Badge className="bg-purple-100 text-purple-800">
											Mental Health Support
										</Badge>
										<BookOpen className="h-5 w-5 text-muted-foreground" />
									</div>
									<CardTitle className="text-xl">
										Soul Sisters Memorial Foundation -
										Nelly's Project
									</CardTitle>
									<CardDescription className="text-sm leading-relaxed">
										Supporting mental health awareness and
										providing resources for healing and hope
										in the community through compassionate
										care and advocacy.
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="space-y-2 text-sm text-muted-foreground">
										<div className="flex items-center gap-2">
											<span>
												• Mental health awareness
												initiatives
											</span>
										</div>
										<div className="flex items-center gap-2">
											<span>
												• Community support programs
											</span>
										</div>
										<div className="flex items-center gap-2">
											<span>
												• Hope and healing resources
											</span>
										</div>
									</div>
									<Button
										className="w-full flex items-center justify-center gap-2"
										onClick={() =>
											window.open(
												"https://www.soulsistersmemorialfoundation.com/nellys-project-9-event",
												"_blank",
											)
										}
									>
										<BookOpen className="h-4 w-4" />
										Learn More
									</Button>
								</CardContent>
							</Card>
						</div>
					</div>
				</section>

				{/* Newsletter Signup */}
				<section className="py-16 bg-primary/5">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<h2 className="text-3xl font-bold text-foreground mb-6">
							Stay Updated
						</h2>
						<p className="text-lg text-muted-foreground mb-8">
							Subscribe to our newsletter to receive new
							resources, articles, and updates directly in your
							inbox.
						</p>
						<NewsletterSignup variant="inline" />
					</div>
				</section>
			</main>
		</>
	);
}
