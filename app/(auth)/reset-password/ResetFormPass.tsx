"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/better-auth/auth-client";
import { useRouter } from "next/navigation";
import { resetPasswordSchema, ResetPasswordValues } from "@/lib/schemas";

export default function ResetPasswordForm({ token }: { token: string }) {
    const [serverError, setServerError] = useState<string | null>(null);
    const [otp, setOtp] = useState("");
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ResetPasswordValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (values: ResetPasswordValues) => {
        setServerError(null);

        if (!otp) {
            setServerError("Please enter the OTP code sent to your email");
            return;
        }

        const { error } = await authClient.resetPassword({
            newPassword: values.password,
            token,
            fetchOptions: {
                onSuccess: () => {
                    alert("Password updated successfully!");
                    router.push("/login");
                }
            },
            // otp: otp, // Pass the OTP code here if required by your backend plugin
        });

        if (error) {
            setServerError(error.message || "An error occurred while resetting your password");
        } else {
            alert("Password updated successfully!");
            router.push("/login");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {serverError && (
                <div className="p-3 text-xs bg-destructive/10 text-destructive rounded-xl">
                    {serverError}
                </div>
            )}

            {/* Input: OTP Code */}
            <div className="space-y-1">
                <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP sent to your email"
                    className="w-full px-4 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                />
            </div>

            {/* Input 1: Password */}
            <div className="space-y-1">
                <input
                    {...register("password")}
                    type="password"
                    placeholder="New Password"
                    className="w-full px-4 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                {errors.password && (
                    <p className="text-xs text-destructive">{errors.password.message}</p>
                )}
            </div>

            {/* Input 2: Confirm Password */}
            <div className="space-y-1">
                <input
                    {...register("confirmPassword")}
                    type="password"
                    placeholder="Confirm New Password"
                    className="w-full px-4 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                {errors.confirmPassword && (
                    <p className="text-xs text-destructive">
                        {errors.confirmPassword.message}
                    </p>
                )}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition disabled:opacity-50"
            >
                {isSubmitting ? "Updating..." : "Save New Password"}
            </button>
        </form>
    );
}