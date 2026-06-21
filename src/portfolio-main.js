import './style.css';
import './landing.css';
import './resume-export.css';
import './portfolio.css';
import { initSpaceScene } from './space-scene.js';
import { renderPortfolio } from './portfolio.js';
import { initResumeExport } from './resume-export.js';

renderPortfolio();
initResumeExport();

function dismissLoading() {
  const loadingOverlay = document.getElementById('loading-overlay');
  if (loadingOverlay) {
    loadingOverlay.classList.add('loading-overlay--hidden');
    loadingOverlay.addEventListener('transitionend', () => loadingOverlay.remove(), { once: true });
  }
}

function isMobile() {
  return (
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
    (navigator.maxTouchPoints > 0 && window.matchMedia('(max-width: 900px)').matches)
  );
}

const container = document.getElementById('scene-container');
const mobile = isMobile();

function startScene() {
  if (container) {
    initSpaceScene(container, {
      onReady: dismissLoading,
      useSimpleRenderer: mobile,
    });
  } else {
    dismissLoading();
  }
}

if (container && mobile) {
  const deferred = () => {
    startScene();
  };
  if (typeof requestIdleCallback !== 'undefined') {
    requestIdleCallback(deferred, { timeout: 400 });
  } else {
    setTimeout(deferred, 300);
  }
} else {
  startScene();
}
