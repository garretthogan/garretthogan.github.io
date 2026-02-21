import { initSpaceScene } from './space-scene.js';

const container = document.getElementById('scene-container');
const loadingOverlay = document.getElementById('loading-overlay');
if (container) {
  initSpaceScene(container, {
    onReady: () => {
      if (loadingOverlay) {
        loadingOverlay.classList.add('loading-overlay--hidden');
        loadingOverlay.addEventListener('transitionend', () => loadingOverlay.remove(), { once: true });
      }
    },
  });
}
