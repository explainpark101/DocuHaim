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
    expect(lines[0]).toContain('a = 1');
    expect(lines[1]).toContain('b = 2');
  });

  it('keeps an empty final line when source ends with newline', () => {
    const lines = splitLineSplitNodesIntoLines([{ kind: 'text', value: 'alpha\n' }]);
    expect(lines).toEqual(['alpha']);
  });
});
