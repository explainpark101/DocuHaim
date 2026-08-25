import { Suspense, lazy } from 'react';
import { useLocation } from 'react-router';
import { AuthModal } from '@/components/modals/AuthModal';
import AdvancedSearchHost from '@/components/advancedSearch/AdvancedSearchHost';
import UserWebfontStyles from '@/components/UserWebfontStyles';
import { isStoredWithWebAuthn } from '@/utils/webauthn';
import { STORAGE_MODE_LOCAL, STORAGE_MODE_WEBDAV } from '@/utils/storageSettings';
import { RouteSuspenseFallback } from '@/App/RouteSuspenseFallback';
import { isExportPdfAppPathname, parseExportPdfPathFromAppPathname } from '@/utils/appHref';
import { useAppBootstrap } from '@/App/hooks/useAppBootstrap';
import { useVault } from '@/App/hooks/useVault';
import { useFileSession } from '@/App/hooks/useFileSession';
import { useAppShell } from '@/App/hooks/useAppShell';

const ExportPDFPage = lazy(() => import('@/pages/ExportPDFPage'));

/** Export-pdf route gate — reads domain hooks instead of prop-drilling from AppShellView. */
export function ExportPdfGate() {
  const location = useLocation();
  const bootstrap = useAppBootstrap();
  const vault = useVault();
  const file = useFileSession();
  const shell = useAppShell();

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

  const { storageMode, localTree, webdavTree, s3Tree } = vault;

  return (
    <div className="export-pdf-layout h-dvh min-h-0 overflow-hidden print:h-auto print:min-h-0 print:overflow-visible max-w-screen bg-neutral-200 dark:bg-neutral-800 print:bg-white print:dark:bg-white">
      <UserWebfontStyles />
      <Suspense fallback={<RouteSuspenseFallback />}>
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
        snippetConfig={shell.snippetConfig}
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
