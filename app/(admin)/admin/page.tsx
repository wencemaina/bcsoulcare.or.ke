"use client";

import { useEffect, useState } from "react";
import { SectionCards } from "@/components/admin/section-cards";
import { UserTable } from "@/components/admin/user-table";
import { AppVersion } from "@/components/admin/app-version";

export default function Page() {
	const [stats, setStats] = useState(null);
	const [usersData, setUsersData] = useState({ users: [], totalPages: 1 });
	const [currentPage, setCurrentPage] = useState(1);
	const [isUsersLoading, setIsUsersLoading] = useState(false);

	useEffect(() => {
		const fetchStats = async () => {
			try {
				const res = await fetch("/api/admin/stats");
				if (res.ok) {
					const data = await res.json();
					setStats(data);
				}
			} catch (error) {
				console.error("Failed to fetch statistics:", error);
			}
		};

		fetchStats();
	}, []);

	useEffect(() => {
		const fetchUsers = async () => {
			setIsUsersLoading(true);
			try {
				const res = await fetch(`/api/admin/users?page=${currentPage}&limit=10`);
				if (res.ok) {
					const data = await res.json();
					setUsersData({
						users: data.users,
						totalPages: data.totalPages
					});
				}
			} catch (error) {
				console.error("Failed to fetch users:", error);
			} finally {
				setIsUsersLoading(false);
			}
		};

		fetchUsers();
	}, [currentPage]);

	return (
		<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
			<div className="px-4 lg:px-6 flex justify-end">
				<AppVersion />
			</div>
			<SectionCards stats={stats} />
			<UserTable
				users={usersData.users}
				currentPage={currentPage}
				totalPages={usersData.totalPages}
				onPageChange={setCurrentPage}
				isLoading={isUsersLoading}
			/>
		</div>
	);
}
