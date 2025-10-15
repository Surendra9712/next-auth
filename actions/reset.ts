"use server";
import {ResetPasswordSchema} from "@/schemas";
import {ResetFormType} from "@/components/auth/reset-form";
import {getUserByEmail} from "@/data/user";
import {generatePasswordResetToken} from "@/lib/tokens";
import {sendPasswordResetEmail} from "@/lib/mail";

export const reset = async (values: ResetFormType) => {
    const validateFields = ResetPasswordSchema.safeParse(values);
    if (!validateFields.success) {
        return {error: "Invalid email!"};
    }
    const {email} = validateFields.data;
    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
        return {error: "Email not found! "}
    }

    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);
    return {success: "A password reset link has been sent to your email address. Please follow the instructions to update your password."}
}