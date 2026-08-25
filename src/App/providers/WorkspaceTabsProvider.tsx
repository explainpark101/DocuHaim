import { useMemo, useRef, useState, type ReactNode } from 'react';
import { WorkspaceTabsContext } from '@/App/context/WorkspaceTabsContext';
import { useWorkspaceTabs } from '@/utils/workspaceTabs/useWorkspaceTabs';
import { loadWorkspaceTabsEnabled } from '@/utils/workspaceTabsSettings';

type Props = { children: ReactNode };

/**
 * Sole owner of workspace tab React state (`useWorkspaceTabs` → workspaceTabsStore).
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

  const value = useMemo(
    () => ({
      ...tabsApi,
      workspaceTabsEnabled,
      setWorkspaceTabsEnabled,
      workspaceTabsEnabledRef,
      workspaceTabsRef,
      // Shell-specific tab handlers are filled on AppShellContext by AppLogicProvider.
      activateWorkspaceTab: (..._args: any[]) => {},
      closeWorkspaceTabById: (..._args: any[]) => {},
      openChatWorkspaceTab: (..._args: any[]) => {},
      openSettingsWorkspaceTab: (..._args: any[]) => {},
      reorderWorkspaceTabs: (..._args: any[]) => {},
    }),
    [tabsApi, workspaceTabsEnabled],
  );

  return (
    <WorkspaceTabsContext.Provider value={value}>
      {children}
    </WorkspaceTabsContext.Provider>
  );
}
