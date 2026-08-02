interface ProductsHeaderProps {
    totalCount: number;
}

export function ProductsHeader({ totalCount }: ProductsHeaderProps) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border)] mb-8">
            <div>
                <h1 className="text-3xl font-extrabold text-[var(--text-h)] font-[var(--heading)] tracking-tight">
                    Featured Products
                </h1>
                <p className="text-sm text-[var(--muted-foreground)] mt-1">
                    Explore our collection of high-quality items.
                </p>
            </div>
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[var(--accent-bg)] text-[var(--text-h)] border border-[var(--accent-border)]">
                Total Items: {totalCount}
            </div>
        </div>
    );
}