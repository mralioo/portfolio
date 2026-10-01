import { defineConfig } from 'astro/config';

// This config assumes the site is deployed to the GitHub Pages ROOT domain,
// i.e. this repo is named `mralioo.github.io`. If you keep the repo named
// `portfolio` instead, GitHub Pages will serve it at
// `https://mralioo.github.io/portfolio/` — in that case uncomment `base` below.
export default defineConfig({
  site: 'https://mralioo.github.io',
  // base: '/portfolio',
  markdown: {
    shikiConfig: {
      theme: 'github-dark-default',
    },
  },
});
