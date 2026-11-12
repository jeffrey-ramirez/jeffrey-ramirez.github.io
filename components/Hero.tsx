"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Command } from "lucide-react";
import { profile } from "@/data/profile";
import { openCommandMenu } from "./CommandMenu";
import { LayerStack } from "./LayerStack";
import { usePreloaderDone } from "./Preloader";
import { ButtonLink } from "./ui/Button";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export function Hero() {
  const [first, last] = profile.name.split(" ");
  // Hold the entrance until the preloader curtain starts lifting.
  const ready = usePreloaderDone();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  // Each line of the name scrolls at its own speed, so the heading itself has depth.
  const firstX = useTransform(scrollY, [0, 700], [0, -60]);
  const lastX = useTransform(scrollY, [0, 700], [0, 40]);

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-16"
    >
      <motion.div
        className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 pt-6 pb-8 sm:px-8"
        initial="hidden"
        animate={ready ? "show" : "hidden"}
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
      >
        <motion.div variants={fadeUp} className="flex justify-between gap-6 label text-muted">
          <p>{profile.title}</p>
          <p>Portfolio — {new Date().getFullYear()}</p>
        </motion.div>

        <div className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div>
            <motion.h1
              id="hero-heading"
              variants={fadeUp}
              className="text-[clamp(3.6rem,11vw,8.8rem)] leading-[0.92] font-extrabold tracking-[-0.06em]"
            >
              <motion.span className="block" style={reduce ? undefined : { x: firstX }}>
                {first}
              </motion.span>
              <motion.span className="block" style={reduce ? undefined : { x: lastX }}>
                {last}
                <span aria-hidden className="ml-[0.05em] inline-block size-[0.14em] bg-accent" />
              </motion.span>
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-8 max-w-[30ch] text-lg leading-snug font-medium sm:text-xl">
              {profile.hero.tagline[0]} <span className="text-muted">{profile.hero.tagline[1]}</span>
            </motion.p>
          </div>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 1, ease } } }}
            className="px-6 pb-10 sm:px-12 lg:px-0"
          >
            <LayerStack />
          </motion.div>
        </div>

        <motion.div variants={fadeUp} className="grid items-end gap-8 border-t border-border pt-8 sm:grid-cols-3">
          <div>
            <p className="flex items-center gap-2.5 label text-foreground">
              <span className="relative flex size-2">
                <span className="absolute inset-0 [animation:pulse-ring_2s_ease-out_infinite] rounded-full bg-accent" />
                <span className="relative size-2 rounded-full bg-accent" />
              </span>
              {profile.availability}
            </p>
            <p className="mt-3 max-w-[30ch] text-sm leading-relaxed text-muted">{profile.hero.focus}</p>
          </div>
          <button
            type="button"
            onClick={openCommandMenu}
            className="group flex items-center gap-3 text-left text-sm text-muted transition-colors hover:text-foreground"
          >
            <kbd className="inline-flex items-center gap-1 rounded-[3px] border border-border-strong px-2 py-1 font-mono text-xs text-foreground">
              <Command size={12} aria-hidden />K
            </kbd>
            <span>
              Everything, one keystroke away.
              <br />
              <span className="text-subtle">Sections, résumé, email, theme.</span>
            </span>
          </button>
          <ButtonLink href="#projects" size="lg" className="justify-between sm:justify-self-end">
            See the work
            <ArrowDown size={16} aria-hidden className="ml-6 transition-transform group-hover:translate-y-0.5" />
          </ButtonLink>
        </motion.div>
      </motion.div>
    </section>
  );
}
