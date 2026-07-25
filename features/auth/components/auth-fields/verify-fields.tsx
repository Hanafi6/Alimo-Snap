"use client";

import { useState } from "react";
// 🟢 1. تعديل الـ Router ليكون من next/navigation
import { useSearchParams, useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import AuthButton from "@/features/auth/components/auth-button";
import OtpField from "@/features/auth/components/auth-fields/otp-field";
import useHasMounted from "@/hooks/useHasMounted";
import { authClient } from "@/lib/better-auth/auth-client";

export default function VerifyFields() {
  const hasMounted = useHasMounted();
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleVerify() {
    if (!otp || otp.length < 6) return;

    setLoading(true);
    setError("");

    try {
      const { data, error } = await authClient.emailOtp.verifyEmail({
        email,
        otp,
      });
      console.log(data)

      if (error) {
        setError("Code Invalid. Please check your email and try again.");
        setLoading(false);
        return;
      }

      router.push("/login");

    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  if (!hasMounted) {
    return null;
  }

  return (
    <Card className="max-w-112.5 w-full">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          Verify your login
        </CardTitle>
        <CardDescription className="text-center">
          Enter the verification code we sent to your email address:{" "}
          <span className="font-medium">{email || "your email"}</span>.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <OtpField value={otp} setValue={setOtp} isPending={loading} />

        {error && (
          <p className="text-sm text-red-500 text-center font-medium">
            {error}
          </p>
        )}
      </CardContent>

      <CardFooter>
        <Field className="w-full">
          <AuthButton
            onClick={handleVerify}
            isPending={loading}
            disabled={loading || otp.length < 6}
            className="w-full bg-primary  p-2.5 rounded-lg disabled:opacity-50"
            content={loading ? "Verifying..." : "Verify"}
          />
        </Field>
      </CardFooter>
    </Card>
  );
}