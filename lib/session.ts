// lib/get-session-server.ts
import { cache } from "react";
import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";

export const getSessionServer = cache(async () => {
    const h = await headers();
    const session = await auth.api.getSession({ headers: h });
    return session; // null = مفيش session خالص
});

// helper بيرجع حالة اليوزر بشكل واضح
export type UserAuthState = "guest" | "anonymous" | "authenticated";

export const getUserAuthState = cache(async (): Promise<UserAuthState> => {
    const session = await getSessionServer();
    if (!session) return "guest";
    if (session.user.isAnonymous) return "anonymous";
    return "authenticated";
});