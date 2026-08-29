/**
 * Fenced code-block highlight theme for md-editor-rt (highlight.js).
 * Editor/preview: Atom One Dark for readable tokens on any chrome.
 * Export PDF: Atom One Light (print-friendly).
 */
export const MD_EDITOR_CODE_THEME = 'one-dark' as const;
export const MD_EDITOR_EXPORT_PDF_CODE_THEME = 'one-light' as const;

/** highlight.js atom-one-dark (CDN used by md-editor-rt). */
export const HLJS_ATOM_ONE_DARK_CSS =
  'https://unpkg.com/@highlightjs/cdn-assets@11.10.0/styles/atom-one-dark.min.css';

/** highlight.js atom-one-light for Export PDF / print. */
export const HLJS_ATOM_ONE_LIGHT_CSS =
  'https://unpkg.com/@highlightjs/cdn-assets@11.10.0/styles/atom-one-light.min.css';
