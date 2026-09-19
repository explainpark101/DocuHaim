import { useMemo, useRef, useState, type ReactNode } from 'react';
import { WorkspaceTabsContext } from '@/App/context/WorkspaceTabsContext';
import { useWorkspaceTabs } from '@/utils/workspaceTabs/useWorkspaceTabs';
import { loadWorkspaceTabsEnabled } from '@/utils/workspaceTabsSettings';
import { useWorkspaceTabsDomain } from '@/App/hooks/useWorkspaceTabsDomain';
import WorkspacePaneSoftCapModal from '@/components/shell/workspace/WorkspacePaneSoftCapModal';

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
      focusWorkspacePane: domain.focusWorkspacePane,
      resizeWorkspaceSplit: domain.resizeWorkspaceSplit,
      handleWorkspacePaneDrop: domain.handleWorkspacePaneDrop,
      splitWorkspaceTabToEdge: domain.splitWorkspaceTabToEdge,
      applyWorkspacePaneLayout: domain.applyWorkspacePaneLayout,
      collapseWorkspacePane: domain.collapseWorkspacePane,
      openExportPdfInFocusedPane: domain.openExportPdfInFocusedPane,
      clearExportPdfInFocusedPane: domain.clearExportPdfInFocusedPane,
    }),
    [tabsApi, domain],
  );

  return (
    <WorkspaceTabsContext.Provider value={value}>
      {children}
      <WorkspacePaneSoftCapModal
        prompt={domain.paneSoftCapPrompt}
        onCancel={domain.cancelPaneSoftCapPrompt}
        onConfirm={domain.confirmPaneSoftCapPrompt}
      />
    </WorkspaceTabsContext.Provider>
  );
}
