// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

// interface SendEmailOptions {
//     to: string;
//     subject: string;
//     text: string;
// }

// export async function sendEmail({ to, subject, text }: SendEmailOptions) {
//     try {
//         const data = await resend.emails.send({
//             from: "Acme <onboarding@resend.dev>",
//             to: [to],
//             subject,
//             text,
//         });

//         return { success: true, data };
//     } catch (error) {
//         console.error("Error sending email:", error);
//         return { success: false, error };
//     }
// }

import { Resend } from "resend";
import { env } from "@/lib/env";
import type { ReactElement } from "react";

const resend = new Resend(env.RESEND_API_KEY);

interface SendEmailParams {
    to: string;
    subject: string;
    react: ReactElement;
}

export async function sendEmail({ to, subject, react }: SendEmailParams) {
    try {
        const { data, error } = await resend.emails.send({
            from: "Alimo Snap <no-reply@yourdomain.com>", // أو 'onboarding@resend.dev' للاختبار
            to: [to],
            subject,
            react,
        });

        if (error) {
            console.error("Resend Error:", error);
            return { success: false, error };
        }

        console.log("Email sent successfully:", data?.id);
        return { success: true, data };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error };
    }
}