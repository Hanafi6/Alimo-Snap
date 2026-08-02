"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Send,
    ShieldCheck,
    Truck,
    RefreshCw,
    CreditCard,
    CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribeToNewsletter } from "@/hooks/newsletter";

// 💡 1. SVG Components للـ Custom Social Icons
const GithubIcon = ({ className }: { className?: string }) => (
    <svg
        className={className}
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
    >
        <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
        />
    </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
    <svg
        className={className}
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
    >
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
    </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
    <svg
        className={className}
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
    >
        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
    </svg>
);

export function Footer() {
    const [email, setEmail] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsLoading(true);

        const res = await subscribeToNewsletter(email);

        setIsLoading(false);

        if (res.success) {
            setIsSubscribed(true);
            setEmail("");
            setTimeout(() => {
                setIsSubscribed(false);
            }, 5000);
        } else {
            alert("Something went wrong while sending the email.");
        }
    };

    return (
        <footer className="relative overflow-hidden bg-transparent border-t border-border pt-10 md:pt-16 pb-8">
            <div
                className="absolute inset-0 pointer-events-none dark:opacity-40"
                style={{
                    backgroundImage: `linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)`,
                    backgroundSize: "32px 32px",
                }}
            />

            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                {/* ================= 1. Features Grid ================= */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-8 md:pb-12 mb-8 md:mb-12 border-b border-border">
                    {[
                        { icon: Truck, title: "Free Express Shipping", desc: "On orders over $100" },
                        { icon: ShieldCheck, title: "100% Secure Checkout", desc: "Protected by Better-Auth" },
                        { icon: RefreshCw, title: "30-Day Money Back", desc: "Hassle-free returns" },
                        { icon: CreditCard, title: "Flexible Payment", desc: "All major cards accepted" },
                    ].map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3.5 p-2 rounded-lg transition-colors hover:bg-accent/30">
                            <div className="p-2.5 rounded-xl bg-custom-accent-bg border border-custom-accent-border text-custom-text-h shrink-0">
                                <feature.icon className="w-5 h-5" />
                            </div>
                            <div>
                                <h5 className="font-bold text-sm text-custom-text-h">{feature.title}</h5>
                                <p className="text-xs text-muted-foreground">{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ================= 2. Links & Newsletter Grid ================= */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-10 md:pb-12">

                    {/* AlimoSnap Brand & Newsletter */}
                    <div className="sm:col-span-2 space-y-4">
                        <Link
                            href="/"
                            className="inline-block text-2xl font-black text-custom-text-h tracking-tight font-heading"
                        >
                            Alimo<span className="text-chart-1">Snap</span>.
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                            Your modern destination for premium gadgets, ergonomic workspace setups, and high-performance tech accessories.
                        </p>

                        <div className="pt-2">
                            <h5 className="text-xs font-bold uppercase tracking-wider text-custom-text-h mb-2.5">
                                Subscribe to our newsletter
                            </h5>

                            {isSubscribed ? (
                                <div className="flex items-center gap-2 p-2.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-medium max-w-sm">
                                    <CheckCircle className="w-4 h-4 shrink-0" />
                                    <span>Thanks for subscribing! Check your inbox soon.</span>
                                </div>
                            ) : (
                                <form
                                    onSubmit={handleSubscribe}
                                    className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-sm"
                                >
                                    <Input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="rounded-radius border-border bg-background/80 text-sm focus-visible:ring-1 focus-visible:ring-ring"
                                    />
                                    <Button
                                        type="submit"
                                        className="rounded bg-primary text-primary-foreground shrink-0 hover:opacity-90 flex items-center justify-center gap-2"
                                    >
                                        <Send className="w-4 h-4" />
                                        <span className="sm:hidden text-xs">Subscribe</span>
                                    </Button>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Column 1: Navigation */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-bold text-custom-text-h uppercase tracking-wider">Navigation</h4>
                        <ul className="space-y-2.5 text-sm text-muted-foreground">
                            {["Home", "Products", "Profile", "Settings"].map((item) => (
                                <li key={item}>
                                    <Link
                                        href={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
                                        className="hover:text-custom-text-h transition-colors inline-block py-0.5"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 2: Categories */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-bold text-custom-text-h uppercase tracking-wider">Categories</h4>
                        <ul className="space-y-2.5 text-sm text-muted-foreground">
                            {[
                                "Audio & Headphones",
                                "Keyboards & Gear",
                                "Ergonomic Chairs",
                                "Monitors & Displays",
                                "Accessories",
                            ].map((item) => (
                                <li key={item}>
                                    <Link
                                        href="/products"
                                        className="hover:text-custom-text-h transition-colors inline-block py-0.5"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Connect & Socials */}
                    <div className="space-y-3 sm:col-span-2 lg:col-span-1">
                        <h4 className="text-sm font-bold text-custom-text-h uppercase tracking-wider">Connect</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Have questions? Reach out to our 24/7 support team.
                        </p>
                        <div className="flex items-center gap-2.5 pt-1">
                            {[
                                { icon: GithubIcon, href: "https://github.com/Hanafi", label: "GitHub" },
                                { icon: LinkedinIcon, href: "https://www.linkedin.com/in/mahmoud-ahmed-64641a351/", label: "LinkedIn" },
                                { icon: FacebookIcon, href: "https://www.facebook.com/MahmouDAhmeD8D", label: "Facebook" },
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={social.label}
                                    className="p-2.5 rounded-xl bg-custom-social-bg border border-border text-custom-text-h hover:bg-custom-accent-bg hover:border-custom-accent-border transition-all duration-200"
                                >
                                    <social.icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                </div>

                {/* ================= 3. Bottom Bar ================= */}
                <div className="pt-8 border-t border-border flex flex-col-reverse sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground text-center sm:text-left">
                    <p>© {new Date().getFullYear()} AlimoSnap Inc. All rights reserved.</p>
                    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                        <Link href="#" className="hover:text-custom-text-h transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-custom-text-h transition-colors">Terms of Service</Link>
                        <Link href="#" className="hover:text-custom-text-h transition-colors">Cookies Settings</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}