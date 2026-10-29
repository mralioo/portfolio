# Ali Alouane — Portfolio & Blog

Personal site built with [Astro](https://astro.build): a dark, generative-motion
portfolio plus a Markdown blog for writing about ML, robotics, and whatever else.

Live at `https://mralioo.github.io/portfolio/` (this repo is named `portfolio`,
so it's a GitHub Pages *project* page, not the root domain — see **Deploying**
below).

## Stack

- **Astro** — static site generation, zero JS by default.
- **Markdown content collections** — `src/content/blog/` and `src/content/projects/`.
- Plain CSS (custom properties, no framework).
- **Motion:** [GSAP](https://gsap.com) + ScrollTrigger and [Lenis](https://lenis.darkroom.engineering)
  smooth scroll — split-text reveals, a pinned horizontal "POC → Production"
  scroll, active-section nav + side index, magnetic buttons, cursor spotlight.
  Site-wide code in `src/scripts/site.js`, homepage-only in `src/scripts/home.js`.
  Everything falls back to static content under `prefers-reduced-motion`.

## Editing content

**See [CONTENT_GUIDE.md](CONTENT_GUIDE.md)** — step-by-step for adding blog
posts, adding projects, and editing your info, plus *why an edit sometimes
doesn't show up anywhere* (answer: you forgot to push). Short version of
where things live:

| What | Where |
|---|---|
| Name, tagline, email, resume link | `src/data/profile.ts` |
| Work history | `src/data/experience.ts` |
| Education / certificates | `src/data/education.ts` |
| Courses + progress bars ("Always learning") | `src/data/learning.ts` |
| POC→Production lifecycle, skills, marquee, languages | `src/data/skills.ts` |
| Physical AI lab, hackathons, hobbies, clubs | `src/data/extras.ts` |
| Projects | `src/content/projects/*.md` |
| Blog posts | `src/content/blog/*.md` |
| Resume PDF | `public/resume.pdf` |
| Profile photo | `public/profile.jpg` (not yet wired into the UI — add an `<img>` where you want it) |

## Local development

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs to dist/
npm run preview   # serve the production build locally
```

## Deploying to GitHub Pages

Push to `main` — `.github/workflows/deploy.yml` builds with Astro and publishes via
GitHub's native Pages Actions. Already set up: repo **Settings → Pages → Source**
is set to "GitHub Actions" (not the default "legacy branch" mode, which would
conflict with this workflow).

**Repo naming and the URL:**

This repo is named `portfolio`, so GitHub Pages serves it at
`https://mralioo.github.io/portfolio/` — a project page, not the root domain.
`astro.config.mjs` has `base: '/portfolio'` set to match; every internal link
in the codebase goes through a `withBase()` helper (`src/lib/url.ts`) so it
stays correct automatically — **don't hardcode absolute paths like
`href="/blog"` directly**, use `withBase('/blog')` instead, or things will
404 in production exactly like they briefly did here.

If you ever rename the repo to `mralioo.github.io` for the cleaner root-domain
URL, update `BASE` in `astro.config.mjs` to `''` and drop `/portfolio` from
`site`.

The old version of this site deployed its build output to a separate
`mralioo.github.io` repo via a `gh-pages`-publish script. This version deploys
itself directly through GitHub Actions — no separate deploy repo or script needed.
