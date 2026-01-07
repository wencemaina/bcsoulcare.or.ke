"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SoulCareResource } from "@/lib/mongodb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

interface ResourceFormProps {
    initialData?: SoulCareResource | null;
}

export function ResourceForm({ initialData }: ResourceFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        description: initialData?.description || "",
        category: initialData?.category || "article",
        type: initialData?.type || "",
        author: initialData?.author || "",
        downloadUrl: initialData?.downloadUrl || "",
        readTime: initialData?.readTime || "",
        pages: initialData?.pages || "",
        duration: initialData?.duration || "",
        rating: initialData?.rating || "",
        featured: initialData?.featured || false,
        status: initialData?.status || "active",
    });

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload-resource", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (res.ok) {
                setFormData((prev) => ({ ...prev, downloadUrl: data.url }));
                toast.success("File uploaded successfully");
            } else {
                toast.error(data.error || "Upload failed");
            }
        } catch (error) {
            toast.error("An error occurred during upload");
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.category || !formData.downloadUrl) {
            toast.error("Title, category, and download URL are required");
            return;
        }

        setIsLoading(true);
        try {
            const url = initialData
                ? `/api/admin/resources/${initialData.resourceId}`
                : "/api/admin/resources";

            const method = initialData ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                toast.success(`Resource ${initialData ? "updated" : "created"} successfully`);
                router.push("/admin/resources");
                router.refresh();
            } else {
                const data = await res.json();
                toast.error(data.error || "Failed to save resource");
            }
        } catch (error) {
            toast.error("An error occurred while saving the resource");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
            <div className="space-y-4">
                <div className="grid gap-2">
                    <Label htmlFor="title">Resource Title</Label>
                    <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g. Finding Peace in Difficult Times"
                        required
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="description">Short Description</Label>
                    <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Summarize the resource..."
                        className="min-h-[100px]"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                            value={formData.category}
                            onValueChange={(value: any) => setFormData({ ...formData, category: value })}
                        >
                            <SelectTrigger id="category">
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="article">Article</SelectItem>
                                <SelectItem value="study">Study Guide</SelectItem>
                                <SelectItem value="audio">Audio/Video</SelectItem>
                                <SelectItem value="book">Book Recommendation</SelectItem>
                                <SelectItem value="worksheet">Worksheet</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="type">Display Type</Label>
                        <Input
                            id="type"
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            placeholder="e.g. Blog Post, PDF, Video"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="author">Author/Source</Label>
                        <Input
                            id="author"
                            value={formData.author}
                            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                            placeholder="e.g. Dr. Sarah Johnson"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label>Resource Content</Label>
                        <Tabs defaultValue={formData.downloadUrl.includes("r2.cloudflarestorage.com") || !formData.downloadUrl ? "upload" : "link"} className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="upload">Upload File</TabsTrigger>
                                <TabsTrigger value="link">External Link</TabsTrigger>
                            </TabsList>
                            <TabsContent value="upload" className="space-y-4 pt-4">
                                <div className="flex items-center gap-4">
                                    <Input
                                        type="file"
                                        onChange={handleFileUpload}
                                        disabled={isUploading}
                                        className="flex-1"
                                        accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.csv,audio/*,video/*,image/*"
                                    />
                                    {isUploading && <Loader2 className="h-4 w-4 animate-spin" />}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Max size: 50MB. Supported: PDF, Office, Audio, Video, Images.
                                </p>
                            </TabsContent>
                            <TabsContent value="link" className="pt-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="downloadUrl">External URL</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="downloadUrl"
                                            value={formData.downloadUrl}
                                            onChange={(e) => setFormData({ ...formData, downloadUrl: e.target.value })}
                                            placeholder="https://example.com/resource"
                                            required
                                        />
                                        {formData.downloadUrl && (
                                            <Button size="icon" variant="outline" type="button" onClick={() => window.open(formData.downloadUrl, "_blank")}>
                                                <ExternalLink className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                        {formData.downloadUrl && (
                            <div className="mt-2 p-3 bg-muted rounded-md flex items-center justify-between border border-dashed">
                                <span className="text-xs truncate max-w-[400px] font-medium">{formData.downloadUrl}</span>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-7 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                                    onClick={() => setFormData({ ...formData, downloadUrl: "" })}
                                >
                                    Clear
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="readTime">Read Time</Label>
                        <Input
                            id="readTime"
                            value={formData.readTime}
                            onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                            placeholder="e.g. 8 min"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="pages">Pages</Label>
                        <Input
                            id="pages"
                            value={formData.pages}
                            onChange={(e) => setFormData({ ...formData, pages: e.target.value })}
                            placeholder="e.g. 24"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="duration">Duration</Label>
                        <Input
                            id="duration"
                            value={formData.duration}
                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                            placeholder="e.g. 45 min"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="rating">Rating</Label>
                        <Input
                            id="rating"
                            value={formData.rating}
                            onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                            placeholder="e.g. 4.8/5"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-0.5">
                        <Label>Featured Resource</Label>
                        <p className="text-xs text-muted-foreground">Highlight this resource at the top of the page.</p>
                    </div>
                    <Switch
                        checked={formData.featured}
                        onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
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
            </div>

            <div className="flex gap-4">
                <Button type="submit" disabled={isLoading} className="flex-1">
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {initialData ? "Update Resource" : "Create Resource"}
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/admin/resources")}
                    disabled={isLoading}
                >
                    Cancel
                </Button>
            </div>
        </form>
    );
}
