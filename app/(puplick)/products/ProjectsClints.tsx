"use client"
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductsHeader } from "@/components/products/ProductsHeader";
import { useProducts } from "@/hooks/useProducts";

export default function ProductsPage() {
    const { products, error, isLoading } = useProducts();

    if (error) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex flex-col items-center justify-center p-12 text-center rounded border border-dashed bg-accent-bg">
                    <h3 className="text-lg font-semibold text-[var(--text-h)]">حصل خطأ أثناء تحميل المنتجات</h3>
                    <p className="text-sm text-muted-foreground mt-1">حاول تعمل ريفريش تاني.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <ProductsHeader totalCount={products?.length ?? 0} />
            <ProductGrid products={products ?? []} isLoading={isLoading} />
        </div>
    );
}