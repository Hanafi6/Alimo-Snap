// app/api/auth/[...all]/route.ts
import { auth } from "@/lib/better-auth/auth"; // تأكد إن المسار لملف auth.ts مظبوط
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(auth);

// المعتمد يبني
