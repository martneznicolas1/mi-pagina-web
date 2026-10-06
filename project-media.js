document.querySelectorAll('[data-project-media]').forEach(media => {
  const buttons = media.querySelectorAll('[data-media-target]');
  const views = media.querySelectorAll('[data-media-view]');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const target = button.dataset.mediaTarget;

      buttons.forEach(item => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });

      views.forEach(view => {
        const active = view.dataset.mediaView === target;
        view.hidden = !active;
        view.classList.toggle('is-active', active);
        if (!active) {
          const video = view.querySelector('video');
          video?.pause();
          if (video) video.currentTime = 0;
        }
      });

      if (target === 'video') {
        const video = media.querySelector('[data-media-view="video"] video');
        video?.play().catch(() => {});
      }
    });
  });
});
