import type { ReactNode } from 'react';
import { WorkspaceTabsProvider } from '@/App/providers/WorkspaceTabsProvider';
import { AppLogicProvider } from '@/App/providers/AppLogicProvider';
import { APP_PROVIDER_ORDER } from '@/App/providers/providerOrder';

export { APP_PROVIDER_ORDER };

/**
 * Nesting (conceptual order in APP_PROVIDER_ORDER):
 *   Bootstrap → Vault → WorkspaceTabs → FileSession → TreeOps → AutoSave
 *
 * WorkspaceTabsProvider wraps AppLogic so tab state exists before the controller
 * runs; AppLogic then nests Bootstrap/Vault/File/Tree/AutoSave around the shell.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <WorkspaceTabsProvider>
      <AppLogicProvider>{children}</AppLogicProvider>
    </WorkspaceTabsProvider>
  );
}
