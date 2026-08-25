import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react';
import { WorkspaceTabsContext } from '@/App/context/WorkspaceTabsContext';
import { useWorkspaceTabs } from '@/utils/workspaceTabs/useWorkspaceTabs';
import { loadWorkspaceTabsEnabled } from '@/utils/workspaceTabsSettings';

type Props = { children: ReactNode };

type TabActions = {
  activateWorkspaceTab: (...args: any[]) => any;
  closeWorkspaceTabById: (...args: any[]) => any;
  openChatWorkspaceTab: (...args: any[]) => any;
  openSettingsWorkspaceTab: (...args: any[]) => any;
  reorderWorkspaceTabs: (...args: any[]) => any;
};

const noop = (..._args: any[]) => {};

/**
 * Sole owner of workspace tab React state. Shell tab actions are registered by
 * AppLogic (controller) via `registerTabActions` — no outer context re-wrap.
 */
export function WorkspaceTabsProvider({ children }: Props) {
  const tabsApi = useWorkspaceTabs();
  const [workspaceTabsEnabled, setWorkspaceTabsEnabled] = useState(() =>
    loadWorkspaceTabsEnabled(),
  );
  const workspaceTabsEnabledRef = useRef(workspaceTabsEnabled);
  workspaceTabsEnabledRef.current = workspaceTabsEnabled;
  const workspaceTabsRef = useRef(tabsApi.state);
  workspaceTabsRef.current = tabsApi.state;

  const actionsRef = useRef<TabActions>({
    activateWorkspaceTab: noop,
    closeWorkspaceTabById: noop,
    openChatWorkspaceTab: noop,
    openSettingsWorkspaceTab: noop,
    reorderWorkspaceTabs: noop,
  });

  const registerTabActions = useCallback((actions: Partial<TabActions>) => {
    actionsRef.current = { ...actionsRef.current, ...actions };
  }, []);

  const value = useMemo(
    () => ({
      ...tabsApi,
      workspaceTabsEnabled,
      setWorkspaceTabsEnabled,
      workspaceTabsEnabledRef,
      workspaceTabsRef,
      registerTabActions,
      activateWorkspaceTab: (...args: any[]) =>
        actionsRef.current.activateWorkspaceTab(...args),
      closeWorkspaceTabById: (...args: any[]) =>
        actionsRef.current.closeWorkspaceTabById(...args),
      openChatWorkspaceTab: (...args: any[]) =>
        actionsRef.current.openChatWorkspaceTab(...args),
      openSettingsWorkspaceTab: (...args: any[]) =>
        actionsRef.current.openSettingsWorkspaceTab(...args),
      reorderWorkspaceTabs: (...args: any[]) =>
        actionsRef.current.reorderWorkspaceTabs(...args),
    }),
    [tabsApi, workspaceTabsEnabled, registerTabActions],
  );

  return (
    <WorkspaceTabsContext.Provider value={value}>{children}</WorkspaceTabsContext.Provider>
  );
}
