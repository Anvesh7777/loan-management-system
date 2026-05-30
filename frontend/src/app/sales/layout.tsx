"use client";

import { ReactNode } from "react";

import RoleGuard from "@/components/common/RoleGuard";
import { Role } from "@/types";

export default function SalesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <RoleGuard
      allowedRoles={[Role.SALES]}
    >
      {children}
    </RoleGuard>
  );
}