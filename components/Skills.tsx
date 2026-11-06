import { skillCategories } from "@/data/skills";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";

export function Skills() {
  return (
    <Section
      id="skills"
      number="03"
      eyebrow="What I work with"
      title="From the first component to the database."
      description="A hands-on engineer who owns the whole feature, not another handoff."
      className="band-ink"
    >
      <ol className="border-t border-border">
        {skillCategories.map((category, i) => (
          <li key={category.id} className="border-b border-border">
            <Reveal
              delay={i * 0.05}
              className="grid gap-x-10 gap-y-3 py-9 sm:grid-cols-[3rem_minmax(0,1fr)] lg:grid-cols-[3rem_minmax(0,1fr)_minmax(0,1.1fr)]"
            >
              <p className="label pt-3 text-muted">{String(i + 1).padStart(2, "0")}</p>
              <div>
                <h3 className="text-3xl font-bold tracking-[-0.03em] sm:text-4xl">{category.title}</h3>
                <p className="mt-3 max-w-md leading-relaxed text-pretty text-muted">{category.summary}</p>
              </div>
              <p className="label self-end leading-loose text-muted sm:col-start-2 lg:col-start-3 lg:text-right">
                {category.skills.map((s) => s.name).join(" · ")}
              </p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
