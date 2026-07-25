import { api } from "@/lib/api";
import type { Product } from "@/generated/prisma/client";

export function getProducts() {
    return api<Product[]>("/products");
}

export function getProduct(id: string) {
    return api<Product>(`/products/${id}`);
}

export function createProduct(data: Omit<Product, "id" | "createdAt" | "updatedAt">) {
    return api<Product>("/products", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export function updateProduct(
    id: string,
    data: Partial<Omit<Product, "id" | "createdAt" | "updatedAt">>
) {
    return api<Product>(`/products/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
    });
}

export function deleteProduct(id: string) {
    return api<{ message: string }>(`/products/${id}`, {
        method: "DELETE",
    });
}