/** Roots where Mermaid must use the light theme (print / PDF export). */
export const EXPORT_PDF_MERMAID_ROOT_SELECTOR =
  '#export-pdf-preview, [data-export-pdf-preview], .export-pdf-paper-content, .export-pdf-pages';

export type MermaidThemeName = 'dark' | 'default';

export function isExportPdfMermaidContext(el?: Element | null): boolean {
  if (typeof document === 'undefined') return false;
  if (el instanceof Element && el.closest(EXPORT_PDF_MERMAID_ROOT_SELECTOR)) {
    return true;
  }
  return Boolean(document.getElementById('export-pdf-preview'));
}

/** Resolve Mermaid theme for a placeholder or fence (Export PDF always light). */
export function resolveMermaidThemeForHost(el?: Element | null): MermaidThemeName {
  if (isExportPdfMermaidContext(el)) return 'default';
  if (el instanceof Element) {
    const attr = (el.getAttribute('data-mermaid-theme') || '').trim();
    if (attr === 'dark') return 'dark';
    if (attr === 'default') return 'default';
  }
  if (typeof document !== 'undefined' && document.documentElement.classList.contains('dark')) {
    return 'dark';
  }
  return 'default';
}
