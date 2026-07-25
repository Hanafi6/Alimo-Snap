import { auth } from "@/lib/better-auth/auth";
import Section from "./Section"
import { headers } from "next/headers";
import { redirect } from "next/navigation";

async function page() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) return;

    if (!session.user.isAnonymous) {
        redirect("/register");
    }
    return (
        <div>dash Bord
            <Section />
        </div>
    )
}

export default page;