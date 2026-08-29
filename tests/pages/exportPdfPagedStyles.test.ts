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
    expect(css).toContain('line-height: 1.7');
    expect(css).toContain('rgba(135, 131, 120, 0.15)');
    expect(css).toContain('#282c34');
    expect(css).toContain('.md-editor-copy-button');
    expect(css).not.toContain('@media print');
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
