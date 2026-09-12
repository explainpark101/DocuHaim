import { describe, expect, it } from 'vitest';
import { insertSoftBreaksInText } from '@/utils/exportPdf/sanitizeExportPdfPagedSource';
import { buildExportPdfPagedStyles } from '@/pages/exportPdf/exportPdfPagedStyles';

describe('sanitizeExportPdfPagedSource', () => {
  it('inserts zero-width spaces into long unbroken runs', () => {
    const long = 'a'.repeat(100);
    const next = insertSoftBreaksInText(long, 48);
    expect(next.includes('\u200b')).toBe(true);
    expect(next.replace(/\u200b/g, '')).toBe(long);
  });

  it('leaves short text unchanged', () => {
    expect(insertSoftBreaksInText('hello world')).toBe('hello world');
  });
});

describe('exportPdfPagedStyles code paging', () => {
  it('uses line-level avoid; page-chunks stay splittable so pages fill densely', () => {
    const css = buildExportPdfPagedStyles('a4');
    expect(css).toContain('.export-pdf-code-pre');
    expect(css).toContain('.export-pdf-code-body');
    expect(css).toContain('.export-pdf-code-line');
    expect(css).toMatch(/\.export-pdf-code-line[^{]*\{[^}]*display:\s*block/);
    expect(css).toMatch(/\.export-pdf-code-line[^{]*\{[^}]*break-inside:\s*avoid/);
    expect(css).toContain('export-pdf-code-page-chunk');
    expect(css).toMatch(
      /\.md-editor-code\.export-pdf-code-page-chunk[^{]*\{[^}]*break-inside:\s*auto/,
    );
    expect(css).toMatch(
      /\.md-editor-code\.export-pdf-code-page-chunk[^{]*\{[^}]*margin:\s*0\s*!important/,
    );
    expect(css).not.toMatch(
      /\.export-pdf-code-line[^{]*\{[^}]*display:\s*flex/,
    );
  });
});
