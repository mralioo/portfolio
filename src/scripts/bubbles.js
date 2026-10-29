// Floating bubble nav: gentle drift + cursor repulsion (plain rAF physics),
// click/tap to morph a bubble into a content panel (GSAP FLIP-style tween).
import { gsap } from 'gsap';

const field = document.querySelector('[data-bubble-field]');
if (field) {
  const backdrop = document.querySelector('[data-bubble-backdrop]');
  const overlay = document.querySelector('[data-bubble-overlay]');
  const content = document.querySelector('[data-bubble-content]');
  const closeEls = document.querySelectorAll('[data-bubble-close]');
  const bubbleEls = Array.from(field.querySelectorAll('.bubble'));
  const panels = Array.from(content.querySelectorAll('.bubble-panel'));

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = window.matchMedia('(hover: hover)').matches;

  const SIZES = [172, 148, 190, 138, 162, 130];

  const bubbles = bubbleEls.map((el, i) => {
    const size = SIZES[i % SIZES.length];
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
    return {
      el,
      id: el.dataset.bubble,
      size,
      x: 0,
      y: 0,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      hovered: false,
      paused: false,
    };
  });

  function placeInitial() {
    const rect = field.getBoundingClientRect();
    for (const b of bubbles) {
      let tries = 0;
      let x, y, ok;
      do {
        x = b.size / 2 + Math.random() * (rect.width - b.size);
        y = b.size / 2 + Math.random() * (rect.height - b.size);
        ok = bubbles.every((other) => {
          if (other === b || other.x === 0) return true;
          const dx = other.x - x;
          const dy = other.y - y;
          return Math.hypot(dx, dy) > (other.size + b.size) / 2 + 12;
        });
        tries++;
      } while (!ok && tries < 30);
      b.x = x;
      b.y = y;
    }
  }

  const pointer = { x: null, y: null, active: false };

  if (canHover) {
    field.addEventListener('mousemove', (e) => {
      const rect = field.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    });
    field.addEventListener('mouseleave', () => {
      pointer.active = false;
    });
  }

  const REPEL_RADIUS = 130;

  function step() {
    const rect = field.getBoundingClientRect();

    for (const b of bubbles) {
      if (b.paused) continue;

      // tiny random drift impulse
      if (Math.random() < 0.015) {
        b.vx += (Math.random() - 0.5) * 0.3;
        b.vy += (Math.random() - 0.5) * 0.3;
      }

      // cursor repulsion
      let isHovered = false;
      if (pointer.active) {
        const dx = b.x - pointer.x;
        const dy = b.y - pointer.y;
        const dist = Math.hypot(dx, dy);
        if (dist < REPEL_RADIUS) {
          const force = (REPEL_RADIUS - dist) / REPEL_RADIUS;
          b.vx += (dx / (dist || 1)) * force * 0.9;
          b.vy += (dy / (dist || 1)) * force * 0.9;
        }
        if (dist < b.size / 2 + 10) isHovered = true;
      }
      if (isHovered !== b.hovered) {
        b.hovered = isHovered;
        b.el.classList.toggle('is-hover', isHovered);
      }

      // gentle mutual separation
      for (const other of bubbles) {
        if (other === b) continue;
        const dx = b.x - other.x;
        const dy = b.y - other.y;
        const dist = Math.hypot(dx, dy);
        const minDist = (b.size + other.size) / 2;
        if (dist < minDist && dist > 0) {
          const push = (minDist - dist) / minDist;
          b.vx += (dx / dist) * push * 0.15;
          b.vy += (dy / dist) * push * 0.15;
        }
      }

      // damping + speed clamp
      b.vx *= 0.97;
      b.vy *= 0.97;
      const speed = Math.hypot(b.vx, b.vy);
      const maxSpeed = 1.6;
      if (speed > maxSpeed) {
        b.vx = (b.vx / speed) * maxSpeed;
        b.vy = (b.vy / speed) * maxSpeed;
      }

      b.x += b.vx;
      b.y += b.vy;

      // bounce off walls
      const r = b.size / 2;
      if (b.x < r) { b.x = r; b.vx *= -0.7; }
      if (b.x > rect.width - r) { b.x = rect.width - r; b.vx *= -0.7; }
      if (b.y < r) { b.y = r; b.vy *= -0.7; }
      if (b.y > rect.height - r) { b.y = rect.height - r; b.vy *= -0.7; }

      const scale = b.hovered ? 1.1 : 1;
      b.el.style.transform = `translate3d(${b.x - r}px, ${b.y - r}px, 0) scale(${scale})`;
    }

    rafId = requestAnimationFrame(step);
  }

  let rafId = null;

  if (prefersReducedMotion) {
    field.classList.add('static-layout');
  } else {
    placeInitial();
    rafId = requestAnimationFrame(step);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (rafId) cancelAnimationFrame(rafId);
      } else {
        rafId = requestAnimationFrame(step);
      }
    });
  }

  // entrance animation
  gsap.from(bubbleEls, {
    opacity: 0,
    scale: 0.4,
    duration: 0.7,
    stagger: 0.08,
    ease: 'back.out(1.7)',
    delay: 0.2,
  });

  // ---------- expand / collapse ----------
  let activeBubble = null;
  let lastFocused = null;
  // Blocks a new open/close from starting while one is still animating —
  // simpler and safer than trying to cancel/overwrite in-flight GSAP tweens,
  // which otherwise risks a stale onComplete (from a closes's tween) firing
  // after a newer open has already taken over the same overlay element.
  let isTransitioning = false;

  function targetRect() {
    const w = Math.min(window.innerWidth * 0.92, 640);
    const h = Math.min(window.innerHeight * 0.82, 620);
    return {
      width: w,
      height: h,
      left: (window.innerWidth - w) / 2,
      top: (window.innerHeight - h) / 2,
    };
  }

  function showPanel(id) {
    for (const p of panels) {
      p.classList.toggle('is-active', p.dataset.panel === id);
    }
  }

  function openBubble(bubble) {
    if (activeBubble || isTransitioning) return;
    activeBubble = bubble;
    isTransitioning = true;
    lastFocused = document.activeElement;
    bubble.paused = true;

    // Compute both rects and show the panel BEFORE locking body scroll —
    // hiding the scrollbar shifts window.innerWidth on desktop browsers,
    // which would throw off the centering math below.
    const startRect = bubble.el.getBoundingClientRect();
    const target = targetRect();
    showPanel(bubble.id);
    content.classList.remove('is-visible');

    overlay.hidden = false;
    backdrop.hidden = false;
    overlay.classList.add('is-morphing');
    document.body.style.overflow = 'hidden';

    gsap.set(overlay, {
      position: 'fixed',
      left: startRect.left,
      top: startRect.top,
      width: startRect.width,
      height: startRect.height,
      borderRadius: '50%',
      opacity: 1,
    });
    gsap.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.25 });
    gsap.to(bubble.el, { opacity: 0, duration: 0.2 });

    gsap.to(overlay, {
      left: target.left,
      top: target.top,
      width: target.width,
      height: target.height,
      borderRadius: 24,
      duration: 0.55,
      ease: 'power3.out',
      onComplete() {
        // Only reveal text once the box has settled at full size — the
        // panel is never visible at an in-between (clipped) size.
        overlay.classList.remove('is-morphing');
        content.classList.add('is-visible');
        isTransitioning = false;
        const closeBtn = overlay.querySelector('[data-bubble-close]');
        if (closeBtn) closeBtn.focus();
      },
    });
  }

  function closeBubble() {
    if (!activeBubble || isTransitioning) return;
    const bubble = activeBubble;
    activeBubble = null;
    isTransitioning = true;

    const rect = bubble.el.getBoundingClientRect();
    content.classList.remove('is-visible');
    overlay.classList.add('is-morphing');

    gsap.to(overlay, {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
      borderRadius: '50%',
      opacity: 0.4,
      duration: 0.4,
      ease: 'power3.in',
      onComplete() {
        overlay.hidden = true;
        overlay.classList.remove('is-morphing');
        overlay.removeAttribute('style');
        isTransitioning = false;
      },
    });
    gsap.to(backdrop, {
      opacity: 0,
      duration: 0.3,
      onComplete() {
        backdrop.hidden = true;
      },
    });
    gsap.to(bubble.el, { opacity: 1, duration: 0.3 });

    document.body.style.overflow = '';
    bubble.paused = false;
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  for (const bubble of bubbles) {
    bubble.el.addEventListener('click', () => openBubble(bubble));
  }

  closeEls.forEach((el) => {
    el.addEventListener('click', () => closeBubble());
  });
  backdrop.addEventListener('click', () => closeBubble());
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeBubble();
  });
}
