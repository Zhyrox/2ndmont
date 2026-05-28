const iconTypes = ['favorite', 'spa', 'filter_vintage'];

function createPetal(container) {
  const petal = document.createElement('span');
  petal.className = 'material-symbols-outlined petal';
  petal.innerText = iconTypes[Math.floor(Math.random() * iconTypes.length)];

  const size = Math.random() * (20 - 10) + 10;
  const left = Math.random() * 100;
  const duration = Math.random() * (12 - 6) + 6;
  const delay = Math.random() * 3;

  petal.style.fontSize = `${size}px`;
  petal.style.left = `${left}%`;
  petal.style.bottom = `-20px`;
  petal.style.animationDuration = `${duration}s`;
  petal.style.animationDelay = `${delay}s`;
  petal.style.opacity = Math.random() * 0.4 + 0.1;

  container.appendChild(petal);

  setTimeout(() => {
    petal.remove();
  }, (duration + delay) * 1000);
}

const petalSections = document.querySelectorAll('.section-petals');
petalSections.forEach(section => {
  for (let i = 0; i < 5; i++) createPetal(section);
  setInterval(() => createPetal(section), 2000);
});

window.addEventListener('scroll', () => {
  const parallax = document.querySelector('.parallax-bg');
  if (parallax) {
    const scrollPosition = window.pageYOffset;
    parallax.style.transform = `translateY(${scrollPosition * 0.1}px)`;
  }
});

const loveCard = document.getElementById('love-card');
if (loveCard) {
  loveCard.addEventListener('click', function () {
    const inner = this.querySelector('.card-inner');
    if (inner) inner.classList.toggle('rotate-y-180');
  });
}

const music = document.getElementById('background-music');
const musicToggle = document.getElementById('music-toggle');
const musicToggleIcon = document.getElementById('music-toggle-icon');
const musicSelect = document.getElementById('music-select');

if (music && musicToggle && musicToggleIcon) {
  if (musicSelect) {
    music.src = musicSelect.value;
    musicSelect.addEventListener('change', async () => {
      const wasPlaying = !music.paused;
      music.pause();
      music.src = musicSelect.value;
      music.load();
      musicToggleIcon.textContent = 'play_arrow';
      musicToggle.setAttribute('aria-label', 'Play music');
      if (wasPlaying) {
        try {
          await music.play();
          musicToggleIcon.textContent = 'pause';
          musicToggle.setAttribute('aria-label', 'Pause music');
        } catch (error) {
          console.warn('Music playback failed:', error);
        }
      }
    });
  }

  musicToggle.addEventListener('click', async () => {
    if (music.paused) {
      try {
        await music.play();
        musicToggleIcon.textContent = 'pause';
        musicToggle.setAttribute('aria-label', 'Pause music');
      } catch (error) {
        console.warn('Music playback failed:', error);
      }
    } else {
      music.pause();
      musicToggleIcon.textContent = 'play_arrow';
      musicToggle.setAttribute('aria-label', 'Play music');
    }
  });

  music.addEventListener('ended', () => {
    musicToggleIcon.textContent = 'play_arrow';
    musicToggle.setAttribute('aria-label', 'Play music');
  });

  window.addEventListener('DOMContentLoaded', async () => {
    try {
      await music.play();
      musicToggleIcon.textContent = 'pause';
      musicToggle.setAttribute('aria-label', 'Pause music');
    } catch (error) {
      console.warn('Autoplay was blocked by the browser:', error);
    }
  });
}
