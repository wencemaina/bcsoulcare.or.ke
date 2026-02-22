import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/types/database";
import { verifyOTP, deleteOTP } from "@/lib/otp";
import { hash } from "bcryptjs";

export async function POST(req: Request) {
    try {
        const { email, code, newPassword } = await req.json();

        if (!email || !code || !newPassword) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const isValid = await verifyOTP(email, code);

        if (!isValid) {
            return NextResponse.json({ error: "Invalid or expired verification code" }, { status: 400 });
        }

        const hashedPassword = await hash(newPassword, 12);

        const db = await connectToDatabase();
        const result = await db.collection<User>("users").updateOne(
            { email },
            {
                $set: {
                    password: hashedPassword,
                    updatedAt: new Date()
                }
            }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Clean up the used OTP
        await deleteOTP(email);

        return NextResponse.json({ message: "Password reset successful" }, { status: 200 });
    } catch (error) {
        console.error("[RESET_PASSWORD_API] Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
