import { describe, expect, it } from 'vitest';

describe('codeBlockIndent', () => {
  async function setup(code: string, language = 'javascript') {
    const { Editor } = await import('@tiptap/core');
    const StarterKit = (await import('@tiptap/starter-kit')).default;
    const { TextSelection } = await import('@tiptap/pm/state');
    const indent = await import('@/components/haimEditor/codeBlockIndent');

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

    return { editor, selectInCode, ...indent };
  }

  it('inserts spaces on Tab at empty caret', async () => {
    const { editor, selectInCode, buildCodeBlockIndentTransaction } = await setup('ab');
    try {
      selectInCode(1);
      editor.view.dispatch(buildCodeBlockIndentTransaction(editor.state, 2)!);
      expect(editor.state.doc.textContent).toBe('a  b');
    } finally {
      editor.destroy();
    }
  });

  it('indents each selected line', async () => {
    const { editor, selectInCode, buildCodeBlockIndentTransaction } = await setup(
      'a\nb',
    );
    try {
      selectInCode(0, 3);
      editor.view.dispatch(buildCodeBlockIndentTransaction(editor.state, 2)!);
      expect(editor.state.doc.textContent).toBe('  a\n  b');
    } finally {
      editor.destroy();
    }
  });

  it('outdents leading spaces with Shift-Tab width', async () => {
    const { editor, selectInCode, buildCodeBlockOutdentTransaction } = await setup(
      '    x',
      'python',
    );
    try {
      selectInCode(4);
      editor.view.dispatch(buildCodeBlockOutdentTransaction(editor.state, 4)!);
      expect(editor.state.doc.textContent).toBe('x');
    } finally {
      editor.destroy();
    }
  });
});
