"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TbPlus, TbLoader2, TbEdit, TbTrash, TbCalendar } from "react-icons/tb";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

interface Event {
	_id: string;
	eventId: string;
	title: string;
	slug: string;
	category: string;
	date: string;
	location: string;
	status: string;
	maxSpots: number;
	registeredCount: number;
	price: number;
	isFeatured: boolean;
}

export default function EventsPage() {
	const router = useRouter();
	const [events, setEvents] = useState<Event[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetchEvents();
	}, []);

	async function fetchEvents() {
		try {
			const response = await fetch("/api/admin/events");
			if (!response.ok) {
				throw new Error("Failed to fetch events");
			}
			const data = await response.json();
			setEvents(data.events || []);
		} catch (error) {
			console.error(error);
			toast.error("Failed to load events");
		} finally {
			setIsLoading(false);
		}
	}

	async function handleDelete(eventId: string) {
		if (!confirm("Are you sure you want to delete this event?")) {
			return;
		}

		try {
			const response = await fetch(`/api/admin/events/${eventId}`, {
				method: "DELETE",
			});

			if (!response.ok) {
				throw new Error("Failed to delete event");
			}

			toast.success("Event deleted successfully");
			fetchEvents(); // Refresh list
		} catch (error) {
			console.error(error);
			toast.error("Failed to delete event");
		}
	}

	const getStatusBadge = (status: string) => {
		const variants: Record<string, "default" | "secondary" | "outline"> = {
			published: "default",
			draft: "secondary",
			archived: "outline",
		};
		return (
			<Badge variant={variants[status] || "default"}>
				{status.charAt(0).toUpperCase() + status.slice(1)}
			</Badge>
		);
	};

	const getCategoryBadge = (category: string) => {
		const colors: Record<string, string> = {
			workshop:
				"bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
			retreat:
				"bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
			fellowship:
				"bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
			service:
				"bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
			study: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
		};
		return (
			<Badge className={colors[category] || "bg-gray-100 text-gray-800"}>
				{category.charAt(0).toUpperCase() + category.slice(1)}
			</Badge>
		);
	};

	return (
		<div className="flex flex-col gap-6 p-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						All Events
					</h1>
					<p className="text-muted-foreground">
						Manage your events calendar
					</p>
				</div>
				<Button onClick={() => router.push("/admin/events/new")}>
					<TbPlus className="mr-2 h-4 w-4" />
					Create Event
				</Button>
			</div>
			<Separator />

			<Card>
				<CardHeader>
					<CardTitle>Events ({events.length})</CardTitle>
				</CardHeader>
				<CardContent>
					{isLoading ? (
						<div className="flex items-center justify-center py-8">
							<TbLoader2 className="h-8 w-8 animate-spin text-muted-foreground" />
						</div>
					) : events.length === 0 ? (
						<div className="text-center py-8">
							<p className="text-muted-foreground">
								No events found. Create your first event to get
								started.
							</p>
						</div>
					) : (
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Title</TableHead>
									<TableHead>Category</TableHead>
									<TableHead>Date</TableHead>
									<TableHead>Location</TableHead>
									<TableHead>Registrations</TableHead>
									<TableHead>Price</TableHead>
									<TableHead>Status</TableHead>
									<TableHead className="text-right">
										Actions
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{events.map((event) => (
									<TableRow key={event.eventId}>
										<TableCell className="font-medium">
											<div className="flex items-center gap-2">
												{event.title}
												{event.isFeatured && (
													<Badge
														variant="outline"
														className="text-xs"
													>
														Featured
													</Badge>
												)}
											</div>
										</TableCell>
										<TableCell>
											{getCategoryBadge(event.category)}
										</TableCell>
										<TableCell>
											<div className="flex items-center gap-2">
												<TbCalendar className="h-4 w-4 text-muted-foreground" />
												{new Date(
													event.date,
												).toLocaleDateString()}
											</div>
										</TableCell>
										<TableCell className="max-w-[200px] truncate">
											{event.location}
										</TableCell>
										<TableCell>
											{event.registeredCount}/
											{event.maxSpots}
										</TableCell>
										<TableCell>
											{event.price === 0
												? "Free"
												: `KES ${event.price}`}
										</TableCell>
										<TableCell>
											{getStatusBadge(event.status)}
										</TableCell>
										<TableCell className="text-right">
											<div className="flex items-center justify-end gap-2">
												<Button
													variant="ghost"
													size="icon"
													onClick={() =>
														router.push(
															`/admin/events/${event.eventId}`,
														)
													}
												>
													<TbEdit className="h-4 w-4" />
												</Button>
												<Button
													variant="ghost"
													size="icon"
													onClick={() =>
														handleDelete(
															event.eventId,
														)
													}
												>
													<TbTrash className="h-4 w-4 text-destructive" />
												</Button>
											</div>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
