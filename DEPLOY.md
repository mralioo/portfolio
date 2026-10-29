# Deploying the portfolio

**Live site → [mralioo.github.io/portfolio](https://mralioo.github.io/portfolio/)**

That's the link to send to recruiters and talent scouts. It's also what you put on
your CV, LinkedIn "Website" field and GitHub profile.

---

## How deployment works

The site is static (Astro). Every push to the **`main`** branch runs
`.github/workflows/deploy.yml`, which:

1. installs dependencies (`npm ci`),
2. builds the site (`npm run build` → `dist/`),
3. publishes `dist/` to **GitHub Pages**.

The new version is live about 1–2 minutes after the push. Nothing else needs a server.

## One-time setup (already done for this repo)

1. On GitHub: **Settings → Pages → Build and deployment → Source: _GitHub Actions_**.
2. `astro.config.mjs` has `site: 'https://mralioo.github.io'` and `base: '/portfolio'`,
   matching the repo name. If you ever rename the repo, update `base` too.

## Publishing changes

### From the visual editor

1. `npm run edit`, which opens <http://localhost:4321/portfolio/__editor>
2. Edit, then **Save** (Ctrl S).
3. Optional: **Build site** to check the production build passes.
4. Commit and push (below).

### Commit and push

```sh
git add -A
git commit -m "content: update portfolio"
git push origin main
```

Working on a branch instead? Push it, open a pull request, and merge it into `main`.
The merge deploys.

### Check the deploy

- GitHub → **Actions** tab → latest **"Deploy to GitHub Pages"** run should be green.
- Open the live link and hard-refresh (Ctrl Shift R) if you still see the old version.

## If something goes wrong

| Symptom | Fix |
|---|---|
| Actions run is red at `npm ci` | `package-lock.json` is out of sync: run `npm install`, commit the lock file, push again. |
| Actions run is red at `npm run build` | Run `npm run build` locally; the error names the file/field (often an invalid URL in a project's front matter). |
| Page loads without styling / images 404 | A hard-coded `/path` link; use `withBase()` in components (Markdown is handled automatically). |
| Old content still showing locally | Delete the `.astro/` cache folder and rebuild. |
| Deploy succeeded but site unchanged | Browser cache: hard-refresh, or wait a minute for GitHub's CDN. |

## Sharing kit for HR / talent hunters

Copy-paste message:

> Hi! Here's my portfolio with my projects, skills and experience as an AI Engineer
> (LLMs, RAG, agentic systems, Physical AI):
> **https://mralioo.github.io/portfolio/**
> Résumé (PDF): https://mralioo.github.io/portfolio/resume.pdf

Direct links into the page:

| What | Link |
|---|---|
| Homepage | <https://mralioo.github.io/portfolio/> |
| Skills (POC → Production) | <https://mralioo.github.io/portfolio/#skills> |
| Projects | <https://mralioo.github.io/portfolio/#projects> |
| Experience | <https://mralioo.github.io/portfolio/#experience> |
| Résumé PDF | <https://mralioo.github.io/portfolio/resume.pdf> |
| Blog | <https://mralioo.github.io/portfolio/blog/> |

A QR code pointing at the homepage is in `public/portfolio-qr.svg` (also served at
<https://mralioo.github.io/portfolio/portfolio-qr.svg>). Put it on printed CVs or slides.
