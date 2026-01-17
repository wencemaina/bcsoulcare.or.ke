import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NewsletterSignup } from "@/components/newsletter-signup";
import {
	Facebook,
	Instagram,
	Twitter,
	Mail,
	Phone,
	MapPin,
} from "lucide-react";

export function Footer() {
	return (
		<footer
			className="relative text-white"
			style={{ backgroundColor: "#004752" }}
		>
			<div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
				<svg
					className="relative block w-full h-16"
					data-name="Layer 1"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 1200 120"
					preserveAspectRatio="none"
				>
					<path
						d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
						className="fill-white"
					/>
				</svg>
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-20">
				<div className="grid md:grid-cols-4 gap-8">
					{/* Organization Info */}
					<div className="space-y-4">
						<h3 className="text-2xl font-bold">CCMWA</h3>
						<p className="text-white/80 text-sm leading-relaxed">
							Growing together in faith and community through
							discipleship, soul care, and authentic
							relationships.
						</p>
						<div className="flex space-x-4">
							<Button
								variant="ghost"
								size="sm"
								className="text-white hover:text-accent"
								asChild
							>
								<Link href="https://www.facebook.com/share/1EJheWY49n/" target="_blank" rel="noopener noreferrer">
									<Facebook className="h-5 w-5" />
								</Link>
							</Button>
							<Button
								variant="ghost"
								size="sm"
								className="text-white hover:text-accent"
							>
								<Instagram className="h-5 w-5" />
							</Button>
							<Button
								variant="ghost"
								size="sm"
								className="text-white hover:text-accent"
							>
								<Twitter className="h-5 w-5" />
							</Button>
						</div>
					</div>

					{/* Quick Links */}
					<div className="space-y-4">
						<h4 className="text-lg font-semibold">Quick Links</h4>
						<nav className="space-y-2">
							{[
								{ name: "About Us", href: "/about" },
								{ name: "Programs", href: "/programs" },
								{ name: "Soul Care", href: "/soul-care" },
								{ name: "Events", href: "/events" },
								{ name: "Blog", href: "/blog" },
							].map((link) => (
								<Link
									key={link.name}
									href={link.href}
									className="block text-white/80 hover:text-accent transition-colors text-sm"
								>
									{link.name}
								</Link>
							))}
						</nav>
					</div>

					{/* Contact Info */}
					<div className="space-y-4">
						<h4 className="text-lg font-semibold">Contact</h4>
						<div className="space-y-3">
							<div className="flex items-center gap-3 text-sm">
								<Phone className="h-4 w-4 text-accent" />
								<span className="text-white/80">
									+254 712 345 678
								</span>
							</div>
							<div className="flex items-center gap-3 text-sm">
								<Mail className="h-4 w-4 text-accent" />
								<span className="text-white/80">
									info@bcsoulcare.or.ke
								</span>
							</div>
							<div className="flex items-start gap-3 text-sm">
								<MapPin className="h-4 w-4 text-accent mt-0.5" />
								<span className="text-white/80">
									Ngong Road, Karen
									<br />
									Nairobi, Kenya
								</span>
							</div>
						</div>
					</div>

					<NewsletterSignup variant="footer" />
				</div>

				<div className="border-t border-white/20 mt-8 pt-8 text-center">
					<p className="text-white/60 text-sm">
						© 2024 CCMWA. All rights reserved. | Privacy Policy |
						Terms of Service
					</p>
				</div>
			</div>
		</footer>
	);
}
