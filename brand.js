(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const BLANK_BEAT_MS = 320;

  const ensureOverlay = () => {
    let overlay = document.getElementById('navOverlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'navOverlay';
      document.body.appendChild(overlay);
    }
    return overlay;
  };

  const uniquePush = (arr, node) => {
    if (node && !arr.includes(node)) arr.push(node);
  };

  const setupReveal = () => {
    if (reducedMotion) return;
    if (document.body?.dataset.entrySequence === 'true') return;

    const page = document.querySelector('.page') || document.body;
    const sequence = [];

    const header = page.querySelector(':scope > header') || page.querySelector('header');
    uniquePush(sequence, header);

    const hero = page.querySelector('main > section, main > article, :scope > main > section, :scope > main > article, :scope > section, :scope > article');
    uniquePush(sequence, hero);

    const allMainBlocks = Array.from(page.querySelectorAll('main > section, main > article'));
    allMainBlocks.forEach((block) => {
      if (block !== hero) uniquePush(sequence, block);
    });

    const directPageBlocks = Array.from(page.querySelectorAll(':scope > section, :scope > article'));
    directPageBlocks.forEach((block) => {
      if (block !== hero && (!header || !header.contains(block))) uniquePush(sequence, block);
    });

    const footer = page.querySelector(':scope > footer') || page.querySelector('footer');
    uniquePush(sequence, footer);

    sequence.forEach((el, index) => {
      el.classList.add('brand-reveal-target');
      el.style.setProperty('--reveal-index', String(index));
    });

    requestAnimationFrame(() => {
      document.body.classList.add('brand-reveal-play');
    });
  };

  const isInterceptableBetaLink = (anchor) => {
    const rawHref = anchor.getAttribute('href');
    if (!rawHref || rawHref.startsWith('#')) return false;
    if (anchor.target && anchor.target !== '_self') return false;

    let url;
    try {
      url = new URL(anchor.href, window.location.href);
    } catch {
      return false;
    }

    if (url.origin !== window.location.origin) return false;
    if (!url.pathname.startsWith('/')) return false;

    return true;
  };

  document.addEventListener('DOMContentLoaded', () => {
    setupReveal();
    ensureOverlay();
  });

  document.addEventListener('click', (event) => {
    if (reducedMotion) return;
    if (event.defaultPrevented) return;
    if (event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const anchor = event.target.closest('a[href]');
    if (!anchor || !isInterceptableBetaLink(anchor)) return;

    event.preventDefault();

    const overlay = ensureOverlay();
    overlay.classList.add('is-active');

    window.setTimeout(() => {
      window.location.href = anchor.href;
    }, BLANK_BEAT_MS);
  });
})();
