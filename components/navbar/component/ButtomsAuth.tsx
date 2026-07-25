"use client";

import { ReactNode } from "react";
import { authClient } from "@/lib/better-auth/auth-client";
import { useRouter, usePathname } from "next/navigation";
import { type SessionData } from "../NavBarClient";
import { LogOut } from "lucide-react";

interface LogoutButtonProps {
    className?: string;
    session: SessionData | null;
    isPending: boolean;
}

interface ButtonProps {
    className?: string;
    content: ReactNode;
    onClick?: () => void;
    disabled?: boolean;
}

const Button = ({
    className,
    content,
    onClick,
    disabled = false,
}: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
        h-9
        px-3
        rounded-md
        border
        bg-card
        text-sm
        font-medium
        transition-all
        duration-200
        hover:bg-accent
        hover:text-white
        disabled:cursor-not-allowed
        ${className ?? ""}
      `}
        >
            {content}
        </button>
    );
};

const SkeletonButton = ({
    width = "w-20",
}: {
    width?: string;
}) => {
    return (
        <div
            className={`
        h-9
        ${width}
        rounded-md
        bg-muted
        animate-pulse
      `}
        />
    );
};

const SkeletonIcon = () => {
    return (
        <div className="h-9 w-9 rounded-md bg-muted animate-pulse" />
    );
};

export default function ButtomsAuth({
    className,
    session,
    isPending,
}: LogoutButtonProps) {
    const router = useRouter();
    const pathname = usePathname();

    const isRegisterPage = pathname === "/register";

    const isLoginPage = pathname === "/login";

    const handleLogout = async () => {
        try {
            await authClient.signOut();

            router.push("/login");
            router.refresh();
        } catch (error) {
            console.error(error);
        }
    };

    // ===== Loading Skeleton =====
    if (isPending) {
        return (
            <div className={`flex items-center gap-2 ${className ?? ""}`}>
                {session ? (
                    <SkeletonIcon />
                ) : (
                    <>
                        {!isLoginPage && <SkeletonButton width="w-16" />}
                        {!isRegisterPage && <SkeletonButton width="w-24" />}
                    </>
                )}
            </div>
        );
    }

    // ===== User Logged In =====
    if (session && session?.user?.isAnonymous) {
        return (
            <>
                {!isRegisterPage && (
                    <Button
                        content="Complete Registration"
                        onClick={() => router.push("/register")}
                        className="bg-primary text-primary-foreground hover:bg-primary/90 border-transparent"
                    />)}
                <Button
                    content={<LogOut className="h-4 w-4" />}
                    onClick={handleLogout}
                    className="hover:bg-destructive hover:text-destructive-foreground"
                />
            </>
        );
    }
    // ===== Guest =====

    if (session) {
        return (
            <Button
                content={<LogOut className="h-4 w-4" />}
                onClick={handleLogout}
                className="hover:bg-destructive hover:text-destructive-foreground"
            />
        );
    }
    return (
        <div className={`flex items-center gap-2 ${className ?? ""}`}>
            {!isRegisterPage && (
                <Button
                    content="Register"
                    onClick={() => router.push("/register")}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 border-transparent"
                />
            )}

        </div>
    );
}