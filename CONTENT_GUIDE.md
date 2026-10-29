# Adding blog posts, projects, and editing your info

This is the guide for day-to-day content edits — no code changes needed for
any of this. For how the site is built/deployed mechanically, see
[INSTRUCTIONS.md](INSTRUCTIONS.md).

**Read "Why your edits sometimes don't show up" at the bottom first** —
it's almost certainly why the hackathon date change didn't appear anywhere.

## Easiest: the visual editor

`npm run edit` → **http://localhost:4321/portfolio/__editor**. Everything below can be done
there with forms instead of editing files: save with **Ctrl S**, check the
**Preview** pane, then hit **Build site**. To publish, commit and push.

Homepage text now lives in `src/data/content/*.json` (the `src/data/*.ts`
files just add types). To make a new field editable, add it to the JSON,
the matching `.ts` type, and `editor/schema.js`.

## Avatar looks ("changing hats")

The sidebar avatar swaps between alternate photos as visitors read: each homepage
section, each POC → Production stage and each tech-stack tab picks a look. The caption
under your name follows along ("› AI engineer mode"). On phones a small floating avatar
takes over once the sidebar has scrolled away.

- Looks: `src/data/content/personas.json` (id, caption, image in `public/personas/`).
  The editor's **Avatar looks** page edits these, and has a switch to turn the effect off.
- Which look shows where: the `persona` field on sections (`sections.json`), lifecycle
  stages and tech-stack categories (`skills.json`), plus `languagesPersona`.
- Source images (full-size AI generations) live in `src/assets/profile_image_types/`,
  outside `public/`, so they aren't shipped; `public/personas/*.webp` are 320 px crops.

## Add a new blog post

Create a new file in `src/content/blog/`, e.g. `src/content/blog/my-new-post.md`:

```md
---
title: "My Post Title"
description: "One sentence — shows on the blog index and in search results."
date: 2026-11-03
tags: ["ai", "philosophy"]
draft: false
---

Your content here, in plain Markdown. Headings, **bold**, *italic*, lists,
and links all work normally.

![Alt text](/blog/my-new-post/cover.jpg)
```

- The filename (minus `.md`) becomes the URL: `my-new-post.md` → `/blog/my-new-post`.
- `date` controls sort order on `/blog` and the homepage teaser (newest first) — use `YYYY-MM-DD`, no quotes.
- Set `draft: true` to keep working on it without it appearing on the public `/blog` index (the page still builds and is reachable by direct link, just not listed).
- If you want an image: drop the file in `public/blog/my-new-post/cover.jpg`, then reference it in the Markdown as `/blog/my-new-post/cover.jpg` (always start with `/`, always matching the real path under `public/`).

## Add a new project

Create a new file in `src/content/projects/`, e.g. `src/content/projects/my-project.md`:

```md
---
title: "My Project"
summary: "One or two sentences — shows on the project card."
stack: ["Python", "PyTorch"]
repo: "https://github.com/mralioo/my-project"
demo: "https://my-project-demo.com"   # optional
featured: true                          # optional, unused by the layout today
badge: "1st place · Some Hackathon"     # optional highlight chip on the card
image: "/projects/my-project.png"       # optional thumbnail; put the file in public/projects/
order: 4                                # lower numbers show first
---

Longer write-up in Markdown — shows on the project's own detail page
(`/projects/my-project`), not on the card.
```

It appears automatically on the homepage's Projects section, sorted by `order`.

## Edit your profile, tagline, motto, contact info

`src/data/content/profile.json` — name, role, tagline, About paragraphs, location, motto, email,
resume link, Calendly link, social links. Plain object, edit the string
values directly.

## Edit work history

`src/data/content/experience.json` — one object per job, newest first. Add a new entry
at the top of the array to add a new role.

## Edit education, certificates

`src/data/content/education.json`.

## Edit skills, languages

`src/data/content/skills.json` — `lifecycle` drives the interactive "POC → Production"
pipeline (each stage: `short` node label, `icon`, `activities`, `outcome`, `pitch`, `tools`;
`lifecycleLoop` is the caption on the loop-back arc), `skillGroups` the tabs of the
interactive tech-stack explorer (each: `label`, `icon`, `blurb`, `items`). Known tools get
their brand logo automatically (mapping in `src/lib/tech.ts`); concepts get a line icon,
anything else shows its initials. Clicking a tile lists where that tool appears in your
experience, projects and lifecycle stages — computed automatically, nothing to maintain.
`skillGroups` the compact stack table below it.

## Update course progress

`src/data/content/learning.json` — bump `progress` (0–100) as you go. At 100 the card
shows "✓ Done"; add `completed: "MM/YYYY"` too.

## Edit Physical AI lab, hackathons, hobbies, clubs

`src/data/content/extras.json` — `physicalAI` is the Lab section, `hackathons` the
recent-builds list (each with its own `date`), `pastHackathons` the
one-line "Earlier:" list. The InnoTrans blog post's date lives separately
in `src/content/blog/nextmove-innotrans-2026.md` front matter.

## Replace your resume or profile photo

Drop the new file at `public/resume.pdf` or `public/profile.jpg`, same
filename, overwriting the old one. No code change needed.

---

## Why your edits sometimes don't show up

This is the thing that bit you with the hackathon date. There's a gap
between "I saved the file" and "it's visible somewhere," and it's always
one of these:

**1. You're looking at the local dev server, but didn't save, or it's
showing a cached page.**
`make dev` hot-reloads almost everything, but do a hard refresh
(Ctrl/Cmd+Shift+R) if something looks stale.

**2. You edited the file but never rebuilt.**
If you're looking at `dist/` output or a `make preview` tab from before your
edit, it's frozen at whatever it was when you ran `make build`. Run
`make build` (or `make verify`) again after every content change before you
trust what you're looking at.

**3. You rebuilt locally, but never committed.**
`git status` only shows files as "modified" or "untracked" — that's your
laptop, nobody else (and no deployed site) sees it yet. Changes aren't
"saved" in any shared sense until:
```sh
git add -A
git commit -m "update hackathon date"
```

**4. You committed, but never pushed.**
`git commit` is still 100% local. Nothing leaves your machine until:
```sh
git push origin main
```
This is almost certainly the actual answer for the date change: as of this
writing, `git log` shows exactly one commit ever pushed to this repo — the
very first version of the Astro site, from before the bubble redesign, the
blog posts, and the motto even existed. Everything built since then
(including the NextMove post you just edited the date on) has only ever
existed on this machine.

**5. You pushed, but the GitHub Actions deploy hasn't finished (or failed).**
Pushing to `main` kicks off the `Deploy to GitHub Pages` workflow — check
the **Actions** tab on GitHub. It usually takes under a minute. If it shows
a red ✕, that's the actual problem; click in and read the error (it's the
same `astro build` you'd see locally).

**6. You're looking at the wrong URL, or a stale cache of the right one.**
The real live URL is `https://mralioo.github.io/portfolio/` — note the
`/portfolio/` path, because the repo is named `portfolio`, not
`mralioo.github.io`. (There's a good chance you also have an older,
unrelated site live at the bare `mralioo.github.io` domain from before this
project — that's a separate repo and this guide doesn't touch it.) Browsers
cache aggressively; hard-refresh or open an incognito window before
concluding a deploy didn't work.

### The reliable loop

```sh
# 1. edit content
# 2. look at it for real
make verify
# 3. ship it
git add -A
git commit -m "describe the change"
git push origin main
# 4. confirm it actually went out — watch the Actions tab,
#    then hard-refresh https://mralioo.github.io/portfolio/
```

Skipping step 3 (push) is the one that silently "does nothing" — no error,
no warning, your terminal looks completely normal. That's the trap.
