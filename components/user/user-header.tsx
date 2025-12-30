"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, LogOut, Settings, Home } from "lucide-react";

export function UserHeader() {
	const { user, logout } = useAuth();

	const initials = user
		? `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`
		: "U";

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-16 items-center justify-between">
				<div className="flex items-center gap-6">
					<Link
						href="/user-account"
						className="flex items-center space-x-2 font-bold text-xl"
					>
						<span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
							CCMWA Portal
						</span>
					</Link>
					<nav className="hidden md:flex items-center gap-6 text-sm font-medium">
						<Link
							href="/user-account"
							className="transition-colors hover:text-foreground/80 text-foreground/60"
						>
							Dashboard
						</Link>
						<Link
							href="/"
							className="transition-colors hover:text-foreground/80 text-foreground/60"
						>
							Main Site
						</Link>
					</nav>
				</div>

				<div className="flex items-center gap-4">
					<Button
						variant="ghost"
						size="icon"
						asChild
						className="md:hidden"
					>
						<Link href="/">
							<Home className="h-5 w-5" />
						</Link>
					</Button>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								className="relative h-9 w-9 rounded-full"
							>
								<Avatar className="h-9 w-9">
									<AvatarImage
										src=""
										alt={user?.firstName || "User"}
									/>
									<AvatarFallback>{initials}</AvatarFallback>
								</Avatar>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className="w-56"
							align="end"
							forceMount
						>
							<DropdownMenuLabel className="font-normal">
								<div className="flex flex-col space-y-1">
									<p className="text-sm font-medium leading-none">
										{user?.name ||
											`${user?.firstName} ${user?.lastName}`}
									</p>
									<p className="text-xs leading-none text-muted-foreground">
										{user?.email}
									</p>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem asChild>
								<Link href="/user-account">
									<User className="mr-2 h-4 w-4" />
									<span>Profile</span>
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Settings className="mr-2 h-4 w-4" />
								<span>Settings</span>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								onClick={logout}
								className="text-red-600 focus:text-red-600"
							>
								<LogOut className="mr-2 h-4 w-4" />
								<span>Log out</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	);
}
