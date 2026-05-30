"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";



import {
  getDisbursedLoans,
  collectPayment,
} from "@/services/collection.service";

export default function CollectionModule() {
  const [loading, setLoading] =
    useState(true);

  const [loans, setLoans] =
    useState<any[]>([]);

  const fetchLoans =
    async () => {
      try {
        const response =
          await getDisbursedLoans();

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

  const handlePayment =
    async (
      loanId: string
    ) => {
      const amount =
        prompt(
          "Enter payment amount"
        );

      if (!amount) return;

      const utr =
        prompt(
          "Enter UTR Number"
        );

      if (!utr) return;

      try {
        await collectPayment(
          loanId,
          Number(amount),
          utr
        );

        alert(
          "Payment collected successfully"
        );

        fetchLoans();
      } catch (error: any) {
        alert(
          error?.response?.data
            ?.message ||
            "Payment failed"
        );
      }
    };

  return (
   <>
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
          Loan Collections
        </h2>

        <p className="mt-2 text-zinc-400">
          Track repayments and
          manage outstanding
          balances.
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
          No Disbursed Loans
        </div>
      ) : (
        <div className="space-y-6">
          {loans.map(
            (
              loan,
              index
            ) => {
              const outstanding =
                loan.totalRepayment -
                loan.amountPaid;

              return (
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
                      index *
                      0.05,
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
                          bg-blue-500/20
                          px-3
                          py-1
                          text-xs
                          font-semibold
                          text-blue-400
                        "
                        >
                          ACTIVE
                        </span>
                      </div>

                      <div className="mt-5 grid gap-4 md:grid-cols-2">
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
                            Repayment
                          </p>

                          <p>
                            ₹
                            {loan.totalRepayment?.toLocaleString()}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-zinc-400">
                            Paid
                          </p>

                          <p className="text-green-400">
                            ₹
                            {loan.amountPaid?.toLocaleString()}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-zinc-400">
                            Outstanding
                          </p>

                          <p className="text-red-400">
                            ₹
                            {outstanding.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        handlePayment(
                          loan._id
                        )
                      }
                      className="
                        rounded-xl
                        bg-green-600
                        px-6
                        py-3
                        font-medium
                        text-white
                        transition-all
                        hover:bg-green-500
                      "
                    >
                      Record Payment
                    </button>
                  </div>
                </motion.div>
              );
            }
          )}
        </div>
      )}
   </>
  );
}