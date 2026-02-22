"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { PlanSelector } from "@/components/membership/plan-selector";
import { MembershipTier } from "@/types/database";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MembershipManagementPage() {
    const { user, isLoading: isAuthLoading } = useAuth();
    const router = useRouter();
    const [isUpdating, setIsUpdating] = useState(false);

    const handleSelect = async (tier: MembershipTier) => {
        setIsUpdating(true);
        try {
            const res = await fetch("/api/membership/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ tierId: tier.tierId }),
            });

            if (res.ok) {
                toast.success(`Membership updated to ${tier.name}!`);
                // Refresh session or redirect
                router.push("/user-account");
                router.refresh(); // Trigger server-side refresh for session
            } else {
                const data = await res.json();
                toast.error(data.error || "Failed to update membership");
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
        } finally {
            setIsUpdating(false);
        }
    };

    if (!isAuthLoading && !user) {
        router.push("/auth/login");
        return null;
    }

    return (
        <main className="py-16">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <Button
                        variant="ghost"
                        onClick={() => router.push("/user-account")}
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Dashboard
                    </Button>
                </div>

                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold tracking-tight mb-2">
                        Manage Your Membership
                    </h1>
                    <p className="text-muted-foreground">
                        Renew your current plan or upgrade to a new tier.
                    </p>
                </div>

                <PlanSelector
                    onSelect={handleSelect}
                    selectedTierId={user?.membershipTierId}
                    buttonLabel={isUpdating ? "Updating..." : "Confirm Membership Change"}
                    isLoading={isUpdating}
                />
            </div>
        </main>
    );
}
