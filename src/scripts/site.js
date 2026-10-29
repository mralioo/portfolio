// Site-wide behavior, loaded on every page by BaseLayout:
// Lenis smooth scroll (driven by GSAP's ticker so ScrollTrigger stays in
// sync), in-page anchor scrolling, scroll progress bar, mobile menu,
// magnetic buttons, card spotlight, and the .reveal fade-ins.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import './reveal.js';

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// ---------- smooth scroll ----------
export const lenis = reduceMotion ? null : new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
if (lenis) {
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

const navHeight = () => document.querySelector('[data-nav]')?.offsetHeight ?? 0;

export function scrollToTarget(target) {
  if (lenis) {
    // Lenis already honours the sections' scroll-margin-top (= nav height).
    lenis.scrollTo(target, { duration: 1.2 });
  } else {
    const y = target.getBoundingClientRect().top + window.scrollY - navHeight();
    window.scrollTo({ top: y });
  }
}

// Same-page anchors (#id, or /portfolio/#id while already on the homepage)
// scroll smoothly instead of jumping.
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href*="#"]');
  if (!link) return;
  const url = new URL(link.href, location.href);
  if (url.pathname !== location.pathname || !url.hash) return;
  const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
  if (!target) return;
  e.preventDefault();
  closeMenu();
  scrollToTarget(target);
  history.pushState(null, '', url.hash);
});

// Arriving from another page with a hash: let layout settle, then glide there.
if (location.hash) {
  const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (target) window.addEventListener('load', () => scrollToTarget(target));
}

// ---------- scroll progress + nav state ----------
const progress = document.querySelector('[data-scroll-progress]');
const nav = document.querySelector('[data-nav]');
function onScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (progress) progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
  nav?.classList.toggle('is-scrolled', window.scrollY > 20);
}
if (lenis) lenis.on('scroll', onScroll);
else window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ---------- mobile menu ----------
const toggle = document.querySelector('[data-nav-toggle]');
const menu = document.querySelector('[data-mobile-menu]');
let menuOpen = false;

function openMenu() {
  if (!menu || menuOpen) return;
  menuOpen = true;
  menu.hidden = false;
  toggle.setAttribute('aria-expanded', 'true');
  toggle.setAttribute('aria-label', 'Close menu');
  document.body.classList.add('menu-open');
  lenis?.stop();
  if (!reduceMotion) {
    gsap.fromTo(menu, { clipPath: 'circle(0% at 100% 0%)' }, { clipPath: 'circle(150% at 100% 0%)', duration: 0.6, ease: 'power3.inOut' });
    gsap.fromTo(menu.querySelectorAll('li'), { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, delay: 0.2, duration: 0.5, ease: 'power3.out' });
  }
}

function closeMenu() {
  if (!menu || !menuOpen) return;
  menuOpen = false;
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open menu');
  document.body.classList.remove('menu-open');
  lenis?.start();
  if (reduceMotion) {
    menu.hidden = true;
    return;
  }
  gsap.to(menu, {
    clipPath: 'circle(0% at 100% 0%)',
    duration: 0.45,
    ease: 'power3.in',
    onComplete: () => (menu.hidden = true),
  });
}

toggle?.addEventListener('click', () => (menuOpen ? closeMenu() : openMenu()));
document.addEventListener('keydown', (e) => e.key === 'Escape' && closeMenu());
menu?.querySelectorAll('[data-mobile-link]').forEach((a) => a.addEventListener('click', closeMenu));

// ---------- pointer niceties (desktop only) ----------
if (canHover && !reduceMotion) {
  // Magnetic pull toward the cursor, springing back on leave.
  document.querySelectorAll('[data-magnetic]').forEach((el) => {
    const x = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' });
    const y = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' });
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      x((e.clientX - r.left - r.width / 2) * 0.3);
      y((e.clientY - r.top - r.height / 2) * 0.3);
    });
    el.addEventListener('mouseleave', () => {
      x(0);
      y(0);
    });
  });

  // Spotlight: CSS reads --mx/--my for a radial highlight following the cursor.
  document.querySelectorAll('[data-spotlight]').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });
}
