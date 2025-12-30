import type React from "react";
import { UserHeader } from "@/components/user/user-header";

export default function UserLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex min-h-screen flex-col">
			<UserHeader />
			<main className="flex-1 space-y-4 p-4 md:p-8 pt-6">{children}</main>
		</div>
	);
}
