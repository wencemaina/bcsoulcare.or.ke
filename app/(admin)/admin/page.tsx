"use client";

import { useEffect, useState } from "react";
import { SectionCards } from "@/components/admin/section-cards";
import { UserTable } from "@/components/admin/user-table";
import { AppVersion } from "@/components/admin/app-version";

export default function Page() {
	const [stats, setStats] = useState(null);

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

	return (
		<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
			<div className="px-4 lg:px-6 flex justify-end">
				<AppVersion />
			</div>
			<SectionCards stats={stats} />
			<UserTable users={stats?.recentUsers || null} />
		</div>
	);
}
