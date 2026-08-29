import { useMemo, useRef, useState, type ReactNode } from 'react';
import { WorkspaceTabsContext } from '@/App/context/WorkspaceTabsContext';
import { useWorkspaceTabs } from '@/utils/workspaceTabs/useWorkspaceTabs';
import { loadWorkspaceTabsEnabled } from '@/utils/workspaceTabsSettings';
import { useWorkspaceTabsDomain } from '@/App/hooks/useWorkspaceTabsDomain';

type Props = { children: ReactNode };

/**
 * Owns workspace tab state + activate/close/open/reorder actions (useWorkspaceTabsDomain).
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

  const domain = useWorkspaceTabsDomain({
    tabsApi,
    workspaceTabsEnabled,
    setWorkspaceTabsEnabled,
    workspaceTabsEnabledRef,
    workspaceTabsRef,
    hasRestoredPersistedWorkspaceTabsRef,
  });

  const value = useMemo(
    () => ({
      ...tabsApi,
      workspaceTabsEnabled: domain.workspaceTabsEnabled,
      setWorkspaceTabsEnabled: domain.setWorkspaceTabsEnabled,
      workspaceTabsEnabledRef: domain.workspaceTabsEnabledRef,
      workspaceTabsRef: domain.workspaceTabsRef,
      hasRestoredPersistedWorkspaceTabsRef,
      activateWorkspaceTab: domain.activateWorkspaceTab,
      closeWorkspaceTabById: domain.closeWorkspaceTabById,
      openChatWorkspaceTab: domain.openChatWorkspaceTab,
      openSettingsWorkspaceTab: domain.openSettingsWorkspaceTab,
      openContentSearchWorkspaceTab: domain.openContentSearchWorkspaceTab,
      reorderWorkspaceTabs: domain.reorderWorkspaceTabs,
      collapseToLegacyWorkspace: domain.collapseToLegacyWorkspace,
      cycleWorkspaceTab: domain.cycleWorkspaceTab,
    }),
    [tabsApi, domain],
  );

  return (
    <WorkspaceTabsContext.Provider value={value}>{children}</WorkspaceTabsContext.Provider>
  );
}
