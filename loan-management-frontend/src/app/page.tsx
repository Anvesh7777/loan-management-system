import Navbar from "@/components/layout/navbar";

export default function HomePage() {
  return (
    <main>
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-24">
        <h1 className="text-6xl font-bold">
          Smart Lending.
          <br />
          Transparent Decisions.
        </h1>

        <p className="mt-6 max-w-xl text-muted-foreground text-lg">
          A modern loan management platform
          inspired by the best fintech
          experiences.
        </p>
      </section>
    </main>
  );
}