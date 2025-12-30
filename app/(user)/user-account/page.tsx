"use client";

import { useAuth } from "@/lib/auth-context";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserAccountPage() {
	const { user, isLoading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!isLoading && !user) {
			router.push("/auth/login");
		}
	}, [isLoading, user, router]);

	if (isLoading) {
		return (
			<div className="flex h-screen items-center justify-center">
				<Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
			</div>
		);
	}

	if (!user) return null;

	return (
		<div className="container mx-auto py-10 px-4">
			<h1 className="text-3xl font-bold mb-8">My Account</h1>

			<div className="grid gap-6 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Profile Information</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div>
							<div className="text-sm font-medium text-muted-foreground">
								Full Name
							</div>
							<div className="text-lg">
								{user.name ||
									`${user.firstName} ${user.lastName}`}
							</div>
						</div>
						<div>
							<div className="text-sm font-medium text-muted-foreground">
								Email
							</div>
							<div className="text-lg">{user.email}</div>
						</div>
						<div>
							<div className="text-sm font-medium text-muted-foreground">
								Member Since
							</div>
							<div className="text-lg">
								{new Date(user.createdAt).toLocaleDateString()}
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Membership Status</CardTitle>
						<CardDescription>Current plan details</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						{user.membershipTier ? (
							<>
								<div className="flex items-center justify-between">
									<span className="text-sm font-medium text-muted-foreground">
										Current Plan
									</span>
									<Badge
										variant="default"
										className="text-md px-3 py-1"
									>
										{user.membershipTier.name}
									</Badge>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-sm font-medium text-muted-foreground">
										Billing Cycle
									</span>
									<span className="capitalize">
										{user.membershipTier.billingCycle}
									</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-sm font-medium text-muted-foreground">
										Status
									</span>
									<Badge
										variant={
											user.membershipTier.status ===
											"active"
												? "outline"
												: "secondary"
										}
									>
										{user.membershipTier.status}
									</Badge>
								</div>
							</>
						) : (
							<div className="text-center py-4">
								<p className="text-muted-foreground mb-4">
									You are not subscribed to any membership
									tier.
								</p>
								<Badge variant="secondary">Free User</Badge>
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
