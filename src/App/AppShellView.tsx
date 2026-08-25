import { AppModals } from '@/App/components/AppModals';
import { AppLayout } from '@/App/components/AppLayout';
import { ExportPdfGate } from '@/App/components/ExportPdfGate';
import { isExportPdfAppPathname, parseExportPdfPathFromAppPathname } from '@/utils/appHref';
import { useAppBootstrap } from '@/App/hooks/useAppBootstrap';
import { useVault } from '@/App/hooks/useVault';
import { useFileSession } from '@/App/hooks/useFileSession';
import { useAppShell } from '@/App/hooks/useAppShell';
import { useLocation } from 'react-router';

/**
 * Thin shell: gates + layout + modals. Domain state comes from AppProviders.
 */
export function AppShellView() {
  const location = useLocation();
  const bootstrap = useAppBootstrap();
  const vault = useVault();
  const file = useFileSession();
  const shell = useAppShell();

  if (!bootstrap.scriptsLoaded) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 text-gray-500 dark:bg-odp-bgSofter dark:text-odp-fg">
        로딩 중...
      </div>
    );
  }

  if (isExportPdfAppPathname(location.pathname)) {
    const routeExportPath = parseExportPdfPathFromAppPathname(location.pathname);
    const navState = location.state && typeof location.state === 'object' ? location.state : null;
    const documentFile = (navState as any)?.currentFile ?? file.currentFile;
    const documentValue =
      typeof (navState as any)?.value === 'string'
        ? (navState as any).value
        : typeof file.editorContent === 'string'
          ? file.editorContent
          : '';
    const waitingForRouteDoc =
      Boolean(routeExportPath)
      && !(navState as any)?.value
      && documentFile?.id !== routeExportPath;

    return (
      <ExportPdfGate
        documentValue={documentValue}
        documentFile={documentFile}
        openCoverEdit={Boolean((navState as any)?.openCoverEdit)}
        isDocumentLoading={waitingForRouteDoc}
        hasNavigationSession={Boolean(navState) || Boolean(routeExportPath)}
        storageMode={vault.storageMode}
        localTree={vault.localTree}
        webdavTree={vault.webdavTree}
        s3Tree={vault.s3Tree}
        openAdvancedSearchFile={file.openAdvancedSearchFile}
        snippetConfig={shell.snippetConfig}
        showAuthModal={bootstrap.showAuthModal}
        shareBlockingAuth={bootstrap.shareBlockingAuth}
        handleUnlock={bootstrap.handleUnlock}
        fileInputRef={bootstrap.fileInputRef}
        proceedWithoutStoredCreds={bootstrap.proceedWithoutStoredCreds}
        openSettingsWorkspaceTab={bootstrap.openSettingsWorkspaceTab}
        canUnlockWithWebAuthnForModal={bootstrap.canUnlockWithWebAuthnForModal}
        handleUnlockWithWebAuthn={bootstrap.handleUnlockWithWebAuthn}
        autoPromptWebAuthnForModal={bootstrap.autoPromptWebAuthnForModal}
      />
    );
  }

  return (
    <AppLayout>
      <AppModals />
    </AppLayout>
  );
}
