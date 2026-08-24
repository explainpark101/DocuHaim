import {
  buildPrintPreviewThemeVarsCss,
  scopeExportPdfPreviewStyles,
} from '@/utils/printPagedCss';

/** Minimal print preview CSS for browser/puppeteer harness tests. */
export function buildPrintTestContentStyles(): string {
  return scopeExportPdfPreviewStyles(`${buildPrintPreviewThemeVarsCss()}
    :is(#export-pdf-preview, [data-export-pdf-preview]),
    :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview {
      background: #ffffff;
      color: #111827;
      font-family: system-ui, sans-serif;
      line-height: 1.6;
    }
  `);
}
