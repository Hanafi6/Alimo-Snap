"use server";

import { sendEmail } from "@/lib/nodemailer";
import AuthEmail from "@/features/auth/components/email-templits";

export async function subscribeToNewsletter(email: string) {
    if (!email || !email.includes("@")) {
        return { success: false, error: "Invalid email address" };
    }

    // await db.newsletter.create({ data: { email } });

    const result = await sendEmail({
        to: email,
        subject: "Welcome to AlimoSnap Newsletter! 🎉",
        react: AuthEmail({ type: "newsletter" }),
    });

    return result;
}