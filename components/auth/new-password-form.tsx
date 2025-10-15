"use client";
import {CardWrapper} from "./card-wrapper";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {NewPasswordSchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FormError} from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";
import {useState, useTransition} from "react";
import {useSearchParams} from "next/navigation";
import {newPassword} from "@/actions/new-password";

export type NewPasswordFormType = z.infer<typeof NewPasswordSchema>;
export const NewPasswordForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [error, setError] = useState<string>();
    const [success, setSuccess] = useState<string>();
    const [isPending, setTransition] = useTransition();
    const form = useForm<NewPasswordFormType>(
        {
            resolver: zodResolver(NewPasswordSchema),
            defaultValues: {
                password: '',
                confirmPassword: ''
            }
        }
    )
    const onSubmit = async (values: NewPasswordFormType) => {
        setError('');
        setSuccess('');
        setTransition(() => {
            newPassword(values, token).then((data) => {
                setError(data?.error);
                setSuccess(data?.success);
            });
        })
    }

    return (
        <CardWrapper
            headerLabel="Change your password"
            backButtonHref="/auth/login"
            backButtonLabel="Back to login"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name={'password'}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="********" type={'password'}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={'confirmPassword'}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Confirm password</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="********" type={'password'}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <Button disabled={isPending} type={'submit'} className="w-full">Save</Button>
                </form>
            </Form>
        </CardWrapper>
    );
};
