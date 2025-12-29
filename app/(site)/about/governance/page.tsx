"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function GovernancePage() {
	return (
		<>
			<main className="flex-grow">
				{/* Hero Section */}
				<section className="bg-gradient-to-b from-primary/5 to-background py-16">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
							Governance
						</h1>
						<p className="text-xl text-muted-foreground text-pretty">
							Learn about our board of directors, governance
							structure, and commitment to transparency.
						</p>
					</div>
				</section>

				{/* Governance Content */}
				<section className="py-16">
					<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="bg-white rounded-lg shadow-lg p-8">
							<h2 className="text-2xl font-bold text-foreground mb-6">
								Board of Directors
							</h2>

							<div className="prose max-w-none">
								<p className="text-muted-foreground mb-6">
									CCMWA is governed by a dedicated board of
									directors who provide oversight and
									strategic direction for our ministry. Our
									board members bring diverse expertise in
									theology, counseling, business, and
									nonprofit management.
								</p>

								<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
									<Card>
										<CardHeader>
											<CardTitle>
												Board Member Name
											</CardTitle>
										</CardHeader>
										<CardContent>
											<p className="text-muted-foreground text-sm">
												Role/Position
											</p>
											<p className="text-muted-foreground mt-2 text-sm">
												Brief bio information about the
												board member's background and
												contribution to the ministry.
											</p>
										</CardContent>
									</Card>

									<Card>
										<CardHeader>
											<CardTitle>
												Board Member Name
											</CardTitle>
										</CardHeader>
										<CardContent>
											<p className="text-muted-foreground text-sm">
												Role/Position
											</p>
											<p className="text-muted-foreground mt-2 text-sm">
												Brief bio information about the
												board member's background and
												contribution to the ministry.
											</p>
										</CardContent>
									</Card>

									<Card>
										<CardHeader>
											<CardTitle>
												Board Member Name
											</CardTitle>
										</CardHeader>
										<CardContent>
											<p className="text-muted-foreground text-sm">
												Role/Position
											</p>
											<p className="text-muted-foreground mt-2 text-sm">
												Brief bio information about the
												board member's background and
												contribution to the ministry.
											</p>
										</CardContent>
									</Card>
								</div>

								<h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
									Governance Structure
								</h3>
								<p className="text-muted-foreground mb-6">
									Our governance structure ensures
									accountability, transparency, and alignment
									with our mission to provide Christ-centered
									counseling and soul-care.
								</p>

								<ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
									<li>
										Board meets quarterly to review ministry
										progress and strategic direction
									</li>
									<li>
										Annual audit conducted by independent
										certified public accountants
									</li>
									<li>
										Bylaws reviewed and updated annually
									</li>
									<li>
										Conflict of interest policy strictly
										enforced
									</li>
									<li>
										Strategic planning process involves
										board, staff, and key stakeholders
									</li>
								</ul>

								<h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
									Financial Transparency
								</h3>
								<p className="text-muted-foreground mb-6">
									We are committed to responsible stewardship
									of the resources entrusted to us. Our
									financial statements are available upon
									request and reviewed annually by our board.
								</p>

								<div className="bg-primary/5 rounded-lg p-6 my-8">
									<h4 className="font-semibold text-foreground mb-4">
										Key Financial Policies
									</h4>
									<ul className="list-disc list-inside text-muted-foreground space-y-2">
										<li>
											Gift acceptance policy ensures all
											donations align with our mission
										</li>
										<li>
											Spending authorization requires
											appropriate board approval
										</li>
										<li>
											Regular financial reporting to the
											board
										</li>
										<li>
											Investment policy guides endowment
											management
										</li>
									</ul>
								</div>
							</div>

							<div className="mt-12 text-center">
								<Button asChild>
									<Link href="/about">Back to About Us</Link>
								</Button>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
