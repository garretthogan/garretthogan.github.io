import { el, sectionHeading } from './dom-utils.js';
import { founderShared } from './founder-content.js';

export function PageHero({ eyebrow, headline, subhead, support, primaryCta, secondaryCta }) {
  const section = el('section', { className: 'landing-section landing-section--hero panel' });
  if (eyebrow) section.appendChild(el('p', { className: 'hero__eyebrow', text: eyebrow }));
  section.appendChild(el('h1', { className: 'hero__headline', text: headline }));
  section.appendChild(el('p', { className: 'hero__subhead', text: subhead }));
  if (support) section.appendChild(el('p', { className: 'hero__lead', text: support }));

  const actions = el('div', { className: 'hero__actions' });
  actions.appendChild(
    el('a', { href: primaryCta.href, className: 'btn btn--primary', text: primaryCta.label })
  );
  if (secondaryCta) {
    actions.appendChild(
      el('a', { href: secondaryCta.href, className: 'btn btn--secondary', text: secondaryCta.label })
    );
  }
  section.appendChild(actions);
  return section;
}

export function ProofStrip(items) {
  const strip = el('div', { className: 'proof-strip panel', role: 'list' });
  for (const item of items) {
    strip.appendChild(el('span', { className: 'proof-strip__item', role: 'listitem', text: item }));
  }
  return strip;
}

export function ServiceCard({ title, body }) {
  const card = el('article', { className: 'card' });
  card.appendChild(el('h3', { className: 'card__title', text: title }));
  card.appendChild(el('p', { className: 'card__body', text: body }));
  return card;
}

export function ServiceCardGrid(heading, cards) {
  const section = el('section', { className: 'landing-section panel' });
  section.appendChild(sectionHeading(heading));
  const grid = el('div', { className: 'card-grid card-grid--3' });
  for (const card of cards) {
    grid.appendChild(ServiceCard(card));
  }
  section.appendChild(grid);
  return section;
}

export function FitListSection(heading, items, modifier = '') {
  const section = el('section', {
    className: `landing-section panel${modifier ? ` ${modifier}` : ''}`,
  });
  section.appendChild(sectionHeading(heading));
  const list = el('ul', { className: 'fit-list' });
  for (const item of items) {
    list.appendChild(el('li', { text: item }));
  }
  section.appendChild(list);
  return section;
}

export function ProcessSteps(heading, intro, steps) {
  const section = el('section', { className: 'landing-section panel' });
  section.appendChild(sectionHeading(heading));
  if (intro) section.appendChild(el('p', { className: 'section-lead', text: intro }));
  const list = el('ol', { className: 'process-list' });
  for (const step of steps) {
    list.appendChild(el('li', { text: step }));
  }
  section.appendChild(list);
  return section;
}

export function CopySection(heading, copy, bullets) {
  const section = el('section', { className: 'landing-section panel' });
  section.appendChild(sectionHeading(heading));
  section.appendChild(el('p', { className: 'section-lead', text: copy }));
  if (bullets?.length) {
    const list = el('ul', { className: 'fit-list' });
    for (const item of bullets) {
      list.appendChild(el('li', { text: item }));
    }
    section.appendChild(list);
  }
  return section;
}

export function PhilosophySection(heading, copy) {
  const section = el('section', { className: 'landing-section panel' });
  section.appendChild(sectionHeading(heading));
  section.appendChild(el('p', { className: 'section-lead', text: copy }));
  return section;
}

export function CTASection({ heading, copy, label, href }) {
  const section = el('section', { className: 'landing-section landing-section--cta panel' });
  section.appendChild(sectionHeading(heading));
  section.appendChild(el('p', { className: 'section-lead', text: copy }));
  const actions = el('div', { className: 'hero__actions' });
  actions.appendChild(el('a', { href, className: 'btn btn--primary', text: label }));
  section.appendChild(actions);
  return section;
}

export function FAQSection(heading, items) {
  const section = el('section', { className: 'landing-section panel faq-section', 'aria-labelledby': 'faq-heading' });
  const h2 = sectionHeading(heading);
  h2.id = 'faq-heading';
  section.appendChild(h2);
  const dl = el('dl', { className: 'faq' });
  for (const { question, answer } of items) {
    dl.appendChild(el('dt', { className: 'faq__question', text: question }));
    dl.appendChild(el('dd', { className: 'faq__answer', text: answer }));
  }
  section.appendChild(dl);
  return section;
}

export function InternalLinks(relatedKeys) {
  const { internalLinks } = founderShared;
  const section = el('section', { className: 'landing-section internal-links panel' });
  section.appendChild(sectionHeading('Related'));
  const nav = el('nav', { className: 'internal-links__nav', 'aria-label': 'Related founder pages' });
  for (const key of relatedKeys) {
    const link = internalLinks[key];
    if (!link) continue;
    nav.appendChild(
      el('a', { href: link.href, className: 'internal-links__link', text: link.label })
    );
  }
  section.appendChild(nav);
  return section;
}
