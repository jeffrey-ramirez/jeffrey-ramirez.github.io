import { ArrowUp } from "lucide-react";
import { cacheLife } from "next/cache";
import { navItems, profile, socialLinks } from "@/data/profile";

async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold tracking-tight">{profile.name}</p>
          <p className="mt-1 text-sm text-subtle">{profile.positioning}</p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition-colors hover:text-foreground">
                  {item.label}
                </a>
              </li>
            ))}
            {socialLinks
              .filter((l) => l.icon !== "mail")
              .map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
          </ul>
        </nav>
      </div>
      <div className="mx-auto flex max-w-6xl items-center justify-between border-t border-border px-5 py-6 font-mono text-xs text-subtle sm:px-8">
        <p>
          © <CopyrightYear /> {profile.name}. Built with Next.js & Tailwind CSS.
        </p>
        <a href="#top" className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
          Back to top <ArrowUp size={12} aria-hidden />
        </a>
      </div>
    </footer>
  );
}
