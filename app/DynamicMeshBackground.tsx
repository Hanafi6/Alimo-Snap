import React from "react";

export function MeshBackground({ children }: { children?: React.ReactNode }) {
    return (
        <div className="relative w-full overflow-hidden bg-mesh-bg transition-colors duration-500">

            <div
                className="absolute inset-0 opacity-100 filter blur-[80px] pointer-events-none transition-all duration-500"
                style={{
                    background: `
            radial-gradient(circle at 90% 10%, var(--mesh-color-2) 0%, transparent 45%),
            radial-gradient(circle at 10% 20%, var(--mesh-color-1) 0%, transparent 50%),
            radial-gradient(circle at 50% 80%, var(--mesh-color-3) 0%, transparent 55%)
          `
                }}
            />

            <div
                className="absolute inset-0 mix-blend-overlay pointer-events-none transition-opacity duration-500"
                style={{
                    opacity: "var(--mesh-grain-opacity)",
                    backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='noise'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23noise)'/></svg>")`
                }}
            />

            <div className="relative z-10">{children}</div>
        </div>
    );
}