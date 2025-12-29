"use client";

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
	Users,
	BookOpen,
	Download,
	MessageCircle,
	Mail,
	Phone,
	MapPin,
} from "lucide-react";
import Link from "next/link";

export default function GroupMembershipPage() {
	const features = [
		{
			icon: BookOpen,
			title: "On-Demand Courses",
			description:
				"Access our comprehensive library of biblical counseling courses anytime, anywhere.",
		},
		{
			icon: Download,
			title: "Actionable Resources",
			description:
				"Download worksheets, guides, and tools to implement in your church community.",
		},
		{
			icon: Users,
			title: "Community Support",
			description:
				"Connect with other church leaders in our private community for answers and encouragement.",
		},
		{
			icon: MessageCircle,
			title: "Discounted Memberships",
			description:
				"Special pricing for multiple members from the same church.",
		},
	];

	return (
		<>
			<main className="flex-grow">
				{/* Hero Section */}
				<section className="bg-gradient-to-b from-primary/5 to-background py-16">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
							Group Memberships for Churches
						</h1>
						<p className="text-xl text-muted-foreground text-pretty">
							Counseling belongs to the whole church, not just the
							pastors.
						</p>
						<p className="text-xl text-muted-foreground text-pretty mt-4">
							Let us help you create a culture of care.
						</p>
					</div>
				</section>

				{/* Main Content */}
				<section className="py-16">
					<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-16">
							<h2 className="text-3xl font-bold text-foreground mb-6">
								Group Membership
							</h2>
							<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
								Give your people the clarity, support, and
								confidence to counsel faithfully.
							</p>
						</div>

						<div className="grid lg:grid-cols-2 gap-12 mb-16">
							<div>
								<h3 className="text-2xl font-bold text-foreground mb-6">
									What's Included:
								</h3>
								<div className="space-y-6">
									{features.map((feature, index) => {
										const Icon = feature.icon;
										return (
											<div
												key={index}
												className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg"
											>
												<div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
													<Icon className="h-6 w-6 text-primary" />
												</div>
												<div>
													<h4 className="text-lg font-semibold text-foreground mb-1">
														{feature.title}
													</h4>
													<p className="text-muted-foreground">
														{feature.description}
													</p>
												</div>
											</div>
										);
									})}

									<Card className="border-primary/30 border-2">
										<CardHeader>
											<CardTitle className="flex items-center gap-2">
												<Users className="h-5 w-5 text-primary" />
												Customized, Private Space
											</CardTitle>
											<CardDescription>
												A dedicated area in our
												community platform for your
												church members (optional)
											</CardDescription>
										</CardHeader>
										<CardContent>
											<p className="text-muted-foreground">
												Create a private space for your
												church members to interact,
												share resources, and grow
												together in biblical counseling.
											</p>
										</CardContent>
									</Card>
								</div>
							</div>

							<div>
								<Card className="h-full">
									<CardHeader>
										<CardTitle className="text-2xl text-primary">
											Coaching & Consulting
										</CardTitle>
										<CardDescription>
											Optional personalized support for
											your church leadership
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-6">
										<div className="space-y-4">
											<div className="flex items-start gap-3">
												<div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
												<span className="text-muted-foreground">
													One-on-one coaching sessions
													with our experts
												</span>
											</div>
											<div className="flex items-start gap-3">
												<div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
												<span className="text-muted-foreground">
													Customized training for your
													specific context
												</span>
											</div>
											<div className="flex items-start gap-3">
												<div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
												<span className="text-muted-foreground">
													Consultation on implementing
													counseling ministries
												</span>
											</div>
											<div className="flex items-start gap-3">
												<div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
												<span className="text-muted-foreground">
													Ongoing support for your
													counseling team
												</span>
											</div>
										</div>

										<div className="pt-4">
											<Button
												className="w-full"
												size="lg"
												asChild
											>
												<Link href="/contact">
													<Mail className="h-5 w-5 mr-2" />
													Contact Us for More
													Information
												</Link>
											</Button>
										</div>
									</CardContent>
								</Card>
							</div>
						</div>

						{/* Benefits Section */}
						<div className="bg-primary/5 rounded-lg p-8 mb-16">
							<h3 className="text-2xl font-bold text-foreground mb-6 text-center">
								Why Church Group Memberships?
							</h3>
							<div className="grid md:grid-cols-2 gap-8">
								<div>
									<p className="text-muted-foreground mb-4">
										Equip your congregation with the tools
										and training they need to provide
										biblical counseling and soul care to one
										another.
									</p>
									<p className="text-muted-foreground mb-4">
										Our Group Membership program helps
										churches build a culture of care where
										every member can contribute to the
										spiritual and emotional wellbeing of the
										community.
									</p>
								</div>
								<div className="flex items-center justify-center">
									<div className="text-center p-6 bg-primary/10 rounded-lg">
										<p className="text-lg font-medium text-primary">
											"Bear one another's burdens, and so
											fulfill the law of Christ." -
											Galatians 6:2
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* Trusted Partners */}
						<div className="mb-16">
							<div className="text-center mb-12">
								<h2 className="text-3xl font-bold text-foreground mb-4">
									Trusted Partners
								</h2>
								<p className="text-lg text-muted-foreground max-w-3xl mx-auto">
									We collaborate with leading organizations to
									provide the best resources and training for
									your church.
								</p>
							</div>

							<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
								{/* Partners will be added here */}
							</div>
						</div>

						{/* Contact Information */}
						<div className="bg-muted/30 rounded-lg p-8">
							<div className="text-center mb-8">
								<h3 className="text-2xl font-bold text-foreground mb-4">
									Ready to Get Started?
								</h3>
								<p className="text-muted-foreground max-w-2xl mx-auto">
									Contact us today to learn more about how our
									Group Membership program can benefit your
									church.
								</p>
							</div>

							<div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<Mail className="h-5 w-5 text-primary" />
											Email
										</CardTitle>
									</CardHeader>
									<CardContent>
										<p className="text-muted-foreground">
											groups@ccmwa.org
										</p>
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<Phone className="h-5 w-5 text-primary" />
											Phone
										</CardTitle>
									</CardHeader>
									<CardContent>
										<p className="text-muted-foreground">
											+254 712 345 678
										</p>
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<MapPin className="h-5 w-5 text-primary" />
											Address
										</CardTitle>
									</CardHeader>
									<CardContent>
										<p className="text-muted-foreground">
											Ngong Road, Karen
											<br />
											Nairobi, Kenya
										</p>
									</CardContent>
								</Card>
							</div>

							<div className="text-center mt-8">
								<Button size="lg" asChild>
									<Link href="/contact">
										Contact Us Today
									</Link>
								</Button>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
