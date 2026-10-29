// Homepage: track the section in view and turn the right-hand arc dial.
// The dial is a large circle whose centre sits off-screen to the right, so
// only its left edge shows: a full-height arc. Section labels ride along
// it; `pos` (a continuous section index, 2.4 = 40% into the third section)
// decides the rotation, so the current section always sits at the arc's
// midpoint and the dial turns smoothly with scroll.
const dock = document.querySelector('[data-section-dock]');
const links = Array.from(document.querySelectorAll('[data-nav-link]'));
const sections = Array.from(document.querySelectorAll('[data-section]'));
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const order = links.map((a) => a.dataset.navLink);
const GAP = 16; // px between a label and the arc
// each label's transform ends with translate(-100%, -50%), so its right-middle
// point is what lands on the arc and what it rotates around
let current = null;
let shown = null;
let geo = null;

const VISIBLE = 3; // sections shown either side of the current one

function measure() {
  if (!dock) return;
  const h = window.innerHeight;
  const r = h * 1.2; // big radius = gentle arc
  const spacing = Math.min(110, Math.max(70, h * 0.1));
  const step = spacing / r; // radians between sections
  const w = dock.clientWidth;
  // the arc's ends bend right; keep the outermost visible label on screen
  const shift = r * (1 - Math.cos(VISIBLE * step));
  const apex = w - 14 - shift;
  geo = { r, step, cx: apex + r, cy: h / 2 };
  dock.style.setProperty('--r', `${r}px`);
  dock.style.setProperty('--apex', `${apex}px`);
}

function position() {
  const line = window.innerHeight * 0.35;
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) return sections.length - 1;
  let pos = 0;
  sections.forEach((s, i) => {
    const r = s.getBoundingClientRect();
    if (r.top <= line) pos = i + Math.min(0.999, (line - r.top) / Math.max(1, r.height));
  });
  // hold each section at the centre for most of its length, then glide on
  const i = Math.floor(pos);
  const f = pos - i;
  const e = f < 0.7 ? 0 : (f - 0.7) / 0.3;
  return i + e * e * (3 - 2 * e);
}

function paint(pos) {
  if (!geo) return;
  const { r, step, cx, cy } = geo;
  links.forEach((a, i) => {
    const d = i - pos;
    const ad = Math.abs(d);
    const th = d * step;
    const x = cx - r * Math.cos(th);
    const y = cy + r * Math.sin(th);
    const scale = Math.max(0.78, 1.14 - ad * 0.09);
    a.style.transform = `translate(${x - GAP}px, ${y}px) rotate(${(-th * 180) / Math.PI}deg) scale(${scale}) translate(-100%, -50%)`;
    a.style.opacity = String(Math.max(0, 1 - ad * 0.26));
    a.style.visibility = ad > VISIBLE + 0.4 ? 'hidden' : 'visible';
    a.classList.toggle('is-near', ad < 0.5);
  });
  dock.style.setProperty('--spin', `${(-pos * step * 180) / Math.PI}deg`);
}

function setActive(id) {
  if (id === current) return;
  current = id;
  links.forEach((a) => {
    const on = a.dataset.navLink === id;
    a.classList.toggle('active', on);
    if (on) a.setAttribute('aria-current', 'true');
    else a.removeAttribute('aria-current');
  });
}

let raf = 0;
function frame() {
  raf = 0;
  const target = position();
  setActive(order[Math.round(target)] ?? order[0]);
  if (!dock) return;
  shown = shown === null || reduceMotion ? target : shown + (target - shown) * 0.2;
  paint(shown);
  if (Math.abs(target - shown) > 0.002) raf = requestAnimationFrame(frame);
}
const kick = () => {
  if (!raf) raf = requestAnimationFrame(frame);
};
window.addEventListener('scroll', kick, { passive: true });
window.addEventListener('resize', () => {
  measure();
  shown = null;
  kick();
});
measure();
frame();
