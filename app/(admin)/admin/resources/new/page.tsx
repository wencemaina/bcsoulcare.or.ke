import { ResourceForm } from "@/components/admin/soul-care/resource-form";

export default function NewResourcePage() {
    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Add New Resource</h1>
                <p className="text-muted-foreground">Create a new article, study guide, or material.</p>
            </div>

            <div className="bg-card border rounded-lg p-6">
                <ResourceForm />
            </div>
        </div>
    );
}
