import { ArrowUpRight, GitFork } from "lucide-react";
import { activityStack, featuredRepos } from "@/data/github";
import { profile } from "@/data/profile";
import { getGithubActivity } from "@/lib/github";
import { ContributionGraph } from "./ContributionGraph";
import { GithubIcon } from "./ui/BrandIcons";
import { buttonClasses } from "./ui/buttonStyles";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";

const languageDot: Record<string, string> = {
  React: "bg-sky-400",
  TypeScript: "bg-blue-500",
  SCSS: "bg-pink-400",
  Python: "bg-amber-400",
};

export async function DeveloperActivity() {
  const username = profile.githubUsername;
  const activity = await getGithubActivity(username);
  const githubUrl = `https://github.com/${username}`;

  const stats = [
    { label: "contributions / year", value: activity.total },
    { label: "public repositories", value: activity.publicRepos },
  ].filter((s): s is { label: string; value: number } => s.value !== null);

  return (
    <Section
      id="activity"
      eyebrow="Developer Activity"
      title="Code, in the open."
      description="Most of my work lives in private client repositories — here's the public trail."
    >
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
        <Reveal className="min-w-0 rounded-2xl border border-border bg-surface/70 p-5 shadow-card sm:p-7">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <p className="font-mono text-sm">
              <span className="text-accent-2">$</span> git log --author=&quot;{profile.name}&quot; --since=1.year
            </p>
            {activity.total !== null ? (
              <p className="font-mono text-xs text-subtle">
                <span className="text-foreground">{activity.total.toLocaleString("en-US")}</span> contributions
              </p>
            ) : (
              <p className="font-mono text-xs text-subtle">live data unavailable</p>
            )}
          </div>
          <ContributionGraph days={activity.days} />
        </Reveal>

        <Reveal
          delay={0.08}
          className="flex flex-col rounded-2xl border border-border bg-surface/70 p-6 shadow-card sm:p-7"
        >
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-xl border border-border-strong bg-surface-2">
              <GithubIcon size={20} />
            </span>
            <div>
              <p className="font-semibold">{profile.name}</p>
              <p className="font-mono text-xs text-subtle">@{username}</p>
            </div>
          </div>

          {stats.length > 0 && (
            <dl className="mt-6 grid grid-cols-2 gap-3">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse rounded-xl border border-border px-3.5 py-3">
                  <dt className="mt-0.5 font-mono text-[10.5px] text-subtle">{s.label}</dt>
                  <dd className="text-2xl font-semibold tracking-tight">{s.value.toLocaleString("en-US")}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-6">
            <p className="mb-2.5 font-mono text-[11px] tracking-wider text-subtle uppercase">Working in</p>
            <ul className="flex flex-wrap gap-1.5">
              {activityStack.map((t) => (
                <li key={t} className="rounded-md bg-surface-2 px-2 py-1 font-mono text-[11px] text-muted">
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto pt-7">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses("primary", "md", "w-full")}
            >
              <GithubIcon size={16} />
              View GitHub Profile
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </Reveal>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featuredRepos.map((repo, i) => (
          <Reveal key={repo.name} delay={i * 0.05}>
            <a
              href={`${githubUrl}/${repo.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col rounded-2xl border border-border bg-surface/50 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface"
            >
              <div className="flex items-start justify-between gap-3">
                <GitFork size={15} className="mt-0.5 shrink-0 text-subtle" aria-hidden />
                <ArrowUpRight
                  size={15}
                  aria-hidden
                  className="text-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
                />
              </div>
              <p className="mt-3 font-mono text-[13px] font-medium break-all">{repo.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{repo.description}</p>
              <p className="mt-auto flex items-center gap-2 pt-4 font-mono text-[11px] text-subtle">
                <span aria-hidden className={`size-2 rounded-full ${languageDot[repo.language] ?? "bg-accent"}`} />
                {repo.language}
              </p>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
