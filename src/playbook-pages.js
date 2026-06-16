import { PageHero, CTASection } from './founder-components.js';
import { PlaybookPromise, PlaybookSection } from './playbook-components.js';
import { roguelikeDeckbuilderMvpPlaybook } from './playbook-content.js';

export function renderRoguelikeDeckbuilderMvpPlaybookPage() {
  const p = roguelikeDeckbuilderMvpPlaybook;
  const fragment = document.createDocumentFragment();
  fragment.appendChild(PageHero(p.hero));
  fragment.appendChild(PlaybookPromise(p.promise));
  for (const section of p.sections) {
    fragment.appendChild(PlaybookSection(section));
  }
  fragment.appendChild(CTASection(p.closingCta));
  return fragment;
}
