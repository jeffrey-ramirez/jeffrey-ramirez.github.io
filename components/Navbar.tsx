"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, FileText, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems, profile } from "@/data/profile";
import { ThemeToggle } from "./ThemeToggle";
import { buttonClasses } from "./ui/buttonStyles";

/** Returns the id of the section currently crossing the top third of the viewport. */
function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      let current: string | null = null;
      // Every section counts (not just nav targets) so the highlight clears over the hero, resume, etc.
      for (const el of document.querySelectorAll<HTMLElement>("main section[id]")) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return active;
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open ? "border-b border-border bg-background/90 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a
          href="#top"
          className="group flex items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- static export, pre-sized asset */}
          <img
            src="/logo-jr.webp"
            alt=""
            width={480}
            height={298}
            className="-my-1 h-10 w-auto transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105 not-dark:brightness-[0.82] not-dark:saturate-150"
          />
          <span className="text-[13px] font-bold tracking-[0.12em] whitespace-nowrap uppercase">{profile.name}</span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => {
            const isActive = active === item.href.slice(1);
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? "location" : undefined}
                  className={`label underline-offset-[6px] transition-colors hover:text-foreground ${
                    isActive ? "text-foreground underline" : "text-muted"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={profile.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="label hidden px-2 text-muted transition-colors hover:text-foreground lg:block"
          >
            Résumé
          </a>
          <a
            href="#contact"
            className="hidden items-center gap-3 border-b border-foreground py-1 pl-1 text-sm font-semibold sm:inline-flex"
          >
            Let&apos;s talk
            <ArrowUpRight size={15} aria-hidden />
          </a>
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-[3px] border border-border text-foreground md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100dvh", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden bg-background md:hidden"
          >
            <motion.ul
              className="flex flex-col gap-1 px-5 pt-6"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }}
            >
              {[...navItems, { label: "Contact", href: "#contact" }].map((item, i) => (
                <motion.li key={item.href} variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 border-b border-border py-4 text-3xl font-semibold tracking-tight"
                  >
                    <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                    {item.label}
                  </a>
                </motion.li>
              ))}
              <motion.li variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }} className="pt-6">
                <a
                  href={profile.resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClasses("primary", "lg", "w-full")}
                >
                  <FileText size={16} aria-hidden />
                  View Resume
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
