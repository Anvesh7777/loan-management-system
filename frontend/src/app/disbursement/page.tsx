"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import DashboardLayout from "@/components/layout/DashboardLayout";

import {
  getSanctionedLoans,
  disburseLoan,
} from "@/services/disbursement.service";

export default function DisbursementPage() {
  const [loading, setLoading] =
    useState(true);

  const [loans, setLoans] =
    useState<any[]>([]);

  const fetchLoans =
    async () => {
      try {
        const response =
          await getSanctionedLoans();

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

  const handleDisburse =
    async (
      loanId: string
    ) => {
      try {
        await disburseLoan(
          loanId
        );

        alert(
          "Loan disbursed successfully"
        );

        fetchLoans();
      } catch (error: any) {
        alert(
          error?.response?.data
            ?.message ||
            "Failed to disburse loan"
        );
      }
    };

  return (
    <DashboardLayout title="Disbursement Dashboard">
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
          Loan Disbursement
        </h2>

        <p className="mt-2 text-zinc-400">
          Release approved funds
          to eligible borrowers.
        </p>
      </motion.div>

      {loading ? (
        <div className="flex h-[50vh] items-center justify-center">
          <p className="text-zinc-400">
            Loading Loans...
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
          No Sanctioned Loans
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
                        bg-green-500/20
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        text-green-400
                      "
                      >
                        SANCTIONED
                      </span>
                    </div>

                    <div className="mt-5 grid gap-4 md:grid-cols-3">
                      <div>
                        <p className="text-sm text-zinc-400">
                          Amount
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

                  <button
                    onClick={() =>
                      handleDisburse(
                        loan._id
                      )
                    }
                    className="
                    rounded-xl
                    bg-blue-600
                    px-6
                    py-3
                    font-medium
                    text-white
                    transition-all
                    hover:bg-blue-500
                  "
                  >
                    Disburse Loan
                  </button>
                </div>
              </motion.div>
            )
          )}
        </div>
      )}
    </DashboardLayout>
  );
}