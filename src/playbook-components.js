import { el } from './dom-utils.js';

function LineBlock(lines) {
  const block = el('div', { className: 'playbook-block' });
  for (const line of lines) {
    block.appendChild(el('div', { className: 'playbook-block__line', text: line }));
  }
  return block;
}

function LabeledBlock({ label, lines }) {
  const wrapper = el('div', { className: 'playbook-block-group' });
  wrapper.appendChild(el('h3', { className: 'playbook-block__label', text: label }));
  wrapper.appendChild(LineBlock(lines));
  return wrapper;
}

function JsonBlock({ label, code }) {
  const wrapper = el('div', { className: 'playbook-block-group' });
  if (label) {
    wrapper.appendChild(el('h3', { className: 'playbook-block__label', text: label }));
  }
  wrapper.appendChild(el('pre', { className: 'playbook-json' }, [el('code', { text: code })]));
  return wrapper;
}

function RuleCallout(label, text) {
  return el('p', { className: 'playbook-rule', text: `${label}: ${text}` });
}

function renderBlock(block) {
  switch (block.type) {
    case 'labeled':
      return LabeledBlock(block);
    case 'lines':
      return LineBlock(block.lines);
    case 'code':
    case 'json':
      return JsonBlock(block);
    default:
      return null;
  }
}

export function PlaybookPromise(text) {
  const section = el('section', { className: 'landing-section panel playbook-promise-section' });
  section.appendChild(el('blockquote', { className: 'playbook-promise', text }));
  return section;
}

export function PlaybookSection({
  number,
  title,
  paragraphs,
  blocks = [],
  rule,
  ruleLabel = 'MVP rule',
  closingParagraphs = [],
}) {
  const section = el('section', { className: 'landing-section panel playbook-section' });
  section.appendChild(
    el('h2', { className: 'playbook-section__title', text: `${number}. ${title}` })
  );

  for (const paragraph of paragraphs) {
    section.appendChild(el('p', { className: 'playbook-section__copy', text: paragraph }));
  }

  for (const block of blocks) {
    const node = renderBlock(block);
    if (node) section.appendChild(node);
  }

  for (const paragraph of closingParagraphs) {
    section.appendChild(el('p', { className: 'playbook-section__copy', text: paragraph }));
  }

  if (rule) section.appendChild(RuleCallout(ruleLabel, rule));

  return section;
}
