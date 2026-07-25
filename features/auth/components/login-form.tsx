"use client";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import FormField from "@/features/auth/components/auth-fields/form-field";
import { FormProvider, useForm } from "react-hook-form";
import { loginSchema, LoginSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/better-auth/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useSearchParams } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {



  const searchParams = useSearchParams();

  const emailFromUrl = searchParams.get("email") || '';


  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: emailFromUrl || '',
      password: "",
    },
  });

  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function onSubmit(data: LoginSchema) {
    const { data: res, error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
      callbackURL: "/",
    });



    if (error) {
      console.log(error)
      // alert(error.message);
    }
  }

  async function handleSocialLogin(provider: "google" | "github") {
    await authClient.signIn.social({
      provider: provider,
      callbackURL: "/",
    });
  }

  async function loginWithAnonymous() {
    try {
      setIsLoggedIn(true); // 1️⃣ ابدأ الـ loading فوراً واقفل الزرار لمنع الـ Double Click

      const { data, error } = await authClient.signIn.anonymous({
        fetchOptions: {
          onSuccess: () => {
            // 2️⃣ لو نجح، اعمل ريفريش ووديه الصفحة الرئيسية

          },
          onError: (ctx) => {
            alert(ctx.error.message || "Failed to login anonymously");
            setIsLoggedIn(false); // افتح الزرار تاني لو حصل خطأ
          }
        }
      });
      router.refresh();
      router.push("/");

    } catch (error) {
      console.error(error);
      setIsLoggedIn(false); // افتح الزرار في حالة الـ Crash
    }
  }

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
                <FormField
                  label="Password"
                  name="password"
                  placeholder="Enter your password"
                  type="password"
                />

                <Link href={"/forgot-password"} className="text-sm underline">
                  Forgot Password ?
                </Link>

                <Field className="flex flex-col gap-2 mt-2">
                  <Button type="submit" className="w-full">Login</Button>
                  {/* زرار تسجيل الدخول بجوجل */}
                  <Button
                    variant="outline"
                    onClick={() => handleSocialLogin("google")}
                    type="button"
                    className="w-full"
                  >
                    Login with Google
                  </Button>

                  {/* زرار تسجيل الدخول بجيت هب */}
                  <Button
                    variant="outline"
                    onClick={() => handleSocialLogin("github")}
                    type="button"
                    className="w-full"
                  >
                    Login with GitHub
                  </Button>
                  <Button
                    variant="outline"
                    onClick={loginWithAnonymous}
                    type="button"
                    disabled={isLoggedIn}
                    className="w-full"
                  >
                    {isLoggedIn ? "...Progrissing" : "Login Anonymous"}
                  </Button>

                  <FieldDescription className="text-center mt-2">
                    Don&apos;t have an account?{" "}
                    <Link href={"/register"} className="underline">Sign up</Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div >
  );
}