// ─── NAV scroll effect ────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.style.background = window.scrollY > 40
    ? 'rgba(13,15,20,0.97)'
    : 'rgba(13,15,20,0.85)';
}, { passive: true });

// ─── Reveal on scroll ─────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      // stagger children inside grids
      const delay = e.target.closest('.projects-grid, .achievements, .skills-grid')
        ? [...e.target.parentElement.children].indexOf(e.target) * 80
        : 0;
      setTimeout(() => e.target.classList.add('visible'), delay);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => io.observe(el));

// ─── Active nav link ──────────────────────────────────────
const sections = document.querySelectorAll('.section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => sectionObserver.observe(s));

// ─── Project card → open GitHub on card click ────────────
document.querySelectorAll('.project-card[data-href]').forEach(card => {
  card.addEventListener('click', (e) => {
    if (e.target.closest('a')) return; // don't intercept link clicks
    window.open(card.dataset.href, '_blank', 'noopener');
  });
});
