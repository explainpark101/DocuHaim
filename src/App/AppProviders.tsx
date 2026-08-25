import type { ReactNode } from 'react';
import { AppBootstrapStateProvider } from '@/App/providers/AppBootstrapStateProvider';
import { AppVaultStateProvider } from '@/App/providers/AppVaultStateProvider';
import { VaultProvider } from '@/App/providers/VaultProvider';
import { AppFileSessionStateProvider } from '@/App/providers/AppFileSessionStateProvider';
import { WorkspaceTabsProvider } from '@/App/providers/WorkspaceTabsProvider';
import { FileSessionProvider } from '@/App/providers/FileSessionProvider';
import { AppTreeOpsStateProvider } from '@/App/providers/AppTreeOpsStateProvider';
import { TreeOpsProvider } from '@/App/providers/TreeOpsProvider';
import { AppPwaSnippetsStateProvider } from '@/App/providers/AppPwaSnippetsStateProvider';
import { RecordingProvider } from '@/App/providers/RecordingProvider';
import { AppLogicProvider } from '@/App/providers/AppLogicProvider';
import { APP_PROVIDER_ORDER } from '@/App/providers/providerOrder';

export { APP_PROVIDER_ORDER };

/** FileSessionState above Tabs so tab actions can flush editor via useFileSessionOwned. */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AppBootstrapStateProvider>
      <AppVaultStateProvider>
        <VaultProvider>
          <AppFileSessionStateProvider>
            <WorkspaceTabsProvider>
              <FileSessionProvider>
                <AppTreeOpsStateProvider>
                  <TreeOpsProvider>
                    <AppPwaSnippetsStateProvider>
                      <RecordingProvider>
                        <AppLogicProvider>{children}</AppLogicProvider>
                      </RecordingProvider>
                    </AppPwaSnippetsStateProvider>
                  </TreeOpsProvider>
                </AppTreeOpsStateProvider>
              </FileSessionProvider>
            </WorkspaceTabsProvider>
          </AppFileSessionStateProvider>
        </VaultProvider>
      </AppVaultStateProvider>
    </AppBootstrapStateProvider>
  );
}
