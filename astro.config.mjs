import { defineConfig } from 'astro/config';
import contentEditor from './editor/integration.mjs';

// This repo is named `portfolio`, so GitHub Pages serves it at
// https://mralioo.github.io/portfolio/ (a project page, not the root
// domain). `base` below must match that, or every absolute link/asset path
// (CSS, nav links, images, resume.pdf) 404s on the live site — which is
// exactly what was happening before this was set.
//
// If you ever rename this repo to `mralioo.github.io` instead (for the
// cleaner root-domain URL), delete the `base` line, update `site` to drop
// `/portfolio`, and update BASE below to ''.
const BASE = '/portfolio';

// Component code can prefix its own links with `withBase()` (src/lib/url.ts),
// but Markdown blog/project bodies (e.g. `![...](/blog/post/cover.jpg)`)
// can't reach that helper — Astro doesn't base-prefix root-absolute paths
// written inside Markdown content. This rehype plugin does it for every
// <img>/<video>/<source> src and <a href> in rendered Markdown, so you can keep writing
// plain absolute paths in content files without thinking about `base`.
function rehypeBaseUrls() {
  return (tree) => {
    function walk(node) {
      if (node.type === 'element') {
        const attr = ['img', 'video', 'source'].includes(node.tagName) ? 'src' : node.tagName === 'a' ? 'href' : null;
        const value = attr && node.properties?.[attr];
        if (
          typeof value === 'string' &&
          value.startsWith('/') &&
          !value.startsWith('//') &&
          !value.startsWith(`${BASE}/`) &&
          value !== BASE
        ) {
          node.properties[attr] = BASE + value;
        }
      }
      // inline HTML in Markdown (e.g. <video src="/blog/...">) arrives as raw text
      if (node.type === 'raw' && typeof node.value === 'string') {
        node.value = node.value.replace(/\b(src|href)="\/(?!\/)/g, (m, attr, offset, str) =>
          str.startsWith(`${BASE.slice(1)}/`, offset + m.length) ? m : `${attr}="${BASE}/`
        );
      }
      if (node.children) node.children.forEach(walk);
    }
    walk(tree);
  };
}

export default defineConfig({
  site: 'https://mralioo.github.io',
  base: BASE,
  // Visual content editor at /portfolio/__editor — active only under `astro dev`.
  integrations: [contentEditor()],
  markdown: {
    rehypePlugins: [rehypeBaseUrls],
    shikiConfig: {
      theme: 'github-dark-default',
    },
  },
});
