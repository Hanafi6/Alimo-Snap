"use client";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthButton from "@/features/auth/components/auth-button";
import {
    ForgotPasswordSchema,
    forgotPasswordSchema,
} from "@/features/auth/schemas";
import { authClient } from "@/lib/better-auth/auth-client";
import FormField from "./auth-fields/form-field";

type ForgotPasswordEmailFormProps = {
    onSuccess: (email: string) => void;
};

export default function ForgotPasswordEmailForm({
    onSuccess,
}: ForgotPasswordEmailFormProps) {
    const [submitError, setSubmitError] = useState<string | null>(null);

    const form = useForm<ForgotPasswordSchema>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit: SubmitHandler<ForgotPasswordSchema> = async (data) => {
        setSubmitError(null);
        try {
            await authClient.emailOtp.sendVerificationOtp({
                email: data.email,
                type: "forget-password",
                fetchOptions: {
                    onError: (error) => {
                        setSubmitError(error.error.message || "Failed to send reset code.");
                    },
                    onSuccess: () => {
                        onSuccess(data.email);
                    },
                },
            });
        } catch (error: unknown) {
            const message =
                error instanceof Error ? error.message : "An unexpected error occurred";
            setSubmitError(message);
            console.error(error);
        }
    };

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-1 mb-2">
                    <h2 className="text-lg font-semibold text-foreground">
                        Forgot password?
                    </h2>
                    <p className="text-xs text-muted-foreground">
                        No worries, enter your email address and we will send you a reset
                        code.
                    </p>
                </div>

                <FormField
                    label="Email address"
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                />

                {submitError && (
                    <div className="text-xs font-semibold text-destructive bg-destructive/10 p-3 rounded-lg border border-destructive/20 text-center animate-in fade-in slide-in-from-top-1">
                        {submitError}
                    </div>
                )}
                <AuthButton
                    type="submit"
                    isPending={form.formState.isSubmitting}
                    className="w-full font-semibold cursor-pointer rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-[14px] shadow-sm transition-all focus-visible:ring-2 active:scale-[0.98]"
                    content="Send reset code"
                />

            </form>
        </FormProvider>
    );
}
