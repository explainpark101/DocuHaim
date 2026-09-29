import { describe, expect, it } from 'vitest';
import { EditorState } from '@codemirror/state';
import { markdown } from '@codemirror/lang-markdown';
import {
  buildCodeFenceBracketBackspaceTransaction,
  buildCodeFenceBracketTransaction,
  isSelectionInsideSameCodeFence,
} from '@/components/haimEditor/cmCodeFenceBracketPairs';

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

describe('cmCodeFenceBracketPairs', () => {
  it('wraps a non-empty selection with brackets', () => {
    const { doc, bodyFrom } = fenceDoc('hello');
    const state = makeState(doc, bodyFrom, bodyFrom + 5);
    expect(isSelectionInsideSameCodeFence(state)).toBe(true);
    const spec = buildCodeFenceBracketTransaction(state, '[');
    expect(spec).not.toBeNull();
    const next = state.update(spec!);
    expect(next.state.doc.toString()).toBe('```js\n[hello]\n```');
    expect(next.state.selection.main.from).toBe(bodyFrom + 1);
    expect(next.state.selection.main.to).toBe(bodyFrom + 6);
  });

  it('wraps with parentheses and braces', () => {
    const { doc, bodyFrom } = fenceDoc('x');
    let state = makeState(doc, bodyFrom, bodyFrom + 1);
    state = state.update(buildCodeFenceBracketTransaction(state, '(')!).state;
    expect(state.doc.toString()).toBe('```js\n(x)\n```');

    state = state.update(
      buildCodeFenceBracketTransaction(
        makeState(state.doc.toString(), bodyFrom + 1, bodyFrom + 2),
        '{',
      )!,
    ).state;
    expect(state.doc.toString()).toBe('```js\n({x})\n```');
  });

  it('auto-inserts a pair on empty selection', () => {
    const { doc, bodyFrom } = fenceDoc('ab');
    const state = makeState(doc, bodyFrom + 1);
    const next = state.update(buildCodeFenceBracketTransaction(state, '{')!).state;
    expect(next.doc.toString()).toBe('```js\na{}b\n```');
    expect(next.selection.main.from).toBe(bodyFrom + 2);
  });

  it('skips over an existing closing bracket', () => {
    const { doc, bodyFrom } = fenceDoc('a{}b');
    const state = makeState(doc, bodyFrom + 2);
    const next = state.update(buildCodeFenceBracketTransaction(state, '}')!).state;
    expect(next.doc.toString()).toBe('```js\na{}b\n```');
    expect(next.selection.main.from).toBe(bodyFrom + 3);
  });

  it('Backspace deletes an empty pair', () => {
    const { doc, bodyFrom } = fenceDoc('a()b');
    const state = makeState(doc, bodyFrom + 2);
    const next = state.update(
      buildCodeFenceBracketBackspaceTransaction(state)!,
    ).state;
    expect(next.doc.toString()).toBe('```js\nab\n```');
  });

  it('does not auto-pair quote after a word character', () => {
    const { doc, bodyFrom } = fenceDoc('don');
    const state = makeState(doc, bodyFrom + 3);
    expect(buildCodeFenceBracketTransaction(state, "'")).toBeNull();
  });

  it('does not act outside code fences', () => {
    const state = makeState('hello', 0, 5);
    expect(isSelectionInsideSameCodeFence(state)).toBe(false);
    expect(buildCodeFenceBracketTransaction(state, '[')).toBeNull();
  });

  it('wraps with backticks only in JS-family languages', () => {
    const js = fenceDoc('foo', 'tsx');
    const jsState = makeState(js.doc, js.bodyFrom, js.bodyFrom + 3);
    const jsNext = jsState.update(
      buildCodeFenceBracketTransaction(jsState, '`')!,
    ).state;
    expect(jsNext.doc.toString()).toBe('```tsx\n`foo`\n```');

    const py = fenceDoc('foo', 'python');
    const pyState = makeState(py.doc, py.bodyFrom, py.bodyFrom + 3);
    expect(buildCodeFenceBracketTransaction(pyState, '`')).toBeNull();
  });
});
