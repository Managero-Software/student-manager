import { z } from "zod";

export const LoginFormValidation = z.object({
  email: z
    .string()
    .min(1, "Email cannot be empty")
    .email("Invalid email address"),
  password: z.string().min(1, "Password cannot be empty."),
});

export const RegisterFormValidation = z
  .object({
    email: z
      .string()
      .min(1, "Email cannot be empty")
      .email("Invalid email address"),
    name: z.string().min(2, "Name must be at least 2 characters."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const ClassDialogValidation = z.object({
  className: z
    .string()
    .min(1, "Please add the class name.")
    .max(100, "Cannot exeed 100 characters."),
  instructor: z.string().max(100, "Cannot exceed 100 characters."),
  roomNumber: z.string().max(50, "Cannot exeed 50 characters"),
  classType: z.string().max(100, "Cannot exceed 100 characters."),
  dayOfWeek: z.enum(["1", "2", "3", "4", "5"]),
  startTime: z.coerce.date({ message: "The format should be hh:mm" }),
  endTime: z.coerce.date({ message: "The format should be hh:mm" }),
  frequency: z.enum(["Weekly", "Bi-Weekly(Odd)", "Bi-Weekly(Even)"]),
});

export const ProfileFormValidation = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
});
