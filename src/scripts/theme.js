// Theme switching for ThemeToggle: saves the choice, moves the pill, and
// reveals the new theme as a circle growing from the clicked button (View
// Transitions API), falling back to a plain color crossfade.
const KEY = 'theme';
const THEMES = ['night', 'day', 'dusk'];
const root = document.documentElement;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function sync() {
  const current = root.dataset.theme || 'night';
  document.querySelectorAll('[data-theme-toggle]').forEach((group) => {
    group.style.setProperty('--tt-i', String(Math.max(0, THEMES.indexOf(current))));
    group.querySelectorAll('[data-theme-option]').forEach((b) => {
      b.setAttribute('aria-checked', String(b.dataset.themeOption === current));
    });
  });
}

function apply(theme) {
  root.dataset.theme = theme;
  try {
    localStorage.setItem(KEY, theme);
  } catch {}
  sync();
}

function switchTo(theme, origin) {
  if (theme === root.dataset.theme) return;
  if (reduceMotion) return apply(theme);
  if (!document.startViewTransition) {
    root.classList.add('theme-anim');
    apply(theme);
    setTimeout(() => root.classList.remove('theme-anim'), 500);
    return;
  }
  const r = origin.getBoundingClientRect();
  const x = r.left + r.width / 2;
  const y = r.top + r.height / 2;
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  const t = document.startViewTransition(() => apply(theme));
  t.ready.then(() => {
    root.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      { duration: 650, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', pseudoElement: '::view-transition-new(root)' }
    );
  });
}

document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-theme-option]');
  if (btn) switchTo(btn.dataset.themeOption, btn);
});

document.addEventListener('keydown', (e) => {
  const btn = e.target.closest?.('[data-theme-option]');
  if (!btn || !['ArrowLeft', 'ArrowRight'].includes(e.key)) return;
  e.preventDefault();
  const i = THEMES.indexOf(btn.dataset.themeOption) + (e.key === 'ArrowRight' ? 1 : -1);
  const next = btn.parentElement.querySelector(`[data-theme-option="${THEMES[(i + THEMES.length) % THEMES.length]}"]`);
  next?.focus();
  next?.click();
});

sync();
