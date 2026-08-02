import { auth } from "@/lib/better-auth/auth";
import { getServerSession } from "@/lib/better-auth/isAuthenticated";
import { headers } from "next/headers";

export async function getUserPasswordStatus() {
    const session = await getServerSession();

    if (!session) return null;

    const userAccounts = await auth.api.listUserAccounts({
        headers: await headers(),
    });

    const hasPassword = userAccounts.some(
        (acc) => acc.providerId === "credential"
    );


    return {
        hasPassword, // true -> Change Password | false -> Set Password
    };
}