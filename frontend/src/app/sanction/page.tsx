"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import DashboardLayout from "@/components/layout/DashboardLayout";

import {
  getPendingLoans,
  approveLoan,
  rejectLoan,
} from "@/services/sanction.service";

export default function SanctionPage() {
  const [loading, setLoading] =
    useState(true);

  const [loans, setLoans] =
    useState<any[]>([]);

  const fetchLoans =
    async () => {
      try {
        const response =
          await getPendingLoans();

        setLoans(
          response.data.loans
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchLoans();
  }, []);

  const handleApprove =
    async (
      loanId: string
    ) => {
      try {
        await approveLoan(loanId);

        alert(
          "Loan approved successfully"
        );

        fetchLoans();
      } catch (error: any) {
        alert(
          error?.response?.data
            ?.message ||
            "Approval failed"
        );
      }
    };

  const handleReject =
    async (
      loanId: string
    ) => {
      const reason =
        prompt(
          "Enter rejection reason"
        );

      if (!reason) return;

      try {
        await rejectLoan(
          loanId,
          reason
        );

        alert(
          "Loan rejected successfully"
        );

        fetchLoans();
      } catch (error: any) {
        alert(
          error?.response?.data
            ?.message ||
            "Rejection failed"
        );
      }
    };

  return (
    <DashboardLayout title="Sanction Dashboard">
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold">
          Loan Approval Queue
        </h2>

        <p className="mt-2 text-zinc-400">
          Review loan requests and
          make sanction decisions.
        </p>
      </motion.div>

      {loading ? (
        <div className="flex h-[50vh] items-center justify-center">
          <p className="text-zinc-400">
            Loading Applications...
          </p>
        </div>
      ) : loans.length === 0 ? (
        <div
          className="
          rounded-3xl
          border
          border-white/10
          bg-white/5
          backdrop-blur-md
          p-6
        "
        >
          No Pending Loans
        </div>
      ) : (
        <div className="space-y-6">
          {loans.map(
            (
              loan,
              index
            ) => (
              <motion.div
                key={loan._id}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay:
                    index * 0.05,
                }}
                whileHover={{
                  scale: 1.01,
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
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold">
                        {
                          loan
                            .borrowerId
                            ?.fullName
                        }
                      </h3>

                      <span
                        className="
                        rounded-full
                        bg-yellow-500/20
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        text-yellow-400
                      "
                      >
                        PENDING
                      </span>
                    </div>

                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="text-sm text-zinc-400">
                          PAN
                        </p>

                        <p>
                          {
                            loan
                              .borrowerId
                              ?.pan
                          }
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-zinc-400">
                          Monthly Salary
                        </p>

                        <p>
                          ₹
                          {
                            loan
                              .borrowerId
                              ?.monthlySalary
                          }
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-zinc-400">
                          Loan Amount
                        </p>

                        <p>
                          ₹
                          {loan.loanAmount?.toLocaleString()}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-zinc-400">
                          Tenure
                        </p>

                        <p>
                          {
                            loan.tenureDays
                          }{" "}
                          Days
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-zinc-400">
                          Repayment
                        </p>

                        <p>
                          ₹
                          {loan.totalRepayment?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() =>
                        handleApprove(
                          loan._id
                        )
                      }
                      className="
                        rounded-xl
                        bg-green-600
                        px-5
                        py-3
                        font-medium
                        text-white
                        transition-all
                        hover:bg-green-500
                      "
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        handleReject(
                          loan._id
                        )
                      }
                      className="
                        rounded-xl
                        bg-red-600
                        px-5
                        py-3
                        font-medium
                        text-white
                        transition-all
                        hover:bg-red-500
                      "
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          )}
        </div>
      )}
    </DashboardLayout>
  );
}