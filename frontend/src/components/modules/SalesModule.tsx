"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { getLeads } from "@/services/sales.service";

export default function SalesModule() {
  const [loading, setLoading] =
    useState(true);

  const [leads, setLeads] =
    useState<any[]>([]);

  useEffect(() => {
    const fetchLeads =
      async () => {
        try {
          const response =
            await getLeads();

          setLeads(
            response.data.leads
          );
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

    fetchLeads();
  }, []);

  const stats = {
    noApplication:
      leads.filter(
        (l) =>
          l.loanStatus ===
          "NO_APPLICATION"
      ).length,

    pending:
      leads.filter(
        (l) =>
          l.loanStatus ===
          "PENDING"
      ).length,

    sanctioned:
      leads.filter(
        (l) =>
          l.loanStatus ===
          "SANCTIONED"
      ).length,

    disbursed:
      leads.filter(
        (l) =>
          l.loanStatus ===
          "DISBURSED"
      ).length,

    closed:
      leads.filter(
        (l) =>
          l.loanStatus ===
          "CLOSED"
      ).length,

    rejected:
      leads.filter(
        (l) =>
          l.loanStatus ===
          "REJECTED"
      ).length,
  };

  const getStatusClasses = (
    status: string
  ) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-500/20 text-yellow-400";

      case "SANCTIONED":
        return "bg-blue-500/20 text-blue-400";

      case "DISBURSED":
        return "bg-purple-500/20 text-purple-400";

      case "CLOSED":
        return "bg-green-500/20 text-green-400";

      case "REJECTED":
        return "bg-red-500/20 text-red-400";

      default:
        return "bg-zinc-500/20 text-zinc-400";
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
          Lead & Pipeline Tracking
        </h2>

        <p className="mt-2 text-zinc-400">
          Monitor borrower
          journey across the
          entire loan lifecycle.
        </p>
      </motion.div>

      <div className="mb-8 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        <StatCard
          title="No App"
          value={
            stats.noApplication
          }
        />

        <StatCard
          title="Pending"
          value={stats.pending}
        />

        <StatCard
          title="Sanctioned"
          value={
            stats.sanctioned
          }
        />

        <StatCard
          title="Disbursed"
          value={
            stats.disbursed
          }
        />

        <StatCard
          title="Closed"
          value={stats.closed}
        />

        <StatCard
          title="Rejected"
          value={
            stats.rejected
          }
        />
      </div>

      {loading ? (
        <div className="flex h-[50vh] items-center justify-center">
          <p className="text-zinc-400">
            Loading Leads...
          </p>
        </div>
      ) : leads.length === 0 ? (
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
          No Borrowers Found
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {leads.map(
            (
              lead,
              index
            ) => (
              <motion.div
                key={lead._id}
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
                  scale: 1.02,
                  y: -4,
                }}
                className="
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/5
                  backdrop-blur-md
                  p-6
                  shadow-xl
                "
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">
                    {
                      lead.fullName
                    }
                  </h3>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                      lead.loanStatus
                    )}`}
                  >
                    {
                      lead.loanStatus
                    }
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-zinc-400">
                      PAN
                    </span>

                    <span>
                      {lead.pan}
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-zinc-400">
                      Salary
                    </span>

                    <span>
                      ₹
                      {lead.monthlySalary?.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-zinc-400">
                      Employment
                    </span>

                    <span>
                      {
                        lead.employmentMode
                      }
                    </span>
                  </div>

                  {lead.loanAmount && (
                    <>
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-zinc-400">
                          Loan Amount
                        </span>

                        <span>
                          ₹
                          {lead.loanAmount.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-zinc-400">
                          Repayment
                        </span>

                        <span>
                          ₹
                          {lead.totalRepayment?.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-zinc-400">
                          Amount Paid
                        </span>

                        <span>
                          ₹
                          {lead.amountPaid?.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-zinc-400">
                          Outstanding
                        </span>

                        <span>
                          ₹
                          {(
                            (lead.totalRepayment ||
                              0) -
                            (lead.amountPaid ||
                              0)
                          ).toLocaleString()}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            )
          )}
        </div>
      )}
    </>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-white/5
        p-4
      "
    >
      <p className="text-sm text-zinc-400">
        {title}
      </p>

      <p className="mt-2 text-2xl font-bold">
        {value}
      </p>
    </div>
  );
}