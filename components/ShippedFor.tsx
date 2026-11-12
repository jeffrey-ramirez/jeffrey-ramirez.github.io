import { shippedFor } from "@/data/profile";

export function ShippedFor() {
  return (
    <section aria-label="Organizations I have shipped for" className="border-y border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-9 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <p className="shrink-0 label text-muted">Shipped for</p>
        <ul className="flex flex-wrap items-center gap-x-10 gap-y-3 text-xl font-bold tracking-[-0.03em] text-muted sm:text-2xl">
          {shippedFor.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
