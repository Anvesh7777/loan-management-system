"use client";

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
      <div className="max-w-2xl rounded-2xl border p-6">
        <h2 className="mb-4 text-xl font-bold">
          Upload Salary Slip
        </h2>

        <input
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          onChange={(e) =>
            setFile(
              e.target.files?.[0] ||
                null
            )
          }
          className="mb-4"
        />

        <button
          onClick={handleUpload}
          disabled={loading}
          className="rounded-lg bg-primary px-6 py-3 text-primary-foreground"
        >
          {loading
            ? "Uploading..."
            : "Upload"}
        </button>
      </div>
    </DashboardLayout>
  );
}