"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { PlanSelector } from "@/components/membership/plan-selector";
import { MembershipTier } from "@/types/database";

export default function RegisterPage() {
	const { user } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (user) {
			if (user.role === "admin") {
				router.push("/admin");
			} else {
				router.push("/user-account");
			}
		}
	}, [user, router]);

	const handleSelect = (tier: MembershipTier) => {
		router.push(`/auth/register/details?tierId=${tier.tierId}&tierName=${encodeURIComponent(tier.name)}`);
	};

	return (
		<main className="py-16">
			<div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-10">
					<h1 className="text-3xl font-bold tracking-tight mb-2">
						Join Our Community
					</h1>
					<p className="text-muted-foreground">
						Choose your plan to get started.
					</p>
				</div>

				<PlanSelector onSelect={handleSelect} />
			</div>
		</main>
	);
}