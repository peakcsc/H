// Native Screens — Main JS

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Hero video — 2× speed, works on iOS
const heroVideo = document.getElementById('heroVideo');
if (heroVideo) {
  const setSpeed = () => { heroVideo.playbackRate = 2.0; };
  heroVideo.addEventListener('loadedmetadata', setSpeed);
  heroVideo.addEventListener('play', setSpeed);
  setSpeed();
}

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
  { src: 'assets/images/service-super-gutter.jpg',
    alt: 'Aluminum roof patio — Native Screens South Florida' },
  { src: 'assets/images/gallery-work-1.jpg',
    alt: 'Pool enclosure installation in progress — Native Screens' },
  { src: 'assets/images/gallery-arch-1.jpg',
    alt: 'Custom arch screen enclosure — Native Screens Broward County' },
  { src: 'assets/images/gallery-screen-1.jpg',
    alt: 'Screen room addition — Native Screens South Florida' },
  { src: 'assets/images/gallery-arch-2.jpg',
    alt: 'Brick arch screen enclosure with door — Native Screens' },
  { src: 'assets/images/gallery-p1.jpg',
    alt: 'Screen enclosure project — Native Screens' },
  { src: 'assets/images/gallery-p2.jpg',
    alt: 'Aluminum patio cover installation — Native Screens' },
  { src: 'assets/images/gallery-p3.jpg',
    alt: 'Screen room installation — Native Screens South Florida' },
  { src: 'assets/images/gallery-p4.jpg',
    alt: 'Enclosure construction in progress — Native Screens' },
  { src: 'assets/images/gallery-p5.jpg',
    alt: 'Pool screen enclosure — Native Screens Broward' },
  { src: 'assets/images/gallery-p6.jpg',
    alt: 'Screen enclosure project — Native Screens South Florida' },
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
const WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/8k72YlRQYGqHlj2svRqj/webhook-trigger/f4792cd6-9221-49d4-b051-08e5f44db4f7';

async function handleSubmit(e) {
  e.preventDefault();
  const payload = {
    name:     document.getElementById('lf-name').value.trim(),
    phone:    document.getElementById('lf-phone').value.trim(),
    email:    document.getElementById('lf-email').value.trim(),
    address:  document.getElementById('lf-address').value.trim(),
    service:  document.getElementById('lf-service').value,
    timeline: document.getElementById('lf-timeline').value,
    message:  document.getElementById('lf-message').value.trim(),
    source:   'nativescreens.com',
  };
  try {
    const fd = new FormData();
    Object.entries(payload).forEach(([k, v]) => fd.append(k, v));
    navigator.sendBeacon(WEBHOOK_URL, fd);
  } catch (_) {}
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
