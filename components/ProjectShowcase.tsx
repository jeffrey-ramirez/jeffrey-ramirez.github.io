import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { Section } from "./ui/Section";

export function ProjectShowcase() {
  const featured = projects.filter((p) => p.featured);
  const more = projects.filter((p) => !p.featured);

  return (
    <Section
      id="projects"
      number="01"
      eyebrow="Selected work"
      title="Production platforms, not side projects."
      description="Learning platforms, national government sites, enterprise finance tooling, AI systems, and mobile apps — built and shipped with real teams."
    >
      <div className="flex flex-col gap-20">
        {featured.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} size="large" />
        ))}
      </div>

      <div className="mt-20 grid gap-x-10 gap-y-20 md:grid-cols-2">
        {more.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={featured.length + i} />
        ))}
      </div>
    </Section>
  );
}
