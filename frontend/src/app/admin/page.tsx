"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
          Platform Overview
        </h2>

        <p className="mt-2 text-zinc-400">
          Monitor loans,
          collections and
          overall platform
          performance.
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
          title="Pending Loans"
          value={
            stats.pendingLoans
          }
        />

        <StatCard
          title="Sanctioned"
          value={
            stats.sanctionedLoans
          }
        />

        <StatCard
          title="Disbursed"
          value={
            stats.disbursedLoans
          }
        />

        <StatCard
          title="Closed Loans"
          value={
            stats.closedLoans
          }
        />

        <StatCard
          title="Collections"
          value={`₹${stats.totalCollectionAmount.toLocaleString()}`}
        />
      </div>

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
          delay: 0.2,
        }}
        className="
          mt-8
          rounded-3xl
          border
          border-white/10
          bg-white/5
          backdrop-blur-md
          p-6
        "
      >
        <h3 className="text-xl font-bold">
          Executive Summary
        </h3>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div>
            <p className="text-sm text-zinc-400">
              Total Portfolio
            </p>

            <p className="mt-2 text-2xl font-bold">
              {
                stats.totalLoans
              }
            </p>
          </div>

          <div>
            <p className="text-sm text-zinc-400">
              Active Loans
            </p>

            <p className="mt-2 text-2xl font-bold">
              {stats.pendingLoans +
                stats.sanctionedLoans +
                stats.disbursedLoans}
            </p>
          </div>

          <div>
            <p className="text-sm text-zinc-400">
              Total Collection
            </p>

            <p className="mt-2 text-2xl font-bold text-green-400">
              ₹
              {stats.totalCollectionAmount.toLocaleString()}
            </p>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}