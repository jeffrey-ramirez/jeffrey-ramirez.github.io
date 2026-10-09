import type { NavItem, SocialLink } from "./types";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jeffrey-ramirez.github.io";

export const profile = {
  name: "Jeffrey Ramirez",
  title: "Senior Frontend Developer",
  positioning: "Senior Frontend Developer with Full Stack Experience",
  location: "Philippines · Open to remote",
  availability: "Available for opportunities",
  email: "jepramirez18@gmail.com",
  githubUsername: "jeffrey-ramirez",
  resumePath: "/resume.pdf",
  hero: {
    headline: "Building fast, scalable, and user-focused digital experiences.",
    subheadline:
      "Senior Frontend Developer with Full Stack experience, specializing in React, Next.js, and modern web applications.",
  },
  about: {
    lead: "I build frontends that hold up in production — and I'm comfortable going all the way down the stack to make them work.",
    paragraphs: [
      "For more than six years I've shipped web and mobile products across government, enterprise finance, education, and AI. My center of gravity is the frontend: React and Next.js applications, microfrontend architectures, and design systems that teams can keep building on.",
      "I work closely with backend teams and often am the backend team — designing REST APIs with Django REST Framework and Node.js, modeling data in PostgreSQL and Supabase, and packaging it all with Docker and Makefile-driven workflows.",
      "Right now I'm growing deliberately toward senior full-stack engineering: owning features end to end, from database schema to the last pixel of the interface.",
    ],
    stats: [
      { value: "6+", label: "Years shipping production software" },
      { value: "6", label: "Engineering roles across 5 organizations" },
      { value: "10", label: "Production platforms and products shipped" },
    ],
    credentials: [
      {
        label: "Education",
        title: "BS Information Technology",
        detail: "University of Saint Louis Tuguegarao",
        period: "2012 – 2017",
      },
      {
        label: "Eligibility",
        title: "Civil Service Exam — Professional",
        detail: "Passed",
        period: "August 2019",
      },
    ],
    focus: [
      "React & Next.js architecture",
      "Microfrontends",
      "Performance optimization",
      "API design & integration",
      "Full-stack delivery",
      "Cross-functional collaboration",
    ],
  },
} as const;

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const socialLinks: SocialLink[] = [
  {
    label: "Email",
    href: `mailto:${profile.email}`,
    handle: profile.email,
    icon: "mail",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jeffrey-andres-ramirez/",
    handle: "in/jeffrey-ramirez-397a56169",
    icon: "linkedin",
  },
  {
    label: "GitHub",
    href: `https://github.com/${profile.githubUsername}`,
    handle: `@${profile.githubUsername}`,
    icon: "github",
  },
];
