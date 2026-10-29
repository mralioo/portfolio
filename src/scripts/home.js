// Homepage-only motion: hero intro, split-text headings, pinned horizontal
// lifecycle scroll, timeline draw, counters, progress bars, robot arm, and
// active-section tracking for the nav + section index.
// Everything is skipped under prefers-reduced-motion — content is already
// visible in its final state by default.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Wraps each character (or word) of an element's text nodes in masked spans
// so they can slide up from behind a clip. Keeps child elements (e.g. the
// kicker) intact and screen-reader text unchanged via aria-label.
function split(el, mode) {
  el.setAttribute('aria-label', el.textContent.trim().replace(/\s+/g, ' '));
  const pieces = [];
  for (const node of Array.from(el.childNodes)) {
    if (node.nodeType !== Node.TEXT_NODE || !node.textContent.trim()) continue;
    // one wrapper per text node, so flex parents (h2) see a single item
    const frag = document.createElement('span');
    const tokens = node.textContent.split(/(\s+)/);
    for (const token of tokens) {
      if (!token) continue;
      if (/^\s+$/.test(token)) {
        frag.append(' ');
        continue;
      }
      const word = document.createElement('span');
      word.className = 'split-word';
      word.setAttribute('aria-hidden', 'true');
      const units = mode === 'chars' ? Array.from(token) : [token];
      for (const u of units) {
        const inner = document.createElement('span');
        inner.className = 'split-inner';
        inner.textContent = u;
        word.append(inner);
        pieces.push(inner);
      }
      frag.append(word);
    }
    node.replaceWith(frag);
  }
  return pieces;
}

if (!reduceMotion) {
  // ---------- pinned horizontal POC → Production scroll (desktop) ----------
  // Created first: ScrollTriggers set up before a pin don't account for the
  // pin's spacer, so everything further down the page would fire too early.
  const mm = gsap.matchMedia();
  mm.add('(min-width: 900px)', () => {
    const wrapper = document.querySelector('[data-hscroll]');
    const track = document.querySelector('[data-hscroll-track]');
    const bar = document.querySelector('[data-hscroll-progress]');
    if (!wrapper || !track) return;
    const distance = () => Math.max(0, track.scrollWidth - track.parentElement.clientWidth);
    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: wrapper,
        start: 'top top',
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
        onUpdate: (self) => bar && (bar.style.transform = `scaleX(${self.progress})`),
      },
    });
    // Each stage card lifts in as it slides into view.
    track.querySelectorAll('.stage-card').forEach((card) => {
      gsap.from(card, {
        opacity: 0.25,
        y: 40,
        scrollTrigger: { trigger: card, containerAnimation: tween, start: 'left 90%', end: 'left 55%', scrub: true },
      });
    });
  });
}

// ---------- hero ----------
const title = document.querySelector('[data-hero-title]');
const rotator = document.querySelector('[data-rotator]');

if (title && !reduceMotion) {
  const chars = split(title, 'chars');
  title.classList.add('is-split');
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  tl.from(chars, { yPercent: 115, rotate: 6, duration: 1.2, stagger: 0.035 })
    .from('[data-hero-fade]', { y: 24, opacity: 0, duration: 0.9, stagger: 0.1 }, '-=0.9')
    .from('[data-hero-graph] .node, [data-hero-graph] .hub, [data-hero-graph] .hub-label', {
      scale: 0, opacity: 0, transformOrigin: 'center', duration: 0.8, stagger: 0.07, ease: 'back.out(1.8)',
    }, '-=0.8')
    .from('[data-hero-graph] .edge', { strokeDashoffset: 200, opacity: 0, duration: 1, stagger: 0.06 }, '-=0.7');

  // Hero content drifts up and fades as you scroll away.
  gsap.to('.hero-inner', {
    yPercent: -12,
    opacity: 0.2,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  });

  // Glow follows the cursor across the hero.
  const glow = document.querySelector('[data-hero-glow]');
  const hero = document.querySelector('.hero');
  if (glow && window.matchMedia('(hover: hover)').matches) {
    const gx = gsap.quickTo(glow, 'x', { duration: 1.2, ease: 'power3.out' });
    const gy = gsap.quickTo(glow, 'y', { duration: 1.2, ease: 'power3.out' });
    hero.addEventListener('mousemove', (e) => {
      const r = hero.getBoundingClientRect();
      gx(e.clientX - r.left - r.width / 2);
      gy(e.clientY - r.top - r.height / 2);
    });
  }
}

if (rotator) {
  const words = Array.from(rotator.children);
  let i = 0;
  if (!reduceMotion && words.length > 1) {
    setInterval(() => {
      const current = words[i];
      i = (i + 1) % words.length;
      const next = words[i];
      gsap.to(current, { yPercent: -100, opacity: 0, duration: 0.6, ease: 'power3.in', onComplete: () => current.classList.remove('is-active') });
      next.classList.add('is-active');
      gsap.fromTo(next, { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.7, delay: 0.35, ease: 'power3.out' });
    }, 2600);
  }
}

// ---------- active section → nav + section index ----------
const navLinks = document.querySelectorAll('[data-nav-link]');
const indexLinks = document.querySelectorAll('[data-index-link]');
const sectionIndex = document.querySelector('[data-section-index]');

function setActive(id) {
  navLinks.forEach((a) => a.classList.toggle('active', a.dataset.navLink === id));
  indexLinks.forEach((a) => a.classList.toggle('active', a.dataset.indexLink === id));
  // The index only appears once you've scrolled past the hero.
  sectionIndex?.classList.toggle('is-visible', Boolean(id));
}

document.querySelectorAll('[data-section]').forEach((section) => {
  ScrollTrigger.create({
    trigger: section,
    start: 'top 50%',
    end: 'bottom 50%',
    onToggle: (self) => self.isActive && setActive(section.id),
  });
});
ScrollTrigger.create({
  trigger: '.hero',
  start: 'top top',
  end: 'bottom 50%',
  onEnterBack: () => setActive(null),
});

if (!reduceMotion) {
  // ---------- split headings ----------
  document.querySelectorAll('[data-split]').forEach((h) => {
    const words = split(h, 'words');
    gsap.from(words, {
      yPercent: 110,
      duration: 1,
      stagger: 0.08,
      ease: 'expo.out',
      scrollTrigger: { trigger: h, start: 'top 85%' },
    });
  });

  // ---------- counters ----------
  document.querySelectorAll('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count);
    const obj = { v: 0 };
    el.textContent = '0';
    gsap.to(obj, {
      v: target,
      duration: 1.6,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 90%' },
      onUpdate: () => (el.textContent = Math.round(obj.v)),
    });
  });

  // ---------- course progress bars ----------
  document.querySelectorAll('[data-progress]').forEach((bar) => {
    gsap.from(bar, {
      scaleX: 0,
      duration: 1.4,
      ease: 'expo.out',
      scrollTrigger: { trigger: bar, start: 'top 92%' },
    });
  });

  // ---------- experience timeline draws as you read ----------
  const fill = document.querySelector('[data-timeline-fill]');
  if (fill) {
    gsap.fromTo(fill, { scaleY: 0 }, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: { trigger: '[data-timeline]', start: 'top 70%', end: 'bottom 60%', scrub: true },
    });
  }

  // ---------- robot arm idles through a pick motion ----------
  const arm = document.querySelector('[data-arm]');
  if (arm) {
    const tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { duration: 1.6, ease: 'sine.inOut' } });
    tl.to(arm.querySelector('.arm-seg1'), { rotate: -14, svgOrigin: '80 150' }, 0)
      .to(arm.querySelector('.arm-seg2'), { rotate: 22, svgOrigin: '80 90' }, 0)
      .to(arm.querySelector('.arm-seg3'), { rotate: -28, svgOrigin: '140 70' }, 0);
    ScrollTrigger.create({ trigger: arm, onToggle: (self) => (self.isActive ? tl.play() : tl.pause()) });
  }

  // Fonts/images change layout heights; recompute trigger positions.
  window.addEventListener('load', () => ScrollTrigger.refresh());
}
