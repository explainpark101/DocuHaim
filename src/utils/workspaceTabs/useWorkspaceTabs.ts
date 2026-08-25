import { useCallback, useState } from 'react';
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

export function useWorkspaceTabs(initial?: WorkspaceTabsState) {
  const [state, setState] = useState<WorkspaceTabsState>(
    () => initial ?? emptyWorkspaceTabsState(),
  );

  const activate = useCallback((id: string) => {
    setState((prev) => activateTab(prev, id));
  }, []);

  const openChat = useCallback(() => {
    setState((prev) => openOrActivateChat(prev));
  }, []);

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
    [],
  );

  const patchFile = useCallback(
    (
      id: string,
      patch: Parameters<typeof patchFileTab>[2],
    ) => {
      setState((prev) => patchFileTab(prev, id, patch));
    },
    [],
  );

  const close = useCallback((id: string) => {
    setState((prev) => closeTab(prev, id));
  }, []);

  const replaceState = useCallback((next: WorkspaceTabsState) => {
    setState(next);
  }, []);

  return {
    state,
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
