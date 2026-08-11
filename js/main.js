/* =============================================
   MAIN JS — Percherones y Veterinarias Esquivel
   ============================================= */

document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {

  /* ── NAVBAR ──────────────────────────────── */
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.navbar-hamburger');
  const mobileNav = document.querySelector('.navbar-mobile');

  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  hamburger?.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('active');
    mobileNav.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    mobileNav.setAttribute('aria-hidden', String(!isOpen));
  });

  function closeMobileNav() {
    hamburger?.classList.remove('active');
    mobileNav?.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false');
    hamburger?.setAttribute('aria-label', 'Abrir menú');
    mobileNav?.setAttribute('aria-hidden', 'true');
  }

  document.querySelectorAll('.navbar-mobile a').forEach(link => {
    link.addEventListener('click', () => {
      closeMobileNav();
    });
  });

  /* ── SMOOTH SCROLL ───────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  });

  /* ── GALERÍA FILTROS ─────────────────────── */
  const filterBtns = document.querySelectorAll('.galeria-filtro-btn');
  const galeriaItems = document.querySelectorAll('.galeria-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active--all', 'active--vet', 'active--per'));
      filterBtns.forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
      const cat = btn.dataset.filter;
      if (cat === 'all') btn.classList.add('active--all');
      else if (cat === 'vet') btn.classList.add('active--vet');
      else if (cat === 'per') btn.classList.add('active--per');

      // Filter items
      galeriaItems.forEach(item => {
        const itemCat = item.dataset.category;
        if (cat === 'all' || itemCat === cat) {
          item.style.display = '';
          item.setAttribute('tabindex', '0');
          item.setAttribute('aria-hidden', 'false');
          setTimeout(() => item.classList.remove('hidden'), 10);
        } else {
          item.classList.add('hidden');
          item.setAttribute('tabindex', '-1');
          item.setAttribute('aria-hidden', 'true');
          setTimeout(() => {
            if (item.classList.contains('hidden')) item.style.display = 'none';
          }, 400);
        }
      });
    });
  });

  // Set initial active
  const initialFilter = document.querySelector('[data-filter="all"]');
  initialFilter?.classList.add('active--all');
  filterBtns.forEach(btn => btn.setAttribute('aria-pressed', String(btn === initialFilter)));

  /* ── LIGHTBOX ────────────────────────────── */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  let currentIndex = 0;
  let visibleItems = [];
  let lightboxTrigger = null;

  function openLightbox(item) {
    visibleItems = [...galeriaItems].filter(i => i.style.display !== 'none');
    currentIndex = visibleItems.indexOf(item);
    if (currentIndex < 0 || !lightbox || !lightboxImg) return;
    const sourceImg = visibleItems[currentIndex].querySelector('img');
    lightboxTrigger = item;
    lightboxImg.src = sourceImg.src;
    lightboxImg.alt = sourceImg.alt;
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    document.getElementById('lightbox-close')?.focus();
  }

  function closeLightbox() {
    if (!lightbox?.classList.contains('active')) return;
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lightboxImg.removeAttribute('src');
    lightboxTrigger?.focus();
  }

  function navigate(dir) {
    visibleItems = [...galeriaItems].filter(i => i.style.display !== 'none');
    if (!visibleItems.length || !lightboxImg) return;
    currentIndex = (currentIndex + dir + visibleItems.length) % visibleItems.length;
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
      const sourceImg = visibleItems[currentIndex].querySelector('img');
      lightboxImg.src = sourceImg.src;
      lightboxImg.alt = sourceImg.alt;
      lightboxImg.style.opacity = '1';
    }, 150);
  }

  galeriaItems.forEach(item => {
    item.addEventListener('click', () => openLightbox(item));
    item.addEventListener('keydown', event => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      openLightbox(item);
    });
  });

  document.getElementById('lightbox-close')?.addEventListener('click', closeLightbox);
  document.getElementById('lightbox-prev')?.addEventListener('click', () => navigate(-1));
  document.getElementById('lightbox-next')?.addEventListener('click', () => navigate(1));

  lightbox?.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileNav?.classList.contains('open')) {
      closeMobileNav();
      hamburger?.focus();
    }
    if (!lightbox?.classList.contains('active')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
    if (e.key === 'Tab') {
      const controls = [...lightbox.querySelectorAll('button')];
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  /* ── INTERSECTION OBSERVER (fade-up) ──────── */
  const fadeEls = document.querySelectorAll('.fade-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  fadeEls.forEach(el => observer.observe(el));

  /* ── CONTADOR ANIMADO ────────────────────── */
  const statNumbers = document.querySelectorAll('.per-stat__number[data-count]');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 1800;
      const start = performance.now();

      function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (progress < 1) requestAnimationFrame(update);
      }

      requestAnimationFrame(update);
      statsObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => statsObserver.observe(el));

  /* ── HERO: animar gradiente al hover ─────── */
  // Already handled by CSS, no extra JS needed

});
