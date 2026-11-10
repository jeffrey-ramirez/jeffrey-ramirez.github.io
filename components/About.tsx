import Image from "next/image";
import { ArrowDownRight } from "lucide-react";
import { profile } from "@/data/profile";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";

export function About() {
  const { about } = profile;

  return (
    <Section
      id="about"
      number="02"
      eyebrow="A little about me"
      className="bg-surface-2"
      title={
        <>
          Frontend depth. <span className="text-muted">Full-stack range.</span>
        </>
      }
    >
      <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-20">
        <Reveal className="lg:sticky lg:top-28">
          <figure>
            <Image
              src="/jeffrey-ramirez.webp"
              alt={`Portrait of ${profile.name}`}
              width={720}
              height={720}
              className="aspect-square w-full rounded-md object-cover"
            />
            <figcaption className="label mt-4 flex justify-between gap-4 text-muted">
              <span>{profile.name}</span>
              <span>{profile.title}</span>
            </figcaption>
          </figure>
        </Reveal>

        <div>
          <Reveal>
            <ArrowDownRight size={34} strokeWidth={1.5} aria-hidden className="mb-6 text-foreground" />
            <p className="text-2xl leading-snug font-semibold tracking-[-0.02em] text-pretty sm:text-3xl">
              {about.lead}
            </p>
          </Reveal>

          <div className="mt-8 space-y-5">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.05 * (i + 1)}>
                <p className="leading-relaxed text-pretty text-muted">{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <dl className="mt-12 grid grid-cols-3 divide-x divide-border border-y border-border">
              {about.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse px-4 py-5 first:pl-0">
                  <dt className="mt-1 text-xs leading-snug text-muted">{stat.label}</dt>
                  <dd className="text-4xl font-bold tracking-[-0.04em]">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.25}>
            <ul className="mt-10 grid gap-8 sm:grid-cols-2" aria-label="Education and eligibility">
              {about.credentials.map((c) => (
                <li key={c.label}>
                  <p className="label text-muted">{c.label}</p>
                  <p className="mt-2 font-semibold">{c.title}</p>
                  <p className="mt-0.5 text-sm text-muted">
                    {c.detail} · {c.period}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="label mt-10 border-t border-border pt-5 leading-loose text-muted">
              <span className="sr-only">Focus areas: </span>
              {about.focus.join(" · ")}
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
