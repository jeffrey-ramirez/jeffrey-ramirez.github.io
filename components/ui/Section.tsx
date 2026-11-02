import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionProps = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function Section({ id, eyebrow, title, description, children, className = "" }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className={`relative py-24 sm:py-32 ${className}`}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="mb-14 max-w-2xl sm:mb-16">
          <p className="mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-accent uppercase">
            <span aria-hidden className="h-px w-8 bg-accent/60" />
            {eyebrow}
          </p>
          <h2 id={headingId} className="text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
            {title}
          </h2>
          {description ? <p className="mt-5 text-lg leading-relaxed text-pretty text-muted">{description}</p> : null}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
