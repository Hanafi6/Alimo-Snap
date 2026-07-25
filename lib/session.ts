import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";

export const getSessionServer = async () =>
    auth.api.getSession({
        headers: await headers(),
    });