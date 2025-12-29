"use client";

import * as React from "react";
import {
	TbCamera,
	TbChartBar,
	TbDashboard,
	TbDatabase,
	TbFileAi,
	TbFileDescription,
	TbFileWord,
	TbFolder,
	TbHelp,
	TbListDetails,
	TbReport,
	TbSearch,
	TbSettings,
	TbUsers,
} from "react-icons/tb";

import { NavDocuments } from "@/components/admin/nav-documents";
import { NavMain } from "@/components/admin/nav-main";
import { NavSecondary } from "@/components/admin/nav-secondary";
import { NavUser } from "@/components/admin/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
	navMain: [
		{
			title: "Dashboard",
			url: "#",
			icon: TbDashboard,
		},
		{
			title: "Lifecycle",
			url: "#",
			icon: TbListDetails,
		},
		{
			title: "Analytics",
			url: "#",
			icon: TbChartBar,
		},
		{
			title: "Projects",
			url: "#",
			icon: TbFolder,
		},
		{
			title: "Team",
			url: "#",
			icon: TbUsers,
		},
	],
	navClouds: [
		{
			title: "Capture",
			icon: TbCamera,
			isActive: true,
			url: "#",
			items: [
				{
					title: "Active Proposals",
					url: "#",
				},
				{
					title: "Archived",
					url: "#",
				},
			],
		},
		{
			title: "Proposal",
			icon: TbFileDescription,
			url: "#",
			items: [
				{
					title: "Active Proposals",
					url: "#",
				},
				{
					title: "Archived",
					url: "#",
				},
			],
		},
		{
			title: "Prompts",
			icon: TbFileAi,
			url: "#",
			items: [
				{
					title: "Active Proposals",
					url: "#",
				},
				{
					title: "Archived",
					url: "#",
				},
			],
		},
	],
	navSecondary: [
		{
			title: "Settings",
			url: "#",
			icon: TbSettings,
		},
		{
			title: "Get Help",
			url: "#",
			icon: TbHelp,
		},
		{
			title: "Search",
			url: "#",
			icon: TbSearch,
		},
	],
	documents: [
		{
			name: "Data Library",
			url: "#",
			icon: TbDatabase,
		},
		{
			name: "Reports",
			url: "#",
			icon: TbReport,
		},
		{
			name: "Word Assistant",
			url: "#",
			icon: TbFileWord,
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
				<NavMain items={data.navMain} />
				<NavDocuments items={data.documents} />
				<NavSecondary items={data.navSecondary} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
		</Sidebar>
	);
}
