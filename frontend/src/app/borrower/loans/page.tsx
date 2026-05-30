"use client";

import { useEffect, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/common/StatCard";

import { getMyLoans } from "@/services/loan.service";

interface Loan {
  _id: string;
  loanAmount: number;
  tenureDays: number;
  totalRepayment: number;
  amountPaid: number;
  status: string;
  createdAt: string;
}

export default function LoansPage() {
  const [loading, setLoading] =
    useState(true);

  const [loans, setLoans] =
    useState<Loan[]>([]);

  useEffect(() => {
    const fetchLoans =
      async () => {
        try {
          const response =
            await getMyLoans();

          setLoans(
            response.data.loans
          );
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

    fetchLoans();
  }, []);

  const activeLoans =
    loans.filter(
      (loan) =>
        loan.status !==
          "CLOSED" &&
        loan.status !==
          "REJECTED"
    ).length;

  const totalOutstanding =
    loans.reduce(
      (sum, loan) =>
        sum +
        (loan.totalRepayment -
          loan.amountPaid),
      0
    );

  return (
    <DashboardLayout title="My Loans">
      {loading ? (
        <div className="flex h-[40vh] items-center justify-center">
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
            p-8
            text-center
            backdrop-blur-md
          "
        >
          <h2 className="text-xl font-semibold">
            No Loans Found
          </h2>

          <p className="mt-2 text-zinc-400">
            Apply for your first loan
            to get started.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-8 grid gap-4 md:grid-cols-3">
            <StatCard
              title="Total Loans"
              value={loans.length}
            />

            <StatCard
              title="Active Loans"
              value={activeLoans}
            />

            <StatCard
              title="Outstanding"
              value={`₹${totalOutstanding.toLocaleString()}`}
            />
          </div>

          <div
            className="
              overflow-x-auto
              rounded-3xl
              border
              border-white/10
              bg-white/5
              backdrop-blur-md
            "
          >
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-4 text-left">
                    Amount
                  </th>

                  <th className="p-4 text-left">
                    Tenure
                  </th>

                  <th className="p-4 text-left">
                    Repayment
                  </th>

                  <th className="p-4 text-left">
                    Paid
                  </th>

                  <th className="p-4 text-left">
                    Outstanding
                  </th>

                  <th className="p-4 text-left">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {loans.map(
                  (loan) => {
                    const outstanding =
                      loan.totalRepayment -
                      loan.amountPaid;

                    return (
                      <tr
                        key={loan._id}
                        className="border-b border-white/5"
                      >
                        <td className="p-4">
                          ₹
                          {loan.loanAmount.toLocaleString()}
                        </td>

                        <td className="p-4">
                          {loan.tenureDays} Days
                        </td>

                        <td className="p-4">
                          ₹
                          {loan.totalRepayment.toLocaleString()}
                        </td>

                        <td className="p-4">
                          ₹
                          {loan.amountPaid.toLocaleString()}
                        </td>

                        <td className="p-4">
                          ₹
                          {outstanding.toLocaleString()}
                        </td>

                        <td className="p-4">
                          <span
                            className="
                              rounded-full
                              bg-primary/20
                              px-3
                              py-1
                              text-xs
                              font-semibold
                            "
                          >
                            {loan.status}
                          </span>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}