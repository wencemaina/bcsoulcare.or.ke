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
import {
	Heart,
	Shield,
	Clock,
	Phone,

	Loader2,
} from "lucide-react";
import { SoulCareService, SoulCareTeamMember } from "@/lib/mongodb";

export default function SoulCarePage() {
	const [services, setServices] = useState<SoulCareService[]>([]);
	const [team, setTeam] = useState<SoulCareTeamMember[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			try {
				const res = await fetch("/api/soul-care");
				const data = await res.json();
				if (res.ok) {
					setServices(data.services);
					setTeam(data.team);
				}
			} catch (error) {
				// Silently fail or handle error gracefully
			} finally {
				setIsLoading(false);
			}
		}

		fetchData();
	}, []);

	return (
		<div className="min-h-screen">
			<main>
				{/* Hero Section */}
				<section className="bg-gradient-to-b from-primary/5 to-background py-16">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
							Soul Care Services
						</h1>
						<p className="text-xl text-muted-foreground text-pretty mb-8">
							Professional counseling and spiritual care in a
							safe, confidential environment where faith and
							healing intersect.
						</p>
					</div>
				</section>

				{/* Emergency Support Banner */}
				<section className="bg-destructive/10 border-l-4 border-destructive py-4">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<Phone className="h-5 w-5 text-destructive" />
								<span className="font-medium text-foreground">
									Crisis Support Available 24/7
								</span>
							</div>
							<Button variant="destructive" size="sm" asChild>
								<a href="tel:+254712911111">
									Call +254 712 911 111
								</a>
							</Button>
						</div>
					</div>
				</section>

				{/* Services */}
				<section className="py-16">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<h2 className="text-3xl font-bold text-foreground mb-12 text-center">
							Our Services
						</h2>
						{isLoading ? (
							<div className="flex items-center justify-center py-20">
								<Loader2 className="h-8 w-8 animate-spin text-primary" />
							</div>
						) : services.length === 0 ? (
							<p className="text-center text-muted-foreground py-20">No services currently available.</p>
						) : (
							<div className="grid md:grid-cols-2 gap-8">
								{services.map((service, index) => (
									<Card key={index} className="h-full">
										<CardHeader>
											<CardTitle className="text-xl flex items-center gap-2">
												<Heart className="h-5 w-5 text-primary" />
												{service.title}
											</CardTitle>
											<CardDescription className="text-base leading-relaxed">
												{service.description}
											</CardDescription>
										</CardHeader>
										<CardContent className="space-y-4">
											<div>
												<h4 className="font-medium text-foreground mb-2">
													Areas of Focus:
												</h4>
												<div className="flex flex-wrap gap-2">
													{service.features.map(
														(feature, idx) => (
															<Badge
																key={idx}
																variant="secondary"
																className="text-xs"
															>
																{feature}
															</Badge>
														),
													)}
												</div>
											</div>
											<div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
												<div className="flex items-center gap-2">
													<Clock className="h-4 w-4" />
													<span>{service.duration}</span>
												</div>
												<div>
													<span className="font-medium">
														Available:
													</span>{" "}
													{service.availability}
												</div>
											</div>
										</CardContent>
									</Card>
								))}
							</div>
						)}
					</div>
				</section>

				{/* Counselors */}
				<section className="py-16 bg-muted/30">
					<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
						<h2 className="text-3xl font-bold text-foreground mb-12 text-center">
							Our Care Team
						</h2>
						{isLoading ? (
							<div className="flex items-center justify-center py-20">
								<Loader2 className="h-8 w-8 animate-spin text-primary" />
							</div>
						) : team.length === 0 ? (
							<p className="text-center text-muted-foreground py-20">Our care team is currently being updated.</p>
						) : (
							<div className="grid md:grid-cols-3 gap-8">
								{team.map((counselor, index) => (
									<Card key={index} className="text-center">
										<CardHeader>
											<div className="mx-auto mb-4">
												<img
													src={
														counselor.image ||
														"/placeholder.svg"
													}
													alt={counselor.name}
													className="w-24 h-24 rounded-full object-cover mx-auto"
												/>
											</div>
											<CardTitle className="text-lg">
												{counselor.name}
											</CardTitle>
											<CardDescription>
												{counselor.title}
											</CardDescription>
											<p className="text-xs text-muted-foreground mt-1">
												{counselor.credentials}
											</p>
										</CardHeader>
										<CardContent>
											<div className="mb-4">
												<h4 className="font-medium text-sm mb-2">
													Specialties:
												</h4>
												<div className="flex flex-wrap gap-1 justify-center">
													{counselor.specialties.map(
														(specialty, idx) => (
															<Badge
																key={idx}
																variant="outline"
																className="text-xs"
															>
																{specialty}
															</Badge>
														),
													)}
												</div>
											</div>
										</CardContent>
									</Card>
								))}
							</div>
						)}
					</div>
				</section>

				{/* Confidentiality */}
				<section className="py-16">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="bg-primary/5 rounded-lg p-8 text-center">
							<Shield className="h-12 w-12 text-primary mx-auto mb-4" />
							<h3 className="text-2xl font-bold text-foreground mb-4">
								Your Privacy is Protected
							</h3>
							<p className="text-muted-foreground leading-relaxed mb-6">
								All counseling sessions are completely
								confidential and conducted by licensed
								professionals. We adhere to strict ethical
								guidelines and HIPAA regulations to ensure your
								privacy and safety.
							</p>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
