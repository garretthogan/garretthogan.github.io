import './style.css';
import './landing.css';
import './founder.css';
import './resume-export.css';
import { renderSiteFooter } from './site-shell.js';
import { renderFoundersPage, renderFractionalPage, renderMvpPage } from './founder-pages.js';
import { initResumeExport } from './resume-export.js';

const PAGE_RENDERERS = {
  founders: renderFoundersPage,
  fractional: renderFractionalPage,
  mvp: renderMvpPage,
};

function mountPage() {
  const page = document.body.dataset.page;
  const render = PAGE_RENDERERS[page];
  const root = document.getElementById('founder-root');
  if (!render || !root) return;
  root.appendChild(render());
}

function mountFooter() {
  const footer = renderSiteFooter();
  document.body.appendChild(footer);
}

mountPage();
mountFooter();
initResumeExport();
