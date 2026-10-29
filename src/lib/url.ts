// Prefixes an internal absolute path with Astro's configured `base`
// (see astro.config.mjs). Without this, every hardcoded href="/..." breaks
// as soon as the site is served from a subpath like /portfolio/ instead of
// the domain root — which is exactly what happened before this existed.
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const suffix = path.startsWith('/') ? path : `/${path}`;
  return `${base}${suffix}`;
}
