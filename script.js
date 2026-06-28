// Mobile nav toggle
const navBurger = document.getElementById('navBurger');
const nav = document.querySelector('.nav');

navBurger.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  navBurger.setAttribute('aria-expanded', isOpen);
});

// Close mobile nav when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navBurger.setAttribute('aria-expanded', false);
  });
});

// Scroll-triggered reveal for sections and cards
const revealTargets = document.querySelectorAll(
  '.skill-card, .timeline-item, .project-card, .edu-card, .contact-card, .about-text, .cert-row'
);

revealTargets.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = (i % 6) * 60;
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, delay);
      observer.unobserve(el);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealTargets.forEach(el => observer.observe(el));

// Safety net: if something never intersects (e.g. very short viewport,
// reduced-motion edge cases, or fast programmatic navigation), reveal
// everything after a short delay so content is never stuck invisible.
setTimeout(() => {
  revealTargets.forEach(el => {
    if (el.style.opacity === '0') {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }
  });
}, 2500);

// Respect reduced motion preference: skip animation setup entirely
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  revealTargets.forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
    el.style.transition = 'none';
  });
}

// Active nav link highlight on scroll
const sections = document.querySelectorAll('main .section, .hero');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--accent)' : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });

sections.forEach(section => sectionObserver.observe(section));
