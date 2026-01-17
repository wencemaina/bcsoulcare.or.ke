"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { format } from "date-fns";

interface User {
    userId: string;
    email: string;
    firstName?: string;
    lastName?: string;
    name?: string;
    membershipTierName?: string;
    createdAt: string | Date;
}

export function UserTable({ users }: { users: User[] | null }) {
    if (!users) {
        return (
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Recent Users</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-48 bg-muted/50 animate-pulse rounded-md" />
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="mt-6">
            <CardHeader>
                <CardTitle>Recent Users</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Membership</TableHead>
                            <TableHead>Joined Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={5}
                                    className="text-center py-8 text-muted-foreground"
                                >
                                    No users found
                                </TableCell>
                            </TableRow>
                        ) : (
                            users.map((user) => (
                                <TableRow key={user.userId}>
                                    <TableCell className="font-mono text-xs">
                                        {user.userId}
                                    </TableCell>
                                    <TableCell>
                                        {user.name ||
                                            `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
                                            "N/A"}
                                    </TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        {user.membershipTierName || "None"}
                                    </TableCell>
                                    <TableCell>
                                        {user.createdAt
                                            ? format(
                                                new Date(user.createdAt),
                                                "MMM d, yyyy",
                                            )
                                            : "N/A"}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
