import { describe, expect, it } from 'vitest';
import { buildExportPdfPagedStyles } from '@/pages/exportPdf/exportPdfPagedStyles';
import { PRINT_BODY_PAGE_ATTR } from '@/utils/print/printBodyPage';

describe('exportPdf paged styles', () => {
  it('emits @page size and pgbr break-before for A4', () => {
    const css = buildExportPdfPagedStyles('a4');
    expect(css).toContain('@page');
    expect(css).toContain('size: A4');
    expect(css).toContain('.md-pgbr');
    expect(css).toContain('break-before: page');
    expect(css).toContain('.export-pdf-paged-source');
    expect(css).toContain('.pagedjs_page_content');
    expect(css).toContain('font-size: 1.75em');
    expect(css).toContain('font-size: 16px');
    expect(css).toContain('line-height: 1.7');
    expect(css).toContain('line-height: 1.35');
    expect(css).toContain('#fafafa');
    expect(css).toContain('break-inside: auto');
    expect(css).not.toContain('.md-editor-code {\n  break-inside: avoid');
    expect(css).toContain('rgba(135, 131, 120, 0.15)');
    expect(css).toContain('.md-editor-copy-button');
    expect(css).toContain('.md-editor-mermaid[data-processed]');
    expect(css).toContain('.md-editor-mermaid-action');
    expect(css).toContain('align-items: center');
    expect(css).not.toContain('@media print');
  });

  it('inlines custom body/heading line-heights for paged measure', () => {
    const css = buildExportPdfPagedStyles('a4', {
      bodyLineHeight: '2',
      headingLineHeight: '1.2',
      baseFontSizePx: '18',
    });
    expect(css).toContain('line-height: 2');
    expect(css).toContain('line-height: 1.2');
    expect(css).toContain('font-size: 18px');
  });

  it('keeps landscape descriptor for a4-landscape', () => {
    const css = buildExportPdfPagedStyles('a4-landscape');
    expect(css).toContain('A4 landscape');
  });
});

describe('printBodyPage', () => {
  it('exports stable body page attribute name', () => {
    expect(PRINT_BODY_PAGE_ATTR).toBe('data-print-body-page');
  });
});
