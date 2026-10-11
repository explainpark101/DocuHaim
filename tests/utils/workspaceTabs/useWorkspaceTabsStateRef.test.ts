import { describe, expect, it } from 'vitest';
import type { WorkspaceTabsState } from '@/utils/workspaceTabs/types';
import { emptyWorkspaceTabsState } from '@/utils/workspaceTabs/workspaceTabsStore';
import { createFileTab } from '@/utils/workspaceTabs/helpers';

/**
 * Mirrors useWorkspaceTabs setState: functional updaters apply against stateRef,
 * not a stale React prev. Guards the split-pane conflict/diff race.
 */
function createStateRefMachine(initial: WorkspaceTabsState) {
  const stateRef = { current: initial };
  const setState = (update: WorkspaceTabsState | ((prev: WorkspaceTabsState) => WorkspaceTabsState)) => {
    const next = typeof update === 'function' ? update(stateRef.current) : update;
    stateRef.current = next;
  };
  return { stateRef, setState };
}

describe('workspace tabs stateRef update contract', () => {
  it('chains functional updates so sibling tab bodies are not dropped', () => {
    const tabA = createFileTab({
      storageType: 's3',
      path: 'a.md',
      currentFile: { name: 'a.md', viewer: 'loading', type: 's3', id: 'a.md' },
      editorContent: '# a parked',
    });
    const tabB = createFileTab({
      storageType: 's3',
      path: 'b.md',
      currentFile: { name: 'b.md', viewer: 'loading', type: 's3', id: 'b.md' },
      editorContent: '# b parked',
    });
    const { stateRef, setState } = createStateRefMachine({
      ...emptyWorkspaceTabsState(),
      tabs: [tabA, tabB],
      activeId: tabA.id,
    });

    setState((prev) => ({
      ...prev,
      tabs: prev.tabs.map((t) =>
        t.id === tabA.id && t.kind === 'file'
          ? {
              ...t,
              editorContent: '# a server',
              currentFile: { ...t.currentFile, viewer: 'markdown' },
            }
          : t,
      ),
    }));
    setState((prev) => ({
      ...prev,
      tabs: prev.tabs.map((t) =>
        t.id === tabB.id && t.kind === 'file'
          ? {
              ...t,
              editorContent: '# b server',
              currentFile: { ...t.currentFile, viewer: 'markdown' },
            }
          : t,
      ),
    }));

    const a = stateRef.current.tabs.find((t) => t.id === tabA.id);
    const b = stateRef.current.tabs.find((t) => t.id === tabB.id);
    expect(a && a.kind === 'file' ? a.editorContent : null).toBe('# a server');
    expect(b && b.kind === 'file' ? b.editorContent : null).toBe('# b server');
  });
});
