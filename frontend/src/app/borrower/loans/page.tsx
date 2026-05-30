"use client";

import { useEffect, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";

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

  return (
    <DashboardLayout title="My Loans">
      {loading ? (
        <p>Loading...</p>
      ) : loans.length === 0 ? (
        <div className="rounded-2xl border p-6">
          No loans found
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border">
          <table className="w-full">
            <thead>
              <tr className="border-b">
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
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {loans.map(
                (loan) => (
                  <tr
                    key={loan._id}
                    className="border-b"
                  >
                    <td className="p-4">
                      ₹
                      {loan.loanAmount.toLocaleString()}
                    </td>

                    <td className="p-4">
                      {
                        loan.tenureDays
                      }{" "}
                      Days
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
                      {loan.status}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
}