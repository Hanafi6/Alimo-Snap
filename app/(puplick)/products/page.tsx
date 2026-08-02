import { Product } from '@/generated/prisma/client';
import { getQueryClient } from '@/lib/query-client';
import { apiClient } from '@/services/apiClient';
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import ProductsPage from './ProjectsClints';


async function page() {
    const queryClient = getQueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["products"],

        queryFn: ({ signal }) => apiClient.getAll<Product[]>("/api/products", {
            signal,
            next: { revalidate: 60, tags: ['products'] },

        }),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <section className="w-full mx-auto max-w-7xl px-4">
                <ProductsPage />
            </section>
        </HydrationBoundary>
    )
}

export default page