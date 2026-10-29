// Picks which avatar look ("persona") to show for what the visitor is
// reading, and swaps every [data-persona-avatar] to it.
//
// Precedence, top to bottom:
//   1. an interactive block in view that reports its own persona
//      ([data-persona-source], e.g. the active lifecycle stage or tech tab)
//   2. the section in view ([data-section][data-persona])
//   3. the first persona (the original photo)
const avatars = Array.from(document.querySelectorAll('[data-persona-avatar]'));
const labelEl = document.querySelector('[data-persona-text]');
const sections = Array.from(document.querySelectorAll('[data-section]'));
const sources = Array.from(document.querySelectorAll('[data-persona-source]'));

if (avatars.length && avatars[0].querySelectorAll('[data-persona-id]').length > 1) {
  let current = avatars[0].querySelector('.is-on')?.dataset.personaId;

  const inView = (el, line) => {
    const r = el.getBoundingClientRect();
    return r.top <= line && r.bottom >= line;
  };

  function pick() {
    const line = window.innerHeight * 0.45;
    const source = sources.find((s) => s.dataset.persona && inView(s, line));
    if (source) return source.dataset.persona;
    let section = null;
    for (const s of sections) if (s.getBoundingClientRect().top <= window.innerHeight * 0.35) section = s;
    return section?.dataset.persona || null;
  }

  function show(id) {
    if (!id || id === current) return;
    let label = '';
    for (const av of avatars) {
      const next = av.querySelector(`[data-persona-id="${CSS.escape(id)}"]`);
      if (!next) return; // unknown id (typo in content): keep the current look
      const prev = av.querySelector('.persona-img.is-on');
      prev?.classList.remove('is-on');
      prev?.classList.add('is-leaving');
      setTimeout(() => prev?.classList.remove('is-leaving'), 650);
      next.classList.add('is-on');
      label = next.dataset.personaLabel;
      av.classList.remove('is-swapping');
      void av.offsetWidth; // restart the pop animation
      av.classList.add('is-swapping');
    }
    if (labelEl) {
      labelEl.classList.remove('is-in');
      void labelEl.offsetWidth;
      labelEl.textContent = label;
      labelEl.classList.add('is-in');
    }
    current = id;
  }

  // keep the first change from waiting on a scroll
  const first = avatars[0].querySelector('.is-on');
  if (labelEl && first) labelEl.textContent = first.dataset.personaLabel;

  let ticking = false;
  const update = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      show(pick());
    });
  };
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  // interactive blocks announce a change of their own persona
  document.addEventListener('persona:hint', update);
  update();

  // phones: the sidebar scrolls away, so a floating mini avatar takes over
  const main = document.querySelector('.persona-avatar.is-sidebar');
  const float = document.querySelector('.persona-avatar.is-float');
  if (main && float) {
    new IntersectionObserver(([e]) => float.classList.toggle('is-visible', !e.isIntersecting)).observe(main);
  }
}
