import Link from "next/link";
import { ShieldCheck, Truck, RotateCcw, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroSection } from "./hero-section";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-clints"; // مسار الـ cache(getQueryClient) بتاعك
import { FeaturedProductsList } from "./featured-products-list";
import type { Product } from "@/generated/prisma/client";
import { apiClient } from "@/services/apiClient";

const queryClient = getQueryClient();

export default async function HomePage() {

    await queryClient.prefetchQuery({
        queryKey: ["products"],

        queryFn: ({ signal }) => apiClient.getAll<Product[]>("/api/products", {
            signal,
            next: { revalidate: 60, tags: ['products'] },

        }),
    });

    return (
        <div className="flex flex-col gap-16 pb-16">
            <HeroSection />

            {/* VALUE PROPOSITIONS */}
            <section className="container mx-auto max-w-7xl px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { icon: Truck, title: "Fast Shipping", desc: "Order before 2 PM for same day dispatch" },
                        { icon: ShieldCheck, title: "Secure Checkout", desc: "Encrypted payments & route security" },
                        { icon: RotateCcw, title: "30 Days Return", desc: "Hassle-free guarantee on all items" },
                        { icon: Headphones, title: "24/7 Support", desc: "Dedicated help whenever you need" },
                    ].map((item, idx) => (
                        <div
                            key={idx}
                            className="flex items-start gap-4 p-5 rounded-2xl border border-border bg-card shadow-sm"
                        >
                            <item.icon className="w-8 h-8 text-primary shrink-0 mt-1" />
                            <div>
                                <h4 className="font-bold text-foreground text-base">{item.title}</h4>
                                <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <HydrationBoundary state={dehydrate(queryClient)}>
                <section className="container mx-auto max-w-7xl px-4">
                    <FeaturedProductsList />
                </section>
            </HydrationBoundary>
        </div>
    );
}