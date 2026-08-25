import { emptyWorkspaceTabsState } from '@/utils/workspaceTabs';
import { createAutoSaveSyncHandlers } from '@/App/sections/appAutoSaveSync';
import { describe, expect, it, vi } from 'vitest';

function makeDeps(overrides: Record<string, unknown> = {}) {
  const editorContentRef = { current: '' };
  const prevEditorContentRef = { current: '' };
  const workspaceTabsRef = { current: emptyWorkspaceTabsState() };
  return {
    saveFile: vi.fn(async () => {}),
    setLastAutoSaveAt: vi.fn(),
    setLastAutoSyncAt: vi.fn(),
    setCurrentFile: vi.fn(),
    setEditorContent: vi.fn(),
    editorContentRef,
    prevEditorContentRef,
    workspaceTabsRef,
    setWorkspaceTabs: vi.fn((next) => {
      workspaceTabsRef.current = next;
    }),
    setLastInputAt: vi.fn(),
    getBackendForType: vi.fn(() => null),
    isRecording: false,
    captureSync: vi.fn(),
    currentFile: { type: 's3', viewer: 'markdown', id: 'a.md', name: 'a.md', content: '' },
    ...overrides,
  };
}

describe('createAutoSaveSyncHandlers', () => {
  it('updates editor content and last-input timestamp on change', () => {
    const deps = makeDeps();
    const { handleEditorChange } = createAutoSaveSyncHandlers(deps);

    handleEditorChange('hello');

    expect(deps.editorContentRef.current).toBe('hello');
    expect(deps.setEditorContent).toHaveBeenCalledWith('hello');
    expect(deps.setLastInputAt).toHaveBeenCalled();
  });

  it('skips auto-save for .enc.md notes', () => {
    const deps = makeDeps({
      currentFile: {
        type: 's3',
        viewer: 'markdown',
        id: 'secret.enc.md',
        name: 'secret.enc.md',
        content: 'old',
      },
    });
    const { runAutoSaveEffect } = createAutoSaveSyncHandlers(deps);

    const cleanup = runAutoSaveEffect({
      currentFile: deps.currentFile,
      editorContent: 'new',
      lastInputAt: Date.now(),
    });

    expect(cleanup).toBeUndefined();
    expect(deps.saveFile).not.toHaveBeenCalled();
  });

  it('skips auto-save when storage type is not vault-backed', () => {
    const deps = makeDeps({
      currentFile: {
        type: 'session',
        viewer: 'markdown',
        id: 'tmp.md',
        name: 'tmp.md',
        content: 'old',
      },
    });
    const { runAutoSaveEffect } = createAutoSaveSyncHandlers(deps);

    const cleanup = runAutoSaveEffect({
      currentFile: deps.currentFile,
      editorContent: 'new',
      lastInputAt: Date.now(),
    });

    expect(cleanup).toBeUndefined();
  });

  it('schedules auto-save for editable vault markdown and cleans up', async () => {
    vi.useFakeTimers();
    const deps = makeDeps({
      currentFile: {
        type: 'local',
        viewer: 'markdown',
        id: 'note.md',
        name: 'note.md',
        content: 'old',
      },
    });
    const { runAutoSaveEffect } = createAutoSaveSyncHandlers(deps);
    const lastInputAt = Date.now();

    const cleanup = runAutoSaveEffect({
      currentFile: deps.currentFile,
      editorContent: 'new',
      lastInputAt,
    });

    expect(typeof cleanup).toBe('function');
    await vi.advanceTimersByTimeAsync(5000);
    expect(deps.saveFile).toHaveBeenCalled();
    cleanup?.();
    vi.useRealTimers();
  });
});
