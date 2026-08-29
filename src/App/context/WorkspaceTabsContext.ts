import { createContext } from 'react';
import type { useWorkspaceTabs } from '@/utils/workspaceTabs/useWorkspaceTabs';
import type { WorkspaceTabsState } from '@/utils/workspaceTabs/types';

export type WorkspaceTabsCtxValue = ReturnType<typeof useWorkspaceTabs> & {
  workspaceTabsEnabled: boolean;
  setWorkspaceTabsEnabled: (enabled: boolean) => void;
  workspaceTabsEnabledRef: { current: boolean };
  workspaceTabsRef: { current: WorkspaceTabsState };
  hasRestoredPersistedWorkspaceTabsRef: { current: boolean };
  activateWorkspaceTab: (...args: any[]) => any;
  closeWorkspaceTabById: (...args: any[]) => any;
  openChatWorkspaceTab: (...args: any[]) => any;
  openSettingsWorkspaceTab: (...args: any[]) => any;
  openContentSearchWorkspaceTab: (...args: any[]) => any;
  reorderWorkspaceTabs: (...args: any[]) => any;
  collapseToLegacyWorkspace: (...args: any[]) => any;
  cycleWorkspaceTab: (...args: any[]) => any;
};

export const WorkspaceTabsContext = createContext<WorkspaceTabsCtxValue | null>(null);
