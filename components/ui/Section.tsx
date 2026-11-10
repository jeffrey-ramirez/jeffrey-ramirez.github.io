import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionProps = {
  id: string;
  /** Position in the page, shown before the eyebrow (e.g. "01"). */
  number: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function Section({ id, number, eyebrow, title, description, children, className = "" }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className={`relative py-24 sm:py-32 ${className}`}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="mb-14 grid items-end gap-6 sm:mb-20 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
          <div>
            <p className="label mb-5 text-muted">
              {number} / {eyebrow}
            </p>
            <h2
              id={headingId}
              className="max-w-[17ch] text-4xl leading-[1.05] font-bold tracking-[-0.04em] text-balance sm:text-6xl"
            >
              {title}
            </h2>
          </div>
          {description ? <p className="leading-relaxed text-pretty text-muted">{description}</p> : null}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
