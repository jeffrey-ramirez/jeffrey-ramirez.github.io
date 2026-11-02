import { approach } from "@/data/approach";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";

export function EngineeringApproach() {
  return (
    <Section
      id="approach"
      eyebrow="Engineering Approach"
      title="How I Build"
      description="A loop, not a checklist. Every shipped feature feeds the next round of understanding."
    >
      <ol className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {approach.map((step, i) => (
          <li key={step.number} className="bg-background">
            <Reveal
              delay={i * 0.08}
              className="group relative flex h-full flex-col p-7 transition-colors duration-300 hover:bg-surface sm:p-8"
            >
              <div className="mb-10 flex items-center gap-3">
                <span className="font-mono text-sm text-accent">{step.number}</span>
                <span
                  aria-hidden
                  className="h-px flex-1 origin-left scale-x-50 bg-gradient-to-r from-border-strong to-transparent transition-transform duration-500 group-hover:scale-x-100"
                />
              </div>
              <h3 className="text-2xl font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-pretty text-muted">{step.description}</p>
              <ul className="mt-auto space-y-1.5 pt-8">
                {step.principles.map((p) => (
                  <li key={p} className="font-mono text-xs text-subtle">
                    <span className="text-accent-2" aria-hidden>
                      ›{" "}
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
