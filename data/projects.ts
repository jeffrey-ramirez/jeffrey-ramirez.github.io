import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "openlms",
    name: "OpenLMS / Open edX",
    tagline: "Learning platform frontend architecture",
    description:
      "A customized Open edX learning platform. I built microfrontends and a bespoke theme on top of the Open edX ecosystem, and automated the handling of learner submissions.",
    role: "Fullstack Engineer",
    company: "OpsWerks",
    keyContribution:
      "Designed and shipped the custom OpenLMS theme on Tutor Indigo and the microfrontends that extend the core platform.",
    highlights: [
      "Developed microfrontends for OpenLMS / Open edX",
      "Built a custom OpenLMS theme using Tutor Indigo",
      "Owned frontend architecture and platform integrations",
      "Wrote Python automation to organize user-submitted assessment files",
    ],
    technologies: ["React", "Next.js", "Open edX", "Microfrontends", "Python"],
    preview: "lms",
    screenshots: [
      {
        src: "/projects/openlms-dashboard.webp",
        width: 1280,
        height: 1175,
        alt: "LearningWerks learner dashboard with assigned course cards, progress summary, and upcoming due dates",
        url: "LearningWerks · Dashboard",
      },
    ],
    featured: true,
  },
  {
    slug: "great-awakener",
    name: "Great Awakener",
    tagline: "Full-stack web platform and companion app",
    description:
      "Development of greatawakener.com and max.greatawakener.com — the public website and a companion application — with a focus on full-stack features and speed.",
    role: "Fullstack Engineer",
    company: "TheFutureSocietyLLC",
    keyContribution:
      "Delivered full-stack features across both properties and drove performance optimization on the Next.js frontend.",
    highlights: [
      "Full-stack development across two production properties",
      "Website development for greatawakener.com",
      "Application development for max.greatawakener.com",
      "Performance optimization of rendering and data loading",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Supabase", "Python"],
    links: [
      { label: "greatawakener.com", href: "https://greatawakener.com", kind: "demo" },
      { label: "max.greatawakener.com", href: "https://max.greatawakener.com", kind: "demo" },
    ],
    preview: "web",
    screenshots: [
      {
        src: "/projects/greatawakener.webp",
        width: 1440,
        height: 980,
        alt: "Great Awakener homepage hero: “Humanity is changing. The world is changing. Consciousness is changing.”",
        url: "greatawakener.com",
      },
    ],
    featured: true,
  },
  {
    slug: "ai-ticketing",
    name: "AI-Powered Ticketing System",
    tagline: "Support workflows with AI in the loop",
    description:
      "A ticketing system that uses AI to assist with triaging and resolving requests, built on an API-driven architecture connecting the interface to backend and AI services.",
    role: "Fullstack Engineer",
    keyContribution: "Built the frontend and integrated it with the backend and AI services through a clean API layer.",
    highlights: [
      "Developed an AI-powered ticketing system",
      "Frontend and backend integration",
      "API-driven architecture between UI, services, and AI",
    ],
    technologies: ["React", "Next.js", "REST APIs", "Python", "AI integrations"],
    preview: "ai",
    screenshots: [
      {
        src: "/projects/ai-ticketing.webp",
        width: 1366,
        height: 600,
        alt: "Ticketing system events table with service, severity, tags, status, and assignee columns",
        url: "Events",
      },
    ],
    featured: true,
  },
  {
    slug: "ubs-mywaydigital",
    name: "UBS MyWayDigital Client Advisor",
    tagline: "Enterprise wealth-management tooling",
    description:
      "A client advisor application for a global bank. I developed application features in a large React codebase in close partnership with backend engineers.",
    role: "Application Developer",
    company: "Accenture",
    keyContribution:
      "Shipped advisor-facing features using React Context API for state, wired to backend services built by partner teams.",
    highlights: [
      "Developed application features for client advisors",
      "React Context API for state management",
      "Consumed backend APIs across service boundaries",
      "Collaborated closely with backend developers",
    ],
    technologies: ["React", "Context API", "REST APIs", "TypeScript"],
  },
  {
    slug: "hazardhunterph",
    name: "HazardHunterPH",
    tagline: "National hazard assessment, in your pocket",
    description:
      "The official mobile app for generating natural-hazard assessments for any location in the Philippines, published on the App Store and Google Play.",
    role: "Mobile Developer",
    company: "PHIVOLCS",
    keyContribution: "Developed the mobile application and owned its weekly release cycle to both app stores.",
    highlights: [
      "Developed the HazardHunterPH mobile application",
      "Built with the Ionic Framework",
      "Integrated hazard assessment APIs",
      "Weekly deployments to the App Store and Google Play",
    ],
    technologies: ["Ionic", "REST APIs", "iOS", "Android"],
    preview: "mobile",
    screenshots: [
      {
        src: "/projects/hazardhunterph-home.webp",
        alt: "HazardHunterPH home screen with location search",
        width: 304,
        height: 616,
      },
      {
        src: "/projects/hazardhunterph-map.webp",
        width: 304,
        height: 616,
        alt: "HazardHunterPH map of the Philippines showing active faults and trenches",
      },
    ],
    featured: true,
  },
  {
    slug: "gov-platforms",
    name: "Government Web Platforms",
    tagline: "business.gov.ph · gov.ph · Government Web Template 2.0",
    description:
      "Public-facing national government websites and the shared web template used by agencies and local government units across the country.",
    role: "Mid Web Developer",
    company: "DICT / DOST-ASTI",
    keyContribution:
      "Built government portals on Liferay CMS, integrated services through WSO2 API Manager, and trained LGUs to adopt the template.",
    highlights: [
      "Government web development for business.gov.ph and gov.ph",
      "Government Web Template 2.0 on Liferay CMS",
      "WSO2 API Manager integration",
      "Conducted LGU training on the web template",
    ],
    technologies: ["Liferay", "WSO2 API Manager", "HTML5", "CSS3", "JavaScript"],
    links: [
      { label: "business.gov.ph", href: "https://business.gov.ph", kind: "demo" },
      { label: "gov.ph", href: "https://www.gov.ph", kind: "demo" },
    ],
    preview: "gov",
    screenshots: [
      {
        src: "/projects/business-gov-ph.webp",
        width: 957,
        height: 600,
        alt: "Philippine Business Hub (business.gov.ph) homepage: “PH Business made easy 24/7”",
        url: "business.gov.ph",
      },
    ],
    featured: true,
  },
  {
    slug: "opswerks-template",
    name: "OpsWerks Application Template",
    tagline: "Scalable full-stack architecture, reusable by default",
    description:
      "A GitHub repository template that gives every new project a production-shaped starting point: Next.js frontend, Django backend, PostgreSQL, and Docker — wired together and driven by a single Makefile.",
    role: "Fullstack Engineer",
    company: "OpsWerks",
    keyContribution:
      "Architected the template end to end so a new team goes from one make command to a running full-stack app in minutes.",
    highlights: [
      "Reusable GitHub repository template for new projects",
      "Next.js frontend with a Django REST backend",
      "PostgreSQL with containerized services via Docker",
      "Makefile-based development workflow for setup, testing, and migrations",
    ],
    technologies: ["Next.js", "Django", "PostgreSQL", "Docker", "Makefile"],
  },
];
