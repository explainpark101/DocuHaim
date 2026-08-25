import type { ReactNode } from 'react';
import { WorkspaceTabsProvider } from '@/App/providers/WorkspaceTabsProvider';
import { AppBootstrapStateProvider } from '@/App/providers/AppBootstrapStateProvider';
import { AppVaultStateProvider } from '@/App/providers/AppVaultStateProvider';
import { AppLogicProvider } from '@/App/providers/AppLogicProvider';
import { APP_PROVIDER_ORDER } from '@/App/providers/providerOrder';

export { APP_PROVIDER_ORDER };

/**
 * Nesting: Bootstrap + Vault owned state + WorkspaceTabs wrap AppLogic so the
 * controller can read them; AppLogic fans out full domain contexts + AutoSave.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AppBootstrapStateProvider>
      <AppVaultStateProvider>
        <WorkspaceTabsProvider>
          <AppLogicProvider>{children}</AppLogicProvider>
        </WorkspaceTabsProvider>
      </AppVaultStateProvider>
    </AppBootstrapStateProvider>
  );
}
