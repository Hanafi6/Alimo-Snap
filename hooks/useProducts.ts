// import { useEffect, useState } from "react";
// import type { Product } from "@/generated/prisma/client";
// import type { ApiResponseSuccess, ApiResponseError } from "@/lib/types";

// interface UseProductsReturn {
//     products: Product[];
//     product: Product | null;
//     isLoading: boolean;
//     error: string | null;
// }

// export function useProducts(id?: string | string[]): UseProductsReturn {
//     const [products, setProducts] = useState<Product[]>([]);
//     const [product, setProduct] = useState<Product | null>(null);
//     const [isLoading, setIsLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const controller = new AbortController();
//         const signal = controller.signal;

//         async function fetchData() {
//             setIsLoading(true);
//             setError(null);

//             try {
//                 if (id) {
//                     const response = await fetch(`/api/products/${id}`, { signal, next: { revalidate: 60 * 4 } });
//                     const resData: ApiResponseSuccess<Product> | ApiResponseError = await response.json();

//                     if (!response.ok) {
//                         const errorPayload = resData as ApiResponseError;
//                         throw new Error(errorPayload.message || "Product not found");
//                     }

//                     const successPayload = resData as ApiResponseSuccess<Product>;
//                     setProduct(successPayload.data);
//                     setProducts([]);
//                 } else {
//                     // Fetch List of Products
//                     const response = await fetch("/api/products", { signal });
//                     const resData: ApiResponseSuccess<Product[]> | ApiResponseError = await response.json();

//                     if (!response.ok) {
//                         const errorPayload = resData as ApiResponseError;
//                         throw new Error(errorPayload.message || "Failed to fetch products");
//                     }

//                     const successPayload = resData as ApiResponseSuccess<Product[]>;
//                     setProducts(successPayload.data);
//                     setProduct(null);
//                 }
//             } catch (err) {
//                 if (err instanceof Error && err.name !== "AbortError") {
//                     setError(err.message);
//                 }
//             } finally {
//                 if (!signal.aborted) {
//                     setIsLoading(false);
//                 }
//             }
//         }

//         fetchData();

//         return () => {
//             controller.abort();
//         };
//     }, [id]);

//     return { products, product, isLoading, error };
// }


import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/services/apiClient";
import type { Product } from "@/generated/prisma/client";

export function useProducts(id?: string | string[]) {
    const productId = Array.isArray(id) ? id[0] : id;

    const query = useQuery<Product | Product[]>({
        queryKey: productId ? ["products", productId] : ["products"],

        queryFn: ({ signal }): Promise<Product | Product[]> => {
            if (productId) {
                return apiClient.getById<Product>("/api/products", productId, { signal });
            }
            return apiClient.getAll<Product>("/api/products", { signal });
        },
    });

    return {
        product: productId ? (query.data as Product) || null : null,
        products: !productId ? (query.data as Product[]) || [] : [],
        isLoading: query.isLoading,
        error: query.error ? query.error.message : null,
        refetch: query.refetch,
    };
}