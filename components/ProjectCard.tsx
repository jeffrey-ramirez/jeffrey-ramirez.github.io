"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { MouseEvent } from "react";
import type { Project } from "@/data/types";
import { ProjectPreview } from "./ProjectPreview";
import { GithubIcon } from "./ui/BrandIcons";
import { Parallax } from "./ui/Parallax";

type ProjectCardProps = {
  project: Project;
  index: number;
  /** Large, horizontal layout used for featured work. */
  size?: "large" | "compact";
};

export function ProjectCard({ project, index, size = "compact" }: ProjectCardProps) {
  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, var(--accent-soft), transparent 70%)`;

  function onMove(e: MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  }

  const large = size === "large";
  const hasVisual = Boolean(project.preview || project.screenshots?.length);
  const reversed = large && index % 2 === 1;
  const headingId = `project-${project.slug}`;

  return (
    <motion.article
      aria-labelledby={headingId}
      onMouseMove={onMove}
      onMouseLeave={() => {
        mx.set(-400);
        my.set(-400);
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover="hover"
      className={`group relative overflow-hidden rounded-3xl border border-border bg-surface/70 shadow-card transition-colors duration-300 hover:border-border-strong ${
        large ? "grid lg:grid-cols-2" : "flex flex-col"
      }`}
    >
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 z-0" style={{ background: spotlight }} />

      {/* Visual preview */}
      {hasVisual && (
        <div
          className={`relative z-10 overflow-hidden border-border bg-surface-2/50 ${
            large
              ? `aspect-[16/11] border-b lg:aspect-auto lg:min-h-[420px] lg:border-b-0 ${reversed ? "lg:order-2 lg:border-l" : "lg:border-r"}`
              : "aspect-[16/10] border-b"
          }`}
        >
          <Parallax offset={-28} className="absolute -inset-y-10 inset-x-0">
            <div className="h-full bg-grid opacity-70" />
          </Parallax>
          <div className="absolute -bottom-1/3 left-1/2 h-2/3 w-2/3 -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" />
          <motion.div
            className={`absolute ${large ? "inset-8 sm:inset-12" : "inset-6 sm:inset-8"}`}
            variants={{ hover: { y: -6, scale: 1.015 } }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
          >
            <Parallax offset={large ? 18 : 12} className="h-full">
              <ProjectPreview variant={project.preview} screenshots={project.screenshots} />
            </Parallax>
          </motion.div>
        </div>
      )}

      {/* Content */}
      <div className={`relative z-10 flex flex-1 flex-col ${large ? "p-7 sm:p-10" : "p-6 sm:p-7"}`}>
        <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-subtle">
          <span className="text-accent">{String(index + 1).padStart(2, "0")}</span>
          <span aria-hidden>/</span>
          <span>{project.role}</span>
          {project.company && (
            <>
              <span aria-hidden>·</span>
              <span>{project.company}</span>
            </>
          )}
        </div>

        <h3
          id={headingId}
          className={`font-semibold tracking-tight ${large ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"}`}
        >
          {project.name}
        </h3>
        <p className="mt-1.5 text-sm text-subtle">{project.tagline}</p>
        <p className="mt-4 leading-relaxed text-pretty text-muted">{project.description}</p>

        {/* Cards without a visual list highlights to carry the same weight */}
        {(large || !hasVisual) && (
          <ul className="mt-5 space-y-2 text-sm text-muted">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3">
                <span aria-hidden className="mt-[9px] h-px w-3 shrink-0 bg-accent" />
                {h}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 rounded-xl border border-border bg-surface-2/60 p-4">
          <p className="mb-1 font-mono text-[11px] tracking-wider text-accent-2 uppercase">Key contribution</p>
          <p className="text-sm leading-relaxed">{project.keyContribution}</p>
        </div>

        <div className="mt-auto pt-6">
          <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
            {project.technologies.map((t) => (
              <li key={t} className="rounded-full border border-border px-2.5 py-1 font-mono text-[11px] text-muted">
                {t}
              </li>
            ))}
          </ul>

          {project.links?.length ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border-strong px-3.5 py-1.5 text-sm transition-colors hover:border-foreground/40 hover:bg-surface-2"
                >
                  {link.kind === "github" ? <GithubIcon size={14} /> : null}
                  {link.label}
                  <ArrowUpRight size={14} aria-hidden className="transition-transform group-hover:translate-x-px" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
