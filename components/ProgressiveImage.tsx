"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";

interface ProgressiveImageProps extends Omit<ImageProps, "onLoad"> {
    fallbackSrc?: string;
}

const DEFAULT_BLUR_PLACEHOLDER =
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'><filter id='b'><feGaussianBlur stdDeviation='8'/></filter><rect width='100%' height='100%' fill='%23f3f4f6' opacity='0.6'/><g filter='url(%23b)'><rect width='100%' height='100%' fill='%23e5e7eb' opacity='0.4'/></g></svg>";

export const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
    src,
    alt,
    className = "",
    placeholder = "blur",
    blurDataURL = DEFAULT_BLUR_PLACEHOLDER,
    ...props
}) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className="relative overflow-hidden bg-slate-100/70 rounded-xl w-full h-full">
            {!isLoaded && (
                <div
                    aria-hidden="true"
                    className="absolute inset-0 z-10 animate-pulse bg-gradient-to-r from-slate-200/40 via-slate-100/60 to-slate-200/40 backdrop-blur-sm transition-opacity duration-500"
                />
            )}

            <Image
                src={src}
                alt={alt}
                placeholder={placeholder}
                blurDataURL={blurDataURL}
                onLoad={() => setIsLoaded(true)}
                className={`transition-all duration-500 ease-in-out ${isLoaded
                    ? "opacity-100 scale-100 blur-0"
                    : "opacity-0 scale-102 blur-md"
                    } ${className}`}
                {...props}
            />
        </div>
    );
};