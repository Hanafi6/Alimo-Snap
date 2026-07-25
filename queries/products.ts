import { getProduct, getProducts } from "@/services/products";

export const productQueries = {
    all: () => ({
        queryKey: ["products"],
        queryFn: getProducts,
    }),

    detail: (id: string) => ({
        queryKey: ["products", id],
        queryFn: () => getProduct(id),
    }),
};