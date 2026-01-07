"use client";

import { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Loader2, Check } from "lucide-react";
import { MembershipTier } from "@/lib/mongodb";
import { cn } from "@/lib/utils";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";

interface PlanSelectorProps {
    onSelect: (tier: MembershipTier) => void;
    selectedTierId?: string;
    buttonLabel?: string;
    isLoading?: boolean;
}

export function PlanSelector({
    onSelect,
    selectedTierId: initialSelectedTierId = "",
    buttonLabel = "Continue",
    isLoading = false
}: PlanSelectorProps) {
    const [tiers, setTiers] = useState<MembershipTier[]>([]);
    const [localSelectedTierId, setLocalSelectedTierId] = useState<string>(initialSelectedTierId);
    const [isLoadingTiers, setIsLoadingTiers] = useState(true);

    useEffect(() => {
        async function fetchTiers() {
            try {
                const response = await fetch("/api/memberships");
                if (response.ok) {
                    const data = await response.json();
                    setTiers(data.tiers || []);
                    if (data.tiers && data.tiers.length === 1 && !localSelectedTierId) {
                        setLocalSelectedTierId(data.tiers[0].tierId);
                    }
                }
            } catch (error) {
                // Error handled by UI state
            } finally {
                setIsLoadingTiers(false);
            }
        }
        fetchTiers();
    }, [localSelectedTierId]);

    const handleTierClick = (tier: MembershipTier) => {
        setLocalSelectedTierId(tier.tierId);
    };

    const handleAction = () => {
        const selectedTier = tiers.find(t => t.tierId === localSelectedTierId);
        if (selectedTier) {
            onSelect(selectedTier);
        }
    };

    return (
        <div className="w-full">
            <div className="mb-10 relative px-4">
                {isLoadingTiers ? (
                    <div className="flex justify-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                ) : (
                    <Swiper
                        modules={[Pagination]}
                        spaceBetween={24}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 24,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 32,
                            },
                        }}
                        centeredSlides={tiers.length < 3}
                        className="pb-12"
                    >
                        {tiers.map((tier) => (
                            <SwiperSlide key={tier.tierId} className="h-auto">
                                <div className="max-w-sm mx-auto h-full">
                                    <Card
                                        className={cn(
                                            "cursor-pointer transition-all border-2 relative flex flex-col h-full",
                                            localSelectedTierId === tier.tierId
                                                ? "border-primary shadow-lg ring-1 ring-primary"
                                                : "border-border hover:border-primary/50",
                                        )}
                                        onClick={() => handleTierClick(tier)}
                                    >
                                        {localSelectedTierId === tier.tierId && (
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
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>

            <div className="max-w-md mx-auto text-center mt-4">
                <button
                    onClick={handleAction}
                    disabled={!localSelectedTierId || isLoading}
                    className={cn(
                        "w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-11 px-8 py-2",
                        isLoading && "cursor-not-allowed opacity-80"
                    )}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        buttonLabel
                    )}
                </button>
            </div>

            <style jsx global>{`
				.swiper-pagination-bullet-active {
					background: var(--primary);
				}
			`}</style>
        </div>
    );
}
