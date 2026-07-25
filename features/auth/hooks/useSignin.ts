import { useRouter } from "next/navigation";
import { authClient } from "@/lib/better-auth/auth-client";

import { LoginSchema } from "../schemas";

export function useSignin() {
    const router = useRouter();

    return async ({ email, password, rememberMe }: LoginSchema) =>
        authClient.signIn.email({
            email,
            password,
            rememberMe,
            fetchOptions: {
                onSuccess: () => {
                    router.replace("/dashboard");
                },
            },
        });
}
