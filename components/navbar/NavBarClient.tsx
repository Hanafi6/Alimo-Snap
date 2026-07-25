"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { HatGlasses, Moon, Sun, User } from "lucide-react";
import Link from "next/link";
import ButtomsAuth from "./component/ButtomsAuth";
import { authClient } from "@/lib/better-auth/auth-client";
import TapsMeneu from "./UserActions/AuthenticatedActions";


export type SessionData = typeof authClient.$Infer.Session;

export type user = SessionData['user'];
export type session = SessionData['session'];


export default function NavbarClient() {
    const { theme, setTheme } = useTheme();
    const isDark = theme === "dark";

    const { data: Sessions, isPending } = authClient.useSession();
    const [mounted, setMounted] = useState<boolean>(false);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);

        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`
            sticky top-0 z-50 w-full bg-primary-foreground
            border-b
            transition-all duration-300
            ${isScrolled
                    ? "bg-background/80 backdrop-blur-xl border-border shadow-sm"
                    : "bg-background border-transparent"
                }
        `}
        >
            <div className="mx-auto flex h-16 max-w-7xl gap-5 items-center px-4 md:px-6">

                {/* Logo */}
                <Link
                    href="/"
                    className="flex shrink-0 items-center gap-1 text-xl font-bold tracking-tight"
                >
                    Alimo
                    <span className="text-chart-3">Snap</span>
                </Link>

                {/* Right Side */}
                <div className="ml-auto flex flex-1 items-center justify-end gap-6">

                    <TapsMeneu
                        session={Sessions}
                        isPending={isPending}
                        className="mr-auto"
                    />
                    <ButtomsAuth isPending={isPending} session={Sessions} />

                    <div className="flex items-center gap-2 flex-row border border-custom-text rounded-lg p-1">
                        <IconOfProfile
                            session={Sessions}
                            isPending={isPending}
                        />
                        <ButtonToogleTheme
                            mounted={mounted}
                            isDark={isDark}
                            setTheme={setTheme}
                        />
                    </div>
                </div>

            </div>
        </header>
    );
}


interface Props {
    session: SessionData | null;
    isPending: boolean;
}

function IconOfProfile({
    session,
    isPending,
}: Props) {
    if (isPending && !session) {
        return (
            <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />
        );
    }

    if (!session) return null;

    return (
        <div
            className="
      flex
      h-9
      w-9
      items-center
      justify-center
      rounded-full
      border
      border-border
      bg-muted
      shadow-sm
    "
        >
            {session.user.isAnonymous ? (
                <HatGlasses className="h-4 w-4" />
            ) : (
                <User className="h-4 w-4" />
            )}
        </div>
    );
}


const ButtonToogleTheme = ({
    setTheme,
    isDark,
    mounted,
}: {
    setTheme: (value: string) => void;
    isDark: boolean;
    mounted: boolean;
}) => {
    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="
        flex h-9 w-9 items-center justify-center
        rounded-lg
        border border-border
        bg-background
        transition-all duration-200
        hover:bg-accent
        hover:shadow-sm
        active:scale-95"
            aria-label="Toggle Theme"
        >
            {/* 💡 لو لسه مش mounted بنرندر مساحة فاضية بنفس الأبعاد بالظبط لمنع حركة العناصر اللحظية */}
            {!mounted ? (
                <div className="w-4 h-4" />
            ) : isDark ? (
                <Sun className="w-4 h-4 text-custom-text animate-in fade-in duration-200" />
            ) : (
                <Moon className="w-4 h-4 text-primary animate-in fade-in duration-200" />
            )}
        </button>
    );
};