(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const BLANK_BEAT_MS = 320;
  const REVEAL_PAUSE_MS = 550;

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

  const buildSequence = () => {
    const page = document.querySelector('.page') || document.body;
    const sequence = [];

    const nav = page.querySelector('header nav, :scope > nav');
    uniquePush(sequence, nav);

    const hero = page.querySelector('main > section, main > article, :scope > main > section, :scope > main > article, :scope > section, :scope > article');
    uniquePush(sequence, hero);

    const allMainBlocks = Array.from(page.querySelectorAll('main > section, main > article'));
    allMainBlocks.forEach((block) => {
      if (block !== hero) uniquePush(sequence, block);
    });

    const directBlocks = Array.from(page.querySelectorAll(':scope > section, :scope > article'));
    directBlocks.forEach((block) => {
      if (block !== hero) uniquePush(sequence, block);
    });

    const footer = page.querySelector(':scope > footer') || page.querySelector('footer');
    uniquePush(sequence, footer);

    return sequence;
  };

  const markSequenceTargets = (sequence) => {
    sequence.forEach((el, index) => {
      el.classList.add('brand-reveal-target');
      el.style.setProperty('--reveal-index', String(index));
    });
  };

  const startReveal = () => {
    document.body.classList.add('brand-reveal-play');
  };

  const setupReveal = () => {
    if (document.body?.dataset.revealReady === 'true') return;

    const sequence = buildSequence();
    markSequenceTargets(sequence);
    document.body.dataset.revealReady = 'true';

    if (reducedMotion) {
      startReveal();
      return;
    }

    if (document.body?.dataset.entrySequence === 'true') {
      document.addEventListener('beta:entry-reveal', startReveal, { once: true });
      return;
    }

    window.setTimeout(startReveal, REVEAL_PAUSE_MS);
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
    if (!url.pathname.startsWith('/beta/')) return false;

    return true;
  };

  document.addEventListener('DOMContentLoaded', () => {
    setupReveal();
    if (!reducedMotion) ensureOverlay();
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
