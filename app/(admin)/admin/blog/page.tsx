"use client";

import * as React from "react";
import Link from "next/link";
import {
	MoreHorizontal,
	ArrowUpDown,
	Download,
	Eye,
	Edit,
	Trash,
	CheckSquare,
	Search,
	Plus,
	Calendar,
	Clock,
	User,
	MessageSquare,
	EyeIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BlogPost } from "@/types/database";

export default function BlogPage() {
	const [blogs, setBlogs] = React.useState<BlogPost[]>([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const [error, setError] = React.useState<string | null>(null);
	const [searchQuery, setSearchQuery] = React.useState("");
	const [statusFilter, setStatusFilter] = React.useState("all");
	const [categoryFilter, setCategoryFilter] = React.useState("all");
	const [sorting, setSorting] = React.useState("");
	const [columnFilters, setColumnFilters] = React.useState("");
	const [rowSelection, setRowSelection] = React.useState({});
	const [pagination, setPagination] = React.useState({
		page: 1,
		limit: 10,
		totalPages: 1,
		total: 0,
	});

	const fetchBlogs = async (
		page = 1,
		limit = 10,
		search = "",
		status = "all",
		category = "all",
	) => {
		setIsLoading(true);
		try {
			const params = new URLSearchParams({
				page: page.toString(),
				limit: limit.toString(),
				...(search && { search }),
				...(status !== "all" && { status }),
				...(category !== "all" && { category }),
			});
			const response = await fetch(`/api/admin/blog?${params}`);
			const data = await response.json();
			if (!response.ok)
				throw new Error(data.error || "Failed to fetch blogs");
			setBlogs(data.blogPosts || []);
			setPagination(
				data.pagination || {
					page: 1,
					limit: 10,
					totalPages: 1,
					total: 0,
				},
			);
		} catch (err: any) {
			console.error("Error fetching blogs:", err);
			setError(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	React.useEffect(() => {
		fetchBlogs(
			1,
			pagination.limit,
			searchQuery,
			statusFilter,
			categoryFilter,
		);
	}, [searchQuery, statusFilter, categoryFilter]);

	const handlePageChange = (newPage: number) => {
		if (newPage >= 1 && newPage <= pagination.totalPages) {
			fetchBlogs(
				newPage,
				pagination.limit,
				searchQuery,
				statusFilter,
				categoryFilter,
			);
		}
	};

	const handleDelete = async (blogId: string) => {
		if (!confirm("Are you sure you want to delete this post?")) return;

		try {
			// Using blogId (custom string ID) or _id depending on what the API expects.
			// The API route handles both ObjectId and custom blogId, but we need to pass one.
			// Based on table rendering, we use `post.blogId`.
			const response = await fetch(`/api/admin/blog/${blogId}`, {
				method: "DELETE",
			});

			if (!response.ok) {
				const data = await response.json();
				throw new Error(data.error || "Failed to delete post");
			}

			// Refresh the list
			fetchBlogs(
				pagination.page,
				pagination.limit,
				searchQuery,
				statusFilter,
				categoryFilter,
			);
		} catch (err: any) {
			console.error("Error deleting post:", err);
			alert(err.message);
		}
	};

	return (
		<div className="w-full space-y-6">
			<div className="flex flex-col sm:flex-row items-center justify-between gap-4">
				<h1 className="text-3xl font-bold tracking-tight">
					Blog & News
				</h1>
				<div className="flex items-center gap-2 w-full sm:w-auto">
					<Button variant="outline">
						<Download className="mr-2 h-4 w-4" />
						Export
					</Button>
					<Button asChild>
						<Link href="/admin/blog/new">
							<Plus className="mr-2 h-4 w-4" />
							Create Post
						</Link>
					</Button>
				</div>
			</div>

			<div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-card p-4 rounded-lg border shadow-sm">
				<div className="flex items-center gap-2 w-full sm:w-auto">
					<div className="relative w-full sm:w-64">
						<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Search posts..."
							className="pl-8"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>
				</div>
				<div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
					<Select
						value={statusFilter}
						onValueChange={setStatusFilter}
					>
						<SelectTrigger className="w-[140px]">
							<SelectValue placeholder="Status" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Status</SelectItem>
							<SelectItem value="published">Published</SelectItem>
							<SelectItem value="draft">Draft</SelectItem>
							<SelectItem value="archived">Archived</SelectItem>
						</SelectContent>
					</Select>
					<Select
						value={categoryFilter}
						onValueChange={setCategoryFilter}
					>
						<SelectTrigger className="w-[140px]">
							<SelectValue placeholder="Category" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Categories</SelectItem>
							<SelectItem value="agriculture">
								Agriculture
							</SelectItem>
							<SelectItem value="funding">Funding</SelectItem>
							<SelectItem value="export">Export</SelectItem>
							<SelectItem value="women">
								Women Empowerment
							</SelectItem>
							<SelectItem value="climate">Climate</SelectItem>
						</SelectContent>
					</Select>
					<Button
						variant="secondary"
						onClick={() =>
							fetchBlogs(
								1,
								pagination.limit,
								searchQuery,
								statusFilter,
								categoryFilter,
							)
						}
					>
						Apply Filters
					</Button>
				</div>
			</div>

			<div className="rounded-md border bg-card">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[50px]">
								<CheckSquare className="h-4 w-4 text-muted-foreground" />
							</TableHead>
							<TableHead>Title</TableHead>
							<TableHead className="hidden md:table-cell">
								Category
							</TableHead>
							<TableHead className="hidden xl:table-cell">
								Views
							</TableHead>
							<TableHead className="hidden xl:table-cell">
								Comments
							</TableHead>
							<TableHead>Status</TableHead>
							<TableHead className="text-right">
								Actions
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{blogs.map((post) => (
							<TableRow key={post.blogId}>
								<TableCell>
									<input
										type="checkbox"
										className="rounded border-gray-300 text-primary focus:ring-primary"
									/>
								</TableCell>
								<TableCell className="font-medium">
									<div className="flex flex-col">
										<span className="font-semibold">
											{post.title}
										</span>
									</div>
								</TableCell>
								<TableCell className="hidden md:table-cell">
									<Badge variant="outline">
										{post.category}
									</Badge>
								</TableCell>
								<TableCell className="hidden xl:table-cell">
									<div className="flex items-center">
										<EyeIcon className="mr-2 h-4 w-4 text-muted-foreground" />
										<span>0</span>
									</div>
								</TableCell>
								<TableCell className="hidden xl:table-cell">
									<div className="flex items-center">
										<MessageSquare className="mr-2 h-4 w-4 text-muted-foreground" />
										<span>0</span>
									</div>
								</TableCell>
								<TableCell>
									<Badge
										variant={
											post.status === "published"
												? "default"
												: post.status === "draft"
													? "secondary"
													: post.status === "archived"
														? "destructive"
														: "outline"
										}
										className={
											post.status === "published"
												? "bg-green-600 hover:bg-green-700"
												: post.status === "draft"
													? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-100 border-none"
													: post.status === "archived"
														? "bg-destructive/20 text-destructive"
														: ""
										}
									>
										{post.status.charAt(0).toUpperCase() +
											post.status.slice(1)}
									</Badge>
								</TableCell>
								<TableCell className="text-right">
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button
												variant="ghost"
												className="h-8 w-8 p-0"
											>
												<span className="sr-only">
													Open menu
												</span>
												<MoreHorizontal className="h-4 w-4" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuLabel>
												Actions
											</DropdownMenuLabel>
											<DropdownMenuItem asChild>
												<Link
													href={`/blog/${post.slug}`}
													className="cursor-pointer flex items-center"
												>
													<Eye className="mr-2 h-4 w-4" />{" "}
													View Post
												</Link>
											</DropdownMenuItem>
											<DropdownMenuItem className="cursor-pointer flex items-center">
												<Edit className="mr-2 h-4 w-4" />{" "}
												Edit
											</DropdownMenuItem>
											<DropdownMenuSeparator />
											<DropdownMenuItem
												className="text-destructive cursor-pointer flex items-center"
												onClick={() =>
													handleDelete(
														post.blogId ||
														post._id?.toString() ||
														"",
													)
												}
											>
												<Trash className="mr-2 h-4 w-4" />{" "}
												Delete
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-between py-4">
				<div className="text-sm text-muted-foreground">
					Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
					{Math.min(
						pagination.page * pagination.limit,
						pagination.total,
					)}{" "}
					of {pagination.total} entries
				</div>
				<div className="flex items-center space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => handlePageChange(pagination.page - 1)}
						disabled={pagination.page <= 1}
					>
						Previous
					</Button>
					<div className="flex items-center space-x-1">
						{Array.from(
							{ length: Math.min(5, pagination.totalPages) },
							(_, i) => {
								let pageNum;
								if (pagination.totalPages <= 5) {
									pageNum = i + 1;
								} else if (pagination.page <= 3) {
									pageNum = i + 1;
								} else if (
									pagination.page >=
									pagination.totalPages - 2
								) {
									pageNum = pagination.totalPages - 4 + i;
								} else {
									pageNum = pagination.page - 2 + i;
								}
								return (
									<Button
										key={pageNum}
										variant={
											pagination.page === pageNum
												? "default"
												: "outline"
										}
										size="sm"
										onClick={() =>
											handlePageChange(pageNum)
										}
									>
										{pageNum}
									</Button>
								);
							},
						)}
					</div>
					<Button
						variant="outline"
						size="sm"
						onClick={() => handlePageChange(pagination.page + 1)}
						disabled={pagination.page >= pagination.totalPages}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
}
