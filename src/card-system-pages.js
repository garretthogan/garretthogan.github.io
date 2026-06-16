import { PageHero, CTASection } from './founder-components.js';
import { PlaybookLinksSection } from './gpt-components.js';
import { PlaybookPromise, PlaybookSection } from './playbook-components.js';
import { cardSystemDesignPlaybook } from './card-system-content.js';

export function renderCardSystemDesignPage() {
  const p = cardSystemDesignPlaybook;
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
