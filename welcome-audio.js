(() => {
  const button = document.querySelector('#welcome-audio');
  const greeting = document.querySelector('#welcome-track');
  if (!button || !greeting) {
    button?.setAttribute('hidden', '');
    return;
  }

  const label = button.querySelector('span');
  const resetLabel = () => {
    if (label) label.textContent = 'Escuchar saludo';
    button.setAttribute('aria-label', 'Escuchar saludo');
    button.title = 'Escuchar saludo';
  };
  const showAudioError = () => {
    if (label) label.textContent = 'Audio no disponible';
    button.setAttribute('aria-label', 'No se pudo cargar el saludo');
    button.title = 'No se pudo cargar assets/welcome-saludo.wav';
  };

  const playGreeting = () => {
    greeting.currentTime = 0;
    if (label) label.textContent = 'Reproduciendo…';
    const playback = greeting.play();
    if (playback?.catch) playback.catch(showAudioError);
  };

  greeting.addEventListener('ended', resetLabel);
  greeting.addEventListener('error', showAudioError);
  button.addEventListener('click', playGreeting);

  const cover = document.querySelector('#welcome-cover');
  const coverIsOpen = cover && !cover.hidden;
  let alreadyPlayed = false;
  try {
    alreadyPlayed = sessionStorage.getItem('softnavaGreetingPlayed') === 'yes';
  } catch {}

  if (!alreadyPlayed && !coverIsOpen) {
    try { sessionStorage.setItem('softnavaGreetingPlayed', 'yes'); } catch {}
    window.setTimeout(() => {
      const playback = greeting.play();
      if (playback?.catch) playback.catch(() => {});
    }, 180);
  }
})();
