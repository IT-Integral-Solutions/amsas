/* ==========================================================================
   AMSAS Dossier — Main
   ========================================================================== */

(function () {
  'use strict';

  /* ── Tab sistema (Construcción / Mantenimiento inline) ── */
  function setupTabs() {
    document.querySelectorAll('[data-tabs]').forEach(tabGroup => {
      const triggers = tabGroup.querySelectorAll('[data-tab-trigger]');
      const panels = tabGroup.querySelectorAll('[data-tab-panel]');

      triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
          const target = trigger.dataset.tabTrigger;

          triggers.forEach(t => t.classList.remove('active'));
          panels.forEach(p => {
            p.classList.remove('active');
            p.setAttribute('hidden', '');
          });

          trigger.classList.add('active');
          const panel = tabGroup.querySelector(`[data-tab-panel="${target}"]`);
          if (panel) {
            panel.classList.add('active');
            panel.removeAttribute('hidden');
          }
        });
      });

      // Activar el primero por defecto
      if (triggers.length) triggers[0].click();
    });
  }

  /* ── Tooltip hover ── */
  function setupTooltips() {
    document.querySelectorAll('[data-tooltip]').forEach(el => {
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.textContent = el.dataset.tooltip;
      tooltip.style.display = 'none';
      document.body.appendChild(tooltip);

      el.addEventListener('mouseenter', (e) => {
        tooltip.style.display = 'block';
        positionTooltip(e, tooltip);
      });

      el.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
      });

      el.addEventListener('mousemove', (e) => {
        positionTooltip(e, tooltip);
      });
    });
  }

  function positionTooltip(e, tooltip) {
    tooltip.style.left = (e.clientX + 12) + 'px';
    tooltip.style.top = (e.clientY - 36) + 'px';
  }

  /* ── Ecosistema: highlight al hover ── */
  function setupEcoInteraction() {
    const nodes = document.querySelectorAll('.eco-node');

    nodes.forEach(node => {
      node.addEventListener('mouseenter', () => {
        nodes.forEach(n => {
          if (n !== node) n.style.opacity = '0.5';
        });
      });

      node.addEventListener('mouseleave', () => {
        nodes.forEach(n => n.style.opacity = '');
      });
    });
  }

  /* ── Etapas: expandir en mobile ── */
  function setupEtapasToggle() {
    if (window.innerWidth > 768) return;

    document.querySelectorAll('.etapa-card').forEach(card => {
      const items = card.querySelector('.etapa-card__items');
      if (!items) return;

      card.style.cursor = 'pointer';
      card.addEventListener('click', () => {
        const isOpen = card.classList.contains('is-open');
        document.querySelectorAll('.etapa-card').forEach(c => {
          c.classList.remove('is-open');
          const i = c.querySelector('.etapa-card__items');
          if (i) i.style.maxHeight = '0';
        });

        if (!isOpen) {
          card.classList.add('is-open');
          items.style.maxHeight = items.scrollHeight + 'px';
        }
      });

      items.style.overflow = 'hidden';
      items.style.maxHeight = '0';
      items.style.transition = 'max-height 0.35s ease';
    });
  }

  /* ── Fecha automática ── */
  function setCurrentDate() {
    const dateEl = document.getElementById('dossier-date');
    if (!dateEl) return;

    const now = new Date();
    const options = { year: 'numeric', month: 'long' };
    dateEl.textContent = now.toLocaleDateString('es-AR', options);
  }

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', () => {
    setupTabs();
    setupTooltips();
    setupEcoInteraction();
    setupEtapasToggle();
    setCurrentDate();
  });

})();
