import { Suspense, lazy } from 'react';
import { AuthModal } from '@/components/modals/AuthModal';
import AdvancedSearchHost from '@/components/advancedSearch/AdvancedSearchHost';
import UserWebfontStyles from '@/components/UserWebfontStyles';
import { isStoredWithWebAuthn } from '@/utils/webauthn';
import { STORAGE_MODE_LOCAL, STORAGE_MODE_WEBDAV } from '@/utils/storageSettings';
import { RouteSuspenseFallback } from '@/App/RouteSuspenseFallback';
import type { ExportPdfGateProps } from '@/App/types';

const ExportPDFPage = lazy(() => import('@/pages/ExportPDFPage'));

export function ExportPdfGate({
  documentValue,
  documentFile,
  openCoverEdit,
  isDocumentLoading,
  hasNavigationSession,
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
}: ExportPdfGateProps) {
  return (
    <div className="export-pdf-layout h-dvh min-h-0 overflow-hidden print:h-auto print:min-h-0 print:overflow-visible max-w-screen bg-neutral-200 dark:bg-neutral-800 print:bg-white print:dark:bg-white">
      <UserWebfontStyles />
      <Suspense fallback={<RouteSuspenseFallback />}>
        <ExportPDFPage
          documentValue={documentValue}
          documentFile={documentFile}
          openCoverEdit={openCoverEdit}
          isDocumentLoading={isDocumentLoading}
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
        onOpenFile={openAdvancedSearchFile}
        preferPrintActions
        snippetConfig={snippetConfig}
      />
      <AuthModal
        isOpen={showAuthModal && !shareBlockingAuth}
        onUnlock={handleUnlock}
        fileInputRef={fileInputRef}
        onCloseWithoutUnlock={() => {
          proceedWithoutStoredCreds();
          openSettingsWorkspaceTab();
        }}
        canUnlockWithWebAuthn={canUnlockWithWebAuthnForModal}
        onUnlockWithWebAuthn={handleUnlockWithWebAuthn}
        autoPromptWebAuthn={autoPromptWebAuthnForModal}
        isPasswordMode={!isStoredWithWebAuthn()}
      />
    </div>
  );
}
