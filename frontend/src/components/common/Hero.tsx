import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-20 top-20 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute right-20 top-20 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="mx-auto grid min-h-[90vh] max-w-7xl items-center gap-16 px-6 py-16 lg:grid-cols-2">
        <div>
          <Badge className="mb-6 rounded-full px-4 py-1">
            Modern Loan Lifecycle Platform
          </Badge>

          <h1 className="text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
            Manage Loans
            <span className="block bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 bg-clip-text text-transparent">
              From Application
            </span>
            To Collection
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            A complete loan lifecycle platform with borrower onboarding,
            BRE validation, loan sanctioning, disbursement, payment
            tracking and collection workflows.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/register">
                Apply For Loan
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
            >
              <Link href="/login">
                Staff Login
              </Link>
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-4">
            <div className="rounded-2xl border border-border/50 bg-card/50 p-5 backdrop-blur">
              <h3 className="text-3xl font-bold text-blue-400">
                6
              </h3>
              <p className="text-sm text-muted-foreground">
                User Roles
              </p>
            </div>

            <div className="rounded-2xl border border-border/50 bg-card/50 p-5 backdrop-blur">
              <h3 className="text-3xl font-bold text-emerald-400">
                100%
              </h3>
              <p className="text-sm text-muted-foreground">
                Digital Workflow
              </p>
            </div>

            <div className="rounded-2xl border border-border/50 bg-card/50 p-5 backdrop-blur">
              <h3 className="text-3xl font-bold text-violet-400">
                24/7
              </h3>
              <p className="text-sm text-muted-foreground">
                Monitoring
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-8 top-10 rounded-2xl border border-border/50 bg-card/70 p-4 shadow-xl backdrop-blur">
            <p className="text-xs text-muted-foreground">
              Active Loans
            </p>
            <h4 className="text-2xl font-bold">
              ₹12.5 Cr
            </h4>
          </div>

          <div className="absolute -right-6 bottom-20 rounded-2xl border border-border/50 bg-card/70 p-4 shadow-xl backdrop-blur">
            <p className="text-xs text-muted-foreground">
              Collection Rate
            </p>
            <h4 className="text-2xl font-bold text-emerald-400">
              98.2%
            </h4>
          </div>

          <Image
            src="/illustrations/hero.svg"
            alt="Loan Management Platform"
            width={800}
            height={800}
            priority
            className="mx-auto w-full max-w-2xl"
          />
        </div>
      </div>
    </section>
  );
}