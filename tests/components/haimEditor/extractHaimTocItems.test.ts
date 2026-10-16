import { describe, expect, it } from 'vitest';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import {
  extractHaimTocItems,
  visibleHaimTocItems,
} from '@/components/haimEditor/extractHaimTocItems';

describe('extractHaimTocItems blockquote headings', () => {
  it('marks headings inside a blockquote and can hide them', () => {
    const editor = new Editor({
      extensions: [StarterKit],
      content: {
        type: 'doc',
        content: [
          {
            type: 'heading',
            attrs: { level: 1 },
            content: [{ type: 'text', text: 'Outside' }],
          },
          {
            type: 'blockquote',
            content: [
              {
                type: 'heading',
                attrs: { level: 2 },
                content: [{ type: 'text', text: 'Quoted' }],
              },
            ],
          },
        ],
      },
    });

    const items = extractHaimTocItems(editor);
    expect(items.map((item) => [item.text, item.inBlockquote])).toEqual([
      ['Outside', false],
      ['Quoted', true],
    ]);
    expect(visibleHaimTocItems(items, false).map((item) => item.text)).toEqual([
      'Outside',
      'Quoted',
    ]);
    expect(visibleHaimTocItems(items, true).map((item) => item.text)).toEqual([
      'Outside',
    ]);
    editor.destroy();
  });
});
