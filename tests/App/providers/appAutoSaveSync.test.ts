import { emptyWorkspaceTabsState } from '@/utils/workspaceTabs';
import { createAutoSaveSyncHandlers } from '@/App/providers/createAutoSaveSyncHandlers';
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

  it('schedules idle auto-save for editable vault markdown and cleans up', async () => {
    vi.useFakeTimers();
    const deps = makeDeps({
      currentFile: {
        type: 'local',
        viewer: 'markdown',
        id: 'note.md',
        name: 'note.md',
        content: 'old',
      },
      getAutoSavePolicy: () => ({ mode: 'afterDebounce', amount: 5, unit: 's' }),
    });
    const { runAutoSaveEffect } = createAutoSaveSyncHandlers(deps);
    const lastInputAt = Date.now();

    const cleanup = runAutoSaveEffect({
      currentFile: deps.currentFile,
      editorContent: 'new',
      lastInputAt,
    });

    expect(typeof cleanup).toBe('function');
    await vi.advanceTimersByTimeAsync(4999);
    expect(deps.saveFile).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(1);
    expect(deps.saveFile).toHaveBeenCalled();
    cleanup?.();
    vi.useRealTimers();
  });

  it('does not schedule a timer when auto-save is off', async () => {
    vi.useFakeTimers();
    const deps = makeDeps({
      getAutoSavePolicy: () => ({ mode: 'off', amount: 5, unit: 's' }),
      currentFile: {
        type: 'local',
        viewer: 'markdown',
        id: 'note.md',
        name: 'note.md',
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
    await vi.advanceTimersByTimeAsync(10_000);
    expect(deps.saveFile).not.toHaveBeenCalled();
    vi.useRealTimers();
  });

  it('keeps the elapsed-time deadline when typing continues', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T00:00:00Z'));
    const dirtySinceRef = { current: null as number | null };
    const deps = makeDeps({
      dirtySinceRef,
      getAutoSavePolicy: () => ({ mode: 'afterDelay', amount: 5, unit: 's' }),
      currentFile: {
        type: 'local',
        viewer: 'markdown',
        id: 'note.md',
        name: 'note.md',
        content: 'old',
      },
    });
    const { runAutoSaveEffect } = createAutoSaveSyncHandlers(deps);

    const first = runAutoSaveEffect({
      currentFile: deps.currentFile,
      editorContent: 'new',
      lastInputAt: Date.now(),
    });
    await vi.advanceTimersByTimeAsync(2000);
    first?.();
    const second = runAutoSaveEffect({
      currentFile: deps.currentFile,
      editorContent: 'newer',
      lastInputAt: Date.now(),
    });
    await vi.advanceTimersByTimeAsync(2999);
    expect(deps.saveFile).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(1);
    expect(deps.saveFile).toHaveBeenCalledTimes(1);
    second?.();
    vi.useRealTimers();
  });
});
