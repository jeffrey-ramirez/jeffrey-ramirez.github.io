export type FeaturedRepo = {
  name: string;
  description: string;
  language: string;
};

/** Curated repositories shown in the Developer Activity section. */
export const featuredRepos: FeaturedRepo[] = [
  {
    name: "OpenLMS-MFE-frontend-app-learning",
    description: "Customized Open edX course experience microfrontend for OpenLMS.",
    language: "React",
  },
  {
    name: "frontend-app-learner-dashboard",
    description: "Learner dashboard microfrontend, extended for OpenLMS.",
    language: "React",
  },
  {
    name: "tutor-indigo",
    description: "Tutor Indigo theme — the base of the custom OpenLMS look and feel.",
    language: "SCSS",
  },
  {
    name: "openlms-branding",
    description: "Shared design tokens and brand assets for OpenLMS frontends.",
    language: "TypeScript",
  },
];

export const activityStack = ["TypeScript", "React", "Next.js", "Python", "Django", "SCSS", "Docker", "PostgreSQL"];
