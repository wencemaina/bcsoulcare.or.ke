"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

export function AppVersion() {
	const [version, setVersion] = useState<string | null>(null);

	useEffect(() => {
		fetch("/api/admin/stats")
			.then((res) => res.json())
			.then((data) => setVersion(data.version))
			.catch((err) => console.error("Failed to fetch version", err));
	}, []);

	if (!version) return null;

	return (
		<Badge variant="outline" className="text-xs text-muted-foreground">
			v{version}
		</Badge>
	);
}
