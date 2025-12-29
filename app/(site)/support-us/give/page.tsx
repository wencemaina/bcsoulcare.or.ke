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

export default function GivePage() {
	return (
		<div className="min-h-screen flex flex-col">
			<main className="flex-grow">
				{/* Hero Section */}
				<section className="bg-gradient-to-b from-primary/5 to-background py-16">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
							Ways to Give
						</h1>
						<p className="text-xl text-muted-foreground text-pretty">
							Your generous gifts make our ministry possible.
							Thank you for partnering with us.
						</p>
					</div>
				</section>

				{/* Giving Content */}
				<section className="py-16">
					<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="bg-white rounded-lg shadow-lg p-8">
							<h2 className="text-2xl font-bold text-foreground mb-6">
								Support Our Ministry
							</h2>

							<div className="prose max-w-none">
								<p className="text-muted-foreground mb-6">
									Your generous gifts enable us to continue
									providing Christ-centered counseling and
									soul-care to our community. We are grateful
									for every contribution, regardless of size.
								</p>

								<div className="grid md:grid-cols-2 gap-8 my-12">
									<Card>
										<CardHeader>
											<CardTitle>One-Time Gift</CardTitle>
											<CardDescription>
												Make a single contribution to
												support our ministry
											</CardDescription>
										</CardHeader>
										<CardContent>
											<p className="text-muted-foreground mb-4">
												Your one-time gift helps us
												continue providing counseling
												services and community programs.
											</p>
											<Button className="w-full">
												Give Now
											</Button>
										</CardContent>
									</Card>

									<Card>
										<CardHeader>
											<CardTitle>
												Recurring Donation
											</CardTitle>
											<CardDescription>
												Become a monthly partner in our
												mission
											</CardDescription>
										</CardHeader>
										<CardContent>
											<p className="text-muted-foreground mb-4">
												Monthly donations provide
												consistent support for our
												ongoing programs and staff.
											</p>
											<Button className="w-full">
												Set Up Recurring Gift
											</Button>
										</CardContent>
									</Card>
								</div>

								<h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
									Other Ways to Give
								</h3>

								<div className="bg-primary/5 rounded-lg p-6 my-8">
									<ul className="space-y-4 text-muted-foreground">
										<li className="flex items-start gap-3">
											<span className="text-primary font-bold mt-1">
												•
											</span>
											<span>
												<strong>
													Stock and securities
													transfers:
												</strong>{" "}
												Donate appreciated stocks or
												mutual funds for maximum tax
												advantage while supporting our
												ministry.
											</span>
										</li>
										<li className="flex items-start gap-3">
											<span className="text-primary font-bold mt-1">
												•
											</span>
											<span>
												<strong>Planned giving:</strong>{" "}
												Include CCMWA in your will or
												estate plans to leave a lasting
												legacy of Christ-centered care.
											</span>
										</li>
										<li className="flex items-start gap-3">
											<span className="text-primary font-bold mt-1">
												•
											</span>
											<span>
												<strong>Matching gifts:</strong>{" "}
												Check with your employer to see
												if they offer a matching gift
												program that could double your
												donation.
											</span>
										</li>
										<li className="flex items-start gap-3">
											<span className="text-primary font-bold mt-1">
												•
											</span>
											<span>
												<strong>
													Gifts of cryptocurrency:
												</strong>{" "}
												Donate Bitcoin or other
												cryptocurrencies for a simple
												and secure way to support our
												work.
											</span>
										</li>
										<li className="flex items-start gap-3">
											<span className="text-primary font-bold mt-1">
												•
											</span>
											<span>
												<strong>
													Vehicle donations:
												</strong>{" "}
												Donate your car, boat, or other
												vehicles to support our ministry
												while receiving a tax deduction.
											</span>
										</li>
									</ul>
								</div>

								<div className="text-center my-12">
									<Card className="max-w-2xl mx-auto">
										<CardHeader>
											<CardTitle>
												Have Questions About Giving?
											</CardTitle>
										</CardHeader>
										<CardContent>
											<p className="text-muted-foreground mb-4">
												Our development team is happy to
												answer any questions you may
												have about giving opportunities
												and how your gifts support our
												mission.
											</p>
											<Button variant="outline" asChild>
												<Link href="/contact">
													Contact Our Development Team
												</Link>
											</Button>
										</CardContent>
									</Card>
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
