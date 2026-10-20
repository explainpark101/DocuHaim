import { EditorSelection, EditorState } from '@codemirror/state';
import { describe, expect, it } from 'vitest';
import { headingToggleTransaction } from '@/utils/editorMarkdownStyle';
import {
  HaimHeading,
  renderHaimHeadingMarkdown,
  toggleHaimHeadingLevel,
} from '@/components/haimEditor/extensions/HaimHeading';

function stateAt(doc: string, head: number): EditorState {
  return EditorState.create({
    doc,
    selection: EditorSelection.cursor(head),
  });
}

function stateCovering(doc: string): EditorState {
  return EditorState.create({
    doc,
    selection: EditorSelection.range(0, doc.length),
  });
}

describe('headingToggleTransaction', () => {
  it('inserts hashes on an empty line and puts the caret at the end', () => {
    const tr = headingToggleTransaction(stateAt('', 0), 3);
    expect(tr).not.toBeNull();
    expect(tr?.state.doc.toString()).toBe('### ');
    expect(tr?.state.selection.main.head).toBe(4);
  });

  it('puts the caret at the end when changing the level of an empty heading', () => {
    const tr = headingToggleTransaction(stateAt('## ', 0), 1);
    expect(tr?.state.doc.toString()).toBe('# ');
    expect(tr?.state.selection.main.head).toBe(2);
  });

  it('keeps a caret that was already at the end of a titled line', () => {
    const tr = headingToggleTransaction(stateAt('Hello', 5), 1);
    expect(tr?.state.doc.toString()).toBe('# Hello');
    expect(tr?.state.selection.main.head).toBe('# Hello'.length);
  });

  it('does not move a mid-line caret to the end of a titled line', () => {
    const tr = headingToggleTransaction(stateAt('Hello', 2), 1);
    expect(tr?.state.doc.toString()).toBe('# Hello');
    expect(tr?.state.selection.main.head).toBe(0);
  });

  it('targets only the empty line under the caret', () => {
    const tr = headingToggleTransaction(stateAt('Hello\n', 6), 2);
    expect(tr?.state.doc.toString()).toBe('Hello\n## ');
    expect(tr?.state.selection.main.head).toBe(9);
  });

  it('changes only lines that contain text when several lines are selected', () => {
    const doc = 'Hello\n\nWorld\n   \n# Kept';
    const tr = headingToggleTransaction(stateCovering(doc), 2);
    expect(tr?.state.doc.toString()).toBe('## Hello\n\n## World\n   \n## Kept');
  });

  it('leaves a multi-line selection of blank lines unchanged', () => {
    expect(headingToggleTransaction(stateCovering('\n\n'), 1)).toBeNull();
  });
});

describe('toggleHaimHeadingLevel multi-block', () => {
  it('turns only non-empty blocks into headings', async () => {
    const { Editor } = await import('@tiptap/core');
    const StarterKit = (await import('@tiptap/starter-kit')).default;

    const editor = new Editor({
      extensions: [
        StarterKit.configure({ heading: false }),
        HaimHeading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
      ],
      content: {
        type: 'doc',
        content: [
          { type: 'paragraph', content: [{ type: 'text', text: 'Hello' }] },
          { type: 'paragraph' },
          { type: 'paragraph', content: [{ type: 'text', text: '   ' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'World' }] },
        ],
      },
    });
    try {
      editor.commands.selectAll();
      expect(toggleHaimHeadingLevel(editor, 1)).toBe(true);
      const blocks: { type: string; text: string }[] = [];
      editor.state.doc.forEach((node) => {
        blocks.push({ type: node.type.name, text: node.textContent });
      });
      expect(blocks).toEqual([
        { type: 'heading', text: 'Hello' },
        { type: 'paragraph', text: '' },
        { type: 'paragraph', text: '   ' },
        { type: 'heading', text: 'World' },
      ]);
    } finally {
      editor.destroy();
    }
  });
});

describe('renderHaimHeadingMarkdown', () => {
  it('emits the hash prefix when the heading has no content', () => {
    expect(renderHaimHeadingMarkdown({ attrs: { level: 2 } }, () => 'x')).toBe('## ');
    expect(
      renderHaimHeadingMarkdown({ attrs: { level: 1 }, content: [] }, () => ''),
    ).toBe('# ');
  });

  it('keeps the title after the hashes', () => {
    expect(
      renderHaimHeadingMarkdown({ attrs: { level: 4 }, content: [{}] }, () => 'Title'),
    ).toBe('#### Title');
  });
});
