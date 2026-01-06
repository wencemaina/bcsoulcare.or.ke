import { NextResponse } from "next/server";
import { connectToDatabase, User } from "@/lib/mongodb";
import { compare } from "bcryptjs";
import { generateOTP, storeOTP } from "@/lib/otp";
import { sendOTPEmail } from "@/lib/mail";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
        }

        const db = await connectToDatabase();
        const user = await db.collection<User>("users").findOne({ email });

        if (!user || !user.password) {
            return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
        }

        const isPasswordCorrect = await compare(password, user.password);

        if (!isPasswordCorrect) {
            return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
        }

        // Initiation successful, send OTP for 2FA
        const otp = generateOTP();
        await storeOTP(email, otp);
        const emailSent = await sendOTPEmail(email, otp);

        if (!emailSent) {
            return NextResponse.json({ error: "Failed to send verification code. Please try again." }, { status: 500 });
        }

        return NextResponse.json({ message: "Verification code sent" }, { status: 200 });
    } catch (error) {
        console.error("[LOGIN_OTP_INIT_API] Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
