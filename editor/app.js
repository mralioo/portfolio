// Site editor front end: builds forms from schema.js, keeps an in-memory
// working copy of every file, and saves through the dev-server API in
// integration.mjs. Everything is plain DOM — no framework, no innerHTML
// with user data.
import { contentFiles, collections } from './schema.js';

const BASE = window.SITE_BASE || '';
const SLUG_RE = /^[a-z0-9][a-z0-9-]{0,80}$/;

const $ = (sel) => document.querySelector(sel);
const side = $('[data-side]');
const main = $('[data-main]');
const statusEl = $('[data-status]');
const saveBtn = $('[data-action="save"]');
const revertBtn = $('[data-action="revert"]');
const previewPane = $('[data-preview]');
const previewFrame = $('[data-preview-frame]');
const previewOpen = $('[data-preview-open]');

/** key → { kind, label, schema, data, body, slug, origSlug, collection, saved } */
const docs = new Map();
let currentKey = null;
// remembers which array cards are expanded, per item object
const openItems = new WeakSet();

// ---------- API ----------
async function api(path, options = {}) {
  const res = await fetch(`${BASE}/__editor/api/${path}`, {
    ...options,
    headers: { 'content-type': 'application/json', 'x-content-editor': '1', ...(options.headers || {}) },
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error || `${res.status} ${res.statusText}`);
  return json;
}

const clone = (v) => JSON.parse(JSON.stringify(v));
const snapshot = (doc) => JSON.stringify([doc.data, doc.body ?? null, doc.slug ?? null]);
const isDirty = (doc) => doc.saved !== snapshot(doc);

// ---------- load ----------
async function load() {
  const { files } = await api('content');
  for (const file of contentFiles) {
    if (!files[file.name]) continue;
    const doc = { kind: 'content', name: file.name, label: file.label, schema: file, data: files[file.name] };
    doc.saved = snapshot(doc);
    docs.set(`content:${file.name}`, doc);
  }
  for (const col of collections) {
    const { entries } = await api(`collections/${col.name}`);
    for (const e of entries) addEntryDoc(col, e.slug, e.data, e.body, false);
  }
  currentKey = docs.keys().next().value;
  render();
}

function addEntryDoc(col, slug, data, body, isNew) {
  const doc = { kind: 'entry', collection: col, schema: col, slug, origSlug: isNew ? null : slug, data, body };
  doc.saved = isNew ? null : snapshot(doc);
  docs.set(`${col.name}:${isNew ? `new-${Date.now()}` : slug}`, doc);
  return doc;
}

const entryTitle = (doc) => doc.data[doc.collection.titleKey] || doc.slug;

// ---------- sidebar ----------
function renderSide() {
  side.replaceChildren();
  const heading = (text) => side.appendChild(el('h3', {}, text));
  const navBtn = (key, label, cls = '') => {
    const doc = docs.get(key);
    const b = el('button', { type: 'button', class: `${cls} ${key === currentKey ? 'current' : ''}`.trim() }, el('span', {}, label));
    if (isDirty(doc)) b.appendChild(el('span', { class: 'dot', title: 'Unsaved changes' }));
    b.addEventListener('click', () => select(key));
    side.appendChild(b);
  };

  heading('Site content');
  for (const [key, doc] of docs) if (doc.kind === 'content') navBtn(key, doc.label);

  for (const col of collections) {
    heading(col.label);
    for (const [key, doc] of docs) {
      if (doc.kind === 'entry' && doc.collection === col) {
        navBtn(key, entryTitle(doc) + (doc.data.draft ? ' · hidden' : ''), `sub ${doc.data.draft ? 'is-draft' : ''}`);
      }
    }
    const add = el('button', { type: 'button', class: 'new' }, `+ New ${col.singular}`);
    add.addEventListener('click', () => newEntry(col));
    side.appendChild(add);
  }
}

function newEntry(col) {
  let n = 1;
  const taken = new Set([...docs.values()].filter((d) => d.collection === col).map((d) => d.slug));
  while (taken.has(`new-${col.singular}-${n}`)) n++;
  const body = col.name === 'blog' ? 'Write your post here in Markdown.\n' : 'Longer write-up in Markdown.\n';
  const doc = addEntryDoc(col, `new-${col.singular}-${n}`, clone(col.newItem), body, true);
  select([...docs.entries()].find(([, d]) => d === doc)[0]);
}

function select(key) {
  currentKey = key;
  render();
  main.scrollTop = 0;
  syncPreview();
}

// ---------- main form ----------
function render() {
  renderSide();
  updateStatus();
  const doc = docs.get(currentKey);
  if (!doc) {
    main.replaceChildren(el('p', { class: 'empty' }, 'Nothing selected.'));
    return;
  }

  const head = el('div', { class: 'doc-head' });
  const titles = el('div', {}, el('h1', {}, doc.kind === 'content' ? doc.label : entryTitle(doc)));
  if (doc.kind === 'content' && doc.schema.description) titles.appendChild(el('p', {}, doc.schema.description));
  head.appendChild(titles);

  if (doc.kind === 'entry') {
    const del = el('button', { type: 'button', class: 'btn small danger' }, 'Delete');
    del.addEventListener('click', () => deleteEntry(doc));
    head.appendChild(del);
  }

  const form = el('div', {});
  if (doc.kind === 'entry') {
    const slugInput = el('input', { type: 'text', value: doc.slug, spellcheck: 'false' });
    slugInput.addEventListener('input', () => {
      doc.slug = slugInput.value.trim();
      changed();
    });
    const urlPrefix = doc.collection.name === 'blog' ? '/blog/' : '/projects/';
    form.appendChild(fieldWrap('URL', el('div', { class: 'slug-row' }, el('span', {}, urlPrefix), slugInput),
      'Lowercase letters, numbers and dashes. Also the file name.'));
  }

  for (const [key, def] of Object.entries(doc.schema.fields)) form.appendChild(renderField(def, doc.data, key));

  if (doc.kind === 'entry') {
    const body = el('textarea', { class: 'body', spellcheck: 'true' });
    body.value = doc.body ?? '';
    body.addEventListener('input', () => {
      doc.body = body.value;
      changed();
    });
    form.appendChild(fieldWrap('Body (Markdown)', body,
      'Headings (## Title), **bold**, lists, links, images: ![alt](/uploads/file.png), tables.'));
  }

  main.replaceChildren(head, form);
}

function fieldWrap(label, control, help) {
  const wrap = el('div', { class: 'field' }, el('label', {}, label), control);
  if (help) wrap.appendChild(el('p', { class: 'help' }, help));
  return wrap;
}

// Renders one field bound to parent[key]; edits write straight back into
// the working copy, so keys the schema doesn't know about are preserved.
function renderField(def, parent, key) {
  const value = parent[key];
  const set = (v) => {
    parent[key] = v;
    changed();
  };

  switch (def.type) {
    case 'text':
    case 'date': {
      const input = el('input', { type: def.type === 'date' ? 'date' : 'text', value: value ?? '' });
      input.addEventListener('input', () => set(input.value));
      return fieldWrap(def.label, input, def.help);
    }
    case 'textarea':
    case 'md': {
      const ta = el('textarea', { rows: def.type === 'md' ? 4 : 3 });
      ta.value = value ?? '';
      ta.addEventListener('input', () => set(ta.value));
      return fieldWrap(def.label, ta, def.help);
    }
    case 'number': {
      const input = el('input', { type: 'number', value: value ?? 0 });
      input.addEventListener('input', () => set(input.value === '' ? 0 : Number(input.value)));
      return fieldWrap(def.label, input, def.help);
    }
    case 'bool': {
      const cb = el('input', { type: 'checkbox' });
      cb.checked = Boolean(value);
      cb.addEventListener('change', () => set(cb.checked));
      const wrap = el('div', { class: 'field' }, el('label', { class: 'toggle' }, cb, el('span', {}, def.label)));
      if (def.help) wrap.appendChild(el('p', { class: 'help' }, def.help));
      return wrap;
    }
    case 'select': {
      const sel = el('select', {}, ...def.options.map((o) => el('option', { value: o }, o)));
      sel.value = value ?? def.options[0];
      sel.addEventListener('change', () => set(sel.value));
      return fieldWrap(def.label, sel, def.help);
    }
    case 'list': {
      const ta = el('textarea', { class: 'list', rows: Math.min(10, Math.max(3, (value?.length ?? 0) + 1)) });
      ta.value = (value ?? []).join('\n');
      ta.addEventListener('input', () => set(ta.value.split('\n').map((s) => s.trim()).filter(Boolean)));
      return fieldWrap(def.label, ta, def.help);
    }
    case 'image':
      return imageField(def, value, set);
    case 'object': {
      if (!parent[key] || typeof parent[key] !== 'object') parent[key] = {};
      const fs = el('fieldset', { class: 'group' }, el('legend', {}, def.label));
      if (def.help) fs.appendChild(el('p', { class: 'help' }, def.help));
      for (const [k, d] of Object.entries(def.fields)) fs.appendChild(renderField(d, parent[key], k));
      return fs;
    }
    case 'array':
      if (!Array.isArray(parent[key])) parent[key] = [];
      return arrayField(def, parent[key]);
    default:
      return el('p', { class: 'help' }, `Unknown field type ${def.type}`);
  }
}

function imageField(def, value, set) {
  const input = el('input', { type: 'text', value: value ?? '', placeholder: '/uploads/…' });
  const thumb = el('img', { alt: '' });
  const showThumb = () => {
    const v = input.value.trim();
    thumb.hidden = !/\.(png|jpe?g|webp|gif|svg)$/i.test(v);
    if (!thumb.hidden) thumb.src = v.startsWith('/') ? BASE + v : v;
  };
  input.addEventListener('input', () => {
    set(input.value.trim());
    showThumb();
  });
  const file = el('input', { type: 'file', accept: 'image/*,.pdf', hidden: true });
  const upload = el('button', { type: 'button', class: 'btn small' }, 'Upload…');
  upload.addEventListener('click', () => file.click());
  file.addEventListener('change', async () => {
    const f = file.files[0];
    if (!f) return;
    try {
      const data = await new Promise((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => resolve(String(r.result).split(',')[1]);
        r.onerror = reject;
        r.readAsDataURL(f);
      });
      const { path } = await api('upload', { method: 'POST', body: JSON.stringify({ name: f.name, data }) });
      input.value = path;
      set(path);
      showThumb();
      toast(`Uploaded ${f.name}`);
    } catch (err) {
      toast(err.message, true);
    }
  });
  showThumb();
  return fieldWrap(def.label, el('div', { class: 'image-row' }, thumb, input, upload, file), def.help);
}

function arrayField(def, items) {
  const wrap = el('div', { class: 'array' });
  const head = el('div', { class: 'array-head' }, el('h4', {}, `${def.label} (${items.length})`));
  if (!def.fixed) {
    const add = el('button', { type: 'button', class: 'btn small' }, '+ Add');
    add.addEventListener('click', () => {
      const fresh = def.newItem ? clone(def.newItem) : def.of.type === 'object' ? {} : '';
      items.push(fresh);
      if (typeof fresh === 'object') openItems.add(fresh);
      changed();
      rerender();
    });
    head.appendChild(add);
  }
  wrap.appendChild(head);
  if (def.help) wrap.appendChild(el('p', { class: 'help' }, def.help));
  const list = el('div', {});
  wrap.appendChild(list);

  function rerender() {
    head.querySelector('h4').textContent = `${def.label} (${items.length})`;
    list.replaceChildren(...items.map((item, i) => itemCard(i)));
  }

  function itemCard(i) {
    const item = items[i];
    const isObj = item && typeof item === 'object';
    const card = el('div', { class: 'item' });
    if (isObj && item.visible === false) card.classList.add('is-hidden');
    if (!isObj || openItems.has(item)) card.classList.add('open');

    const title = el('span', { class: 'item-title' });
    const updateTitle = () => {
      const raw = isObj ? item[def.itemTitle] : items[i];
      title.textContent = String(raw || `Item ${i + 1}`).replace(/\*\*|\[|\]\([^)]*\)/g, '').slice(0, 90);
      if (isObj && item.visible === false) title.appendChild(el('small', {}, 'hidden'));
    };
    updateTitle();

    const tools = el('div', { class: 'item-tools' });
    const tool = (label, text, fn, disabled, cls = '') => {
      const b = el('button', { type: 'button', title: label, 'aria-label': label, class: cls }, text);
      b.disabled = disabled;
      b.addEventListener('click', (e) => {
        e.stopPropagation();
        fn();
      });
      tools.appendChild(b);
    };
    const move = (to) => {
      items.splice(to, 0, items.splice(i, 1)[0]);
      changed();
      rerender();
    };
    tool('Move up', '↑', () => move(i - 1), i === 0);
    tool('Move down', '↓', () => move(i + 1), i === items.length - 1);
    if (!def.fixed) {
      tool('Remove', '✕', () => {
        if (!confirm(`Remove "${title.textContent}"?`)) return;
        items.splice(i, 1);
        changed();
        rerender();
      }, false, 'del');
    }

    const headEl = el('div', { class: 'item-head' }, el('span', { class: 'chev' }, '›'), title, tools);
    headEl.addEventListener('click', () => {
      card.classList.toggle('open');
      if (isObj) card.classList.contains('open') ? openItems.add(item) : openItems.delete(item);
    });

    const body = el('div', { class: 'item-body' });
    if (isObj) {
      for (const [k, d] of Object.entries(def.of.fields)) body.appendChild(renderField(d, item, k));
    } else {
      body.appendChild(renderField({ ...def.of, label: def.of.label }, items, i));
    }
    body.addEventListener('input', () => {
      updateTitle();
      if (isObj) card.classList.toggle('is-hidden', item.visible === false);
    });
    body.addEventListener('change', () => {
      updateTitle();
      if (isObj) card.classList.toggle('is-hidden', item.visible === false);
    });

    card.append(headEl, body);
    return card;
  }

  rerender();
  return wrap;
}

// ---------- state changes ----------
let sideTimer;
function changed() {
  updateStatus();
  clearTimeout(sideTimer);
  sideTimer = setTimeout(renderSide, 250);
}

function updateStatus() {
  const dirty = [...docs.values()].filter(isDirty);
  saveBtn.disabled = dirty.length === 0;
  const cur = docs.get(currentKey);
  revertBtn.disabled = !cur || !isDirty(cur) || cur.saved === null;
  statusEl.textContent = dirty.length ? `${dirty.length} unsaved ${dirty.length === 1 ? 'change' : 'changes'}` : 'All changes saved';
  statusEl.classList.toggle('dirty', dirty.length > 0);
}

async function saveAll() {
  const dirty = [...docs.entries()].filter(([, d]) => isDirty(d));
  if (!dirty.length) return true;
  try {
    for (const [, doc] of dirty) {
      if (doc.kind === 'content') {
        await api(`content/${doc.name}`, { method: 'PUT', body: JSON.stringify(doc.data) });
      } else {
        if (!SLUG_RE.test(doc.slug)) throw new Error(`"${entryTitle(doc)}": URL must be lowercase letters, numbers and dashes`);
        await api(`collections/${doc.collection.name}/${doc.slug}`, {
          method: 'PUT',
          body: JSON.stringify({ data: doc.data, body: doc.body, renameFrom: doc.origSlug }),
        });
        doc.origSlug = doc.slug;
      }
      doc.saved = snapshot(doc);
    }
    toast(`Saved ${dirty.length} ${dirty.length === 1 ? 'file' : 'files'}`);
    render();
    setTimeout(reloadPreview, 1500);
    return true;
  } catch (err) {
    toast(err.message, true);
    render();
    return false;
  }
}

function revert() {
  const doc = docs.get(currentKey);
  if (!doc || doc.saved === null) return;
  const [data, body, slug] = JSON.parse(doc.saved);
  doc.data = data;
  if (doc.kind === 'entry') {
    doc.body = body;
    doc.slug = slug;
  }
  render();
}

async function deleteEntry(doc) {
  if (!confirm(`Delete "${entryTitle(doc)}" permanently? This removes the file.`)) return;
  try {
    if (doc.origSlug) await api(`collections/${doc.collection.name}/${doc.origSlug}`, { method: 'DELETE' });
    const key = [...docs.entries()].find(([, d]) => d === doc)[0];
    docs.delete(key);
    currentKey = docs.keys().next().value;
    toast('Deleted');
    render();
    setTimeout(reloadPreview, 1500);
  } catch (err) {
    toast(err.message, true);
  }
}

// ---------- build ----------
const dialog = $('[data-build-dialog]');
async function build() {
  if ([...docs.values()].some(isDirty) && !(await saveAll())) return;
  const title = $('[data-build-title]');
  const log = $('[data-build-log]');
  title.className = '';
  title.textContent = 'Building the production site…';
  log.textContent = 'Running npm run build — this takes a few seconds.';
  dialog.showModal();
  try {
    const r = await api('build', { method: 'POST' });
    title.className = r.ok ? 'ok' : 'fail';
    title.textContent = r.ok
      ? `Build succeeded in ${r.seconds}s — dist/ is ready. Commit & push to publish.`
      : `Build failed (exit ${r.code}) — see the log, fix the field it mentions, save, and build again.`;
    log.textContent = r.log;
    log.scrollTop = log.scrollHeight;
  } catch (err) {
    title.className = 'fail';
    title.textContent = 'Build request failed';
    log.textContent = err.message;
  }
}

// ---------- preview ----------
function previewUrl() {
  const doc = docs.get(currentKey);
  if (doc?.kind === 'entry' && doc.origSlug && !doc.data.draft) {
    return `${BASE}/${doc.collection.name === 'blog' ? 'blog' : 'projects'}/${doc.origSlug}/`;
  }
  return `${BASE}/`;
}

function syncPreview() {
  previewOpen.href = previewUrl();
  if (previewPane.hidden) return;
  const want = new URL(previewUrl(), location.href).pathname;
  let have = '';
  try {
    have = previewFrame.contentWindow.location.pathname;
  } catch {}
  if (have !== want) previewFrame.src = previewUrl();
}

function reloadPreview() {
  if (previewPane.hidden) return;
  try {
    previewFrame.contentWindow.location.reload();
  } catch {
    previewFrame.src = previewUrl();
  }
}

// ---------- toast / dom helper ----------
let toastTimer;
function toast(msg, error = false) {
  const t = $('[data-toast]');
  t.textContent = msg;
  t.className = `toast show${error ? ' error' : ''}`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (t.className = 'toast'), error ? 6000 : 2200);
}

function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v === false || v === undefined || v === null) continue;
    if (k === 'value') node.value = v;
    else node.setAttribute(k, v === true ? '' : v);
  }
  for (const c of children) node.append(c);
  return node;
}

// ---------- wire up ----------
saveBtn.addEventListener('click', saveAll);
revertBtn.addEventListener('click', revert);
$('[data-action="build"]').addEventListener('click', build);
$('[data-action="close-build"]').addEventListener('click', () => dialog.close());
$('[data-action="reload-preview"]').addEventListener('click', reloadPreview);
$('[data-action="preview"]').addEventListener('click', (e) => {
  previewPane.hidden = !previewPane.hidden;
  e.currentTarget.classList.toggle('active', !previewPane.hidden);
  if (!previewPane.hidden) previewFrame.src = previewUrl();
});
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
    e.preventDefault();
    saveAll();
  }
});
window.addEventListener('beforeunload', (e) => {
  if ([...docs.values()].some(isDirty)) e.preventDefault();
});

load().catch((err) => {
  main.replaceChildren(el('p', { class: 'empty' }, `Could not load content: ${err.message}`));
});
