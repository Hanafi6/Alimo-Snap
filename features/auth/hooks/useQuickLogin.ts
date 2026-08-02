import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/better-auth/auth-client';

interface UseLogoutReturn {
    handleLogout: () => Promise<void>;
    isLoading: boolean;
    error: string | null;
}

export const useLogout = (): UseLogoutReturn => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleLogout = async (): Promise<void> => {
        setIsLoading(true);
        setError(null);

        try {
            await authClient.signOut(
                {
                    fetchOptions: {
                        onSuccess: ({ data }) => {
                            console.log(data)
                            window.location.href = '/login';
                        }
                    }
                }
            );
            router.replace("/login");
            router.refresh();
        } catch (err: unknown) {
            console.error(err);
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return { handleLogout, isLoading, error };
};