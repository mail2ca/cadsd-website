// ── DSD & Co. | Premium JS ───────────────────────────────────

// ── Scroll progress bar ──────────────────────────────────────
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.prepend(progressBar);
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  progressBar.style.width = pct + '%';
});

// ── Navbar scroll effect ─────────────────────────────────────
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Mobile nav toggle ────────────────────────────────────────
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (toggle) toggle.addEventListener('click', () => navLinks.classList.toggle('open'));

// ── Active nav link ──────────────────────────────────────────
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  if (a.getAttribute('href') === currentPage) a.classList.add('active');
});

// ── Scroll reveal (reveal, reveal-left, reveal-right, cascade)
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .cascade').forEach(el => {
  revealObserver.observe(el);
});

// ── Counter animation ────────────────────────────────────────
function animateCounter(el, target, suffix = '') {
  let start = 0;
  const duration = 1800;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target + suffix;
  };
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting && !e.target.dataset.counted) {
      e.target.dataset.counted = true;
      const target = parseInt(e.target.dataset.target);
      const suffix = e.target.dataset.suffix || '';
      animateCounter(e.target, target, suffix);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

// ── Back to top ──────────────────────────────────────────────
const backTop = document.createElement('button');
backTop.className = 'back-top';
backTop.innerHTML = '↑';
backTop.title = 'Back to top';
document.body.appendChild(backTop);
window.addEventListener('scroll', () => {
  backTop.classList.toggle('visible', window.scrollY > 400);
});
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ── Smooth hover tilt on partner cards ──────────────────────
document.querySelectorAll('.partner-card, .service-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-6px) rotateX(${-y*4}deg) rotateY(${x*4}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ── Contact form ─────────────────────────────────────────────
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit span') || form.querySelector('.btn-submit');
    if (btn) { btn.textContent = 'Enquiry Submitted ✓'; }
    const submit = form.querySelector('.btn-submit');
    if (submit) { submit.style.background = '#0f9d8e'; }
    setTimeout(() => {
      if (btn) btn.textContent = 'Submit Enquiry';
      if (submit) submit.style.background = '';
    }, 3500);
  });
}

// ── Particle creation (hero) ─────────────────────────────────
const particlesContainer = document.querySelector('.particles');
if (particlesContainer) {
  for (let i = 0; i < 6; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    particlesContainer.appendChild(p);
  }
}
