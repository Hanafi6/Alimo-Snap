'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { FormProvider, useForm } from "react-hook-form";
import FormField from './form-field'
import { cn } from '@/lib/utils'
import { type ForgotPasswordSchema, forgotPasswordSchema } from '../../schemas'
import { zodResolver } from '@hookform/resolvers/zod'

import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { SessionData } from '@/components/navbar/NavBarClient';
import { authClient } from '@/lib/better-auth/auth-client';


interface ForgetPasswordProps extends React.ComponentProps<"div"> {
    className?: string;
    session: SessionData | null
}

function ForgetPassword({ className, session, ...props }: ForgetPasswordProps) {


    const onSubmit = (data: ForgotPasswordSchema) => {
        console.log(data);
    }

    const handelResend = (email: string) => {
        console.log(`Sending reset link to ${email}`);
        authClient.requestPasswordReset({
            email,
            redirectTo: "/reset-password",
        });
    }

    const form = useForm<ForgotPasswordSchema>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {},
    });

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
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
                                <Field className="flex flex-col gap-2 mt-2">
                                    {/* زرار تسجيل الدخول بجيت هب */}
                                    <Button
                                        variant="default"
                                        onClick={() => handelResend(session?.user.email || "")}
                                        type="button"
                                        className="w-full"
                                    >
                                        Send Reset Link
                                    </Button>

                                    <FieldDescription className="text-center mt-2">
                                        Don&apos;t have an account?{" "}
                                        {/* <Link href={"/register"} className="underline">Sign up</Link> */}
                                    </FieldDescription>
                                </Field>
                            </FieldGroup>
                        </form>
                    </FormProvider>
                </CardContent>
            </Card>
        </div >
    )
}

export default ForgetPassword