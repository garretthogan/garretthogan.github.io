import { el } from './dom-utils.js';
import { founderShared } from './founder-content.js';

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
      text: `© ${new Date().getFullYear()} Ragtag Throne · Creative technology agency led by Garrett Hogan`,
    })
  );
  return footer;
}
