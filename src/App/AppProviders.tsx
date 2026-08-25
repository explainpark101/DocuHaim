import type { ReactNode } from 'react';
import { WorkspaceTabsProvider } from '@/App/providers/WorkspaceTabsProvider';
import { AppLogicProvider } from '@/App/providers/AppLogicProvider';
import { APP_PROVIDER_ORDER } from '@/App/providers/providerOrder';

export { APP_PROVIDER_ORDER };

/**
 * Fixed nesting: WorkspaceTabs owns tab state; AppLogic fans out domain contexts
 * (Bootstrap → Vault → FileSession → TreeOps → AutoSave) per APP_PROVIDER_ORDER.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <WorkspaceTabsProvider>
      <AppLogicProvider>{children}</AppLogicProvider>
    </WorkspaceTabsProvider>
  );
}
