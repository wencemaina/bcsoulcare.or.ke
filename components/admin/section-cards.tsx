"use client";

import {
    TbUsers,
    TbSchool,
    TbCalendarEvent,
    TbNews,
    TbIdBadge2
} from "react-icons/tb";

import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";

interface Stats {
    users: number;
    courses: number;
    events: number;
    membershipTiers: number;
    blog: {
        total: number;
        published: number;
        draft: number;
    };
}

export function SectionCards({ stats }: { stats: Stats | null }) {
    if (!stats) {
        return (
            <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {[...Array(5)].map((_, i) => (
                    <Card key={i} className="animate-pulse">
                        <CardHeader className="h-24 bg-muted/50" />
                    </Card>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardDescription className="text-sm font-medium">Total Users</CardDescription>
                    <TbUsers className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <CardTitle className="text-2xl font-bold">{stats.users}</CardTitle>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardDescription className="text-sm font-medium">Total Courses</CardDescription>
                    <TbSchool className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <CardTitle className="text-2xl font-bold">{stats.courses}</CardTitle>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardDescription className="text-sm font-medium">Total Events</CardDescription>
                    <TbCalendarEvent className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <CardTitle className="text-2xl font-bold">{stats.events}</CardTitle>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardDescription className="text-sm font-medium">Blog Posts</CardDescription>
                    <TbNews className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <CardTitle className="text-2xl font-bold">{stats.blog.total}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">
                        {stats.blog.published} Published · {stats.blog.draft} Drafts
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardDescription className="text-sm font-medium">Membership Tiers</CardDescription>
                    <TbIdBadge2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <CardTitle className="text-2xl font-bold">{stats.membershipTiers}</CardTitle>
                </CardContent>
            </Card>
        </div>
    );
}
