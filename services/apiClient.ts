import type { ApiResponseSuccess, ApiResponseError } from "@/lib/types";

async function handleResponse<T>(response: Response): Promise<T> {
    const data: ApiResponseSuccess<T> | ApiResponseError = await response.json();

    if (!response.ok) {
        const errorPayload = data as ApiResponseError;
        throw new Error(errorPayload.message || "server difening");
    }

    return (data as ApiResponseSuccess<T>).data;
}


// import { useMutation, useQueryClient } from "@tanstack/react-query";

// // 💡 Hook لحذف منتج
// export function useDeleteProduct() {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: (id: string) => apiClient.delete("/api/products", id),
//         onSuccess: () => {
//             // إعادة إنعاش الكاش أوتوماتيكياً لتحديث قائمة المنتجات في الشاشة
//             queryClient.invalidateQueries({ queryKey: ["products"] });
//         },
//     });
// }
// // 💡 Hook لتعديل منتج (Patch)
// export function useUpdateProduct<T>() {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: ({ id, data }: { id: string; data: Partial<T> }) =>
//             apiClient.patch<T, Partial<T>>("/api/products", id, data),
//         onSuccess: (_, variables) => {
//             queryClient.invalidateQueries({ queryKey: ["products"] });
//             queryClient.invalidateQueries({ queryKey: ["product", variables.id] });
//         },
//     });
// }


export const apiClient = {
    // 1. Get All
    getAll: async <T>(endpoint: string, options?: RequestInit): Promise<T[]> => {
        const res = await fetch(endpoint, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            ...options,
        });
        return handleResponse<T[]>(res);
    },

    // 2. Get By ID
    getById: async <T>(endpoint: string, id: string | number, options?: RequestInit): Promise<T> => {
        const res = await fetch(`${endpoint}/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            ...options,
        });
        return handleResponse<T>(res);
    },

    // 3. Post
    post: async <TResponse, TBody = unknown>(
        endpoint: string,
        body: TBody,
        options?: RequestInit
    ): Promise<TResponse> => {
        const res = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
            ...options,
        });
        return handleResponse<TResponse>(res);
    },

    // 4. Patch / Update
    patch: async <TResponse, TBody = unknown>(
        endpoint: string,
        id: string | number,
        body: TBody,
        options?: RequestInit
    ): Promise<TResponse> => {
        const res = await fetch(`${endpoint}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
            ...options,
        });
        return handleResponse<TResponse>(res);
    },

    // 5. Delete
    delete: async <TResponse = void>(
        endpoint: string,
        id: string | number,
        options?: RequestInit
    ): Promise<TResponse> => {
        const res = await fetch(`${endpoint}/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            ...options,
        });
        return handleResponse<TResponse>(res);
    },
};