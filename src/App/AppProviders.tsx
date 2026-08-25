import type { ReactNode } from 'react';
import { WorkspaceTabsProvider } from '@/App/providers/WorkspaceTabsProvider';
import { AppBootstrapStateProvider } from '@/App/providers/AppBootstrapStateProvider';
import { AppVaultStateProvider } from '@/App/providers/AppVaultStateProvider';
import { VaultProvider } from '@/App/providers/VaultProvider';
import { AppFileSessionStateProvider } from '@/App/providers/AppFileSessionStateProvider';
import { AppTreeOpsStateProvider } from '@/App/providers/AppTreeOpsStateProvider';
import { AppPwaSnippetsStateProvider } from '@/App/providers/AppPwaSnippetsStateProvider';
import { RecordingProvider } from '@/App/providers/RecordingProvider';
import { AppLogicProvider } from '@/App/providers/AppLogicProvider';
import { APP_PROVIDER_ORDER } from '@/App/providers/providerOrder';

export { APP_PROVIDER_ORDER };

/**
 * VaultProvider (handlers) wraps AppLogic so the controller uses useVault().
 * Conceptual order: Bootstrap → Vault → Tabs → File → Tree → AutoSave.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AppBootstrapStateProvider>
      <AppVaultStateProvider>
        <VaultProvider>
          <WorkspaceTabsProvider>
            <AppFileSessionStateProvider>
              <AppTreeOpsStateProvider>
                <AppPwaSnippetsStateProvider>
                  <RecordingProvider>
                    <AppLogicProvider>{children}</AppLogicProvider>
                  </RecordingProvider>
                </AppPwaSnippetsStateProvider>
              </AppTreeOpsStateProvider>
            </AppFileSessionStateProvider>
          </WorkspaceTabsProvider>
        </VaultProvider>
      </AppVaultStateProvider>
    </AppBootstrapStateProvider>
  );
}
