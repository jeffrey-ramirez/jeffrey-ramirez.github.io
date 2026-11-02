import Image from "next/image";
import type { ReactNode } from "react";
import type { ProjectPreviewVariant, ProjectScreenshot } from "@/data/types";

/*
 * Product previews. Projects with real screenshots render them in a browser or
 * phone frame; the rest get abstract, code-drawn mockups that suggest the
 * product's shape while staying crisp, themeable, and lightweight.
 */

const bar = "rounded-full bg-foreground/10";
const block = "rounded-md bg-foreground/[0.06]";

function Window({ url, children, className = "h-full" }: { url: string; children: ReactNode; className?: string }) {
  return (
    <div
      className={`flex w-full flex-col overflow-hidden ${className} rounded-xl border border-border-strong bg-surface shadow-card`}
    >
      <div className="flex items-center gap-3 border-b border-border px-3 py-2">
        <div className="flex gap-1.5">
          <span className="size-2 rounded-full bg-foreground/15" />
          <span className="size-2 rounded-full bg-foreground/15" />
          <span className="size-2 rounded-full bg-foreground/15" />
        </div>
        <div className="flex-1 truncate rounded-md bg-surface-2 px-2.5 py-1 text-center font-mono text-[10px] text-subtle">
          {url}
        </div>
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

function Lms() {
  return (
    <Window url="openlms · learner dashboard">
      <div className="flex h-full">
        <aside className="hidden w-1/4 flex-col gap-2 border-r border-border p-3 sm:flex">
          <div className="mb-2 h-5 w-14 rounded bg-accent/40" />
          {[70, 55, 80, 60, 45].map((w, i) => (
            <div key={i} className={`h-2 ${bar} ${i === 1 ? "bg-accent/50" : ""}`} style={{ width: `${w}%` }} />
          ))}
        </aside>
        <div className="flex-1 space-y-3 p-4">
          <div className={`h-3 w-2/5 ${bar}`} />
          <div className="grid grid-cols-3 gap-2">
            {[0.72, 0.4, 0.9].map((p, i) => (
              <div key={i} className={`${block} space-y-2 p-2.5`}>
                <div className={`h-12 rounded ${i === 0 ? "bg-accent/25" : "bg-foreground/[0.07]"}`} />
                <div className={`h-1.5 w-4/5 ${bar}`} />
                <div className="h-1 w-full rounded-full bg-foreground/10">
                  <div className="h-1 rounded-full bg-accent-2/70" style={{ width: `${p * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className={`${block} space-y-2 p-3`}>
            {[90, 75, 82].map((w, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="size-3 rounded-sm border border-accent-2/60" />
                <div className={`h-1.5 ${bar}`} style={{ width: `${w}%` }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Window>
  );
}

function Web() {
  return (
    <Window url="greatawakener.com">
      <div className="flex h-full flex-col p-4">
        <div className="mb-6 flex items-center justify-between">
          <div className="h-3 w-16 rounded bg-foreground/20" />
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className={`h-1.5 w-8 ${bar}`} />
            ))}
          </div>
        </div>
        <div className="mx-auto w-3/4 space-y-2 text-center">
          <div className="mx-auto h-4 w-4/5 rounded bg-foreground/25" />
          <div className="mx-auto h-4 w-3/5 rounded bg-foreground/25" />
          <div className={`mx-auto mt-3 h-1.5 w-2/3 ${bar}`} />
          <div className="mx-auto mt-4 h-6 w-24 rounded-full bg-accent/50" />
        </div>
        <div className="mt-auto grid grid-cols-3 gap-2 pt-5">
          {[0, 1, 2].map((i) => (
            <div key={i} className={`${block} h-14 bg-gradient-to-br from-accent/15 to-transparent`} />
          ))}
        </div>
        <div className="absolute top-12 right-3 rounded-md border border-border bg-surface px-2 py-1 font-mono text-[9px] text-accent-2">
          LCP 1.1s ✓
        </div>
      </div>
    </Window>
  );
}

function Terminal() {
  const lines: [string, string][] = [
    ["$", "make setup"],
    ["✓", "postgres   · healthy"],
    ["✓", "django-api · :8000"],
    ["✓", "next-web   · :3000"],
    ["$", "make test"],
    ["✓", "48 passed in 3.2s"],
  ];
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-border-strong bg-[#0b0c0f] shadow-card">
      <div className="flex items-center gap-2 border-b border-white/5 px-3 py-2 font-mono text-[10px] text-zinc-500">
        <span className="size-2 rounded-full bg-white/15" />
        <span className="size-2 rounded-full bg-white/15" />
        <span className="size-2 rounded-full bg-white/15" />
        <span className="ml-2">app-template — zsh</span>
      </div>
      <div className="flex flex-1 gap-4 p-4 font-mono text-[11px] leading-6">
        <div className="flex-1">
          {lines.map(([p, t], i) => (
            <div key={i} className="truncate">
              <span className={p === "$" ? "text-[#8b95ff]" : "text-[#3dd6c3]"}>{p}</span>{" "}
              <span className={p === "$" ? "text-zinc-200" : "text-zinc-400"}>{t}</span>
            </div>
          ))}
          <span className="inline-block h-3.5 w-1.5 translate-y-0.5 [animation:blink_1s_step-end_infinite] bg-zinc-300" />
        </div>
        <div className="hidden w-[38%] border-l border-white/5 pl-4 text-zinc-500 sm:block">
          {["├─ frontend/", "│  └─ next.js", "├─ backend/", "│  └─ django", "├─ docker-compose.yml", "└─ Makefile"].map(
            (l) => (
              <div key={l} className="truncate">
                {l}
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

function Ai() {
  return (
    <Window url="helpdesk · ticket 1042">
      <div className="flex h-full">
        <div className="hidden w-2/5 space-y-1.5 border-r border-border p-2.5 sm:block">
          {["High", "Med", "Low", "Med"].map((p, i) => (
            <div
              key={i}
              className={`rounded-md border p-2 ${i === 0 ? "border-accent/40 bg-accent-soft" : "border-border"}`}
            >
              <div className="mb-1.5 flex items-center justify-between">
                <div className={`h-1.5 w-1/2 ${bar}`} />
                <span className="font-mono text-[8px] text-subtle">{p}</span>
              </div>
              <div className={`h-1 w-4/5 ${bar}`} />
            </div>
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-2 p-3">
          <div className={`h-2.5 w-3/5 ${bar}`} />
          <div className={`${block} space-y-1.5 p-2.5`}>
            <div className={`h-1.5 w-full ${bar}`} />
            <div className={`h-1.5 w-4/5 ${bar}`} />
          </div>
          <div className="rounded-md border border-accent/30 bg-accent-soft p-2.5">
            <div className="mb-2 flex items-center gap-1.5 font-mono text-[9px] text-accent">
              <span className="size-1.5 rounded-full bg-accent" /> AI suggestion · 94% confidence
            </div>
            <div className="space-y-1.5">
              <div className="h-1.5 w-full rounded-full bg-accent/25" />
              <div className="h-1.5 w-11/12 rounded-full bg-accent/25" />
              <div className="h-1.5 w-2/3 rounded-full bg-accent/25" />
            </div>
          </div>
          <div className="mt-auto flex gap-1.5">
            <div className="h-5 w-16 rounded bg-foreground/80" />
            <div className="h-5 w-12 rounded border border-border-strong" />
          </div>
        </div>
      </div>
    </Window>
  );
}

function Mobile() {
  return (
    <div className="flex h-full items-center justify-center gap-4">
      {[0, 1].map((phone) => (
        <div
          key={phone}
          className={`relative h-[92%] max-h-[300px] w-[38%] max-w-[150px] overflow-hidden rounded-[22px] border border-border-strong bg-surface p-1.5 shadow-card ${
            phone === 1 ? "hidden translate-y-6 sm:block" : ""
          }`}
        >
          <div className="relative h-full overflow-hidden rounded-[17px] bg-surface-2">
            <div className="absolute top-1.5 left-1/2 h-1.5 w-10 -translate-x-1/2 rounded-full bg-foreground/15" />
            {phone === 0 ? (
              <>
                {/* Map with hazard zones */}
                <div className="absolute inset-x-0 top-0 h-3/5 bg-[radial-gradient(circle_at_40%_45%,rgb(239_68_68/0.35),transparent_30%),radial-gradient(circle_at_65%_60%,rgb(245_158_11/0.3),transparent_35%),radial-gradient(circle_at_30%_75%,rgb(234_179_8/0.2),transparent_30%)]" />
                <div className="absolute inset-x-0 top-0 h-3/5 bg-grid opacity-60" />
                <div className="absolute top-[38%] left-[42%] size-3 rounded-full border-2 border-surface bg-accent shadow" />
                <div className="absolute inset-x-2 bottom-2 space-y-1.5 rounded-xl bg-surface p-2.5">
                  <div className={`h-1.5 w-2/3 ${bar}`} />
                  <div className={`h-1 w-full ${bar}`} />
                  <div className="mt-1 h-4 rounded-md bg-accent/60" />
                </div>
              </>
            ) : (
              <div className="space-y-2 p-2.5 pt-6">
                <div className={`h-2 w-3/5 ${bar}`} />
                {[
                  ["bg-red-500/60", 80],
                  ["bg-amber-500/60", 60],
                  ["bg-yellow-500/50", 45],
                  ["bg-emerald-500/50", 30],
                ].map(([c, w], i) => (
                  <div key={i} className="rounded-lg bg-surface p-2">
                    <div className="mb-1.5 flex items-center gap-1.5">
                      <span className={`size-2 rounded-full ${c}`} />
                      <div className={`h-1.5 w-1/2 ${bar}`} />
                    </div>
                    <div className="h-1 rounded-full bg-foreground/10">
                      <div className={`h-1 rounded-full ${c}`} style={{ width: `${w}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function Gov() {
  return (
    <Window url="www.gov.ph">
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-2 bg-[#0038a8]/80 px-3 py-1.5">
          <span className="size-3 rounded-full bg-[#fcd116]" />
          <div className="h-1.5 w-20 rounded-full bg-white/50" />
        </div>
        <div className="flex items-center gap-3 border-b border-border px-3 py-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`h-1.5 w-10 ${bar}`} />
          ))}
        </div>
        <div className="grid flex-1 grid-cols-[1.4fr_1fr] gap-2 p-3">
          <div className="rounded-md bg-gradient-to-br from-[#0038a8]/30 via-[#ce1126]/10 to-transparent p-3">
            <div className="h-3 w-4/5 rounded bg-foreground/25" />
            <div className="mt-2 h-3 w-3/5 rounded bg-foreground/25" />
            <div className="mt-4 h-5 w-20 rounded bg-[#0038a8]/70" />
          </div>
          <div className="space-y-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className={`${block} flex items-center gap-2 p-2`}>
                <span className="size-4 rounded bg-foreground/10" />
                <div className={`h-1.5 flex-1 ${bar}`} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 border-t border-border px-3 py-1.5 font-mono text-[9px] text-subtle">
          <span className="size-1.5 rounded-full bg-accent-2" /> WSO2 API Gateway · connected
        </div>
      </div>
    </Window>
  );
}

function ScreenshotWindow({ shot }: { shot: ProjectScreenshot }) {
  // Sized to the screenshot's aspect ratio; taller captures are trimmed from the bottom to fit the card.
  return (
    <div className="flex h-full items-center">
      <Window url={shot.url ?? ""} className="h-auto max-h-full">
        <Image
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          sizes="(min-width: 1024px) 520px, 90vw"
          className="block h-auto w-full"
        />
      </Window>
    </div>
  );
}

function ScreenshotPhones({ shots }: { shots: ProjectScreenshot[] }) {
  return (
    <div className="flex h-full items-center justify-center gap-4 sm:gap-6">
      {shots.slice(0, 2).map((shot, i) => (
        <div
          key={shot.src}
          className={`relative aspect-[304/616] h-[96%] overflow-hidden rounded-[18px] border-[5px] border-[#16181d] bg-[#16181d] shadow-card ${
            i === 1 ? "hidden translate-y-5 sm:block" : ""
          }`}
        >
          <Image src={shot.src} alt={shot.alt} fill sizes="240px" className="rounded-[13px] object-cover object-top" />
        </div>
      ))}
    </div>
  );
}

const previews: Record<ProjectPreviewVariant, () => ReactNode> = {
  lms: Lms,
  web: Web,
  terminal: Terminal,
  ai: Ai,
  mobile: Mobile,
  gov: Gov,
};

export function ProjectPreview({
  variant,
  screenshots,
}: {
  variant?: ProjectPreviewVariant;
  screenshots?: ProjectScreenshot[];
}) {
  if (screenshots?.length) {
    return (
      <div className="relative h-full w-full">
        {variant === "mobile" ? <ScreenshotPhones shots={screenshots} /> : <ScreenshotWindow shot={screenshots[0]} />}
      </div>
    );
  }

  if (!variant) return null;
  const Preview = previews[variant];
  return (
    <div aria-hidden className="relative h-full w-full">
      <Preview />
    </div>
  );
}
