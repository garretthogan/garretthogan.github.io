import { el } from './dom-utils.js';
import { founderShared } from './founder-content.js';
import { siteContent } from './site-content.js';

export function renderSiteHeader({ variant = 'home' } = {}) {
  const header = el('header', { className: 'site-header', id: 'site-header' });
  const brandHref = variant === 'home' ? '#hero' : '/';
  header.appendChild(el('a', { className: 'site-header__brand', href: brandHref, text: 'Garrett Hogan' }));

  const nav = el('nav', { className: 'site-header__nav', 'aria-label': 'Primary' });

  if (variant === 'home') {
    nav.appendChild(
      el('a', { className: 'site-header__link', href: '/founders/', text: 'For Founders' })
    );
  } else if (variant === 'founder') {
    nav.appendChild(
      el('a', { className: 'site-header__link', href: '/founders/', text: 'For Founders' })
    );
    nav.appendChild(
      el('a', { className: 'site-header__link', href: '/', text: 'Home' })
    );
  }

  nav.appendChild(
    el('button', {
      type: 'button',
      className: 'btn btn--primary btn--resume',
      'data-resume-download': '',
      disabled: true,
      text: siteContent.contact.resumeCta,
    })
  );

  header.appendChild(nav);
  return header;
}

export function renderSiteFooter() {
  const footer = el('footer', { className: 'site-footer' });
  const nav = el('nav', { className: 'site-footer__nav', 'aria-label': 'Footer' });
  for (const link of founderShared.footerLinks) {
    nav.appendChild(
      el('a', { href: link.href, className: 'site-footer__link', text: link.label })
    );
  }
  footer.appendChild(nav);
  footer.appendChild(
    el('p', {
      className: 'site-footer__copy',
      text: `© ${new Date().getFullYear()} Garrett Hogan · Ragtag Throne`,
    })
  );
  return footer;
}
