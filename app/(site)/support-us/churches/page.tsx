"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function ChurchesPage() {
	return (
		<div className="min-h-screen flex flex-col">
			<main className="flex-grow">
				{/* Hero Section */}
				<section className="bg-gradient-to-b from-primary/5 to-background py-16">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
							Partnering with Churches
						</h1>
						<p className="text-xl text-muted-foreground text-pretty">
							We work with local churches to equip leaders and
							serve their communities.
						</p>
					</div>
				</section>

				{/* Churches Content */}
				<section className="py-16">
					<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="bg-white rounded-lg shadow-lg p-8">
							<h2 className="text-2xl font-bold text-foreground mb-6">
								Church Partnership Programs
							</h2>

							<div className="prose max-w-none">
								<p className="text-muted-foreground mb-6">
									CCMWA is committed to partnering with local
									churches to equip leaders and serve their
									communities. We believe that healthy
									churches are essential to healthy
									communities, and we're here to support that
									vision.
								</p>

								<div className="grid md:grid-cols-2 gap-8 my-12">
									<Card>
										<CardHeader>
											<CardTitle>
												Church Training Programs
											</CardTitle>
										</CardHeader>
										<CardContent>
											<p className="text-muted-foreground mb-4">
												Equipping pastors and church
												leaders with biblical counseling
												skills.
											</p>
											<ul className="space-y-2 mb-4 text-muted-foreground">
												<li className="flex items-start gap-2">
													<span className="text-primary font-bold">
														•
													</span>
													<span>
														Workshops and seminars
													</span>
												</li>
												<li className="flex items-start gap-2">
													<span className="text-primary font-bold">
														•
													</span>
													<span>
														Certification programs
													</span>
												</li>
												<li className="flex items-start gap-2">
													<span className="text-primary font-bold">
														•
													</span>
													<span>
														Consultation services
													</span>
												</li>
											</ul>
											<Button className="w-full">
												Learn About Training
											</Button>
										</CardContent>
									</Card>

									<Card>
										<CardHeader>
											<CardTitle>
												Referral Partnership
											</CardTitle>
										</CardHeader>
										<CardContent>
											<p className="text-muted-foreground mb-4">
												Connecting church members with
												professional counseling
												services.
											</p>
											<ul className="space-y-2 mb-4 text-muted-foreground">
												<li className="flex items-start gap-2">
													<span className="text-primary font-bold">
														•
													</span>
													<span>
														Referral process
													</span>
												</li>
												<li className="flex items-start gap-2">
													<span className="text-primary font-bold">
														•
													</span>
													<span>
														Sliding fee scale
														options
													</span>
												</li>
												<li className="flex items-start gap-2">
													<span className="text-primary font-bold">
														•
													</span>
													<span>
														Case consultation
													</span>
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

								<h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
									Benefits of Partnership
								</h3>

								<div className="grid md:grid-cols-3 gap-6 my-8">
									<div className="text-center p-6 bg-primary/5 rounded-lg">
										<div className="text-2xl font-bold text-primary mb-2">
											Expertise
										</div>
										<p className="text-muted-foreground">
											Access to professional counselors
											trained in biblical principles
										</p>
									</div>
									<div className="text-center p-6 bg-primary/5 rounded-lg">
										<div className="text-2xl font-bold text-primary mb-2">
											Resources
										</div>
										<p className="text-muted-foreground">
											Training materials and educational
											resources for your leaders
										</p>
									</div>
									<div className="text-center p-6 bg-primary/5 rounded-lg">
										<div className="text-2xl font-bold text-primary mb-2">
											Support
										</div>
										<p className="text-muted-foreground">
											Ongoing consultation and case
											management support
										</p>
									</div>
								</div>

								<div className="bg-primary/5 rounded-lg p-6 my-8">
									<h4 className="font-semibold text-foreground mb-4">
										Become a Partner Church
									</h4>
									<p className="text-muted-foreground mb-4">
										We invite your church to join us in this
										vital ministry of soul care. Partnership
										includes access to our training
										programs, referral services, and ongoing
										support.
									</p>
									<Button asChild>
										<Link href="/contact">
											Start Partnership Process
										</Link>
									</Button>
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
