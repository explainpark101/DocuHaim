import { describe, expect, it } from 'vitest';
import { Schema } from '@tiptap/pm/model';
import { EditorState, TextSelection } from '@tiptap/pm/state';
import {
  findAllOccurrences,
  findNextOccurrence,
  wordRangeAt,
} from '@/components/haimEditor/extensions/haimMultiCursorFind';
import {
  createHaimMultiCursorPlugin,
  haimMultiCursorKey,
  selectAllOccurrencesCommand,
  selectNextOccurrenceCommand,
} from '@/components/haimEditor/extensions/HaimMultiCursor';

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

function docWith(...paragraphs: string[]) {
  return schema.node(
    'doc',
    null,
    paragraphs.map((t) =>
      schema.node('paragraph', null, t ? [schema.text(t)] : []),
    ),
  );
}

function stateWith(
  text: string,
  from: number,
  to: number = from,
): EditorState {
  const doc = docWith(text);
  return EditorState.create({
    schema,
    doc,
    selection: TextSelection.create(doc, from, to),
    plugins: [createHaimMultiCursorPlugin()],
  });
}

function applyCommand(
  state: EditorState,
  command: (
    state: EditorState,
    dispatch?: (tr: import('@tiptap/pm/state').Transaction) => void,
  ) => boolean,
): EditorState {
  let next = state;
  const ok = command(state, (tr) => {
    next = state.apply(tr);
  });
  expect(ok).toBe(true);
  return next;
}

describe('haimMultiCursorFind', () => {
  it('wordRangeAt expands to the word under the caret', () => {
    const doc = docWith('hello world');
    expect(wordRangeAt(doc, 3)).toEqual({ from: 1, to: 6 });
    expect(wordRangeAt(doc, 7)).toEqual({ from: 7, to: 12 });
  });

  it('findAllOccurrences finds every match across paragraphs', () => {
    const doc = docWith('foo bar', 'foo baz foo');
    const all = findAllOccurrences(doc, 'foo');
    expect(all).toHaveLength(3);
    expect(all.every((r) => doc.textBetween(r.from, r.to) === 'foo')).toBe(
      true,
    );
  });

  it('findNextOccurrence wraps and skips occupied ranges', () => {
    const doc = docWith('aa xx aa xx aa');
    const first = findAllOccurrences(doc, 'aa')[0]!;
    const second = findNextOccurrence(doc, 'aa', first.to, [first], false);
    expect(second).not.toBeNull();
    expect(second!.from).toBeGreaterThan(first.to);

    const occupied = findAllOccurrences(doc, 'aa');
    expect(
      findNextOccurrence(
        doc,
        'aa',
        occupied[occupied.length - 1]!.to,
        occupied,
        false,
      ),
    ).toBeNull();
  });
});

describe('HaimMultiCursor commands', () => {
  it('Mod-d expands empty selection then adds the next occurrence', () => {
    let state = stateWith('alpha beta alpha', 3);
    state = applyCommand(state, selectNextOccurrenceCommand);
    expect(state.selection.from).toBe(1);
    expect(state.selection.to).toBe(6);
    expect(haimMultiCursorKey.getState(state)?.ranges.length).toBe(1);

    state = applyCommand(state, selectNextOccurrenceCommand);
    const st = haimMultiCursorKey.getState(state);
    expect(st?.ranges.length).toBe(2);
    expect(
      state.doc.textBetween(st!.ranges[1]!.from, st!.ranges[1]!.to),
    ).toBe('alpha');
  });

  it('Mod-Shift-l selects all occurrences', () => {
    let state = stateWith('one two one two one', 1, 4);
    state = applyCommand(state, selectAllOccurrencesCommand);
    expect(haimMultiCursorKey.getState(state)?.ranges.length).toBe(3);
  });

  it('keeps multi-ranges local per EditorState (pane independence)', () => {
    let a = stateWith('same same', 1, 5);
    const b = stateWith('same same', 1, 5);
    a = applyCommand(a, selectAllOccurrencesCommand);
    expect(haimMultiCursorKey.getState(a)?.ranges.length).toBe(2);
    expect(haimMultiCursorKey.getState(b)?.ranges.length ?? 0).toBe(0);
  });
});
