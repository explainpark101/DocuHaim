import { describe, expect, it } from 'vitest';
import {
  anyFileTabDirty,
  createChatTab,
  createFileTab,
  createSettingsTab,
  fileTabId,
  isChatTab,
  isFileTab,
  isFileTabDirty,
  isSettingsTab,
  tabDisplayTitle,
} from '@/utils/workspaceTabs/helpers';

describe('workspaceTabs helpers', () => {
  it('builds stable file tab ids and kind guards', () => {
    expect(fileTabId('s3', 'a.md')).toBe('s3:a.md');
    expect(isChatTab(createChatTab())).toBe(true);
    expect(isSettingsTab(createSettingsTab())).toBe(true);

    const file = createFileTab({
      storageType: 'local',
      path: 'notes/hello.md',
      currentFile: { name: 'hello.md', content: 'a', viewer: 'markdown' },
      editorContent: 'a',
      now: 1,
    });
    expect(isFileTab(file)).toBe(true);
    expect(file.id).toBe('local:notes/hello.md');
    expect(tabDisplayTitle(file)).toBe('hello.md');
  });

  it('detects dirty editable file tabs', () => {
    const clean = createFileTab({
      storageType: 's3',
      path: 'a.md',
      currentFile: { name: 'a.md', content: 'same', viewer: 'markdown' },
      editorContent: 'same',
    });
    const dirty = { ...clean, editorContent: 'changed' };
    expect(isFileTabDirty(clean)).toBe(false);
    expect(isFileTabDirty(dirty)).toBe(true);
    expect(anyFileTabDirty([createChatTab(), dirty])).toBe(true);
    expect(anyFileTabDirty([createChatTab(), clean])).toBe(false);
  });
});
