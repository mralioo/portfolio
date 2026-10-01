---
title: "How this site is put together"
description: "A short map of the codebase for future-me: where content lives and how to change it."
date: 2026-10-01
tags: ["meta"]
draft: false
---

Quick reference for editing this site later, without having to re-read the whole
codebase.

## Content you'll touch often

- `src/data/profile.ts` — name, tagline, email, resume link, social links.
- `src/data/experience.ts` — work history (timeline on the homepage).
- `src/data/education.ts` — degrees, thesis, certificates.
- `src/data/skills.ts` — skill groups, languages, soft skills.
- `src/data/extras.ts` — hobbies, hackathons, clubs.
- `src/content/projects/*.md` — one file per project card.
- `src/content/blog/*.md` — one file per blog post (this one included).

## Content you'll touch rarely

- `src/components/*.astro` — layout/markup for each section.
- `src/styles/global.css` — the dark/technical theme, colors as CSS variables
  at the top of the file.
- `src/scripts/particles.js` — the generative hero-background animation.
- `src/scripts/reveal.js` — scroll-triggered fade-ins (`.reveal` class).

## Adding a new project

Create `src/content/projects/my-project.md` with the same front-matter shape
as the existing ones (`title`, `summary`, `stack`, `repo`, `order`). It shows
up on the homepage automatically, sorted by `order`.

## Deploying

Push to `main` — the GitHub Actions workflow in `.github/workflows/deploy.yml`
builds the site with Astro and publishes it to GitHub Pages.
