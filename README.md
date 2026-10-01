# Ali Alouane — Portfolio & Blog

Personal site built with [Astro](https://astro.build): a dark, generative-motion
portfolio plus a Markdown blog for writing about ML, robotics, and whatever else.

Live at `https://mralioo.github.io` once deployed (see **Deploying** below for the
repo-naming caveat).

## Stack

- **Astro** — static site generation, zero JS by default.
- **Markdown content collections** — `src/content/blog/` and `src/content/projects/`.
- Plain CSS (custom properties, no framework) + a small amount of vanilla JS for
  the hero canvas animation and scroll reveals.

## Editing content

See the [`how-this-site-works`](src/content/blog/how-this-site-works.md) post for
the full map. Short version:

| What | Where |
|---|---|
| Name, tagline, email, resume link | `src/data/profile.ts` |
| Work history | `src/data/experience.ts` |
| Education / certificates | `src/data/education.ts` |
| Skills / languages | `src/data/skills.ts` |
| Hobbies / hackathons / clubs | `src/data/extras.ts` |
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
GitHub's native Pages Actions. One-time setup: in the repo's **Settings → Pages**,
set **Source** to "GitHub Actions".

**Repo naming matters for the URL:**

- Repo named `mralioo.github.io` → site serves at the root domain,
  `https://mralioo.github.io`. This is what `astro.config.mjs` currently assumes
  (`base` is unset).
- Repo named anything else (e.g. `portfolio`) → site serves at
  `https://mralioo.github.io/<repo-name>/`. In that case uncomment the `base:`
  line in `astro.config.mjs` and set it to `/<repo-name>`.

The old version of this site deployed its build output to a separate
`mralioo.github.io` repo via a `gh-pages`-publish script. This version deploys
itself directly through GitHub Actions — no separate deploy repo or script needed.
