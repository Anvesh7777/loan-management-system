"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import DisbursementModule from "@/components/modules/DisbursementModule";

export default function AdminDisbursementPage() {
  return (
    <DashboardLayout title="Admin • Disbursement">
      <DisbursementModule />
    </DashboardLayout>
  );
}