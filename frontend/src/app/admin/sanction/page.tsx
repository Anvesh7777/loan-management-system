"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import SanctionModule from "@/components/modules/SanctionModule";

export default function AdminSanctionPage() {
  return (
    <DashboardLayout title="Admin • Sanction">
      <SanctionModule />
    </DashboardLayout>
  );
}