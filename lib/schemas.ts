import { z } from "zod";

const emailSchema = z
  .string({
    error: "Email is required", // undefined || another type (number, bigInt)
  })
  .min(1, { error: "Email is required" }) // for empty string ("")
  .pipe(z.email({ error: "Invalid email format" })); // for validating email

const passwordSchema = z
  .string({ error: "Password is required" })
  .min(1, { error: "Password is required" })
  .min(8, { error: "Password should be at least 8 characters" })
  .max(32, { error: "Password should be at most 32 characters" });

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registerSchema = z
  .object({
    fullName: z
      .string({ error: "Fullname is required" })
      .min(3, { error: "Your name should be at least 3 charcters" })
      .max(25, { error: "Your name should be at max 25 charcters" }),
    email: emailSchema,
    password: passwordSchema,
    passwordConfirm: z.string({ error: "Password confirmation is required" }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    error: "Passwords do not match",
    path: ["passwordConfirm"],
  });

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
