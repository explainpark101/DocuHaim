import { describe, expect, it } from 'vitest';
import { splitLineSplitNodesIntoLines } from '@/utils/exportPdf/prepareExportPdfCodeBlocksForPaging';

describe('prepareExportPdfCodeBlocksForPaging', () => {
  it('splits highlighted nodes into logical lines', () => {
    const lines = splitLineSplitNodesIntoLines([
      { kind: 'element', tag: 'span', attrs: { class: 'hljs-keyword' }, children: [{ kind: 'text', value: 'const' }] },
      { kind: 'text', value: ' a = 1;\n' },
      { kind: 'element', tag: 'span', attrs: { class: 'hljs-keyword' }, children: [{ kind: 'text', value: 'const' }] },
      { kind: 'text', value: ' b = 2;' },
    ]);

    expect(lines.length).toBe(2);
    expect(lines[0]).toContain('hljs-keyword');
    expect(lines[0]).toContain('a&#32;=&#32;1');
    expect(lines[1]).toContain('b&#32;=&#32;2');
  });

  it('keeps an empty final line when source ends with newline', () => {
    const lines = splitLineSplitNodesIntoLines([{ kind: 'text', value: 'alpha\n' }]);
    expect(lines).toEqual(['alpha']);
  });

  it('treats br as a line break (TipTap hard breaks)', () => {
    const lines = splitLineSplitNodesIntoLines([
      { kind: 'text', value: 'def foo():' },
      { kind: 'element', tag: 'br', attrs: {}, children: [] },
      { kind: 'text', value: '    return 1' },
    ]);
    expect(lines.length).toBe(2);
    expect(lines[0]).toBe('def&#32;foo():');
    expect(lines[1]).toContain('&#32;&#32;&#32;&#32;return');
  });

  it('preserves whitespace-only indent segments', () => {
    const lines = splitLineSplitNodesIntoLines([
      { kind: 'text', value: 'def foo():\n' },
      { kind: 'text', value: '    ' },
      {
        kind: 'element',
        tag: 'span',
        attrs: { class: 'hljs-keyword' },
        children: [{ kind: 'text', value: 'return' }],
      },
    ]);
    expect(lines.length).toBe(2);
    expect(lines[1]).toMatch(/^(&#32;){4}<span/);
    expect(lines[1]).toContain('return');
  });

  it('unwraps TipTap node-view content wrappers', () => {
    const lines = splitLineSplitNodesIntoLines([
      {
        kind: 'element',
        tag: 'div',
        attrs: { 'data-node-view-content': '' },
        children: [
          { kind: 'text', value: 'a' },
          { kind: 'element', tag: 'br', attrs: {}, children: [] },
          { kind: 'text', value: 'b' },
        ],
      },
    ]);
    expect(lines).toEqual(['a', 'b']);
  });
});
