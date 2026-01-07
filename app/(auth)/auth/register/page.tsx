"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { Loader2, Check } from "lucide-react";
import { MembershipTier } from "@/lib/mongodb";
import { cn } from "@/lib/utils";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function RegisterPage() {
	const [tiers, setTiers] = useState<MembershipTier[]>([]);
	const [selectedTierId, setSelectedTierId] = useState<string>("");
	const [isLoadingTiers, setIsLoadingTiers] = useState(true);

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

	useEffect(() => {
		async function fetchTiers() {
			try {
				const response = await fetch("/api/memberships");
				if (response.ok) {
					const data = await response.json();
					setTiers(data.tiers || []);
					if (data.tiers && data.tiers.length === 1) {
						setSelectedTierId(data.tiers[0].tierId);
					}
				}
			} catch (error) {
				// Error handled by UI state
			} finally {
				setIsLoadingTiers(false);
			}
		}
		fetchTiers();
	}, []);

	const handleContinue = () => {
		if (!selectedTierId) return;
		const tier = tiers.find(t => t.tierId === selectedTierId);
		router.push(`/auth/register/details?tierId=${selectedTierId}&tierName=${encodeURIComponent(tier?.name || "")}`);
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

				<div className="mb-10 relative px-12">
					{isLoadingTiers ? (
						<div className="flex justify-center py-8">
							<Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
						</div>
					) : (
						<Swiper
							modules={[Pagination, Navigation]}
							spaceBetween={30}
							slidesPerView={1}
							pagination={{ clickable: true }}
							navigation={true}
							breakpoints={{
								640: {
									slidesPerView: 2,
								},
								1024: {
									slidesPerView: 3,
								},
								1280: {
									slidesPerView: 4,
								},
							}}
							className="pb-12"
						>
							{tiers.map((tier) => (
								<SwiperSlide key={tier.tierId} className="h-auto">
									<Card
										className={cn(
											"cursor-pointer transition-all border-2 relative flex flex-col h-full",
											selectedTierId === tier.tierId
												? "border-primary shadow-lg ring-1 ring-primary"
												: "border-border hover:border-primary/50",
										)}
										onClick={() =>
											setSelectedTierId(tier.tierId)
										}
									>
										{selectedTierId === tier.tierId && (
											<div className="absolute -top-3 -right-3 bg-primary text-primary-foreground rounded-full p-1 shadow-sm z-10">
												<Check className="h-4 w-4" />
											</div>
										)}
										<CardHeader>
											<CardTitle>{tier.name}</CardTitle>
											<CardDescription className="line-clamp-2">
												{tier.description}
											</CardDescription>
										</CardHeader>
										<CardContent className="flex-grow">
											<div className="text-2xl font-bold mb-4">
												KES {tier.price.toLocaleString()}
												<span className="text-sm font-normal text-muted-foreground ml-1">
													/{tier.billingCycle}
												</span>
											</div>
											<ul className="text-sm space-y-2">
												{tier.features
													.slice(0, 3)
													.map((feature, i) => (
														<li
															key={i}
															className="flex items-center gap-2"
														>
															<Check className="h-4 w-4 text-green-500 shrink-0" />
															<span>{feature}</span>
														</li>
													))}
												{tier.features.length > 3 && (
													<li className="text-muted-foreground text-xs pl-6">
														+ {tier.features.length - 3}{" "}
														more...
													</li>
												)}
											</ul>
										</CardContent>
									</Card>
								</SwiperSlide>
							))}
						</Swiper>
					)}
				</div>

				<div className="max-w-md mx-auto text-center">
					<Button
						onClick={handleContinue}
						disabled={!selectedTierId}
						size="lg"
						className="w-full"
					>
						Continue
					</Button>
				</div>
			</div>

			<style jsx global>{`
				.swiper-button-next,
				.swiper-button-prev {
					color: var(--primary);
					background: white;
					width: 40px;
					height: 40px;
					border-radius: 50%;
					box-shadow: 0 2px 8px rgba(0,0,0,0.1);
					top: 50%;
					transform: translateY(-50%);
				}
				.swiper-button-prev {
					left: -40px;
				}
				.swiper-button-next {
					right: -40px;
				}
				.swiper-button-next::after,
				.swiper-button-prev::after {
					font-size: 18px;
					font-weight: bold;
				}
				.swiper-pagination-bullet-active {
					background: var(--primary);
				}
			`}</style>
		</main>
	);
}
