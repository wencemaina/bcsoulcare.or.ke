"use client";

import { useEffect, useState } from "react";
import { ResourceForm } from "@/components/admin/soul-care/resource-form";
import { SoulCareResource } from "@/lib/mongodb";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function EditResourcePage({ params }: { params: { id: string } }) {
    const [resource, setResource] = useState<SoulCareResource | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchResource() {
            try {
                const res = await fetch(`/api/admin/soul-care/resources/${params.id}`);
                const data = await res.json();
                if (res.ok) {
                    setResource(data.resource);
                } else {
                    toast.error(data.error || "Failed to fetch resource");
                }
            } catch (error) {
                toast.error("An error occurred while fetching the resource");
            } finally {
                setIsLoading(false);
            }
        }

        fetchResource();
    }, [params.id]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!resource) {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold">Resource not found</h1>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Edit Resource</h1>
                <p className="text-muted-foreground">Update the details for "{resource.title}".</p>
            </div>

            <div className="bg-card border rounded-lg p-6">
                <ResourceForm initialData={resource} />
            </div>
        </div>
    );
}
