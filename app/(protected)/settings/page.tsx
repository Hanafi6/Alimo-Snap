import React from "react";
import { redirect } from "next/navigation";
import SettingsClient from "./SettingClient";
import BackToHomeBtn from "@/components/back-to-home-btn";
import { getServerSession } from "@/lib/better-auth/isAuthenticated";
import { getUserPasswordStatus } from "@/components/sitting/getUserPasswordStatus";

export type AuthStatus = "OAuth" | "EmailAndPassword";

export default async function SettingsPage() {
    const session = await getServerSession();

    if (!session || !session.user || session.user.isAnonymous) {
        redirect("/login?callbackUrl=/settings");
    }

    if (!session) redirect('/')

    const pwdStatus = await getUserPasswordStatus();

    const status: AuthStatus = pwdStatus?.hasPassword ? "EmailAndPassword" : "OAuth";

    return (
        <div className="min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8 flex justify-center items-start">
            <div className="w-full max-w-4xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
                    <div className="space-y-1">
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                            الإعدادات
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            إدارة بيانات حسابك وكلمة المرور.
                        </p>
                    </div>
                    <BackToHomeBtn className="self-start sm:self-auto" />
                </div>

                <SettingsClient session={session} status={status} />
            </div>
        </div>
    );
}