import type { SkillCategory } from "./types";

/**
 * `icon` is a key into the icon map in components/Skills.tsx.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    summary: "Where I spend most of my time — component architecture, rendering strategy, and UX polish.",
    skills: [
      {
        name: "React.js",
        icon: "react",
        description:
          "Primary UI library since 2020. Context API state management at UBS, microfrontends for Open edX, and reusable component systems.",
      },
      {
        name: "Next.js",
        icon: "next",
        description:
          "App Router, server components, and SSR for production sites like greatawakener.com and the OpsWerks full-stack template.",
      },
      {
        name: "HTML5",
        icon: "html",
        description:
          "Semantic, accessible markup — sharpened building public government platforms like gov.ph and business.gov.ph.",
      },
      {
        name: "CSS3",
        icon: "css",
        description:
          "Theming, responsive layouts, and design tokens — including a full custom OpenLMS theme built on Tutor Indigo.",
      },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    summary: "APIs and services that the interface can depend on.",
    skills: [
      {
        name: "Python",
        icon: "python",
        description:
          "Automation scripts for organizing assessment submissions in OpenLMS, plus Django services and tooling.",
      },
      {
        name: "Django REST",
        icon: "api",
        description:
          "REST API design and implementation, used as the backend layer of the OpsWerks application template.",
      },
      {
        name: "Node.js",
        icon: "node",
        description: "Server-side JavaScript for APIs, build tooling, and integrations alongside Next.js frontends.",
      },
      {
        name: "REST APIs",
        icon: "rest",
        description:
          "Designing and consuming APIs across teams — from WSO2 API Manager on government platforms to AI services.",
      },
    ],
  },
  {
    id: "database",
    title: "Database",
    summary: "Relational and document stores, chosen per workload.",
    skills: [
      {
        name: "PostgreSQL",
        icon: "postgres",
        description: "Default relational store for Django and Next.js applications, including the OpsWerks template.",
      },
      {
        name: "Supabase",
        icon: "supabase",
        description: "Postgres with auth and row-level security — used across the Great Awakener platforms.",
      },
      {
        name: "MongoDB",
        icon: "mongo",
        description: "Document modeling for flexible, schema-light application data.",
      },
      {
        name: "MySQL",
        icon: "mysql",
        description: "Relational data for CMS-backed sites and WordPress builds.",
      },
      {
        name: "MSSQL",
        icon: "mssql",
        description: "Enterprise SQL Server environments in corporate application work.",
      },
    ],
  },
  {
    id: "tools",
    title: "Tools & Platforms",
    summary: "The surrounding ecosystem that gets software shipped.",
    skills: [
      {
        name: "Docker",
        icon: "docker",
        description: "Containerized local and production environments for multi-service full-stack apps.",
      },
      {
        name: "Makefile",
        icon: "make",
        description: "One-command developer workflows — setup, test, migrate, and deploy — in the OpsWerks template.",
      },
      {
        name: "Justfile",
        icon: "just",
        description: "Modern task runner used to orchestrate the OpenLMS microfrontend and Tutor workflows.",
      },
      {
        name: "Stripe",
        icon: "stripe",
        description: "Payments and subscription integrations for commercial web products.",
      },
      {
        name: "WordPress",
        icon: "wordpress",
        description: "Custom themes and content sites for clients who need editor-friendly publishing.",
      },
      {
        name: "Open edX",
        icon: "openedx",
        description: "Microfrontends, Tutor plugins, and the Indigo-based custom theme for OpenLMS.",
      },
      {
        name: "Ionic",
        icon: "ionic",
        description: "Cross-platform mobile development for HazardHunterPH on iOS and Android.",
      },
    ],
  },
];
