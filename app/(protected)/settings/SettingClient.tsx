"use client";

import { useState } from "react";
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
import { AuthStatus } from "./page";

import { SetPasswordModal } from "./SetPasswordModal";
import { ChangePasswordModal } from "./ChangePasswordModal";
import useHasMounted from "@/hooks/useHasMounted";

interface IPropsPage {
    session: any;
    status: AuthStatus;
}

export default function SettingsClient({ session, status }: IPropsPage) {
    const router = useRouter();
    const { handleLogout, isLoading: isLogoutLoading } = useLogout();
    const [showSetPasswordModal, setShowSetPasswordModal] = useState(false);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const hasMounted = useHasMounted();

    const { theme, setTheme } = useTheme();

    const isDark = theme === "dark";
    const user = session?.user;
    const isOAuth = status === "OAuth";

    return (
        <div className="space-y-6">
            <div className="bg-card text-card-foreground shadow-sm rounded-2xl border border-border divide-y divide-border overflow-hidden">

                {/* Profile Info */}
                <div className="p-5 sm:p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {user?.image ? (
                            <img src={user.image} alt={user?.name || "User"} className="w-12 h-12 rounded-full border" />
                        ) : (
                            <div className="p-3 bg-primary/10 text-primary rounded-xl">
                                <User className="w-6 h-6" />
                            </div>
                        )}
                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="text-base font-semibold">{user?.name || "المستخدم"}</h2>
                                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-accent text-accent-foreground border border-border">
                                    {isOAuth ? "Social Account (No Password)" : "Email & Password"}
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
                                {isOAuth
                                    ? "حسابك لا يحتوي على كلمة سر. عيّنها عشان تقدر تدخل بيها."
                                    : "غيّر كلمة السر الخاصة بحسابك"}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => isOAuth ? setShowSetPasswordModal(true) : setShowChangePasswordModal(true)}
                        className="flex items-center gap-1.5 text-xs sm:text-sm font-medium bg-secondary hover:bg-secondary/80 text-secondary-foreground px-3.5 py-2 rounded-xl transition border border-border shrink-0"
                    >
                        <KeyRound className="w-4 h-4" />
                        {isOAuth ? "تعيين كلمة سر" : "تغيير كلمة السر"}
                    </button>
                </div>

                <SetPasswordModal open={showSetPasswordModal} onClose={() => setShowSetPasswordModal(false)} />
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
                            <p className="text-xs sm:text-sm text-muted-foreground">المظهر الحالي: {theme}</p>
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