"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/common/StatCard";

import { getAdminStats } from "@/services/admin.service";

export default function AdminPage() {
  const [stats, setStats] =
    useState<any>(null);

  useEffect(() => {
    const fetchStats =
      async () => {
        try {
          const response =
            await getAdminStats();

          setStats(
            response.data.stats
          );
        } catch (error) {
          console.error(error);
        }
      };

    fetchStats();
  }, []);

  if (!stats) {
    return (
      <DashboardLayout title="Admin Dashboard">
        <div className="flex h-[60vh] items-center justify-center">
          <p className="text-zinc-400">
            Loading Dashboard...
          </p>
        </div>
      </DashboardLayout>
    );
  }

  const chartData = [
    {
      name: "Pending",
      value: stats.pendingLoans,
    },
    {
      name: "Sanctioned",
      value:
        stats.sanctionedLoans,
    },
    {
      name: "Disbursed",
      value:
        stats.disbursedLoans,
    },
    {
      name: "Closed",
      value:
        stats.closedLoans,
    },
  ];

  const approvalRate =
    stats.totalLoans > 0
      ? (
          ((stats.sanctionedLoans +
            stats.disbursedLoans +
            stats.closedLoans) /
            stats.totalLoans) *
          100
        ).toFixed(1)
      : 0;

  return (
    <DashboardLayout title="Admin Dashboard">
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
          Control Center
        </h2>

        <p className="mt-2 text-zinc-400">
          Monitor platform
          performance and
          manage all modules.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">
        <StatCard
          title="Total Loans"
          value={
            stats.totalLoans
          }
        />

        <StatCard
          title="Pending"
          value={
            stats.pendingLoans
          }
        />

        <StatCard
          title="Disbursed"
          value={
            stats.disbursedLoans
          }
        />

        <StatCard
          title="Closed"
          value={
            stats.closedLoans
          }
        />

        <StatCard
          title="Approval Rate"
          value={`${approvalRate}%`}
        />

        <StatCard
          title="Collections"
          value={`₹${stats.totalCollectionAmount.toLocaleString()}`}
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
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
          <h3 className="mb-4 text-xl font-bold">
            Loan Status Distribution
          </h3>

          <div className="h-80">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  outerRadius={110}
                >
                  <Cell fill="#3B82F6" />
                  <Cell fill="#F59E0B" />
                  <Cell fill="#8B5CF6" />
                  <Cell fill="#10B981" />
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.1,
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
          <h3 className="mb-6 text-xl font-bold">
            Loan Lifecycle Funnel
          </h3>

          <div className="space-y-4">
            <div className="rounded-xl bg-blue-500/20 p-4">
              Pending
              <span className="float-right font-bold">
                {
                  stats.pendingLoans
                }
              </span>
            </div>

            <div className="rounded-xl bg-yellow-500/20 p-4">
              Sanctioned
              <span className="float-right font-bold">
                {
                  stats.sanctionedLoans
                }
              </span>
            </div>

            <div className="rounded-xl bg-purple-500/20 p-4">
              Disbursed
              <span className="float-right font-bold">
                {
                  stats.disbursedLoans
                }
              </span>
            </div>

            <div className="rounded-xl bg-green-500/20 p-4">
              Closed
              <span className="float-right font-bold">
                {
                  stats.closedLoans
                }
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-8">
        <h3 className="mb-4 text-xl font-bold">
          Quick Access
        </h3>

        <div className="grid gap-4 md:grid-cols-4">
          <Link
            href="/admin/sales"
            className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10"
          >
            Sales Module
          </Link>

          <Link
            href="/admin/sanction"
            className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10"
          >
            Sanction Module
          </Link>

          <Link
            href="/admin/disbursement"
            className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10"
          >
            Disbursement Module
          </Link>

          <Link
            href="/admin/collection"
            className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10"
          >
            Collection Module
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}