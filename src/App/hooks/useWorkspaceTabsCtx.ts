import { useContext } from 'react';
import {
  WorkspaceTabsContext,
  type WorkspaceTabsCtxValue,
} from '@/App/context/WorkspaceTabsContext';

export function useWorkspaceTabsCtx(): WorkspaceTabsCtxValue {
  const ctx = useContext(WorkspaceTabsContext);
  if (!ctx) throw new Error('useWorkspaceTabsCtx must be used within WorkspaceTabsProvider');
  return ctx;
}

/** Optional: for logic that may run before tabs provider during tests. */
export function useWorkspaceTabsCtxOptional(): WorkspaceTabsCtxValue | null {
  return useContext(WorkspaceTabsContext);
}
