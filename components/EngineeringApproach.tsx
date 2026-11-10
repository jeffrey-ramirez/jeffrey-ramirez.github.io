import { approach } from "@/data/approach";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";

export function EngineeringApproach() {
  return (
    <Section
      id="approach"
      number="05"
      eyebrow="How I work"
      title="A loop, not a checklist."
      description="Every shipped feature feeds the next round of understanding."
      className="border-t border-border"
    >
      <ol className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {approach.map((step, i) => (
          <li key={step.number} className="border-t border-border-strong pt-5">
            <Reveal delay={i * 0.08} className="flex h-full flex-col">
              <span className="label text-muted">{step.number}</span>
              <h3 className="mt-8 text-2xl font-bold tracking-[-0.03em]">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-pretty text-muted">{step.description}</p>
              <ul className="mt-auto space-y-1.5 pt-6">
                {step.principles.map((p) => (
                  <li key={p} className="text-sm leading-relaxed text-muted">
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
