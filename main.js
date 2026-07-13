/**
 * MILAN RESTAURANT — Main JavaScript
 * Premium Japanese-Inspired Indian & Nepalese Restaurant · Saitama
 * ================================================================
 * Sections:
 *  1. Utilities
 *  2. Page Loader
 *  3. Sticky Header
 *  4. Mobile Nav
 *  5. Scroll Animations (IntersectionObserver)
 *  6. Back to Top
 *  7. Gallery Lightbox
 *  8. Reviews Carousel
 *  9. Menu Tabs
 * 10. Scroll Spy (active nav links)
 * 11. Smooth Anchor Scroll
 * 12. Contact Form Validation
 * 13. Counter Animation
 * 14. Init
 */

'use strict';

/* ============================================================
   1. UTILITIES
   ============================================================ */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ============================================================
   2. PAGE LOADER
   ============================================================ */
function initLoader() {
  const loader = $('.page-loader');
  if (!loader) return;

  const hide = () => loader.classList.add('is-hidden');

  if (document.readyState === 'complete') {
    setTimeout(hide, 900);
  } else {
    window.addEventListener('load', () => setTimeout(hide, 900));
  }
  // Safety fallback
  setTimeout(hide, 3000);
}

/* ============================================================
   3. STICKY HEADER
   ============================================================ */
function initStickyHeader() {
  const header = $('.site-header');
  if (!header) return;

  const THRESHOLD = 80;
  const toggle = () => header.classList.toggle('is-scrolled', window.scrollY > THRESHOLD);
  window.addEventListener('scroll', toggle, { passive: true });
  toggle();
}

/* ============================================================
   4. MOBILE NAV
   ============================================================ */
function initMobileNav() {
  const toggle    = $('#nav-toggle');
  const mobileNav = $('#mobile-nav');
  if (!toggle || !mobileNav) return;

  const open  = () => { toggle.classList.add('is-open'); mobileNav.classList.add('is-open'); document.body.style.overflow = 'hidden'; toggle.setAttribute('aria-expanded','true'); };
  const close = () => { toggle.classList.remove('is-open'); mobileNav.classList.remove('is-open'); document.body.style.overflow = ''; toggle.setAttribute('aria-expanded','false'); };

  toggle.addEventListener('click', () => toggle.classList.contains('is-open') ? close() : open());

  // Close on nav link click
  $$('.mobile-nav__link, .mobile-nav .btn', mobileNav).forEach(el => el.addEventListener('click', close));

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!mobileNav.contains(e.target) && !toggle.contains(e.target)) close();
  });

  // Close on ESC
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
}

/* ============================================================
   5. SCROLL ANIMATIONS (IntersectionObserver)
   ============================================================ */
function initScrollAnimations() {
  const els = $$('.anim-fade-up, .anim-fade-left, .anim-fade-right, .anim-scale-in');
  if (!els.length || !('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.10, rootMargin: '0px 0px -32px 0px' });

  els.forEach(el => observer.observe(el));
}

/* ============================================================
   6. BACK TO TOP
   ============================================================ */
function initBackToTop() {
  const btn = $('#back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('is-visible', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ============================================================
   7. GALLERY LIGHTBOX
   ============================================================ */
function initLightbox() {
  const lightbox = $('#lightbox');
  const lbImg    = $('#lightbox-img');
  const closeBtn = $('#lightbox-close');
  const prevBtn  = $('#lightbox-prev');
  const nextBtn  = $('#lightbox-next');
  if (!lightbox) return;

  const galleryImgs = $$('.gallery-item img');
  let currentIndex  = 0;

  const openAt = (idx) => {
    currentIndex = ((idx % galleryImgs.length) + galleryImgs.length) % galleryImgs.length;
    lbImg.src = galleryImgs[currentIndex].src;
    lbImg.alt = galleryImgs[currentIndex].alt;
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  const goNext = () => openAt(currentIndex + 1);
  const goPrev = () => openAt(currentIndex - 1);

  galleryImgs.forEach((img, i) => {
    img.closest('.gallery-item').addEventListener('click', () => openAt(i));
  });

  closeBtn?.addEventListener('click', close);
  prevBtn?.addEventListener('click', goPrev);
  nextBtn?.addEventListener('click', goNext);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape')     close();
    if (e.key === 'ArrowRight') goNext();
    if (e.key === 'ArrowLeft')  goPrev();
  });

  // Touch swipe for lightbox
  let startX = 0;
  lightbox.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  lightbox.addEventListener('touchend',   e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? goNext() : goPrev();
  });
}

/* ============================================================
   8. REVIEWS CAROUSEL
   ============================================================ */
function initCarousel() {
  const track = $('#reviews-track');
  if (!track) return;

  const cards  = $$('.review-card', track);
  const dots   = $$('.carousel-dot');
  const prevBtn = $('.carousel-btn--prev');
  const nextBtn = $('.carousel-btn--next');
  if (!cards.length) return;

  let current   = 0;
  let autoTimer = null;

  const getVisible = () => {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 992) return 2;
    return 3;
  };

  const maxIndex = () => Math.max(0, cards.length - getVisible());

  const goTo = (idx) => {
    current = Math.max(0, Math.min(idx, maxIndex()));
    const vis = getVisible();
    const cardW = (track.parentElement.offsetWidth + parseFloat(getComputedStyle(track).gap || 24)) / vis;
    track.style.transform = `translateX(-${current * cardW}px)`;
    dots.forEach((d, i) => d.classList.toggle('is-active', i === current));
  };

  const startAuto = () => {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(current >= maxIndex() ? 0 : current + 1), 4500);
  };

  dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); startAuto(); }));
  prevBtn?.addEventListener('click', () => { goTo(current - 1); startAuto(); });
  nextBtn?.addEventListener('click', () => { goTo(current + 1); startAuto(); });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => goTo(current), 150);
  }, { passive: true });

  // Swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; clearInterval(autoTimer); }, { passive: true });
  track.addEventListener('touchend',   e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 48) goTo(diff > 0 ? current + 1 : current - 1);
    startAuto();
  });

  goTo(0);
  startAuto();
}

/* ============================================================
   9. MENU TABS
   ============================================================ */
function initMenuTabs() {
  const tabs   = $$('.menu-tab');
  const panels = $$('.menu-section-panel');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t   => t.classList.remove('is-active'));
      panels.forEach(p => p.classList.remove('is-active'));
      tab.classList.add('is-active');
      const panel = $(`[data-panel="${target}"]`);
      if (panel) panel.classList.add('is-active');
    });
  });
}

/* ============================================================
   10. SCROLL SPY (active nav links)
   ============================================================ */
function initScrollSpy() {
  const sections = $$('section[id]');
  const navLinks = $$('.site-nav__link');
  if (!sections.length || !navLinks.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach(link => {
        const href = link.getAttribute('href') || '';
        link.classList.toggle('is-active', href === `#${id}` || href.endsWith(`#${id}`));
      });
    });
  }, { threshold: 0.35, rootMargin: '-80px 0px 0px 0px' });

  sections.forEach(s => observer.observe(s));
}

/* ============================================================
   11. SMOOTH ANCHOR SCROLL
   ============================================================ */
function initSmoothScroll() {
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 80;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ============================================================
   12. CONTACT FORM VALIDATION
   ============================================================ */
function initContactForm() {
  const form = $('form#contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    $$('[required]', form).forEach(field => {
      const isValid = field.value.trim().length > 0;
      field.style.borderColor = isValid ? '' : 'var(--c-red)';
      if (!isValid) valid = false;
    });

    if (!valid) return;

    // Show inline success (in production this submits to PHP)
    const successDiv = form.nextElementSibling;
    if (successDiv) {
      form.style.display = 'none';
      successDiv.style.display = 'block';
    }
  });

  // Clear error border on input
  $$('[required]', form).forEach(field => {
    field.addEventListener('input', () => { field.style.borderColor = ''; });
  });
}

/* ============================================================
   13. COUNTER ANIMATION
   ============================================================ */
function initCounters() {
  const nums = $$('.stat-item__number');
  if (!nums.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const end    = parseInt(el.dataset.count || '0');
      const suffix = el.dataset.suffix || '';
      if (!end) return;

      let current = 0;
      const step  = Math.max(1, Math.ceil(end / 55));
      const timer = setInterval(() => {
        current = Math.min(current + step, end);
        el.textContent = current.toLocaleString('ja-JP') + suffix;
        if (current >= end) clearInterval(timer);
      }, 22);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  nums.forEach(el => observer.observe(el));
}

/* ============================================================
   14. INIT — Run everything on DOMContentLoaded
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initStickyHeader();
  initMobileNav();
  initScrollAnimations();
  initBackToTop();
  initLightbox();
  initCarousel();
  initMenuTabs();
  initScrollSpy();
  initSmoothScroll();
  initContactForm();
  initCounters();

  console.log('%cMilan Restaurant 🍛', 'color:#c9a84c; font-size:1.2rem; font-weight:bold;');
});
