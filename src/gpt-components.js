import { el, sectionHeading } from './dom-utils.js';

export function PromptListSection(heading, prompts) {
  const section = el('section', { className: 'landing-section panel' });
  section.appendChild(sectionHeading(heading));
  const list = el('div', { className: 'prompt-list', role: 'list' });
  for (const prompt of prompts) {
    list.appendChild(
      el('blockquote', {
        className: 'prompt-block',
        role: 'listitem',
        text: prompt,
      })
    );
  }
  section.appendChild(list);
  return section;
}

function ModeCard({ title, body }) {
  const card = el('article', { className: 'card' });
  card.appendChild(el('h3', { className: 'card__title', text: title }));
  card.appendChild(el('p', { className: 'card__body', text: body }));
  return card;
}

export function ModeGridSection(heading, modes) {
  const section = el('section', { className: 'landing-section panel' });
  section.appendChild(sectionHeading(heading));
  const grid = el('div', { className: 'card-grid card-grid--2' });
  for (const mode of modes) {
    grid.appendChild(ModeCard(mode));
  }
  section.appendChild(grid);
  return section;
}

export function PlaybookLinksSection(heading, links) {
  const section = el('section', { className: 'landing-section internal-links panel' });
  section.appendChild(sectionHeading(heading));
  const nav = el('nav', { className: 'internal-links__nav', 'aria-label': 'Related playbooks' });
  for (const link of links) {
    nav.appendChild(
      el('a', { href: link.href, className: 'internal-links__link', text: link.label })
    );
  }
  section.appendChild(nav);
  return section;
}
