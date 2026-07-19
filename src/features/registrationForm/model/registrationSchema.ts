import { z } from "zod";

export const registrationSchema = z
  .object({
    username: z.string().trim().min(1, "Введите имя пользователя"),
    email: z
      .string()
      .trim()
      .min(1, "Введите Email")
      .refine((value) => value.includes("@"), {
        message: "Email должен содержать символ @",
      }),
    password: z
      .string()
      .min(1, "Введите пароль")
      .min(6, "Пароль должен содержать минимум 6 символов"),
    confirmPassword: z.string().min(1, "Подтвердите пароль"),
    socialLinks: z.array(
      z.object({
        url: z.url("Некорректный URL"),
      }),
    ),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export type RegistrationValues = z.infer<typeof registrationSchema>;

export const defaultValues: RegistrationValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  socialLinks: [
    {
      url: "",
    },
  ],
};