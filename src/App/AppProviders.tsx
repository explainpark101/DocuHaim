import type { ReactNode } from 'react';
import { WorkspaceTabsProvider } from '@/App/providers/WorkspaceTabsProvider';
import { AppBootstrapStateProvider } from '@/App/providers/AppBootstrapStateProvider';
import { AppVaultStateProvider } from '@/App/providers/AppVaultStateProvider';
import { VaultProvider } from '@/App/providers/VaultProvider';
import { AppFileSessionStateProvider } from '@/App/providers/AppFileSessionStateProvider';
import { FileSessionProvider } from '@/App/providers/FileSessionProvider';
import { AppTreeOpsStateProvider } from '@/App/providers/AppTreeOpsStateProvider';
import { AppPwaSnippetsStateProvider } from '@/App/providers/AppPwaSnippetsStateProvider';
import { RecordingProvider } from '@/App/providers/RecordingProvider';
import { AppLogicProvider } from '@/App/providers/AppLogicProvider';
import { APP_PROVIDER_ORDER } from '@/App/providers/providerOrder';

export { APP_PROVIDER_ORDER };

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AppBootstrapStateProvider>
      <AppVaultStateProvider>
        <VaultProvider>
          <WorkspaceTabsProvider>
            <AppFileSessionStateProvider>
              <FileSessionProvider>
                <AppTreeOpsStateProvider>
                  <AppPwaSnippetsStateProvider>
                    <RecordingProvider>
                      <AppLogicProvider>{children}</AppLogicProvider>
                    </RecordingProvider>
                  </AppPwaSnippetsStateProvider>
                </AppTreeOpsStateProvider>
              </FileSessionProvider>
            </AppFileSessionStateProvider>
          </WorkspaceTabsProvider>
        </VaultProvider>
      </AppVaultStateProvider>
    </AppBootstrapStateProvider>
  );
}
