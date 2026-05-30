const steps = [
  "Borrower",
  "Sales",
  "Sanction",
  "Disbursement",
  "Collection",
  "Admin",
];

export default function Workflow() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <h2 className="mb-12 text-center text-4xl font-bold">
        Loan Workflow
      </h2>

      <div className="flex flex-wrap items-center justify-center gap-4">
        {steps.map((step, index) => (
          <div
            key={step}
            className="flex items-center gap-4"
          >
            <div className="rounded-full border px-6 py-3">
              {step}
            </div>

            {index !== steps.length - 1 && (
              <span>→</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}