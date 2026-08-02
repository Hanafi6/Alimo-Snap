// app/reset-password/page.tsx
import ResetPasswordForm from "./ResetFormPass";

export default async function ResetPasswordPage({
    searchParams,
}: {
    searchParams: Promise<{ token?: string }>;
}) {
    const { token } = await searchParams;

    if (!token) {
        return (
            <div className="max-w-md mx-auto mt-20 text-center space-y-3">
                <h2 className="text-lg font-semibold text-destructive">رابط غير صالح</h2>
                <p className="text-sm text-muted-foreground">
                    الرابط منتهي أو غير صحيح، اطلب رابط جديد من صفحة نسيت كلمة السر.
                </p>
            </div>
        );
    }

    return <ResetPasswordForm token={token} />;
}