"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

import DashboardLayout from "@/components/layout/DashboardLayout";

import { uploadSalarySlip } from "@/services/borrower.service";

export default function UploadPage() {
  const router = useRouter();

  const [file, setFile] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    try {
      setLoading(true);

      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      await uploadSalarySlip(
        formData
      );

      alert(
        "Salary slip uploaded successfully"
      );

      router.push(
        "/borrower/apply"
      );
    } catch (error: any) {
      alert(
        error?.response?.data?.message ||
          "Upload failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="Upload Salary Slip">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div
          className="
            rounded-3xl
            border
            border-white/10
            bg-white/5
            p-8
            backdrop-blur-md
          "
        >
          <h2 className="text-2xl font-bold">
            Upload Salary Slip
          </h2>

          <p className="mt-3 text-zinc-400">
            Upload your latest salary
            slip to verify your income
            and continue your loan
            application.
          </p>

          <div className="mt-6 rounded-2xl border border-dashed border-white/20 p-6">
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={(e) =>
                setFile(
                  e.target
                    .files?.[0] ||
                    null
                )
              }
              className="w-full"
            />

            <div className="mt-4 text-sm text-zinc-400">
              <p>
                • PDF, JPG, PNG
                supported
              </p>

              <p>
                • Maximum size:
                5MB
              </p>

              <p>
                • Required before
                loan application
              </p>
            </div>
          </div>

          {file && (
            <div
              className="
                mt-4
                rounded-xl
                bg-green-500/10
                p-3
                text-sm
                text-green-400
              "
            >
              Selected: {file.name}
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={loading}
            className="
              mt-6
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
              ? "Uploading..."
              : "Upload Salary Slip"}
          </button>
        </div>

        <div className="hidden lg:flex justify-center">
          <Image
            src="/illustrations/upload.svg"
            alt="Upload Salary Slip"
            width={500}
            height={500}
            className="w-full max-w-lg"
          />
        </div>
      </div>
    </DashboardLayout>
  );
}