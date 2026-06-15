import { siteContent } from './site-content.js';
import { el, sectionHeading } from './dom-utils.js';
import { renderSiteFooter } from './site-shell.js';

function renderEmailRow(email, { github, linkedin, resume }) {
  const row = el('div', { className: 'contact-row' });
  const emailWrap = el('span', { className: 'contact-row__email' });
  emailWrap.appendChild(
    el('a', { href: `mailto:${email}`, className: 'contact-link', text: email })
  );
  emailWrap.appendChild(createCopyButton(email));
  row.appendChild(emailWrap);
  for (const link of [github, linkedin, resume].filter(Boolean)) {
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

function renderHero() {
  const { hero } = siteContent;
  const section = el('section', { className: 'landing-section landing-section--hero panel', id: 'hero' });

  section.appendChild(el('p', { className: 'hero__eyebrow', text: hero.eyebrow }));
  section.appendChild(el('h1', { className: 'hero__headline', text: hero.headline }));
  section.appendChild(el('p', { className: 'hero__lead', text: hero.lead }));
  section.appendChild(renderEmailRow(hero.email, hero));

  return section;
}

function renderFeaturedProject(project) {
  const item = el('article', { className: 'card card--project' });
  item.appendChild(el('h3', { className: 'card__title', text: project.title }));
  item.appendChild(el('p', { className: 'project-description', text: project.description }));
  item.appendChild(el('p', { className: 'project-built', text: project.whatIBuilt }));

  const skillsBlock = el('div', { className: 'project-skills' });
  skillsBlock.appendChild(el('span', { className: 'project-skills__label', text: 'Skills' }));
  skillsBlock.appendChild(
    el('p', { className: 'project-skills__list', text: project.skills.join(', ') })
  );
  item.appendChild(skillsBlock);

  if (project.link) {
    item.appendChild(
      el('a', {
        href: project.link.url,
        className: 'project-link',
        target: '_blank',
        rel: 'noopener noreferrer',
        text: project.link.label,
      })
    );
  }

  return item;
}

function renderFeaturedWork() {
  const section = el('section', {
    className: 'landing-section landing-section--work panel',
    id: 'featured-work',
  });
  section.appendChild(sectionHeading('Featured Work'));
  const grid = el('div', { className: 'card-grid card-grid--2' });
  for (const project of siteContent.featuredProjects) {
    grid.appendChild(renderFeaturedProject(project));
  }
  section.appendChild(grid);
  return section;
}

function renderWhatIDo() {
  const section = el('section', {
    className: 'landing-section landing-section--what-i-do panel',
    id: 'what-i-do',
  });
  section.appendChild(sectionHeading('What I Do'));
  const grid = el('div', { className: 'card-grid card-grid--3' });
  for (const card of siteContent.whatIDo) {
    const item = el('article', { className: 'card' });
    item.appendChild(el('h3', { className: 'card__title', text: card.title }));
    item.appendChild(el('p', { className: 'card__body', text: card.body }));
    grid.appendChild(item);
  }
  section.appendChild(grid);
  return section;
}

function renderProfessionalExperience() {
  const { professionalExperience } = siteContent;
  const section = el('section', {
    className: 'landing-section landing-section--experience panel',
    id: 'experience',
  });
  section.appendChild(sectionHeading('Professional Experience'));
  if (professionalExperience.role) {
    section.appendChild(el('h3', { className: 'experience-role', text: professionalExperience.role }));
  }
  section.appendChild(el('p', { className: 'section-lead', text: professionalExperience.intro }));
  const list = el('ul', { className: 'experience-list' });
  for (const highlight of professionalExperience.highlights) {
    list.appendChild(el('li', { text: highlight }));
  }
  section.appendChild(list);
  return section;
}

function renderEarlierExperiments() {
  const section = el('section', {
    className: 'landing-section landing-section--experiments panel',
    id: 'experiments',
  });
  section.appendChild(sectionHeading('Earlier Experiments'));
  const list = el('div', { className: 'experiment-links' });
  for (const experiment of siteContent.earlierExperiments) {
    list.appendChild(
      el('a', {
        href: experiment.url,
        className: 'experiment-link',
        target: '_blank',
        rel: 'noopener noreferrer',
        text: experiment.label,
      })
    );
  }
  section.appendChild(list);
  return section;
}

function renderTechnicalStack() {
  const section = el('section', {
    className: 'landing-section landing-section--stack panel',
    id: 'stack',
  });
  section.appendChild(sectionHeading('Technical Stack'));
  const groups = el('div', { className: 'stack-groups' });
  for (const group of siteContent.technicalStack) {
    const block = el('div', { className: 'stack-group' });
    block.appendChild(el('h3', { className: 'stack-group__label', text: group.label }));
    block.appendChild(el('p', { className: 'stack-group__tools', text: group.tools }));
    groups.appendChild(block);
  }
  section.appendChild(groups);
  return section;
}

function renderContact() {
  const { contact } = siteContent;
  const section = el('section', {
    className: 'landing-section landing-section--contact panel',
    id: 'contact',
  });
  section.appendChild(sectionHeading('Contact'));
  section.appendChild(el('p', { className: 'section-lead', text: contact.lead }));
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
    el('a', { href: '#featured-work', className: 'btn btn--secondary', text: 'View Featured Work' })
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
  fragment.appendChild(renderProfessionalExperience());
  fragment.appendChild(renderFeaturedWork());
  fragment.appendChild(renderWhatIDo());
  fragment.appendChild(renderEarlierExperiments());
  fragment.appendChild(renderTechnicalStack());
  fragment.appendChild(renderContact());
  root.appendChild(fragment);

  const landing = document.getElementById('landing-root');
  if (landing?.parentNode) {
    landing.parentNode.appendChild(renderSiteFooter());
  }
}
