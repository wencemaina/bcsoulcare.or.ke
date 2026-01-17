"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

export default function ContactPage() {
	const contactMethods = [
		{
			icon: Phone,
			title: "Phone",
			details: "+254 712 345 678", // Updated to Kenyan phone format
			description: "Monday - Friday, 9 AM - 5 PM",
		},
		{
			icon: Mail,
			title: "Email",
			details: "info@bcsoulcare.or.ke", // Updated email domain to bcsoulcare
			description: "We respond within 24 hours",
		},
		{
			icon: MessageCircle,
			title: "WhatsApp",
			details: "+254 712 345 678", // Updated to Kenyan phone format
			description: "Quick questions and prayer requests",
		},
		{
			icon: MapPin,
			title: "Visit Us",
			details: "Ngong Road, Karen, Nairobi, Kenya", // Updated to Kenyan address
			description: "Open for appointments and events",
		},
	];

	return (
		<>
			<main>
				{/* Hero Section */}
				<section className="bg-gradient-to-b from-primary/5 to-background py-16">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
							Contact Us
						</h1>
						<p className="text-xl text-muted-foreground text-pretty">
							We're here to support you on your journey. Reach out
							with questions, prayer requests, or to learn more
							about our programs.
						</p>
					</div>
				</section>

				{/* Contact Methods */}
				<section className="py-16">
					<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
						<h2 className="text-3xl font-bold text-foreground mb-12 text-center">
							Get in Touch
						</h2>
						<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
							{contactMethods.map((method, index) => {
								const Icon = method.icon;
								return (
									<Card
										key={index}
										className="text-center p-6"
									>
										<div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
											<Icon className="h-6 w-6 text-primary" />
										</div>
										<h3 className="text-lg font-semibold text-foreground mb-2">
											{method.title}
										</h3>
										<p className="font-medium text-foreground mb-1">
											{method.details}
										</p>
										<p className="text-sm text-muted-foreground">
											{method.description}
										</p>
									</Card>
								);
							})}
						</div>
					</div>
				</section>

				{/* Office Hours */}
				<section className="py-16 bg-primary/5">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<div className="flex items-center justify-center gap-3 mb-6">
							<Clock className="h-8 w-8 text-primary" />
							<h2 className="text-3xl font-bold text-foreground">
								Office Hours
							</h2>
						</div>
						<div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
							<div>
								<h3 className="text-lg font-semibold text-foreground mb-2">
									General Office
								</h3>
								<div className="space-y-1 text-muted-foreground">
									<p>Monday - Friday: 9:00 AM - 5:00 PM</p>
									<p>Saturday: 10:00 AM - 2:00 PM</p>
									<p>Sunday: Closed</p>
								</div>
							</div>
							<div>
								<h3 className="text-lg font-semibold text-foreground mb-2">
									Counseling Services
								</h3>
								<div className="space-y-1 text-muted-foreground">
									<p>Monday - Friday: 8:00 AM - 8:00 PM</p>
									<p>Saturday: 9:00 AM - 5:00 PM</p>
									<p>Sunday: By appointment</p>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
