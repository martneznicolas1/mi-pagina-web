(() => {
  const cover = document.querySelector('#welcome-cover');
  const enter = document.querySelector('#enter-site');
  const greeting = document.querySelector('#welcome-track');
  if (!cover || !enter) return;

  if (window.location.hash === '#home' || window.location.hash === '#proyectos') {
    cover.hidden = true;
    return;
  }

  document.body.classList.add('welcome-open');
  let entering = false;
  enter.addEventListener('click', event => {
    event.preventDefault();
    if (entering) return;
    entering = true;

    if (greeting) {
      greeting.currentTime = 0;
      const playback = greeting.play();
      if (playback?.catch) playback.catch(() => {});
    }

    cover.classList.add('leaving');
    window.setTimeout(() => {
      cover.hidden = true;
      document.body.classList.remove('welcome-open');
    }, 260);
  });
})();
