import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connectToDatabase, User, MembershipTier } from "@/lib/mongodb";
import { compare } from "bcryptjs";
import { verifyOTP } from "@/lib/otp";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
				code: { label: "Verification Code", type: "text" },
			},
			async authorize(credentials) {
				console.log("[AUTH] Authorize called with:", credentials?.email);
				if (!credentials?.email || !credentials?.password) {
					console.log("[AUTH] Missing credentials");
					return null;
				}

				const db = await connectToDatabase();
				console.log("[AUTH] Connected to database");
				const user = await db.collection<User>("users").findOne({
					email: credentials.email as string,
				});

				if (!user) {
					console.log("[AUTH] User not found:", credentials.email);
					return null;
				}

				if (!user.password) {
					console.log("[AUTH] User has no password set:", credentials.email);
					return null;
				}

				const isPasswordCorrect = await compare(
					credentials.password as string,
					user.password,
				);

				if (!isPasswordCorrect) {
					console.log("[AUTH] Invalid password for:", credentials.email);
					return null;
				}

				// 2FA Verification: Check the code if provided
				// 2FA Verification: Check the code if provided
				// if (!credentials.code) {
				// 	console.log("[AUTH] OTP code missing for 2FA");
				// 	return null;
				// }

				// const isOtpValid = await verifyOTP(credentials.email as string, credentials.code as string);
				// if (!isOtpValid) {
				// 	console.log("[AUTH] Invalid or expired OTP code");
				// 	return null;
				// }

				console.log("[AUTH] Authorization successful for:", credentials.email);

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
							status: user.subscriptionStatus || "active",
							startDate: user.subscriptionStartDate,
							endDate: user.subscriptionEndDate,
						}
						: user.membershipTierName
							? {
								name: user.membershipTierName,
								billingCycle: "unknown",
								status: user.subscriptionStatus || "active",
								startDate: user.subscriptionStartDate,
								endDate: user.subscriptionEndDate,
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
	secret: process.env.AUTH_SECRET,
});
