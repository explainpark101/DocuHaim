import type { ReactNode } from 'react';
import { WorkspaceTabsProvider } from '@/App/providers/WorkspaceTabsProvider';
import { AppBootstrapStateProvider } from '@/App/providers/AppBootstrapStateProvider';
import { AppLogicProvider } from '@/App/providers/AppLogicProvider';
import { APP_PROVIDER_ORDER } from '@/App/providers/providerOrder';

export { APP_PROVIDER_ORDER };

/**
 * Nesting: Bootstrap owned state + WorkspaceTabs wrap AppLogic so the controller
 * can read them; AppLogic fans out Vault/File/Tree/AutoSave + full Bootstrap context.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AppBootstrapStateProvider>
      <WorkspaceTabsProvider>
        <AppLogicProvider>{children}</AppLogicProvider>
      </WorkspaceTabsProvider>
    </AppBootstrapStateProvider>
  );
}
