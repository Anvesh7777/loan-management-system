"use client";

import Link from "next/link";
import { ReactNode } from "react";
import {
  usePathname,
  useRouter,
} from "next/navigation";

import {
  LayoutDashboard,
  User,
  Upload,
  Wallet,
  FileText,
  ShieldCheck,
  Landmark,
  CreditCard,
  BarChart3,
  LogOut,
} from "lucide-react";

import { useAuthStore } from "@/store/auth.store";

interface Props {
  title: string;
  children: ReactNode;
}

export default function DashboardLayout({
  title,
  children,
}: Props) {
  const pathname =
    usePathname();

  const router = useRouter();

  const { logout, user } =
    useAuthStore();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const borrowerLinks = [
    {
      href: "/borrower",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/borrower/profile",
      label: "Profile",
      icon: User,
    },
    {
      href: "/borrower/upload",
      label: "Upload Slip",
      icon: Upload,
    },
    {
      href: "/borrower/apply",
      label: "Apply Loan",
      icon: Wallet,
    },
    {
      href: "/borrower/loans",
      label: "My Loans",
      icon: FileText,
    },
  ];

  const salesLinks = [
    {
      href: "/sales",
      label: "Leads",
      icon: User,
    },
  ];

  const sanctionLinks = [
    {
      href: "/sanction",
      label: "Approvals",
      icon: ShieldCheck,
    },
  ];

  const disbursementLinks = [
    {
      href: "/disbursement",
      label: "Disbursement",
      icon: Landmark,
    },
  ];

  const collectionLinks = [
    {
      href: "/collection",
      label: "Collections",
      icon: CreditCard,
    },
  ];

  const adminLinks = [
  {
    href: "/admin",
    label: "Analytics",
    icon: BarChart3,
  },

  {
    href: "/admin/sales",
    label: "Sales",
    icon: User,
  },

  {
    href: "/admin/sanction",
    label: "Sanction",
    icon: ShieldCheck,
  },

  {
    href: "/admin/disbursement",
    label: "Disbursement",
    icon: Landmark,
  },

  {
    href: "/admin/collection",
    label: "Collection",
    icon: CreditCard,
  },
];

  let links =
    borrowerLinks;

  switch (
    user?.role
  ) {
    case "SALES":
      links =
        salesLinks;
      break;

    case "SANCTION":
      links =
        sanctionLinks;
      break;

    case "DISBURSEMENT":
      links =
        disbursementLinks;
      break;

    case "COLLECTION":
      links =
        collectionLinks;
      break;

    case "ADMIN":
      links =
        adminLinks;
      break;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-3xl" />

        <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-purple-600/15 blur-3xl" />

        <div className="absolute bottom-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-600/10 blur-3xl" />
      </div>

      <header className="border-b border-white/10 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <h1 className="text-xl font-bold">
            {title}
          </h1>

          <button
            onClick={
              handleLogout
            }
            className="
            flex items-center gap-2
            rounded-xl
            border
            border-white/10
            bg-white/5
            px-4
            py-2
            transition-all
            hover:bg-white/10
          "
          >
            <LogOut
              size={16}
            />
            Logout
          </button>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl">
        <aside className="w-64 border-r border-white/10 p-6">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-wider text-zinc-500">
              Navigation
            </p>
          </div>

          <nav className="space-y-3">
            {links.map(
              (link) => {
                const Icon =
                  link.icon;

                const active =
                  pathname ===
                  link.href;

                return (
                  <Link
                    key={
                      link.href
                    }
                    href={
                      link.href
                    }
                    className={`
                    flex items-center gap-3 rounded-xl p-3 transition-all
                    ${
                      active
                        ? "bg-blue-600 text-white"
                        : "border border-white/10 bg-white/5 hover:bg-white/10"
                    }
                  `}
                  >
                    <Icon
                      size={18}
                    />

                    {
                      link.label
                    }
                  </Link>
                );
              }
            )}
          </nav>
        </aside>

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}