import { describe, expect, it } from 'vitest';
import {
  collectTopLevelBlocksInRange,
  getHaimHeadingRemapSelection,
} from '@/components/haimEditor/getHaimHeadingRemapSelection';
import { detectHeadingLevels } from '@/utils/markdownHeadings';

describe('collectTopLevelBlocksInRange', () => {
  it('returns null for empty range', () => {
    const doc = {
      forEach: () => {},
    };
    expect(collectTopLevelBlocksInRange(doc as never, 5, 5)).toBeNull();
  });

  it('collects intersecting top-level blocks and expands range', () => {
    const nodes = [
      { name: 'h1', nodeSize: 10 },
      { name: 'h2', nodeSize: 8 },
      { name: 'p', nodeSize: 6 },
    ];
    const doc = {
      forEach: (fn: (node: { name: string; nodeSize: number }, pos: number) => void) => {
        let pos = 0;
        for (const node of nodes) {
          fn(node, pos);
          pos += node.nodeSize;
        }
      },
    };
    // Selection inside first two blocks (0..10 and 10..18)
    const result = collectTopLevelBlocksInRange(doc as never, 2, 14);
    expect(result).not.toBeNull();
    expect(result!.from).toBe(0);
    expect(result!.to).toBe(18);
    expect(
      result!.nodes.map((n) => (n as unknown as { name: string }).name),
    ).toEqual(['h1', 'h2']);
  });
});

describe('getHaimHeadingRemapSelection', () => {
  it('prefers CodeMirror markdown slice when preferSource', () => {
    const selected = '## Hello\n\nbody';
    const cm = {
      hasFocus: false,
      state: {
        selection: { main: { from: 0, to: selected.length } },
        doc: {
          sliceString: (from: number, to: number) => selected.slice(from, to),
        },
      },
    };
    const snap = getHaimHeadingRemapSelection(null, cm as never, {
      preferSource: true,
    });
    expect(snap?.markdown).toBe(selected);
    expect(snap?.range).toEqual({ kind: 'cm', from: 0, to: selected.length });
    expect(detectHeadingLevels(snap!.markdown)).toEqual([2]);
  });

  it('serializes TipTap heading blocks with ATX markers (not plain text)', async () => {
    const { Editor } = await import('@tiptap/core');
    const StarterKit = (await import('@tiptap/starter-kit')).default;
    const { HaimMarkdown } = await import(
      '@/components/haimEditor/extensions/HaimMarkdown'
    );
    const { DeepHeading } = await import(
      '@/components/haimEditor/extensions/DeepHeading'
    );

    const src = `# Alpha

## Beta

paragraph
`;
    const ed = new Editor({
      extensions: [
        StarterKit.configure({ heading: { levels: [1, 2, 3, 4, 5, 6] } }),
        HaimMarkdown,
        DeepHeading,
      ],
      content: src,
      contentType: 'markdown',
    });

    try {
      let from = 1;
      let to = 1;
      ed.state.doc.forEach((node, pos) => {
        if (node.type.name === 'heading') {
          const level = Number(node.attrs.level || 0);
          if (level === 1) from = pos;
          if (level === 2) to = pos + node.nodeSize;
        }
      });
      ed.commands.setTextSelection({ from: from + 1, to: to - 1 });

      const snap = getHaimHeadingRemapSelection(ed, null);
      expect(snap).not.toBeNull();
      expect(snap!.range.kind).toBe('tiptap');
      expect(snap!.markdown).toMatch(/^#\s+Alpha/m);
      expect(snap!.markdown).toMatch(/^##\s+Beta/m);
      expect(detectHeadingLevels(snap!.markdown)[0]).toBe(1);
      // Must not be plain text without hashes (the old bug).
      expect(snap!.markdown.includes('Alpha')).toBe(true);
      expect(snap!.markdown.trimStart().startsWith('#')).toBe(true);
    } finally {
      ed.destroy();
    }
  });

  it('includes deep headings as #######… ATX after restore', async () => {
    const { Editor } = await import('@tiptap/core');
    const StarterKit = (await import('@tiptap/starter-kit')).default;
    const { HaimMarkdown } = await import(
      '@/components/haimEditor/extensions/HaimMarkdown'
    );
    const { DeepHeading } = await import(
      '@/components/haimEditor/extensions/DeepHeading'
    );
    const { protectCustomMarkdown } = await import(
      '@/components/haimEditor/protectCustomMarkdown'
    );

    const src = protectCustomMarkdown('####### Deep\n\n# Top\n');
    const ed = new Editor({
      extensions: [
        StarterKit.configure({ heading: { levels: [1, 2, 3, 4, 5, 6] } }),
        HaimMarkdown,
        DeepHeading,
      ],
      content: src,
      contentType: 'markdown',
    });

    try {
      ed.commands.selectAll();
      const snap = getHaimHeadingRemapSelection(ed, null);
      expect(snap).not.toBeNull();
      expect(snap!.markdown).toMatch(/^#{7}\s+Deep/m);
      expect(detectHeadingLevels(snap!.markdown)).toEqual([1, 7]);
    } finally {
      ed.destroy();
    }
  });
});
