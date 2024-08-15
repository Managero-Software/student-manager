"use client";

import { LoginFormValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useState } from "react";
import { redirect } from "next/navigation";
import SubmitButton from "../SubmitButton";
import { loginUser } from "@/lib/actions/user.actions";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof LoginFormValidation>>({
    resolver: zodResolver(LoginFormValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginFormValidation>) => {
    setIsLoading(true);

    try {
      const user = {
        email: values.email,
        password: values.password,
      };

      if (await loginUser(user)) {
        redirect("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-8"
      >
        <section className="mx-auto">
          <h1 className="sub-header">Login</h1>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          placeholder="Email"
          iconFa={faEnvelope}
          iconAlt="email"
        />

        <CustomFormField
          fieldType={FormFieldType.PASSWORD}
          control={form.control}
          name="password"
          placeholder="Password"
          iconFa={faLock}
          iconAlt="passkey"
        />
        <SubmitButton isLoading={isLoading}>Login</SubmitButton>

        <div className="text-14-regular flex">
          <p className="text-dark-600 mr-2">Don&apos;t have an account?</p>
          <Link href="/register" className="text-green-500">
            Register
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
