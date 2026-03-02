import { initSpaceScene } from './space-scene.js';
import { initPortfolio } from './portfolio.js';

const viewHome = document.getElementById('view-home');
const viewPortfolio = document.getElementById('view-portfolio');

function isPortfolioPath(pathname) {
  return pathname === '/portfolio' || pathname === '/portfolio/';
}

function render() {
  const path = window.location.pathname;
  if (isPortfolioPath(path)) {
    viewHome?.setAttribute('hidden', '');
    viewPortfolio?.removeAttribute('hidden');
    document.title = 'Portfolio — Garrett Hogan';
    initPortfolio();
  } else {
    viewPortfolio?.setAttribute('hidden', '');
    viewHome?.removeAttribute('hidden');
    document.title = 'ragtagthrone';
  }
}

document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href]');
  if (!a || a.target === '_blank') return;
  const href = a.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('mailto:')) return;
  try {
    const url = new URL(href, window.location.origin);
    if (url.origin !== window.location.origin) return;
    const path = url.pathname;
    if (path === '/' || isPortfolioPath(path)) {
      e.preventDefault();
      window.history.pushState({}, '', href);
      render();
    }
  } catch (_) {}
});

window.addEventListener('popstate', render);

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

render();
