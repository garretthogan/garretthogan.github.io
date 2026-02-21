import { initSpaceScene } from './space-scene.js';

function dismissLoading() {
  const loadingOverlay = document.getElementById('loading-overlay');
  if (loadingOverlay) {
    loadingOverlay.classList.add('loading-overlay--hidden');
    loadingOverlay.addEventListener('transitionend', () => loadingOverlay.remove(), { once: true });
  }
}

function isMobile() {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
    (navigator.maxTouchPoints > 0 && window.matchMedia('(max-width: 900px)').matches);
}

const container = document.getElementById('scene-container');
if (container && !isMobile()) {
  initSpaceScene(container, { onReady: dismissLoading });
} else {
  if (container) container.classList.add('scene-container--no-scene');
  dismissLoading();
}
