// components/settings/SetPasswordModal.tsx
"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, Lock, KeyRound, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { setPasswordAction } from "@/features/helperrs/set-password";

const schema = z
    .object({
        password: z.string().min(8, "لازم تكون 8 حروف على الأقل"),
        confirm: z.string(),
    })
    .refine((data) => data.password === data.confirm, {
        message: "كلمتا السر غير متطابقتين",
        path: ["confirm"],
    });

type FormValues = z.infer<typeof schema>;

interface Props {
    open: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export function SetPasswordModal({ open, onClose, onSuccess }: Props) {
    const [showPass, setShowPass] = useState(false);
    const [serverMessage, setServerMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        if (!open) {
            reset();
            setServerMessage(null);
        }
    }, [open, reset]);

    const onSubmit = async (data: FormValues) => {
        setServerMessage(null);
        const res = await setPasswordAction(data.password);

        setServerMessage({ type: res.success ? "success" : "error", text: res.message });

        if (res.success) {
            setTimeout(() => {
                onClose();
                onSuccess?.();
            }, 1200);
        }
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
                        className="fixed inset-0 bg-card/50 backdrop-blur-sm z-50"
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
                                    <h2 className="text-base font-semibold">تعيين كلمة سر</h2>
                                    <p className="text-xs text-muted-foreground">
                                        حسابك مسجل عن طريق جوجل، ضيف كلمة سر عشان تدخل بيها كمان
                                    </p>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground shrink-0">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                            <div className="relative">
                                <input
                                    type={showPass ? "text" : "password"}
                                    placeholder="كلمة السر الجديدة"
                                    {...register("password")}
                                    className="w-full text-sm bg-secondary border border-border rounded-xl px-3.5 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-primary/40"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass((s) => !s)}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                >
                                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-xs text-destructive -mt-1">{errors.password.message}</p>
                            )}

                            <input
                                type={showPass ? "text" : "password"}
                                placeholder="تأكيد كلمة السر"
                                {...register("confirm")}
                                className="w-full text-sm bg-secondary border border-border rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/40"
                            />
                            {errors.confirm && (
                                <p className="text-xs text-destructive -mt-1">{errors.confirm.message}</p>
                            )}

                            {serverMessage && (
                                <p
                                    className={`text-xs flex items-center gap-1.5 ${serverMessage.type === "success" ? "text-emerald-600" : "text-destructive"
                                        }`}
                                >
                                    {serverMessage.type === "success" && <CheckCircle2 className="w-4 h-4" />}
                                    {serverMessage.text}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="mt-2 flex items-center justify-center gap-1.5 text-sm font-medium bg-primary hover:bg-primary/90 text-primary-foreground px-3.5 py-2.5 rounded-xl transition disabled:opacity-50"
                            >
                                <KeyRound className="w-4 h-4" />
                                {isSubmitting ? "جاري الحفظ..." : "تعيين كلمة السر"}
                            </button>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}