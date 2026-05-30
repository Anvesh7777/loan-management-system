"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import CollectionModule from "@/components/modules/CollectionModule";

export default function AdminCollectionPage() {
  return (
    <DashboardLayout title="Admin • Collection">
      <CollectionModule />
    </DashboardLayout>
  );
}