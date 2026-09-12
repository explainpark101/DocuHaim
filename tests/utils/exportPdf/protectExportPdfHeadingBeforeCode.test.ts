import { describe, expect, it } from 'vitest';
import {
  EXPORT_PDF_BREAK_BEFORE_PAGE_CLASS,
  EXPORT_PDF_HEADING_BEFORE_CODE_CLASS,
  findHeadingImmediatelyBeforeCode,
  protectHeadingBeforeCodeFence,
  shouldForceBreakBeforeHeadingBeforeCode,
} from '@/utils/exportPdf/protectExportPdfHeadingBeforeCode';
import { buildExportPdfPagedStyles } from '@/pages/exportPdf/exportPdfPagedStyles';
import { printFontStyles } from '@/pages/exportPdf/exportPdfPrintStyles';
import { resolveCodeBreakTokenReplacement } from '@/utils/exportPdf/pagedJsBreakTokenPatch';

type FakeEl = {
  nodeType: number;
  tagName: string;
  className: string;
  classList: {
    contains: (name: string) => boolean;
    add: (...names: string[]) => void;
    remove: (...names: string[]) => void;
  };
  childNodes: FakeEl[];
  children: FakeEl[];
  parentElement: FakeEl | null;
  previousElementSibling: FakeEl | null;
  attrs: Record<string, string>;
  getAttribute: (name: string) => string | null;
  setAttribute: (name: string, value: string) => void;
  closest: (selector: string) => FakeEl | null;
  contains: (other: FakeEl | null | undefined) => boolean;
  append: (...nodes: FakeEl[]) => void;
};

function fakeEl(
  tagName: string,
  className = '',
  attrs: Record<string, string> = {},
): FakeEl {
  const classes = new Set(className.split(/\s+/).filter(Boolean));
  const node: FakeEl = {
    nodeType: 1,
    tagName: tagName.toUpperCase(),
    className,
    classList: {
      contains: (name) => classes.has(name),
      add: (...names) => {
        for (const n of names) classes.add(n);
        node.className = [...classes].join(' ');
      },
      remove: (...names) => {
        for (const n of names) classes.delete(n);
        node.className = [...classes].join(' ');
      },
    },
    childNodes: [],
    children: [],
    parentElement: null,
    previousElementSibling: null,
    attrs,
    getAttribute: (name) => attrs[name] ?? null,
    setAttribute: (name, value) => {
      attrs[name] = value;
    },
    closest(selector) {
      const parts = selector.split(',').map((s) => s.trim().replace(/^\./, ''));
      let cur: FakeEl | null = node;
      while (cur) {
        if (parts.some((p) => cur!.classList.contains(p) || cur!.tagName === p.toUpperCase())) {
          return cur;
        }
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
    append(...kids) {
      for (const kid of kids) {
        kid.parentElement = node;
        if (node.children.length) {
          kid.previousElementSibling = node.children[node.children.length - 1]!;
        }
        node.childNodes.push(kid);
        node.children.push(kid);
      }
    },
  };
  return node;
}

describe('shouldForceBreakBeforeHeadingBeforeCode', () => {
  it('forces break when leftover cannot fit heading + min code', () => {
    expect(
      shouldForceBreakBeforeHeadingBeforeCode({
        remainingBeforeHeadingPx: 80,
        headingHeightPx: 40,
        minCodePx: 96,
      }),
    ).toBe(true);
  });

  it('does not force break when leftover fits heading + code start', () => {
    expect(
      shouldForceBreakBeforeHeadingBeforeCode({
        remainingBeforeHeadingPx: 400,
        headingHeightPx: 40,
        minCodePx: 96,
      }),
    ).toBe(false);
  });
});

describe('protectHeadingBeforeCodeFence', () => {
  it('marks heading before code and forces page break when space is tight', () => {
    const parent = fakeEl('div', 'export-pdf-paged-source');
    const heading = fakeEl('h2');
    const code = fakeEl('div', 'md-editor-code export-pdf-code-paged');
    parent.append(heading, code);

    const result = protectHeadingBeforeCodeFence(code as unknown as HTMLElement, {
      remainingBeforeHeadingPx: 50,
      headingHeightPx: 36,
    });

    expect(result.heading).toBe(heading);
    expect(result.forcedBreakBefore).toBe(true);
    expect(heading.classList.contains(EXPORT_PDF_HEADING_BEFORE_CODE_CLASS)).toBe(
      true,
    );
    expect(heading.classList.contains(EXPORT_PDF_BREAK_BEFORE_PAGE_CLASS)).toBe(
      true,
    );
  });

  it('marks heading but does not force break when leftover is ample', () => {
    const parent = fakeEl('div');
    const heading = fakeEl('h3');
    const code = fakeEl('div', 'md-editor-code');
    parent.append(heading, code);

    const result = protectHeadingBeforeCodeFence(code as unknown as HTMLElement, {
      remainingBeforeHeadingPx: 500,
      headingHeightPx: 36,
    });

    expect(result.forcedBreakBefore).toBe(false);
    expect(heading.classList.contains(EXPORT_PDF_HEADING_BEFORE_CODE_CLASS)).toBe(
      true,
    );
    expect(heading.classList.contains(EXPORT_PDF_BREAK_BEFORE_PAGE_CLASS)).toBe(
      false,
    );
  });

  it('finds heading even when an md-pgbr marker precedes the heading', () => {
    const parent = fakeEl('div');
    const pgbr = fakeEl('div', 'md-pgbr');
    const heading = fakeEl('h1');
    const code = fakeEl('div', 'md-editor-code');
    parent.append(pgbr, heading, code);
    expect(findHeadingImmediatelyBeforeCode(code as unknown as HTMLElement)).toBe(
      heading,
    );
  });
});

describe('heading-before-code styles and break tokens', () => {
  it('emits break-before:page for the forced-break class in paged + print CSS', () => {
    const css = buildExportPdfPagedStyles('a4');
    expect(css).toContain(EXPORT_PDF_BREAK_BEFORE_PAGE_CLASS);
    expect(css).toMatch(
      /\.export-pdf-break-before-page[^{]*\{[^}]*break-before:\s*page/,
    );
    expect(printFontStyles).toContain(EXPORT_PDF_BREAK_BEFORE_PAGE_CLASS);
    expect(printFontStyles).toMatch(
      /\.export-pdf-break-before-page[^{]*\{[^}]*break-before:\s*page/,
    );
  });

  it('still keeps heading break tokens when code overflows (no overwrite)', () => {
    const codeRoot = fakeEl(
      'div',
      'md-editor-code export-pdf-code-paged export-pdf-code-page-chunk',
      { 'data-ref': 'chunk-a', 'data-export-pdf-code-id': '1' },
    );
    const lines = fakeEl('div', 'export-pdf-code-lines');
    const line = fakeEl('div', 'export-pdf-code-line', { 'data-ref': 'L1' });
    codeRoot.append(lines);
    lines.append(line);

    const heading = fakeEl('h2', '', { 'data-ref': 'h-before' });
    const source = {
      indexOfRefs: {
        'chunk-a': codeRoot as unknown as Node,
        L1: line as unknown as Node,
      },
      querySelector: () => null,
    } as unknown as ParentNode;

    expect(
      resolveCodeBreakTokenReplacement(
        { node: heading as unknown as Node, offset: 0 },
        { startContainer: lines as unknown as Node, startOffset: 0 },
        source,
      ),
    ).toBeUndefined();
  });
});
