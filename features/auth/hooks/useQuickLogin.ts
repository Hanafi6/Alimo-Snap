import { useState } from "react";
import { type UseFormReturn } from "react-hook-form";
import { LoginSchema } from "@/features/auth/schemas";
import { type QuickProfile } from "@/lib/types";

export function useQuickLogin(form: UseFormReturn<LoginSchema>) {
    const [selectedProfileId, setSelectedProfileId] = useState<string | null>(
        null,
    );
    const [submitError, setSubmitError] = useState<string | null>(null);

    const handleQuickLogin = (profile: QuickProfile) => {
        setSubmitError(null);
        setSelectedProfileId(profile.id);
        form.setValue("email", profile.email, { shouldValidate: true });
        form.setValue("password", profile.password, { shouldValidate: true });
    };

    return {
        selectedProfileId,
        submitError,
        setSelectedProfileId,
        setSubmitError,
        handleQuickLogin,
    };
}
