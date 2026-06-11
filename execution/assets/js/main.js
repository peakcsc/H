// Native Screens — Main JS

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Lightbox
function openLightbox(el) {
  const img = el.tagName === 'IMG' ? el : el.querySelector('img');
  if (!img) return;
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

// Contact form
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
  window.location.href = `mailto:peakcsc@gmail.com?subject=${subject}&body=${body}`;
  e.target.reset();
  alert("Thank you! We'll be in touch within 1 business day.");
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
