"use client";

import { createContext, useContext, type ReactNode } from "react";
import { SessionProvider, useSession, signIn, signOut } from "next-auth/react";

interface User {
	userId: string;
	email: string;
	firstName: string;
	lastName: string;
	name?: string;
	role: "admin" | "user";
	createdAt: string | Date;
	membershipTier?: {
		name: string;
		billingCycle: string;
		status: string;
	};
	programs?: string[];
	prayerRequests?: number;
}

interface AuthContextType {
	user: User | null;
	login: (email: string, password: string) => Promise<boolean>;
	register: (userData: RegisterData) => Promise<boolean>;
	logout: () => void;
	isLoading: boolean;
}

interface RegisterData {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	phone?: string;
	membershipTierId?: string;
	membershipTierName?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthInternalProvider({ children }: { children: ReactNode }) {
	const { data: session, status } = useSession();
	const isLoading = status === "loading";
	const user = session?.user ? (session.user as unknown as User) : null;

	const login = async (email: string, password: string): Promise<boolean> => {
		const result = await signIn("credentials", {
			email,
			password,
			redirect: false,
		});

		return result?.ok || false;
	};

	const register = async (userData: RegisterData): Promise<boolean> => {
		try {
			const res = await fetch("/api/auth/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(userData),
			});

			if (res.ok) {
				// After successful registration, sign in
				await login(userData.email, userData.password);
				return true;
			}
			return false;
		} catch (error) {
			console.error("Registration failed", error);
			return false;
		}
	};

	const logout = async () => {
		await signOut({ callbackUrl: "/auth/login" });
	};

	return (
		<AuthContext.Provider
			value={{ user, login, register, logout, isLoading }}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function AuthProvider({ children }: { children: ReactNode }) {
	return (
		<SessionProvider>
			<AuthInternalProvider>{children}</AuthInternalProvider>
		</SessionProvider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
