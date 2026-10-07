"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeftRight,
  Atom,
  Braces,
  Code,
  Container,
  CreditCard,
  Database,
  FileCode,
  GraduationCap,
  Hammer,
  Hexagon,
  Leaf,
  ListChecks,
  Newspaper,
  Palette,
  ServerCog,
  Smartphone,
  Table2,
  Triangle,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { skillCategories } from "@/data/skills";
import type { Skill, SkillCategory } from "@/data/types";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";

const icons: Record<string, LucideIcon> = {
  react: Atom,
  next: Triangle,
  html: Code,
  css: Palette,
  python: FileCode,
  api: Braces,
  node: Hexagon,
  rest: ArrowLeftRight,
  postgres: Database,
  supabase: Zap,
  mongo: Leaf,
  mysql: Table2,
  mssql: ServerCog,
  docker: Container,
  make: Hammer,
  just: ListChecks,
  stripe: CreditCard,
  wordpress: Newspaper,
  openedx: GraduationCap,
  ionic: Smartphone,
};

const layout: Record<string, string> = {
  frontend: "lg:col-span-3",
  backend: "lg:col-span-3",
  database: "lg:col-span-2",
  tools: "lg:col-span-4",
};

function SkillTile({
  skill,
  active,
  onActivate,
  describedBy,
}: {
  skill: Skill;
  active: boolean;
  onActivate: () => void;
  describedBy: string;
}) {
  const Icon = icons[skill.icon] ?? Code;
  return (
    <motion.button
      type="button"
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      aria-describedby={active ? describedBy : undefined}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className={`group flex items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition-colors duration-200 ${
        active ? "border-accent/40 bg-accent-soft" : "border-border bg-surface-2/60 hover:border-border-strong"
      }`}
    >
      <span
        className={`grid size-8 shrink-0 place-items-center rounded-lg border transition-colors ${
          active ? "border-accent/40 text-accent" : "border-border text-muted group-hover:text-foreground"
        }`}
      >
        <Icon size={15} aria-hidden />
      </span>
      <span className="text-sm font-medium whitespace-nowrap">{skill.name}</span>
    </motion.button>
  );
}

function CategoryCard({ category, index }: { category: SkillCategory; index: number }) {
  const [activeName, setActiveName] = useState<string | null>(null);
  const active = category.skills.find((s) => s.name === activeName);
  const detailId = `${category.id}-detail`;

  return (
    <Reveal delay={index * 0.06} className={`${layout[category.id] ?? ""} flex`}>
      <article
        onMouseLeave={() => setActiveName(null)}
        className="flex w-full flex-col rounded-2xl border border-border bg-surface/70 p-5 shadow-card sm:p-6"
      >
        <header className="mb-5 flex items-baseline justify-between gap-4">
          <h3 className="text-lg font-semibold tracking-tight">{category.title}</h3>
          <span className="font-mono text-xs text-subtle">{String(category.skills.length).padStart(2, "0")}</span>
        </header>

        <ul className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-2">
          {category.skills.map((skill) => (
            <li key={skill.name}>
              <SkillTile
                skill={skill}
                active={skill.name === activeName}
                onActivate={() => setActiveName(skill.name)}
                describedBy={detailId}
              />
            </li>
          ))}
        </ul>

        <div id={detailId} aria-live="polite" className="mt-auto min-h-[64px] pt-5">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={active?.name ?? "summary"}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              className="border-t border-border pt-4 text-sm leading-relaxed text-muted"
            >
              {active ? (
                <>
                  <span className="font-mono text-xs text-accent">{active.name} ·</span> {active.description}
                </>
              ) : (
                category.summary
              )}
            </motion.p>
          </AnimatePresence>
        </div>
      </article>
    </Reveal>
  );
}

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Tech Stack"
      title="The tools I reach for — and where I've used them."
      description="Hover or focus any technology to see the real-world context behind it."
    >
      <div className="grid gap-4 lg:grid-cols-6">
        {skillCategories.map((category, i) => (
          <CategoryCard key={category.id} category={category} index={i} />
        ))}
      </div>
    </Section>
  );
}
