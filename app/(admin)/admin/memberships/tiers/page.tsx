"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TbPlus, TbLoader2, TbEdit, TbTrash, TbEye } from "react-icons/tb";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { MembershipTier } from "@/lib/mongodb";

export default function MembershipTiersPage() {
	const router = useRouter();
	const [tiers, setTiers] = useState<MembershipTier[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetchTiers();
	}, []);

	async function fetchTiers() {
		try {
			const response = await fetch("/api/admin/memberships");
			if (!response.ok) {
				throw new Error("Failed to fetch membership tiers");
			}
			const data = await response.json();
			setTiers(data.tiers || []);
		} catch (error) {
			console.error(error);
			toast.error("Failed to load membership tiers");
		} finally {
			setIsLoading(false);
		}
	}

	const getStatusBadge = (status: string) => {
		const variants: Record<string, "default" | "secondary" | "outline"> = {
			active: "default",
			archived: "secondary",
		};
		return (
			// @ts-expect-error - status might be loosely typed from API
			<Badge variant={variants[status] || "default"}>
				{status.charAt(0).toUpperCase() + status.slice(1)}
			</Badge>
		);
	};

	return (
		<div className="flex flex-col gap-6 p-6">
			{/* ... header ... */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						Membership Tiers
					</h1>
					<p className="text-muted-foreground">
						Manage your membership levels and pricing
					</p>
				</div>
				<Button onClick={() => router.push("/admin/memberships/new")}>
					<TbPlus className="mr-2 h-4 w-4" />
					Create Tier
				</Button>
			</div>
			<Separator />

			<Card>
				<CardHeader>
					<CardTitle>Tiers ({tiers.length})</CardTitle>
				</CardHeader>
				<CardContent>
					{isLoading ? (
						<div className="flex items-center justify-center py-8">
							<TbLoader2 className="h-8 w-8 animate-spin text-muted-foreground" />
						</div>
					) : tiers.length === 0 ? (
						<div className="flex flex-col items-center justify-center py-8 text-center">
							<p className="text-muted-foreground">
								No membership tiers found
							</p>
							<Button
								variant="link"
								onClick={() =>
									router.push("/admin/memberships/new")
								}
							>
								Create your first tier
							</Button>
						</div>
					) : (
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Name</TableHead>
									<TableHead>Price</TableHead>
									<TableHead>Billing Cycle</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Subscribers</TableHead>
									<TableHead className="text-right">
										Actions
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{tiers.map((tier) => (
									<TableRow key={tier.tierId}>
										<TableCell className="font-medium">
											{tier.name}
										</TableCell>
										<TableCell>
											KES {tier.price.toLocaleString()}
										</TableCell>
										<TableCell className="capitalize">
											{tier.billingCycle}
										</TableCell>
										<TableCell>
											{getStatusBadge(tier.status)}
										</TableCell>
										<TableCell>
											{tier.subscribersCount.toLocaleString()}
										</TableCell>
										<TableCell className="text-right">
											<div className="flex justify-end gap-2">
												<Button
													variant="ghost"
													size="icon"
													onClick={() => {
														toast.info(
															"Viewing tier details...",
														);
													}}
												>
													<TbEye className="h-4 w-4" />
												</Button>
												<Button
													variant="ghost"
													size="icon"
													onClick={() => {
														toast.info(
															"Editing tier...",
														);
													}}
												>
													<TbEdit className="h-4 w-4" />
												</Button>
												<Button
													variant="ghost"
													size="icon"
													onClick={() => {
														toast.error(
															"Delete functionality not implemented yet",
														);
													}}
												>
													<TbTrash className="h-4 w-4 text-destructive" />
												</Button>
											</div>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
