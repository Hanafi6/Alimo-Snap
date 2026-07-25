export const BASE_URL = "/api";

export async function api<T>(
    endpoint: string,
    init?: RequestInit
): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...init,
        headers: {
            "Content-Type": "application/json",
            ...init?.headers,
        },
    });

    if (!response.ok) {
        throw new Error("Something went wrong");
    }

    return response.json();
}