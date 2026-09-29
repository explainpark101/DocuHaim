import { describe, expect, it } from 'vitest';
import { EditorState } from '@codemirror/state';
import { markdown } from '@codemirror/lang-markdown';
import {
  buildCodeFenceIndentTransaction,
  buildCodeFenceOutdentTransaction,
  findCodeFenceBodyAt,
} from '@/components/haimEditor/cmCodeFenceIndent';

function makeState(doc: string, from: number, to: number = from) {
  return EditorState.create({
    doc,
    selection: { anchor: from, head: to },
    extensions: [markdown()],
  });
}

/** Doc with a fenced body; returns offsets relative to body start. */
function fenceDoc(body: string, language = 'js') {
  const open = `\`\`\`${language}\n`;
  const close = '\n```';
  const doc = `${open}${body}${close}`;
  const bodyFrom = open.length;
  return { doc, bodyFrom, bodyTo: bodyFrom + body.length };
}

describe('cmCodeFenceIndent', () => {
  it('findCodeFenceBodyAt returns null outside the fence body', () => {
    const { doc, bodyFrom } = fenceDoc('x');
    const state = makeState(doc, 0);
    expect(findCodeFenceBodyAt(state, 0)).toBeNull();
    expect(findCodeFenceBodyAt(state, bodyFrom)?.language).toBe('js');
  });

  it('inserts spaces on Tab at empty caret inside fence', () => {
    const { doc, bodyFrom } = fenceDoc('ab');
    const state = makeState(doc, bodyFrom + 1);
    const spec = buildCodeFenceIndentTransaction(state, 2);
    expect(spec).not.toBeNull();
    const next = state.update(spec!);
    expect(next.state.doc.toString()).toBe('```js\na  b\n```');
  });

  it('indents each selected line inside fence', () => {
    const { doc, bodyFrom } = fenceDoc('a\nb');
    const state = makeState(doc, bodyFrom, bodyFrom + 3);
    const spec = buildCodeFenceIndentTransaction(state, 2);
    expect(spec).not.toBeNull();
    const next = state.update(spec!);
    expect(next.state.doc.toString()).toBe('```js\n  a\n  b\n```');
  });

  it('indents whole lines for a partial mid-line selection', () => {
    const { doc, bodyFrom } = fenceDoc('hello\nworld\nxyz');
    // Select "llo\nwor"
    const state = makeState(doc, bodyFrom + 2, bodyFrom + 9);
    const spec = buildCodeFenceIndentTransaction(state, 2);
    expect(spec).not.toBeNull();
    const next = state.update(spec!);
    expect(next.state.doc.toString()).toBe('```js\n  hello\n  world\nxyz\n```');
  });

  it('outdents whole lines for a partial mid-line selection', () => {
    const { doc, bodyFrom } = fenceDoc('  hello\n  world\nxyz');
    // Select "llo\n  wor" inside the indented lines
    const state = makeState(doc, bodyFrom + 4, bodyFrom + 13);
    const spec = buildCodeFenceOutdentTransaction(state, 2);
    expect(spec).not.toBeNull();
    const next = state.update(spec!);
    expect(next.state.doc.toString()).toBe('```js\nhello\nworld\nxyz\n```');
  });

  it('returns null for indent outside fences', () => {
    const state = makeState('plain line', 2);
    expect(buildCodeFenceIndentTransaction(state, 2)).toBeNull();
    expect(buildCodeFenceOutdentTransaction(state, 2)).toBeNull();
  });
});
