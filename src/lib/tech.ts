// Build-time helpers for the Tech Stack explorer: resolve a technology name
// (as typed in the editor) to a logo or line icon, and find where on the
// site that technology was actually used.
import * as simpleIcons from 'simple-icons';

export type TechIcon =
  | { kind: 'brand'; path: string; color: string }
  | { kind: 'glyph'; svg: string }
  | { kind: 'mono'; text: string };

type SimpleIcon = { slug: string; path: string; hex: string };
const bySlug = new Map<string, SimpleIcon>(
  Object.values(simpleIcons as unknown as Record<string, SimpleIcon>)
    .filter((i) => i && typeof i === 'object' && 'slug' in i)
    .map((i) => [i.slug, i])
);

// normalized name → simple-icons slug
const BRANDS: Record<string, string> = {
  pytorch: 'pytorch',
  tensorflow: 'tensorflow',
  huggingface: 'huggingface',
  scikitlearn: 'scikitlearn',
  docker: 'docker',
  aws: 'amazonwebservices',
  gcp: 'googlecloud',
  googlecloud: 'googlecloud',
  mlflow: 'mlflow',
  airflow: 'apacheairflow',
  dvc: 'dvc',
  githubactions: 'githubactions',
  python: 'python',
  typescript: 'typescript',
  cplusplus: 'cplusplus',
  swift: 'swift',
  fastapi: 'fastapi',
  ros: 'ros',
  ros2: 'ros',
  mujocoisaacsim: 'nvidia',
  nvidia: 'nvidia',
  edgeaicoreml: 'apple',
  langchain: 'langchain',
  langgraph: 'langchain',
  neo4j: 'neo4j',
  kubernetes: 'kubernetes',
  streamlit: 'streamlit',
  jupyter: 'jupyter',
  electronicspcb: 'kicad',
  numpy: 'numpy',
  pandas: 'pandas',
  openai: 'openai',
  anthropic: 'anthropic',
  claude: 'anthropic',
};

// 24×24 monoline icons for concepts that have no logo
const G = {
  llm: '<path d="M4 5h16v11H9l-5 4z"/><path d="M12 8.5l.9 1.9 1.9.9-1.9.9-.9 1.9-.9-1.9-1.9-.9 1.9-.9z"/>',
  agent: '<rect x="5" y="8" width="14" height="11" rx="3"/><path d="M12 4v4M9.5 13h.01M14.5 13h.01M9.5 16h5"/>',
  multiagent: '<circle cx="12" cy="5" r="2.2"/><circle cx="5" cy="18" r="2.2"/><circle cx="19" cy="18" r="2.2"/><path d="M12 7.2v4.3M12 11.5L6.6 16.4M12 11.5l5.4 4.9"/>',
  rag: '<path d="M6 3h8l4 4v6"/><path d="M14 3v4h4M6 3v18h6"/><circle cx="16.5" cy="16.5" r="3"/><path d="M18.7 18.7L21 21"/>',
  prompt: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9l3 3-3 3M12 15h5"/>',
  finetune: '<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',
  context: '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/><path d="M3 17.5l9 5 9-5" opacity=".5"/>',
  timeseries: '<path d="M3 20h18"/><path d="M3 15l4-4 3 3 4-6 3 4 4-5"/>',
  sensor: '<circle cx="12" cy="12" r="2"/><path d="M8 8a5.7 5.7 0 0 0 0 8M16 8a5.7 5.7 0 0 1 0 8M5 5a10 10 0 0 0 0 14M19 5a10 10 0 0 1 0 14"/>',
  rl: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r=".8"/><path d="M20 4l-6.5 6.5M17 4h3v3"/>',
  mlops: '<path d="M7 8.5C4.5 8.5 3 10 3 12s1.5 3.5 4 3.5c3.5 0 6.5-7 10-7 2.5 0 4 1.5 4 3.5s-1.5 3.5-4 3.5c-3.5 0-6.5-7-10-7z"/>',
  cicd: '<circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/><path d="M7 12h3M14 12h3M5 10V6h14v4"/>',
  api: '<path d="M8 4c-2 0-3 1-3 3v2c0 1.5-1 3-2 3 1 0 2 1.5 2 3v2c0 2 1 3 3 3M16 4c2 0 3 1 3 3v2c0 1.5 1 3 2 3-1 0-2 1.5-2 3v2c0 2-1 3-3 3"/><path d="M10 12h4"/>',
  database: '<ellipse cx="12" cy="5.5" rx="7" ry="2.5"/><path d="M5 5.5v13c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-13M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5"/>',
  vla: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="2.6"/>',
  imitation: '<rect x="3" y="5" width="8" height="10" rx="2"/><rect x="13" y="9" width="8" height="10" rx="2"/><path d="M7 18v1h6M17 6V5h-6"/>',
  chip: '<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9.5" y="9.5" width="5" height="5" rx=".8"/><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"/>',
  cloud: '<path d="M7 18a4.5 4.5 0 0 1-.6-9 6 6 0 0 1 11.4 1.6A3.8 3.8 0 0 1 17 18z"/>',
  // category tab icons
  spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>',
  brain: '<path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 6 1V5a3 3 0 0 0-3-1zM15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-6 1"/>',
  code: '<path d="M8 7l-5 5 5 5M16 7l5 5-5 5M13.5 5l-3 14"/>',
  robot: '<path d="M5 20h8M9 20v-5l6-5"/><circle cx="9" cy="15" r="1.6"/><circle cx="15" cy="10" r="1.6"/><path d="M15 10l4-3M19 7l1.5 1.5M19 7l-1-2"/>',
  language: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
} as const;
export type GlyphName = keyof typeof G;
export const glyph = (name: GlyphName) => G[name];

const GLYPHS: Record<string, GlyphName> = {
  llms: 'llm',
  llm: 'llm',
  agenticai: 'agent',
  multiagentsystems: 'multiagent',
  rag: 'rag',
  graphrag: 'rag',
  promptengineering: 'prompt',
  finetuning: 'finetune',
  contextengineering: 'context',
  timeseries: 'timeseries',
  sensorfusion: 'sensor',
  reinforcementlearning: 'rl',
  mlopsllmops: 'mlops',
  mlops: 'mlops',
  llmops: 'mlops',
  cicd: 'cicd',
  reststreamingapis: 'api',
  restapis: 'api',
  sql: 'database',
  vlamodels: 'vla',
  imitationlearning: 'imitation',
  microcontrollers: 'chip',
};

const norm = (s: string) => s.toLowerCase().replace(/\+\+/g, 'plusplus').replace(/[^a-z0-9]/g, '');

// Brand colors that are too dark for the navy background fall back to light text.
function readable(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum < 0.34 ? 'var(--text-strong)' : `#${hex}`;
}

export function techIcon(name: string): TechIcon {
  const key = norm(name);
  const slug = BRANDS[key];
  const brand = slug && bySlug.get(slug);
  if (brand) return { kind: 'brand', path: brand.path, color: readable(brand.hex) };
  const g = GLYPHS[key];
  if (g) return { kind: 'glyph', svg: G[g] };
  const words = name.replace(/\(.*?\)/g, '').split(/[\s/&·-]+/).filter(Boolean);
  const text = words.length > 1 ? words.slice(0, 2).map((w) => w[0]).join('') : name.slice(0, 2);
  return { kind: 'mono', text: text.toUpperCase() };
}

// ---------- "where I used it" ----------
export type Usage = { label: string; detail: string; href?: string };
export type UsageSource = { label: string; detail: string; href?: string; terms: string[]; text?: string };

// "MLOps / LLMOps" → ["MLOps", "LLMOps"]; "Edge AI (CoreML)" → ["Edge AI", "CoreML"]
function aliases(name: string): string[] {
  const out = new Set<string>();
  const paren = name.match(/\(([^)]+)\)/);
  if (paren) out.add(paren[1]);
  for (const part of name.replace(/\(.*?\)/g, '').split(/\s\/\s|\s&\s/)) out.add(part.trim());
  out.add(name.trim());
  return [...out].filter((a) => a.length >= 2);
}

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export function findUsage(name: string, sources: UsageSource[]): Usage[] {
  const names = aliases(name);
  const res = names.map((a) => new RegExp(`(^|[^a-z0-9])${escapeRe(a.toLowerCase())}($|[^a-z0-9])`));
  const hits: Usage[] = [];
  for (const src of sources) {
    const hay = [...src.terms, src.text ?? ''].join(' \u0001 ').toLowerCase();
    if (res.some((re) => re.test(hay))) hits.push({ label: src.label, detail: src.detail, href: src.href });
  }
  return hits;
}
