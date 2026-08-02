"use client";

import { cn } from "@/lib/utils";
import { SessionData } from "../NavBarClient";
import Taps from "../component/Taps";

export const links = [
    { title: "Home", href: "/" },
    { title: "Products", href: "/products" },
];

interface Props {
    session: SessionData | null;
    isPending: boolean;
    className?: string;

}

export default function TapsMeneu({
    session,
    isPending,
    className,

}: Props) {

    return (
        <div className={cn("hidden md:flex items-center gap-6", className)}>
            <Taps className="" links={links} isPending={isPending} />
        </div>
    );
}