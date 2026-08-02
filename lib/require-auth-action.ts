// lib/require-auth-action.ts

import { getSessionServer } from "./session";

type ActionGuardResult =
    | { ok: true; session: NonNullable<Awaited<ReturnType<typeof getSessionServer>>> }
    | { ok: false; reason: "guest" | "anonymous" };

export async function requireAuthForAction(): Promise<ActionGuardResult> {
    const session = await getSessionServer();

    if (!session) {
        return { ok: false, reason: "guest" };
    }

    if (session.user.isAnonymous) {
        return { ok: false, reason: "anonymous" };
    }

    return { ok: true, session };
}