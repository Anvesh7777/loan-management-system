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
      <div className="max-w-2xl rounded-2xl border p-6">
        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="space-y-4"
        >
          <div>
            <label>
              Full Name
            </label>

            <input
              {...register(
                "fullName"
              )}
              className="mt-2 w-full rounded-lg border p-3"
            />

            {errors.fullName && (
              <p className="text-sm text-red-500">
                {
                  errors.fullName
                    .message
                }
              </p>
            )}
          </div>

          <div>
            <label>PAN</label>

            <input
              {...register("pan")}
              className="mt-2 w-full rounded-lg border p-3"
            />

            {errors.pan && (
              <p className="text-sm text-red-500">
                {
                  errors.pan
                    .message
                }
              </p>
            )}
          </div>

          <div>
            <label>
              Date Of Birth
            </label>

            <input
              type="date"
              {...register(
                "dateOfBirth"
              )}
              className="mt-2 w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label>
              Monthly Salary
            </label>

            <input
              type="number"
              {...register(
                "monthlySalary"
              )}
              className="mt-2 w-full rounded-lg border p-3"
            />

            {errors.monthlySalary && (
              <p className="text-sm text-red-500">
                {
                  errors
                    .monthlySalary
                    .message
                }
              </p>
            )}
          </div>

          <div>
            <label>
              Employment Mode
            </label>

            <select
              {...register(
                "employmentMode"
              )}
              className="mt-2 w-full rounded-lg border p-3"
            >
              <option value="">
                Select
              </option>

              <option value="SALARIED">
                Salaried
              </option>

              <option value="SELF_EMPLOYED">
                Self Employed
              </option>

              <option value="UNEMPLOYED">
                Unemployed
              </option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-primary px-6 py-3 text-primary-foreground"
          >
            {loading
              ? "Creating..."
              : "Create Profile"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}