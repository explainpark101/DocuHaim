import { describe, expect, it, vi } from 'vitest';
import type { Editor } from '@tiptap/react';
import type { Node as PMNode } from '@tiptap/pm/model';
import {
  getCachedMarkdown,
  invalidateMarkdownCache,
  isMarkdownCacheHitForDoc,
} from '@/components/haimEditor/markdownCache';

function fakeEditor(doc: PMNode, markdown: string): Editor {
  return {
    state: { doc },
    getMarkdown: () => markdown,
  } as unknown as Editor;
}

describe('markdownCache doc identity', () => {
  it('reuses markdown for the same PM doc reference without re-serializing', () => {
    const doc = { type: 'doc' } as unknown as PMNode;
    const getMarkdown = vi.fn(() => '# hello');
    const editor = {
      state: { doc },
      getMarkdown,
    } as unknown as Editor;

    expect(getCachedMarkdown(editor)).toBe('# hello');
    expect(getCachedMarkdown(editor)).toBe('# hello');
    expect(getMarkdown).toHaveBeenCalledTimes(1);
    expect(isMarkdownCacheHitForDoc(editor, doc)).toBe(true);
  });

  it('re-serializes when the doc identity changes', () => {
    const docA = { id: 'a' } as unknown as PMNode;
    const docB = { id: 'b' } as unknown as PMNode;
    const getMarkdown = vi
      .fn()
      .mockReturnValueOnce('one')
      .mockReturnValueOnce('two');
    const editor = {
      state: { doc: docA },
      getMarkdown,
    } as unknown as Editor;

    expect(getCachedMarkdown(editor)).toBe('one');
    (editor as { state: { doc: PMNode } }).state.doc = docB;
    expect(getCachedMarkdown(editor)).toBe('two');
    expect(getMarkdown).toHaveBeenCalledTimes(2);
  });

  it('invalidateMarkdownCache forces the next call to serialize', () => {
    const doc = { id: 'x' } as unknown as PMNode;
    const getMarkdown = vi.fn(() => 'md');
    const editor = fakeEditor(doc, 'md') as Editor & {
      getMarkdown: () => string;
    };
    // Replace with spy
    (editor as { getMarkdown: () => string }).getMarkdown = getMarkdown;

    getCachedMarkdown(editor);
    invalidateMarkdownCache(editor);
    expect(isMarkdownCacheHitForDoc(editor, doc)).toBe(false);
    getCachedMarkdown(editor);
    expect(getMarkdown).toHaveBeenCalledTimes(2);
  });
});
