(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const BLANK_BEAT_MS = 320;
  const NAV_STATE_CLASSES = ['navigating', 'nav-out', 'transition-lock'];

  const clearInlineVisibility = (node) => {
    if (!node || !node.style) return;
    node.style.removeProperty('opacity');
    node.style.removeProperty('visibility');
    node.style.removeProperty('display');
    node.style.removeProperty('pointer-events');
    node.style.removeProperty('filter');
    node.style.removeProperty('transform');
    node.style.removeProperty('clip-path');
  };

  const ensurePageVisible = () => {
    const page = document.querySelector('.page');
    [document.documentElement, document.body, page].forEach(clearInlineVisibility);

    if (document.body) {
      document.body.classList.remove('brand-force-visible');
      document.body.classList.add('brand-reveal-play');
    }
  };

  const clearNavigationState = () => {
    if (!document.body) return;

    NAV_STATE_CLASSES.forEach((className) => {
      document.body.classList.remove(className);
    });

    Array.from(document.body.classList).forEach((className) => {
      if (className.includes('navigating') || className.includes('nav-out') || className.includes('transition-lock')) {
        document.body.classList.remove(className);
      }
    });

    document.body.removeAttribute('aria-busy');
    document.body.removeAttribute('inert');
    document.body.removeAttribute('data-navigating');
    document.body.removeAttribute('data-nav-out');
    document.body.removeAttribute('data-transition-lock');
  };

  const clearOverlay = () => {
    const overlay = document.getElementById('navOverlay');
    if (!overlay) return;
    overlay.classList.remove('is-active');
    overlay.removeAttribute('style');
    overlay.remove();
  };

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

  const setupReveal = ({ force = false } = {}) => {
    if (!force && reducedMotion) {
      ensurePageVisible();
      return;
    }

    if (document.body?.dataset.entrySequence === 'true') {
      ensurePageVisible();
      return;
    }

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

  const isInterceptableInternalLink = (anchor) => {
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

  window.addEventListener('pageshow', (event) => {
    clearOverlay();
    clearNavigationState();
    ensurePageVisible();

    if (event.persisted) {
      document.body?.classList.remove('brand-reveal-play');

      document.querySelectorAll('.brand-reveal-target').forEach((el) => {
        el.classList.remove('brand-reveal-target');
        el.style.removeProperty('--reveal-index');
      });

      requestAnimationFrame(() => {
        setupReveal({ force: true });
      });

      window.setTimeout(() => {
        ensurePageVisible();
      }, BLANK_BEAT_MS);
    }
  });

  document.addEventListener('click', (event) => {
    if (reducedMotion) return;
    if (event.defaultPrevented) return;
    if (event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const anchor = event.target.closest('a[href]');
    if (!anchor || !isInterceptableInternalLink(anchor)) return;

    event.preventDefault();

    const overlay = ensureOverlay();
    overlay.classList.add('is-active');

    window.setTimeout(() => {
      window.location.href = anchor.href;
    }, BLANK_BEAT_MS);
  });
})();
