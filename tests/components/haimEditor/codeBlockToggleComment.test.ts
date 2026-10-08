import { describe, expect, it } from 'vitest';

describe('codeBlockToggleComment', () => {
  async function setup(code: string, language = 'javascript') {
    const { Editor } = await import('@tiptap/core');
    const StarterKit = (await import('@tiptap/starter-kit')).default;
    const { TextSelection } = await import('@tiptap/pm/state');
    const mod = await import('@/components/haimEditor/codeBlockToggleComment');

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

    return { editor, selectInCode, ...mod };
  }

  it('comments the current line with // for javascript', async () => {
    const { editor, selectInCode, buildCodeBlockToggleCommentTransaction } =
      await setup('const x = 1;');
    try {
      selectInCode(0);
      editor.view.dispatch(buildCodeBlockToggleCommentTransaction(editor.state)!);
      expect(editor.state.doc.textContent).toBe('// const x = 1;');
    } finally {
      editor.destroy();
    }
  });

  it('uncomments when all selected lines are already commented', async () => {
    const { editor, selectInCode, buildCodeBlockToggleCommentTransaction } =
      await setup('// a\n// b');
    try {
      selectInCode(0, 7);
      editor.view.dispatch(buildCodeBlockToggleCommentTransaction(editor.state)!);
      expect(editor.state.doc.textContent).toBe('a\nb');
    } finally {
      editor.destroy();
    }
  });

  it('uses # for python', async () => {
    const { editor, selectInCode, buildCodeBlockToggleCommentTransaction } =
      await setup('print(1)', 'python');
    try {
      selectInCode(0);
      editor.view.dispatch(buildCodeBlockToggleCommentTransaction(editor.state)!);
      expect(editor.state.doc.textContent).toBe('# print(1)');
    } finally {
      editor.destroy();
    }
  });

  it('wraps with /* */ for css (block-only)', async () => {
    const { editor, selectInCode, buildCodeBlockToggleCommentTransaction } =
      await setup('color: red;', 'css');
    try {
      selectInCode(0);
      editor.view.dispatch(buildCodeBlockToggleCommentTransaction(editor.state)!);
      expect(editor.state.doc.textContent).toBe('/* color: red; */');
    } finally {
      editor.destroy();
    }
  });

  it('comments each selected line at shared indent', async () => {
    const { editor, selectInCode, buildCodeBlockToggleCommentTransaction } =
      await setup('  a\n  b\nc');
    try {
      selectInCode(0, 5);
      editor.view.dispatch(buildCodeBlockToggleCommentTransaction(editor.state)!);
      expect(editor.state.doc.textContent).toBe('  // a\n  // b\nc');
    } finally {
      editor.destroy();
    }
  });

  it('returns null outside code blocks', async () => {
    const { Editor } = await import('@tiptap/core');
    const StarterKit = (await import('@tiptap/starter-kit')).default;
    const { buildCodeBlockToggleCommentTransaction } = await import(
      '@/components/haimEditor/codeBlockToggleComment'
    );
    const editor = new Editor({
      extensions: [StarterKit],
      content: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'hi' }] }] },
    });
    try {
      expect(buildCodeBlockToggleCommentTransaction(editor.state)).toBeNull();
    } finally {
      editor.destroy();
    }
  });
});
