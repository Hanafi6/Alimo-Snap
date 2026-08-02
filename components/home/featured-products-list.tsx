"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/ProductCard";
import { apiClient } from "@/services/apiClient";
import type { Product } from "@/generated/prisma/client";

export function FeaturedProductsList() {
    // نفس الـ queryKey اللي اتعمله prefetch فوق بالضبط!
    const { data: featuredProducts = [] } = useQuery({
        queryKey: ["products"],
        queryFn: () => apiClient.getAll<Product>("/api/products"),
    });

    // بناخد أول 4 منتجات للـ Featured
    const displayedProducts = featuredProducts.slice(0, 4);

    return (
        <>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-foreground">Featured Collection</h2>
                    <p className="text-sm text-muted-foreground">Top rated picks by our community</p>
                </div>
                <Button variant="outline" asChild className="border-border">
                    <Link href="/products">View All ({displayedProducts.length}+)</Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {displayedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </>
    );
}