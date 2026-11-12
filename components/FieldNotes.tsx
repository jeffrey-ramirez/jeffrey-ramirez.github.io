import { fieldNotes } from "@/data/notes";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";

export function FieldNotes() {
  return (
    <Section
      id="notes"
      number="03"
      eyebrow="Field notes"
      title={
        <>
          The bits a résumé <span className="text-muted">leaves out.</span>
        </>
      }
      description="Small, true stories from the work. Hover a note to straighten it out."
      className="border-t border-border"
      backdrop="Notes"
    >
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {fieldNotes.map((note, i) => (
          <li key={note.title}>
            <Reveal delay={(i % 3) * 0.06} className="h-full">
              {/* Pinned-up notes: each sits at a slight angle and squares up on hover or focus. */}
              <article
                tabIndex={0}
                style={{ "--tilt": `${[-1.4, 1, -0.6, 1.3, -1.1, 0.7][i % 6]}deg` } as React.CSSProperties}
                className="flex h-full rotate-[var(--tilt)] flex-col rounded-md border border-border bg-surface p-6 shadow-[0_1px_0_rgb(0_0_0/0.04),0_12px_30px_-18px_rgb(0_0_0/0.25)] transition-transform duration-300 ease-out outline-none hover:-translate-y-1 hover:rotate-0 focus-visible:rotate-0 focus-visible:ring-2 focus-visible:ring-accent"
              >
                <p className="label text-subtle">{note.tag}</p>
                <h3 className="mt-6 text-xl leading-snug font-bold tracking-[-0.02em]">{note.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-pretty text-muted">{note.body}</p>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
