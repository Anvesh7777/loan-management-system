import {
  ShieldCheck,
  Wallet,
  Users,
  FileText,
} from "lucide-react";

const features = [
  {
    title: "Secure Authentication",
    icon: ShieldCheck,
    description:
      "JWT based role-based access control.",
  },
  {
    title: "Loan Processing",
    icon: Wallet,
    description:
      "End-to-end lifecycle from application to closure.",
  },
  {
    title: "Role Management",
    icon: Users,
    description:
      "Dedicated workflows for every team.",
  },
  {
    title: "Document Uploads",
    icon: FileText,
    description:
      "Secure salary slip uploads and verification.",
  },
];

export default function Features() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold">
          Platform Features
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="rounded-2xl border bg-card p-6"
            >
              <Icon className="mb-4 h-8 w-8" />

              <h3 className="mb-2 font-semibold">
                {feature.title}
              </h3>

              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}