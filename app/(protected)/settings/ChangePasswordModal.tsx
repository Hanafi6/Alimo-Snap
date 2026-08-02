// app/(protected)/settings/ChangePasswordModal.tsx
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Lock, KeyRound, CheckCircle2 } from "lucide-react";
import { authClient } from "@/lib/better-auth/auth-client";
import AuthButton from "@/features/auth/components/auth-button";
import FormField from "@/features/auth/components/auth-fields/form-field";
import {
    ChangePasswordSchema,
    changePasswordSchema,
} from "@/lib/schemas";

interface Props {
    open: boolean;
    onClose: () => void;
}

export function ChangePasswordModal({ open, onClose }: Props) {
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const form = useForm<ChangePasswordSchema>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    // فضي الفورم كل ما المودال يتقفل
    useEffect(() => {
        if (!open) {
            form.reset();
            setSubmitError(null);
            setSuccess(false);
        }
    }, [open, form]);

    const onSubmit: SubmitHandler<ChangePasswordSchema> = async (data) => {
        setSubmitError(null);

        const { error } = await authClient.changePassword({
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
            revokeOtherSessions: true,
        });

        if (error) {
            setSubmitError(error.message || "كلمة السر الحالية غير صحيحة");
            return;
        }

        setSuccess(true);
        setTimeout(onClose, 1200);
    };

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md bg-card text-card-foreground rounded-2xl border border-border shadow-xl p-6"
                    >
                        <div className="flex items-start justify-between mb-5">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-emerald-500/10 text-emerald-600 rounded-xl">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-base font-semibold">تغيير كلمة السر</h2>
                                    <p className="text-xs text-muted-foreground">
                                        أدخل كلمة السر الحالية والجديدة
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                disabled={form.formState.isSubmitting}
                                className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground shrink-0"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {success ? (
                            <div className="flex flex-col items-center gap-2 py-6 text-center">
                                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                                <p className="text-sm font-medium">تم تغيير كلمة السر بنجاح</p>
                            </div>
                        ) : (
                            <FormProvider {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="flex flex-col gap-3"
                                >
                                    <FormField
                                        label="كلمة السر الحالية"
                                        name="currentPassword"
                                        type="password"
                                        placeholder="••••••••"
                                    />

                                    <FormField
                                        label="كلمة السر الجديدة"
                                        name="newPassword"
                                        type="password"
                                        placeholder="••••••••"
                                    />

                                    <FormField
                                        label="تأكيد كلمة السر الجديدة"
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="••••••••"
                                    />

                                    {submitError && (
                                        <div className="text-xs font-semibold text-destructive bg-destructive/10 p-3 rounded-lg border border-destructive/20 text-center animate-in fade-in slide-in-from-top-1">
                                            {submitError}
                                        </div>
                                    )}

                                    <AuthButton
                                        type="submit"
                                        isPending={form.formState.isSubmitting}
                                        className="w-full font-semibold cursor-pointer rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-[14px] shadow-sm transition-all focus-visible:ring-2 active:scale-[0.98] mt-2"
                                    >
                                        <span className="flex items-center justify-center gap-1.5">
                                            <KeyRound className="w-4 h-4" />
                                            Save Password
                                        </span>
                                    </AuthButton>
                                </form>
                            </FormProvider>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}