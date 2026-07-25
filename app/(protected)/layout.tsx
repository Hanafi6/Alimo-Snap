import { auth } from "@/lib/better-auth/auth";
import { getSessionServer } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const session = await getSessionServer();




    if (!session || session.user.isAnonymous) {
        redirect("/register");
    }

    return <>{children}</>;
}