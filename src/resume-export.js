import { siteContent } from './site-content.js';

export async function initResumeExport() {
  const contentEl = document.getElementById('resume-pdf-source');
  if (!contentEl) return;

  try {
    const res = await fetch(siteContent.resumeUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const raw = await res.text();
    contentEl.innerHTML = window.marked.parse(raw, { gfm: true });
    contentEl.classList.add('resume-pdf-source--loaded');
    enableResumeButtons();
  } catch (err) {
    console.error('Resume load failed:', err);
  }

  document.querySelectorAll('[data-resume-download]').forEach((btn) => {
    btn.addEventListener('click', () => exportPdf(contentEl, btn));
  });
}

function enableResumeButtons() {
  document.querySelectorAll('[data-resume-download]').forEach((btn) => {
    btn.disabled = false;
  });
}

function exportPdf(contentEl, triggerBtn) {
  if (!contentEl?.classList.contains('resume-pdf-source--loaded') || !window.html2pdf) {
    return;
  }

  const loadingOverlay = document.getElementById('pdf-loading-overlay');
  if (loadingOverlay) {
    loadingOverlay.classList.remove('loading-overlay--hidden');
    loadingOverlay.style.transition = 'none';
    loadingOverlay.style.opacity = '1';
    loadingOverlay.style.visibility = 'visible';
  }

  const buttons = document.querySelectorAll('[data-resume-download]');
  buttons.forEach((b) => {
    b.disabled = true;
  });

  const opt = {
    margin: [10, 10, 10, 10],
    filename: siteContent.pdfFilename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, scrollX: 0, scrollY: 0 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: {
      mode: 'css',
      before: '.pdf-section--new-page',
      avoid: 'h2, h3',
    },
  };

  function cleanup() {
    unwrapSections(contentEl);
    document.body.classList.remove('pdf-exporting');
    contentEl.classList.remove('pdf-export-content');
    contentEl.setAttribute('hidden', '');
    contentEl.setAttribute('aria-hidden', 'true');
    contentEl.style.paddingBottom = '';
    enableResumeButtons();
    if (loadingOverlay) {
      loadingOverlay.style.transition = '';
      loadingOverlay.style.opacity = '';
      loadingOverlay.style.visibility = '';
      loadingOverlay.classList.add('loading-overlay--hidden');
    }
  }

  function runExport() {
    const prevScroll = { x: window.scrollX, y: window.scrollY };
    window.scrollTo(0, 0);
    contentEl.removeAttribute('hidden');
    contentEl.setAttribute('aria-hidden', 'false');
    document.body.classList.add('pdf-exporting');
    contentEl.classList.add('pdf-export-content');
    wrapSectionsForPdf(contentEl);
    function finish() {
      cleanup();
      window.scrollTo(prevScroll.x, prevScroll.y);
    }
    window.html2pdf().set(opt).from(contentEl).save().then(finish).catch(finish);
  }

  requestAnimationFrame(() => requestAnimationFrame(runExport));
}

function isPageBreakMarker(el) {
  if (!el || el.nodeType !== 1) return false;
  if (
    el.classList?.contains('pdf-page-break') ||
    el.classList?.contains('html2pdf__page-break')
  ) {
    return true;
  }
  const style = el.getAttribute('style') || '';
  return (
    el.tagName === 'DIV' &&
    /page-break-before:\s*always|break-before:\s*page/i.test(style)
  );
}

function applyPageBreaks(contentEl) {
  let node = contentEl.firstElementChild;
  while (node) {
    const current = node;
    node = node.nextElementSibling;
    if (!isPageBreakMarker(current)) continue;
    const next = current.nextElementSibling;
    if (next?.tagName === 'H2' || next?.tagName === 'H3') {
      next.classList.add('pdf-section--new-page');
    }
    current.remove();
  }
}

function wrapSectionsForPdf(contentEl) {
  applyPageBreaks(contentEl);

  const childNodes = Array.from(contentEl.children);
  const sectionStarts = childNodes
    .map((el, i) => (el.tagName === 'H2' ? i : -1))
    .filter((i) => i >= 0);
  if (sectionStarts.length === 0) return;
  const sections = sectionStarts.map((start, i) => [
    start,
    i + 1 < sectionStarts.length ? sectionStarts[i + 1] : childNodes.length,
  ]);
  let nextDiv = null;
  for (let i = sections.length - 1; i >= 0; i--) {
    const [start, end] = sections[i];
    const div = document.createElement('div');
    div.className = 'pdf-section';
    const heading = childNodes[start];
    if (heading?.classList.contains('pdf-section--new-page')) {
      div.classList.add('pdf-section--new-page');
      heading.classList.remove('pdf-section--new-page');
    }
    for (let j = start; j < end; j++) div.appendChild(childNodes[j]);
    if (nextDiv && nextDiv.parentNode) contentEl.insertBefore(div, nextDiv);
    else contentEl.appendChild(div);
    nextDiv = div;
  }
}

function unwrapSections(contentEl) {
  contentEl.querySelectorAll('.pdf-section').forEach((section) => {
    const parent = section.parentNode;
    while (section.firstChild) parent.insertBefore(section.firstChild, section);
    section.remove();
  });
}

export { exportPdf };
