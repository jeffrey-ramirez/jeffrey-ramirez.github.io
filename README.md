# Jeffrey Ramirez — Portfolio

Personal portfolio for Jeffrey Ramirez, Senior Frontend Developer with Full Stack experience.

**Stack:** Next.js 16 (App Router, Cache Components) · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion · Lucide · next-themes

## Getting started

```bash
npm install
cp .env.example .env.local   # optional — see "Contact form"
npm run dev
```

Open http://localhost:3000.

| Script           | Purpose                                |
| ---------------- | -------------------------------------- |
| `npm run dev`    | Start the dev server                   |
| `npm run build`  | Production build                       |
| `npm run lint`   | ESLint                                 |
| `npm run format` | Prettier (with Tailwind class sorting) |

## Editing content

All copy lives in `data/` — components only render it.

| File                 | Content                                                              |
| -------------------- | -------------------------------------------------------------------- |
| `data/profile.ts`    | Name, headline, about text, stats, nav, email & social links         |
| `data/skills.ts`     | Tech stack categories and the hover descriptions                     |
| `data/projects.ts`   | Projects (`featured: true` → large card); `preview` picks the mockup |
| `data/experience.ts` | Timeline roles, responsibilities, technologies                       |
| `data/approach.ts`   | "How I Build" cards                                                  |
| `data/github.ts`     | Curated repositories and stack shown in Developer Activity           |

The downloadable resume is `public/resume.pdf` — replace that file to update it. It isn't generated from `data/`, so
keep the two in sync by hand.

## Project structure

```
app/            layout + metadata, page, API route, sitemap/robots, OG image, icon
components/     one component per section, plus ui/ primitives (Section, Reveal, Button…)
data/           typed portfolio content
lib/            GitHub data fetching (cached daily) and shared contact validation
public/         resume.pdf, project screenshots
```

## Notable details

- **Dark-first theming** via CSS variables in `app/globals.css`, toggled with next-themes.
- **Reduced motion:** `MotionConfig reducedMotion="user"` plus a CSS override disable non-essential motion.
- **Developer Activity** pulls the live GitHub contribution calendar and profile counts at build time, cached for a day
  with `"use cache"`. If the APIs are unreachable the section renders without them — no fake data.
- **Project previews** are code-drawn UI mockups (`components/ProjectPreview.tsx`) rather than screenshots, so they
  theme correctly and stay lightweight. Swap in real screenshots with `next/image` if you have them.
- **SEO:** metadata, Open Graph image, JSON-LD `Person` schema, sitemap, and robots.

## Contact form

`app/api/contact/route.ts` validates input (same rules as the client, in `lib/contact.ts`), filters bots with a
honeypot, and sends via [Resend](https://resend.com) when `RESEND_API_KEY` and `CONTACT_TO_EMAIL` are set. Without
them, development logs submissions; production returns 503 and the form offers a direct email link instead.

## Deploying

Deploys as-is to Vercel or any Node host (`npm run build && npm start`). Set `NEXT_PUBLIC_SITE_URL` to the production
domain so canonical URLs, the sitemap, and Open Graph tags are correct.
