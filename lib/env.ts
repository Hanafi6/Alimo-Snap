import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        DATABASE_URL: z.url(),
        BETTER_AUTH_SECRET: z.string().min(1),
        GOOGLE_CLIENT_SECRET: z.string().optional(),
        GITHUB_SECRET: z.string().optional(),
        RESEND_API_KEY: z.string().min(32).max(128),
        EMAIL_FROM: z.string().min(16),
    },

    client: {
        NEXT_PUBLIC_GOOGLE_CLIENT_ID: z.string().min(1),
        NEXT_PUBLIC_BETTER_AUTH_URL: z.url(),
        NEXT_PUBLIC_GITHUB_ID: z.string().optional(),

    },

    experimental__runtimeEnv: {
        NEXT_PUBLIC_BETTER_AUTH_URL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL, // 👈 وهنا
        NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        NEXT_PUBLIC_GITHUB_ID: process.env.NEXT_PUBLIC_GITHUB_ID, //  الصح
    },
});
