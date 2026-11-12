import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import type { Project } from "@/data/types";
import { ProjectPreview } from "./ProjectPreview";
import { GithubIcon } from "./ui/BrandIcons";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";

function CaseFile({ project, index }: { project: Project; index: number }) {
  const number = String(index + 1).padStart(2, "0");
  const headingId = `case-${project.slug}`;

  const steps = [
    { label: "The brief", body: <p>{project.description}</p> },
    {
      label: "What I built",
      body: (
        <>
          <p className="text-foreground">{project.keyContribution}</p>
          <ul className="mt-4 space-y-2">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3">
                <span aria-hidden className="mt-[10px] h-px w-3 shrink-0 bg-border-strong" />
                {h}
              </li>
            ))}
          </ul>
        </>
      ),
    },
    {
      label: "How it shipped",
      body: (
        <>
          <ul className="flex flex-wrap gap-2" aria-label="Technologies">
            {project.technologies.map((t) => (
              <li key={t} className="rounded-full border border-border-strong px-3 py-1 label text-foreground">
                {t}
              </li>
            ))}
          </ul>
          {project.links?.length ? (
            <ul className="mt-5 flex flex-wrap gap-5">
              {project.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground underline-offset-4 hover:underline"
                  >
                    {link.kind === "github" ? <GithubIcon size={14} /> : null}
                    {link.label}
                    <ArrowUpRight size={15} aria-hidden />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </>
      ),
    },
  ];

  return (
    <article
      aria-labelledby={headingId}
      className="grid gap-10 border-t border-border-strong pt-8 lg:grid-cols-2 lg:gap-16"
    >
      {/* The visual stays put while the story scrolls past it. */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-surface-2">
          <div className="absolute inset-6 sm:inset-10">
            <ProjectPreview variant={project.preview} screenshots={project.screenshots} />
          </div>
          <p className="absolute top-3 left-4 label text-subtle">Case {number}</p>
        </div>
      </div>

      <div>
        <Reveal>
          <p className="label text-muted">
            {project.company ? `${project.company} · ` : ""}
            {project.role}
          </p>
          <h3 id={headingId} className="mt-3 text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
            {project.name}
          </h3>
          <p className="mt-2 text-lg text-muted">{project.tagline}</p>
        </Reveal>

        <ol className="mt-10 space-y-10">
          {steps.map((step, i) => (
            <li key={step.label}>
              <Reveal delay={i * 0.05} className="grid gap-3 sm:grid-cols-[110px_minmax(0,1fr)] sm:gap-6">
                <p className="pt-1 label text-foreground">
                  <span className="text-subtle">{String(i + 1).padStart(2, "0")} </span>
                  {step.label}
                </p>
                <div className="leading-relaxed text-pretty text-muted">{step.body}</div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </article>
  );
}

export function CaseFiles() {
  const featured = projects.filter((p) => p.featured);
  const more = projects.filter((p) => !p.featured);

  return (
    <Section
      id="projects"
      number="01"
      eyebrow="Selected work"
      backdrop="Work"
      title="Production platforms, not side projects."
      description="Each one told the way I'd walk you through it: what was asked, what I built, and how it got to real users."
    >
      <div className="flex flex-col gap-24">
        {featured.map((project, i) => (
          <CaseFile key={project.slug} project={project} index={i} />
        ))}
      </div>

      <div className="mt-24">
        <p className="label text-muted">Also in the files</p>
        <ul className="mt-5 border-t border-border">
          {more.map((p) => (
            <li key={p.slug}>
              <Reveal className="grid gap-2 border-b border-border py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_auto] md:items-baseline md:gap-8">
                <h3 className="text-xl font-bold tracking-[-0.02em]">
                  {p.name}
                  {p.company ? <span className="ml-3 align-middle label text-muted">{p.company}</span> : null}
                </h3>
                <p className="leading-relaxed text-pretty text-muted">{p.keyContribution}</p>
                <p className="label text-subtle md:text-right">{p.technologies.slice(0, 3).join(" · ")}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
