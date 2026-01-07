"use client";

import { useEffect, useState } from "react";
import { ServiceForm } from "@/components/admin/soul-care/service-form";
import { SoulCareService } from "@/lib/mongodb";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function EditServicePage({ params }: { params: { id: string } }) {
    const [service, setService] = useState<SoulCareService | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchService() {
            try {
                const res = await fetch(`/api/admin/soul-care/services/${params.id}`);
                const data = await res.json();
                if (res.ok) {
                    setService(data.service);
                } else {
                    toast.error(data.error || "Failed to fetch service");
                }
            } catch (error) {
                toast.error("An error occurred while fetching the service");
            } finally {
                setIsLoading(false);
            }
        }

        fetchService();
    }, [params.id]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!service) {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold">Service not found</h1>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Edit Service</h1>
                <p className="text-muted-foreground">Update the details for "{service.title}".</p>
            </div>

            <div className="bg-card border rounded-lg p-6">
                <ServiceForm initialData={service} />
            </div>
        </div>
    );
}
