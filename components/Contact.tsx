import { ArrowUpRight } from "lucide-react";
import { profile, socialLinks } from "@/data/profile";
import { ContactForm } from "./ContactForm";
import { Reveal } from "./ui/Reveal";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="band-accent py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-wrap justify-between gap-4 label text-subtle">
            <p>07 / What&apos;s next?</p>
            <p className="flex items-center gap-2.5">
              <span aria-hidden className="size-2 rounded-full bg-white" />
              {profile.availability}
            </p>
          </div>
          <h2
            id="contact-heading"
            className="mt-10 text-[clamp(3rem,10vw,7.5rem)] leading-[0.98] font-extrabold tracking-[-0.05em]"
          >
            Let&apos;s build
            <br />
            something <span className="text-outline">solid.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-12 border-t border-border pt-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <Reveal>
            <p className="max-w-md text-lg leading-relaxed text-muted">
              Have a project, opportunity, or idea? I&apos;d love to hear about it.
            </p>

            <ul className="mt-8 border-t border-border">
              {socialLinks.map((link) => {
                const external = !link.href.startsWith("mailto:");
                return (
                  <li key={link.label} className="border-b border-border">
                    <a
                      href={link.href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group flex items-center justify-between gap-4 py-4"
                    >
                      <span className="min-w-0">
                        <span className="block font-semibold">{link.label}</span>
                        <span className="block truncate text-sm text-subtle">{link.handle}</span>
                      </span>
                      <ArrowUpRight
                        size={20}
                        aria-hidden
                        className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                      {external && <span className="sr-only">(opens in a new tab)</span>}
                    </a>
                  </li>
                );
              })}
              <li className="border-b border-border">
                <a
                  href={profile.resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 py-4"
                >
                  <span className="font-semibold">Download resume</span>
                  <ArrowUpRight
                    size={20}
                    aria-hidden
                    className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="paper rounded-md bg-background p-6 text-foreground sm:p-8">
              <h3 className="mb-6 text-xl font-bold tracking-[-0.02em]">Send a message</h3>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
