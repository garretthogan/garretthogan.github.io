import './style.css';
import './landing.css';
import './founder.css';
import './resume-export.css';
import { renderSiteHeader, renderSiteFooter } from './site-shell.js';
import { renderFoundersPage, renderFractionalPage, renderMvpPage } from './founder-pages.js';
import { initResumeExport } from './resume-export.js';

const PAGE_RENDERERS = {
  founders: renderFoundersPage,
  fractional: renderFractionalPage,
  mvp: renderMvpPage,
};

function mountHeader() {
  const existing = document.getElementById('site-header');
  const header = renderSiteHeader({ variant: 'founder' });
  if (existing) {
    existing.replaceWith(header);
  } else {
    document.body.insertBefore(header, document.body.firstChild);
  }
}

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

mountHeader();
mountPage();
mountFooter();
initResumeExport();
