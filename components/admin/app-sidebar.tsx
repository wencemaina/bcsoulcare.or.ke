"use client";

import * as React from "react";
import {
	TbBook,
	TbCalendarEvent,
	TbDashboard,
	TbFiles,
	TbHeart,
	TbHelp,
	TbIdBadge2,
	TbNews,
	TbSchool,
	TbTools,
	TbUsers,
} from "react-icons/tb";

import { NavUser } from "@/components/admin/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarGroupContent,
} from "@/components/ui/sidebar";

const data = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
	navGroups: [
		{
			label: "Dashboard",
			items: [
				{
					title: "Overview",
					url: "/admin",
					icon: TbDashboard,
				},
			],
		},
		{
			label: "Memberships",
			items: [
				{
					title: "Membership Tiers",
					url: "/admin/memberships/tiers",
					icon: TbIdBadge2,
				},
				{
					title: "Create Tier",
					url: "/admin/memberships/new",
					icon: TbIdBadge2,
				},
				{
					title: "Active Subscriptions",
					url: "/admin/memberships/active",
					icon: TbIdBadge2,
				},
				{
					title: "History",
					url: "/admin/memberships/history",
					icon: TbIdBadge2,
				},
				{
					title: "Pricing Plans",
					url: "/admin/memberships/pricing",
					icon: TbIdBadge2,
				},
			],
		},

		{
			label: "Courses",
			items: [
				{
					title: "All Courses",
					url: "/admin/courses",
					icon: TbSchool,
				},
				{
					title: "Create Course",
					url: "/admin/courses/new",
					icon: TbSchool,
				},
				{
					title: "Categories",
					url: "/admin/courses/categories",
					icon: TbSchool,
				},
				{
					title: "Bundles",
					url: "/admin/courses/bundles",
					icon: TbSchool,
				},
				{
					title: "Drafts",
					url: "/admin/courses/drafts",
					icon: TbSchool,
				},
			],
		},
		{
			label: "Lessons",
			items: [
				{
					title: "All Lessons",
					url: "/admin/lessons",
					icon: TbBook,
				},
				{
					title: "Create Lesson",
					url: "/admin/lessons/new",
					icon: TbBook,
				},
				{
					title: "Library",
					url: "/admin/lessons/library",
					icon: TbBook,
				},
				{
					title: "Templates",
					url: "/admin/lessons/templates",
					icon: TbBook,
				},
			],
		},
		{
			label: "Course Builder",
			items: [
				{
					title: "Link Lessons",
					url: "/admin/builder/link",
					icon: TbTools,
				},
				{
					title: "Structure Manager",
					url: "/admin/builder/structure",
					icon: TbTools,
				},
				{
					title: "Enrollments",
					url: "/admin/builder/enrollments",
					icon: TbTools,
				},
			],
		},
		{
			label: "Resources",
			items: [
				{
					title: "All Resources",
					url: "/admin/resources",
					icon: TbFiles,
				},
				{
					title: "Add Resource",
					url: "/admin/resources/new",
					icon: TbFiles,
				},
				{
					title: "Categories",
					url: "/admin/resources/categories",
					icon: TbFiles,
				},
				{
					title: "Access Control",
					url: "/admin/resources/access",
					icon: TbFiles,
				},
			],
		},
		{
			label: "Soul Care",
			items: [
				{
					title: "Services",
					url: "/admin/soul-care/services",
					icon: TbHeart,
				},
				{
					title: "Care Team",
					url: "/admin/soul-care/team",
					icon: TbUsers,
				},
			],
		},
		{
			label: "Events",
			items: [
				{
					title: "All Events",
					url: "/admin/events",
					icon: TbCalendarEvent,
				},
				{
					title: "Create Event",
					url: "/admin/events/new",
					icon: TbCalendarEvent,
				},
				{
					title: "Categories",
					url: "/admin/events/categories",
					icon: TbCalendarEvent,
				},
				{
					title: "Registrations",
					url: "/admin/events/registrations",
					icon: TbCalendarEvent,
				},
				{
					title: "Past Events",
					url: "/admin/events/past",
					icon: TbCalendarEvent,
				},
			],
		},
		{
			label: "Blog",
			items: [
				{
					title: "All Posts",
					url: "/admin/blog",
					icon: TbNews,
				},
				{
					title: "Create Post",
					url: "/admin/blog/new",
					icon: TbNews,
				},
				{
					title: "Categories & Tags",
					url: "/admin/blog/categories",
					icon: TbNews,
				},
				{
					title: "Comments",
					url: "/admin/blog/comments",
					icon: TbNews,
				},
			],
		},
		{
			label: "Support",
			items: [
				{
					title: "Help Center",
					url: "/admin/support",
					icon: TbHelp,
				},
				{
					title: "Documentation",
					url: "/admin/support/docs",
					icon: TbHelp,
				},
				{
					title: "Tickets",
					url: "/admin/support/tickets",
					icon: TbHelp,
				},
				{
					title: "Logs",
					url: "/admin/support/logs",
					icon: TbHelp,
				},
			],
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="offcanvas" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							className="data-[slot=sidebar-menu-button]:!p-1.5"
						>
							<a href="#">
								<span className="text-base font-semibold">
									CCMWA
								</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				{data.navGroups.map((group) => (
					<SidebarGroup key={group.label}>
						<SidebarGroupLabel>{group.label}</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{group.items.map((item) => (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton
											asChild
											tooltip={item.title}
										>
											<a href={item.url}>
												<item.icon />
												<span>{item.title}</span>
											</a>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
		</Sidebar>
	);
}
