"use client";

import { ReactNode } from "react";

import RoleGuard from "@/components/common/RoleGuard";
import { Role } from "@/types";

export default function DisbursementLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <RoleGuard
      allowedRoles={[
        Role.DISBURSEMENT,
      ]}
    >
      {children}
    </RoleGuard>
  );
}