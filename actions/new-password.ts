"use server";
import {NewPasswordFormType} from "@/components/auth/new-password-form";
import {NewPasswordSchema} from "@/schemas";
import * as Z from "zod";
import {getPasswordResetTokenByToken} from "@/data/password-reset-token";
import {getUserByEmail} from "@/data/user";
import bcrypt from "bcryptjs";
import {db} from "@/lib/db";

export const newPassword = async (values: NewPasswordFormType, token: string | null) => {
    if (!token) {
        return {error: "Missing token!"};
    }
    const validatedFields = NewPasswordSchema.safeParse(values);
    if (!validatedFields.success) {
        const tree = Z.treeifyError(validatedFields.error);
        const errorMessage = tree.properties?.password?.errors[0] || tree.properties?.confirmPassword?.errors[0];
        return {error: errorMessage};
    }

    const {password, confirmPassword} = validatedFields.data;

    const existingToken = await getPasswordResetTokenByToken(token);
    if (!existingToken) {
        return {error: "Invalid token!"};
    }

    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) {
        return {error: "Token expired!"};
    }

    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser) {
        return {error: "Email does not exist!"};
    }

    const hashPassword = await bcrypt.hash(password, 10);
    await db.user.update({
        where: {id: existingUser.id},
        data: {password: hashPassword},
    });

    await db.passwordResetToken.delete({where: {id: existingToken.id}});
    return {success: "Password updated!"};
}