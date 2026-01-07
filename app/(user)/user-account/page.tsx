"use client";

import { useAuth } from "@/lib/auth-context";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Calendar, CreditCard, RefreshCw, User as UserIcon, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

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

	const formatDate = (date: string | Date | undefined) => {
		if (!date) return "Not available";
		return new Date(date).toLocaleDateString("en-US", {
			day: "numeric",
			month: "long",
			year: "numeric",
		});
	};

	return (
		<div className="container mx-auto py-10 px-4 max-w-5xl">
			<div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">My Account</h1>
					<p className="text-muted-foreground">Manage your profile and membership details</p>
				</div>
				<Badge variant="outline" className="text-sm font-mono w-fit">
					ID: {user.userId}
				</Badge>
			</div>

			<div className="grid gap-8 md:grid-cols-2">
				<Card className="shadow-sm border-border/60">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<UserIcon className="h-5 w-5 text-primary" />
							Profile Information
						</CardTitle>
						<CardDescription>Your personal account details</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-1">
								<div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
									First Name
								</div>
								<div className="text-lg font-medium">{user.firstName}</div>
							</div>
							<div className="space-y-1">
								<div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
									Last Name
								</div>
								<div className="text-lg font-medium">{user.lastName}</div>
							</div>
						</div>
						<div className="space-y-1 pt-2">
							<div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
								Email Address
							</div>
							<div className="flex items-center gap-2">
								<Mail className="h-4 w-4 text-muted-foreground" />
								<div className="text-lg font-medium">{user.email}</div>
							</div>
						</div>
						<div className="pt-6 border-t border-border/40">
							<div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 p-3 rounded-md">
								<Calendar className="h-4 w-4" />
								<span>Member since {formatDate(user.createdAt)}</span>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className="shadow-sm border-primary/20 relative overflow-hidden">
					<div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 pointer-events-none" />
					<CardHeader>
						<div className="flex items-center justify-between relative z-10">
							<CardTitle className="flex items-center gap-2">
								<CreditCard className="h-5 w-5 text-primary" />
								Membership Details
							</CardTitle>
							{user.membershipTier && (
								<Badge
									variant={user.membershipTier.status === "active" ? "default" : "destructive"}
									className="capitalize"
								>
									{user.membershipTier.status}
								</Badge>
							)}
						</div>
						<CardDescription>Your current subscription plan and status</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6 relative z-10">
						{user.membershipTier ? (
							<>
								<div className="p-5 bg-primary/5 rounded-xl border border-primary/10 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">
									<div className="text-[10px] font-bold text-primary/70 mb-1 uppercase tracking-[0.1em]">
										Active Plan
									</div>
									<div className="text-2xl font-bold text-foreground">
										{user.membershipTier.name}
									</div>
									<div className="text-sm text-muted-foreground mt-1 capitalize font-medium flex items-center gap-1.5">
										<div className="h-1.5 w-1.5 rounded-full bg-primary" />
										{user.membershipTier.billingCycle} Billing
									</div>
								</div>

								<div className="grid grid-cols-2 gap-6 pt-2">
									<div className="space-y-1">
										<div className="text-[10px] font-bold text-muted-foreground mb-1 uppercase tracking-wider">
											Start Date
										</div>
										<div className="text-sm font-semibold">
											{formatDate(user.membershipTier.startDate)}
										</div>
									</div>
									<div className="space-y-1">
										<div className="text-[10px] font-bold text-muted-foreground mb-1 uppercase tracking-wider">
											Renewal Date
										</div>
										<div className="text-sm font-semibold">
											{formatDate(user.membershipTier.endDate)}
										</div>
									</div>
								</div>
							</>
						) : (
							<div className="text-center py-10">
								<p className="text-muted-foreground mb-6">
									You don't have an active membership subscription.
								</p>
								<Button onClick={() => router.push("/auth/register")} size="lg">
									Choose a Plan
								</Button>
							</div>
						)}
					</CardContent>
					{user.membershipTier && (
						<CardFooter className="pt-4 pb-6 relative z-10 border-t border-border/40 mt-2">
							<Button
								className="w-full flex items-center justify-center gap-2 group transition-all"
								variant="default"
								onClick={() => router.push("/auth/register")}
							>
								<RefreshCw className="h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
								Renew or Upgrade Plan
							</Button>
						</CardFooter>
					)}
				</Card>
			</div>
		</div>
	);
}
