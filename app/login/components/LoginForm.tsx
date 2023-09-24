"use client";

import { useRouter } from "next/navigation";

import { signIn } from "next-auth/react";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(20),
});

type LoginSchema = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) });

  const router = useRouter();

  const onSubmit: SubmitHandler<LoginSchema> = async (inputData) => {
    const result = await signIn("credentials", {
      ...inputData,
      redirect: false,
      callbackUrl: "/",
    });

    if (result?.ok) router.push("/");
  };

  return (
    <form
      className="flex flex-col w-[320px] mx-auto bg-neutral-200 dark:bg-slate-900 p-5 rounded-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label htmlFor="email" className="mb-1">
        ایمیل:
      </label>
      <input
        type="email"
        {...register("email")}
        className={`focus:outline-none rounded p-2 mb-1 focus:shadow border-2  ${
          errors.email ? "border-2 border-red-600" : ""
        }`}
      />
      <span className="text-red-600 font-bold text-[10px] h-[16px] mb-2">
        {errors.email?.message}
      </span>
      <label htmlFor="password" className="mb-1">
        رمز عبور:
      </label>
      <input
        type="password"
        {...register("password")}
        className={`focus:outline-none rounded p-2 mb-1 focus:shadow border-2  ${
          errors.password ? "border-2 border-red-600" : ""
        }`}
      />
      <span className="text-red-600 font-bold text-[10px] h-[16px] mb-4">
        {errors.password?.message}
      </span>
      <button
        type="submit"
        className="bg-primary font-bold text-white rounded p-2 cursor-pointer shadow"
      >
        ورود
      </button>
    </form>
  );
};

export default LoginForm;
