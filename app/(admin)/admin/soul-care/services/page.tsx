"use client";

import { useEffect, useState } from "react";
import { Plus, Search, MoreVertical, Edit, Trash2, Heart } from "lucide-react";
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
import { SoulCareService } from "@/lib/mongodb";
import { toast } from "sonner";

export default function ServicesAdminPage() {
    const [services, setServices] = useState<SoulCareService[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const res = await fetch("/api/admin/soul-care/services");
            const data = await res.json();
            if (res.ok) {
                setServices(data.services);
            } else {
                toast.error(data.error || "Failed to fetch services");
            }
        } catch (error) {
            toast.error("An error occurred while fetching services");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this service?")) return;

        try {
            const res = await fetch(`/api/admin/soul-care/services/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                toast.success("Service deleted successfully");
                setServices(services.filter((s) => s.serviceId !== id));
            } else {
                const data = await res.json();
                toast.error(data.error || "Failed to delete service");
            }
        } catch (error) {
            toast.error("An error occurred while deleting the service");
        }
    };

    const filteredServices = services.filter((service) =>
        service.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Soul Care Services</h1>
                    <p className="text-muted-foreground">Manage the services offered in Soul Care.</p>
                </div>
                <Button onClick={() => router.push("/admin/soul-care/services/new")} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" /> Add Service
                </Button>
            </div>

            <div className="flex items-center gap-2 max-w-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search services..."
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
                            <TableHead>Service Title</TableHead>
                            <TableHead>Features</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-10">
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                                        Loading services...
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : filteredServices.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                                    No services found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredServices.map((service) => (
                                <TableRow key={service.serviceId}>
                                    <TableCell>
                                        <div className="font-medium">{service.title}</div>
                                        <div className="text-xs text-muted-foreground line-clamp-1">{service.description}</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-1">
                                            {service.features.slice(0, 2).map((f, i) => (
                                                <Badge key={i} variant="secondary" className="text-[10px]">
                                                    {f}
                                                </Badge>
                                            ))}
                                            {service.features.length > 2 && (
                                                <span className="text-[10px] text-muted-foreground">+{service.features.length - 2} more</span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-sm">{service.duration}</TableCell>
                                    <TableCell>
                                        <Badge variant={service.status === "active" ? "default" : "secondary"}>
                                            {service.status}
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
                                                <DropdownMenuItem onClick={() => router.push(`/admin/soul-care/services/${service.serviceId}/edit`)}>
                                                    <Edit className="mr-2 h-4 w-4" /> Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(service.serviceId)}>
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
