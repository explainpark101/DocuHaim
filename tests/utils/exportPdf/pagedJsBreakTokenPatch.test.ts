import { describe, expect, it } from 'vitest';
import {
  fallbackBreakTokenFromOverflow,
  isExportPdfCodeOverflow,
  isSameOrLaterCodeLine,
  isTokenInsideCodeOverflow,
  resolveCodeBreakTokenReplacement,
  resolveOverflowCodeLine,
} from '@/utils/exportPdf/pagedJsBreakTokenPatch';

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

describe('pagedJsBreakTokenPatch code overflow', () => {
  it('resolves code line from Range.selectNode parent+offset', () => {
    const lines = fakeEl('export-pdf-code-lines');
    const lineA = fakeEl('export-pdf-code-line', { 'data-ref': 'a' });
    const lineB = fakeEl('export-pdf-code-line', { 'data-ref': 'b' });
    append(lines, lineA);
    append(lines, lineB);

    // paged.js selectNode(lineB) → startContainer=lines, startOffset=1
    const overflow = { startContainer: lines as unknown as Node, startOffset: 1 };
    expect(resolveOverflowCodeLine(overflow)).toBe(lineB);
    expect(isExportPdfCodeOverflow(overflow)).toBe(true);
  });

  it('maps overflow parent+offset to source break token via data-ref', () => {
    const renderedLines = fakeEl('export-pdf-code-lines');
    const renderedLine = fakeEl('export-pdf-code-line', { 'data-ref': 'line-3' });
    append(renderedLines, fakeEl('export-pdf-code-line', { 'data-ref': 'line-2' }));
    append(renderedLines, renderedLine);

    const sourceLine = fakeEl('export-pdf-code-line', { 'data-ref': 'line-3' });
    const source = {
      indexOfRefs: { 'line-3': sourceLine as unknown as Node },
      querySelector: () => null,
    } as unknown as ParentNode;

    const token = fallbackBreakTokenFromOverflow(
      { startContainer: renderedLines as unknown as Node, startOffset: 1 },
      source,
    );
    expect(token?.node).toBe(sourceLine);
    expect(token?.offset).toBe(0);
    expect(typeof token?.toJSON).toBe('function');
    expect(token?.toJSON(true)).toContain('line-3');
  });

  it('does not fall back to a non-line ancestor when line has no usable data-ref', () => {
    const codeRoot = fakeEl('md-editor-code export-pdf-code-paged', {
      'data-ref': 'code-a',
    });
    const lines = fakeEl('export-pdf-code-lines', { 'data-ref': 'lines-a' });
    const line = fakeEl('export-pdf-code-line'); // no data-ref
    append(codeRoot, lines);
    append(lines, line);

    const sourceRoot = fakeEl('md-editor-code export-pdf-code-paged', {
      'data-ref': 'code-a',
    });
    const source = {
      indexOfRefs: { 'code-a': sourceRoot as unknown as Node },
      querySelector: () => null,
    } as unknown as ParentNode;

    expect(
      fallbackBreakTokenFromOverflow(
        { startContainer: lines as unknown as Node, startOffset: 0 },
        source,
      ),
    ).toBeUndefined();
  });

  it('detects overflow when startContainer is inside a code line', () => {
    const line = fakeEl('export-pdf-code-line', { 'data-ref': 'x' });
    const content = fakeEl('export-pdf-code-content');
    append(line, content);
    expect(
      isExportPdfCodeOverflow({
        startContainer: content as unknown as Node,
        startOffset: 0,
      }),
    ).toBe(true);
  });

  it('detects token inside overflowing code root via contains/data-ref', () => {
    const codeRoot = fakeEl('md-editor-code export-pdf-code-paged', {
      'data-export-pdf-code-id': '1',
      'data-ref': 'code-a',
    });
    const lines = fakeEl('export-pdf-code-lines');
    const lineA = fakeEl('export-pdf-code-line', { 'data-ref': 'L1' });
    append(codeRoot, lines);
    append(lines, lineA);

    const otherRoot = fakeEl('md-editor-code export-pdf-code-paged', {
      'data-export-pdf-code-id': '2',
      'data-ref': 'code-b',
    });

    const overflow = {
      startContainer: lines as unknown as Node,
      startOffset: 0,
    };

    expect(isTokenInsideCodeOverflow(lineA as unknown as Node, overflow)).toBe(true);
    expect(isTokenInsideCodeOverflow(otherRoot as unknown as Node, overflow)).toBe(false);
  });

  it('treats same or later sibling code lines as valid resume points', () => {
    const lines = fakeEl('export-pdf-code-lines');
    const line5 = fakeEl('export-pdf-code-line', { 'data-ref': 'L5' });
    const line6 = fakeEl('export-pdf-code-line', { 'data-ref': 'L6' });
    append(lines, line5);
    append(lines, line6);

    expect(isSameOrLaterCodeLine(line5 as unknown as Node, line5 as unknown as Element)).toBe(
      true,
    );
    expect(isSameOrLaterCodeLine(line6 as unknown as Node, line5 as unknown as Element)).toBe(
      true,
    );
    expect(isSameOrLaterCodeLine(line5 as unknown as Node, line6 as unknown as Element)).toBe(
      false,
    );
    expect(isSameOrLaterCodeLine(lines as unknown as Node, line5 as unknown as Element)).toBe(
      false,
    );
  });

  it('keeps heading tokens outside the overflowing fence (do not swallow them)', () => {
    const codeRoot = fakeEl('md-editor-code export-pdf-code-paged', {
      'data-export-pdf-code-id': '1',
      'data-ref': 'code-a',
    });
    const lines = fakeEl('export-pdf-code-lines');
    const line = fakeEl('export-pdf-code-line', { 'data-ref': 'L5' });
    append(codeRoot, lines);
    append(lines, line);

    const heading = fakeEl('heading', { 'data-ref': 'h-next' });
    const sourceLine = fakeEl('export-pdf-code-line', { 'data-ref': 'L5' });
    const source = {
      indexOfRefs: { L5: sourceLine as unknown as Node },
      querySelector: () => null,
    } as unknown as ParentNode;

    const overflow = {
      startContainer: lines as unknown as Node,
      startOffset: 0,
    };

    expect(
      resolveCodeBreakTokenReplacement(
        { node: heading as unknown as Node, offset: 0 },
        overflow,
        source,
      ),
    ).toBeUndefined();
  });

  it('replaces ancestor in-fence tokens with the overflowing line', () => {
    const codeRoot = fakeEl('md-editor-code export-pdf-code-paged', {
      'data-export-pdf-code-id': '1',
      'data-ref': 'code-a',
    });
    const lines = fakeEl('export-pdf-code-lines', { 'data-ref': 'lines-a' });
    const line = fakeEl('export-pdf-code-line', { 'data-ref': 'L5' });
    append(codeRoot, lines);
    append(lines, line);

    const sourceLine = fakeEl('export-pdf-code-line', { 'data-ref': 'L5' });
    const source = {
      indexOfRefs: { L5: sourceLine as unknown as Node },
      querySelector: () => null,
    } as unknown as ParentNode;

    const overflow = {
      startContainer: lines as unknown as Node,
      startOffset: 0,
    };

    expect(
      resolveCodeBreakTokenReplacement(
        { node: codeRoot as unknown as Node, offset: 0 },
        overflow,
        source,
      )?.node,
    ).toBe(sourceLine);

    expect(
      resolveCodeBreakTokenReplacement(
        { node: lines as unknown as Node, offset: 0 },
        overflow,
        source,
      )?.node,
    ).toBe(sourceLine);
  });

  it('replaces later sibling page-chunk tokens with the overflowing chunk', () => {
    const chunkA = fakeEl('md-editor-code export-pdf-code-paged export-pdf-code-page-chunk', {
      'data-export-pdf-code-id': '1',
      'data-ref': 'chunk-a',
    });
    const linesA = fakeEl('export-pdf-code-lines');
    const lineA = fakeEl('export-pdf-code-line', { 'data-ref': 'L1' });
    append(chunkA, linesA);
    append(linesA, lineA);

    const chunkB = fakeEl('md-editor-code export-pdf-code-paged export-pdf-code-page-chunk', {
      'data-export-pdf-code-id': '1',
      'data-ref': 'chunk-b',
    });

    const sourceChunkA = fakeEl('md-editor-code export-pdf-code-page-chunk', {
      'data-ref': 'chunk-a',
    });
    const source = {
      indexOfRefs: { 'chunk-a': sourceChunkA as unknown as Node },
      querySelector: () => null,
    } as unknown as ParentNode;

    const overflow = {
      startContainer: linesA as unknown as Node,
      startOffset: 0,
    };

    const replaced = resolveCodeBreakTokenReplacement(
      { node: chunkB as unknown as Node, offset: 0 },
      overflow,
      source,
    );
    expect(replaced?.node).toBe(sourceChunkA);
  });

  it('keeps same/later line tokens and falls back when token is missing', () => {
    const codeRoot = fakeEl('md-editor-code export-pdf-code-paged', {
      'data-export-pdf-code-id': '1',
    });
    const lines = fakeEl('export-pdf-code-lines');
    const line = fakeEl('export-pdf-code-line', { 'data-ref': 'L5' });
    const nextLine = fakeEl('export-pdf-code-line', { 'data-ref': 'L6' });
    append(codeRoot, lines);
    append(lines, line);
    append(lines, nextLine);

    const sourceLine = fakeEl('export-pdf-code-line', { 'data-ref': 'L5' });
    const source = {
      indexOfRefs: { L5: sourceLine as unknown as Node },
      querySelector: () => null,
    } as unknown as ParentNode;

    const overflow = {
      startContainer: lines as unknown as Node,
      startOffset: 0,
    };

    const fromMissing = resolveCodeBreakTokenReplacement(
      null,
      overflow,
      source,
    );
    expect(fromMissing?.node).toBe(sourceLine);

    const keepInside = resolveCodeBreakTokenReplacement(
      { node: line as unknown as Node, offset: 0 },
      overflow,
      source,
    );
    expect(keepInside).toBeUndefined();

    const keepNextLine = resolveCodeBreakTokenReplacement(
      { node: nextLine as unknown as Node, offset: 0 },
      overflow,
      source,
    );
    expect(keepNextLine).toBeUndefined();
  });
});
