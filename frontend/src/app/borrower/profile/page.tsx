"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import DashboardLayout from "@/components/layout/DashboardLayout";

import {
  borrowerProfileSchema,
  BorrowerProfileFormData,
} from "@/lib/validators/borrower";

import { createBorrowerProfile } from "@/services/borrower.service";

export default function ProfilePage() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      borrowerProfileSchema
    ),
  });

  const onSubmit = async (
    data: BorrowerProfileFormData
  ) => {
    try {
      setLoading(true);

      await createBorrowerProfile(
        data
      );

      alert(
        "Profile created successfully"
      );

      router.push(
        "/borrower/upload"
      );
    } catch (error: any) {
      alert(
        error?.response?.data?.message ||
          "Failed to create profile"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="Create Profile">
      <div
        className="
          max-w-4xl
          rounded-3xl
          border
          border-white/10
          bg-white/5
          p-8
          backdrop-blur-md
        "
      >
        <div className="mb-8">
          <h2 className="text-2xl font-bold">
            Personal Information
          </h2>

          <p className="mt-2 text-zinc-400">
            Complete your profile to
            proceed with loan
            eligibility verification.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="space-y-6"
        >
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              Personal Details
            </h3>
          </div>

          <div>
            <label className="block text-sm font-medium">
              Full Name
            </label>

            <input
              {...register(
                "fullName"
              )}
              placeholder="Enter your full name"
              className="
                mt-2
                w-full
                rounded-xl
                border
                border-white/10
                bg-white/5
                p-3
                outline-none
              "
            />

            {errors.fullName && (
              <p className="mt-1 text-sm text-red-500">
                {
                  errors.fullName
                    .message as string
                }
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">
              PAN Number
            </label>

            <input
              {...register("pan")}
              placeholder="ABCDE1234F"
              className="
                mt-2
                w-full
                rounded-xl
                border
                border-white/10
                bg-white/5
                p-3
                outline-none
              "
            />

            {errors.pan && (
              <p className="mt-1 text-sm text-red-500">
                {
                  errors.pan
                    .message as string
                }
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">
              Date Of Birth
            </label>

            <input
              type="date"
              {...register(
                "dateOfBirth"
              )}
              className="
                mt-2
                w-full
                rounded-xl
                border
                border-white/10
                bg-white/5
                p-3
                outline-none
              "
            />
          </div>

          <div className="pt-4">
            <h3 className="mb-4 text-lg font-semibold">
              Eligibility Information
            </h3>
          </div>

          <div>
            <label className="block text-sm font-medium">
              Monthly Salary
            </label>

            <input
              type="number"
              {...register(
                "monthlySalary"
              )}
              placeholder="25000"
              className="
                mt-2
                w-full
                rounded-xl
                border
                border-white/10
                bg-white/5
                p-3
                outline-none
              "
            />

            {errors.monthlySalary && (
              <p className="mt-1 text-sm text-red-500">
                {
                  errors
                    .monthlySalary
                    .message as string
                }
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">
              Employment Mode
            </label>

            <select
              {...register(
                "employmentMode"
              )}
              className="
                mt-2
                w-full
                rounded-xl
                border
                border-white/10
                bg-zinc-900
                p-3
                text-white
                outline-none
              "
            >
              <option
                value=""
                className="bg-zinc-900 text-white"
              >
                Select Employment Type
              </option>

              <option
                value="SALARIED"
                className="bg-zinc-900 text-white"
              >
                Salaried
              </option>

              <option
                value="SELF_EMPLOYED"
                className="bg-zinc-900 text-white"
              >
                Self Employed
              </option>

              <option
                value="UNEMPLOYED"
                className="bg-zinc-900 text-white"
              >
                Unemployed
              </option>
            </select>

            {errors.employmentMode && (
              <p className="mt-1 text-sm text-red-500">
                {
                  errors
                    .employmentMode
                    .message as string
                }
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              rounded-xl
              bg-primary
              py-3
              font-medium
              text-primary-foreground
              transition
              hover:opacity-90
              disabled:opacity-50
            "
          >
            {loading
              ? "Creating Profile..."
              : "Create Profile"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}