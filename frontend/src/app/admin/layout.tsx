"use client";

import { ReactNode } from "react";

import RoleGuard from "@/components/common/RoleGuard";
import { Role } from "@/types";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <RoleGuard
      allowedRoles={[
        Role.ADMIN,
      ]}
    >
      {children}
    </RoleGuard>
  );
}