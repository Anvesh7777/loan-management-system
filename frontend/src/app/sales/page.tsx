"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import DashboardLayout from "@/components/layout/DashboardLayout";

import { getLeads } from "@/services/sales.service";

export default function SalesPage() {
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

  return (
    <DashboardLayout title="Sales Dashboard">
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
          Lead Management
        </h2>

        <p className="mt-2 text-zinc-400">
          Review borrower profiles
          and identify qualified
          leads.
        </p>
      </motion.div>

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
          No Leads Found
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
                    LEAD
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

                  <div className="flex justify-between">
                    <span className="text-zinc-400">
                      Employment
                    </span>

                    <span>
                      {
                        lead.employmentMode
                      }
                    </span>
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