"use client";
import {Button} from "@/components/ui/button";
import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";
import {signIn} from "next-auth/react";
import {DEFAULT_LOGIN_REDIRECT} from "@/routes";

export const Social = () => {
    const onSignIn = async (provider:"google"|"github")=>{
        await signIn(provider,{redirectTo:DEFAULT_LOGIN_REDIRECT});
    }
    return (
        <div className="flex items-center gap-x-2 w-full">
            <Button size={'lg'}
                    variant={'outline'}
                    className="flex-1"
                    onClick={() => onSignIn('google')}>
                <FcGoogle className="size-5"/>
            </Button>
            <Button size={'lg'}
                    variant={'outline'}
                    className="flex-1"
                    onClick={() => onSignIn('github')}>
                <FaGithub className="size-5"/>
            </Button>
        </div>
    )
}