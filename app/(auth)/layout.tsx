import type React from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen flex flex-col bg-muted/30">
			<div className="p-4 sm:p-6 lg:p-8">
				<Button variant="ghost" asChild className="group">
					<Link href="/" className="flex items-center gap-2">
						<ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
						Back to home
					</Link>
				</Button>
			</div>
			<div className="flex-1 flex items-center justify-center p-4">
				<div className="w-full max-w-4xl">{children}</div>
			</div>
			<div className="p-4 text-center text-sm text-muted-foreground">
				© {new Date().getFullYear()} CCMWA. All rights reserved.
			</div>
		</div>
	);
}
