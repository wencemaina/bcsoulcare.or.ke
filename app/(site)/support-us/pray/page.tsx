"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function PrayPage() {
	return (
		<div className="min-h-screen flex flex-col">
			<main className="flex-grow">
				{/* Hero Section */}
				<section className="bg-gradient-to-b from-primary/5 to-background py-16">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
							Join Us in Prayer
						</h1>
						<p className="text-xl text-muted-foreground text-pretty">
							Prayer is foundational to our ministry. Partner with
							us through intercession.
						</p>
					</div>
				</section>

				{/* Prayer Content */}
				<section className="py-16">
					<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="bg-white rounded-lg shadow-lg p-8">
							<h2 className="text-2xl font-bold text-foreground mb-6">
								Prayer Ministry
							</h2>

							<div className="prose max-w-none">
								<p className="text-muted-foreground mb-6">
									Prayer is the foundation of all we do at
									CCMWA. We believe in the power of prayer to
									transform lives, heal relationships, and
									advance God's kingdom. Your prayers partner
									with us in ways that no financial gift can.
								</p>

								<div className="grid md:grid-cols-2 gap-8 my-12">
									<Card>
										<CardHeader>
											<CardTitle>
												Prayer Requests
											</CardTitle>
										</CardHeader>
										<CardContent>
											<p className="text-muted-foreground mb-4">
												Share your prayer requests with
												our prayer team. We commit to
												lifting up your concerns in
												prayer.
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
											<CardTitle>
												Prayer Resources
											</CardTitle>
										</CardHeader>
										<CardContent>
											<p className="text-muted-foreground mb-4">
												Download our prayer guides and
												resources to support your
												personal prayer life.
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

								<h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
									Current Prayer Focus
								</h3>

								<Card className="my-8">
									<CardHeader>
										<CardTitle className="text-center">
											Weekly Prayer Points
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="prose max-w-none text-muted-foreground">
											<ul className="space-y-3">
												<li className="flex items-start gap-3">
													<span className="text-primary font-bold mt-1">
														•
													</span>
													<span>
														For our counseling staff
														as they serve those in
														crisis and provide
														Christ-centered care
													</span>
												</li>
												<li className="flex items-start gap-3">
													<span className="text-primary font-bold mt-1">
														•
													</span>
													<span>
														For upcoming training
														events and conferences
														as we equip more
														counselors with biblical
														principles
													</span>
												</li>
												<li className="flex items-start gap-3">
													<span className="text-primary font-bold mt-1">
														•
													</span>
													<span>
														For families
														participating in our
														discipleship programs as
														they grow in their faith
													</span>
												</li>
												<li className="flex items-start gap-3">
													<span className="text-primary font-bold mt-1">
														•
													</span>
													<span>
														For wisdom and provision
														as we expand our
														outreach to underserved
														communities
													</span>
												</li>
												<li className="flex items-start gap-3">
													<span className="text-primary font-bold mt-1">
														•
													</span>
													<span>
														For our leadership team
														as they make decisions
														about the future
														direction of our
														ministry
													</span>
												</li>
											</ul>
										</div>
									</CardContent>
								</Card>

								<div className="bg-primary/5 rounded-lg p-6 my-8">
									<h4 className="font-semibold text-foreground mb-4">
										Join Our Prayer Chain
									</h4>
									<p className="text-muted-foreground mb-4">
										Become part of our ongoing prayer chain
										by committing to pray for our ministry
										each week. We'll send you weekly prayer
										points via email to help focus your
										intercession for our work.
									</p>
									<Button variant="outline">
										Join Our Prayer Chain
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
