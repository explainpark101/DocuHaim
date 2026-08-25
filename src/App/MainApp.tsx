// @ts-nocheck — thin shell; logic in sections/useMainAppController
import { AppModals } from '@/App/components/AppModals';
import { AppLayout } from '@/App/components/AppLayout';
import { ExportPdfGate } from '@/App/components/ExportPdfGate';
import { isExportPdfAppPathname, parseExportPdfPathFromAppPathname } from '@/utils/appHref';
import { useMainAppController } from '@/App/sections/useMainAppController';

export function MainApp() {
  const c = useMainAppController();
  const {
    scriptsLoaded,
    location,
    currentFile,
    editorContent,
    storageMode,
    localTree,
    webdavTree,
    s3Tree,
    openAdvancedSearchFile,
    snippetConfig,
    showAuthModal,
    shareBlockingAuth,
    handleUnlock,
    fileInputRef,
    proceedWithoutStoredCreds,
    openSettingsWorkspaceTab,
    canUnlockWithWebAuthnForModal,
    handleUnlockWithWebAuthn,
    autoPromptWebAuthnForModal,
  } = c;

  if (!scriptsLoaded) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 text-gray-500 dark:bg-odp-bgSofter dark:text-odp-fg">
        로딩 중...
      </div>
    );
  }

  if (isExportPdfAppPathname(location.pathname)) {
    const routeExportPath = parseExportPdfPathFromAppPathname(location.pathname);
    const navState = location.state && typeof location.state === 'object' ? location.state : null;
    const documentFile = navState?.currentFile ?? currentFile;
    const documentValue =
      typeof navState?.value === 'string'
        ? navState.value
        : typeof editorContent === 'string'
          ? editorContent
          : '';
    const waitingForRouteDoc =
      Boolean(routeExportPath)
      && !navState?.value
      && documentFile?.id !== routeExportPath;

    return (
      <ExportPdfGate
        documentValue={documentValue}
        documentFile={documentFile}
        openCoverEdit={Boolean(navState?.openCoverEdit)}
        isDocumentLoading={waitingForRouteDoc}
        hasNavigationSession={Boolean(navState) || Boolean(routeExportPath)}
        storageMode={storageMode}
        localTree={localTree}
        webdavTree={webdavTree}
        s3Tree={s3Tree}
        openAdvancedSearchFile={openAdvancedSearchFile}
        snippetConfig={snippetConfig}
        showAuthModal={showAuthModal}
        shareBlockingAuth={shareBlockingAuth}
        handleUnlock={handleUnlock}
        fileInputRef={fileInputRef}
        proceedWithoutStoredCreds={proceedWithoutStoredCreds}
        openSettingsWorkspaceTab={openSettingsWorkspaceTab}
        canUnlockWithWebAuthnForModal={canUnlockWithWebAuthnForModal}
        handleUnlockWithWebAuthn={handleUnlockWithWebAuthn}
        autoPromptWebAuthnForModal={autoPromptWebAuthnForModal}
      />
    );
  }

  return (
    <AppLayout {...c}>
      <AppModals {...c} />
    </AppLayout>
  );
}
