import { describe, expect, it, vi } from 'vitest';
import {
  createFileTab,
  isFileTabDirty,
} from '@/utils/workspaceTabs/helpers';
import { resolveOpenTextContent } from '@/utils/workspaceTabs/resolveOpenText';
import { contentForPreviousFileKey } from '@/hooks/usePerFileEditorUndoHistory';

describe('split-pane restore content isolation', () => {
  it('does not treat loading shells as dirty even if editorContent drifted', () => {
    const shell = createFileTab({
      storageType: 's3',
      path: 'a.md',
      currentFile: { name: 'a.md', viewer: 'loading' },
      editorContent: '',
    });
    const drifted = { ...shell, editorContent: '# body from another file' };
    expect(isFileTabDirty(shell)).toBe(false);
    expect(isFileTabDirty(drifted)).toBe(false);
  });

  it('resolveOpenText ignores dirty-looking loading shells and uses server text', async () => {
    const existingTab = createFileTab({
      storageType: 's3',
      path: 'a.md',
      currentFile: { name: 'a.md', viewer: 'loading' },
      editorContent: '',
    });
    const poisoned = {
      ...existingTab,
      editorContent: '# other file body',
      baselineContent: '',
    };
    const deleteDraft = vi.fn(async () => {});
    const result = await resolveOpenTextContent({
      serverText: '# correct a.md',
      serverLastModTs: Date.now(),
      existingTab: poisoned,
      draft: null,
      confirmMessage: 'confirm?',
      deleteDraft,
    });
    expect(result.contentToUse).toBe('# correct a.md');
    expect(result.baselineContent).toBe('# correct a.md');
    expect(deleteDraft).not.toHaveBeenCalled();
  });

  it('keeps previous-file content for undo persist when props already swapped', () => {
    expect(contentForPreviousFileKey('# file A body', '# file B body')).toBe('# file A body');
  });
});
