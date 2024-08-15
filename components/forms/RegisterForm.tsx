"use client";

import { RegisterFormValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { registerUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof RegisterFormValidation>>({
    resolver: zodResolver(RegisterFormValidation),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterFormValidation>) => {
    setIsLoading(true);

    try {
      const user = {
        name: values.name,
        email: values.email,
        password: values.password,
      };

      const newUser = await registerUser(user);

      if (newUser) {
        redirect(`/login`);
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
          <h1 className="sub-header">Register</h1>
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
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          placeholder="Full Name"
          iconFa={faUser}
          iconAlt="name"
        />
        {/* in loc de username adaug name la pasul asta  */}
        <CustomFormField
          fieldType={FormFieldType.PASSWORD}
          control={form.control}
          name="password"
          placeholder="Password"
          iconFa={faLock}
          iconAlt="passkey"
        />

        <CustomFormField
          fieldType={FormFieldType.PASSWORD}
          control={form.control}
          name="confirmPassword"
          placeholder="Confirm password"
          iconFa={faLock}
          iconAlt="passkey"
        />

        <SubmitButton isLoading={isLoading}>Register</SubmitButton>

        <div className="text-14-regular flex">
          <p className="text-dark-600 mr-2">Already have an account?</p>
          <Link href="/" className="text-green-500">
            LogIn
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
