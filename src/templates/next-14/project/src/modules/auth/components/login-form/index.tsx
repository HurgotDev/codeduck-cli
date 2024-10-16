"use client";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

import {Button} from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {Input} from "@/shared/components/ui/input";
import {Form, FormItem, FormField, FormLabel, FormControl} from "@/shared/components/ui/form";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export type FormValues = yup.InferType<typeof schema>;

export interface LoginFormProps {
  isSubmitting?: boolean;
  onSubmit: (data: FormValues) => void;
}

export default function LoginForm({onSubmit, isSubmitting}: LoginFormProps) {
  const formMethods = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Enter your email below to login to your account.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Form {...formMethods}>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <form id="login-form" onSubmit={formMethods.handleSubmit(onSubmit)}>
            <FormField
              control={formMethods.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="m@example.com" type="email" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={formMethods.control}
              name="password"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled={isSubmitting} form="login-form" type="submit">
          Sign in
        </Button>
      </CardFooter>
    </Card>
  );
}
