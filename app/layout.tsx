import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { AuthProvider } from "@/lib/auth-context";
import { ThemeProvider } from "@/components/theme-provider";
import { Suspense } from "react";
import "./globals.css";

export const metadata: Metadata = {
	title: "CCMWA - Soul-Care. Wellness. Discipleship.", // Updated organization name to CCMWA
	description:
		"Christ-centered counseling and soul-care rooted in the sufficiency of Scripture, nurturing hope, healing, and transformation in Christ.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}
			>
				<Suspense fallback={<div>Loading...</div>}>
					<AuthProvider>
						<ThemeProvider
							attribute="class"
							defaultTheme="system"
							enableSystem
							disableTransitionOnChange
						>
							{children}
						</ThemeProvider>
					</AuthProvider>
				</Suspense>
				<Analytics />
			</body>
		</html>
	);
}
