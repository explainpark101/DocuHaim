import { createContext } from 'react';
import type { useWorkspaceTabs } from '@/utils/workspaceTabs/useWorkspaceTabs';
import type { WorkspaceTabsState } from '@/utils/workspaceTabs/types';
import type { TabBridgeDeps } from '@/App/hooks/useWorkspaceTabsDomain';

export type WorkspaceTabsCtxValue = ReturnType<typeof useWorkspaceTabs> & {
  workspaceTabsEnabled: boolean;
  setWorkspaceTabsEnabled: (enabled: boolean) => void;
  workspaceTabsEnabledRef: { current: boolean };
  workspaceTabsRef: { current: WorkspaceTabsState };
  hasRestoredPersistedWorkspaceTabsRef: { current: boolean };
  registerTabBridgeDeps: (deps: Partial<TabBridgeDeps>) => void;
  activateWorkspaceTab: (...args: any[]) => any;
  closeWorkspaceTabById: (...args: any[]) => any;
  openChatWorkspaceTab: (...args: any[]) => any;
  openSettingsWorkspaceTab: (...args: any[]) => any;
  reorderWorkspaceTabs: (...args: any[]) => any;
  collapseToLegacyWorkspace: (...args: any[]) => any;
  cycleWorkspaceTab: (...args: any[]) => any;
};

export const WorkspaceTabsContext = createContext<WorkspaceTabsCtxValue | null>(null);
