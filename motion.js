(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const body = document.body;

  document.documentElement.classList.add('motion-enabled');

  if (!reducedMotion) {
    const revealTargets = [
      ...document.querySelectorAll('header, main .page-head, main > .feature, main .grid > .card, main .team-grid > .card, main .contact-direct, main .contact-info, main .chatbox, main .admin-panel, main .home-copy > *, main .home-visual, main .portfolio-section, main .portfolio-card, main .plan-grid > .service-plan, main .quote-section, main .quote-form, footer')
    ];
    revealTargets.forEach((element, index) => {
      element.classList.add('motion-reveal');
      element.style.setProperty('--motion-delay', `${Math.min(index % 4, 3) * 75}ms`);
    });

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('motion-visible');
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
      revealTargets.forEach(element => observer.observe(element));
    } else {
      revealTargets.forEach(element => element.classList.add('motion-visible'));
    }

    document.addEventListener('click', event => {
      const link = event.target.closest('a[href]');
      if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (link.target || link.hasAttribute('download')) return;
      const destination = new URL(link.href, window.location.href);
      const isLocalPage = destination.protocol === window.location.protocol
        && destination.pathname.toLowerCase().endsWith('.html')
        && destination.pathname !== window.location.pathname;
      if (!isLocalPage) return;
      event.preventDefault();
      body.classList.add('page-leaving');
      window.setTimeout(() => window.location.assign(destination.href), 180);
    });
  }

  if (!finePointer || reducedMotion) return;

  const aura = document.createElement('div');
  aura.className = 'cursor-aura';
  aura.setAttribute('aria-hidden', 'true');
  body.append(aura);
  body.classList.add('cursor-active');

  const hero = document.querySelector('.hero');
  const emblem = document.querySelector('.welcome-emblem');
  let frame = 0;
  let pointerX = 0;
  let pointerY = 0;

  window.addEventListener('pointermove', event => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    if (frame) return;
    frame = requestAnimationFrame(() => {
      aura.style.left = `${pointerX}px`;
      aura.style.top = `${pointerY}px`;
      if (hero) {
        const rect = hero.getBoundingClientRect();
        const x = (pointerX - rect.left) / rect.width - .5;
        const y = (pointerY - rect.top) / rect.height - .5;
        hero.style.setProperty('--parallax-x', `${x * 8}px`);
        hero.style.setProperty('--parallax-y', `${y * 6}px`);
        if (emblem) emblem.style.transform = `translate3d(${x * 7}px, ${y * 5}px, 0)`;
      }
      frame = 0;
    });
  }, { passive: true });

  document.querySelectorAll('.card,.feature,.contact-info,.contact-direct').forEach(card => {
    card.addEventListener('pointermove', event => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      card.style.setProperty('--tilt-x', `${x * 1.8}deg`);
      card.style.setProperty('--tilt-y', `${y * -1.8}deg`);
      card.classList.add('pointer-tilt');
    }, { passive: true });
    card.addEventListener('pointerleave', () => {
      card.style.removeProperty('--tilt-x');
      card.style.removeProperty('--tilt-y');
      card.classList.remove('pointer-tilt');
    });
  });
})();
