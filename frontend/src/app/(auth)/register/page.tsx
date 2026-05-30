"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  registerSchema,
  RegisterFormData,
} from "@/lib/validators/auth";

import { registerUser } from "@/services/auth.service";

import { useAuthStore } from "@/store/auth.store";
import { getRoleRoute } from "@/lib/role-redirect";

export default function RegisterPage() {
  const router = useRouter();

  const { setAuth } = useAuthStore();

  const [loading, setLoading] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver:
      zodResolver(registerSchema),
  });

  const onSubmit = async (
    data: RegisterFormData
  ) => {
    try {
      setLoading(true);

      const response =
        await registerUser(data);

      const authData =
        response.data;

      setAuth(
        authData.user,
        authData.token
      );

      router.push(
        getRoleRoute(
          authData.user.role
        )
      );
    } catch (error: any) {
      alert(
        error?.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-3xl border border-border/50 bg-card/50 p-8 backdrop-blur">
      <h1 className="mb-2 text-3xl font-bold">
        Create Account
      </h1>

      <p className="mb-8 text-muted-foreground">
        Start your loan journey
      </p>

      <form
        onSubmit={handleSubmit(
          onSubmit
        )}
        className="space-y-4"
      >
        <div>
          <label className="mb-2 block text-sm">
            Name
          </label>

          <input
            {...register("name")}
            className="w-full rounded-xl border bg-background px-4 py-3"
            placeholder="Enter name"
          />

          {errors.name && (
            <p className="mt-1 text-sm text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm">
            Email
          </label>

          <input
            {...register("email")}
            className="w-full rounded-xl border bg-background px-4 py-3"
            placeholder="Enter email"
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm">
            Password
          </label>

          <input
            type="password"
            {...register("password")}
            className="w-full rounded-xl border bg-background px-4 py-3"
            placeholder="Enter password"
          />

          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {
                errors.password
                  .message
              }
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-primary py-3 font-medium text-primary-foreground disabled:opacity-50"
        >
          {loading
            ? "Creating Account..."
            : "Create Account"}
        </button>
      </form>
    </div>
  );
}