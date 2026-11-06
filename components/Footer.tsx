import { ArrowUp } from "lucide-react";
import { navItems, profile, socialLinks } from "@/data/profile";

export function Footer() {
  return (
    <footer className="bg-surface-2">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3">
        <div>
          <p className="label text-muted">{profile.title}</p>
          <p className="mt-4 text-lg leading-snug font-semibold tracking-[-0.02em]">
            {profile.hero.tagline[0]}
            <br />
            {profile.hero.tagline[1]}
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="space-y-2 text-sm font-medium">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="underline-offset-4 hover:underline">
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={profile.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4 hover:underline"
              >
                Resume
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <p className="label text-muted">Elsewhere</p>
          <ul className="mt-4 space-y-2 text-sm font-medium">
            {socialLinks.map((l) => {
              const external = !l.href.startsWith("mailto:");
              return (
                <li key={l.label}>
                  <a
                    href={l.href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="underline-offset-4 hover:underline"
                  >
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="label mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 text-muted sm:px-8">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <a href="#top" className="inline-flex items-center gap-1.5 hover:text-foreground">
            Back to top <ArrowUp size={12} aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
