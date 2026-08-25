import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react';
import { WorkspaceTabsContext } from '@/App/context/WorkspaceTabsContext';
import { useWorkspaceTabs } from '@/utils/workspaceTabs/useWorkspaceTabs';
import { loadWorkspaceTabsEnabled } from '@/utils/workspaceTabsSettings';
import {
  useWorkspaceTabsDomain,
  type TabBridgeDeps,
} from '@/App/hooks/useWorkspaceTabsDomain';

type Props = { children: ReactNode };

/**
 * Owns workspace tab state + activate/close/open/reorder actions (useWorkspaceTabsDomain).
 * Bridge deps (focus-save, dirty-close modal) inject from orchestration.
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
  const hasRestoredPersistedWorkspaceTabsRef = useRef(false);
  const bridgeDepsRef = useRef<TabBridgeDeps>({});

  const registerTabBridgeDeps = useCallback((deps: Partial<TabBridgeDeps>) => {
    bridgeDepsRef.current = { ...bridgeDepsRef.current, ...deps };
  }, []);

  const domain = useWorkspaceTabsDomain({
    tabsApi,
    workspaceTabsEnabled,
    setWorkspaceTabsEnabled,
    workspaceTabsEnabledRef,
    workspaceTabsRef,
    bridgeDepsRef,
    hasRestoredPersistedWorkspaceTabsRef,
  });

  const value = useMemo(
    () => ({
      ...tabsApi,
      workspaceTabsEnabled: domain.workspaceTabsEnabled,
      setWorkspaceTabsEnabled: domain.setWorkspaceTabsEnabled,
      workspaceTabsEnabledRef: domain.workspaceTabsEnabledRef,
      workspaceTabsRef: domain.workspaceTabsRef,
      registerTabBridgeDeps,
      hasRestoredPersistedWorkspaceTabsRef,
      activateWorkspaceTab: domain.activateWorkspaceTab,
      closeWorkspaceTabById: domain.closeWorkspaceTabById,
      openChatWorkspaceTab: domain.openChatWorkspaceTab,
      openSettingsWorkspaceTab: domain.openSettingsWorkspaceTab,
      reorderWorkspaceTabs: domain.reorderWorkspaceTabs,
      collapseToLegacyWorkspace: domain.collapseToLegacyWorkspace,
      cycleWorkspaceTab: domain.cycleWorkspaceTab,
    }),
    [tabsApi, domain, registerTabBridgeDeps],
  );

  return (
    <WorkspaceTabsContext.Provider value={value}>{children}</WorkspaceTabsContext.Provider>
  );
}
