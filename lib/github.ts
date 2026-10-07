import "server-only";
import { cacheLife } from "next/cache";

export type ContributionDay = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

export type GithubActivity = {
  total: number | null;
  days: ContributionDay[];
  publicRepos: number | null;
  followers: number | null;
};

async function getJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(6000),
    });
    return res.ok ? ((await res.json()) as T) : null;
  } catch {
    return null;
  }
}

/** Public contribution calendar + profile counts. Fails soft: the UI renders without live data. */
export async function getGithubActivity(username: string): Promise<GithubActivity> {
  "use cache";
  cacheLife("days");

  const [calendar, user] = await Promise.all([
    getJson<{ total: Record<string, number>; contributions: ContributionDay[] }>(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
    ),
    getJson<{ public_repos: number; followers: number }>(`https://api.github.com/users/${username}`),
  ]);

  return {
    total: calendar?.total?.lastYear ?? null,
    days: calendar?.contributions ?? [],
    publicRepos: user?.public_repos ?? null,
    followers: user?.followers ?? null,
  };
}
