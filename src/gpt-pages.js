import {
  PageHero,
  ServiceCardGrid,
  PhilosophySection,
  CopySection,
  CTASection,
} from './founder-components.js';
import {
  PromptListSection,
  ModeGridSection,
  PlaybookLinksSection,
} from './gpt-components.js';
import { roguelikeDeckbuilderDesignerPage } from './gpt-content.js';

export function renderRoguelikeDeckbuilderDesignerPage() {
  const p = roguelikeDeckbuilderDesignerPage;
  const fragment = document.createDocumentFragment();
  fragment.appendChild(PageHero(p.hero));
  fragment.appendChild(ServiceCardGrid('What it helps you design', p.designAreas));
  fragment.appendChild(PhilosophySection('Built for messy early ideas', p.messyIdeas));
  fragment.appendChild(PromptListSection('Example prompts', p.examplePrompts));
  fragment.appendChild(ModeGridSection('Design modes', p.designModes));
  fragment.appendChild(CopySection('Why Ragtag Throne', p.credibility.copy, p.credibility.bullets));
  fragment.appendChild(PlaybookLinksSection('Related playbooks', p.relatedPlaybooks));
  fragment.appendChild(CTASection(p.finalCta));
  return fragment;
}
