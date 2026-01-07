import { TeamMemberForm } from "@/components/admin/soul-care/team-member-form";

export default function NewTeamMemberPage() {
    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Add Team Member</h1>
                <p className="text-muted-foreground">Add a new care professional to the Soul Care team.</p>
            </div>

            <div className="bg-card border rounded-lg p-6">
                <TeamMemberForm />
            </div>
        </div>
    );
}
