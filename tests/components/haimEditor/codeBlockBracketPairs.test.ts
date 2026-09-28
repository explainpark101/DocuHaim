import { describe, expect, it } from 'vitest';

type KeyStub = {
  key: string;
  code: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  isComposing?: boolean;
  defaultPrevented?: boolean;
};

describe('resolveBracketPairKey', () => {
  it('maps open brackets and quotes', async () => {
    const { resolveBracketPairKey } = await import(
      '@/components/haimEditor/codeBlockBracketPairs'
    );
    expect(resolveBracketPairKey({ key: '[', code: 'BracketLeft' } as KeyStub)).toBe(
      '[',
    );
    expect(
      resolveBracketPairKey({
        key: '(',
        code: 'Digit9',
        shiftKey: true,
      } as KeyStub),
    ).toBe('(');
    expect(
      resolveBracketPairKey({
        key: '{',
        code: 'BracketLeft',
        shiftKey: true,
      } as KeyStub),
    ).toBe('{');
    expect(resolveBracketPairKey({ key: "'", code: 'Quote' } as KeyStub)).toBe("'");
    expect(
      resolveBracketPairKey({
        key: '"',
        code: 'Quote',
        shiftKey: true,
      } as KeyStub),
    ).toBe('"');
    expect(resolveBracketPairKey({ key: '`', code: 'Backquote' } as KeyStub)).toBe(
      '`',
    );
    expect(
      resolveBracketPairKey({ key: '₩', code: 'Backquote' } as KeyStub),
    ).toBe('`');
  });

  it('ignores modifiers and composing', async () => {
    const { resolveBracketPairKey } = await import(
      '@/components/haimEditor/codeBlockBracketPairs'
    );
    expect(
      resolveBracketPairKey({
        key: '[',
        code: 'BracketLeft',
        ctrlKey: true,
      } as KeyStub),
    ).toBeNull();
    expect(
      resolveBracketPairKey({
        key: '[',
        code: 'BracketLeft',
        isComposing: true,
      } as KeyStub),
    ).toBeNull();
  });
});

describe('code block bracket pairs', () => {
  async function setup() {
    const { Editor } = await import('@tiptap/core');
    const StarterKit = (await import('@tiptap/starter-kit')).default;
    const { TextSelection } = await import('@tiptap/pm/state');
    const pairs = await import('@/components/haimEditor/codeBlockBracketPairs');

    function createCodeBlockEditor(code: string, language = 'js') {
      return new Editor({
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
    }

    function selectInCode(
      editor: InstanceType<typeof Editor>,
      from: number,
      to: number = from,
    ): void {
      const textFrom = 1;
      const { tr } = editor.state;
      tr.setSelection(TextSelection.create(tr.doc, textFrom + from, textFrom + to));
      editor.view.dispatch(tr);
    }

    return { ...pairs, createCodeBlockEditor, selectInCode, Editor, StarterKit };
  }

  it('wraps a non-empty selection with brackets', async () => {
    const {
      createCodeBlockEditor,
      selectInCode,
      isSelectionInsideSameCodeBlock,
      buildCodeBlockBracketTransaction,
    } = await setup();
    const ed = createCodeBlockEditor('hello');
    try {
      selectInCode(ed, 0, 5);
      expect(isSelectionInsideSameCodeBlock(ed.state)).toBe(true);
      const tr = buildCodeBlockBracketTransaction(ed.state, '[');
      expect(tr).not.toBeNull();
      ed.view.dispatch(tr!);
      expect(ed.state.doc.textContent).toBe('[hello]');
      expect(ed.state.selection.from).toBe(2);
      expect(ed.state.selection.to).toBe(7);
    } finally {
      ed.destroy();
    }
  });

  it('wraps with parentheses and braces', async () => {
    const { createCodeBlockEditor, selectInCode, buildCodeBlockBracketTransaction } =
      await setup();
    const ed = createCodeBlockEditor('x');
    try {
      selectInCode(ed, 0, 1);
      ed.view.dispatch(buildCodeBlockBracketTransaction(ed.state, '(')!);
      expect(ed.state.doc.textContent).toBe('(x)');

      selectInCode(ed, 1, 2);
      ed.view.dispatch(buildCodeBlockBracketTransaction(ed.state, '{')!);
      expect(ed.state.doc.textContent).toBe('({x})');
    } finally {
      ed.destroy();
    }
  });

  it('auto-inserts a pair on empty selection', async () => {
    const { createCodeBlockEditor, selectInCode, buildCodeBlockBracketTransaction } =
      await setup();
    const ed = createCodeBlockEditor('ab');
    try {
      selectInCode(ed, 1);
      ed.view.dispatch(buildCodeBlockBracketTransaction(ed.state, '{')!);
      expect(ed.state.doc.textContent).toBe('a{}b');
      expect(ed.state.selection.from).toBe(3);
    } finally {
      ed.destroy();
    }
  });

  it('skips over an existing closing bracket', async () => {
    const { createCodeBlockEditor, selectInCode, buildCodeBlockBracketTransaction } =
      await setup();
    const ed = createCodeBlockEditor('a{}b');
    try {
      selectInCode(ed, 2);
      const tr = buildCodeBlockBracketTransaction(ed.state, '}');
      expect(tr).not.toBeNull();
      ed.view.dispatch(tr!);
      expect(ed.state.doc.textContent).toBe('a{}b');
      expect(ed.state.selection.from).toBe(4);
    } finally {
      ed.destroy();
    }
  });

  it('Backspace deletes an empty pair', async () => {
    const {
      createCodeBlockEditor,
      selectInCode,
      buildCodeBlockBracketBackspaceTransaction,
    } = await setup();
    const ed = createCodeBlockEditor('a()b');
    try {
      selectInCode(ed, 2);
      const tr = buildCodeBlockBracketBackspaceTransaction(ed.state);
      expect(tr).not.toBeNull();
      ed.view.dispatch(tr!);
      expect(ed.state.doc.textContent).toBe('ab');
    } finally {
      ed.destroy();
    }
  });

  it('does not auto-pair quote after a word character', async () => {
    const { createCodeBlockEditor, selectInCode, buildCodeBlockBracketTransaction } =
      await setup();
    const ed = createCodeBlockEditor('don');
    try {
      selectInCode(ed, 3);
      expect(buildCodeBlockBracketTransaction(ed.state, "'")).toBeNull();
    } finally {
      ed.destroy();
    }
  });

  it('does not act outside code blocks', async () => {
    const {
      Editor,
      StarterKit,
      isSelectionInsideSameCodeBlock,
      buildCodeBlockBracketTransaction,
    } = await setup();
    const ed = new Editor({
      extensions: [StarterKit],
      content: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [{ type: 'text', text: 'hello' }],
          },
        ],
      },
    });
    try {
      const { from } = ed.state.selection;
      ed.commands.setTextSelection({ from, to: from + 5 });
      expect(isSelectionInsideSameCodeBlock(ed.state)).toBe(false);
      expect(buildCodeBlockBracketTransaction(ed.state, '[')).toBeNull();
    } finally {
      ed.destroy();
    }
  });

  it('wraps with backticks only in JS-family languages', async () => {
    const { createCodeBlockEditor, selectInCode, buildCodeBlockBracketTransaction } =
      await setup();
    const js = createCodeBlockEditor('foo', 'tsx');
    try {
      selectInCode(js, 0, 3);
      js.view.dispatch(buildCodeBlockBracketTransaction(js.state, '`')!);
      expect(js.state.doc.textContent).toBe('`foo`');
    } finally {
      js.destroy();
    }

    const py = createCodeBlockEditor('foo', 'python');
    try {
      selectInCode(py, 0, 3);
      expect(buildCodeBlockBracketTransaction(py.state, '`')).toBeNull();
    } finally {
      py.destroy();
    }
  });
});
