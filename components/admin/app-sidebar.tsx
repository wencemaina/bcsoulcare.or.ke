"use client";

import * as React from "react";
import {
	TbBook,
	TbCalendarEvent,
	TbChartBar,
	TbCreditCard,
	TbDashboard,
	TbFiles,
	TbHelp,
	TbIdBadge2,
	TbNews,
	TbSchool,
	TbSettings,
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
			label: "Users",
			items: [
				{
					title: "All Users",
					url: "/admin/users",
					icon: TbUsers,
				},
				{
					title: "Add New User",
					url: "/admin/users/new",
					icon: TbUsers,
				},
				{
					title: "Roles & Permissions",
					url: "/admin/users/roles",
					icon: TbUsers,
				},
				{
					title: "Banned Users",
					url: "/admin/users/banned",
					icon: TbUsers,
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
			label: "Payments",
			items: [
				{
					title: "Transactions",
					url: "/admin/payments/transactions",
					icon: TbCreditCard,
				},
				{
					title: "Revenue Reports",
					url: "/admin/payments/reports",
					icon: TbCreditCard,
				},
				{
					title: "Refunds",
					url: "/admin/payments/refunds",
					icon: TbCreditCard,
				},
				{
					title: "Settings",
					url: "/admin/payments/settings",
					icon: TbCreditCard,
				},
			],
		},
		{
			label: "Analytics",
			items: [
				{
					title: "Overview",
					url: "/admin/analytics",
					icon: TbChartBar,
				},
				{
					title: "User Growth",
					url: "/admin/analytics/users",
					icon: TbChartBar,
				},
				{
					title: "Course Performance",
					url: "/admin/analytics/courses",
					icon: TbChartBar,
				},
				{
					title: "Revenue",
					url: "/admin/analytics/revenue",
					icon: TbChartBar,
				},
				{
					title: "Engagement",
					url: "/admin/analytics/engagement",
					icon: TbChartBar,
				},
				{
					title: "Export",
					url: "/admin/analytics/export",
					icon: TbChartBar,
				},
			],
		},
		{
			label: "Settings",
			items: [
				{
					title: "Site Settings",
					url: "/admin/settings",
					icon: TbSettings,
				},
				{
					title: "Email Templates",
					url: "/admin/settings/email",
					icon: TbSettings,
				},
				{
					title: "Payment Gateways",
					url: "/admin/settings/payments",
					icon: TbSettings,
				},
				{
					title: "Notifications",
					url: "/admin/settings/notifications",
					icon: TbSettings,
				},
				{
					title: "API Keys",
					url: "/admin/settings/api",
					icon: TbSettings,
				},
				{
					title: "Integrations",
					url: "/admin/settings/integrations",
					icon: TbSettings,
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
