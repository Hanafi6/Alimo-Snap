"use client";

import { useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import { type SessionData } from "../NavBarClient";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ButtonAuth as Button } from "./buttonAuth";
import { useLogout } from "@/features/auth/hooks/useQuickLogin";

interface ButtonsAuthProps {
    className?: string;
    session: SessionData | null;
    isPending: boolean;
}

const SkeletonButton = ({ width = "w-24" }: { width?: string }) => (
    <div className={`h-9 ${width} rounded-md bg-muted animate-pulse`} />
);

export default function ButtonsAuth({
    className,
    session,
    isPending,
}: ButtonsAuthProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [routrPindeing, startTransition] = useTransition();
    const { handleLogout, isLoading: isLogoutLoading } = useLogout();



    const isRegisterPage = pathname === "/register";

    const Navigate = (path: string, router: AppRouterInstance) => {
        startTransition(() => {
            router.push(path);
        });
    };

    // 1. ===== Loading State =====
    if (isPending) {
        if (session && !session.user?.isAnonymous) return null;

        return (
            <div className={`flex items-center gap-2 ${className ?? ""}`}>
                {!isRegisterPage && <SkeletonButton width="w-28" />}
            </div>
        );
    }

    if (session && !session.user?.isAnonymous) {
        return null;
    }

    if (session?.user?.isAnonymous) {
        return (
            <div className={`flex items-center gap-2 ${className ?? ""}`}>
                {!isRegisterPage && (
                    <>
                        <Button
                            content="Complete Registration"
                            onClick={() => router.replace("/register")}
                            className="bg-primary text-primary-foreground hover:bg-primary/90 border-transparent"
                        />
                        <Button
                            content="LogOut"
                            disabled={isLogoutLoading}
                            onClick={() => {
                                handleLogout()
                            }}
                            className="bg-primary text-primary-foreground hover:bg-primary/90 border-transparent"
                        />
                    </>
                )}
            </div>
        );
    }

    return (
        <div className={`flex items-center gap-2 ${className ?? ""}`}>
            {!isRegisterPage && (
                <Button
                    content="Register"
                    disabled={routrPindeing}
                    isloding={routrPindeing}
                    onClick={() => Navigate("/register", router)}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 border-transparent"
                />
            )}
        </div>
    );
}