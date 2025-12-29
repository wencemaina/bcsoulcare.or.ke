"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetHeader,
	SheetTitle,
	SheetDescription,
} from "@/components/ui/sheet";
import { Menu, ChevronRight } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

export function Header() {
	const [isScrolled, setIsScrolled] = React.useState(false);
	const pathname = usePathname();
	const [isOpen, setIsOpen] = React.useState(false);

	React.useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 0);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const navigation = [
		{ name: "Home", href: "/" },
		{
			name: "About",
			href: "/about",
			dropdown: [
				{
					name: "Our Mission",
					href: "/about#mission",
					description: "Our purpose and vision for the future.",
				},
				{
					name: "Our Team",
					href: "/about#team",
					description: "Meet the people behind the mission.",
				},
				{
					name: "Doctrinal Basis",
					href: "/about#doctrinal-basis",
					description: "Our core beliefs and values.",
				},
				{
					name: "Annual Report",
					href: "/about#annual-report",
					description: "Review our yearly progress and impact.",
				},
				{
					name: "Governance",
					href: "/about#governance",
					description: "How we are structured and led.",
				},
				{
					name: "Uncover",
					href: "/about#uncover",
					description: "Discover more about our initiatives.",
				},
				{
					name: "Group Membership",
					href: "/about/group-membership",
					description: "Join our community groups.",
				},
				{
					name: "Jobs",
					href: "/about#jobs",
					description: "Work with us to make a difference.",
				},
				{
					name: "Contact Us",
					href: "/contact",
					description: "Get in touch with our team.",
				},
			],
		},
		{ name: "Soul Care", href: "/soul-care" },
		{ name: "Resources", href: "/resources" },
		{ name: "Events", href: "/events" },
		{
			name: "Support Us",
			href: "/support-us",
			dropdown: [
				{
					name: "Appeals",
					href: "/support-us#appeals",
					description: "Current needs and urgent appeals.",
				},
				{
					name: "Give",
					href: "/support-us#give",
					description: "Ways to support our work financially.",
				},
				{
					name: "Blog",
					href: "/support-us#blog",
					description: "Stories and updates from the field.",
				},
				{
					name: "Pray",
					href: "/support-us#pray",
					description: "Join us in prayer for our mission.",
				},
				{
					name: "Publications",
					href: "/support-us#publications",
					description: "Books, guides, and newsletters.",
				},
				{
					name: "Churches",
					href: "/support-us#churches",
					description: "Partnering with local churches.",
				},
				{
					name: "Support Our Staff",
					href: "/support-us#staff",
					description: "Directly support our team members.",
				},
				{
					name: "Support a Relay Worker",
					href: "/support-us#relay-worker",
					description: "Support our internship program.",
				},
			],
		},
	];

	return (
		<header
			className={cn(
				"sticky top-0 z-50 w-full transition-all duration-300 ease-in-out border-b",
				isScrolled
					? "bg-background/95 backdrop-blur-md border-border shadow-sm"
					: "bg-background/50 backdrop-blur-sm border-transparent",
			)}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					{/* Logo */}
					<div className="flex-shrink-0">
						<Link
							href="/"
							className="group flex items-center space-x-2 text-2xl font-bold text-primary transition-all duration-300"
						>
							<span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent hover:to-primary transition-all duration-300">
								CCMWA
							</span>
						</Link>
					</div>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center gap-4">
						<NavigationMenu>
							<NavigationMenuList>
								{navigation.map((item) => {
									const isActive =
										pathname === item.href ||
										(pathname.startsWith(item.href) &&
											item.href !== "/");

									if (item.dropdown) {
										return (
											<NavigationMenuItem key={item.name}>
												<NavigationMenuTrigger
													className={cn(
														"h-9 px-4 bg-transparent hover:bg-muted/50 data-[state=open]:bg-muted/50",
														isActive &&
															"text-primary font-medium",
													)}
												>
													{item.name}
												</NavigationMenuTrigger>
												<NavigationMenuContent>
													<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
														{item.dropdown.map(
															(subItem) => (
																<ListItem
																	key={
																		subItem.name
																	}
																	title={
																		subItem.name
																	}
																	href={
																		subItem.href
																	}
																>
																	{
																		subItem.description
																	}
																</ListItem>
															),
														)}
													</ul>
												</NavigationMenuContent>
											</NavigationMenuItem>
										);
									}

									return (
										<NavigationMenuItem key={item.name}>
											<Link href={item.href} passHref>
												<NavigationMenuLink
													className={cn(
														navigationMenuTriggerStyle(),
														"bg-transparent hover:bg-muted/50",
														isActive &&
															"text-primary font-medium bg-muted/20",
													)}
												>
													{item.name}
												</NavigationMenuLink>
											</Link>
										</NavigationMenuItem>
									);
								})}
							</NavigationMenuList>
						</NavigationMenu>
						<ModeToggle />
					</div>

					{/* Mobile Navigation */}
					<div className="md:hidden flex items-center gap-2">
						<ModeToggle />
						<Sheet open={isOpen} onOpenChange={setIsOpen}>
							<SheetTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className="hover:bg-muted/50"
								>
									<Menu className="h-6 w-6" />
									<span className="sr-only">Toggle menu</span>
								</Button>
							</SheetTrigger>
							<SheetContent
								side="right"
								className="w-[300px] sm:w-[400px] overflow-y-auto"
							>
								<SheetHeader className="text-left border-b pb-4 mb-4">
									<SheetTitle className="text-xl font-bold text-primary">
										CCMWA
									</SheetTitle>
									<SheetDescription>
										Navigation
									</SheetDescription>
								</SheetHeader>
								<nav className="flex flex-col space-y-2">
									{navigation.map((item) => {
										const isActive = pathname === item.href;

										if (item.dropdown) {
											return (
												<div
													key={item.name}
													className="space-y-2"
												>
													<div className="px-2 py-1.5 text-lg font-semibold text-foreground/90">
														{item.name}
													</div>
													<div className="ml-2 pl-2 border-l border-border/50 space-y-1">
														{item.dropdown.map(
															(subItem) => (
																<Link
																	key={
																		subItem.name
																	}
																	href={
																		subItem.href
																	}
																	className="group flex items-center justify-between rounded-md px-2 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors"
																	onClick={() =>
																		setIsOpen(
																			false,
																		)
																	}
																>
																	<span>
																		{
																			subItem.name
																		}
																	</span>
																	<ChevronRight className="h-4 w-4 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
																</Link>
															),
														)}
													</div>
												</div>
											);
										}

										return (
											<Link
												key={item.name}
												href={item.href}
												className={cn(
													"px-2 py-2 text-lg font-medium rounded-md transition-colors",
													isActive
														? "text-primary bg-primary/10"
														: "text-foreground/80 hover:text-primary hover:bg-muted/50",
												)}
												onClick={() => setIsOpen(false)}
											>
												{item.name}
											</Link>
										);
									})}
								</nav>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
		</header>
	);
}

const ListItem = React.forwardRef<
	React.ComponentRef<"a">,
	React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						className,
					)}
					{...props}
				>
					<div className="text-sm font-medium leading-none">
						{title}
					</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = "ListItem";
