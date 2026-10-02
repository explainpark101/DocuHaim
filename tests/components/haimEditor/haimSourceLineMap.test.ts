import { describe, expect, it, vi } from 'vitest';
import {
  createLineIndexAt,
  incrementalMapTopLevelBlocksToSourceLines,
  mapTopLevelBlocksToSourceLines,
  remapTopLevelBlocksToSourceLines,
  shouldDeferSourceLineRemap,
  type HaimSourceLineEntry,
} from '@/components/haimEditor/haimSourceLineMap';
import type { Node as PMNode } from '@tiptap/pm/model';

function fakeBlock(
  name: string,
  text: string,
  nodeSize = 4,
): PMNode {
  return {
    type: { name },
    textContent: text,
    nodeSize,
    toJSON: () => ({ type: name, content: [{ type: 'text', text }] }),
  } as unknown as PMNode;
}

function fakeDoc(children: PMNode[]): PMNode {
  return {
    childCount: children.length,
    child: (i: number) => children[i],
    forEach: (fn: (node: PMNode, pos: number, index: number) => void) => {
      let pos = 0;
      for (let i = 0; i < children.length; i += 1) {
        const node = children[i]!;
        fn(node, pos, i);
        pos += node.nodeSize;
      }
    },
    toJSON: () => ({
      type: 'doc',
      content: children.map((c) => c.toJSON()),
    }),
  } as unknown as PMNode;
}

describe('createLineIndexAt', () => {
  it('maps offsets to 0-based lines', () => {
    const lineAt = createLineIndexAt('a\nbc\n\nd');
    expect(lineAt(0)).toBe(0);
    expect(lineAt(2)).toBe(1);
    expect(lineAt(5)).toBe(2);
    expect(lineAt(6)).toBe(3);
  });
});

describe('shouldDeferSourceLineRemap', () => {
  it('defers only when enabled, doc changed, and TipTap focused', () => {
    expect(
      shouldDeferSourceLineRemap({
        enabled: true,
        docChanged: true,
        tipTapFocused: true,
      }),
    ).toBe(true);
    expect(
      shouldDeferSourceLineRemap({
        enabled: true,
        docChanged: true,
        tipTapFocused: false,
      }),
    ).toBe(false);
    expect(
      shouldDeferSourceLineRemap({
        enabled: false,
        docChanged: true,
        tipTapFocused: true,
      }),
    ).toBe(false);
  });
});

describe('mapTopLevelBlocksToSourceLines', () => {
  it('assigns lines from full + block serialize', () => {
    const a = fakeBlock('paragraph', 'hello');
    const b = fakeBlock('paragraph', 'world');
    const doc = fakeDoc([a, b]);
    const serialize = vi.fn((json: { content?: unknown[] }) => {
      const content = json.content ?? [];
      if (content.length === 2) return 'hello\n\nworld';
      const first = content[0] as { content?: Array<{ text?: string }> };
      return first?.content?.[0]?.text ?? '';
    });
    const entries = mapTopLevelBlocksToSourceLines(doc, serialize, '');
    expect(entries).toHaveLength(2);
    expect(entries[0]?.line0).toBe(0);
    expect(entries[1]?.line0).toBe(2);
    expect(entries[0]?.blockNewlines).toBe(0);
  });
});

describe('incrementalMapTopLevelBlocksToSourceLines', () => {
  it('reuses unchanged children and shifts later line0 by newline delta', () => {
    const a = fakeBlock('paragraph', 'hello');
    const bOld = fakeBlock('paragraph', 'world');
    const bNew = fakeBlock('paragraph', 'wor\nld', 5);
    const prevDoc = fakeDoc([a, bOld]);
    const nextDoc = fakeDoc([a, bNew]);
    const prevEntries: HaimSourceLineEntry[] = [
      { pos: 0, to: 4, line0: 0, blockNewlines: 0 },
      { pos: 4, to: 8, line0: 2, blockNewlines: 0 },
    ];
    const serialize = vi.fn((json: { content?: unknown[] }) => {
      const content = json.content ?? [];
      const first = content[0] as { content?: Array<{ text?: string }> };
      return first?.content?.[0]?.text ?? '';
    });
    const next = incrementalMapTopLevelBlocksToSourceLines(
      nextDoc,
      prevDoc,
      prevEntries,
      serialize,
    );
    expect(next[0]?.line0).toBe(0);
    expect(next[0]?.blockNewlines).toBe(0);
    // Second block start unchanged; its internal newline does not move its own line0.
    expect(next[1]?.line0).toBe(2);
    expect(next[1]?.blockNewlines).toBe(1);
    // Only changed block was re-serialized (not the identical first child).
    expect(serialize).toHaveBeenCalledTimes(1);
  });
});

describe('remapTopLevelBlocksToSourceLines', () => {
  it('uses incremental path when structure matches', () => {
    const a = fakeBlock('paragraph', 'x');
    const bOld = fakeBlock('paragraph', 'y');
    const bNew = fakeBlock('paragraph', 'y!');
    const prevDoc = fakeDoc([a, bOld]);
    const nextDoc = fakeDoc([a, bNew]);
    const prevEntries: HaimSourceLineEntry[] = [
      { pos: 0, to: 4, line0: 0, blockNewlines: 0 },
      { pos: 4, to: 8, line0: 2, blockNewlines: 0 },
    ];
    const serialize = vi.fn((json: { content?: unknown[] }) => {
      const content = json.content ?? [];
      if (content.length > 1) return 'x\n\ny!';
      const first = content[0] as { content?: Array<{ text?: string }> };
      return first?.content?.[0]?.text ?? '';
    });
    const next = remapTopLevelBlocksToSourceLines(
      nextDoc,
      serialize,
      '',
      prevDoc,
      prevEntries,
    );
    expect(next).toHaveLength(2);
    // Incremental: only the changed block is re-serialized (not full doc).
    expect(serialize).toHaveBeenCalledTimes(1);
    expect(
      (serialize.mock.calls[0]?.[0] as { content?: unknown[] }).content?.length,
    ).toBe(1);
  });
});
