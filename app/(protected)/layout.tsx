import { getSessionServer } from "@/lib/session";
import { redirect } from "next/navigation";
import { MeshBackground } from "../DynamicMeshBackground";

export default async function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSessionServer();


    if (session?.user.isAnonymous) {
        redirect("/register");
    }

    if (!session) {
        redirect("/login");
    }
    return <MeshBackground>
        <div className='relative flex min-h-screen flex-col w-full'>
            {children}
        </div>
    </MeshBackground>;
}