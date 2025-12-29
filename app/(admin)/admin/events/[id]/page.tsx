"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { TbLoader2 } from "react-icons/tb";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ImageUpload } from "@/components/admin/image-upload";

const eventSchema = z.object({
	title: z.string().min(2, "Title must be at least 2 characters"),
	slug: z.string().min(2, "Slug must be at least 2 characters"),
	category: z.enum(["workshop", "retreat", "fellowship", "service", "study"]),
	date: z.string().min(1, "Date is required"),
	startTime: z.string().min(1, "Start time is required"),
	endTime: z.string().min(1, "End time is required"),
	location: z.string().min(1, "Location is required"),
	description: z
		.string()
		.min(10, "Description must be at least 10 characters"),
	image: z.string().min(1, "Image is required"),
	maxSpots: z.preprocess(
		(val) => (val === "" ? 0 : Number(val)),
		z.number().min(0, "Max spots must be 0 or greater"),
	),
	price: z.preprocess(
		(val) => (val === "" ? 0 : Number(val)),
		z.number().min(0, "Price must be 0 or greater"),
	),
	isFeatured: z.boolean().default(false),
	status: z.enum(["draft", "published", "archived"]),
});

type EventFormValues = z.infer<typeof eventSchema>;

export default function EditEventPage() {
	const router = useRouter();
	const params = useParams();
	const eventId = params.id as string;
	const [isLoading, setIsLoading] = useState(false);
	const [isFetching, setIsFetching] = useState(true);

	const form = useForm<EventFormValues>({
		resolver: zodResolver(eventSchema),
		defaultValues: {
			title: "",
			slug: "",
			category: "fellowship",
			date: "",
			startTime: "",
			endTime: "",
			location: "",
			description: "",
			image: "",
			maxSpots: 0,
			price: 0,
			isFeatured: false,
			status: "draft",
		},
	});

	useEffect(() => {
		if (eventId) {
			fetchEvent();
		}
	}, [eventId]);

	async function fetchEvent() {
		try {
			const response = await fetch(`/api/admin/events/${eventId}`);
			if (!response.ok) {
				throw new Error("Failed to fetch event");
			}
			const data = await response.json();
			const event = data.event;

			// Format date for input
			const eventDate = new Date(event.date);
			const formattedDate = eventDate.toISOString().split("T")[0];

			form.reset({
				title: event.title,
				slug: event.slug,
				category: event.category,
				date: formattedDate,
				startTime: event.startTime,
				endTime: event.endTime,
				location: event.location,
				description: event.description,
				image: event.image,
				maxSpots: event.maxSpots,
				price: event.price,
				isFeatured: event.isFeatured,
				status: event.status,
			});
		} catch (error) {
			console.error(error);
			toast.error("Failed to load event");
			router.push("/admin/events");
		} finally {
			setIsFetching(false);
		}
	}

	async function onSubmit(data: EventFormValues) {
		setIsLoading(true);
		try {
			const response = await fetch(`/api/admin/events/${eventId}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || "Failed to update event");
			}

			toast.success("Event updated successfully");
			router.push("/admin/events");
			router.refresh();
		} catch (error) {
			console.error(error);
			toast.error(
				error instanceof Error ? error.message : "Something went wrong",
			);
		} finally {
			setIsLoading(false);
		}
	}

	if (isFetching) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<TbLoader2 className="h-12 w-12 animate-spin text-primary" />
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-6 p-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">
					Edit Event
				</h1>
				<p className="text-muted-foreground">
					Update event information and settings.
				</p>
			</div>
			<Separator />

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8"
				>
					{/* Basic Information */}
					<Card>
						<CardHeader>
							<CardTitle>Basic Information</CardTitle>
						</CardHeader>
						<CardContent className="grid gap-6 md:grid-cols-2">
							<FormField
								control={form.control}
								name="title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Title</FormLabel>
										<FormControl>
											<Input
												placeholder="Event Title"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="slug"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Slug</FormLabel>
										<FormControl>
											<Input
												placeholder="event-url-slug"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="category"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Category</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select category" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="workshop">
													Workshop
												</SelectItem>
												<SelectItem value="retreat">
													Retreat
												</SelectItem>
												<SelectItem value="fellowship">
													Fellowship
												</SelectItem>
												<SelectItem value="service">
													Service Project
												</SelectItem>
												<SelectItem value="study">
													Bible Study
												</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="location"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Location</FormLabel>
										<FormControl>
											<Input
												placeholder="Event venue"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem className="md:col-span-2">
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Event description"
												className="min-h-[100px]"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</CardContent>
					</Card>

					{/* Date & Time */}
					<Card>
						<CardHeader>
							<CardTitle>Date & Time</CardTitle>
						</CardHeader>
						<CardContent className="grid gap-6 md:grid-cols-3">
							<FormField
								control={form.control}
								name="date"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Date</FormLabel>
										<FormControl>
											<Input type="date" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="startTime"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Start Time</FormLabel>
										<FormControl>
											<Input
												placeholder="9:00 AM"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="endTime"
								render={({ field }) => (
									<FormItem>
										<FormLabel>End Time</FormLabel>
										<FormControl>
											<Input
												placeholder="5:00 PM"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</CardContent>
					</Card>

					{/* Image */}
					<Card>
						<CardHeader>
							<CardTitle>Event Image</CardTitle>
						</CardHeader>
						<CardContent>
							<FormField
								control={form.control}
								name="image"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Image</FormLabel>
										<FormControl>
											<ImageUpload
												value={field.value}
												onChange={field.onChange}
												label="Upload Event Image"
											/>
										</FormControl>
										<FormDescription>
											Recommended size: 800x600px
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</CardContent>
					</Card>

					{/* Registration & Pricing */}
					<Card>
						<CardHeader>
							<CardTitle>Registration & Pricing</CardTitle>
						</CardHeader>
						<CardContent className="grid gap-6 md:grid-cols-2">
							<FormField
								control={form.control}
								name="maxSpots"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Max Spots</FormLabel>
										<FormControl>
											<Input
												type="number"
												placeholder="50"
												{...field}
											/>
										</FormControl>
										<FormDescription>
											Maximum number of attendees
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="price"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Price (KES)</FormLabel>
										<FormControl>
											<Input
												type="number"
												step="0.01"
												placeholder="0"
												{...field}
											/>
										</FormControl>
										<FormDescription>
											Set to 0 for free events
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</CardContent>
					</Card>

					{/* Settings */}
					<Card>
						<CardHeader>
							<CardTitle>Settings</CardTitle>
						</CardHeader>
						<CardContent className="grid gap-6 md:grid-cols-2">
							<FormField
								control={form.control}
								name="status"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Status</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select status" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="draft">
													Draft
												</SelectItem>
												<SelectItem value="published">
													Published
												</SelectItem>
												<SelectItem value="archived">
													Archived
												</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="isFeatured"
								render={({ field }) => (
									<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
										<FormControl>
											<Checkbox
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
										<div className="space-y-1 leading-none">
											<FormLabel>
												Featured Event
											</FormLabel>
											<FormDescription>
												Show this event in the featured
												section
											</FormDescription>
										</div>
									</FormItem>
								)}
							/>
						</CardContent>
					</Card>

					<div className="flex justify-end gap-4">
						<Button
							type="button"
							variant="outline"
							onClick={() => router.back()}
							disabled={isLoading}
						>
							Cancel
						</Button>
						<Button type="submit" disabled={isLoading}>
							{isLoading && (
								<TbLoader2 className="mr-2 h-4 w-4 animate-spin" />
							)}
							Update Event
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
