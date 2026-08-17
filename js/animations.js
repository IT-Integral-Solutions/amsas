/* ==========================================================================
   AMSAS Dossier — Scroll Animations
   ========================================================================== */

(function () {
  'use strict';

  /* ── Intersection Observer: reveal on scroll ── */
  function setupRevealObserver() {
    const elements = document.querySelectorAll('.reveal');

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // solo una vez
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -24px 0px'
      }
    );

    elements.forEach(el => observer.observe(el));
  }

  /* ── Animación de números (contadores) ── */
  function animateCounter(el) {
    const target = parseFloat(el.dataset.target || el.textContent);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);

      el.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target + suffix;
      }
    }

    requestAnimationFrame(update);
  }

  function setupCounterObserver() {
    const counters = document.querySelectorAll('[data-counter]');

    if (!counters.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach(el => observer.observe(el));
  }

  /* ── Parallax sutil en portada ── */
  function setupParallax() {
    const glow = document.querySelector('.portada__glow');
    const glow2 = document.querySelector('.portada__glow-2');

    if (!glow && !glow2) return;

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        const y = scrollY * 0.3;
        if (glow) glow.style.transform = `translateY(${y}px)`;
        if (glow2) glow2.style.transform = `translateY(${-y * 0.5}px)`;
      }
    }, { passive: true });
  }

  /* ── Mouse move glow en portada ── */
  function setupMouseGlow() {
    const portada = document.querySelector('.section--portada');
    if (!portada) return;

    portada.addEventListener('mousemove', (e) => {
      const rect = portada.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      portada.style.setProperty('--mouse-x', x + '%');
      portada.style.setProperty('--mouse-y', y + '%');
    });
  }

  /* ── Stagger para listas de items ── */
  function setupStaggerChildren() {
    document.querySelectorAll('[data-stagger]').forEach(parent => {
      const children = parent.children;
      Array.from(children).forEach((child, i) => {
        child.style.transitionDelay = `${i * 80}ms`;
        child.classList.add('reveal');
      });
    });
  }

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', () => {
    setupStaggerChildren();  // primero: agrega .reveal a los hijos dinámicos
    setupRevealObserver();   // segundo: observa TODOS los .reveal (incluyendo los recién agregados)
    setupCounterObserver();
    setupParallax();
    setupMouseGlow();
  });

})();
