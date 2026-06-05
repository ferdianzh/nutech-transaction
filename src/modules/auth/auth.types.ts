import z from "zod";

export const RegisterSchema = z.object({
  email: z.email("Paramter email tidak sesuai format"),
  password: z
    .string("Paramter password tidak sesuai format")
    .min(8, "Paramter password harus terdiri dari minimal 8 karakter"),
  first_name: z.string("Paramter first_name tidak sesuai format"),
  last_name: z.string("Paramter last_name tidak sesuai format"),
});

export type RegisterDto = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  email: z.email("Paramter email tidak sesuai format"),
  password: z.string("Paramter password tidak sesuai format"),
});

export type LoginDto = z.infer<typeof LoginSchema>;
