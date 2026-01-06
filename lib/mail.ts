import nodemailer from "nodemailer";

const getAppUrl = () => {
    return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
};

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "465"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const sendOTPEmail = async (email: string, otp: string) => {
    const appUrl = getAppUrl();
    const resetUrl = `${appUrl}/auth/reset-password?email=${encodeURIComponent(email)}&code=${otp}`;

    const mailOptions = {
        from: process.env.SMTP_FROM || `"BC Soul Care" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Your Password Reset Code - BC Soul Care",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #333; text-align: center;">Password Reset Request</h2>
                <p>Hello,</p>
                <p>We received a request to reset your password for your BC Soul Care account. Use the code below to proceed:</p>
                <div style="text-align: center; margin: 30px 0;">
                    <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #0070f3; background: #f0f7ff; padding: 10px 20px; border-radius: 5px; border: 1px dashed #0070f3;">
                        ${otp}
                    </span>
                </div>
                <p>Alternatively, you can click the button below to reset your password directly:</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${resetUrl}" style="background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
                </div>
                <p style="font-size: 14px; color: #666;">This code will expire in 10 minutes. If you did not request this, please ignore this email.</p>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                <p style="font-size: 12px; color: #999; text-align: center;">
                    &copy; ${new Date().getFullYear()} BC Soul Care. All rights reserved.
                </p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`[MAIL] OTP sent to ${email}`);
        return true;
    } catch (error) {
        console.error("[MAIL] Error sending OTP email:", error);
        return false;
    }
};
