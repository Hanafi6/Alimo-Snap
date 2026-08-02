import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailOptions {
    to: string;
    subject: string;
    text: string;
}

export async function sendEmail({ to, subject, text }: SendEmailOptions) {
    try {
        const data = await resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: [to],
            subject,
            text,
        });

        return { success: true, data };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error };
    }
}