import { NextResponse } from "next/server";
import { connectToDatabase, User } from "@/lib/mongodb";
import { generateOTP, storeOTP } from "@/lib/otp";
import { sendOTPEmail } from "@/lib/mail";

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        const db = await connectToDatabase();
        const user = await db.collection<User>("users").findOne({ email });

        if (!user) {
            // For security, we might want to return 200 even if user not found, 
            // but for this implementation we'll be explicit for better UX unless requested otherwise.
            return NextResponse.json({ error: "No account found with this email" }, { status: 404 });
        }

        const otp = generateOTP();
        await storeOTP(email, otp);
        const emailSent = await sendOTPEmail(email, otp);

        if (!emailSent) {
            return NextResponse.json({ error: "Failed to send email. Please try again later." }, { status: 500 });
        }

        return NextResponse.json({ message: "OTP sent successfully" }, { status: 200 });
    } catch (error) {
        console.error("[FORGOT_PASSWORD_API] Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
