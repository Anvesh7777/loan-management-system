"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Role } from "@/types";
import { useAuthStore } from "@/store/auth.store";

interface Props {
  allowedRoles: Role[];
  children: React.ReactNode;
}

export default function RoleGuard({
  allowedRoles,
  children,
}: Props) {
  const router = useRouter();

  const { user, initialize } =
    useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (!user) return;

    if (
      !allowedRoles.includes(
        user.role
      )
    ) {
      router.push("/");
    }
  }, [
    user,
    allowedRoles,
    router,
  ]);

  if (!user) {
    return (
      <div className="p-8">
        Loading...
      </div>
    );
  }

  if (
    !allowedRoles.includes(
      user.role
    )
  ) {
    return null;
  }

  return <>{children}</>;
}