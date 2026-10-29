// Site-wide behavior, loaded on every page by BaseLayout: Lenis smooth
// scroll, smooth in-page anchors, the cursor spotlight, and .reveal fade-ins.
import Lenis from 'lenis';
import './reveal.js';
import './theme.js';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const lenis = reduceMotion ? null : new Lenis({ autoRaf: true, lerp: 0.12 });

// Same-page anchors glide instead of jumping. Lenis honours each section's
// scroll-margin-top, so mobile sticky headers don't cover the target.
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href*="#"]');
  if (!link) return;
  const url = new URL(link.href, location.href);
  if (url.pathname !== location.pathname || !url.hash) return;
  const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
  if (!target) return;
  e.preventDefault();
  if (lenis) lenis.scrollTo(target, { duration: 1.1 });
  else target.scrollIntoView();
  history.pushState(null, '', url.hash);
  target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
});

// Soft radial glow that trails the cursor across the whole page.
const spotlight = document.querySelector('[data-spotlight]');
if (spotlight && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  window.addEventListener('pointermove', (e) => {
    spotlight.style.setProperty('--x', `${e.clientX}px`);
    spotlight.style.setProperty('--y', `${e.clientY}px`);
    spotlight.classList.add('is-on');
  }, { passive: true });
}

// Top-right theme control: hide while scrolling down, show again on scroll up
// or near the top, so it never sits over text you're reading.
const topControls = document.querySelector('.top-controls');
if (topControls) {
  let lastY = window.scrollY;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (Math.abs(y - lastY) < 6) return;
    topControls.classList.toggle('is-tucked', y > lastY && y > 120);
    lastY = y;
  }, { passive: true });
}

// Reading progress: thin bar across the top edge, filling left → right.
const readBar = document.querySelector('[data-read-progress]');
if (readBar) {
  let queued = false;
  const paint = () => {
    queued = false;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    readBar.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
  };
  const onScroll = () => {
    if (!queued) {
      queued = true;
      requestAnimationFrame(paint);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  paint();
}
