"use client";
import {CardWrapper} from "./card-wrapper";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {LoginSchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FormError} from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";
import {login} from "@/actions/login";
import {useState, useTransition} from "react";
import {useSearchParams} from "next/navigation";
import Link from "next/link";

export type LoginFormType = z.infer<typeof LoginSchema>;
export const LoginForm = () => {
    const urlSearchParams = useSearchParams();
    const urlError = urlSearchParams.get('error') === "OAuthAccountNotLinked" ? "Email already in use with different provider!" : "";
    const [showTwoFactor, setShowTwoFactor] = useState(false);
    const [error, setError] = useState<string>();
    const [success, setSuccess] = useState<string>();
    const [isPending, setTransition] = useTransition();
    const form = useForm<LoginFormType>(
        {
            resolver: zodResolver(LoginSchema),
            defaultValues: {
                email: '', password: ''
            }
        }
    )
    const onSubmit = async (values: LoginFormType) => {
        setError('');
        setSuccess('');
        setTransition(() => {
            login(values).then((data) => {
                if (data?.error) {
                    setError(data.error);
                }
                if (data?.success) {
                    setSuccess(data.success);
                }
                if (data?.twoFactor) {
                    setShowTwoFactor(true);
                }
            }).catch(() => {
                setError("Something went wrong!");
            });
        })
    }

    return (
        <CardWrapper
            headerLabel="Welcome Back"
            backButtonHref="/auth/register"
            backButtonLabel="Don't have an account?"
            showSocial
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6">
                    <div className="space-y-4">
                        {showTwoFactor && (
                            <FormField
                                control={form.control}
                                name={'code'}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Two Factor Code</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="123456" type={'text'}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        )}
                        {!showTwoFactor &&  (
                            <>
                                <FormField
                                    control={form.control}
                                    name={'email'}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="example@gmail.com" type={'email'}/>
                                            </FormControl>
                                            <FormMessage>

                                            </FormMessage>
                                        </FormItem>
                                    )}

                                />
                                <FormField
                                    control={form.control}
                                    name={'password'}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="********" type={'password'}/>
                                            </FormControl>
                                            <div>
                                                <Button variant={'link'} size={'sm'} className="px-0 font-normal"
                                                        asChild>
                                                    <Link href={'/auth/reset-password'}>Forgot password?</Link>
                                                </Button>
                                            </div>
                                            <FormMessage>

                                            </FormMessage>
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}
                    </div>
                    <FormError message={error || urlError}/>
                    <FormSuccess message={success}/>
                    <Button disabled={isPending} type={'submit'}
                            className="w-full">{showTwoFactor ? "Confirm" : "Login"}</Button>
                </form>
            </Form>
        </CardWrapper>
    );
};
