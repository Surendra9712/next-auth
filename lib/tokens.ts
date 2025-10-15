import {v4 as uuidv4} from "uuid";
import {db} from "@/lib/db";
import {getVerificationTokenByEmail} from "@/data/verification-token";
import {getPasswordResetTokenByEmail} from "@/data/password-reset-token";
import * as crypto from "crypto";
import {getTwoFactorTokenByEmail} from "@/data/two-factor-token";

const generateToken = () => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);
    return {token, expires};
}
export const generateVerificationToken = async (email: string) => {
    const {token, expires} = generateToken();
    const existingToken = await getVerificationTokenByEmail(email);
    if (existingToken) {
        await db.verificationToken.delete({where: {id: existingToken.id}});
    }

    return db.verificationToken.create({data: {email, token, expires}});
}

export const generatePasswordResetToken = async (email: string) => {
    const {token, expires} = generateToken();
    const existingToken = await getPasswordResetTokenByEmail(email);
    if (existingToken) {
        await db.verificationToken.delete({where: {id: existingToken.id}});
    }

    return db.passwordResetToken.create({data: {email, token, expires}});
}

export const generateTwoFactorToken = async (email: string) => {
    const token = crypto.randomInt(100_000, 1_000_000).toString();
    const expires = new Date(new Date().getTime() + 1800 * 1000);
    const existingToken = await getTwoFactorTokenByEmail(email);
    if (existingToken) {
        await db.verificationToken.delete({where: {id: existingToken.id}});
    }

    const twoFactorToken = await db.twoFactorToken.create({data: {email, token, expires}});
    return twoFactorToken;
}