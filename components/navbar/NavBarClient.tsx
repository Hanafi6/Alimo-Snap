"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { HatGlasses, Moon, Sun, User } from "lucide-react";
import Link from "next/link";
import ButtonsAuth from "./component/ButtomsAuth";
import { authClient } from "@/lib/better-auth/auth-client";
import TapsMeneu from "./UserActions/AuthenticatedActions";
import BackToHomBtn from "../back-to-home-btn";
import useHasMounted from "@/hooks/useHasMounted";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export type SessionData = typeof authClient.$Infer.Session;
export type UserData = SessionData["user"];
export type SessionInfo = SessionData["session"];

interface IconOfProfileProps {
    session: SessionData | null;
    isPending: boolean;
    className?: string;
    onClick?: () => void
}

export default function NavbarClient() {
    const { theme, setTheme } = useTheme();
    const { data: session, isPending } = authClient.useSession();

    const moutnt = useHasMounted()
    const route = useRouter();

    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    useEffect(() => {

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

    const isDark = theme === "dark";

    return (
        <header
            className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${isScrolled
                ? "bg-background/80 backdrop-blur-xl border-border shadow-sm"
                : "bg-background border-transparent"
                }`}
        >
            <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 md:px-6">

                <BackToHomBtn className="flex sm:hidden" />

                <Link
                    href="/"
                    className="flex shrink-0 items-center gap-1 text-xl font-bold tracking-tight"
                >
                    Alimo
                    <span className="text-chart-3">Snap</span>
                </Link>

                <div className="ml-auto flex flex-1 items-center justify-end gap-3 md:gap-6">
                    <TapsMeneu
                        session={session}
                        isPending={isPending}
                        className="mr-auto"
                    />

                    <ButtonsAuth isPending={isPending} session={session} />

                    <div className="flex items-center gap-2 border border-border rounded-lg p-1 bg-card/50">
                        <IconOfProfile className="cursor-pointer" onClick={() => route.push('/profile')} session={session} isPending={isPending} />
                        {
                            moutnt ? (
                                <ButtonToggleTheme
                                    isDark={isDark}
                                    setTheme={setTheme}
                                />
                            ) : (
                                <span className="h-10 w-16 rounded bg-muted animate-pulse" />
                            )
                        }

                    </div>
                </div>

            </div>
        </header>
    );
}

function IconOfProfile({ session, isPending, onClick, className, ...props }: IconOfProfileProps) {
    if (isPending && !session) {
        return <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />;
    }

    if (!session) return null;

    return (
        <div {...props} className={cn('flex h-9 w-9 items-center justify-center rounded-full border border-border bg-muted shadow-sm', className)} onClick={onClick}>
            {session.user.isAnonymous ? (
                <HatGlasses className="h-4 w-4" />
            ) : (
                <User className="h-4 w-4" />
            )}
        </div>
    );
}

function ButtonToggleTheme({
    setTheme,
    isDark,
}: {
    setTheme: (value: string) => void;
    isDark: boolean;
}) {
    return (
        <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background transition-all duration-200 hover:bg-accent hover:shadow-sm active:scale-95"
            aria-label="Toggle Theme"
        >
            {
                isDark ? (
                    <Sun className="w-4 h-4 text-primary animate-in fade-in duration-200" />
                ) : (
                    <Moon className="w-4 h-4 text-primary animate-in fade-in duration-200" />
                )}
        </button>
    );
}