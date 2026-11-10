"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/types";
import { ProjectPreview } from "./ProjectPreview";
import { GithubIcon } from "./ui/BrandIcons";
import { Parallax } from "./ui/Parallax";

type ProjectCardProps = {
  project: Project;
  index: number;
  /** Full-width layout used for featured work. */
  size?: "large" | "compact";
};

export function ProjectCard({ project, index, size = "compact" }: ProjectCardProps) {
  const large = size === "large";
  const hasVisual = Boolean(project.preview || project.screenshots?.length);
  const headingId = `project-${project.slug}`;

  return (
    <motion.article
      aria-labelledby={headingId}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover="hover"
      className="group flex flex-col"
    >
      {hasVisual && (
        <div
          className={`relative overflow-hidden rounded-md bg-surface-2 ${
            large ? "aspect-[4/3] sm:aspect-[16/8]" : "aspect-[16/11]"
          }`}
        >
          <motion.div
            className={`absolute ${large ? "inset-5 sm:inset-x-[14%] sm:inset-y-10" : "inset-5 sm:inset-8"}`}
            variants={{ hover: { y: -6, scale: 1.015 } }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
          >
            <Parallax offset={large ? 18 : 12} className="h-full">
              <ProjectPreview variant={project.preview} screenshots={project.screenshots} />
            </Parallax>
          </motion.div>
        </div>
      )}

      <div className={`flex flex-1 gap-5 pt-6 ${large ? "sm:gap-10" : ""}`}>
        <p className="label pt-1.5 text-muted">/{String(index + 1).padStart(2, "0")}</p>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
            <h3
              id={headingId}
              className={`font-bold tracking-[-0.03em] ${large ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"}`}
            >
              {project.name}
              <span className="font-medium text-muted"> — {project.tagline}</span>
            </h3>
            {project.company && (
              <span className="label rounded-full border border-border-strong px-3 py-1 whitespace-nowrap text-muted">
                {project.company}
              </span>
            )}
          </div>

          <p className="mt-3 max-w-2xl leading-relaxed text-pretty text-muted">{project.description}</p>

          {!hasVisual && (
            <ul className="mt-5 space-y-2 text-sm text-muted">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-3">
                  <span aria-hidden className="mt-[9px] h-px w-3 shrink-0 bg-accent" />
                  {h}
                </li>
              ))}
            </ul>
          )}

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-pretty">
            <span className="label mr-2 text-muted">Key contribution</span>
            {project.keyContribution}
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-border pt-4">
            <p className="label text-muted">
              <span className="sr-only">Technologies: </span>
              {project.technologies.join(" · ")}
            </p>

            {project.links?.length ? (
              <ul className="flex flex-wrap gap-4">
                {project.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold underline-offset-4 hover:underline"
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
          </div>
        </div>
      </div>
    </motion.article>
  );
}
