import { describe, expect, it } from 'vitest';
import {
  endsWithTwoBlankCodeLines,
  indentAtOffset,
  leadingLineIndent,
  trimCodeFenceBlankLines,
} from '@/components/haimEditor/codeBlockEnterShared';

describe('codeBlockEnterShared', () => {
  it('leadingLineIndent reads spaces and tabs', () => {
    expect(leadingLineIndent('  foo')).toBe('  ');
    expect(leadingLineIndent('\tbar')).toBe('\t');
    expect(leadingLineIndent('baz')).toBe('');
  });

  it('indentAtOffset uses the line containing the caret', () => {
    expect(indentAtOffset('  a\n    b', 3)).toBe('  '); // end of first line
    expect(indentAtOffset('  a\n    b', 4)).toBe('    '); // start of second
    expect(indentAtOffset('  a\n    b', 8)).toBe('    ');
  });

  it('endsWithTwoBlankCodeLines tolerates indented blanks', () => {
    expect(endsWithTwoBlankCodeLines('x\n\n')).toBe(true);
    expect(endsWithTwoBlankCodeLines('x\n  \n  ')).toBe(true);
    expect(endsWithTwoBlankCodeLines('x\n  ')).toBe(false);
    expect(endsWithTwoBlankCodeLines('x')).toBe(false);
  });

  it('trimCodeFenceBlankLines removes whitespace-only edge lines', () => {
    expect(trimCodeFenceBlankLines('\n  \nhello\n  \n')).toBe('hello');
    expect(trimCodeFenceBlankLines('  a\n  b\n  ')).toBe('  a\n  b');
    expect(trimCodeFenceBlankLines('')).toBe('');
  });
});

describe('codeBlockEnter', () => {
  async function setup(code: string, language = 'javascript') {
    const { Editor } = await import('@tiptap/core');
    const StarterKit = (await import('@tiptap/starter-kit')).default;
    const { TextSelection } = await import('@tiptap/pm/state');
    const enter = await import('@/components/haimEditor/codeBlockEnter');

    const editor = new Editor({
      extensions: [StarterKit],
      content: {
        type: 'doc',
        content: [
          {
            type: 'codeBlock',
            attrs: { language },
            content: code ? [{ type: 'text', text: code }] : [],
          },
        ],
      },
    });

    function selectInCode(from: number, to: number = from) {
      const textFrom = 1;
      const { tr } = editor.state;
      tr.setSelection(TextSelection.create(tr.doc, textFrom + from, textFrom + to));
      editor.view.dispatch(tr);
    }

    return { editor, selectInCode, ...enter };
  }

  it('preserves indent on Enter', async () => {
    const { editor, selectInCode, buildCodeBlockIndentEnterTransaction } =
      await setup('  foo');
    try {
      selectInCode(5); // end of "  foo"
      editor.view.dispatch(buildCodeBlockIndentEnterTransaction(editor.state)!);
      expect(editor.state.doc.textContent).toBe('  foo\n  ');
    } finally {
      editor.destroy();
    }
  });

  it('detects exit trim when two blank lines end the block', async () => {
    const { editor, selectInCode, buildCodeBlockExitTrimTransaction } =
      await setup('  foo\n  \n  ');
    try {
      selectInCode(editor.state.doc.textContent.length);
      const tr = buildCodeBlockExitTrimTransaction(editor.state);
      expect(tr).not.toBeNull();
      editor.view.dispatch(tr!);
      expect(editor.state.doc.textContent).toBe('  foo');
    } finally {
      editor.destroy();
    }
  });

  it('tryHandleCodeBlockEnter exits after two blank lines', async () => {
    const { editor, selectInCode, tryHandleCodeBlockEnter } = await setup(
      'hi\n\n',
    );
    try {
      selectInCode(editor.state.doc.textContent.length);
      expect(tryHandleCodeBlockEnter(editor)).toBe(true);
      // Left the code block for a paragraph after exitCode
      expect(editor.state.selection.$from.parent.type.name).not.toBe('codeBlock');
      // Remaining code block body is trimmed
      let codeText = '';
      editor.state.doc.descendants((node) => {
        if (node.type.name === 'codeBlock') codeText = node.textContent;
      });
      expect(codeText).toBe('hi');
    } finally {
      editor.destroy();
    }
  });

  it('Shift-Enter inserts a blank line above inside the code block', async () => {
    const {
      editor,
      selectInCode,
      buildCodeBlockInsertLineAboveTransaction,
      tryHandleCodeBlockShiftEnter,
    } = await setup('foo\nbar');
    try {
      selectInCode(5); // caret in "bar"
      const tr = buildCodeBlockInsertLineAboveTransaction(editor.state);
      expect(tr).not.toBeNull();
      editor.view.dispatch(tr!);
      expect(editor.state.doc.textContent).toBe('foo\n\nbar');
      expect(editor.state.selection.$from.parent.type.name).toBe('codeBlock');

      // Reset and go through the public handler
      editor.commands.setContent({
        type: 'doc',
        content: [
          {
            type: 'codeBlock',
            attrs: { language: 'javascript' },
            content: [{ type: 'text', text: 'abc' }],
          },
        ],
      });
      selectInCode(1);
      expect(tryHandleCodeBlockShiftEnter(editor)).toBe(true);
      expect(editor.state.doc.textContent).toBe('\nabc');
      expect(editor.state.selection.$from.parent.type.name).toBe('codeBlock');
    } finally {
      editor.destroy();
    }
  });
});

describe('cmCodeFenceEnter', () => {
  it('preserves indent on Enter inside a fence', async () => {
    const { EditorState } = await import('@codemirror/state');
    const { markdown } = await import('@codemirror/lang-markdown');
    const { buildCodeFenceIndentEnterTransaction } = await import(
      '@/components/haimEditor/cmCodeFenceEnter'
    );

    const open = '```js\n';
    const body = '  foo';
    const doc = `${open}${body}\n\`\`\``;
    const bodyFrom = open.length;
    const state = EditorState.create({
      doc,
      selection: { anchor: bodyFrom + body.length },
      extensions: [markdown()],
    });
    const next = state.update(buildCodeFenceIndentEnterTransaction(state)!).state;
    expect(next.doc.toString()).toBe('```js\n  foo\n  \n```');
  });
});
