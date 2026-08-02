"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation"; // 👈 1. استيراد userRouter
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import FormField from "@/features/auth/components/auth-fields/form-field";
import { authClient } from "@/lib/better-auth/auth-client";
import { registerSchema, RegisterSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import BackToHomBtn from '@/components/back-to-home-btn'


type Success<T> = {
  data: T;
  error: null;
};

type Failure<E> = {
  data: null;
  error: E;
};

type Result<T, E = Error> = Success<T> | Failure<E>;

export async function tryCatch<T, E = Error>(
  promise: Promise<T>,
): Promise<Result<T, E>> {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as E };
  }
}

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {

  const router = useRouter();
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {},
    mode: "onBlur",
  });




  // async function onSubmit(data: RegisterSchema) {
  //   try {
  //     const { data: res, error } = await authClient.signUp.email({
  //       name: data.fullName,
  //       email: data.email,
  //       password: data.password,
  //     });

  //     if (error) {
  //       if (error.status === 422 || error.message?.includes("already exists")) {
  //         form.setError("email", {
  //           type: "manual",
  //           message: "This Email is already registered, try another one or login instead.",
  //         });

  //         router.push(`/login?email=${encodeURIComponent(data.email)}`);

  //       } else {
  //         form.setError("root", {
  //           message: error.message || "Please try again later. An unexpected error occurred.",
  //         });
  //       }
  //       return;
  //     }


  //   } catch (err) {
  //     console.error("Critical Client Error:", err);
  //     form.setError("root", {
  //       message: "Something went wrong. Please try again later.",
  //     });
  //   }
  // }


  async function onSubmit(data: RegisterSchema) {
    try {
      const { data: res, error } = await authClient.signUp.email({
        name: data.fullName,
        email: data.email,
        password: data.password,
      });

      if (error) {
        if (error.status === 422 || error.message?.includes("already exists")) {
          form.setError("email", {
            message: "هذا البريد مسجل بالفعل، يرجى تسجيل الدخول.",
          });
        } else {
          form.setError("root", { message: error.message });
        }
        return;
      }

      const { error: otpError } = await authClient.emailOtp.sendVerificationOtp({
        email: data.email,
        type: "email-verification",
      });

      if (otpError) {
        console.error("Failed to send OTP:", otpError);
        form.setError("root", {
          message: "تم إنشاء الحساب ولكن فشل إرسال كود التأكيد، حاول إعادة الإرسال.",
        });
        return;
      }

      router.push(`/verify-email?email=${encodeURIComponent(data.email)}`);

    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Card {...props}>
      <CardHeader>
        <BackToHomBtn />
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <FormField
                label="Full name"
                name="fullName"
                placeholder="Enter your Full name"
              />
              <FormField
                label="Email"
                name="email"
                placeholder="Enter your email address"
              />
              <FormField
                label="Password"
                name="password"
                placeholder="Enter your password"
              />
              <FormField
                label="Confirm password"
                name="passwordConfirm"
                placeholder="Confirm your password"
              />

              <FieldGroup>
                <Field>
                  <Button type="submit"
                    disabled={form.formState.isSubmitting}
                  >{form.formState.isSubmitting ? "Creating..." : "Create Account"}
                  </Button>
                  <Button variant="outline" type="button">
                    Sign up with Google
                  </Button>{" "}
                  <FieldDescription className="px-6 text-center">
                    Already have an account?{" "}
                    <Link href={"/login"}>Sign in</Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </FieldGroup>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
