/* ==========================================================================
   AMSAS Dossier — Navigation
   ========================================================================== */

(function () {
  'use strict';

  const nav = document.getElementById('main-nav');
  const hamburger = document.getElementById('nav-hamburger');
  const navLinks = document.getElementById('nav-links');
  const progressBar = document.getElementById('reading-progress');
  const backToTop = document.getElementById('back-to-top');

  /* ── Scroll: nav + progress bar + back-to-top ── */
  function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    // Nav estado
    if (nav) {
      nav.classList.toggle('scrolled', scrollTop > 60);
    }

    // Progress bar
    if (progressBar) {
      progressBar.style.width = Math.min(progress, 100) + '%';
    }

    // Back to top
    if (backToTop) {
      backToTop.classList.toggle('visible', scrollTop > 400);
    }

    // Active nav link
    updateActiveNavLink();
  }

  /* ── Active nav link por sección visible ── */
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-link[data-section]');
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinksAll.forEach(link => {
          link.classList.remove('active');
          if (link.dataset.section === sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  /* ── Smooth scroll al hacer click en nav links ── */
  function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);

        if (target) {
          e.preventDefault();
          const navHeight = nav ? nav.offsetHeight : 72;
          const targetTop = target.offsetTop - navHeight;

          window.scrollTo({ top: targetTop, behavior: 'smooth' });

          // Cerrar menú mobile si está abierto
          if (navLinks && navLinks.classList.contains('open')) {
            navLinks.classList.remove('open');
          }
        }
      });
    });
  }

  /* ── Hamburger mobile ── */
  function setupHamburger() {
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Cerrar al hacer click fuera
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
      }
    });
  }

  /* ── Back to top ── */
  function setupBackToTop() {
    if (!backToTop) return;
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── Init ── */
  window.addEventListener('scroll', onScroll, { passive: true });
  setupSmoothScroll();
  setupHamburger();
  setupBackToTop();
  onScroll(); // estado inicial

})();
