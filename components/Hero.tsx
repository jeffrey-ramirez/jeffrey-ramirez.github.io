"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Plus } from "lucide-react";
import { profile } from "@/data/profile";
import { HeroGraph } from "./HeroGraph";
import { usePreloaderDone } from "./Preloader";
import { ButtonLink } from "./ui/Button";
import { usePointerParallax } from "./ui/usePointerParallax";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export function Hero() {
  const [first, last] = profile.name.split(" ");
  const reduce = useReducedMotion();
  // Hold the entrance until the preloader curtain starts lifting.
  const ready = usePreloaderDone();
  const { scrollY } = useScroll();
  // The graph lags behind the page and leans toward the pointer, so the panel reads as having depth.
  const graphY = useTransform(scrollY, [0, 700], [0, 70]);
  const pointer = usePointerParallax();
  const graphPX = useTransform(pointer.x, (v) => v * 36);
  const graphPY = useTransform(pointer.y, (v) => v * 28);
  const graphRX = useTransform(pointer.y, (v) => v * -8);
  const graphRY = useTransform(pointer.x, (v) => v * 10);

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-16"
    >
      {/* Tinted panel the name overlaps */}
      <div aria-hidden className="absolute inset-y-0 right-0 left-[14%] -z-10 hidden bg-surface-2 md:block" />

      <motion.div
        className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 pt-8 pb-10 sm:px-8"
        initial="hidden"
        animate={ready ? "show" : "hidden"}
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
      >
        <motion.div variants={fadeUp} className="label flex justify-between gap-6 text-muted">
          <p>{profile.title}</p>
          <p>Portfolio — {new Date().getFullYear()}</p>
        </motion.div>

        <div className="flex flex-1 flex-col justify-center py-12">
          <motion.h1
            id="hero-heading"
            variants={fadeUp}
            className="text-[clamp(4rem,14vw,11.5rem)] leading-[0.92] font-extrabold tracking-[-0.06em]"
          >
            {first}
            <br />
            {last}
            <span aria-hidden className="ml-[0.05em] inline-block size-[0.14em] bg-accent" />
          </motion.h1>

          <motion.div variants={fadeUp} className="mt-10 flex items-start gap-4 text-lg font-medium sm:text-xl">
            <Plus size={22} aria-hidden className="mt-0.5 shrink-0" />
            <p className="leading-snug">
              {profile.hero.tagline[0]}
              <br />
              <span className="text-muted">{profile.hero.tagline[1]}</span>
            </p>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} className="grid items-end gap-8 sm:grid-cols-3">
          <div>
            <p className="label flex items-center gap-2.5 text-foreground">
              <span className="relative flex size-2">
                <span className="absolute inset-0 [animation:pulse-ring_2s_ease-out_infinite] rounded-full bg-accent" />
                <span className="relative size-2 rounded-full bg-accent" />
              </span>
              {profile.availability}
            </p>
            <p className="mt-3 max-w-[26ch] text-sm leading-relaxed text-muted">{profile.hero.focus}</p>
          </div>
          <div>
            <p className="label text-muted">Based in</p>
            <p className="mt-3 text-sm leading-relaxed font-medium">
              {profile.hero.basedIn[0]}
              <br />
              {profile.hero.basedIn[1]}
            </p>
          </div>
          <ButtonLink href="#projects" size="lg" className="justify-between sm:justify-self-end">
            Explore my work
            <ArrowDown size={16} aria-hidden className="ml-6 transition-transform group-hover:translate-y-0.5" />
          </ButtonLink>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="pointer-events-none absolute top-1/2 right-[-3%] -z-10 hidden w-[52%] max-w-[720px] -translate-y-1/2 lg:block"
      >
        <motion.div style={reduce ? undefined : { y: graphY }} className="[perspective:1200px]">
          <motion.div style={reduce ? undefined : { x: graphPX, y: graphPY, rotateX: graphRX, rotateY: graphRY }}>
            <HeroGraph />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
