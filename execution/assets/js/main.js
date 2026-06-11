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

// ═══ GALLERY DATA ═══
// Replace Unsplash URLs with your own photos as you add them.
// Your real photo (hero-bg.jpg) is first — add more by pushing to this array.
const galleryImages = [
  { src: 'assets/images/hero-bg.jpg',
    alt: 'Pool enclosure installed by Native Screens in South Florida' },
  { src: 'https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800&h=450&fit=crop&q=80',
    alt: 'Screen enclosure project — Broward County, FL' },
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=450&fit=crop&q=80',
    alt: 'Patio screen enclosure — South Florida' },
  { src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=450&fit=crop&q=80',
    alt: 'Pool area with enclosure — Fort Lauderdale' },
  { src: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=450&fit=crop&q=80',
    alt: 'Aluminum roof installation — Broward County' },
  { src: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=450&fit=crop&q=80',
    alt: 'Luxury pool enclosure — South Florida' },
  { src: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&h=450&fit=crop&q=80',
    alt: 'Screen room enclosure — Hollywood FL' },
  { src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=450&fit=crop&q=80',
    alt: 'Residential enclosure project — Pembroke Pines' },
  { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=450&fit=crop&q=80',
    alt: 'Outdoor living space with screen enclosure' },
  { src: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=450&fit=crop&q=80',
    alt: 'Home with pool enclosure — Coral Springs FL' },
];

// ═══ BUILD DESKTOP 3D GALLERY ═══
function buildDesktopGallery() {
  const container  = document.getElementById('portfolioDesktop');
  if (!container) return;
  const total      = galleryImages.length;
  const middle     = Math.floor(total / 2);

  galleryImages.forEach((img, i) => {
    const dist    = Math.abs(i - middle);
    const yOffset = -(120 - dist * 20);   // peak in centre, drop to edges

    const card = document.createElement('div');
    card.className = 'portfolio-card';
    card.style.setProperty('--y-offset', yOffset + 'px');
    card.style.zIndex = total - i;

    const inner = document.createElement('div');
    inner.className = 'portfolio-card-inner';

    const image = document.createElement('img');
    image.src     = img.src;
    image.alt     = img.alt;
    image.loading = 'lazy';
    image.decoding = 'async';

    inner.appendChild(image);
    card.appendChild(inner);

    // Hover: lift this card, drop others
    card.addEventListener('mouseenter', () => {
      container.querySelectorAll('.portfolio-card').forEach(c => {
        c.style.transform = `perspective(5000px) rotateY(-45deg) translateY(0px)`;
      });
      card.style.transform = `perspective(5000px) rotateY(-45deg) translateY(-140px)`;
    });
    card.addEventListener('mouseleave', () => {
      container.querySelectorAll('.portfolio-card').forEach((c, j) => {
        const d = Math.abs(j - middle);
        const y = -(120 - d * 20);
        c.style.transform = `perspective(5000px) rotateY(-45deg) translateY(${y}px)`;
      });
    });

    card.addEventListener('click', () => openLightboxImg(img.src, img.alt));
    container.appendChild(card);
  });
}

// ═══ BUILD MOBILE MARQUEE ═══
function buildMobileMarquee() {
  const track = document.getElementById('marqueeTrack');
  if (!track) return;
  // Duplicate for seamless loop
  [...galleryImages, ...galleryImages].forEach(img => {
    const card = document.createElement('div');
    card.className = 'marquee-card';

    const image = document.createElement('img');
    image.src      = img.src;
    image.alt      = img.alt;
    image.loading  = 'lazy';
    image.decoding = 'async';

    card.appendChild(image);
    card.addEventListener('click', () => openLightboxImg(img.src, img.alt));
    track.appendChild(card);
  });
}

buildDesktopGallery();
buildMobileMarquee();

// ═══ LIGHTBOX ═══
function openLightboxImg(src, alt) {
  document.getElementById('lightboxImg').src = src;
  document.getElementById('lightboxImg').alt = alt;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

// Legacy support for any remaining onclick="openLightbox(this)"
function openLightbox(el) {
  const img = el.tagName === 'IMG' ? el : el.querySelector('img');
  if (!img) return;
  openLightboxImg(img.src, img.alt);
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
