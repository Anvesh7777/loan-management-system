"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import SalesModule from "@/components/modules/SalesModule";

export default function AdminSalesPage() {
  return (
    <DashboardLayout title="Admin • Sales">
      <SalesModule />
    </DashboardLayout>
  );
}