import { portfolioContent } from './portfolio-content.js';
import { el, sectionHeading } from './dom-utils.js';
import { renderSiteFooter } from './site-shell.js';

function createCopyButton(email) {
  const btn = el('button', {
    type: 'button',
    className: 'btn btn--ghost btn--copy',
    text: 'Copy',
    'aria-label': `Copy ${email}`,
  });
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(email);
      const prev = btn.textContent;
      btn.textContent = 'Copied';
      setTimeout(() => {
        btn.textContent = prev;
      }, 2000);
    } catch {
      btn.textContent = 'Failed';
      setTimeout(() => {
        btn.textContent = 'Copy';
      }, 2000);
    }
  });
  return btn;
}

function renderLinkRow(email, links = []) {
  const row = el('div', { className: 'contact-row' });
  const emailWrap = el('span', { className: 'contact-row__email' });
  emailWrap.appendChild(
    el('a', { href: `mailto:${email}`, className: 'contact-link', text: email })
  );
  emailWrap.appendChild(createCopyButton(email));
  row.appendChild(emailWrap);

  for (const link of links.filter(Boolean)) {
    row.appendChild(
      el('a', {
        href: link.url ?? link.href,
        className: 'contact-link',
        target: link.url ? '_blank' : undefined,
        rel: link.url ? 'noopener noreferrer' : undefined,
        text: link.label,
      })
    );
  }

  return row;
}

function renderActions(actions = []) {
  const row = el('div', { className: 'hero__actions' });
  for (const action of actions) {
    if (action.resumeDownload) {
      row.appendChild(
        el('button', {
          type: 'button',
          className: `btn btn--${action.variant ?? 'secondary'}`,
          'data-resume-download': '',
          disabled: true,
          text: action.label,
        })
      );
      continue;
    }

    row.appendChild(
      el('a', {
        href: action.href,
        className: `btn btn--${action.variant ?? 'secondary'}`,
        text: action.label,
      })
    );
  }
  return row;
}

function renderHero() {
  const { hero } = portfolioContent;
  const section = el('section', {
    className: 'landing-section landing-section--hero portfolio-hero',
    id: 'hero',
  });

  section.appendChild(el('p', { className: 'hero__eyebrow', text: hero.eyebrow }));
  section.appendChild(el('h1', { className: 'hero__headline', text: hero.headline }));
  section.appendChild(el('p', { className: 'hero__lead', text: hero.lead }));
  section.appendChild(renderActions(hero.actions));
  section.appendChild(renderLinkRow(hero.email, hero.links));

  return section;
}

function renderProofStrip() {
  const strip = el('div', { className: 'proof-strip panel', role: 'list' });
  for (const item of portfolioContent.proofStrip) {
    strip.appendChild(el('span', { className: 'proof-strip__item', role: 'listitem', text: item }));
  }
  return strip;
}

function renderCard({ title, body }, className = 'card') {
  const item = el('article', { className });
  item.appendChild(el('h3', { className: 'card__title', text: title }));
  item.appendChild(el('p', { className: 'card__body', text: body }));
  return item;
}

function renderExperience() {
  const { experience } = portfolioContent;
  const section = el('section', {
    className: 'landing-section landing-section--experience panel',
    id: 'experience',
  });
  section.appendChild(sectionHeading(experience.heading));
  section.appendChild(
    el('h3', {
      className: 'experience-role',
      text: `${experience.role} · ${experience.timeframe}`,
    })
  );
  section.appendChild(el('p', { className: 'section-lead', text: experience.intro }));
  const list = el('ul', { className: 'experience-list' });
  for (const highlight of experience.highlights) {
    list.appendChild(el('li', { text: highlight }));
  }
  section.appendChild(list);
  return section;
}

function renderSkills() {
  const section = el('section', {
    className: 'landing-section landing-section--skills panel',
    id: 'skills',
  });
  section.appendChild(sectionHeading('Core Strengths'));
  const grid = el('div', { className: 'card-grid card-grid--4' });
  for (const skill of portfolioContent.skills) {
    grid.appendChild(renderCard(skill));
  }
  section.appendChild(grid);
  return section;
}

function renderIndependentWork() {
  const section = el('section', {
    className: 'landing-section landing-section--work panel',
    id: 'independent-work',
  });
  section.appendChild(sectionHeading('Independent Product Work'));
  const grid = el('div', { className: 'card-grid card-grid--3' });
  for (const project of portfolioContent.independentWork) {
    const card = renderCard(project, 'card card--project');
    card.appendChild(
      el('a', {
        href: project.link.url,
        className: 'project-link',
        target: '_blank',
        rel: 'noopener noreferrer',
        text: project.link.label,
      })
    );
    grid.appendChild(card);
  }
  section.appendChild(grid);
  return section;
}

function renderResumeSnapshot() {
  const { resumeSnapshot } = portfolioContent;
  const section = el('section', {
    className: 'landing-section landing-section--resume panel',
    id: 'resume',
  });
  section.appendChild(sectionHeading(resumeSnapshot.heading));
  section.appendChild(el('p', { className: 'section-lead', text: resumeSnapshot.lead }));

  const groups = el('div', { className: 'resume-snapshot' });
  for (const group of resumeSnapshot.groups) {
    const block = el('div', { className: 'resume-snapshot__group' });
    block.appendChild(el('h3', { className: 'stack-group__label', text: group.label }));
    block.appendChild(el('p', { className: 'stack-group__tools', text: group.text }));
    groups.appendChild(block);
  }
  section.appendChild(groups);
  section.appendChild(renderActions([{ label: 'Download Resume', variant: 'primary', resumeDownload: true }]));
  return section;
}

function renderContact() {
  const { contact } = portfolioContent;
  const section = el('section', {
    className: 'landing-section landing-section--contact panel',
    id: 'contact',
  });
  section.appendChild(sectionHeading(contact.heading));
  section.appendChild(el('p', { className: 'section-lead', text: contact.lead }));
  section.appendChild(renderActions(contact.actions));
  section.appendChild(renderLinkRow(contact.email, contact.links));
  return section;
}

export function renderPortfolio() {
  const root = document.getElementById('portfolio-root');
  if (!root) return;

  const fragment = document.createDocumentFragment();
  fragment.appendChild(renderHero());
  fragment.appendChild(renderProofStrip());
  fragment.appendChild(renderExperience());
  fragment.appendChild(renderSkills());
  fragment.appendChild(renderIndependentWork());
  fragment.appendChild(renderResumeSnapshot());
  fragment.appendChild(renderContact());
  root.appendChild(fragment);

  if (root.parentNode) {
    root.parentNode.appendChild(renderSiteFooter());
  }
}
