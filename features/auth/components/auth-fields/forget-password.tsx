"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormProvider, useForm } from "react-hook-form";
import FormField from "./form-field";
import { cn } from "@/lib/utils";
import { type ForgotPasswordSchema, forgotPasswordSchema } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/better-auth/auth-client";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface ForgetPasswordProps extends React.ComponentProps<"div"> {
    className?: string;
}

function ForgetPassword({ className, ...props }: ForgetPasswordProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [emailSent, setEmailSent] = useState(false);

    const route = useRouter();

    const form = useForm<ForgotPasswordSchema>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: { email: "" },
    });

    const onSubmit = async (data: ForgotPasswordSchema) => {
        setSubmitError(null);
        setIsSubmitting(true);

        const { error } = await authClient.requestPasswordReset({
            email: data.email,
            redirectTo: "/reset-password",
            fetchOptions: {
                onSuccess: () => {
                    setTimeout(() => {
                        form.reset();
                        route.push('/');
                        setEmailSent(false);
                    }, 3000)
                }
            }
        });

        setIsSubmitting(false);

        if (error) {
            setSubmitError(error.message || "An error occurred while sending the email.");
            return;
        }

        setEmailSent(true);


    };

    if (emailSent) {
        return (
            <div className={cn("flex flex-col gap-6", className)} {...props}>
                <Card>
                    <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
                        <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                        <h2 className="text-lg font-semibold">A reset link has been sent.</h2>
                        <p className="text-sm text-muted-foreground">
                            Open your email and click the link to set a new password.                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Forget Password?</CardTitle>
                    <CardDescription>
                        Enter your email, and we’ll send you a password reset link.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <FormProvider {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FieldGroup>
                                <FormField
                                    label="Email"
                                    name="email"
                                    placeholder="Enter your email address"
                                />

                                {submitError && (
                                    <p className="text-xs text-destructive text-center mt-1">
                                        {submitError}
                                    </p>
                                )}

                                <Field className="flex flex-col gap-2 mt-2">
                                    <Button
                                        variant="default"
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full"
                                    >
                                        {isSubmitting ? "Singing..." : "Send Reset Link"}
                                    </Button>

                                    <FieldDescription className="text-center mt-2">
                                        Don&apos;t have an account?{" "}
                                    </FieldDescription>
                                </Field>
                            </FieldGroup>
                        </form>
                    </FormProvider>
                </CardContent>
            </Card>
        </div>
    );
}

export default ForgetPassword;