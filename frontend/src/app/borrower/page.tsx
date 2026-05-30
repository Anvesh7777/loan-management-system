"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";

import { getBorrowerDashboard } from "@/services/borrower.service";
import RoleGuard from "@/components/common/RoleGuard";
import { Role } from "@/types";
import StatCard from "@/components/common/StatCard";
import { motion } from "framer-motion";

interface DashboardData {
  profileCompleted: boolean;
  salarySlipUploaded: boolean;
  totalLoans: number;
  activeLoans: number;
  latestLoan: any;
}

const getStatusColor = (
  status: string
) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-500/20 text-yellow-400";

    case "SANCTIONED":
      return "bg-green-500/20 text-green-400";

    case "DISBURSED":
      return "bg-blue-500/20 text-blue-400";

    case "CLOSED":
      return "bg-zinc-500/20 text-zinc-300";

    case "REJECTED":
      return "bg-red-500/20 text-red-400";

    default:
      return "bg-zinc-500/20 text-zinc-300";
  }
};

export default function BorrowerPage() {
  const [loading, setLoading] =
    useState(true);

  const [dashboard, setDashboard] =
    useState<DashboardData | null>(
      null
    );

  useEffect(() => {
    const fetchDashboard =
      async () => {
        try {
          const response =
            await getBorrowerDashboard();

          setDashboard(
            response.data.dashboard
          );
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <DashboardLayout title="Borrower Dashboard">
        <p>Loading...</p>
      </DashboardLayout>
    );
  }

   return (
  <RoleGuard
    allowedRoles={[
      Role.BORROWER,
    ]}
  >
    <DashboardLayout title="Borrower Dashboard">
      <div className="grid gap-6 md:grid-cols-4">
        <StatCard
          title="Profile Status"
          value={
            dashboard?.profileCompleted
              ? "Completed"
              : "Pending"
          }
        />

        <StatCard
          title="Salary Slip"
          value={
            dashboard?.salarySlipUploaded
              ? "Uploaded"
              : "Pending"
          }
        />

        <StatCard
          title="Total Loans"
          value={
            dashboard?.totalLoans || 0
          }
        />

        <StatCard
          title="Active Loans"
          value={
            dashboard?.activeLoans || 0
          }
        />
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{
            opacity: 0,
            x: -20,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          className="
          rounded-3xl
          border
          border-white/10
          bg-white/5
          backdrop-blur-md
          p-6
        "
        >
          <h2 className="mb-5 text-xl font-bold">
            Quick Actions
          </h2>

          <div className="grid gap-3">
            <Link
              href="/borrower/profile"
              className="
              rounded-xl
              border
              border-white/10
              bg-white/5
              p-4
              transition-all
              hover:bg-white/10
              hover:translate-x-1
            "
            >
              Complete Profile
            </Link>

            <Link
              href="/borrower/upload"
              className="
              rounded-xl
              border
              border-white/10
              bg-white/5
              p-4
              transition-all
              hover:bg-white/10
              hover:translate-x-1
            "
            >
              Upload Salary Slip
            </Link>

            <Link
              href="/borrower/apply"
              className="
              rounded-xl
              border
              border-white/10
              bg-white/5
              p-4
              transition-all
              hover:bg-white/10
              hover:translate-x-1
            "
            >
              Apply For Loan
            </Link>

            <Link
              href="/borrower/loans"
              className="
              rounded-xl
              border
              border-white/10
              bg-white/5
              p-4
              transition-all
              hover:bg-white/10
              hover:translate-x-1
            "
            >
              View My Loans
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            x: 20,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          className="
          rounded-3xl
          border
          border-white/10
          bg-white/5
          backdrop-blur-md
          p-6
        "
        >
          <h2 className="mb-5 text-xl font-bold">
            Latest Loan
          </h2>

          {dashboard?.latestLoan ? (
            <div className="space-y-4">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>
                  Amount
                </span>

                <span className="font-semibold">
                  ₹
                  {dashboard.latestLoan.loanAmount?.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>
                  Tenure
                </span>

                <span className="font-semibold">
                  {
                    dashboard
                      .latestLoan
                      .tenureDays
                  }{" "}
                  Days
                </span>
              </div>

              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>
                  Repayment
                </span>

                <span className="font-semibold">
                  ₹
                  {dashboard.latestLoan.totalRepayment?.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>
                  Outstanding
                </span>

                <span className="font-semibold">
                  ₹
                  {dashboard.latestLoan.outstandingAmount?.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>
                  Status
                </span>

                <span
                  className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide ${getStatusColor(
                    dashboard
                      .latestLoan
                      .status
                  )}`}
                >
                  {
                    dashboard
                      .latestLoan
                      .status
                  }
                </span>
              </div>
            </div>
          ) : (
            <p>
              No loan applications
              found
            </p>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  </RoleGuard>
);
}