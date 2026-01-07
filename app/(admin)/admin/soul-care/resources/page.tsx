"use client";

import { useEffect, useState } from "react";
import { Plus, Search, MoreVertical, Edit, Trash2, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { SoulCareResource } from "@/lib/mongodb";
import { toast } from "sonner";

export default function ResourcesAdminPage() {
    const [resources, setResources] = useState<SoulCareResource[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    useEffect(() => {
        fetchResources();
    }, []);

    const fetchResources = async () => {
        try {
            const res = await fetch("/api/admin/soul-care/resources");
            const data = await res.json();
            if (res.ok) {
                setResources(data.resources);
            } else {
                toast.error(data.error || "Failed to fetch resources");
            }
        } catch (error) {
            toast.error("An error occurred while fetching resources");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this resource?")) return;

        try {
            const res = await fetch(`/api/admin/soul-care/resources/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                toast.success("Resource deleted successfully");
                setResources(resources.filter((r) => r.resourceId !== id));
            } else {
                const data = await res.json();
                toast.error(data.error || "Failed to delete resource");
            }
        } catch (error) {
            toast.error("An error occurred while deleting the resource");
        }
    };

    const filteredResources = resources.filter((resource) =>
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getCategoryBadge = (category: string) => {
        const variants: Record<string, string> = {
            article: "bg-blue-100 text-blue-800",
            study: "bg-green-100 text-green-800",
            audio: "bg-purple-100 text-purple-800",
            book: "bg-orange-100 text-orange-800",
            worksheet: "bg-red-100 text-red-800",
        };
        return variants[category] || "bg-gray-100 text-gray-800";
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Soul Care Resources</h1>
                    <p className="text-muted-foreground">Manage articles, study guides, and secondary materials.</p>
                </div>
                <Button onClick={() => router.push("/admin/soul-care/resources/new")} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" /> Add Resource
                </Button>
            </div>

            <div className="flex items-center gap-2 max-w-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search resources..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="border rounded-lg bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Resource</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Author</TableHead>
                            <TableHead>Featured</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-10">
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                                        Loading resources...
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : filteredResources.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                                    No resources found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredResources.map((resource) => (
                                <TableRow key={resource.resourceId}>
                                    <TableCell>
                                        <div className="font-medium">{resource.title}</div>
                                        <div className="text-xs text-muted-foreground line-clamp-1">{resource.description}</div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={getCategoryBadge(resource.category)}>
                                            {resource.category.toUpperCase()}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-sm">{resource.author}</TableCell>
                                    <TableCell>
                                        {resource.featured ? (
                                            <Badge variant="default" className="bg-yellow-500 hover:bg-yellow-600">Featured</Badge>
                                        ) : (
                                            <span className="text-xs text-muted-foreground">No</span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={resource.status === "active" ? "default" : "secondary"}>
                                            {resource.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => router.push(`/admin/soul-care/resources/${resource.resourceId}/edit`)}>
                                                    <Edit className="mr-2 h-4 w-4" /> Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(resource.resourceId)}>
                                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
