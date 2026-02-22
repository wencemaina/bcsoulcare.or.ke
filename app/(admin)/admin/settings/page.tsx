"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUpload } from "@/components/admin/image-upload";
import { TbLoader2, TbDeviceFloppy } from "react-icons/tb";
import { toast } from "sonner";
import { SiteSettings } from "@/types/database";

export default function AdminSettingsPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [settings, setSettings] = useState<Partial<SiteSettings>>({
        organizationName: "",
        logoUrl: "",
        contactEmail: "",
        contactPhone: "",
        socialLinks: {
            facebook: "",
            twitter: "",
            instagram: "",
            linkedin: "",
        }
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await fetch("/api/admin/settings");
                if (response.ok) {
                    const data = await response.json();
                    setSettings({
                        ...data,
                        socialLinks: data.socialLinks || {
                            facebook: "",
                            twitter: "",
                            instagram: "",
                            linkedin: "",
                        }
                    });
                } else if (response.status === 401) {
                    router.push("/auth/login");
                }
            } catch (error) {
                console.error("Error fetching settings:", error);
                toast.error("Failed to load settings");
            } finally {
                setIsLoading(false);
            }
        };

        fetchSettings();
    }, [router]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            const response = await fetch("/api/admin/settings", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(settings),
            });

            if (response.ok) {
                toast.success("Settings updated successfully");
                router.refresh();
            } else {
                const error = await response.json();
                toast.error(error.error || "Failed to update settings");
            }
        } catch (error) {
            console.error("Error updating settings:", error);
            toast.error("An error occurred while saving settings");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-1 items-center justify-center p-8">
                <TbLoader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Site Settings</h1>
                    <p className="text-muted-foreground">Manage your organization's global information and branding.</p>
                </div>
            </div>

            <form onSubmit={handleSave} className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2">
                    {/* General Branding */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Branding</CardTitle>
                            <CardDescription>Update your logo and organization name.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Organization Logo</Label>
                                <ImageUpload 
                                    value={settings.logoUrl} 
                                    onChange={(url) => setSettings({ ...settings, logoUrl: url })}
                                    label="Upload Logo"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="orgName">Organization Name</Label>
                                <Input 
                                    id="orgName" 
                                    value={settings.organizationName} 
                                    onChange={(e) => setSettings({ ...settings, organizationName: e.target.value })}
                                    placeholder="Enter organization name"
                                    required
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contact Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Contact Information</CardTitle>
                            <CardDescription>These details will be shown in the footer.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Public Email</Label>
                                <Input 
                                    id="email" 
                                    type="email"
                                    value={settings.contactEmail} 
                                    onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                                    placeholder="contact@example.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Public Phone</Label>
                                <Input 
                                    id="phone" 
                                    value={settings.contactPhone} 
                                    onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                                    placeholder="+254 ..."
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Social Media Links */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Social Media</CardTitle>
                            <CardDescription>Connect your social media profiles.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="facebook">Facebook URL</Label>
                                <Input 
                                    id="facebook" 
                                    value={settings.socialLinks?.facebook} 
                                    onChange={(e) => setSettings({ 
                                        ...settings, 
                                        socialLinks: { ...settings.socialLinks!, facebook: e.target.value } 
                                    })}
                                    placeholder="https://facebook.com/..."
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="twitter">Twitter URL</Label>
                                <Input 
                                    id="twitter" 
                                    value={settings.socialLinks?.twitter} 
                                    onChange={(e) => setSettings({ 
                                        ...settings, 
                                        socialLinks: { ...settings.socialLinks!, twitter: e.target.value } 
                                    })}
                                    placeholder="https://twitter.com/..."
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="instagram">Instagram URL</Label>
                                <Input 
                                    id="instagram" 
                                    value={settings.socialLinks?.instagram} 
                                    onChange={(e) => setSettings({ 
                                        ...settings, 
                                        socialLinks: { ...settings.socialLinks!, instagram: e.target.value } 
                                    })}
                                    placeholder="https://instagram.com/..."
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="linkedin">LinkedIn URL</Label>
                                <Input 
                                    id="linkedin" 
                                    value={settings.socialLinks?.linkedin} 
                                    onChange={(e) => setSettings({ 
                                        ...settings, 
                                        socialLinks: { ...settings.socialLinks!, linkedin: e.target.value } 
                                    })}
                                    placeholder="https://linkedin.com/..."
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex justify-end">
                    <Button type="submit" disabled={isSaving} className="w-full md:w-auto">
                        {isSaving ? (
                            <>
                                <TbLoader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <TbSave className="mr-2 h-4 w-4" />
                                Save Changes
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
