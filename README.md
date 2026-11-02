# Jeffrey Ramirez — Portfolio

Personal portfolio for Jeffrey Ramirez, Senior Frontend Developer with Full Stack experience.
Live at **https://jeffrey-ramirez.github.io**.

**Stack:** Next.js 16 (App Router, static export) · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion · Lucide · next-themes

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
- **Developer Activity** pulls the live GitHub contribution calendar and profile counts at build time; the deploy
  workflow rebuilds daily to keep it current. If the APIs are unreachable the section renders without them — no fake
  data.
- **Project previews** use real screenshots from `public/projects/` (set via `screenshots` in `data/projects.ts`),
  falling back to code-drawn mockups in `components/ProjectPreview.tsx`.
- **SEO:** metadata, Open Graph image (`/og.png`), JSON-LD `Person` schema, sitemap, and robots.

## Contact form

The site is fully static, so the form has no server of its own. Validation runs in the browser (`lib/contact.ts`).

- With `NEXT_PUBLIC_CONTACT_ENDPOINT` set to a form backend such as [Formspree](https://formspree.io), messages are
  POSTed there as JSON (`_gotcha` is the honeypot field).
- Without it, **Send Message** opens the visitor's email app with the message prefilled.

## Deploying

`next build` writes a static site to `out/`. `.github/workflows/deploy.yml` builds and publishes it to GitHub Pages on
every push to `main`, daily (to refresh GitHub activity), and on manual dispatch.

One-time setup in the repository settings:

1. **Settings → Pages → Build and deployment → Source:** choose **GitHub Actions**.
2. Optional: **Settings → Secrets and variables → Actions → Variables:** add `CONTACT_ENDPOINT` with your form
   backend URL.

`out/` also works on any static host (Netlify, Cloudflare Pages, Vercel). Set `NEXT_PUBLIC_SITE_URL` there so
canonical URLs, the sitemap, and Open Graph tags point at the right domain.
