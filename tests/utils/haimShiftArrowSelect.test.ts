import { describe, expect, it } from 'vitest';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import { TextSelection } from '@tiptap/pm/state';
import { NodeRange } from '@tiptap/extension-node-range';
import {
  extendSelectionVertically,
  findAdjacentTextblockPos,
  HaimShiftArrowSelect,
} from '@/components/haimEditor/extensions/HaimShiftArrowSelect';
import { HaimNodeRange } from '@/components/haimEditor/extensions/HaimNodeRange';

function threeParagraphDoc() {
  return {
    type: 'doc' as const,
    content: [
      { type: 'paragraph', content: [{ type: 'text', text: 'alpha' }] },
      { type: 'paragraph', content: [{ type: 'text', text: 'bravo' }] },
      { type: 'paragraph', content: [{ type: 'text', text: 'charlie' }] },
    ],
  };
}

function threeParagraphEditor() {
  return new Editor({
    extensions: [StarterKit, HaimShiftArrowSelect, HaimNodeRange],
    content: threeParagraphDoc(),
  });
}

describe('HaimShiftArrowSelect', () => {
  it('registers Shift-ArrowDown / Shift-ArrowUp shortcuts', () => {
    const ed = threeParagraphEditor();
    try {
      const ext = ed.extensionManager.extensions.find(
        (e) => e.name === 'haimShiftArrowSelect',
      );
      expect(ext).toBeTruthy();
      const shortcuts = ext?.config.addKeyboardShortcuts?.call({
        name: 'haimShiftArrowSelect',
        options: ext.options,
        storage: ext.storage,
        editor: ed,
        type: null,
        parent: undefined,
      } as never);
      expect(typeof (shortcuts as Record<string, unknown>)['Shift-ArrowDown']).toBe(
        'function',
      );
      expect(typeof (shortcuts as Record<string, unknown>)['Shift-ArrowUp']).toBe(
        'function',
      );
    } finally {
      ed.destroy();
    }
  });

  it('findAdjacentTextblockPos crosses paragraphs', () => {
    const ed = threeParagraphEditor();
    try {
      // Caret inside first paragraph text
      ed.commands.setTextSelection(2);
      const head = ed.state.selection.head;
      const next = findAdjacentTextblockPos(ed.state.doc, head, 'down');
      expect(next).not.toBeNull();
      expect(next!).toBeGreaterThan(head);
      expect(ed.state.doc.resolve(next!).parent.textContent).toBe('bravo');

      const prev = findAdjacentTextblockPos(ed.state.doc, next!, 'up');
      expect(prev).not.toBeNull();
      expect(ed.state.doc.resolve(prev!).parent.textContent).toBe('alpha');
    } finally {
      ed.destroy();
    }
  });

  it('extendSelectionVertically grows TextSelection into next paragraph', () => {
    const ed = threeParagraphEditor();
    try {
      // Caret at end of first paragraph ("alpha" is 5 chars; pos after text ≈ 6)
      const endOfFirst = 1 + 'alpha'.length;
      ed.view.dispatch(
        ed.state.tr.setSelection(
          TextSelection.create(ed.state.doc, endOfFirst, endOfFirst),
        ),
      );
      const before = ed.state.selection;
      expect(before.empty).toBe(true);

      const moved = extendSelectionVertically(ed.view, 'down');
      expect(moved).toBe(true);

      const after = ed.state.selection;
      expect(after.empty).toBe(false);
      expect(after instanceof TextSelection).toBe(true);
      expect(after.head).toBeGreaterThan(before.head);
      expect(after.anchor).toBe(before.anchor);
    } finally {
      ed.destroy();
    }
  });
});

describe('HaimNodeRange', () => {
  it('drops Shift-ArrowUp / Shift-ArrowDown from stock NodeRange', () => {
    const stock = NodeRange.config.addKeyboardShortcuts?.call({
      name: 'nodeRange',
      options: { depth: undefined, key: 'Mod' },
      storage: {},
      editor: null,
      type: null,
      parent: undefined,
    } as never) as Record<string, unknown>;
    expect(stock['Shift-ArrowDown']).toBeTypeOf('function');
    expect(stock['Shift-ArrowUp']).toBeTypeOf('function');

    const bound = HaimNodeRange.config.addKeyboardShortcuts?.call({
      name: 'nodeRange',
      options: { depth: undefined, key: 'Mod' },
      storage: {},
      editor: null,
      type: null,
      parent: () => stock,
    } as never) as Record<string, unknown>;

    expect(bound['Shift-ArrowDown']).toBeUndefined();
    expect(bound['Shift-ArrowUp']).toBeUndefined();
    expect(bound['Mod-a']).toBeTypeOf('function');
  });
});
