import {
  PageHero,
  ProofStrip,
  ServiceCardGrid,
  FitListSection,
  ProcessSteps,
  CopySection,
  PhilosophySection,
  CTASection,
  FAQSection,
  InternalLinks,
} from './founder-components.js';
import { foundersPage, fractionalPage, mvpPage } from './founder-content.js';

export function renderFoundersPage() {
  const p = foundersPage;
  const fragment = document.createDocumentFragment();
  fragment.appendChild(PageHero(p.hero));
  fragment.appendChild(ProofStrip(p.proofStrip));
  fragment.appendChild(FitListSection(p.goodFit.heading, p.goodFit.items));
  fragment.appendChild(
    FitListSection(p.notGoodFit.heading, p.notGoodFit.items, 'landing-section--muted')
  );
  fragment.appendChild(ServiceCardGrid(p.services.heading, p.services.cards));
  fragment.appendChild(ProcessSteps(p.howIWork.heading, p.howIWork.intro, p.howIWork.steps));
  fragment.appendChild(CTASection(p.cta));
  fragment.appendChild(InternalLinks(p.relatedPages));
  return fragment;
}

export function renderFractionalPage() {
  const p = fractionalPage;
  const fragment = document.createDocumentFragment();
  fragment.appendChild(PageHero(p.hero));
  fragment.appendChild(CopySection(p.whatIs.heading, p.whatIs.copy, p.whatIs.bullets));
  fragment.appendChild(ServiceCardGrid(p.whenMakesSense.heading, p.whenMakesSense.cards));
  fragment.appendChild(CopySection(p.whyWorkWithMe.heading, p.whyWorkWithMe.copy, p.whyWorkWithMe.bullets));
  fragment.appendChild(ServiceCardGrid(p.engagement.heading, p.engagement.cards));
  fragment.appendChild(CTASection(p.cta));
  fragment.appendChild(InternalLinks(p.relatedPages));
  return fragment;
}

export function renderMvpPage() {
  const p = mvpPage;
  const fragment = document.createDocumentFragment();
  fragment.appendChild(PageHero(p.hero));
  fragment.appendChild(PhilosophySection(p.philosophy.heading, p.philosophy.copy));
  fragment.appendChild(ServiceCardGrid(p.mvpTypes.heading, p.mvpTypes.cards));
  fragment.appendChild(ProcessSteps(p.process.heading, null, p.process.steps));
  fragment.appendChild(FAQSection(p.faq.heading, p.faq.items));
  fragment.appendChild(CTASection(p.cta));
  fragment.appendChild(InternalLinks(p.relatedPages));
  return fragment;
}
