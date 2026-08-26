/* eslint-disable @typescript-eslint/no-explicit-any */
import { SaveMethodModal } from '@/components/shared/modals/SaveMethodModal';
import { SetPasswordModal } from '@/components/shared/modals/SetPasswordModal';
import { ConfirmModal } from '@/components/shared/modals/ConfirmModal';
import TreeNameConflictModal from '@/components/shared/modals/TreeNameConflictModal';
import { ExportPasswordModal } from '@/components/shared/modals/ExportPasswordModal';
import { ImportPasswordModal } from '@/components/shared/modals/ImportPasswordModal';
import { DownloadMethodModal } from '@/components/shared/modals/DownloadMethodModal';
import SaveSessionToNoteModal from '@/components/shared/modals/SaveSessionToNoteModal';
import Modal from '@/components/shared/modals/Modal';
import { DeleteConfirmModal } from '@/components/shared/modals/DeleteConfirmModal';
import EmptyTrashConfirmModal from '@/components/shared/modals/EmptyTrashConfirmModal';
import { MoveFileModal } from '@/components/shared/modals/MoveFileModal';
import { MoveFolderModal } from '@/components/shared/modals/MoveFolderModal';
import { CreateItemModal } from '@/components/shared/modals/CreateItemModal';
import PromptModal from '@/components/shared/modals/PromptModal';
import { revertNoteCoverComment } from '@/utils/noteCover';
import { getActiveFileTab, isFileTab } from '@/utils/workspaceTabs';
import { isMarkdownFileName } from '@/utils/markdownImageExport';
import { SESSION_STORAGE_TYPE } from '@/utils/vault/sessionWorkspace';
import { useAppModals } from '@/App/hooks/useAppModals';
import { useAppBootstrap } from '@/App/hooks/useAppBootstrap';
import { useFileSession } from '@/App/hooks/useFileSession';
import { useTreeOps } from '@/App/hooks/useTreeOps';
import { useVault } from '@/App/hooks/useVault';
import { useWorkspaceTabsCtx } from '@/App/hooks/useWorkspaceTabsCtx';

/** App-level modals — domain hooks + modal slice (no AppShell mega-bag). */
export function AppModals() {
  const {
    showSaveMethodModal,
    setShowSaveMethodModal,
    saveMethodModalCreds,
    setSaveMethodModalCreds,
    webauthnPRFSupported,
    handleSaveWithWebAuthn,
    handleSaveWithPasswordFromModal,
    showSetPasswordModal,
    setShowSetPasswordModal,
    masterPassword,
    requestSaveEncryptedSettings,
    s3Creds,
    showCoverChangeConfirmModal,
    setShowCoverChangeConfirmModal,
    pendingCoverSaveRef,
    showRestoreLocalFolderModal,
    setShowRestoreLocalFolderModal,
    pendingLocalFolderName,
    handleConfirmRestoreLocalFolder,
    setLocalFolderRestoreSettled,
    showAppUpdateConfirmModal,
    setShowAppUpdateConfirmModal,
    appBuildLocalId,
    appBuildRemoteId,
    appUpdateCheckError,
    appUpdateAvailable,
    isApplyingPwaUpdate,
    handleConfirmAppUpdate,
    showOverwriteCredsConfirmModal,
    setShowOverwriteCredsConfirmModal,
    handleOverwriteCredsConfirm,
    setPendingWebAuthnSave,
    setPendingPasswordSave,
    showUnsavedConfirmModal,
    setShowUnsavedConfirmModal,
    handleUnsavedConfirmLeave,
    showSuffixChangeConfirmModal,
    handleSuffixChangeConfirm,
    handleSuffixChangeCancel,
    showCloseFileConfirmModal,
    setShowCloseFileConfirmModal,
    pendingCloseTabId,
    setPendingCloseTabId,
    handleCloseFileConfirmSave,
    handleCloseFileConfirmDiscard,
    navGuard,
    handleNavGuardConfirmSave,
    handleNavGuardConfirmDiscard,
    showExportPasswordModal,
    setShowExportPasswordModal,
    handleExportConfirm,
    showImportPasswordModal,
    setShowImportPasswordModal,
    handleImportConfirm,
    setImportFileContent,
    showDownloadMethodModal,
    setShowDownloadMethodModal,
    downloadModalMode,
    setDownloadModalMode,
    handleDownloadCurrentFile,
    handleDownloadToFolder,
    handleSelectHaimFromDownload,
    handleCopyCurrentFileToClipboard,
    downloadProgress,
    setDownloadProgress,
    downloadComplete,
    setDownloadComplete,
    showSaveSessionToNoteModal,
    setShowSaveSessionToNoteModal,
    newFileDefaultParentPath,
    isSavingSessionToNote,
    handleConfirmSaveSessionToNote,
    saveSessionToNoteSelectPath,
    setSaveSessionToNoteSelectPath,
    downloadResultModal,
    closeDownloadResultModal,
    associatedRecordings,
    confirmDelete,
    confirmEmptyTrash,
    handleConfirmMoveFileFromSidebar,
    handleConfirmMove,
    handleConfirmMoveFolder,
    createModalTree,
    ensureCreateModalFolderLoaded,
  } = useAppModals();

  const { theme } = useAppBootstrap();
  const {
    saveFile,
    currentFileRef,
    editorContentRef,
    setEditorContent,
    currentFile,
    editorContent,
    encMdPrompt,
  } = useFileSession();
  const {
    treeNameConflict,
    settleTreeNameConflict,
    deleteTarget,
    setDeleteTarget,
    isDeleting,
    emptyTrashTarget,
    setEmptyTrashTarget,
    isEmptyingTrash,
    isMoveModalOpen,
    setIsMoveModalOpen,
    moveFileTarget,
    setMoveFileTarget,
    moveModalSelectPath,
    setMoveModalSelectPath,
    moveFolderTarget,
    setMoveFolderTarget,
    createModalOpen,
    createModalContext,
    setCreateModalContext,
    setCreateModalOpen,
    isCreateSubmitting,
    handleCreateItemSubmit,
  } = useTreeOps();
  const {
    storageMode,
    s3Tree,
    localTree,
    webdavTree,
    localRootHandle,
  } = useVault();
  const { state: workspaceTabs } = useWorkspaceTabsCtx();

  return (
    <>
    {/* Set Password Modal */}
    <SaveMethodModal
      isOpen={showSaveMethodModal}
      onClose={() => {
        setShowSaveMethodModal(false);
        setSaveMethodModalCreds(null);
      }}
      creds={saveMethodModalCreds}
      webauthnSupported={webauthnPRFSupported}
      onSaveWithWebAuthn={handleSaveWithWebAuthn}
      onSaveWithPassword={handleSaveWithPasswordFromModal}
    />

    <SetPasswordModal
      isOpen={showSetPasswordModal}
      masterPassword={masterPassword}
      onCancel={() => setShowSetPasswordModal(false)}
      onSubmit={(password: string) => requestSaveEncryptedSettings(s3Creds, password, { stayOnSettings: true })}
    />

    <ConfirmModal
      isOpen={showCoverChangeConfirmModal}
      title="표지 수정 감지"
      message={
        '표지(note-cover) 부분이 변경되었습니다.\n의도치 않은 수정이라면 표지 부분만 되돌린 뒤 다시 저장할 수 있습니다.'
      }
      confirmLabel="그대로 저장"
      cancelLabel="취소"
      discardLabel="표지 부분 편집 되돌리기"
      onConfirm={() => {
        const pending = pendingCoverSaveRef.current;
        pendingCoverSaveRef.current = null;
        setShowCoverChangeConfirmModal(false);
        void saveFile(pending?.fileOverride ?? null, {
          ...(pending?.options ?? {}),
          skipCoverChangeCheck: true,
        });
      }}
      onCancel={() => {
        pendingCoverSaveRef.current = null;
        setShowCoverChangeConfirmModal(false);
      }}
      onDiscard={() => {
        const file = currentFileRef.current;
        if (!file) {
          pendingCoverSaveRef.current = null;
          setShowCoverChangeConfirmModal(false);
          return;
        }
        const next = revertNoteCoverComment(
          String(editorContentRef.current ?? ''),
          String(file.content ?? ''),
        );
        editorContentRef.current = next;
        setEditorContent(next);
        pendingCoverSaveRef.current = null;
        setShowCoverChangeConfirmModal(false);
      }}
    />

    <ConfirmModal
      isOpen={showRestoreLocalFolderModal}
      title="로컬 폴더 다시 열기"
      message={`이전에 열었던 로컬 폴더 "${pendingLocalFolderName}"을(를) 다시 열까요?`}
      confirmLabel="다시 열기"
      cancelLabel="나중에"
      onConfirm={() => {
        void handleConfirmRestoreLocalFolder();
      }}
      onCancel={() => {
        setShowRestoreLocalFolderModal(false);
        setLocalFolderRestoreSettled(true);
      }}
    />

    <ConfirmModal
      isOpen={showAppUpdateConfirmModal}
      title="앱 업데이트"
      message={(() => {
        const localLabel = appBuildLocalId || '알 수 없음';
        const remoteLabel = appBuildRemoteId;
        if (appUpdateCheckError && !appUpdateAvailable) {
          return [
            '최신 버전을 확인할 수 없습니다.',
            `현재 버전: ${localLabel}`,
            `사유: ${appUpdateCheckError}`,
            '',
            '그래도 앱을 다시 로드해 최신 상태를 적용할 수 있습니다.',
          ].join('\n');
        }
        if (appUpdateAvailable) {
          return [
            '새 버전이 준비되었습니다. 저장 중인 작업을 확인한 뒤 최신 버전으로 업데이트하세요.',
            `현재 버전: ${localLabel}`,
            remoteLabel ? `최신 버전: ${remoteLabel}` : null,
          ].filter(Boolean).join('\n');
        }
        return [
          '현재 최신 버전입니다.',
          `현재 버전: ${localLabel}`,
          remoteLabel ? `확인된 버전: ${remoteLabel}` : null,
          '',
          '그래도 앱을 다시 로드할 수 있습니다.',
        ].filter(Boolean).join('\n');
      })()}
      confirmLabel={
        isApplyingPwaUpdate
          ? '업데이트 중...'
          : appUpdateAvailable
            ? '최신 버전으로 업데이트'
            : '다시 로드'
      }
      cancelLabel="취소"
      onConfirm={() => {
        if (isApplyingPwaUpdate) return;
        void handleConfirmAppUpdate();
      }}
      onCancel={() => {
        if (isApplyingPwaUpdate) return;
        setShowAppUpdateConfirmModal(false);
      }}
    />

    <ConfirmModal
      isOpen={showOverwriteCredsConfirmModal}
      title="기존 연결 정보 대체"
      message="기존에 저장된 연결 정보가 있습니다. 새로 저장하면 기존 정보가 대체됩니다. 계속하시겠습니까?"
      confirmLabel="계속"
      cancelLabel="취소"
      onConfirm={handleOverwriteCredsConfirm}
      onCancel={() => {
        setShowOverwriteCredsConfirmModal(false);
        setPendingWebAuthnSave(null);
        setPendingPasswordSave(null);
      }}
    />

    <TreeNameConflictModal
      isOpen={Boolean(treeNameConflict)}
      name={treeNameConflict?.name || ''}
      renameAs={treeNameConflict?.renameAs || ''}
      kind={treeNameConflict?.kind || 'file'}
      action={treeNameConflict?.action || 'move'}
      existingText={treeNameConflict?.existingText}
      incomingText={treeNameConflict?.incomingText}
      existingLabel={treeNameConflict?.existingLabel}
      incomingLabel={treeNameConflict?.incomingLabel}
      binary={Boolean(treeNameConflict?.binary)}
      truncated={Boolean(treeNameConflict?.truncated)}
      theme={theme === 'dark' ? 'dark' : 'light'}
      onResolve={settleTreeNameConflict}
    />

    <ConfirmModal
      isOpen={showUnsavedConfirmModal}
      title="설정을 나가시겠습니까?"
      message="저장하지 않으면 입력한 정보가 사라질 수 있습니다."
      confirmLabel="나가기"
      cancelLabel="취소"
      onConfirm={handleUnsavedConfirmLeave}
      onCancel={() => setShowUnsavedConfirmModal(false)}
    />

    <ConfirmModal
      isOpen={showSuffixChangeConfirmModal}
      title="확장자 변경"
      message="확장자가 변경되었습니다. 저장 시 새 파일명으로 저장됩니다. 계속하시겠습니까?"
      confirmLabel="계속"
      cancelLabel="취소"
      onConfirm={handleSuffixChangeConfirm}
      onCancel={handleSuffixChangeCancel}
    />

    <ConfirmModal
      isOpen={showCloseFileConfirmModal}
      title="파일 닫기"
      message={(() => {
        const tab =
          (pendingCloseTabId &&
            workspaceTabs.tabs.find((t) => t.id === pendingCloseTabId)) ||
          getActiveFileTab(workspaceTabs);
        const name = isFileTab(tab)
          ? tab.editedFileName || tab.path
          : '';
        return name
          ? `「${name}」에 저장하지 않은 변경사항이 있습니다. 저장 후 닫으시겠습니까?`
          : '저장하지 않은 변경사항이 있습니다. 저장 후 닫으시겠습니까?';
      })()}
      confirmLabel="저장 후 닫기"
      cancelLabel="취소"
      discardLabel="저장 안 하고 닫기"
      onConfirm={handleCloseFileConfirmSave}
      onCancel={() => {
        setShowCloseFileConfirmModal(false);
        setPendingCloseTabId(null);
      }}
      onDiscard={handleCloseFileConfirmDiscard}
    />

    <ConfirmModal
      isOpen={navGuard.isBlocked}
      title="저장하지 않은 변경사항"
      message="저장하지 않은 변경사항이 있습니다. 이동하면 변경사항이 사라집니다."
      confirmLabel="저장 후 이동"
      cancelLabel="취소"
      discardLabel="저장 안 하고 이동"
      onConfirm={handleNavGuardConfirmSave}
      onCancel={navGuard.reset}
      onDiscard={handleNavGuardConfirmDiscard}
    />

    <ExportPasswordModal
      isOpen={showExportPasswordModal}
      onConfirm={handleExportConfirm}
      onCancel={() => setShowExportPasswordModal(false)}
    />

    <ImportPasswordModal
      isOpen={showImportPasswordModal}
      onConfirm={handleImportConfirm}
      onCancel={() => {
        setShowImportPasswordModal(false);
        setImportFileContent(null);
      }}
    />

    <DownloadMethodModal
      isOpen={showDownloadMethodModal}
      title={
        downloadModalMode === 'session-transform'
          ? '변형 다운로드'
          : downloadModalMode === 'session-save'
            ? '저장 방식 선택'
            : '다운로드 방식 선택'
      }
      fileName={currentFile?.name || currentFile?.id?.split('/').filter(Boolean).pop()}
      markdownText={editorContent}
      showImageHandling={isMarkdownFileName(
        currentFile?.name || currentFile?.id?.split('/').filter(Boolean).pop(),
      )}
      showDeliveryMethods={downloadModalMode !== 'session-transform'}
      confirmLabel="다운로드"
      onSelectLegacy={handleDownloadCurrentFile}
      onSelectStorageApi={handleDownloadToFolder}
      {...(currentFile?.type === SESSION_STORAGE_TYPE && downloadModalMode !== 'session-transform'
        ? { onSelectHaim: handleSelectHaimFromDownload }
        : {})}
      onSelectClipboard={handleCopyCurrentFileToClipboard}
      onCancel={() => {
        setShowDownloadMethodModal(false);
        setDownloadModalMode('default');
      }}
      isDownloading={downloadProgress > 0 && downloadProgress < 100 && !downloadComplete}
      downloadProgress={downloadProgress}
      downloadComplete={downloadComplete}
      onCloseComplete={() => {
        setShowDownloadMethodModal(false);
        setDownloadProgress(0);
        setDownloadComplete(false);
        setDownloadModalMode('default');
      }}
    />

    <SaveSessionToNoteModal
      isOpen={showSaveSessionToNoteModal}
      storageType={storageMode}
      s3Tree={s3Tree}
      localTree={localTree}
      webdavTree={webdavTree}
      localRootHandle={localRootHandle}
      defaultFileName={currentFile?.name || 'untitled.md'}
      defaultParentPath={newFileDefaultParentPath ?? ''}
      isSaving={isSavingSessionToNote}
      onClose={() => setShowSaveSessionToNoteModal(false)}
      onConfirm={handleConfirmSaveSessionToNote}
      onRequestCreateFolder={(parentPath, parentDirHandle) => {
        setCreateModalContext({
          storageType: storageMode,
          parentPath,
          parentDirHandle,
          type: 'folder',
          fromSaveSessionModal: true,
        });
        setCreateModalOpen(true);
      }}
      selectPathAfterCreate={saveSessionToNoteSelectPath}
      onSelectPathAfterCreateApplied={() => setSaveSessionToNoteSelectPath(null)}
    />

    <Modal
      isOpen={downloadResultModal.isOpen}
      onClose={closeDownloadResultModal}
      onConfirm={closeDownloadResultModal}
    >
      <div className="p-6">
        <h2 className="text-lg font-bold text-gray-800 dark:text-odp-fgStrong mb-2">
          {downloadResultModal.title || '다운로드 완료'}
        </h2>
        <p className="text-sm whitespace-pre-line text-gray-600 dark:text-gray-400 mb-4">
          {downloadResultModal.message}
        </p>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={closeDownloadResultModal}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 rounded transition"
          >
            확인
          </button>
        </div>
      </div>
    </Modal>

    {/* Delete Modal */}
    <DeleteConfirmModal
      target={deleteTarget}
      associatedRecordings={associatedRecordings}
      onCancel={() => setDeleteTarget(null)}
      onConfirm={confirmDelete}
      isProcessing={isDeleting}
    />

    <EmptyTrashConfirmModal
      isOpen={Boolean(emptyTrashTarget)}
      storageType={emptyTrashTarget?.storageType}
      isProcessing={isEmptyingTrash}
      onCancel={() => {
        if (isEmptyingTrash) return;
        setEmptyTrashTarget(null);
      }}
      onConfirm={confirmEmptyTrash}
    />

    {/* Move File Modal (editor current file or sidebar-selected file) */}
    <MoveFileModal
      isOpen={isMoveModalOpen}
      storageType={moveFileTarget ? moveFileTarget.storageType : currentFile?.type}
      s3Tree={s3Tree}
      localTree={localTree}
      webdavTree={webdavTree}
      localRootHandle={localRootHandle}
      currentFile={moveFileTarget ? null : currentFile}
      fileToMove={moveFileTarget?.node}
      onClose={() => {
        setIsMoveModalOpen(false);
        setMoveModalSelectPath(null);
        setMoveFileTarget(null);
      }}
      onConfirm={moveFileTarget ? handleConfirmMoveFileFromSidebar : handleConfirmMove}
      onRequestCreateFolder={
        (moveFileTarget || currentFile)
          ? (parentPath: string, parentDirHandle: FileSystemDirectoryHandle | null) => {
              const st = moveFileTarget ? moveFileTarget.storageType : currentFile.type;
              setCreateModalContext({
                storageType: st,
                parentPath,
                parentDirHandle,
                type: 'folder',
                fromMoveModal: true,
              });
              setCreateModalOpen(true);
            }
          : undefined
      }
      selectPathAfterCreate={moveModalSelectPath}
      onSelectPathAfterCreateApplied={() => setMoveModalSelectPath(null)}
    />

    {/* Move Folder Modal */}
    <MoveFolderModal
      isOpen={!!moveFolderTarget}
      storageType={moveFolderTarget?.storageType}
      s3Tree={s3Tree}
      localTree={localTree}
      webdavTree={webdavTree}
      localRootHandle={localRootHandle}
      folderNode={moveFolderTarget?.node}
      onClose={() => setMoveFolderTarget(null)}
      onConfirm={handleConfirmMoveFolder}
    />

    {/* Create File/Folder Modal */}
    <CreateItemModal
      isOpen={createModalOpen}
      type={createModalContext?.type}
      storageType={createModalContext?.storageType}
      parentPath={createModalContext?.parentPath || ''}
      tree={createModalTree}
      ensureFolderLoaded={ensureCreateModalFolderLoaded}
      parentLabel={
        createModalContext
          ? createModalContext.storageType === 's3'
            ? createModalContext.parentPath
              ? `S3: ${createModalContext.parentPath}`
              : 'S3 루트'
            : createModalContext.storageType === 'webdav'
              ? createModalContext.parentPath
                ? `WebDAV: ${createModalContext.parentPath}`
                : 'WebDAV 루트'
              : createModalContext.parentPath
                ? `로컬: ${createModalContext.parentPath}`
                : '로컬 루트'
          : ''
      }
      onClose={() => {
        if (!isCreateSubmitting) {
          setCreateModalOpen(false);
          setCreateModalContext(null);
        }
      }}
      onSubmit={handleCreateItemSubmit}
      isSubmitting={isCreateSubmitting}
    />

    <PromptModal
      isOpen={Boolean(encMdPrompt)}
      title={encMdPrompt?.title || '비밀번호'}
      message={encMdPrompt?.message || ''}
      placeholder="비밀번호"
      confirmLabel={encMdPrompt?.confirmLabel || '확인'}
      cancelLabel="취소"
      inputType="password"
      error={encMdPrompt?.error || ''}
      onCancel={() => {
        encMdPrompt?.reject?.();
      }}
      onConfirm={(password) => {
        encMdPrompt?.resolve?.(password);
      }}
    />


    </>
  );
}
