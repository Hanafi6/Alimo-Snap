import { LoginForm } from "@/features/auth/components/login-form";
import { getSessionServer } from "@/lib/session";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Page() {
  const session = await getSessionServer();
  if (session?.user.isAnonymous) {
    redirect("/");
  }

  return <Suspense fallback={<div>Loading...</div>}>
    <LoginForm className="w-full max-w-112.5" />
  </Suspense>
    ;
}
