// ── DSD & Co. | Main JS ──────────────────────────────────────

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (toggle) {
  toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
}

// Active nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  if (a.getAttribute('href') === currentPage) a.classList.add('active');
});

// Contact form handler
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');
    btn.textContent = 'Enquiry Submitted!';
    btn.style.background = '#0f8c6e';
    setTimeout(() => { btn.textContent = 'Submit Enquiry'; btn.style.background = ''; }, 3000);
  });
}

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('fade-up'); observer.unobserve(e.target); }});
}, { threshold: 0.1 });
document.querySelectorAll('.service-card, .partner-card, .why-card').forEach(el => {
  el.style.opacity = '0';
  observer.observe(el);
});
