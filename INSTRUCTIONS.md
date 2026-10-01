# Running, verifying, and publishing this site

This repo is deliberately driven by a `Makefile` so you don't need to remember
npm script names. Run `make help` any time to see the list again.

## 1. One-time setup

```sh
make env       # checks Node/npm are installed and new enough
make install   # npm install
```

`make env` just checks versions — it doesn't install anything for you. If it
fails, install Node.js (>= 22) from https://nodejs.org or via your system's
package manager, then re-run it.

## 2. Run it locally

```sh
make dev
```

Opens a dev server at `http://localhost:4321` with hot reload. Leave this
running while you edit content in `src/data/*.ts`, `src/content/blog/*.md`,
or `src/content/projects/*.md` — changes show up immediately.

Stop it with `Ctrl+C`.

## 3. Verify before pushing

Don't skip this — the dev server (`make dev`) is more forgiving than the real
static build GitHub Pages will serve. Always do a production build and click
through it locally first:

```sh
make verify
```

This runs `astro build` (the exact same command the GitHub Actions workflow
runs) and then serves the output from `dist/` with `astro preview`, printing
a local URL to open.

Checklist while you're looking at it:

- [ ] Homepage loads, hero animation renders, nothing is visually broken
- [ ] Every nav link scrolls/navigates correctly (`About`, `Experience`,
      `Projects`, `Blog`, `Contact`)
- [ ] `/blog` lists your posts; each post page opens and renders correctly
- [ ] Each project card links to the right GitHub repo
- [ ] Resume link (`/resume.pdf`) downloads/opens
- [ ] Check it on a narrow browser window (mobile width) too

If anything looks wrong, fix it, then re-run `make verify` — it rebuilds from
scratch each time.

To just build without serving it (e.g. to inspect the `dist/` output
directly):

```sh
make build
```

## 4. Publish to GitHub Pages

Publishing happens automatically from GitHub Actions on every push to `main`
— there is no separate deploy script or second repo to push to (that was the
old Next.js setup's approach; this one deploys itself).

### One-time GitHub setup

1. Push this repo to GitHub if you haven't already.
2. In the repo on GitHub: **Settings → Pages → Build and deployment → Source**,
   select **GitHub Actions**.
3. **Repo name decides the URL** — pick one:
   - Repo named `mralioo.github.io` → site is served at
     `https://mralioo.github.io` (the root domain). `astro.config.mjs` is
     already set up for this (no `base` path set).
   - Repo named anything else (e.g. `portfolio`) → site is served at
     `https://mralioo.github.io/<repo-name>/`. In that case, open
     `astro.config.mjs` and uncomment/set:
     ```js
     base: '/portfolio',
     ```
     (swap `portfolio` for whatever the repo is actually named), then rebuild.

### Every time after that

```sh
make verify          # build + click through it locally — do this first
git add -A
git commit -m "..."
git push origin main
```

Then watch the **Actions** tab on GitHub — the `Deploy to GitHub Pages`
workflow builds and publishes automatically. It usually finishes in under a
minute. The live URL is also shown on the workflow run's summary page and
under **Settings → Pages**.

## Troubleshooting

- **Build fails locally but you're not sure why**: run `make clean` then
  `make build` again — this clears `node_modules`, `dist`, and Astro's cache
  in case something is stale.
- **Site builds locally but 404s on GitHub Pages**: almost always the `base`
  path issue above — check the repo name vs. `astro.config.mjs`.
- **Workflow fails in the Actions tab**: click into the failed run, open the
  `build` job, and read the first red error — it's the same `astro build`
  output you'd see locally with `make build`.
