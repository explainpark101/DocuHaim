import { describe, expect, it } from 'vitest';
import { Schema } from '@tiptap/pm/model';
import { paragraphAboveInsertPos } from '@/components/haimEditor/extensions/HaimInsertLineAbove';

const schema = new Schema({
  nodes: {
    doc: { content: 'block+' },
    paragraph: {
      group: 'block',
      content: 'inline*',
      toDOM: () => ['p', 0],
      parseDOM: [{ tag: 'p' }],
    },
    text: { group: 'inline' },
  },
});

describe('paragraphAboveInsertPos', () => {
  it('returns the start of the current paragraph', () => {
    const doc = schema.node('doc', null, [
      schema.node('paragraph', null, [schema.text('hello')]),
      schema.node('paragraph', null, [schema.text('world')]),
    ]);
    const secondStart = doc.child(0).nodeSize;
    // Caret inside second paragraph (after "wo")
    expect(paragraphAboveInsertPos(doc, secondStart + 1 + 2)).toBe(secondStart);
  });

  it('returns 0 for the first paragraph', () => {
    const doc = schema.node('doc', null, [
      schema.node('paragraph', null, [schema.text('hello')]),
    ]);
    expect(paragraphAboveInsertPos(doc, 3)).toBe(0);
  });
});
