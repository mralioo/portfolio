# Ali Alouane — Portfolio & Blog

Personal site built with [Astro](https://astro.build): a dark, generative-motion
portfolio plus a Markdown blog for writing about ML, robotics, and whatever else.

**Live: [mralioo.github.io/portfolio](https://mralioo.github.io/portfolio/)** · deploy guide and recruiter sharing kit: [DEPLOY.md](DEPLOY.md)

Live at `https://mralioo.github.io/portfolio/` (this repo is named `portfolio`,
so it's a GitHub Pages *project* page, not the root domain — see **Deploying**
below).

## Stack

- **Astro** — static site generation, zero JS by default.
- **Markdown content collections** — `src/content/blog/` and `src/content/projects/`.
- Plain CSS (custom properties, no framework).
- **Layout:** modeled on [Brittany Chiang's portfolio](https://brittanychiang.com) —
  sticky left column (name, role, section nav whose line grows for the active
  section, socials), scrolling right column, cursor spotlight, hover-lift
  entries that dim their siblings, sticky section headers on mobile.
- **Themes:** Night / Day / Dusk switcher (sidebar), saved per visitor, first visit follows the OS setting.
  Palettes are CSS variables at the top of `src/styles/global.css`.
- **Motion:** [Lenis](https://lenis.darkroom.engineering) smooth scroll + small
  vanilla JS. Site-wide in `src/scripts/site.js`, homepage nav tracking in
  `src/scripts/home.js`. Respects `prefers-reduced-motion`.

## Editing content

**Visual editor (no code):** run `npm run edit` — it starts the dev server and
opens **http://localhost:4321/portfolio/__editor**. From there you can:

- edit every homepage text: sidebar, About paragraphs, skills, experience,
  education, courses + progress, Physical AI, hackathons, hobbies;
- add / remove / reorder any list item (roles, bullets, courses, links…);
- show, hide, rename and reorder homepage sections and the blocks inside them;
- create, edit, hide (draft) or delete projects and blog posts, with a
  Markdown body editor and image / PDF upload (saved to `public/uploads/`);
- toggle a live preview, and run the production build with one click.

**Save** writes the same files listed below, so a saved change goes into the
build automatically. Commit and push to publish it. The editor only exists
while `astro dev` is running. It never ends up in `dist/`, and its API only
accepts requests from this machine.


**See [CONTENT_GUIDE.md](CONTENT_GUIDE.md)** — step-by-step for adding blog
posts, adding projects, and editing your info, plus *why an edit sometimes
doesn't show up anywhere* (answer: you forgot to push). Short version of
where things live:

| What | Where |
|---|---|
| Name, tagline, About paragraphs, email, resume link | `src/data/content/profile.json` |
| Section order / visibility / headings | `src/data/content/sections.json` |
| Work history | `src/data/content/experience.json` |
| Education / certificates | `src/data/content/education.json` |
| Courses + progress bars | `src/data/content/learning.json` |
| POC→Production lifecycle, skills, languages | `src/data/content/skills.json` |
| Physical AI lab, hackathons, hobbies, clubs | `src/data/content/extras.json` |
| Projects (+ `image:` thumbnail in `public/projects/`) | `src/content/projects/*.md` |
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
