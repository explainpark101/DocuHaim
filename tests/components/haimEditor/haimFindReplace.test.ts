import { describe, expect, it } from 'vitest';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from '@tiptap/markdown';
import {
  FindAndReplace,
  searchDocument,
} from '@tiptap/extension-find-and-replace';
import { createHaimExtensions } from '@/components/haimEditor/createHaimExtensions';
import {
  dispatchHaimFindMeta,
  readHaimFindSummary,
} from '@/components/haimEditor/haimFindReplace';

describe('Haim find and replace', () => {
  it('finds matches in a Haim note document', () => {
    const editor = new Editor({
      extensions: createHaimExtensions({ profile: 'note' }),
      content: 'hello **bold** hello',
      contentType: 'markdown',
    });
    try {
      const results = searchDocument(editor.state.doc, 'hello', {
        caseSensitive: false,
        useRegex: false,
        wholeWord: false,
      });
      expect(results).toHaveLength(2);
      expect(results[0]?.from).toBeLessThan(results[0]?.to ?? 0);
    } finally {
      editor.destroy();
    }
  });

  it('dispatchHaimFindMeta records matches without setSearchTerm debounce', () => {
    const editor = new Editor({
      extensions: [
        StarterKit,
        Markdown,
        FindAndReplace.configure({ injectCSS: false }),
      ],
      content: 'hello world hello',
      contentType: 'markdown',
    });
    try {
      editor.view.updateState(
        editor.state.reconfigure({ plugins: editor.extensionManager.plugins }),
      );
      dispatchHaimFindMeta(editor, { searchTerm: 'hello', caseSensitive: false });
      expect(readHaimFindSummary(editor)).toEqual({ count: 2, current: 0 });
      editor.commands.goToNextResult();
      expect(readHaimFindSummary(editor).current).toBe(1);
    } finally {
      editor.destroy();
    }
  });
});
