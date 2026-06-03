import { siteContent } from './site-content.js';
import { el, sectionHeading } from './dom-utils.js';
import { renderSiteFooter } from './site-shell.js';

function renderEmailRow(email, { github, linkedin }) {
  const row = el('div', { className: 'contact-row' });
  const emailWrap = el('span', { className: 'contact-row__email' });
  emailWrap.appendChild(
    el('a', { href: `mailto:${email}`, className: 'contact-link', text: email })
  );
  emailWrap.appendChild(createCopyButton(email));
  row.appendChild(emailWrap);
  for (const link of [github, linkedin].filter(Boolean)) {
    row.appendChild(
      el('a', {
        href: link.url,
        className: 'contact-link',
        target: '_blank',
        rel: 'noopener noreferrer',
        text: link.label,
      })
    );
  }
  return row;
}

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

function renderCaseStudyLink({ label, url, description }) {
  const block = el('div', { className: 'case-study-link' });
  block.appendChild(
    el('a', {
      href: url,
      className: 'case-study-link__anchor',
      target: '_blank',
      rel: 'noopener noreferrer',
      title: description,
      text: label,
    })
  );
  block.appendChild(el('p', { className: 'case-study-link__desc', text: description }));
  return block;
}

function renderHero() {
  const { hero, skillsLine } = siteContent;
  const section = el('section', { className: 'landing-section landing-section--hero panel', id: 'hero' });

  section.appendChild(el('p', { className: 'hero__eyebrow', text: 'Garrett Hogan' }));
  section.appendChild(el('h1', { className: 'hero__headline', text: hero.headline }));
  section.appendChild(el('p', { className: 'hero__subhead', text: hero.subhead }));
  section.appendChild(el('p', { className: 'hero__lead', text: hero.lead }));
  section.appendChild(el('p', { className: 'hero__skills', text: skillsLine }));

  const actions = el('div', { className: 'hero__actions' });
  actions.appendChild(
    el('a', { href: hero.primaryCta.href, className: 'btn btn--secondary', text: hero.primaryCta.label })
  );
  actions.appendChild(
    el('button', {
      type: 'button',
      className: 'btn btn--primary',
      'data-resume-download': '',
      disabled: true,
      text: hero.secondaryCta.label,
    })
  );
  actions.appendChild(
    el('a', { href: hero.contactCta.href, className: 'btn btn--secondary', text: hero.contactCta.label })
  );
  section.appendChild(actions);
  section.appendChild(renderEmailRow(hero.email, hero));

  return section;
}

function renderRoleFit() {
  const section = el('section', {
    className: 'landing-section landing-section--role-fit panel',
    id: 'role-fit',
  });
  section.appendChild(sectionHeading('What I bring'));
  const grid = el('div', { className: 'card-grid card-grid--3' });
  for (const card of siteContent.roleFit) {
    const item = el('article', { className: 'card' });
    item.appendChild(el('h3', { className: 'card__title', text: card.title }));
    item.appendChild(el('p', { className: 'card__body', text: card.body }));
    grid.appendChild(item);
  }
  section.appendChild(grid);
  return section;
}

function renderCaseStudies() {
  const section = el('section', {
    className: 'landing-section landing-section--work panel',
    id: 'selected-work',
  });
  section.appendChild(sectionHeading('Selected experience'));
  const grid = el('div', { className: 'card-grid card-grid--3' });
  for (const study of siteContent.caseStudies) {
    const item = el('article', { className: 'card card--study' });
    item.appendChild(el('h3', { className: 'card__title', text: study.title }));
    const summaryParts = Array.isArray(study.summary) ? study.summary : [study.summary];
    for (const part of summaryParts) {
      item.appendChild(el('p', { className: 'card__body', text: part }));
    }
    const links = study.links ?? (study.link ? [study.link] : []);
    for (const link of links) {
      item.appendChild(renderCaseStudyLink(link));
    }
    grid.appendChild(item);
  }
  section.appendChild(grid);

  section.appendChild(renderExperienceOverview());

  return section;
}

function renderExperienceOverview() {
  const { experienceOverview } = siteContent;
  const card = el('article', { className: 'experience-overview' });
  for (const paragraph of experienceOverview.paragraphs) {
    card.appendChild(el('p', { className: 'experience-overview__p', text: paragraph }));
  }
  return card;
}

function renderHowIWork() {
  const { howIWork } = siteContent;
  const section = el('section', {
    className: 'landing-section landing-section--process panel',
    id: 'how-i-work',
  });
  section.appendChild(sectionHeading('How I work'));
  section.appendChild(el('p', { className: 'section-lead', text: howIWork.intro }));
  section.appendChild(el('p', { className: 'section-lead', text: howIWork.approach }));
  section.appendChild(el('p', { className: 'section-closing', text: howIWork.closing }));
  return section;
}

function renderRolesLookingFor() {
  const { rolesLookingFor } = siteContent;
  const section = el('section', {
    className: 'landing-section landing-section--roles panel',
    id: 'roles',
  });
  section.appendChild(sectionHeading('Roles I’m looking for'));
  section.appendChild(el('p', { className: 'roles-intro', text: rolesLookingFor.intro }));
  const list = el('ul', { className: 'roles-list roles-list--titles' });
  for (const title of rolesLookingFor.titles) {
    list.appendChild(el('li', { text: title }));
  }
  section.appendChild(list);
  section.appendChild(el('p', { className: 'roles-closing', text: rolesLookingFor.closing }));
  return section;
}

function renderContact() {
  const { contact } = siteContent;
  const section = el('section', {
    className: 'landing-section landing-section--contact panel',
    id: 'contact',
  });
  section.appendChild(sectionHeading('Get in touch'));
  const actions = el('div', { className: 'hero__actions' });
  actions.appendChild(
    el('a', {
      href: contact.primaryCta.href,
      className: 'btn btn--primary',
      text: contact.primaryCta.label,
    })
  );
  actions.appendChild(
    el('button', {
      type: 'button',
      className: 'btn btn--secondary',
      'data-resume-download': '',
      disabled: true,
      text: contact.resumeCta,
    })
  );
  actions.appendChild(
    el('a', { href: '#selected-work', className: 'btn btn--secondary', text: 'View Selected Work' })
  );
  section.appendChild(actions);
  section.appendChild(renderEmailRow(contact.email, contact));
  return section;
}

export function renderLanding() {
  const root = document.getElementById('landing-root');
  if (!root) return;

  const fragment = document.createDocumentFragment();
  fragment.appendChild(renderHero());
  fragment.appendChild(renderRoleFit());
  fragment.appendChild(renderCaseStudies());
  fragment.appendChild(renderHowIWork());
  fragment.appendChild(renderRolesLookingFor());
  fragment.appendChild(renderContact());
  root.appendChild(fragment);

  const landing = document.getElementById('landing-root');
  if (landing?.parentNode) {
    landing.parentNode.appendChild(renderSiteFooter());
  }
}
