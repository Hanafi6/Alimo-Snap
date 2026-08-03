import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import { env } from "@/lib/env";
import type { ReactElement } from "react";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: env.GMAIL_USER,
        pass: env.GMAIL_APP_PASSWORD,
    },
    connectionTimeout: 10000,
    greetingTimeout: 5000,
    socketTimeout: 10000,
});

interface SendEmailParams {
    to: string;
    subject: string;
    react: ReactElement;
}

export async function sendEmail({ to, subject, react }: SendEmailParams) {
    try {
        const html = await render(react);

        const info = await transporter.sendMail({
            from: `Alimo Snap <${env.GMAIL_USER}>`,
            to,
            subject,
            html,
        });

        console.log("Email sent: %s", info.messageId);
        return { success: true };
    } catch (error) {
        console.error("Error sending email via Nodemailer:", error);
        return { success: false, error };
    }
}