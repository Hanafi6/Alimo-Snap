// app/api/auth/[...auth]/route.ts
import { auth } from "@/lib/better-auth/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);

// المعتمد يبني
