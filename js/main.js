/* =============================================
   MAIN JS — Percherones y Veterinarias Esquivel
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ── NAVBAR ──────────────────────────────── */
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.navbar-hamburger');
  const mobileNav = document.querySelector('.navbar-mobile');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('open');
  });

  document.querySelectorAll('.navbar-mobile a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('open');
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
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ── GALERÍA FILTROS ─────────────────────── */
  const filterBtns = document.querySelectorAll('.galeria-filtro-btn');
  const galeriaItems = document.querySelectorAll('.galeria-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active--all', 'active--vet', 'active--per'));
      const cat = btn.dataset.filter;
      if (cat === 'all') btn.classList.add('active--all');
      else if (cat === 'vet') btn.classList.add('active--vet');
      else if (cat === 'per') btn.classList.add('active--per');

      // Filter items
      galeriaItems.forEach(item => {
        const itemCat = item.dataset.category;
        if (cat === 'all' || itemCat === cat) {
          item.style.display = '';
          setTimeout(() => item.classList.remove('hidden'), 10);
        } else {
          item.classList.add('hidden');
          setTimeout(() => {
            if (item.classList.contains('hidden')) item.style.display = 'none';
          }, 400);
        }
      });
    });
  });

  // Set initial active
  document.querySelector('[data-filter="all"]')?.classList.add('active--all');

  /* ── LIGHTBOX ────────────────────────────── */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  let currentIndex = 0;
  let visibleItems = [];

  function openLightbox(index) {
    visibleItems = [...galeriaItems].filter(i => i.style.display !== 'none');
    currentIndex = index;
    lightboxImg.src = visibleItems[currentIndex].querySelector('img').src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function navigate(dir) {
    visibleItems = [...galeriaItems].filter(i => i.style.display !== 'none');
    currentIndex = (currentIndex + dir + visibleItems.length) % visibleItems.length;
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
      lightboxImg.src = visibleItems[currentIndex].querySelector('img').src;
      lightboxImg.style.opacity = '1';
    }, 150);
  }

  galeriaItems.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
  });

  document.getElementById('lightbox-close')?.addEventListener('click', closeLightbox);
  document.getElementById('lightbox-prev')?.addEventListener('click', () => navigate(-1));
  document.getElementById('lightbox-next')?.addEventListener('click', () => navigate(1));

  lightbox?.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', e => {
    if (!lightbox?.classList.contains('active')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
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
      const duration = 1800;
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
