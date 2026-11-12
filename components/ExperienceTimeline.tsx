"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { experience } from "@/data/experience";
import type { Experience } from "@/data/types";
import { Section } from "./ui/Section";

function ExperienceRow({ item, open, onToggle }: { item: Experience; open: boolean; onToggle: () => void }) {
  const panelId = `${item.id}-panel`;
  const buttonId = `${item.id}-button`;

  return (
    <li className="border-b border-border">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="grid w-full items-start gap-x-8 gap-y-1 py-6 text-left sm:grid-cols-[190px_minmax(0,1fr)_2rem]"
        >
          <span className="pt-1.5 label text-muted">
            {item.start} — {item.end}
          </span>
          <span>
            <span className="block text-xl font-bold tracking-[-0.02em] sm:text-2xl">{item.role}</span>
            <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="font-semibold">{item.company}</span>
              {item.employmentType && <span className="label text-muted">{item.employmentType}</span>}
            </span>
            <span className="mt-2 block text-sm text-muted">{item.summary}</span>
          </span>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.25 }}
            className="mt-1 hidden size-8 place-items-center justify-self-end text-muted sm:grid"
          >
            <Plus size={20} aria-hidden />
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
            <div className="pb-7 sm:pl-[222px]">
              <ul className="space-y-2.5">
                {item.responsibilities.map((r) => (
                  <li key={r} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span aria-hidden className="mt-[9px] h-px w-3 shrink-0 bg-accent" />
                    {r}
                  </li>
                ))}
              </ul>
              <p className="mt-5 label text-muted">
                <span className="sr-only">Technologies: </span>
                {item.technologies.join(" · ")}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export function ExperienceTimeline() {
  const [openId, setOpenId] = useState<string | null>(experience[0]?.id ?? null);

  return (
    <Section
      id="experience"
      number="05"
      eyebrow="Experience"
      backdrop="Path"
      title="Government, enterprise, education, and AI."
      description="Select a role to see what I owned and the stack I worked in."
    >
      <ol className="border-t border-border">
        {experience.map((item) => (
          <ExperienceRow
            key={item.id}
            item={item}
            open={openId === item.id}
            onToggle={() => setOpenId((cur) => (cur === item.id ? null : item.id))}
          />
        ))}
      </ol>
    </Section>
  );
}
