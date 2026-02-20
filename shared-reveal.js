(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const uniquePush = (arr, node) => {
    if (node && !arr.includes(node)) arr.push(node);
  };

  const collectSequence = (page) => {
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

    return sequence;
  };

  document.addEventListener('DOMContentLoaded', () => {
    if (reducedMotion) return;

    document.body.dataset.entrySequence = 'true';

    const page = document.querySelector('.page') || document.body;
    const sequence = collectSequence(page);

    sequence.forEach((el, index) => {
      el.classList.add('shared-reveal-target');
      el.style.setProperty('--shared-reveal-index', String(index));
    });

    requestAnimationFrame(() => {
      document.body.classList.add('shared-reveal-play');
    });
  });
})();
