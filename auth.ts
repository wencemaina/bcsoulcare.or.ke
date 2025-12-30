import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connectToDatabase, User, MembershipTier } from "@/lib/mongodb";
import { compare } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					return null;
				}

				const db = await connectToDatabase();
				const user = await db.collection<User>("users").findOne({
					email: credentials.email as string,
				});

				if (!user || !user.password) {
					return null;
				}

				const isPasswordCorrect = await compare(
					credentials.password as string,
					user.password,
				);

				if (!isPasswordCorrect) {
					return null;
				}

				// Fetch membership tier info if applicable
				let tierInfo;
				if (user.role !== "admin" && user.membershipTierId) {
					tierInfo = await db
						.collection<MembershipTier>("membership_tiers")
						.findOne({ tierId: user.membershipTierId });
				}

				return {
					id: user.userId,
					email: user.email,
					firstName: user.firstName,
					lastName: user.lastName,
					name: user.name || `${user.firstName} ${user.lastName}`,
					role: user.role,
					createdAt: user.createdAt,
					membershipTier: tierInfo
						? {
								name: tierInfo.name,
								billingCycle: tierInfo.billingCycle,
								status: "active", // Defaulting as we don't have per-user status in model yet, but keeping structure
						  }
						: undefined,
				};
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.userId = user.id;
				token.role = (user as any).role;
				token.firstName = (user as any).firstName;
				token.lastName = (user as any).lastName;
				token.membershipTier = (user as any).membershipTier;
				token.createdAt = (user as any).createdAt;
			}
			return token;
		},
		async session({ session, token }) {
			if (token && session.user) {
				(session.user as any).userId = token.userId;
				(session.user as any).role = token.role;
				(session.user as any).firstName = token.firstName;
				(session.user as any).lastName = token.lastName;
				(session.user as any).membershipTier = token.membershipTier;
				(session.user as any).createdAt = token.createdAt;
			}
			return session;
		},
	},
	pages: {
		signIn: "/auth/login",
	},
	session: {
		strategy: "jwt",
	},
	secret: process.env.AUTH_SECRET || "development-secret-key-change-me",
});
