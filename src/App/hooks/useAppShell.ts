import { useContext } from 'react';
import { AppShellContext } from '@/App/context/AppShellContext';
import { useAppHandlers } from '@/App/hooks/useAppHandlers';

/**
 * Back-compat: merges chrome shell + handlers bag for consumers not yet migrated.
 * Prefer useAppChrome / useAppHandlers / domain hooks.
 */
export function useAppShell(): Record<string, any> {
  const chrome = useContext(AppShellContext);
  const handlers = useAppHandlers();
  if (!chrome) throw new Error('useAppShell must be used within AppProviders');
  return { ...handlers, ...chrome };
}
