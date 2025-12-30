import type React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { UserHeader } from "@/components/user/user-header";

export default async function UserLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();

	if (!session) {
		redirect("/auth/login");
	}

	return (
		<div className="flex min-h-screen flex-col">
			<UserHeader />
			<main className="flex-1 space-y-4 p-4 md:p-8 pt-6">{children}</main>
		</div>
	);
}
