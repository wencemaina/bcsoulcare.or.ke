"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SoulCareTeamMember } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ImageUpload } from "@/components/admin/image-upload";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface TeamMemberFormProps {
    initialData?: SoulCareTeamMember | null;
}

export function TeamMemberForm({ initialData }: TeamMemberFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        title: initialData?.title || "",
        credentials: initialData?.credentials || "",
        image: initialData?.image || "",
        status: initialData?.status || "active",
        specialties: initialData?.specialties || [] as string[],
    });
    const [newSpecialty, setNewSpecialty] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.title) {
            toast.error("Name and title are required");
            return;
        }

        setIsLoading(true);
        try {
            const url = initialData
                ? `/api/admin/soul-care/team/${initialData.memberId}`
                : "/api/admin/soul-care/team";

            const method = initialData ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                toast.success(`Team member ${initialData ? "updated" : "created"} successfully`);
                router.push("/admin/soul-care/team");
                router.refresh();
            } else {
                const data = await res.json();
                toast.error(data.error || "Failed to save team member");
            }
        } catch (error) {
            toast.error("An error occurred while saving the team member");
        } finally {
            setIsLoading(false);
        }
    };

    const addSpecialty = () => {
        if (newSpecialty.trim()) {
            setFormData(prev => ({
                ...prev,
                specialties: [...prev.specialties, newSpecialty.trim()]
            }));
            setNewSpecialty("");
        }
    };

    const removeSpecialty = (index: number) => {
        setFormData(prev => ({
            ...prev,
            specialties: prev.specialties.filter((_, i) => i !== index)
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
            <div className="space-y-6">
                <div className="grid gap-2">
                    <Label>Team Member Photo (R2)</Label>
                    <ImageUpload
                        value={formData.image}
                        onChange={(url) => setFormData({ ...formData, image: url })}
                        label="Upload Professional Photo"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. Dr. Mary Njeri"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="title">Professional Title</Label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="e.g. Clinical Director"
                            required
                        />
                    </div>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="credentials">Credentials</Label>
                    <Input
                        id="credentials"
                        value={formData.credentials}
                        onChange={(e) => setFormData({ ...formData, credentials: e.target.value })}
                        placeholder="e.g. PhD, LMFT, EMDR Certified"
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                        value={formData.status}
                        onValueChange={(value: any) => setFormData({ ...formData, status: value })}
                    >
                        <SelectTrigger id="status">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid gap-2">
                    <Label>Specialties</Label>
                    <div className="flex gap-2">
                        <Input
                            value={newSpecialty}
                            onChange={(e) => setNewSpecialty(e.target.value)}
                            placeholder="Add a specialty..."
                            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSpecialty())}
                        />
                        <Button type="button" variant="outline" onClick={addSpecialty}>
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {formData.specialties.map((specialty, index) => (
                            <Badge key={index} variant="secondary" className="flex items-center gap-1 py-1 px-3">
                                {specialty}
                                <button
                                    type="button"
                                    onClick={() => removeSpecialty(index)}
                                    className="p-0.5 hover:bg-muted rounded-full transition-colors"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex gap-4">
                <Button type="submit" disabled={isLoading} className="flex-1">
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {initialData ? "Update Team Member" : "Create Team Member"}
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/admin/soul-care/team")}
                    disabled={isLoading}
                >
                    Cancel
                </Button>
            </div>
        </form>
    );
}
