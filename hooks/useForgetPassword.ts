// hooks/useForgetPassword.ts
"use client";

import { useState } from "react";
import { authClient } from "@/lib/better-auth/auth-client";

export function useForgetPassword() {
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const sendResetLink = async (email: string) => {
        if (!email) return;

        setLoading(true);
        setErrorMessage(null);

        const { error } = await authClient.forgetPassword.emailOtp({
            email,
        });

        setLoading(false);

        if (error) {
            setErrorMessage(error.message || "SomeThing Warning");
            return false;
        }

        setEmailSent(true);
        return true;
    };

    const reset = () => {
        setEmailSent(false);
        setErrorMessage(null);
    };

    return { loading, emailSent, errorMessage, sendResetLink, reset };
}