import { describe, expect, it } from 'vitest';
import { EditorState } from '@codemirror/state';
import { markdown } from '@codemirror/lang-markdown';
import { buildCodeFenceToggleCommentTransaction } from '@/components/haimEditor/cmCodeFenceToggleComment';

function makeState(doc: string, from: number, to: number = from) {
  return EditorState.create({
    doc,
    selection: { anchor: from, head: to },
    extensions: [markdown()],
  });
}

function fenceDoc(body: string, language = 'js') {
  const open = `\`\`\`${language}\n`;
  const close = '\n```';
  const doc = `${open}${body}${close}`;
  const bodyFrom = open.length;
  return { doc, bodyFrom, bodyTo: bodyFrom + body.length };
}

describe('cmCodeFenceToggleComment', () => {
  it('comments with // inside a js fence', () => {
    const { doc, bodyFrom } = fenceDoc('const x = 1;');
    const state = makeState(doc, bodyFrom);
    const spec = buildCodeFenceToggleCommentTransaction(state);
    expect(spec).not.toBeNull();
    const next = state.update(spec!);
    expect(next.state.doc.toString()).toBe('```js\n// const x = 1;\n```');
  });

  it('uncomments previously commented lines', () => {
    const { doc, bodyFrom } = fenceDoc('// a\n// b');
    const state = makeState(doc, bodyFrom, bodyFrom + 7);
    const spec = buildCodeFenceToggleCommentTransaction(state);
    expect(spec).not.toBeNull();
    const next = state.update(spec!);
    expect(next.state.doc.toString()).toBe('```js\na\nb\n```');
  });

  it('uses # inside a python fence', () => {
    const { doc, bodyFrom } = fenceDoc('print(1)', 'python');
    const state = makeState(doc, bodyFrom);
    const spec = buildCodeFenceToggleCommentTransaction(state);
    expect(spec).not.toBeNull();
    const next = state.update(spec!);
    expect(next.state.doc.toString()).toBe('```python\n# print(1)\n```');
  });

  it('uses block comments for css fences', () => {
    const { doc, bodyFrom } = fenceDoc('color: red;', 'css');
    const state = makeState(doc, bodyFrom);
    const spec = buildCodeFenceToggleCommentTransaction(state);
    expect(spec).not.toBeNull();
    const next = state.update(spec!);
    expect(next.state.doc.toString()).toBe('```css\n/* color: red; */\n```');
  });

  it('returns null outside fences', () => {
    const state = makeState('plain line', 2);
    expect(buildCodeFenceToggleCommentTransaction(state)).toBeNull();
  });
});
