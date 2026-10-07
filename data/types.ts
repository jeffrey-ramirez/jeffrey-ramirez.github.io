export type NavItem = {
  label: string;
  href: `#${string}`;
};

export type SocialLink = {
  label: string;
  href: string;
  handle: string;
  icon: "mail" | "github" | "linkedin";
};

export type SkillCategory = {
  id: string;
  title: string;
  summary: string;
  skills: Skill[];
};

export type Skill = {
  name: string;
  icon: string;
  description: string;
};

export type ProjectPreviewVariant = "lms" | "web" | "terminal" | "ai" | "mobile" | "gov";

export type ProjectLink = {
  label: string;
  href: string;
  kind: "demo" | "github";
};

export type ProjectScreenshot = {
  /** Path under public/ */
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Address shown in the browser-frame bar (web screenshots only) */
  url?: string;
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  role: string;
  company?: string;
  keyContribution: string;
  highlights: string[];
  technologies: string[];
  links?: ProjectLink[];
  /** Drawn mockup style; omit to show the card without a visual */
  preview?: ProjectPreviewVariant;
  /** Real screenshots; when present they replace the drawn mockup */
  screenshots?: ProjectScreenshot[];
  featured?: boolean;
};

export type Experience = {
  id: string;
  role: string;
  company: string;
  /** e.g. "Contractual", "Part-time"; omitted for full-time roles */
  employmentType?: string;
  start: string;
  end: string;
  location?: string;
  summary: string;
  responsibilities: string[];
  technologies: string[];
};

export type ApproachStep = {
  number: string;
  title: string;
  description: string;
  principles: string[];
};
