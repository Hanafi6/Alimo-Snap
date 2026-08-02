import type { Product } from "@/generated/prisma/client";
import { ProductCard } from "./ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductGridProps {
    products: Product[];
    isLoading: boolean;
}

export function ProductGrid({ products, isLoading }: ProductGridProps) {

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="flex flex-col space-y-3 rounded border borderborder p-4">
                        <Skeleton className="h-48 w-full rounded bg-muted" />
                        <Skeleton className="h-6 w-3/4 bg-muted" />
                        <Skeleton className="h-4 w-full bg-muted" />
                        <Skeleton className="h-10 w-full rounded bg-muted" />
                    </div>
                ))}
            </div>
        );
    }


    if (products?.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center rounded border border-dashed  bg-accent-bg">
                <h3 className="text-lg font-semibold text-custom-text-h">No products found</h3>
                <p className="text-sm text-muted-foreground mt-1">Check back later or populate your database.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}