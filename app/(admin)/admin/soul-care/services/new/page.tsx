import { ServiceForm } from "@/components/admin/soul-care/service-form";

export default function NewServicePage() {
    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Add New Service</h1>
                <p className="text-muted-foreground">Fill in the details for the new Soul Care service.</p>
            </div>

            <div className="bg-card border rounded-lg p-6">
                <ServiceForm />
            </div>
        </div>
    );
}
