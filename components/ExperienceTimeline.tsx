"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";
import { experience } from "@/data/experience";
import type { Experience } from "@/data/types";
import { Section } from "./ui/Section";

function TimelineItem({
  item,
  open,
  onToggle,
  index,
}: {
  item: Experience;
  open: boolean;
  onToggle: () => void;
  index: number;
}) {
  const panelId = `${item.id}-panel`;
  const buttonId = `${item.id}-button`;

  return (
    <motion.li
      className="relative pl-10 sm:pl-0"
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="sm:grid sm:grid-cols-[180px_1fr] sm:gap-10">
        {/* Date column (desktop) */}
        <p className="hidden pt-6 text-right font-mono text-xs leading-relaxed text-subtle sm:block">
          {item.start}
          <br />
          <span aria-hidden>↓</span> {item.end}
        </p>

        <div className="relative sm:pl-10">
          {/* Node */}
          <span
            aria-hidden
            className={`absolute top-7 -left-10 grid size-[22px] -translate-x-[3px] place-items-center rounded-full border bg-background transition-colors sm:-left-[11px] sm:translate-x-0 ${
              open ? "border-accent" : "border-border-strong"
            }`}
          >
            <span className={`size-2 rounded-full transition-colors ${open ? "bg-accent" : "bg-border-strong"}`} />
          </span>

          <div
            className={`rounded-2xl border transition-colors duration-300 ${
              open
                ? "border-border-strong bg-surface shadow-card"
                : "border-transparent hover:border-border hover:bg-surface/50"
            }`}
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={onToggle}
                className="flex w-full items-start justify-between gap-4 rounded-2xl p-5 text-left sm:p-6"
              >
                <span>
                  <span className="block font-mono text-xs text-subtle sm:hidden">
                    {item.start} — {item.end}
                  </span>
                  <span className="mt-1 block text-lg font-semibold tracking-tight sm:mt-0">{item.role}</span>
                  <span className="mt-0.5 flex flex-wrap items-center gap-2">
                    <span className="text-accent">{item.company}</span>
                    {item.employmentType && (
                      <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[10.5px] text-subtle">
                        {item.employmentType}
                      </span>
                    )}
                  </span>
                  <span className="mt-2 block text-sm text-muted">{item.summary}</span>
                </span>
                <motion.span
                  animate={{ rotate: open ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="mt-1 grid size-8 shrink-0 place-items-center rounded-full border border-border text-muted"
                >
                  <ChevronDown size={16} aria-hidden />
                </motion.span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-6 sm:px-6">
                    <ul className="space-y-2.5 border-t border-border pt-5">
                      {item.responsibilities.map((r) => (
                        <li key={r} className="flex gap-3 text-sm leading-relaxed text-muted">
                          <span aria-hidden className="mt-[9px] h-px w-3 shrink-0 bg-accent" />
                          {r}
                        </li>
                      ))}
                    </ul>
                    <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
                      {item.technologies.map((t) => (
                        <li key={t} className="rounded-full bg-surface-2 px-2.5 py-1 font-mono text-[11px] text-muted">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.li>
  );
}

export function ExperienceTimeline() {
  const [openId, setOpenId] = useState<string | null>(experience[0]?.id ?? null);
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Six years across government, enterprise, education, and AI."
      description="Select a role to see what I owned and the stack I worked in."
    >
      <div className="relative">
        {/* Rail */}
        <div aria-hidden className="absolute top-2 bottom-2 left-[7px] w-px bg-border sm:left-[220px]">
          <motion.div
            className="h-full w-full origin-top bg-gradient-to-b from-accent to-accent-2"
            style={{ scaleY: progress }}
          />
        </div>

        <ol ref={listRef} className="relative space-y-3">
          {experience.map((item, i) => (
            <TimelineItem
              key={item.id}
              item={item}
              index={i}
              open={openId === item.id}
              onToggle={() => setOpenId((cur) => (cur === item.id ? null : item.id))}
            />
          ))}
        </ol>
      </div>
    </Section>
  );
}
