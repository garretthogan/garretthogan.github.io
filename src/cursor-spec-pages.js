import { PageHero, CTASection } from './founder-components.js';
import { PlaybookLinksSection } from './gpt-components.js';
import { PlaybookPromise, PlaybookSection } from './playbook-components.js';
import { cursorSpecForCardGamesPlaybook } from './cursor-spec-content.js';

export function renderCursorSpecForCardGamesPage() {
  const p = cursorSpecForCardGamesPlaybook;
  const fragment = document.createDocumentFragment();
  fragment.appendChild(PageHero(p.hero));
  fragment.appendChild(PlaybookPromise(p.promise));
  for (const section of p.sections) {
    fragment.appendChild(PlaybookSection(section));
  }
  fragment.appendChild(PlaybookLinksSection('Related', p.relatedLinks));
  fragment.appendChild(CTASection(p.closingCta));
  return fragment;
}
