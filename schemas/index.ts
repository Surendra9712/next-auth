import * as z from 'zod';

export const LoginSchema = z.object({
    email: z.email({error: "Email is required"}),
    password: z.string().nonempty('Password is required').min(8, "Password should not be less than 8 characters"),
    code: z.string().optional()
})

export const RegisterSchema = z.object({
    name: z.string().nonempty("Name is required"),
    email: z.email({error: "Email is required"}),
    password: z.string().nonempty('Password is required')
        .min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "Password must include at least one uppercase letter")
        .regex(/[a-z]/, "Password must include at least one lowercase letter")
        .regex(/[0-9]/, "Password must include at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must include at least one special character"),
})

export const ResetPasswordSchema = z.object({
    email: z.email({error: "Email is required"}),
});

export const NewPasswordSchema = z.object({
    password: z.string().nonempty('Password is required')
        .min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "Password must include at least one uppercase letter")
        .regex(/[a-z]/, "Password must include at least one lowercase letter")
        .regex(/[0-9]/, "Password must include at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must include at least one special character"),

    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});
