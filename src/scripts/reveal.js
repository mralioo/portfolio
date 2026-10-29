// Scroll-triggered fade/slide-in for elements marked `.reveal`.
const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }
  },
  // threshold 0 + a bottom inset: a ratio threshold never fires for elements
  // much taller than the viewport (e.g. a whole blog article).
  { threshold: 0, rootMargin: '0px 0px -12% 0px' }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
