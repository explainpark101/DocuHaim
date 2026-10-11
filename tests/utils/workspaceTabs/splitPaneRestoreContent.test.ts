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

  it('resolveOpenText ignores empty loading shells and uses server when no draft', async () => {
    const existingTab = createFileTab({
      storageType: 's3',
      path: 'a.md',
      currentFile: { name: 'a.md', viewer: 'loading' },
      editorContent: '',
    });
    const deleteDraft = vi.fn(async () => {});
    const askConflict = vi.fn(async () => 'server' as const);
    const result = await resolveOpenTextContent({
      serverText: '# correct a.md',
      serverLastModTs: Date.now(),
      existingTab,
      draft: null,
      fileName: 'a.md',
      filePath: 'a.md',
      deleteDraft,
      askConflict,
    });
    expect(result.contentToUse).toBe('# correct a.md');
    expect(result.baselineContent).toBe('# correct a.md');
    expect(deleteDraft).not.toHaveBeenCalled();
    expect(askConflict).not.toHaveBeenCalled();
  });

  it('resolveOpenText uses hydrated loading-shell body when draft is missing', async () => {
    const existingTab = createFileTab({
      storageType: 's3',
      path: 'b.md',
      currentFile: { name: 'b.md', viewer: 'loading' },
      editorContent: '# parked last viewed',
    });
    const deleteDraft = vi.fn(async () => {});
    const askConflict = vi.fn(async () => 'local' as const);
    const result = await resolveOpenTextContent({
      serverText: '# from server',
      serverLastModTs: Date.now(),
      existingTab,
      draft: null,
      fileName: 'b.md',
      filePath: 'b.md',
      deleteDraft,
      askConflict,
    });
    expect(askConflict).toHaveBeenCalledOnce();
    expect(result.contentToUse).toBe('# parked last viewed');
    expect(result.baselineContent).toBe('# from server');
  });

  it('asks which version when last-viewed draft differs from server', async () => {
    const deleteDraft = vi.fn(async () => {});
    const askConflict = vi.fn(async () => 'local' as const);
    const result = await resolveOpenTextContent({
      serverText: '# from server',
      serverLastModTs: Date.now(),
      existingTab: null,
      draft: { content: '# last viewed', originalLastModified: 1 },
      fileName: 'note.md',
      filePath: 'folder/note.md',
      deleteDraft,
      askConflict,
    });
    expect(askConflict).toHaveBeenCalledOnce();
    expect(result.contentToUse).toBe('# last viewed');
    expect(result.baselineContent).toBe('# from server');
    expect(deleteDraft).not.toHaveBeenCalled();
  });

  it('uses server and deletes draft when user chooses server', async () => {
    const deleteDraft = vi.fn(async () => {});
    const askConflict = vi.fn(async () => 'server' as const);
    const result = await resolveOpenTextContent({
      serverText: '# from server',
      serverLastModTs: Date.now(),
      existingTab: null,
      draft: { content: '# last viewed', originalLastModified: 1 },
      fileName: 'note.md',
      filePath: 'folder/note.md',
      deleteDraft,
      askConflict,
    });
    expect(result.contentToUse).toBe('# from server');
    expect(result.baselineContent).toBe('# from server');
    expect(deleteDraft).toHaveBeenCalledOnce();
  });

  it('skips ask when draft matches server', async () => {
    const deleteDraft = vi.fn(async () => {});
    const askConflict = vi.fn(async () => 'local' as const);
    const result = await resolveOpenTextContent({
      serverText: '# same',
      serverLastModTs: Date.now(),
      existingTab: null,
      draft: { content: '# same', originalLastModified: 1 },
      fileName: 'note.md',
      filePath: 'note.md',
      deleteDraft,
      askConflict,
    });
    expect(askConflict).not.toHaveBeenCalled();
    expect(result.contentToUse).toBe('# same');
    expect(deleteDraft).toHaveBeenCalledOnce();
  });

  it('keeps previous-file content for undo persist when props already swapped', () => {
    expect(contentForPreviousFileKey('# file A body', '# file B body')).toBe('# file A body');
  });
});
