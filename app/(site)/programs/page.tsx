import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Calendar, ArrowRight } from "lucide-react";

export default function ProgramsPage() {
	const programs = [
		{
			category: "Small Groups",
			title: "Life Groups",
			description:
				"Weekly gatherings focused on Bible study, prayer, and building authentic relationships.",
			duration: "12 weeks",
			commitment: "Weekly",
			nextStart: "March 15, 2024",
			spots: "8-12 people",
			level: "All Levels",
		},
		{
			category: "Mentorship",
			title: "One-on-One Discipleship",
			description:
				"Personalized spiritual guidance with experienced mentors for deeper growth.",
			duration: "6 months",
			commitment: "Bi-weekly",
			nextStart: "Rolling enrollment",
			spots: "1-on-1",
			level: "Intermediate",
		},
		{
			category: "Bible Study",
			title: "Foundations of Faith",
			description:
				"Comprehensive study covering core Christian beliefs and practices.",
			duration: "16 weeks",
			commitment: "Weekly",
			nextStart: "April 2, 2024",
			spots: "15-20 people",
			level: "Beginner",
		},
		{
			category: "Leadership",
			title: "Emerging Leaders",
			description:
				"Training program for those called to serve in ministry and community leadership.",
			duration: "9 months",
			commitment: "Monthly",
			nextStart: "September 1, 2024",
			spots: "10-15 people",
			level: "Advanced",
		},
		{
			category: "Support Groups",
			title: "Grief & Loss Support",
			description:
				"Safe space for those navigating loss, with professional facilitation and peer support.",
			duration: "8 weeks",
			commitment: "Weekly",
			nextStart: "Ongoing",
			spots: "6-10 people",
			level: "All Levels",
		},
		{
			category: "Family",
			title: "Parenting with Purpose",
			description:
				"Biblical principles for raising children with faith-based values and intentional parenting.",
			duration: "6 weeks",
			commitment: "Weekly",
			nextStart: "May 10, 2024",
			spots: "8-12 couples",
			level: "All Levels",
		},
	];

	const getLevelColor = (level: string) => {
		switch (level) {
			case "Beginner":
				return "bg-green-100 text-green-800";
			case "Intermediate":
				return "bg-yellow-100 text-yellow-800";
			case "Advanced":
				return "bg-red-100 text-red-800";
			default:
				return "bg-blue-100 text-blue-800";
		}
	};

	return (
		<>
			<main>
				{/* Hero Section */}
				<section className="bg-gradient-to-b from-primary/5 to-background py-16">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
							Discipleship Programs
						</h1>
						<p className="text-xl text-muted-foreground text-pretty">
							Join a community of learners and grow in your faith
							through structured programs designed for every stage
							of your spiritual journey.
						</p>
					</div>
				</section>

				{/* Programs Grid */}
				<section className="py-16">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
							{programs.map((program, index) => (
								<Card
									key={index}
									className="h-full hover:shadow-lg transition-shadow duration-300"
								>
									<CardHeader>
										<div className="flex items-center justify-between mb-2">
											<Badge variant="outline">
												{program.category}
											</Badge>
											<Badge
												className={getLevelColor(
													program.level,
												)}
											>
												{program.level}
											</Badge>
										</div>
										<CardTitle className="text-xl mb-2">
											{program.title}
										</CardTitle>
										<CardDescription className="text-base leading-relaxed">
											{program.description}
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-4">
										<div className="grid grid-cols-2 gap-4 text-sm">
											<div className="flex items-center gap-2">
												<Clock className="h-4 w-4 text-muted-foreground" />
												<span>{program.duration}</span>
											</div>
											<div className="flex items-center gap-2">
												<Users className="h-4 w-4 text-muted-foreground" />
												<span>{program.spots}</span>
											</div>
											<div className="flex items-center gap-2">
												<Calendar className="h-4 w-4 text-muted-foreground" />
												<span>
													{program.commitment}
												</span>
											</div>
											<div className="text-sm">
												<span className="font-medium">
													Next Start:
												</span>
												<br />
												<span className="text-muted-foreground">
													{program.nextStart}
												</span>
											</div>
										</div>
										<Button className="w-full flex items-center justify-center gap-2">
											Register Now
											<ArrowRight className="h-4 w-4" />
										</Button>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</section>

				{/* Call to Action */}
				<section className="py-16 bg-muted/30">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<h2 className="text-3xl font-bold text-foreground mb-6">
							Not Sure Where to Start?
						</h2>
						<p className="text-lg text-muted-foreground mb-8">
							We'd love to help you find the right program for
							your spiritual journey. Schedule a conversation with
							one of our program coordinators.
						</p>
						<Button
							size="lg"
							className="flex items-center gap-2 mx-auto"
						>
							Schedule a Consultation
							<ArrowRight className="h-4 w-4" />
						</Button>
					</div>
				</section>
			</main>
		</>
	);
}
