"use client";

import { ArrowBigLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

interface BackToHomeProps extends ComponentPropsWithoutRef<"button"> {
    className?: string;
}

export default function BackToHomBtn({ className, onClick, ...props }: BackToHomeProps) {
    const router = useRouter();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (onClick) {
            onClick(e);
        } else {
            if (e.altKey) {
                router.push('/dashboard');
            }
            router.back();
        }
    };

    return (
        <button
            type="button"
            title="Go back to home"
            onClick={handleClick}
            className={cn(
                "inline-flex items-center justify-center p-2 rounded-md transition-all duration-300 ease-in-out hover:scale-110 focus:outline-none",
                className
            )}
            {...props}
        >
            <ArrowBigLeft className="w-6 h-6" />
        </button>
    );
}