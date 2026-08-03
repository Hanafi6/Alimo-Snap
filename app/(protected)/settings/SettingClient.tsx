"use client";

import { useState, useEffect } from "react";
import {
    User,
    Lock,
    LogOut,
    Moon,
    Sun,
    KeyRound,
} from "lucide-react";
import { useLogout } from "@/features/auth/hooks/useQuickLogin";
import { ButtonAuth } from "@/components/navbar/component/buttonAuth";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

import { SetPasswordModal } from "./SetPasswordModal";
import { ChangePasswordModal } from "./ChangePasswordModal";
import useHasMounted from "@/hooks/useHasMounted";
import { authClient } from "@/lib/better-auth/auth-client";
import { SessionData } from "@/components/navbar/NavBarClient";

interface IPropsPage {
    session: SessionData | null;
}

export default function SettingsClient({ session }: IPropsPage) {
    const router = useRouter();
    const { handleLogout, isLoading: isLogoutLoading } = useLogout();
    const [showSetPasswordModal, setShowSetPasswordModal] = useState(false);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const hasMounted = useHasMounted();

    const { theme, setTheme } = useTheme();

    const [accounts, setAccounts] = useState<any[]>([]);

    const [isAccountsLoading, setIsAccountsLoading] = useState(true);

    useEffect(() => {
        async function fetchAccounts() {
            try {
                const res = await authClient.listAccounts();
                if (res.data) {
                    setAccounts(res.data);
                }
            } catch (err) {
                console.error("Error retrieving accounts:", err);
            } finally {
                setIsAccountsLoading(false);
            }
        }
        fetchAccounts();
    }, []);

    const hasPassword = accounts.some((acc: { providerId: string }) => acc.providerId === "credential");

    const isDark = theme === "dark";
    const user = session?.user;

    const onSuccess = () => {
        authClient.listAccounts().then((res) => {
            if (res.data) setAccounts(res.data);
        });
        router.refresh();
    };

    return (
        <div className="space-y-6">
            <div className="bg-card text-card-foreground shadow-sm rounded-2xl border border-border divide-y divide-border overflow-hidden">

                {/* Profile Info */}
                <div className="p-5 sm:p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {user?.image ? (
                            <img src={user.image} alt={user?.name || "المستخدم"} className="w-12 h-12 rounded-full border" />
                        ) : (
                            <div className="p-3 bg-primary/10 text-primary rounded-xl">
                                <User className="w-6 h-6" />
                            </div>
                        )}
                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="text-base font-semibold">{user?.name || "المستخدم"}</h2>
                                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-accent text-accent-foreground border border-border">
                                    {isAccountsLoading
                                        ? "Lodding"
                                        : hasPassword
                                            ? "Email And Password"
                                            : "Gmail    "}
                                </span>
                            </div>
                            <p className="text-xs sm:text-sm text-muted-foreground">{user?.email}</p>
                        </div>
                    </div>
                </div>

                {/* Security Section */}
                <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-emerald-500/10 text-emerald-600 rounded-xl">
                            <Lock className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-base font-semibold">الأمان وكلمة السر</h2>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                                {hasPassword
                                    ? "غيّر كلمة السر الخاصة بحسابك"
                                    : "حسابك لا يحتوي على كلمة سر. عيّنها الآن حتى تتمكن من الدخول بها."}
                            </p>
                        </div>
                    </div>

                    <button
                        disabled={isAccountsLoading}
                        onClick={() => hasPassword ? setShowChangePasswordModal(true) : setShowSetPasswordModal(true)}
                        className="flex items-center gap-1.5 text-xs sm:text-sm font-medium bg-secondary hover:bg-secondary/80 text-secondary-foreground px-3.5 py-2 rounded-xl transition border border-border shrink-0 disabled:opacity-50"
                    >
                        <KeyRound className="w-4 h-4" />
                        {hasPassword ? "تغيير كلمة السر" : "تعيين كلمة السر"}
                    </button>
                </div>

                <SetPasswordModal onSuccess={onSuccess} open={showSetPasswordModal} onClose={() => setShowSetPasswordModal(false)} />
                <ChangePasswordModal open={showChangePasswordModal} onClose={() => setShowChangePasswordModal(false)} />

                {/* Theme Toggle */}
                <div className="p-5 sm:p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-amber-500/10 text-amber-600 rounded-xl">
                            {!hasMounted ? (
                                <div className="w-6 h-6" />
                            ) : isDark ? (
                                <Moon className="w-6 h-6" />
                            ) : (
                                <Sun className="w-6 h-6" />
                            )}
                        </div>
                        <div>
                            <h2 className="text-base font-semibold">مظهر التطبيق</h2>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                                المظهر الحالي: {!hasMounted ? "جاري التحميل..." : isDark ? "الداكن (Dark)" : "المضيء (Light)"}
                            </p>
                        </div>
                    </div>
                    <button onClick={() => setTheme(isDark ? "light" : "dark")} className="p-2.5 rounded-xl border bg-secondary">
                        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                </div>

                {/* Logout */}
                <div className="p-5 sm:p-6 bg-destructive/5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-destructive/10 text-destructive rounded-xl">
                                <LogOut className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-base font-semibold text-destructive">تسجيل الخروج</h2>
                                <p className="text-xs sm:text-sm text-muted-foreground">إنهاء الجلسة الحالية</p>
                            </div>
                        </div>
                        <ButtonAuth
                            content="logOut"
                            disabled={isLogoutLoading}
                            isloding={isLogoutLoading}
                            onClick={async () => {
                                await handleLogout();
                                router.replace("/");
                            }}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}