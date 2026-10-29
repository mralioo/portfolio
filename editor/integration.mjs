// Visual content editor for this site, available only while `astro dev`
// runs (it never ships in the production build).
//
//   npm run edit  →  http://localhost:4321/portfolio/__editor
//
// The editor edits the same files you'd edit by hand:
//   src/data/content/*.json         homepage text, lists, section visibility
//   src/content/projects/*.md       project pages (front matter + body)
//   src/content/blog/*.md           blog posts (front matter + body)
//   public/uploads/                 images uploaded from the editor
// Saving writes those files, the dev server reloads, and the next
// `npm run build` / deploy picks them up like any other change.
import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';

const EDITOR_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(EDITOR_DIR, '..');
const CONTENT_DIR = path.join(ROOT, 'src/data/content');
const COLLECTIONS = {
  projects: path.join(ROOT, 'src/content/projects'),
  blog: path.join(ROOT, 'src/content/blog'),
};
const UPLOAD_DIR = path.join(ROOT, 'public/uploads');
const ASSETS = {
  '': ['index.html', 'text/html'],
  'app.js': ['app.js', 'text/javascript'],
  'app.css': ['app.css', 'text/css'],
  'schema.js': ['schema.js', 'text/javascript'],
};
const SLUG_RE = /^[a-z0-9][a-z0-9-]{0,80}$/;
const MAX_BODY = 15 * 1024 * 1024;

export default function contentEditor() {
  let base = '/';
  return {
    name: 'content-editor',
    hooks: {
      'astro:config:done': ({ config }) => {
        base = config.base;
      },
      'astro:server:setup': ({ server, logger }) => {
        const editorMiddleware = (req, res, next) => {
          const url = new URL(req.url, 'http://localhost');
          // Canonical URL is <base>/__editor. Astro strips the base from some
          // requests before middleware sees them, so accept both forms.
          const prefix = [`${base.replace(/\/$/, '')}/__editor`, '/__editor'].find(
            (p) => url.pathname === p || url.pathname.startsWith(`${p}/`)
          );
          if (!prefix) return next();
          const sub = url.pathname.slice(prefix.length).replace(/^\//, '');
          handle(req, res, sub, base).catch((err) => {
            logger.error(err.stack || String(err));
            send(res, 500, { error: err.message });
          });
        };
        // Front of the stack, ahead of Astro's own routing and 404 handling.
        server.middlewares.stack.unshift({ route: '', handle: editorMiddleware });
      },
      'astro:server:start': ({ address, logger }) => {
        logger.info(`Content editor → http://localhost:${address.port}${base.replace(/\/$/, '')}/__editor`);
      },
    },
  };
}

async function handle(req, res, sub, base) {
  if (!sub.startsWith('api/')) {
    const asset = ASSETS[sub];
    if (!asset) return send(res, 404, { error: 'not found' });
    let body = await fs.readFile(path.join(EDITOR_DIR, asset[0]), 'utf8');
    if (asset[0] === 'index.html') {
      const b = base.replace(/\/$/, '');
      body = body.replaceAll('__PREFIX__', `${b}/__editor`).replace('__BASE__', JSON.stringify(b));
    }
    res.writeHead(200, { 'content-type': `${asset[1]}; charset=utf-8`, 'cache-control': 'no-store' });
    return res.end(body);
  }

  // The API writes files: only answer this machine (even if the dev server
  // runs with --host), and only the editor page itself — a custom header
  // plus an Origin check stops other websites from posting to localhost.
  const remote = req.socket.remoteAddress ?? '';
  if (!['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(remote)) return send(res, 403, { error: 'editor is local-only' });
  const origin = req.headers.origin;
  if (req.headers['x-content-editor'] !== '1' || (origin && new URL(origin).host !== req.headers.host)) {
    return send(res, 403, { error: 'forbidden' });
  }

  const parts = sub.split('/').slice(1); // drop "api"
  const method = req.method;

  // ----- JSON content files -----
  if (parts[0] === 'content') {
    if (method === 'GET' && parts.length === 1) {
      const files = {};
      for (const f of await fs.readdir(CONTENT_DIR)) {
        if (f.endsWith('.json')) files[f.slice(0, -5)] = JSON.parse(await fs.readFile(path.join(CONTENT_DIR, f), 'utf8'));
      }
      return send(res, 200, { files });
    }
    if (method === 'PUT' && parts.length === 2) {
      const file = path.join(CONTENT_DIR, `${parts[1]}.json`);
      if (!SLUG_RE.test(parts[1]) || !(await exists(file))) return send(res, 400, { error: 'unknown content file' });
      const data = JSON.parse(await readBody(req));
      await fs.writeFile(file, `${JSON.stringify(data, null, 2)}\n`);
      return send(res, 200, { ok: true });
    }
  }

  // ----- Markdown collections (projects, blog) -----
  if (parts[0] === 'collections' && COLLECTIONS[parts[1]]) {
    const dir = COLLECTIONS[parts[1]];
    if (method === 'GET' && parts.length === 2) {
      const entries = [];
      for (const f of (await fs.readdir(dir)).sort()) {
        if (!f.endsWith('.md')) continue;
        entries.push({ slug: f.slice(0, -3), ...parseMd(await fs.readFile(path.join(dir, f), 'utf8')) });
      }
      return send(res, 200, { entries });
    }
    const slug = parts[2];
    if (parts.length === 3 && SLUG_RE.test(slug)) {
      const file = path.join(dir, `${slug}.md`);
      if (method === 'PUT') {
        const { data, body, renameFrom } = JSON.parse(await readBody(req));
        if (renameFrom && renameFrom !== slug) {
          if (!SLUG_RE.test(renameFrom)) return send(res, 400, { error: 'bad slug' });
          if (await exists(file)) return send(res, 409, { error: `"${slug}" already exists` });
          await fs.rm(path.join(dir, `${renameFrom}.md`), { force: true });
        }
        await fs.writeFile(file, stringifyMd(data, body));
        return send(res, 200, { ok: true });
      }
      if (method === 'DELETE') {
        await fs.rm(file, { force: true });
        return send(res, 200, { ok: true });
      }
    }
    return send(res, 400, { error: 'bad collection request' });
  }

  // ----- image upload -----
  if (parts[0] === 'upload' && method === 'POST') {
    const { name, data } = JSON.parse(await readBody(req));
    const ext = path.extname(String(name)).toLowerCase();
    if (!['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg', '.pdf'].includes(ext)) {
      return send(res, 400, { error: 'only images or PDF' });
    }
    const stem = path.basename(String(name), ext).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'file';
    const filename = `${stem}-${Date.now().toString(36)}${ext}`;
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    await fs.writeFile(path.join(UPLOAD_DIR, filename), Buffer.from(String(data), 'base64'));
    return send(res, 200, { path: `/uploads/${filename}` });
  }

  // ----- production build -----
  if (parts[0] === 'build' && method === 'POST') {
    return send(res, 200, await runBuild());
  }

  return send(res, 404, { error: 'unknown endpoint' });
}

// ---------- helpers ----------

let building = null;
function runBuild() {
  if (building) return building;
  building = new Promise((resolve) => {
    const started = Date.now();
    const child = spawn('npm', ['run', 'build'], { cwd: ROOT, env: { ...process.env, FORCE_COLOR: '0' } });
    let log = '';
    child.stdout.on('data', (d) => (log += d));
    child.stderr.on('data', (d) => (log += d));
    child.on('close', (code) => {
      building = null;
      resolve({ ok: code === 0, code, seconds: Math.round((Date.now() - started) / 100) / 10, log: log.slice(-20000) });
    });
  });
  return building;
}

function parseMd(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { data: {}, body: text };
  return { data: YAML.parse(m[1]) ?? {}, body: text.slice(m[0].length).replace(/^\r?\n/, '') };
}

function stringifyMd(data, body) {
  // drop empty optionals so the content schema's .url()/.optional() checks pass
  const clean = {};
  for (const [k, v] of Object.entries(data ?? {})) {
    if (v === '' || v === null || v === undefined) continue;
    clean[k] = v;
  }
  return `---\n${YAML.stringify(clean, { lineWidth: 0 })}---\n\n${String(body ?? '').replace(/^\s+/, '')}`;
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (c) => {
      size += c.length;
      if (size > MAX_BODY) {
        reject(new Error('request too large'));
        req.destroy();
      } else chunks.push(c);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

function send(res, status, obj) {
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
  res.end(JSON.stringify(obj));
}
