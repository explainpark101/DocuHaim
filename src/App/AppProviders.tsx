import type { ReactNode } from 'react';
import { WorkspaceTabsProvider } from '@/App/providers/WorkspaceTabsProvider';
import { AppBootstrapStateProvider } from '@/App/providers/AppBootstrapStateProvider';
import { AppVaultStateProvider } from '@/App/providers/AppVaultStateProvider';
import { AppFileSessionStateProvider } from '@/App/providers/AppFileSessionStateProvider';
import { AppLogicProvider } from '@/App/providers/AppLogicProvider';
import { APP_PROVIDER_ORDER } from '@/App/providers/providerOrder';

export { APP_PROVIDER_ORDER };

/**
 * Owned state providers wrap AppLogic so the controller can read domain state.
 * Conceptual order: Bootstrap → Vault → Tabs → FileSession → (Tree/AutoSave in AppLogic).
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AppBootstrapStateProvider>
      <AppVaultStateProvider>
        <WorkspaceTabsProvider>
          <AppFileSessionStateProvider>
            <AppLogicProvider>{children}</AppLogicProvider>
          </AppFileSessionStateProvider>
        </WorkspaceTabsProvider>
      </AppVaultStateProvider>
    </AppBootstrapStateProvider>
  );
}
