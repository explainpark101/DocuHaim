import { useContext } from 'react';
import { AppShellContext, type AppShellBag } from '@/App/context/AppShellContext';

/** Full shell bag — prefer domain hooks for new code. */
export function useAppShell(): AppShellBag {
  const ctx = useContext(AppShellContext);
  if (!ctx) throw new Error('useAppShell must be used within AppProviders');
  return ctx;
}
