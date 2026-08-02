// app/actions/set-password.ts
"use server";

import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";

export async function setPasswordAction(newPassword: string) {
    const h = await headers();
    const session = await auth.api.getSession({ headers: h });

    if (!session) {
        return { success: false, message: "الجلسة غير صالحة، سجل الدخول من تاني" };
    }

    // مبنثقش في الـ status الجاي من الفرونت، بنتأكد من السيرفر
    const accounts = await auth.api.listUserAccounts({ headers: h });
    const hasPassword = accounts.some((a) => a.providerId === "credential");

    if (hasPassword) {
        return {
            success: false,
            message: "عندك كلمة سر بالفعل، استخدم تغيير كلمة السر بدل التعيين",
        };
    }

    if (!newPassword || newPassword.length < 8) {
        return { success: false, message: "كلمة السر لازم تكون 8 حروف على الأقل" };
    }

    try {
        await auth.api.setPassword({
            body: { newPassword },
            headers: h,
        });
        return { success: true, message: "تم تعيين كلمة السر بنجاح" };
    } catch (e) {
        return { success: false, message: "حصل خطأ، حاول تاني" };
    }
}