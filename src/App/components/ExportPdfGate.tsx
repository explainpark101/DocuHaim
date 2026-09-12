import { Suspense, lazy, useEffect } from 'react';
import { useLocation } from 'react-router';
import { LoaderCircle } from 'lucide-react';
import { AuthModal } from '@/components/modals/AuthModal';
import AdvancedSearchHost from '@/components/advancedSearch/AdvancedSearchHost';
import UserWebfontStyles from '@/components/UserWebfontStyles';
import { isStoredWithWebAuthn } from '@/utils/webauthn';
import { STORAGE_MODE_LOCAL, STORAGE_MODE_WEBDAV } from '@/utils/storageSettings';
import { isExportPdfAppPathname, parseExportPdfPathFromAppPathname } from '@/utils/appHref';
import { useAppBootstrap } from '@/App/hooks/useAppBootstrap';
import { useVault } from '@/App/hooks/useVault';
import { useFileSession } from '@/App/hooks/useFileSession';
import { usePwaSnippetsOwned } from '@/App/providers/AppPwaSnippetsStateProvider';
import { useMacosTitlebarChrome } from '@/hooks/useMacosTitlebarChrome';
import { isTauriMacOS } from '@/utils/tauriPlatform';
import { exportPdfLoadDebug } from '@/pages/exportPdf/exportPdfLoadDebug';

const ExportPDFPage = lazy(() => {
  exportPdfLoadDebug('gate:lazy-import-start');
  return import('@/pages/exportPdf/ExportPDFPage').then((mod) => {
    exportPdfLoadDebug('gate:lazy-import-done');
    return mod;
  });
});

/** Export-pdf route gate — reads domain hooks instead of prop-drilling from AppShellView. */
export function ExportPdfGate() {
  const location = useLocation();
  const bootstrap = useAppBootstrap();
  const vault = useVault();
  const file = useFileSession();
  const pwaSnippets = usePwaSnippetsOwned();

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
  const openCoverEdit = Boolean((navState as any)?.openCoverEdit);
  const hasNavigationSession = Boolean(navState) || Boolean(routeExportPath);

  useEffect(() => {
    exportPdfLoadDebug('gate:session', {
      routeExportPath,
      waitingForRouteDoc,
      hasNavigationSession,
      openCoverEdit,
      hasNavStateValue: typeof (navState as any)?.value === 'string',
      navStateValueLength:
        typeof (navState as any)?.value === 'string'
          ? ((navState as any).value as string).length
          : 0,
      documentFileId: documentFile?.id ?? null,
      documentValueLength: typeof documentValue === 'string' ? documentValue.length : 0,
      pathname: location.pathname,
    });
  }, [
    documentFile?.id,
    documentValue,
    hasNavigationSession,
    location.pathname,
    navState,
    openCoverEdit,
    routeExportPath,
    waitingForRouteDoc,
  ]);

  const { storageMode, localTree, webdavTree, s3Tree } = vault;
  const macDesktopChrome = isTauriMacOS();
  useMacosTitlebarChrome();

  return (
    <div
      className={`export-pdf-layout h-dvh w-full max-w-screen min-h-0 overflow-hidden bg-neutral-200 print:h-auto print:min-h-0 print:overflow-visible print:bg-white print:dark:bg-white dark:bg-neutral-800${
        macDesktopChrome ? ' export-pdf-layout--mac' : ''
      }`}
    >
      <UserWebfontStyles />
      <Suspense
        fallback={
          <div
            className="flex h-full min-h-0 flex-1 flex-col items-center justify-center gap-3 bg-neutral-200 px-4 dark:bg-neutral-800"
            role="status"
            aria-live="polite"
            aria-busy
          >
            <LoaderCircle
              className="animate-spin text-gray-500 dark:text-odp-muted"
              size={28}
              aria-hidden
            />
            <p className="text-sm font-medium text-gray-700 dark:text-odp-fg">
              PDF 내보내기 페이지 로딩 중…
            </p>
            <p className="max-w-sm text-center text-xs text-gray-500 dark:text-odp-muted">
              인쇄 미리보기 모듈을 불러오는 중입니다.
            </p>
          </div>
        }
      >
        <ExportPDFPage
          documentValue={documentValue}
          documentFile={documentFile}
          openCoverEdit={openCoverEdit}
          isDocumentLoading={waitingForRouteDoc}
          hasNavigationSession={hasNavigationSession}
        />
      </Suspense>
      <AdvancedSearchHost
        getTrees={() =>
          storageMode === STORAGE_MODE_LOCAL
            ? [localTree]
            : storageMode === STORAGE_MODE_WEBDAV
              ? [webdavTree]
              : [s3Tree]
        }
        onOpenFile={file.openAdvancedSearchFile}
        preferPrintActions
        snippetConfig={pwaSnippets.snippetConfig}
      />
      <AuthModal
        isOpen={bootstrap.showAuthModal && !bootstrap.shareBlockingAuth}
        onUnlock={bootstrap.handleUnlock}
        fileInputRef={bootstrap.fileInputRef}
        onCloseWithoutUnlock={() => {
          bootstrap.proceedWithoutStoredCreds();
          bootstrap.openSettingsWorkspaceTab();
        }}
        canUnlockWithWebAuthn={bootstrap.canUnlockWithWebAuthnForModal}
        onUnlockWithWebAuthn={bootstrap.handleUnlockWithWebAuthn}
        autoPromptWebAuthn={bootstrap.autoPromptWebAuthnForModal}
        isPasswordMode={!isStoredWithWebAuthn()}
      />
    </div>
  );
}

export function shouldShowExportPdfGate(pathname: string) {
  return isExportPdfAppPathname(pathname);
}
