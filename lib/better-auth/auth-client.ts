import { env } from "@/lib/env";
import { anonymousClient, oneTapClient, adminClient, emailOTPClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { ac, admin, agent, head, sales } from "./permissions";


export const authClient = createAuthClient({
    baseURL: env.NEXT_PUBLIC_BETTER_AUTH_URL,

    plugins: [
        oneTapClient({
            clientId: env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            autoSelect: false,
            cancelOnTapOutside: true,
            context: "signin",

            promptOptions: {
                baseDelay: 1000, // Base delay in ms (default: 1000)
                maxAttempts: 5, // Maximum number of attempts before triggering onPromptNotification (default: 5)
            },
        }),

        adminClient({
            ac,
            roles: { admin, head, sales, agent },
        }),
        anonymousClient(),
        emailOTPClient(),
    ],
});

// const signIn = async () => {
//     const data = await authClient.signIn.social({
//         provider: "google",
//     });
// };