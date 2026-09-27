import { describe, expect, it } from 'vitest';
import { buildExportPdfPagedStyles } from '@/pages/exportPdf/exportPdfPagedStyles';

describe('exportPdf code block fragment chrome', () => {
  it('strips border and radius on page-break seams', () => {
    const css = buildExportPdfPagedStyles('a4');
    expect(css).toContain('.export-pdf-code-frag-continue');
    // Longhands beat `.haim-code-block { border: … !important }` shorthand.
    expect(css).toContain('border-top-style: none');
    expect(css).toContain('border-top-width: 0');
    expect(css).toContain('border-top-left-radius: 0');
    expect(css).toContain('.export-pdf-code-frag-break');
    expect(css).toContain('border-bottom-style: none');
    expect(css).toContain('border-bottom-width: 0');
    expect(css).toContain('border-bottom-left-radius: 0');
  });
});
