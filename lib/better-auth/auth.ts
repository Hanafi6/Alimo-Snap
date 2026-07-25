import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { anonymous, admin as adminPlugin, emailOTP } from "better-auth/plugins";
import { ac, admin, agent, head, sales } from "./permissions";
import { resend } from "../resemd";

import AuthEmail from "@/features/auth/components/email-templits";

export const auth = betterAuth({
    baseURL: env.NEXT_PUBLIC_BETTER_AUTH_URL,
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),


    user: {
        changeEmail: {
            enabled: true,
            sendChangeEmailConfirmation: async ({ user, newEmail, url }) => {
                void resend.emails.send({
                    from: env.EMAIL_FROM,
                    to: user.email,
                    subject: "Change Email Confirmation",
                    react: AuthEmail({
                        url,
                        type: "change-email",
                        newEmail,
                    }),
                });
            },
        },
    },

    plugins: [
        anonymous(),
        adminPlugin({
            ac,
            roles: { admin, head, sales, agent },
        }),

        emailOTP({
            async sendVerificationOTP({ email, otp, type }) {
                // if (process.env.NODE_ENV !== "production") {
                //     console.log(`[DEV-ONLY] OTP Code for ${email} (${type}): ${otp}`);
                // }

                void resend.emails.send({
                    from: env.EMAIL_FROM,
                    to: email,
                    subject:
                        type === "forget-password" ? "Reset your password" : "OTP Code",
                    react: AuthEmail({
                        otp,
                        type,
                    }),
                });
            },
        }),

        nextCookies()
    ],


    // emailVerification: {
    //     sendVerificationEmail: async ({ user, url }) => {
    //         void resend.emails.send({
    //             from: env.EMAIL_FROM,
    //             to: user.email,
    //             subject: "Verify your email address",
    //             react: AuthEmail({
    //                 url,
    //                 type: "email-verification",
    //             }),
    //         });
    //     },
    // },


    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
    },

    account: {
        accountLinking: {
            enabled: true,
        },
    },

    socialProviders: {
        google: {
            clientId: env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
        },
        github: {
            clientId: env.NEXT_PUBLIC_GITHUB_ID!,
            clientSecret: env.GITHUB_SECRET,
        },
    },

    // hooks: {
    //     before: createAuthMiddleware(async (ctx) => {
    //         // prettier-ignore
    //         if (ctx.path !== "/email-otp/send-verification-otp")
    //             return;
    //         const { email } = ctx.body;
    //         if (!(await isEmailExist(email))) {
    //             throw new APIError("BAD_REQUEST", { message: "Email does not exist" });
    //         }
    //     }),
    // },
});
