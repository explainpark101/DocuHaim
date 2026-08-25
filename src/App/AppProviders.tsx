import type { ReactNode } from 'react';
import { WorkspaceTabsProvider } from '@/App/providers/WorkspaceTabsProvider';
import { AppBootstrapStateProvider } from '@/App/providers/AppBootstrapStateProvider';
import { AppVaultStateProvider } from '@/App/providers/AppVaultStateProvider';
import { AppFileSessionStateProvider } from '@/App/providers/AppFileSessionStateProvider';
import { AppTreeOpsStateProvider } from '@/App/providers/AppTreeOpsStateProvider';
import { AppLogicProvider } from '@/App/providers/AppLogicProvider';
import { APP_PROVIDER_ORDER } from '@/App/providers/providerOrder';

export { APP_PROVIDER_ORDER };

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AppBootstrapStateProvider>
      <AppVaultStateProvider>
        <WorkspaceTabsProvider>
          <AppFileSessionStateProvider>
            <AppTreeOpsStateProvider>
              <AppLogicProvider>{children}</AppLogicProvider>
            </AppTreeOpsStateProvider>
          </AppFileSessionStateProvider>
        </WorkspaceTabsProvider>
      </AppVaultStateProvider>
    </AppBootstrapStateProvider>
  );
}
