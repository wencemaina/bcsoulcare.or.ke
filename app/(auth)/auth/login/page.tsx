"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/lib/auth-context";
import { Loader2, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");
	const { user, login, isLoading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (user) {
			if (user.role === "admin") {
				router.push("/admin");
			} else {
				router.push("/user-account");
			}
		}
	}, [user, router]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		if (!formData.email || !formData.password) {
			setError("Please fill in all required fields");
			return;
		}

		const success = await login(formData.email, formData.password);

		if (!success) {
			setError("Invalid email or password");
		}
	};

	return (
		<>
			<main className="py-16 min-h-[calc(100vh-200px)] flex items-center justify-center">
				<div className="w-full max-w-md px-4 sm:px-6 lg:px-8">
					<Card>
						<CardHeader className="text-center">
							<CardTitle className="text-2xl">
								Welcome Back
							</CardTitle>
							<CardDescription>
								Sign in to your account to access your courses
								and community.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleSubmit} className="space-y-4">
								{error && (
									<Alert variant="destructive">
										<AlertDescription>
											{error}
										</AlertDescription>
									</Alert>
								)}

								<div className="space-y-2">
									<Label htmlFor="email">Email Address</Label>
									<Input
										id="email"
										name="email"
										type="email"
										value={formData.email}
										onChange={handleChange}
										placeholder="your.email@example.com"
										required
									/>
								</div>

								<div className="space-y-2">
									<div className="flex items-center justify-between">
										<Label htmlFor="password">
											Password
										</Label>
										<Link
											href="/forgot-password"
											className="text-sm font-medium text-primary hover:underline"
										>
											Forgot password?
										</Link>
									</div>
									<div className="relative">
										<Input
											id="password"
											name="password"
											type={
												showPassword
													? "text"
													: "password"
											}
											value={formData.password}
											onChange={handleChange}
											placeholder="Enter your password"
											required
										/>
										<Button
											type="button"
											variant="ghost"
											size="sm"
											className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
											onClick={() =>
												setShowPassword(!showPassword)
											}
										>
											{showPassword ? (
												<EyeOff className="h-4 w-4 text-muted-foreground" />
											) : (
												<Eye className="h-4 w-4 text-muted-foreground" />
											)}
										</Button>
									</div>
								</div>

								<Button
									type="submit"
									className="w-full"
									disabled={isLoading}
								>
									{isLoading ? (
										<>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											Signing In...
										</>
									) : (
										"Sign In"
									)}
								</Button>
							</form>

							<div className="mt-6 text-center text-sm">
								<span className="text-muted-foreground">
									Don't have an account?{" "}
								</span>
								<Link
									href="/auth/register"
									className="text-primary hover:underline font-medium"
								>
									Join now
								</Link>
							</div>
						</CardContent>
					</Card>
				</div>
			</main>
		</>
	);
}
