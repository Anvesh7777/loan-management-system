"use client";

import { useMemo, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { applyLoan } from "@/services/loan.service";

const INTEREST_RATE = 12;

export default function ApplyLoanPage() {
  const [loanAmount, setLoanAmount] =
    useState(100000);

  const [tenureDays, setTenureDays] =
    useState(90);

  const [loading, setLoading] =
    useState(false);

  const { simpleInterest, totalRepayment } =
    useMemo(() => {
      const si =
        (loanAmount *
          INTEREST_RATE *
          tenureDays) /
        (365 * 100);

      return {
        simpleInterest:
          Number(si.toFixed(2)),
        totalRepayment: Number(
          (
            loanAmount + si
          ).toFixed(2)
        ),
      };
    }, [loanAmount, tenureDays]);

  const handleApply = async () => {
    try {
      setLoading(true);

      await applyLoan({
        loanAmount,
        tenureDays,
      });

      alert(
        "Loan application submitted successfully"
      );
    } catch (error: any) {
      alert(
        error?.response?.data?.message ||
          "Failed to apply loan"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="Apply Loan">
      <div className="max-w-4xl rounded-2xl border p-6">
        <h2 className="mb-8 text-2xl font-bold">
          Loan Configuration
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-medium">
              Loan Amount
            </label>

            <div className="mb-2 text-2xl font-bold">
              ₹
              {loanAmount.toLocaleString()}
            </div>

            <input
              type="range"
              min="50000"
              max="500000"
              step="10000"
              value={loanAmount}
              onChange={(e) =>
                setLoanAmount(
                  Number(
                    e.target.value
                  )
                )
              }
              className="w-full"
            />

            <div className="mt-2 flex justify-between text-sm text-muted-foreground">
              <span>₹50K</span>
              <span>₹5L</span>
            </div>

            <div className="mt-8">
              <label className="mb-2 block font-medium">
                Tenure
              </label>

              <div className="mb-2 text-2xl font-bold">
                {tenureDays} Days
              </div>

              <input
                type="range"
                min="30"
                max="365"
                value={tenureDays}
                onChange={(e) =>
                  setTenureDays(
                    Number(
                      e.target.value
                    )
                  )
                }
                className="w-full"
              />

              <div className="mt-2 flex justify-between text-sm text-muted-foreground">
                <span>30</span>
                <span>365</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border p-6">
            <h3 className="mb-6 text-xl font-semibold">
              Repayment Summary
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span>
                  Principal
                </span>

                <span>
                  ₹
                  {loanAmount.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span>
                  Interest Rate
                </span>

                <span>
                  {INTEREST_RATE}% p.a.
                </span>
              </div>

              <div className="flex justify-between">
                <span>
                  Simple Interest
                </span>

                <span>
                  ₹
                  {simpleInterest.toLocaleString()}
                </span>
              </div>

              <hr />

              <div className="flex justify-between text-lg font-bold">
                <span>
                  Total Repayment
                </span>

                <span>
                  ₹
                  {totalRepayment.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              onClick={handleApply}
              disabled={loading}
              className="mt-8 w-full rounded-xl bg-primary py-3 text-primary-foreground"
            >
              {loading
                ? "Submitting..."
                : "Apply Loan"}
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}