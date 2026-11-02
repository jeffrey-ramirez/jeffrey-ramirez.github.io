import { Download, Eye, FileText } from "lucide-react";
import { experience } from "@/data/experience";
import { profile } from "@/data/profile";
import { ButtonLink } from "./ui/Button";
import { Reveal } from "./ui/Reveal";

export function Resume() {
  return (
    <section id="resume" aria-labelledby="resume-heading" className="py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface shadow-card">
            <div
              aria-hidden
              className="absolute inset-0 bg-grid [mask-image:linear-gradient(to_left,black,transparent_70%)]"
            />
            <div aria-hidden className="absolute -right-24 -bottom-24 size-80 rounded-full bg-accent/15 blur-3xl" />

            <div className="relative grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-[1.3fr_1fr]">
              <div>
                <p className="mb-4 font-mono text-xs tracking-[0.2em] text-accent uppercase">Resume</p>
                <h2 id="resume-heading" className="text-3xl font-semibold tracking-tight sm:text-5xl">
                  Want to know more?
                </h2>
                <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted">
                  The full picture — roles, responsibilities, and stack — in a single, recruiter-friendly PDF.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink href={profile.resumePath} download="Jeffrey-Ramirez-Resume.pdf" size="lg">
                    <Download size={16} aria-hidden />
                    Download Resume
                  </ButtonLink>
                  <ButtonLink
                    href={profile.resumePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                    size="lg"
                  >
                    <Eye size={16} aria-hidden />
                    View Resume
                    <span className="sr-only">(opens in a new tab)</span>
                  </ButtonLink>
                </div>
              </div>

              {/* Miniature document */}
              <div
                aria-hidden
                className="mx-auto hidden w-full max-w-[280px] rotate-2 transition-transform duration-500 hover:rotate-0 sm:block"
              >
                <div className="rounded-xl border border-border-strong bg-background p-5 shadow-card">
                  <div className="flex items-center gap-2 border-b border-border pb-3">
                    <FileText size={14} className="text-accent" />
                    <span className="font-mono text-[10px] text-subtle">resume.pdf</span>
                  </div>
                  <p className="mt-4 text-sm font-semibold">{profile.name}</p>
                  <p className="text-[11px] text-subtle">{profile.title}</p>
                  <div className="mt-4 space-y-3">
                    {experience.slice(0, 4).map((e) => (
                      <div key={e.id}>
                        <p className="text-[10px] font-medium">
                          {e.role} · <span className="text-accent">{e.company}</span>
                        </p>
                        <div className="mt-1 h-1 w-full rounded-full bg-foreground/10" />
                        <div className="mt-1 h-1 w-3/4 rounded-full bg-foreground/10" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
