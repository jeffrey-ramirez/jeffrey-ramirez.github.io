import { ArrowUpRight, Mail } from "lucide-react";
import { profile, socialLinks } from "@/data/profile";
import type { SocialLink } from "@/data/types";
import { ContactForm } from "./ContactForm";
import { GithubIcon, LinkedinIcon } from "./ui/BrandIcons";
import { Reveal } from "./ui/Reveal";

const socialIcon: Record<SocialLink["icon"], React.ReactNode> = {
  mail: <Mail size={18} aria-hidden />,
  github: <GithubIcon size={18} />,
  linkedin: <LinkedinIcon size={17} />,
};

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />
        <div className="absolute -top-32 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <p className="mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-accent uppercase">
              <span aria-hidden className="h-px w-8 bg-accent/60" />
              Contact
            </p>
            <h2
              id="contact-heading"
              className="text-gradient text-4xl font-semibold tracking-tight text-balance sm:text-6xl"
            >
              Let&apos;s build something great.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
              Have a project, opportunity, or idea? I&apos;d love to hear about it.
            </p>

            <ul className="mt-10 space-y-3">
              {socialLinks.map((link) => {
                const external = !link.href.startsWith("mailto:");
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group flex items-center gap-4 rounded-2xl border border-border bg-surface/50 p-4 transition-colors hover:border-border-strong hover:bg-surface"
                    >
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-border bg-surface-2 text-muted transition-colors group-hover:text-foreground">
                        {socialIcon[link.icon]}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium">{link.label}</span>
                        <span className="block truncate font-mono text-xs text-subtle">{link.handle}</span>
                      </span>
                      <ArrowUpRight
                        size={16}
                        aria-hidden
                        className="text-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
                      />
                      {external && <span className="sr-only">(opens in a new tab)</span>}
                    </a>
                  </li>
                );
              })}
            </ul>
            <p className="mt-6 font-mono text-xs text-subtle">{profile.location}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-border p-6 shadow-card glass sm:p-8">
              <h3 className="mb-6 text-lg font-semibold tracking-tight">Send a message</h3>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
