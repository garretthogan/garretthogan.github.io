import { portfolioContent } from './portfolio-content.js';
import { el } from './dom-utils.js';

function renderIdentity() {
  const { profile } = portfolioContent;
  const section = el('section', { className: 'profile', 'aria-labelledby': 'portfolio-title' });

  section.appendChild(el('p', { className: 'profile__eyebrow', text: profile.eyebrow }));
  section.appendChild(
    el('h1', { id: 'portfolio-title', className: 'profile__name', text: profile.headline })
  );
  section.appendChild(el('p', { className: 'profile__credential', text: profile.credential }));
  section.appendChild(el('p', { className: 'profile__intro', text: profile.intro }));

  return section;
}

function renderPrimaryLinks() {
  const nav = el('nav', { className: 'primary-nav', 'aria-label': 'Portfolio links' });
  const list = el('ul', { className: 'primary-nav__list' });

  for (const link of portfolioContent.primaryLinks) {
    const attrs = {
      href: link.href,
      className: 'primary-nav__link',
      text: link.label,
    };

    if (link.download) attrs.download = link.download;

    list.appendChild(el('li', {}, [el('a', attrs)]));
  }

  nav.appendChild(list);
  return nav;
}

function renderSelectedWork() {
  const section = el('section', {
    id: 'work',
    className: 'portfolio-section work',
    'aria-labelledby': 'work-heading',
  });
  section.appendChild(
    el('h2', { id: 'work-heading', className: 'portfolio-section__heading', text: 'Selected work' })
  );

  const list = el('ol', { className: 'work-list' });
  for (const project of portfolioContent.selectedWork) {
    const link = el('a', {
      href: project.href,
      className: 'work-item__link',
      'aria-label': `${project.title}: ${project.description}`,
    });
    link.appendChild(el('span', { className: 'work-item__number', text: project.number }));

    const copy = el('span', { className: 'work-item__copy' });
    copy.appendChild(el('span', { className: 'work-item__title', text: project.title }));
    copy.appendChild(el('span', { className: 'work-item__description', text: project.description }));
    link.appendChild(copy);
    link.appendChild(el('span', { className: 'work-item__arrow', 'aria-hidden': 'true', text: '↗' }));

    list.appendChild(el('li', { className: 'work-item' }, [link]));
  }

  section.appendChild(list);
  return section;
}

function renderExperience() {
  const { experience } = portfolioContent;
  const section = el('section', {
    id: 'experience',
    className: 'portfolio-section experience',
    'aria-labelledby': 'experience-heading',
  });
  section.appendChild(
    el('h2', {
      id: 'experience-heading',
      className: 'portfolio-section__heading',
      text: experience.heading,
    })
  );

  const list = el('div', { className: 'experience__list' });
  for (const item of experience.roles) {
    const entry = el('article', { className: 'experience__entry' });
    const role = el('div', { className: 'experience__role' });
    role.appendChild(el('h3', { text: item.role }));
    role.appendChild(el('p', { text: item.timeframe }));
    entry.appendChild(role);

    if (item.summary) {
      entry.appendChild(el('p', { className: 'experience__summary', text: item.summary }));
    }

    if (item.stack) {
      entry.appendChild(el('p', { className: 'experience__stack', text: item.stack }));
    }

    list.appendChild(entry);
  }
  section.appendChild(list);

  return section;
}

function renderPortfolioFooter() {
  const { footer } = portfolioContent;
  const footerElement = el('footer', { className: 'portfolio-footer' });
  footerElement.appendChild(
    el('p', { className: 'portfolio-footer__availability', text: footer.availability })
  );

  const meta = el('p', { className: 'portfolio-footer__meta' });
  meta.textContent = `© ${new Date().getFullYear()} Garrett Hogan · ${footer.studioLabel}`;
  footerElement.appendChild(meta);

  return footerElement;
}

export function renderPortfolio() {
  const root = document.getElementById('portfolio-root');
  if (!root) return;

  const fragment = document.createDocumentFragment();
  fragment.appendChild(renderIdentity());
  fragment.appendChild(renderPrimaryLinks());
  fragment.appendChild(renderSelectedWork());
  fragment.appendChild(renderExperience());
  fragment.appendChild(renderPortfolioFooter());
  root.replaceChildren(fragment);
}
