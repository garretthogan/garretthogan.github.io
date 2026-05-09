const resumeUrl = '/resume.md';

export async function initPortfolio() {
  const contentEl = document.getElementById('portfolio-content');
  const exportBtn = document.getElementById('portfolio-export-pdf');
  if (!contentEl) return;
  try {
    const res = await fetch(resumeUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const raw = await res.text();
    contentEl.setAttribute('aria-busy', 'false');
    contentEl.innerHTML = window.marked.parse(raw, { gfm: true });
    if (exportBtn) exportBtn.disabled = false;
  } catch (err) {
    contentEl.setAttribute('aria-busy', 'false');
    contentEl.innerHTML = `<p class="portfolio-error">Could not load resume. (${err.message})</p>`;
  }
  if (exportBtn) exportBtn.onclick = () => exportPdf(contentEl, exportBtn);
}

function exportPdf(contentEl, exportBtn) {
  if (!contentEl || !window.html2pdf) return;
  const loadingOverlay = document.getElementById('pdf-loading-overlay');
  if (loadingOverlay) {
    loadingOverlay.classList.remove('loading-overlay--hidden');
    loadingOverlay.style.transition = 'none';
    loadingOverlay.style.opacity = '1';
    loadingOverlay.style.visibility = 'visible';
  }

  exportBtn.disabled = true;

  const opt = {
    margin: [10, 10, 10, 10],
    filename: 'Garrett-Hogan-Resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    // scroll offsets default to window scroll and become empty space at the top of the PDF
    html2canvas: { scale: 2, useCORS: true, scrollX: 0, scrollY: 0 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    // Default includes 'css', which can add an extra page with page-break-* rules on headings.
    pagebreak: { mode: 'legacy' },
  };

  function cleanup() {
    unwrapSections();
    document.body.classList.remove('pdf-exporting');
    contentEl.classList.remove('pdf-export-content');
    contentEl.style.paddingBottom = '';
    exportBtn.disabled = false;
    if (loadingOverlay) {
      loadingOverlay.style.transition = '';
      loadingOverlay.style.opacity = '';
      loadingOverlay.style.visibility = '';
      loadingOverlay.classList.add('loading-overlay--hidden');
    }
  }

  function wrapSectionsForPdf() {
    const childNodes = Array.from(contentEl.children);
    // H2 only: H3 subsections (e.g. Projects → Games / Tools) stay in one block so
    // page-break-inside rules cannot orphan a short section onto the next page.
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
      for (let j = start; j < end; j++) div.appendChild(childNodes[j]);
      if (nextDiv && nextDiv.parentNode) contentEl.insertBefore(div, nextDiv);
      else contentEl.appendChild(div);
      nextDiv = div;
    }
  }

  function unwrapSections() {
    contentEl.querySelectorAll('.pdf-section').forEach((section) => {
      const parent = section.parentNode;
      while (section.firstChild) parent.insertBefore(section.firstChild, section);
      section.remove();
    });
  }

  function runExport() {
    const prevScroll = { x: window.scrollX, y: window.scrollY };
    window.scrollTo(0, 0);
    document.body.classList.add('pdf-exporting');
    contentEl.classList.add('pdf-export-content');
    wrapSectionsForPdf();
    function finish() {
      cleanup();
      window.scrollTo(prevScroll.x, prevScroll.y);
    }
    window.html2pdf().set(opt).from(contentEl).save().then(finish).catch(finish);
  }

  requestAnimationFrame(() => requestAnimationFrame(runExport));
}

