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
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2 } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const searchParams = useSearchParams();
  const emailFromUrl = searchParams.get("email") || "";

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: emailFromUrl || "",
      password: "",
    },
  });

  const router = useRouter();

  // 💡 توحيد حالة التحميل لجميع أنواع التسجيل
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // 1. تسجيل الدخول بالإيميل والباسورد
  async function onSubmit(data: LoginSchema) {
    setIsLoading(true);
    setShowSuccess(false);

    const { error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
      callbackURL: "/",
      fetchOptions: {
        onSuccess: () => {
          setShowSuccess(true);
          setIsLoading(false);
          // 🚀 التوجيه الصحيح للصفحة الرئيسية وتحديث الـ Cache
          router.push("/");
          router.refresh();
        },
        onError: (ctx) => {
          setIsLoading(false);
          setShowSuccess(false);
          form.setError("email", {
            type: "manual",
            message: ctx.error.message || "البيانات غير صحيحة",
          });
        },
      },
    });

    if (error) {
      setIsLoading(false);
      setShowSuccess(false);
    }
  }

  // 2. تسجيل الدخول بالسوشيال (Google / GitHub)
  async function handleSocialLogin(provider: "google" | "github") {
    try {
      setIsLoading(true);
      await authClient.signIn.social({
        provider: provider,
        callbackURL: "/",
      });
      // 💡 الـ Social login بيعمل Redirect أوتوماتيك لصفحة الـ Provider
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  // 3. تسجيل الدخول كـ Anonymous
  async function loginWithAnonymous() {
    try {
      setIsLoading(true);
      setShowSuccess(false);

      await authClient.signIn.anonymous({
        fetchOptions: {
          onSuccess: () => {
            setShowSuccess(true);
            setIsLoading(false);
            router.push("/");
            router.refresh();
          },
          onError: (ctx) => {
            setIsLoading(false);
            setShowSuccess(false);
            alert(ctx.error.message || "Failed to login anonymously");
          },
        },
      });
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setShowSuccess(false);
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

        {!showSuccess ? (
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
                    <Button type="submit" disabled={isLoading} className="w-full">
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" /> Logging in...
                        </span>
                      ) : (
                        "Login"
                      )}
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => handleSocialLogin("google")}
                      type="button"
                      disabled={isLoading}
                      className="w-full"
                    >
                      Login with Google
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => handleSocialLogin("github")}
                      type="button"
                      disabled={isLoading}
                      className="w-full"
                    >
                      Login with GitHub
                    </Button>

                    <Button
                      variant="outline"
                      onClick={loginWithAnonymous}
                      type="button"
                      disabled={isLoading}
                      className="w-full"
                    >
                      Login Anonymous
                    </Button>

                    <FieldDescription className="text-center mt-2">
                      Don&apos;t have an account?{" "}
                      <Link href={"/register"} className="underline">
                        Sign up
                      </Link>
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </form>
            </FormProvider>
          </CardContent>
        ) : (
          <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 animate-bounce" />
            <h2 className="text-lg font-semibold">Logged In</h2>
            <span className="text-sm text-muted-foreground">Redirecting to home page...</span>
          </CardContent>
        )}
      </Card>
    </div>
  );
}