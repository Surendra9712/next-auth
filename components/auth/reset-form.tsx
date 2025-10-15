"use client";
import {CardWrapper} from "./card-wrapper";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {ResetPasswordSchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FormError} from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";
import {useState, useTransition} from "react";
import {reset} from "@/actions/reset";

export type ResetFormType = z.infer<typeof ResetPasswordSchema>;
export const ResetForm = () => {
    const [error, setError] = useState<string>();
    const [success, setSuccess] = useState<string>();
    const [isPending, setTransition] = useTransition();
    const form = useForm<ResetFormType>(
        {
            resolver: zodResolver(ResetPasswordSchema),
            defaultValues: {
                email: ''
            }
        }
    )
    const onSubmit = async (values: ResetFormType) => {
        setError('');
        setSuccess('');
        setTransition(() => {
            reset(values).then((data) => {
                setError(data?.error);
                setSuccess(data?.success);
            });
        })
    }

    return (
        <CardWrapper
            headerLabel="Forgot your password?"
            backButtonHref="/auth/login"
            backButtonLabel="Back to login"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name={'email'}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="example@example.com" type={'email'}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <Button disabled={isPending} type={'submit'} className="w-full">Send reset email</Button>
                </form>
            </Form>
        </CardWrapper>
    );
};
