import { useCallback, useRef, useState, type SetStateAction } from 'react';
import type { FileWorkspaceTab, WorkspaceTabsState } from '@/utils/workspaceTabs/types';
import {
  activateTab,
  closeTab,
  emptyWorkspaceTabsState,
  evictForSoftCap,
  findFileTab,
  getActiveFileTab,
  getActiveTab,
  openOrActivateChat,
  openOrReplaceFileTab,
  patchFileTab,
  type OpenFileTabInput,
} from '@/utils/workspaceTabs/workspaceTabsStore';

/**
 * Workspace tab state with a mutable ref that stays ahead of React renders.
 *
 * Async open/conflict flows update tabs across await points (e.g. note-content
 * conflict modal). Functional updaters must apply against this ref — not a
 * stale React `prev` — and render must NOT clobber the ref from an older
 * committed state (that wiped non-focused split-pane bodies after diff).
 */
export function useWorkspaceTabs(initial?: WorkspaceTabsState) {
  const [state, setStateRaw] = useState<WorkspaceTabsState>(
    () => initial ?? emptyWorkspaceTabsState(),
  );
  const stateRef = useRef(state);

  const setState = useCallback((update: SetStateAction<WorkspaceTabsState>) => {
    setStateRaw(() => {
      const next =
        typeof update === 'function'
          ? (update as (prev: WorkspaceTabsState) => WorkspaceTabsState)(stateRef.current)
          : update;
      stateRef.current = next;
      return next;
    });
  }, []);

  const activate = useCallback((id: string) => {
    setState((prev) => activateTab(prev, id));
  }, [setState]);

  const openChat = useCallback(() => {
    setState((prev) => openOrActivateChat(prev));
  }, [setState]);

  const openFile = useCallback(
    (
      input: OpenFileTabInput,
      opts?: { promptCloseDirty?: (tab: FileWorkspaceTab) => boolean },
    ): boolean => {
      let ok = true;
      setState((prev) => {
        const existing = findFileTab(prev, input.storageType, input.path);
        if (existing) {
          return openOrReplaceFileTab(prev, input);
        }
        const evictOpts =
          opts?.promptCloseDirty != null ? { promptCloseDirty: opts.promptCloseDirty } : {};
        const evicted = evictForSoftCap(prev.tabs, evictOpts);
        if (!evicted) {
          ok = false;
          return prev;
        }
        return openOrReplaceFileTab({ ...prev, tabs: evicted.tabs }, input);
      });
      return ok;
    },
    [setState],
  );

  const patchFile = useCallback(
    (
      id: string,
      patch: Parameters<typeof patchFileTab>[2],
    ) => {
      setState((prev) => patchFileTab(prev, id, patch));
    },
    [setState],
  );

  const close = useCallback((id: string) => {
    setState((prev) => closeTab(prev, id));
  }, [setState]);

  const replaceState = useCallback((next: WorkspaceTabsState) => {
    setState(next);
  }, [setState]);

  return {
    state,
    stateRef,
    tabs: state.tabs,
    activeId: state.activeId,
    activeTab: getActiveTab(state),
    activeFileTab: getActiveFileTab(state),
    activate,
    openChat,
    openFile,
    patchFile,
    close,
    replaceState,
    setState,
  };
}
