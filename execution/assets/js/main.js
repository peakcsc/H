// Native Screens — Main JS

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Videos — 2× speed, works on iOS (must set after loadedmetadata)
['heroVideo', 'secondVideo'].forEach(id => {
  const v = document.getElementById(id);
  if (!v) return;
  const setSpeed = () => { v.playbackRate = 2.0; };
  v.addEventListener('loadedmetadata', setSpeed);
  v.addEventListener('play', setSpeed);
  setSpeed();
});

// Mobile nav toggle
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

// ═══ GALLERY — Auto Slider ═══
// Add your real photos here. hero-bg.jpg is your first real photo.
const galleryImages = [
  { src: 'assets/images/gallery-pool-enclosure-2.jpg',
    alt: 'Pool enclosure by Native Screens — South Florida' },
  { src: 'assets/images/hero-bg.jpg',
    alt: 'Screen enclosure project by Native Screens — Broward County' },
  { src: 'assets/images/gallery-pool-3.jpg',
    alt: 'Luxury pool enclosure — Native Screens' },
  { src: 'assets/images/gallery-pool-4.jpg',
    alt: 'Pool enclosure with fire pit — Native Screens' },
  { src: 'assets/images/gallery-pool-5.jpg',
    alt: 'Screen enclosure — Native Screens South Florida' },
];

function buildSlider() {
  const track = document.getElementById('sliderTrack');
  if (!track) return;
  // Duplicate for seamless infinite loop
  [...galleryImages, ...galleryImages].forEach(img => {
    const item = document.createElement('div');
    item.className = 'slide-item';
    const image = document.createElement('img');
    image.src      = img.src;
    image.alt      = img.alt;
    image.loading  = 'lazy';
    image.decoding = 'async';
    item.appendChild(image);
    item.addEventListener('click', () => openLightboxImg(img.src, img.alt));
    track.appendChild(item);
  });
}

buildSlider();

// Pause slider on touch devices
const sliderTrack = document.getElementById('sliderTrack');
if (sliderTrack) {
  sliderTrack.addEventListener('touchstart', () => sliderTrack.style.animationPlayState = 'paused', { passive: true });
  sliderTrack.addEventListener('touchend',   () => sliderTrack.style.animationPlayState = 'running', { passive: true });
}

// ═══ LIGHTBOX ═══
function openLightboxImg(src, alt) {
  document.getElementById('lightboxImg').src = src;
  document.getElementById('lightboxImg').alt = alt;
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

// ═══ CONTACT FORM ═══
function handleSubmit(e) {
  e.preventDefault();
  const address  = document.getElementById('address').value.trim();
  const phone    = document.getElementById('phone').value.trim();
  const email    = document.getElementById('email').value.trim();
  const status   = document.getElementById('status').value;
  const value    = document.getElementById('value').value;
  const timeline = document.getElementById('timeline').value;
  const subject  = encodeURIComponent('Free $2,500 Assessment Request — Native Screens');
  const body     = encodeURIComponent(
    `New assessment request from nativescreens.com:\n\n` +
    `Property Address: ${address}\n` +
    `Phone: ${phone}\n` +
    `Email: ${email}\n` +
    `Current Enclosure Status: ${status}\n` +
    `Property Value Range: ${value}\n` +
    `Timeline: ${timeline}\n`
  );
  window.location.href = `mailto:peakcsc@gmail.com?subject=${subject}&body=${body}`;
  e.target.reset();
  alert("Thank you! We'll call to schedule your free assessment within 1 business day.");
}

// ═══ SMOOTH SCROLL ═══
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
