import {UserRole} from "@prisma/client";
export type ExtendedUser = DefaultSession['user'] & { role: UserRole,isTwoFactorEnabled:boolean };
declare module "next-auth" {
    /**
     * The shape of the user object returned in the OAuth providers' `profile` callback,
     * or the second parameter of the `session` callback, when using a database.
     */
    interface User {
        id:string,
        role:UserRole,
        isTwoFactorEnabled:boolean
    }
    /**
     * The shape of the account object returned in the OAuth providers' `account` callback,
     * Usually contains information about the provider being used, like OAuth tokens (`access_token`, etc).
     */
    interface Account {}

    /**
     * Returned by `useSession`, `auth`, contains information about the active session.
     */
    interface Session {
        user:ExtendedUser
    }
}

// The `JWT` interface can be found in the `next-auth/jwt` submodule
import { JWT } from "next-auth/jwt"
import {DefaultSession} from "next-auth";

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
    interface JWT {
        /** OpenID ID Token */
        sub: string,
        role:UserRole,
        isTwoFactorEnabled:boolean
    }
}