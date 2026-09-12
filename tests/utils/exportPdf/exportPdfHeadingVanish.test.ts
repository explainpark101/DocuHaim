/**
 * Regression: Export PDF headings must not vanish at page boundaries near
 * tall fenced code (break-token overwrite, break-after:avoid, or
 * heading + first avoid-chunk Unable to layout / nodeAfter skip).
 */
import { describe, expect, it } from 'vitest';
import { buildExportPdfPagedStyles } from '@/pages/exportPdf/exportPdfPagedStyles';
import { printFontStyles } from '@/pages/exportPdf/exportPdfPrintStyles';
import { resolveCodeBreakTokenReplacement } from '@/utils/exportPdf/pagedJsBreakTokenPatch';
import {
  EXPORT_PDF_CODE_PAGE_CHUNK_FIRST_CLASS,
  packLineHeightsIntoChunks,
  remainingHeightOnPage,
} from '@/utils/exportPdf/splitExportPdfCodeBlocksByPageHeight';

type FakeEl = {
  nodeType: number;
  className: string;
  classList: { contains: (name: string) => boolean };
  childNodes: FakeEl[];
  children: FakeEl[];
  parentElement: FakeEl | null;
  attrs: Record<string, string>;
  getAttribute: (name: string) => string | null;
  closest: (selector: string) => FakeEl | null;
  contains: (other: FakeEl | null | undefined) => boolean;
};

function fakeEl(className: string, attrs: Record<string, string> = {}): FakeEl {
  const classes = new Set(className.split(/\s+/).filter(Boolean));
  const node: FakeEl = {
    nodeType: 1,
    className,
    classList: { contains: (name) => classes.has(name) },
    childNodes: [],
    children: [],
    parentElement: null,
    attrs,
    getAttribute: (name) => attrs[name] ?? null,
    closest(selector) {
      const parts = selector.split(',').map((s) => s.trim().replace(/^\./, ''));
      let cur: FakeEl | null = node;
      while (cur) {
        if (parts.some((p) => cur!.classList.contains(p))) return cur;
        cur = cur.parentElement;
      }
      return null;
    },
    contains(other) {
      let cur: FakeEl | null | undefined = other;
      while (cur) {
        if (cur === node) return true;
        cur = cur.parentElement;
      }
      return false;
    },
  };
  return node;
}

function append(parent: FakeEl, child: FakeEl): void {
  child.parentElement = parent;
  parent.childNodes.push(child);
  parent.children.push(child);
}

function codeOverflowFixture() {
  const codeRoot = fakeEl(
    'md-editor-code export-pdf-code-paged export-pdf-code-page-chunk',
    {
      'data-export-pdf-code-id': '1',
      'data-ref': 'chunk-a',
    },
  );
  const lines = fakeEl('export-pdf-code-lines');
  const line = fakeEl('export-pdf-code-line', { 'data-ref': 'L1' });
  append(codeRoot, lines);
  append(lines, line);
  return {
    codeRoot,
    lines,
    line,
    overflow: {
      startContainer: lines as unknown as Node,
      startOffset: 0,
    },
    source: {
      indexOfRefs: {
        'chunk-a': codeRoot as unknown as Node,
        L1: line as unknown as Node,
      },
      querySelector: () => null,
    } as unknown as ParentNode,
  };
}

describe('export PDF heading vanish regression', () => {
  it('paged styles keep heading break-inside avoid and never set break-after avoid', () => {
    const css = buildExportPdfPagedStyles('a4');
    expect(css).toMatch(
      /\.export-pdf-paged-source h1[\s\S]*?break-inside:\s*avoid/,
    );
    expect(css).not.toContain('break-after: avoid');
    expect(css).not.toContain('page-break-after: avoid');
  });

  it('print styles keep heading break-inside avoid and never set break-after avoid', () => {
    expect(printFontStyles).toMatch(
      /\[data-export-pdf-pages\][\s\S]*?h1[\s\S]*?break-inside:\s*avoid/,
    );
    expect(printFontStyles).not.toContain('break-after: avoid');
    expect(printFontStyles).not.toContain('page-break-after: avoid');
  });

  it('page-chunks are break-inside:auto so leftover space fills (no empty bottom gap)', () => {
    const css = buildExportPdfPagedStyles('a4');
    expect(css).toContain(EXPORT_PDF_CODE_PAGE_CHUNK_FIRST_CLASS);
    expect(css).toMatch(
      /\.md-editor-code\.export-pdf-code-page-chunk[^{]*\{[^}]*break-inside:\s*auto/,
    );
    expect(printFontStyles).toMatch(
      /\.md-editor-code\.export-pdf-code-page-chunk[^{]*\{[^}]*break-inside:\s*auto/,
    );
  });

  it('keeps h1–h6 break tokens when a code page-chunk overflows', () => {
    const { overflow, source } = codeOverflowFixture();
    for (const tag of ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']) {
      const heading = fakeEl(tag, { 'data-ref': `heading-${tag}` });
      expect(
        resolveCodeBreakTokenReplacement(
          { node: heading as unknown as Node, offset: 0 },
          overflow,
          source,
        ),
        `must keep ${tag} token`,
      ).toBeUndefined();
    }
  });

  it('keeps a preceding heading token while still pulling back later sibling chunks', () => {
    const { codeRoot, overflow, source } = codeOverflowFixture();
    const heading = fakeEl('h2', { 'data-ref': 'h-before' });
    expect(
      resolveCodeBreakTokenReplacement(
        { node: heading as unknown as Node, offset: 0 },
        overflow,
        source,
      ),
    ).toBeUndefined();

    const nextChunk = fakeEl(
      'md-editor-code export-pdf-code-paged export-pdf-code-page-chunk',
      {
        'data-export-pdf-code-id': '1',
        'data-ref': 'chunk-b',
      },
    );
    const replaced = resolveCodeBreakTokenReplacement(
      { node: nextChunk as unknown as Node, offset: 0 },
      overflow,
      source,
    );
    expect(replaced?.node).toBe(codeRoot);
  });

  it('falls back for missing tokens on code overflow without inventing a heading skip', () => {
    const { overflow, source, codeRoot } = codeOverflowFixture();
    const fromMissing = resolveCodeBreakTokenReplacement(
      null,
      overflow,
      source,
    );
    expect(fromMissing?.node).toBe(codeRoot);
  });

  it('packs a first chunk that fits leftover under a short heading prefix', () => {
    // Simulate: page 800, prefix (text+heading) used 200 → leftover 600.
    const leftover = remainingHeightOnPage(200, 800);
    expect(leftover).toBe(600);
    const firstBudget = Math.floor(leftover * 0.85);
    const groups = packLineHeightsIntoChunks(
      Array.from({ length: 40 }, () => 20),
      700,
      { chromePx: 24, firstMaxHeightPx: firstBudget },
    );
    expect(groups.length).toBeGreaterThan(1);
    const firstHeight = groups[0]!.length * 20;
    expect(firstHeight).toBeLessThanOrEqual(firstBudget);
  });
});
