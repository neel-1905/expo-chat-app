import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string("Name is required")
    .min(2, "Name must be at least 2 characters"),

  email: z.email("Invalid email address"),

  password: z
    .string("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
