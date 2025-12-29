"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	BookOpen,
	Heart,
	Users,
	Building,
	User,
	Send,
	HandCoins,
} from "lucide-react";
import Link from "next/link";

export default function SupportUsPage() {
	const scrollToSection = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<div className="min-h-screen flex flex-col">
			<main className="flex-grow">
				{/* Hero Section */}
				<section className="bg-gradient-to-b from-primary/5 to-background py-16">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
							Support Our Mission
						</h1>
						<p className="text-xl text-muted-foreground text-pretty">
							Your partnership enables us to continue providing
							Christ-centered counseling and soul-care to our
							community.
						</p>
					</div>
				</section>

				{/* Navigation Pills */}
				<section className="py-8 bg-muted/30">
					<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex flex-wrap justify-center gap-2 md:gap-4">
							{[
								{ id: "appeals", name: "Appeals", icon: Send },
								{ id: "give", name: "Give", icon: HandCoins },

								{ id: "pray", name: "Pray", icon: Heart },

								{
									id: "churches",
									name: "Churches",
									icon: Building,
								},
								{
									id: "staff",
									name: "Support Our Staff",
									icon: User,
								},
								{
									id: "relay-worker",
									name: "Support a Relay Worker",
									icon: Users,
								},
							].map((item) => {
								const Icon = item.icon;
								return (
									<Button
										key={item.id}
										variant="outline"
										className="flex items-center gap-2 h-10 px-4 rounded-full"
										onClick={() => scrollToSection(item.id)}
									>
										<Icon className="h-4 w-4" />
										<span>{item.name}</span>
									</Button>
								);
							})}
						</div>
					</div>
				</section>

				{/* Appeals Section */}
				<section id="appeals" className="py-16">
					<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-12">
							<h2 className="text-3xl font-bold text-foreground mb-4">
								Current Appeals
							</h2>
							<p className="text-lg text-muted-foreground max-w-3xl mx-auto">
								Join us in responding to urgent needs in our
								community and around the world.
							</p>
						</div>

						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
							<Card className="flex flex-col">
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<Heart className="h-5 w-5 text-primary" />
										Local Community Outreach
									</CardTitle>
									<CardDescription>
										Supporting families in crisis in our
										local community
									</CardDescription>
								</CardHeader>
								<CardContent className="flex-grow">
									<p className="text-muted-foreground mb-4">
										Providing counseling services and
										practical support to families facing
										financial hardship.
									</p>
									<div className="mt-auto">
										<Button className="w-full">
											Learn More
										</Button>
									</div>
								</CardContent>
							</Card>

							<Card className="flex flex-col">
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<Users className="h-5 w-5 text-primary" />
										Disaster Relief Fund
									</CardTitle>
									<CardDescription>
										Emergency response to natural disasters
									</CardDescription>
								</CardHeader>
								<CardContent className="flex-grow">
									<p className="text-muted-foreground mb-4">
										Providing immediate counseling and
										soul-care to communities affected by
										natural disasters.
									</p>
									<div className="mt-auto">
										<Button className="w-full">
											Learn More
										</Button>
									</div>
								</CardContent>
							</Card>

							<Card className="flex flex-col">
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<BookOpen className="h-5 w-5 text-primary" />
										Training Program Expansion
									</CardTitle>
									<CardDescription>
										Equipping more counselors with biblical
										principles
									</CardDescription>
								</CardHeader>
								<CardContent className="flex-grow">
									<p className="text-muted-foreground mb-4">
										Expanding our training programs to equip
										more counselors with Christ-centered
										approaches.
									</p>
									<div className="mt-auto">
										<Button className="w-full">
											Learn More
										</Button>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</section>

				{/* Give Section */}
				<section id="give" className="py-16 bg-muted/30">
					<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-12">
							<h2 className="text-3xl font-bold text-foreground mb-4">
								Ways to Give
							</h2>
							<p className="text-lg text-muted-foreground max-w-3xl mx-auto">
								Your generous gifts make our ministry possible.
								Thank you for partnering with us.
							</p>
						</div>

						<div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
							<Card>
								<CardHeader>
									<CardTitle>One-Time Gift</CardTitle>
									<CardDescription>
										Make a single contribution to support
										our ministry
									</CardDescription>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground mb-4">
										Your one-time gift helps us continue
										providing counseling services and
										community programs.
									</p>
									<Button className="w-full">Give Now</Button>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle>Recurring Donation</CardTitle>
									<CardDescription>
										Become a monthly partner in our mission
									</CardDescription>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground mb-4">
										Monthly donations provide consistent
										support for our ongoing programs and
										staff.
									</p>
									<Button className="w-full">
										Set Up Recurring Gift
									</Button>
								</CardContent>
							</Card>
						</div>

						<div className="mt-12 text-center">
							<Card className="max-w-3xl mx-auto">
								<CardHeader>
									<CardTitle>Other Ways to Give</CardTitle>
								</CardHeader>
								<CardContent>
									<ul className="space-y-2 text-left">
										<li className="flex items-start gap-2">
											<span className="text-primary font-bold">
												•
											</span>
											<span>
												Stock and securities transfers
											</span>
										</li>
										<li className="flex items-start gap-2">
											<span className="text-primary font-bold">
												•
											</span>
											<span>
												Planned giving through your will
												or estate
											</span>
										</li>
										<li className="flex items-start gap-2">
											<span className="text-primary font-bold">
												•
											</span>
											<span>
												Matching gifts from your
												employer
											</span>
										</li>
										<li className="flex items-start gap-2">
											<span className="text-primary font-bold">
												•
											</span>
											<span>Gifts of cryptocurrency</span>
										</li>
									</ul>
									<div className="mt-6">
										<Button variant="outline">
											Contact Us About Giving Options
										</Button>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</section>

				{/* Pray Section */}
				<section id="pray" className="py-16 bg-muted/30">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-12">
							<h2 className="text-3xl font-bold text-foreground mb-4">
								Join Us in Prayer
							</h2>
							<p className="text-lg text-muted-foreground max-w-3xl mx-auto">
								Prayer is foundational to our ministry. Partner
								with us through intercession.
							</p>
						</div>

						<div className="grid md:grid-cols-2 gap-8">
							<Card>
								<CardHeader>
									<CardTitle>Prayer Requests</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground mb-4">
										Share your prayer requests with our
										prayer team. We commit to lifting up
										your concerns in prayer.
									</p>
									<Button asChild className="w-full">
										<Link href="/contact#prayer-request">
											Submit Prayer Request
										</Link>
									</Button>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle>Prayer Resources</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground mb-4">
										Download our prayer guides and resources
										to support your personal prayer life.
									</p>
									<Button
										variant="outline"
										className="w-full"
									>
										Download Resources
									</Button>
								</CardContent>
							</Card>
						</div>

						<Card className="mt-12">
							<CardHeader>
								<CardTitle className="text-center">
									Current Prayer Focus
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="prose max-w-none text-muted-foreground">
									<ul className="space-y-2">
										<li className="flex items-start gap-2">
											<span className="text-primary font-bold">
												•
											</span>
											<span>
												For our counseling staff as they
												serve those in crisis
											</span>
										</li>
										<li className="flex items-start gap-2">
											<span className="text-primary font-bold">
												•
											</span>
											<span>
												For upcoming training events and
												conferences
											</span>
										</li>
										<li className="flex items-start gap-2">
											<span className="text-primary font-bold">
												•
											</span>
											<span>
												For families participating in
												our discipleship programs
											</span>
										</li>
										<li className="flex items-start gap-2">
											<span className="text-primary font-bold">
												•
											</span>
											<span>
												For wisdom and provision as we
												expand our outreach
											</span>
										</li>
									</ul>
								</div>
							</CardContent>
						</Card>
					</div>
				</section>

				{/* Churches Section */}
				<section id="churches" className="py-16 bg-muted/30">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-12">
							<h2 className="text-3xl font-bold text-foreground mb-4">
								Partnering with Churches
							</h2>
							<p className="text-lg text-muted-foreground max-w-3xl mx-auto">
								We work with local churches to equip leaders and
								serve their communities.
							</p>
						</div>

						<div className="grid md:grid-cols-2 gap-8">
							<Card>
								<CardHeader>
									<CardTitle>
										Church Training Programs
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground mb-4">
										Equipping pastors and church leaders
										with biblical counseling skills.
									</p>
									<ul className="space-y-2 mb-4">
										<li className="flex items-start gap-2">
											<span className="text-primary font-bold">
												•
											</span>
											<span>Workshops and seminars</span>
										</li>
										<li className="flex items-start gap-2">
											<span className="text-primary font-bold">
												•
											</span>
											<span>Certification programs</span>
										</li>
										<li className="flex items-start gap-2">
											<span className="text-primary font-bold">
												•
											</span>
											<span>Consultation services</span>
										</li>
									</ul>
									<Button className="w-full">
										Learn About Training
									</Button>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle>Referral Partnership</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground mb-4">
										Connecting church members with
										professional counseling services.
									</p>
									<ul className="space-y-2 mb-4">
										<li className="flex items-start gap-2">
											<span className="text-primary font-bold">
												•
											</span>
											<span>Referral process</span>
										</li>
										<li className="flex items-start gap-2">
											<span className="text-primary font-bold">
												•
											</span>
											<span>
												Sliding fee scale options
											</span>
										</li>
										<li className="flex items-start gap-2">
											<span className="text-primary font-bold">
												•
											</span>
											<span>Case consultation</span>
										</li>
									</ul>
									<Button
										variant="outline"
										className="w-full"
									>
										Partner With Us
									</Button>
								</CardContent>
							</Card>
						</div>
					</div>
				</section>

				{/* Support Our Staff Section */}
				<section id="staff" className="py-16">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-12">
							<h2 className="text-3xl font-bold text-foreground mb-4">
								Support Our Staff
							</h2>
							<p className="text-lg text-muted-foreground max-w-3xl mx-auto">
								Our dedicated team serves with excellence
								through your partnership.
							</p>
						</div>

						<Card className="mb-8">
							<CardHeader>
								<CardTitle>Sponsor a Staff Member</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground mb-4">
									Provide ongoing support for our counselors,
									administrators, and support staff.
								</p>
								<div className="grid md:grid-cols-3 gap-4 mb-6">
									<div className="text-center p-4 bg-primary/5 rounded-lg">
										<div className="text-2xl font-bold text-primary">
											$50
										</div>
										<div className="text-sm">
											Covers 2 hours of counseling
										</div>
									</div>
									<div className="text-center p-4 bg-primary/5 rounded-lg">
										<div className="text-2xl font-bold text-primary">
											$100
										</div>
										<div className="text-sm">
											Supports staff training
										</div>
									</div>
									<div className="text-center p-4 bg-primary/5 rounded-lg">
										<div className="text-2xl font-bold text-primary">
											$250
										</div>
										<div className="text-sm">
											Funds continuing education
										</div>
									</div>
								</div>
								<Button className="w-full">
									Sponsor a Staff Member
								</Button>
							</CardContent>
						</Card>

						<div className="grid md:grid-cols-2 gap-8">
							<Card>
								<CardHeader>
									<CardTitle>Staff Care Fund</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground mb-4">
										Supporting the personal and professional
										needs of our team.
									</p>
									<Button
										variant="outline"
										className="w-full"
									>
										Contribute to Staff Care
									</Button>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle>Ministry Supplies</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground mb-4">
										Providing resources and materials for
										our programs.
									</p>
									<Button
										variant="outline"
										className="w-full"
									>
										Donate Supplies
									</Button>
								</CardContent>
							</Card>
						</div>
					</div>
				</section>

				{/* Support a Relay Worker Section */}
				<section id="relay-worker" className="py-16 bg-muted/30">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-12">
							<h2 className="text-3xl font-bold text-foreground mb-4">
								Support a Relay Worker
							</h2>
							<p className="text-lg text-muted-foreground max-w-3xl mx-auto">
								Partner with us in supporting missionaries and
								ministry workers around the world.
							</p>
						</div>

						<div className="grid md:grid-cols-2 gap-8">
							<Card>
								<CardHeader>
									<CardTitle>Monthly Partnership</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground mb-4">
										Provide ongoing support for missionaries
										in the field.
									</p>
									<ul className="space-y-2 mb-4">
										<li className="flex items-start gap-2">
											<span className="text-primary font-bold">
												•
											</span>
											<span>
												$30/month - Basic support
											</span>
										</li>
										<li className="flex items-start gap-2">
											<span className="text-primary font-bold">
												•
											</span>
											<span>
												$50/month - Standard support
											</span>
										</li>
										<li className="flex items-start gap-2">
											<span className="text-primary font-bold">
												•
											</span>
											<span>
												$100/month - Full partnership
											</span>
										</li>
									</ul>
									<Button className="w-full">
										Become a Partner
									</Button>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle>Special Projects</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground mb-4">
										Support specific initiatives and
										outreach efforts.
									</p>
									<ul className="space-y-2 mb-4">
										<li className="flex items-start gap-2">
											<span className="text-primary font-bold">
												•
											</span>
											<span>Medical missions</span>
										</li>
										<li className="flex items-start gap-2">
											<span className="text-primary font-bold">
												•
											</span>
											<span>Disaster relief</span>
										</li>
										<li className="flex items-start gap-2">
											<span className="text-primary font-bold">
												•
											</span>
											<span>Church planting</span>
										</li>
									</ul>
									<Button
										variant="outline"
										className="w-full"
									>
										Support a Project
									</Button>
								</CardContent>
							</Card>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
