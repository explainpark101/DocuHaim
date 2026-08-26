import type { ReactNode } from 'react';
import { AppBootstrapStateProvider } from '@/App/providers/AppBootstrapStateProvider';
import { AppVaultStateProvider } from '@/App/providers/AppVaultStateProvider';
import { VaultProvider } from '@/App/providers/VaultProvider';
import { AppFileSessionStateProvider } from '@/App/providers/AppFileSessionStateProvider';
import { AppModalsStateProvider } from '@/App/providers/AppModalsStateProvider';
import { WorkspaceTabsProvider } from '@/App/providers/WorkspaceTabsProvider';
import { AppChromeStateProvider } from '@/App/providers/AppChromeStateProvider';
import { FileSessionProvider } from '@/App/providers/FileSessionProvider';
import { AppTreeOpsStateProvider } from '@/App/providers/AppTreeOpsStateProvider';
import { TreeOpsProvider } from '@/App/providers/TreeOpsProvider';
import { AppPwaSnippetsStateProvider } from '@/App/providers/AppPwaSnippetsStateProvider';
import { RecordingProvider } from '@/App/providers/RecordingProvider';
import { AppLogicProvider } from '@/App/providers/AppLogicProvider';
import { LlmAssistSessionProvider } from '@/contexts/LlmAssistSessionContext';
import { APP_PROVIDER_ORDER, APP_LOGIC_PROVIDER_ORDER } from '@/App/providers/providerOrder';

export { APP_PROVIDER_ORDER, APP_LOGIC_PROVIDER_ORDER };

/**
 * Nest: FileSessionState → Modals → Tabs → Chrome → FileSession → TreeOps…
 * so Tabs can use useModalsOwned and FileSession can use useChromeOwned / useModalsOwned.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AppBootstrapStateProvider>
      <AppVaultStateProvider>
        <VaultProvider>
          <AppFileSessionStateProvider>
            <AppModalsStateProvider>
              <WorkspaceTabsProvider>
                <AppChromeStateProvider>
                  <FileSessionProvider>
                    <AppTreeOpsStateProvider>
                      <TreeOpsProvider>
                        <AppPwaSnippetsStateProvider>
                          <RecordingProvider>
                            <AppLogicProvider>
                              <LlmAssistSessionProvider>{children}</LlmAssistSessionProvider>
                            </AppLogicProvider>
                          </RecordingProvider>
                        </AppPwaSnippetsStateProvider>
                      </TreeOpsProvider>
                    </AppTreeOpsStateProvider>
                  </FileSessionProvider>
                </AppChromeStateProvider>
              </WorkspaceTabsProvider>
            </AppModalsStateProvider>
          </AppFileSessionStateProvider>
        </VaultProvider>
      </AppVaultStateProvider>
    </AppBootstrapStateProvider>
  );
}
