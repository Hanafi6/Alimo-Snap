"use client";

import { usePathname } from "next/navigation";
import { Footer } from "../footer";

export default function GlopalFooter() {
    const pathname = usePathname();

    const isAuthRoute =
        pathname.startsWith("/login") ||
        pathname.startsWith("/register") ||
        pathname.startsWith("/forgot-password") ||
        pathname.startsWith("/reset-password") ||
        pathname.startsWith("/verify-email") ||
        pathname.startsWith('/settings');

    const segments = pathname.split("/").filter(Boolean);
    const isNestedRoute = segments.length > 1;

    if (isAuthRoute || isNestedRoute) {
        return null;
    }

    return <Footer />;
}
