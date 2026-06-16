import './style.css';
import './landing.css';
import './founder.css';
import './gpt.css';
import './playbook.css';
import { renderSiteFooter } from './site-shell.js';
import { renderRoguelikeDeckbuilderDesignerPage } from './gpt-pages.js';
import { renderRoguelikeDeckbuilderMvpPlaybookPage } from './playbook-pages.js';
import { renderDeckbuilderBalanceChecklistPage } from './checklist-pages.js';
import { renderCardSystemDesignPage } from './card-system-pages.js';
import { renderCursorSpecForCardGamesPage } from './cursor-spec-pages.js';

const PAGE_RENDERERS = {
  'roguelike-deckbuilder-designer': renderRoguelikeDeckbuilderDesignerPage,
  'roguelike-deckbuilder-mvp': renderRoguelikeDeckbuilderMvpPlaybookPage,
  'deckbuilder-balance-checklist': renderDeckbuilderBalanceChecklistPage,
  'card-system-design': renderCardSystemDesignPage,
  'cursor-spec-for-card-games': renderCursorSpecForCardGamesPage,
};

function mountPage() {
  const page = document.body.dataset.page;
  const render = PAGE_RENDERERS[page];
  const root = document.getElementById('founder-root');
  if (!render || !root) return;
  root.appendChild(render());
}

function mountFooter() {
  document.body.appendChild(renderSiteFooter());
}

mountPage();
mountFooter();
