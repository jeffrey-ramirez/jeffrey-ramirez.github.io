"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Copy,
  CornerDownLeft,
  FileText,
  Hash,
  Moon,
  Search,
  Sun,
  type LucideIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useRef, useState } from "react";
import { navItems, profile, socialLinks } from "@/data/profile";

const OPEN_EVENT = "command-menu:open";

/** Opens the command menu from anywhere (a button in the hero, the navbar). */
export function openCommandMenu() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

type Item = {
  id: string;
  group: "Go to" | "Do" | "Elsewhere";
  label: string;
  hint?: string;
  icon: LucideIcon;
  run: () => void | "keep-open";
};

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const input = useRef<HTMLInputElement>(null);
  const opener = useRef<Element | null>(null);
  const isOpen = useRef(false);
  useEffect(() => {
    isOpen.current = open;
  }, [open]);

  const items = useMemo<Item[]>(() => {
    const go = (href: string) => () => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      history.replaceState(null, "", href);
    };
    const dark = resolvedTheme === "dark";
    return [
      ...[...navItems, { label: "Field notes", href: "#notes" }, { label: "Contact", href: "#contact" }].map(
        (n): Item => ({ id: n.href, group: "Go to", label: n.label, hint: n.href, icon: Hash, run: go(n.href) }),
      ),
      {
        id: "copy-email",
        group: "Do",
        label: copied ? "Email copied" : "Copy email address",
        hint: profile.email,
        icon: copied ? Check : Copy,
        run: () => {
          void navigator.clipboard?.writeText(profile.email).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
          });
          return "keep-open";
        },
      },
      {
        id: "resume",
        group: "Do",
        label: "Open résumé (PDF)",
        icon: FileText,
        run: () => void window.open(profile.resumePath, "_blank", "noopener"),
      },
      {
        id: "theme",
        group: "Do",
        label: dark ? "Switch to light mode" : "Switch to dark mode",
        icon: dark ? Sun : Moon,
        run: () => {
          setTheme(dark ? "light" : "dark");
          return "keep-open";
        },
      },
      ...socialLinks
        .filter((l) => l.icon !== "mail")
        .map((l): Item => ({
          id: l.href,
          group: "Elsewhere",
          label: l.label,
          hint: l.handle,
          icon: ArrowUpRight,
          run: () => void window.open(l.href, "_blank", "noopener"),
        })),
    ];
  }, [resolvedTheme, setTheme, copied]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? items.filter((i) => `${i.label} ${i.hint ?? ""} ${i.group}`.toLowerCase().includes(q)) : items;
  }, [items, query]);

  // Open with ⌘K / Ctrl+K, or "/" when not typing somewhere.
  useEffect(() => {
    const show = () => {
      opener.current = document.activeElement;
      setQuery("");
      setIndex(0);
      setOpen(true);
    };
    const onKey = (e: KeyboardEvent) => {
      const typing = e.target instanceof HTMLElement && e.target.closest("input, textarea, [contenteditable]");
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        if (isOpen.current) setOpen(false);
        else show();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, show);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    input.current?.focus();
    return () => {
      document.documentElement.style.overflow = "";
      (opener.current as HTMLElement | null)?.focus?.();
    };
  }, [open]);

  const run = (item: Item) => {
    if (item.run() !== "keep-open") setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => (i + 1) % Math.max(results.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => (i - 1 + results.length) % Math.max(results.length, 1));
    } else if (e.key === "Enter" && results[index]) {
      e.preventDefault();
      run(results[index]);
    } else if (e.key === "Tab") {
      // Keep focus inside the dialog; the list is driven from the input.
      e.preventDefault();
    }
  };

  const activeId = results[index] ? `cmd-${results[index].id}` : undefined;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[150] flex items-start justify-center bg-foreground/25 px-4 pt-[14vh] backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            className="w-full max-w-lg overflow-hidden rounded-md border border-border-strong bg-surface shadow-[0_30px_80px_-20px_rgb(0_0_0/0.35)]"
            initial={{ y: -8, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Search size={16} aria-hidden className="text-muted" />
              <input
                ref={input}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIndex(0);
                }}
                placeholder="Jump to a section or run a command…"
                role="combobox"
                aria-expanded="true"
                aria-controls="cmd-list"
                aria-activedescendant={activeId}
                aria-autocomplete="list"
                className="h-13 flex-1 bg-transparent py-4 text-[15px] outline-none placeholder:text-subtle"
              />
              <kbd className="rounded-[3px] border border-border px-1.5 py-0.5 label text-subtle">Esc</kbd>
            </div>

            <ul id="cmd-list" role="listbox" aria-label="Commands" className="max-h-[52vh] overflow-y-auto p-2">
              {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted">Nothing matches.</li>}
              {results.map((item, i) => {
                const header = item.group !== results[i - 1]?.group ? item.group : null;
                const Icon = item.icon;
                return (
                  <li key={item.id} role="presentation">
                    {header && <p className="px-3 pt-3 pb-1.5 label text-subtle">{header}</p>}
                    <div
                      id={`cmd-${item.id}`}
                      role="option"
                      aria-selected={i === index}
                      onMouseMove={() => setIndex(i)}
                      onClick={() => run(item)}
                      className={`flex cursor-pointer items-center gap-3 rounded-[3px] px-3 py-2.5 text-sm ${
                        i === index ? "bg-surface-2 text-foreground" : "text-muted"
                      }`}
                    >
                      <Icon size={15} aria-hidden className={i === index ? "text-accent" : ""} />
                      <span className="flex-1 font-medium">{item.label}</span>
                      {item.hint && <span className="truncate font-mono text-xs text-subtle">{item.hint}</span>}
                      {i === index && <CornerDownLeft size={13} aria-hidden className="text-subtle" />}
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="flex justify-between border-t border-border px-4 py-2.5 label text-subtle">
              <span>↑ ↓ to move · ↵ to run</span>
              <span>⌘K or / to toggle</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
