import type { ContributionDay } from "@/lib/github";

const levelClass = ["bg-foreground/[0.06]", "bg-accent/25", "bg-accent/45", "bg-accent/70", "bg-accent"] as const;

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function toWeeks(days: ContributionDay[]) {
  const weeks: (ContributionDay | null)[][] = [];
  if (!days.length) return weeks;
  // Pad the first week so rows line up with weekdays (Sunday first).
  const offset = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  const cells: (ContributionDay | null)[] = [...Array(offset).fill(null), ...days];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

export function ContributionGraph({ days }: { days: ContributionDay[] }) {
  const live = days.length > 0;
  // Without live data, render an empty calendar of the same shape.
  const weeks = live ? toWeeks(days) : Array.from({ length: 53 }, () => Array.from({ length: 7 }, () => null));

  const monthLabels = weeks.map((week, i) => {
    const first = week.find(Boolean);
    if (!first) return null;
    const m = new Date(`${first.date}T00:00:00Z`).getUTCMonth();
    const prev = weeks[i - 1]?.find(Boolean);
    const prevM = prev ? new Date(`${prev.date}T00:00:00Z`).getUTCMonth() : -1;
    return m !== prevM && i < weeks.length - 2 ? months[m] : null;
  });

  return (
    <div>
      {/* Cells flex to fill the card; below ~620px the calendar scrolls horizontally instead of shrinking */}
      <div className="[scrollbar-width:thin] overflow-x-auto pb-2">
        <div
          className="grid min-w-[620px] gap-x-[3px] gap-y-1.5"
          style={{ gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))` }}
        >
          {monthLabels.map((label, i) => (
            <span key={i} aria-hidden className="font-mono text-[10px] whitespace-nowrap text-subtle">
              {label}
            </span>
          ))}
        </div>
        <div
          role="img"
          aria-label={
            live ? "GitHub contribution calendar for the last year" : "GitHub contribution calendar unavailable"
          }
          className="mt-1.5 grid min-w-[620px] gap-[3px]"
          style={{ gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))` }}
        >
          {weeks.map((week, i) => (
            <div key={i} className="grid grid-rows-7 gap-[3px]">
              {Array.from({ length: 7 }, (_, d) => {
                const day = week[d];
                return (
                  <span
                    key={d}
                    title={day ? `${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}` : undefined}
                    className={`aspect-square w-full rounded-[2px] ${day ? levelClass[day.level] : live ? "bg-transparent" : levelClass[0]}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-end gap-1.5 font-mono text-[10px] text-subtle" aria-hidden>
        Less
        {levelClass.map((c) => (
          <span key={c} className={`size-[10px] rounded-[3px] ${c}`} />
        ))}
        More
      </div>
    </div>
  );
}
