import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 text-center">
			<div className="relative mb-8">
				<div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full" />
				<h1 className="relative text-9xl font-extrabold tracking-tighter text-primary animate-in fade-in zoom-in duration-700">
					404
				</h1>
			</div>

			<div className="space-y-4 max-w-lg animate-in slide-in-from-bottom-4 duration-700 delay-200">
				<div className="flex items-center justify-center gap-2 text-primary font-medium uppercase tracking-widest text-sm translate-y-1">
					<FileQuestion className="h-4 w-4" />
					<span>Page Not Found</span>
				</div>

				<h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
					Oops! You've wandered off the path.
				</h2>

				<p className="text-muted-foreground text-lg leading-relaxed">
					The page you are looking for might have been moved, deleted,
					or never existed. Let's get you back to where you can find
					the care and support you need.
				</p>
			</div>

			<div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-in slide-in-from-bottom-8 duration-700 delay-500">
				<Button
					asChild
					size="lg"
					className="px-8 h-12 text-base font-medium rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105"
				>
					<Link href="/">
						<Home className="mr-2 h-5 w-5" />
						Back to Home
					</Link>
				</Button>

				<Button
					variant="outline"
					asChild
					size="lg"
					className="px-8 h-12 text-base font-medium rounded-full border-2 hover:bg-muted transition-all duration-300"
				>
					<Link href="/contact">Contact Support</Link>
				</Button>
			</div>

			{/* Decorative elements */}
			<div className="absolute top-1/4 left-1/4 -z-10 h-64 w-64 bg-primary/5 blur-[100px] rounded-full animate-pulse" />
			<div className="absolute bottom-1/4 right-1/4 -z-10 h-64 w-64 bg-primary/5 blur-[100px] rounded-full animate-pulse delay-700" />
		</div>
	);
}
