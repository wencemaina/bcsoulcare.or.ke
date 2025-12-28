"use client";

import type React from "react";

import { useState } from "react";
;
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
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FormHandler, type VolunteerApplicationData } from "@/lib/form-handler";
import {
	Heart,
	Users,
	Calendar,
	Gift,
	ArrowRight,
	Clock,
	CheckCircle,
	AlertCircle,
} from "lucide-react";

export default function GetInvolvedPage() {
	const [selectedOpportunity, setSelectedOpportunity] = useState<
		number | null
	>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitResult, setSubmitResult] = useState<{
		success: boolean;
		message: string;
	} | null>(null);
	const [formData, setFormData] = useState<VolunteerApplicationData>({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		opportunity: "",
		experience: "",
		motivation: "",
		availability: "",
		backgroundCheck: false,
	});

	const opportunities = [
		{
			id: 1,
			title: "Small Group Leader",
			category: "Leadership",
			commitment: "Weekly",
			timeRequired: "3-4 hours/week",
			description:
				"Guide and facilitate weekly small group discussions, providing spiritual leadership and pastoral care.",
			requirements: [
				"Completed leadership training",
				"2+ years of faith journey",
				"Heart for discipleship",
			],
			benefits: [
				"Leadership development",
				"Deep community connections",
				"Spiritual growth",
			],
			icon: Users,
		},
		{
			id: 2,
			title: "Children's Ministry Volunteer",
			category: "Ministry",
			commitment: "Monthly",
			timeRequired: "2-3 hours/month",
			description:
				"Help create a safe, fun, and engaging environment for children during services and events.",
			requirements: [
				"Background check",
				"Love for children",
				"Reliable attendance",
			],
			benefits: [
				"Joy of working with kids",
				"Flexible scheduling",
				"Training provided",
			],
			icon: Heart,
		},
		{
			id: 3,
			title: "Event Coordinator",
			category: "Administration",
			commitment: "Project-based",
			timeRequired: "5-10 hours/event",
			description:
				"Plan and execute community events, retreats, and special programs.",
			requirements: [
				"Organizational skills",
				"Event planning experience preferred",
				"Team player",
			],
			benefits: [
				"Creative expression",
				"Project management skills",
				"Community impact",
			],
			icon: Calendar,
		},
		{
			id: 4,
			title: "Counseling Support",
			category: "Care",
			commitment: "Flexible",
			timeRequired: "2-4 hours/week",
			description:
				"Provide administrative support to our counseling team and help with client care coordination.",
			requirements: [
				"Confidentiality agreement",
				"Compassionate heart",
				"Basic computer skills",
			],
			benefits: [
				"Mental health awareness",
				"Professional development",
				"Meaningful service",
			],
			icon: Heart,
		},
		{
			id: 5,
			title: "Community Outreach",
			category: "Service",
			commitment: "Monthly",
			timeRequired: "4-6 hours/month",
			description:
				"Participate in community service projects and outreach initiatives.",
			requirements: [
				"Heart for service",
				"Physical ability for various tasks",
				"Team collaboration",
			],
			benefits: [
				"Community connections",
				"Service experience",
				"Personal fulfillment",
			],
			icon: Gift,
		},
		{
			id: 6,
			title: "Prayer Team Member",
			category: "Prayer",
			commitment: "Weekly",
			timeRequired: "1-2 hours/week",
			description:
				"Commit to regular prayer for our community, programs, and prayer requests.",
			requirements: [
				"Commitment to prayer",
				"Confidentiality",
				"Heart for intercession",
			],
			benefits: [
				"Spiritual growth",
				"Prayer training",
				"Community support",
			],
			icon: Heart,
		},
	];

	const partnerships = [
		{
			title: "Local Food Bank",
			description: "Monthly food distribution and volunteer coordination",
			impact: "500+ families served monthly",
		},
		{
			title: "Community Shelter",
			description: "Meal preparation and homeless outreach programs",
			impact: "200+ meals provided weekly",
		},
		{
			title: "Senior Care Centers",
			description: "Visitation programs and activity coordination",
			impact: "50+ seniors visited monthly",
		},
		{
			title: "Youth Mentorship",
			description: "After-school programs and mentoring initiatives",
			impact: "75+ youth mentored annually",
		},
	];

	const getCategoryColor = (category: string) => {
		const colors = {
			Leadership: "bg-blue-100 text-blue-800",
			Ministry: "bg-green-100 text-green-800",
			Administration: "bg-purple-100 text-purple-800",
			Care: "bg-red-100 text-red-800",
			Service: "bg-orange-100 text-orange-800",
			Prayer: "bg-yellow-100 text-yellow-800",
		};
		return (
			colors[category as keyof typeof colors] ||
			"bg-gray-100 text-gray-800"
		);
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value, type } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]:
				type === "checkbox"
					? (e.target as HTMLInputElement).checked
					: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitResult(null);

		const selectedOpp = opportunities.find(
			(o) => o.id === selectedOpportunity,
		);
		const applicationData = {
			...formData,
			opportunity: selectedOpp?.title || "",
		};

		const result = await FormHandler.submitVolunteerApplication(
			applicationData,
		);
		setSubmitResult(result);
		setIsSubmitting(false);

		if (result.success) {
			setFormData({
				firstName: "",
				lastName: "",
				email: "",
				phone: "",
				opportunity: "",
				experience: "",
				motivation: "",
				availability: "",
				backgroundCheck: false,
			});
			setSelectedOpportunity(null);
		}
	};

	return (
		<div className="min-h-screen">
			<Header />
			<main>
				{/* Hero Section */}
				<section className="bg-gradient-to-b from-primary/5 to-background py-16">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
							Get Involved
						</h1>
						<p className="text-xl text-muted-foreground text-pretty">
							Join our community of volunteers and make a
							meaningful impact through service, leadership, and
							ministry opportunities.
						</p>
					</div>
				</section>

				{/* Volunteer Opportunities */}
				<section className="py-16">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<h2 className="text-3xl font-bold text-foreground mb-12 text-center">
							Volunteer Opportunities
						</h2>
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
							{opportunities.map((opportunity) => {
								const Icon = opportunity.icon;
								return (
									<Card
										key={opportunity.id}
										className="h-full hover:shadow-lg transition-shadow duration-300"
									>
										<CardHeader>
											<div className="flex items-center justify-between mb-2">
												<Badge
													className={getCategoryColor(
														opportunity.category,
													)}
												>
													{opportunity.category}
												</Badge>
												<Icon className="h-5 w-5 text-primary" />
											</div>
											<CardTitle className="text-lg">
												{opportunity.title}
											</CardTitle>
											<CardDescription className="text-sm leading-relaxed">
												{opportunity.description}
											</CardDescription>
										</CardHeader>
										<CardContent className="space-y-4">
											<div className="space-y-2 text-sm">
												<div className="flex items-center gap-2">
													<Clock className="h-4 w-4 text-muted-foreground" />
													<span>
														{
															opportunity.timeRequired
														}
													</span>
												</div>
												<div className="flex items-center gap-2">
													<Calendar className="h-4 w-4 text-muted-foreground" />
													<span>
														{opportunity.commitment}
													</span>
												</div>
											</div>

											<div>
												<h4 className="font-medium text-sm mb-2">
													Requirements:
												</h4>
												<ul className="text-xs text-muted-foreground space-y-1">
													{opportunity.requirements.map(
														(req, index) => (
															<li
																key={index}
																className="flex items-start gap-2"
															>
																<div className="w-1 h-1 bg-accent rounded-full mt-2 flex-shrink-0" />
																{req}
															</li>
														),
													)}
												</ul>
											</div>

											<Button
												className="w-full flex items-center justify-center gap-2"
												onClick={() =>
													setSelectedOpportunity(
														opportunity.id,
													)
												}
											>
												Apply Now
												<ArrowRight className="h-4 w-4" />
											</Button>
										</CardContent>
									</Card>
								);
							})}
						</div>
					</div>
				</section>

				{/* Partnership Information */}
				<section className="py-16 bg-muted/30">
					<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
						<h2 className="text-3xl font-bold text-foreground mb-12 text-center">
							Community Partnerships
						</h2>
						<div className="grid md:grid-cols-2 gap-8">
							{partnerships.map((partnership, index) => (
								<Card key={index}>
									<CardHeader>
										<CardTitle className="text-xl">
											{partnership.title}
										</CardTitle>
										<CardDescription className="text-base leading-relaxed">
											{partnership.description}
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="flex items-center gap-2 text-sm">
											<div className="w-2 h-2 bg-primary rounded-full" />
											<span className="font-medium text-primary">
												{partnership.impact}
											</span>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</section>

				{/* Volunteer Application Form */}
				{selectedOpportunity && (
					<section className="py-16 bg-background">
						<div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
							<Card>
								<CardHeader>
									<CardTitle className="text-2xl">
										Volunteer Application
									</CardTitle>
									<CardDescription>
										Apply for:{" "}
										{
											opportunities.find(
												(o) =>
													o.id ===
													selectedOpportunity,
											)?.title
										}
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-6">
									{submitResult && (
										<Alert
											className={`${
												submitResult.success
													? "border-green-200 bg-green-50"
													: ""
											}`}
										>
											<div className="flex items-center gap-2">
												{submitResult.success ? (
													<CheckCircle className="h-4 w-4 text-green-600" />
												) : (
													<AlertCircle className="h-4 w-4 text-destructive" />
												)}
												<AlertDescription
													className={
														submitResult.success
															? "text-green-800"
															: ""
													}
												>
													{submitResult.message}
												</AlertDescription>
											</div>
										</Alert>
									)}

									<form
										onSubmit={handleSubmit}
										className="space-y-6"
									>
										<div className="grid grid-cols-2 gap-4">
											<div className="space-y-2">
												<Label htmlFor="firstName">
													First Name
												</Label>
												<Input
													id="firstName"
													name="firstName"
													placeholder="John"
													value={formData.firstName}
													onChange={handleInputChange}
													required
												/>
											</div>
											<div className="space-y-2">
												<Label htmlFor="lastName">
													Last Name
												</Label>
												<Input
													id="lastName"
													name="lastName"
													placeholder="Doe"
													value={formData.lastName}
													onChange={handleInputChange}
													required
												/>
											</div>
										</div>

										<div className="space-y-2">
											<Label htmlFor="email">Email</Label>
											<Input
												id="email"
												name="email"
												type="email"
												placeholder="john.doe@example.com"
												value={formData.email}
												onChange={handleInputChange}
												required
											/>
										</div>

										<div className="space-y-2">
											<Label htmlFor="phone">
												Phone Number
											</Label>
											<Input
												id="phone"
												name="phone"
												type="tel"
												placeholder="(555) 123-4567"
												value={formData.phone}
												onChange={handleInputChange}
												required
											/>
										</div>

										<div className="space-y-2">
											<Label htmlFor="experience">
												Relevant Experience
											</Label>
											<textarea
												id="experience"
												name="experience"
												className="w-full min-h-20 px-3 py-2 border border-input rounded-md bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
												placeholder="Tell us about any relevant experience you have..."
												value={formData.experience}
												onChange={handleInputChange}
											/>
										</div>

										<div className="space-y-2">
											<Label htmlFor="motivation">
												Why do you want to volunteer?
											</Label>
											<textarea
												id="motivation"
												name="motivation"
												className="w-full min-h-20 px-3 py-2 border border-input rounded-md bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
												placeholder="Share your motivation for serving..."
												value={formData.motivation}
												onChange={handleInputChange}
												required
											/>
										</div>

										<div className="space-y-2">
											<Label htmlFor="availability">
												Availability
											</Label>
											<textarea
												id="availability"
												name="availability"
												className="w-full min-h-20 px-3 py-2 border border-input rounded-md bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
												placeholder="Let us know your availability (days/times)..."
												value={formData.availability}
												onChange={handleInputChange}
												required
											/>
										</div>

										<div className="flex items-center space-x-2">
											<input
												id="backgroundCheck"
												name="backgroundCheck"
												type="checkbox"
												className="h-4 w-4 rounded border-input bg-background text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
												checked={
													formData.backgroundCheck
												}
												onChange={handleInputChange}
											/>
											<Label
												htmlFor="backgroundCheck"
												className="text-sm"
											>
												I agree to undergo a background
												check if required for this
												position
											</Label>
										</div>

										<div className="flex gap-4">
											<Button
												type="button"
												variant="outline"
												onClick={() =>
													setSelectedOpportunity(null)
												}
												className="flex-1"
											>
												Cancel
											</Button>
											<Button
												type="submit"
												disabled={isSubmitting}
												className="flex-1"
											>
												{isSubmitting
													? "Submitting..."
													: "Submit Application"}
											</Button>
										</div>
									</form>
								</CardContent>
							</Card>
						</div>
					</section>
				)}
			</main>
		</div>
	);
}
