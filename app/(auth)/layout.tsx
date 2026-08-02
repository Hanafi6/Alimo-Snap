// app/(auth)/layout.tsx

import WorldMap from "@/components/WorldMap";
import { getSessionServer } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const session = await getSessionServer();

  if (session && !session.user.isAnonymous) {
    redirect("/dashboard");
  }


  return <main className="relative flex min-h-svh flex-col justify-center items-center overflow-hidden bg-background">

    <div className="absolute inset-0 z-0 opacity-25 flex items-center justify-center pointer-events-auto">
      <WorldMap />
    </div>

    <div className="relative z-10 w-full max-w-md px-4 pointer-events-auto">
      {children}
    </div>

  </main>
}