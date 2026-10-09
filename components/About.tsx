import Image from "next/image";
import { Check } from "lucide-react";
import { profile } from "@/data/profile";
import { StackVisual } from "./StackVisual";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";

export function About() {
  const { about } = profile;

  return (
    <Section
      id="about"
      eyebrow="About"
      title={
        <>
          Frontend depth. <span className="text-muted">Full-stack range.</span>
        </>
      }
    >
      <div className="grid items-start gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="text-xl leading-relaxed font-medium text-pretty sm:text-2xl">{about.lead}</p>
          </Reveal>
          <div className="mt-6 space-y-5">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.05 * (i + 1)}>
                <p className="leading-relaxed text-pretty text-muted">{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <ul className="mt-8 grid gap-x-6 gap-y-2.5 sm:grid-cols-2" aria-label="Focus areas">
              {about.focus.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm">
                  <Check size={14} className="text-accent-2" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.25}>
            <dl className="mt-10 grid grid-cols-3 divide-x divide-border border-y border-border">
              {about.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse px-4 py-5 first:pl-0">
                  <dt className="mt-1 text-xs leading-snug text-subtle">{stat.label}</dt>
                  <dd className="text-3xl font-semibold tracking-tight">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.3}>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2" aria-label="Education and eligibility">
              {about.credentials.map((c) => (
                <li key={c.label} className="rounded-xl border border-border bg-surface/50 px-4 py-3.5">
                  <p className="font-mono text-[11px] tracking-wider text-accent-2 uppercase">{c.label}</p>
                  <p className="mt-1.5 text-sm font-medium">{c.title}</p>
                  <p className="mt-0.5 text-xs text-subtle">
                    {c.detail} · {c.period}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:sticky lg:top-28">
          <figure className="mb-6 flex items-center gap-5 rounded-2xl border border-border bg-surface/50 p-4">
            <Image
              src="/jeffrey-ramirez.webp"
              alt={`Portrait of ${profile.name}`}
              width={720}
              height={720}
              className="size-24 shrink-0 rounded-xl object-cover ring-1 ring-border sm:size-28"
            />
            <figcaption>
              <p className="font-semibold">{profile.name}</p>
              <p className="mt-0.5 text-sm text-muted">{profile.title}</p>
              <p className="mt-2 font-mono text-xs text-subtle">{profile.location}</p>
            </figcaption>
          </figure>
          <StackVisual />
        </Reveal>
      </div>
    </Section>
  );
}
