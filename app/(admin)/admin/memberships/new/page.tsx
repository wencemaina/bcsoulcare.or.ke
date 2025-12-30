"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { TbPlus, TbTrash, TbLoader2 } from "react-icons/tb";

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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const tierSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	description: z
		.string()
		.min(10, "Description must be at least 10 characters"),
	price: z.preprocess(
		(val) => (val === "" ? undefined : Number(val)),
		z.number().min(0, "Price must be a positive number"),
	),
	billingCycle: z.enum(["monthly", "yearly", "one-time"]),
	features: z.array(
		z.object({ value: z.string().min(1, "Feature cannot be empty") }),
	),
	status: z.enum(["active", "archived"]),
});

type TierFormValues = z.infer<typeof tierSchema>;

export default function CreateMembershipTierPage() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<TierFormValues>({
		resolver: zodResolver(tierSchema),
		defaultValues: {
			name: "",
			description: "",
			price: 0,
			billingCycle: "monthly",
			features: [{ value: "" }], // Start with one empty feature field
			status: "active",
		},
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "features",
	});

	async function onSubmit(data: TierFormValues) {
		setIsLoading(true);
		try {
			// Transform features to simple string array
			const featuresArray = data.features
				.map((f) => f.value.trim())
				.filter((f) => f !== "");

			const payload = {
				...data,
				features: featuresArray,
			};

			const response = await fetch("/api/admin/memberships", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(
					errorData.error || "Failed to create membership tier",
				);
			}

			toast.success("Membership tier created successfully");
			router.push("/admin/memberships/tiers");
			router.refresh();
		} catch (error) {
			console.error(error);
			toast.error(
				error instanceof Error
					? error.message
					: "Failed to create membership tier",
			);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="flex flex-col gap-6 p-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">
					Create Membership Tier
				</h1>
				<p className="text-muted-foreground">
					Add a new membership level.
				</p>
			</div>
			<Separator />

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8"
				>
					<div className="grid gap-6 md:grid-cols-2">
						{/* Basic Details */}
						<Card className="md:col-span-1">
							<CardHeader>
								<CardTitle>Basic Details</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Tier Name</FormLabel>
											<FormControl>
												<Input
													placeholder="e.g. Gold Plan"
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
										<FormItem>
											<FormLabel>Description</FormLabel>
											<FormControl>
												<Textarea
													placeholder="Describe the plan benefits..."
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
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
													<SelectItem value="active">
														Active
													</SelectItem>
													<SelectItem value="archived">
														Archived
													</SelectItem>
												</SelectContent>
											</Select>
											<FormDescription>
												Active tiers are visible to
												users.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
							</CardContent>
						</Card>

						{/* Pricing */}
						<Card className="md:col-span-1">
							<CardHeader>
								<CardTitle>Pricing Strategy</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<FormField
									control={form.control}
									name="price"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Price (KES)</FormLabel>
											<FormControl>
												<Input
													type="number"
													placeholder="0"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="billingCycle"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Billing Cycle</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select cycle" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="monthly">
														Monthly
													</SelectItem>
													<SelectItem value="yearly">
														Yearly
													</SelectItem>
													<SelectItem value="one-time">
														One-time Payment
													</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							</CardContent>
						</Card>

						{/* Features */}
						<Card className="md:col-span-2">
							<CardHeader>
								<CardTitle>Plan Features</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								{fields.map((field, index) => (
									<div
										key={field.id}
										className="flex gap-2 items-center"
									>
										<FormField
											control={form.control}
											name={`features.${index}.value`}
											render={({ field }) => (
												<FormItem className="flex-1">
													<FormControl>
														<Input
															{...field}
															placeholder={`Feature ${
																index + 1
															}`}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<Button
											type="button"
											variant="ghost"
											size="icon"
											onClick={() => remove(index)}
											disabled={
												fields.length === 1 &&
												index === 0
											} // Prevent removing the last field if desired, or allow empty
										>
											<TbTrash className="h-4 w-4 text-destructive" />
										</Button>
									</div>
								))}
								<Button
									type="button"
									variant="outline"
									size="sm"
									className="mt-2"
									onClick={() => append({ value: "" })}
								>
									<TbPlus className="mr-2 h-4 w-4" /> Add
									Feature
								</Button>
							</CardContent>
						</Card>
					</div>

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
							Create Tier
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
