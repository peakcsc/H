// Native Screens — Main JS

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Lightbox
function openLightbox(el) {
  const img = el.querySelector('img');
  if (!img) return; // placeholder — no image yet
  document.getElementById('lightboxImg').src = img.src;
  document.getElementById('lightboxImg').alt = img.alt;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

// Contact form — simple mailto fallback (replace with Netlify Forms or Formspree)
function handleSubmit(e) {
  e.preventDefault();
  const name    = document.getElementById('name').value.trim();
  const phone   = document.getElementById('phone').value.trim();
  const service = document.getElementById('service').value;
  const message = document.getElementById('message').value.trim();

  const subject = encodeURIComponent(`Website Inquiry — ${service || 'General'}`);
  const body    = encodeURIComponent(
    `Name: ${name}\nPhone: ${phone}\nService: ${service}\nMessage: ${message}\n\n(Sent from nativescreens.com)`
  );

  // Opens email client as fallback — swap for Netlify Forms or Formspree in production
  window.location.href = `mailto:peakcsc@gmail.com?subject=${subject}&body=${body}`;

  e.target.reset();
  alert('Thank you! We\'ll be in touch within 1 business day.');
}

// Smooth scroll offset for sticky header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
