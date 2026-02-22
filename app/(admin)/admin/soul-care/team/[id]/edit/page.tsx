"use client";

import { useEffect, useState } from "react";
import { TeamMemberForm } from "@/components/admin/soul-care/team-member-form";
import { SoulCareTeamMember } from "@/types/database";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function EditTeamMemberPage({ params }: { params: { id: string } }) {
    const [member, setMember] = useState<SoulCareTeamMember | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchMember() {
            try {
                const res = await fetch(`/api/admin/soul-care/team/${params.id}`);
                const data = await res.json();
                if (res.ok) {
                    setMember(data.member);
                } else {
                    toast.error(data.error || "Failed to fetch team member");
                }
            } catch (error) {
                toast.error("An error occurred while fetching the team member");
            } finally {
                setIsLoading(false);
            }
        }

        fetchMember();
    }, [params.id]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!member) {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold">Team member not found</h1>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Edit Team Member</h1>
                <p className="text-muted-foreground">Update the details for "{member.name}".</p>
            </div>

            <div className="bg-card border rounded-lg p-6">
                <TeamMemberForm initialData={member} />
            </div>
        </div>
    );
}
