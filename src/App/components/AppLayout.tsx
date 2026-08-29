/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactNode } from 'react';
import { Routes, Route } from 'react-router';
import { IconX } from '@/components/icons';
import { ChevronsRight, Cloud, MessagesSquare } from 'lucide-react';
import SidebarConnected from '@/App/components/SidebarConnected';
import ResizableSidebarPanel from '@/components/ResizableSidebarPanel';
import WorkspaceMainPanels from '@/components/workspace/WorkspaceMainPanels';
import DesktopTitlebar from '@/components/desktop/DesktopTitlebar';
import ShareTargetGate from '@/components/chatWithMyself/ShareTargetGate';
import AdvancedSearchHost from '@/components/advancedSearch/AdvancedSearchHost';
import { AuthModal } from '@/components/modals/AuthModal';
import UserWebfontStyles from '@/components/UserWebfontStyles';
import ActivityIndicatorBar from '@/components/ActivityIndicatorBar';
import FileUploadQueueStatusBar from '@/components/FileUploadQueueStatusBar';
import FileUploadQueueFloatingPanel from '@/components/FileUploadQueueFloatingPanel';
import { isTauriDesktopPlatform } from '@/utils/tauriPlatform';
import { isStoredWithWebAuthn, getStoredWebAuthn } from '@/utils/webauthn';
import { refreshDesktopPasswordEntryLockSecrets } from '@/utils/desktopAppEntryLock';
import { setSettingsToggle } from '@/utils/advancedSearch/settingsToggles';
import { treeHoverExpandSettingsToMs } from '@/utils/treeHoverExpandSettings';
import { isEncMdPath } from '@/utils/encMd';
import { STORAGE_MODE_WEBDAV, clearPlaintextWebdavConfig, hasEncryptedWebdavConfig, requiresEncryptedWebdavStorage, saveWebdavConfig } from '@/utils/storageSettings';
import { basenameFromVaultPath } from '@/utils/localVaultReady';
import { SESSION_STORAGE_TYPE } from '@/utils/sessionWorkspace';
import { getDesktopAppEntryLockModeSync, saveDesktopWebdavConfig } from '@/utils/desktopStrongholdSecrets';
import { loadLastLocalFolderName } from '@/utils/localFolderStore';
import { patchFileTab } from '@/utils/workspaceTabs/appBridge';
import { isDesktopApp } from '@/utils/isDesktopApp';
import { useAppChrome } from '@/App/hooks/useAppChrome';
import { useAppModals } from '@/App/hooks/useAppModals';
import { useSessionWorkspace } from '@/App/hooks/useSessionWorkspace';
import { useChatIntegration } from '@/App/hooks/useChatIntegration';
import { useAppEditorExtras } from '@/App/hooks/useAppEditorExtras';
import { useVault } from '@/App/hooks/useVault';
import { useFileSession } from '@/App/hooks/useFileSession';
import { useAutoSave } from '@/App/hooks/useAutoSave';
import { useAppBootstrap } from '@/App/hooks/useAppBootstrap';
import { useWorkspaceTabsCtx } from '@/App/hooks/useWorkspaceTabsCtx';
import { useTreeOps } from '@/App/hooks/useTreeOps';
import { useRecordingOwned } from '@/App/providers/RecordingProvider';
import { usePwaSnippetsOwned } from '@/App/providers/AppPwaSnippetsStateProvider';
import { useAuth } from '@/contexts/AuthContext';
import { useAlertModal } from '@/contexts/AlertModalContext';
import { useNavigate, useLocation } from 'react-router';
import {
  enableWebAuthnUnlock,
  disableWebAuthnUnlock,
} from '@/utils/webauthn';
import { resolveLlmProviderProfiles } from '@/utils/llmProviderProfiles';
import { useMlxVlmProviderAutoSync } from '@/hooks/useMlxVlmProviderAutoSync';
import { useLlamaCppProviderAutoSync } from '@/hooks/useLlamaCppProviderAutoSync';
import { useMlxVlmLoadToast } from '@/hooks/useMlxVlmLoadToast';
import { useDesktopMenuBridge } from '@/hooks/useDesktopMenuBridge';
import LlmAssistModal from '@/components/LlmAssistModal';
import { useLlmAssistSession } from '@/contexts/LlmAssistSessionContext';

/** Main app chrome — domain hooks + thin contexts (no AppHandlers bag). */
export function AppLayout({ children }: { children?: ReactNode }) {
  const chrome = useAppChrome();
  const session = useSessionWorkspace();
  const chat = useChatIntegration();
  const editorExtras = useAppEditorExtras();
  const modals = useAppModals();
  const vault = useVault();
  const file = useFileSession();
  const autoSave = useAutoSave();
  const bootstrap = useAppBootstrap();
  const tabsCtx = useWorkspaceTabsCtx();
  const treeOps = useTreeOps();
  const recording = useRecordingOwned();
  const pwaSnippets = usePwaSnippetsOwned();
  const auth = useAuth();
  const { showAlert } = useAlertModal();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    sidebarOpen,
    setSidebarOpen,
    sidebarCollapsed,
    setSidebarCollapsed,
    isMobile,
    chatSurfaceActive,
    lockChatViewport,
    isChatRoute,
    isSettingsRoute,
    isContentSearchRoute,
    appName,
    handleBrandClick,
    chatAttachDropHost,
    setChatAttachDropHost,
    handleDropToChatAttach,
    handleRegisterChatAttachDrop,
    quizSourceDropActive,
    quizSourceDropHost,
    handleDropToQuizSource,
    fileTabContextMenuRef,
    expandPathsRef,
    showHiddenFolders,
    showTrashFolder,
    hideRecordingCompanions,
    treeStickyFolderPathEnabled,
    showTreeModifiedDate,
    treeHoverExpandSettings,
    setTreeHoverExpandSettings,
    uploadFileInputRef,
    uploadFolderInputRef,
    handleUploadFileSelect,
    handleUploadFolderSelect,
    operationStatus,
  } = chrome;

  const {
    closeSessionWorkspace,
    handleOpenSessionFiles,
    handleOpenSessionDirectory,
    handleDropSessionTransfer,
    handleDropSessionPaths,
    handleRequestSaveSessionToNote,
    handleRequestSessionTransformDownload,
    isOpeningSession,
    requestNewTempFile,
  } = session;

  const {
    chatStorageCtx,
    chatStorageReady,
    shareGroupSend,
    handleShareBlockingChange,
    handleShareComposeClaimed,
    handleShareGroupSendConsumed,
    handleShareNodeToChatWithMyself,
    handleShareNoteToChatWithMyself,
    handleCreateNoteFromChatMessage,
    handleOpenNoteFromChat,
    getChatImageUrlForPath,
    getAdvancedSearchChatGroups,
  } = chat;

  const {
    handleUploadEditorImage,
    cancelEditorImageUpload,
    isUploadingEditorImage,
    editorImageUploadPercent,
    handleRequestDownload,
    handleViewUnsupportedAsText,
    getAdvancedSearchTrees,
    ensureAdvancedSearchBrowseFolder,
    getPresignedUrlForPath,
    handleOpenInNewWindow,
    handleOpenStorageUsageFile,
    handleDeleteUnusedImagePaths,
    handleReadUnusedImageBytes,
    handleReadUnusedImageText,
  } = editorExtras;

  const {
    pendingLocalFolderName,
    addToNoteSelectPath,
    setAddToNoteSelectPath,
    setShowSuffixChangeConfirmModal,
    setSuffixConfirmAction,
  } = modals;

  const {
    storageMode,
    setStorageMode,
    s3Tree,
    localTree,
    webdavTree,
    localRootHandle,
    localVaultFsPath,
    webdavConfig,
    setWebdavConfig,
    localFolderLoadingPath,
    getS3Client,
    refreshWebdavTree,
    loadLocalFolderChildren,
    openLocalFolder,
    webdavReady,
    canScanStorageUsage,
    scanActiveStorageUsageTree,
    sessionWorkspaces,
  } = vault;

  const {
    currentFile,
    editorContent,
    saveFile,
    savingTabIds,
    openAdvancedSearchFile,
    handleRequestCloseEditor,
    refreshLocalFileFromDisk,
    refreshRemoteFile,
    editedFileName,
    setEditedFileName,
    editorType,
    handleEditorTypeChange,
    renameCurrentFileFullName,
    isSaving,
    isRefreshingFromDisk,
    isPullingFromRemote,
  } = file;

  const {
    handleEditorChange,
    autoSaveIndicatorClass,
    lastAutoSaveAt,
    lastAutoSyncAt,
  } = autoSave;

  const {
    theme,
    showAuthModal,
    shareBlockingAuth,
    handleUnlock,
    handleUnlockWithWebAuthn,
    proceedWithoutStoredCreds,
    fileInputRef,
    openSettingsWorkspaceTab,
    canUnlockWithWebAuthnForModal,
    autoPromptWebAuthnForModal,
    handleSaveS3Creds,
    handleExportCreds,
    handleImportCreds,
    handleSettingsClose,
    webauthnPRFSupported,
  } = bootstrap;

  const workspaceTabs = tabsCtx.state;
  const workspaceTabsEnabled = tabsCtx.workspaceTabsEnabled;
  const workspaceTabsEnabledRef = tabsCtx.workspaceTabsEnabledRef;
  const workspaceTabsRef = tabsCtx.workspaceTabsRef;
  const activateWorkspaceTab = tabsCtx.activateWorkspaceTab;
  const closeWorkspaceTabById = tabsCtx.closeWorkspaceTabById;
  const openChatWorkspaceTab = tabsCtx.openChatWorkspaceTab;
  const openContentSearchWorkspaceTab = tabsCtx.openContentSearchWorkspaceTab;
  const reorderWorkspaceTabs = tabsCtx.reorderWorkspaceTabs;
  const setWorkspaceTabs = tabsCtx.setState;

  const {
    setDeleteTarget,
    setCreateModalContext,
    setCreateModalOpen,
    requestNewFile,
    requestAdvancedSearchCreateItem,
    newFileDefaultParentPath,
    handleDropOnFolder,
    dropTarget,
    handleRequestMoveFolder,
    handleRequestMove,
    handleRequestMoveFileFromSidebar,
  } = treeOps;

  const {
    isRecording,
    audioLevel,
    recordingsList,
    selectedRecordingKey,
    setSelectedRecordingKey,
    recordingAudioUrl,
    recordingSyncData,
    recordingPipelineStatus,
    recordingQueueStats,
    handleToggleRecording,
  } = recording;

  const {
    snippetConfig,
    hidePwaUpdateToast,
    setHidePwaUpdateToast,
    isApplyingPwaUpdate,
    isCheckingAppUpdate,
    appBuildRemoteId,
    needRefresh,
    handleApplyPwaUpdate,
    handleCheckAppUpdate,
    handleChangeSnippetConfig,
    handleSaveSnippetConfig,
    isSavingSnippets,
    snippetLoadedFromLocal,
    snippetLoadedFromS3,
    snippetLoadedFromWebdav,
  } = pwaSnippets;

  const { isUnlocked, s3Creds, masterPassword } = auth;
  const llmAssist = useLlmAssistSession();
  useDesktopMenuBridge({
    enabled: isUnlocked,
    setStorageMode,
    openLocalFolder,
    currentFile,
    editorContent,
    theme,
    llmAssistOpen: llmAssist.open,
    toggleLlmAssist: llmAssist.toggleAssist,
  });
  const llmProviderProfiles = resolveLlmProviderProfiles(s3Creds);
  useMlxVlmProviderAutoSync(s3Creds, handleSaveS3Creds);
  useLlamaCppProviderAutoSync(s3Creds, handleSaveS3Creds);
  useMlxVlmLoadToast();
  const getImgbbApiKey = () => (s3Creds?.imgbbApiKey || '').trim();

  const formatTime = (ts: number | null | undefined) => {
    if (!ts) return '—';
    const d = new Date(ts);
    const hh = `${d.getHours()}`.padStart(2, '0');
    const mm = `${d.getMinutes()}`.padStart(2, '0');
    const ss = `${d.getSeconds()}`.padStart(2, '0');
    return `${hh}:${mm}:${ss}`;
  };

  const formatFileSize = (bytes: number | null | undefined) => {
    if (bytes == null || isNaN(bytes)) return '알 수 없음';
    if (bytes < 1024) return `${bytes} B`;
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    const mb = kb / 1024;
    if (mb < 1024) return `${mb.toFixed(1)} MB`;
    const gb = mb / 1024;
    return `${gb.toFixed(1)} GB`;
  };

  const isEditableStorage =
    currentFile?.type === 's3' ||
    currentFile?.type === 'local' ||
    currentFile?.type === 'webdav' ||
    currentFile?.type === SESSION_STORAGE_TYPE;

  const tauriMobileSidebar = isTauriDesktopPlatform() && isMobile;

  return (
    <div
      className={`flex min-h-0 bg-gray-50 dark:bg-odp-bgSofter text-gray-800 dark:text-odp-fg font-sans ${
        lockChatViewport
          ? 'fixed inset-x-0 z-0 flex-col overflow-hidden'
          : isDesktopApp()
            ? `relative h-dvh max-h-dvh min-h-0 overflow-hidden${
                isTauriDesktopPlatform() ? ' flex-col' : ''
              }`
            : 'relative h-screen'
      }`}
      style={
        lockChatViewport
          ? {
              top: 'var(--app-vv-top, 0px)',
              height: 'var(--app-vv-height, 100dvh)',
              maxHeight: 'var(--app-vv-height, 100dvh)',
            }
          : undefined
      }
    >
      <UserWebfontStyles />
      {isTauriDesktopPlatform() ? (
        <DesktopTitlebar
          tabs={workspaceTabs.tabs}
          activeId={workspaceTabs.activeId}
          savingTabIds={savingTabIds}
          tabsEnabled={workspaceTabsEnabled}
          appName={appName}
          isMobileLayout={isMobile}
          onActivateTab={(id) => activateWorkspaceTab(id)}
          onCloseTab={(id) => {
            closeWorkspaceTabById(id);
          }}
          onReorderTabs={reorderWorkspaceTabs}
          onFileTabContextMenu={(tab, point) => {
            fileTabContextMenuRef.current?.open?.({
              storageType: tab.storageType,
              path: tab.path,
              name: tab.editedFileName || tab.currentFile?.name,
              currentFile: tab.currentFile,
              clientX: point.clientX,
              clientY: point.clientY,
              onCloseTab: () => closeWorkspaceTabById(tab.id),
            });
          }}
        />
      ) : null}
      {/* Hidden file input for import */}
      <input type="file" ref={fileInputRef} onChange={handleImportCreds} accept=".json" className="hidden" />

      {/* Hidden file input for upload */}
      <input
        type="file"
        ref={uploadFileInputRef}
        onChange={handleUploadFileSelect}
        multiple
        className="hidden"
      />
      {/* Hidden folder input for upload */}
      <input
        type="file"
        ref={uploadFolderInputRef}
        onChange={handleUploadFolderSelect}
        {...({ webkitdirectory: '', directory: '' } as Record<string, string>)}
        className="hidden"
      />

      {needRefresh && !hidePwaUpdateToast && (
        <div className="fixed right-3 bottom-10 z-11000 w-[min(92vw,360px)] rounded-xl border border-blue-200 bg-white p-3 shadow-xl dark:border-blue-900/60 dark:bg-odp-bgSoft md:right-4 md:bottom-12">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 dark:text-odp-fgStrong">
                새 버전이 준비되었습니다
              </p>
              <p className="mt-1 text-xs text-gray-600 dark:text-odp-muted">
                저장 중인 작업을 확인한 뒤 업데이트를 적용하세요.
              </p>
            </div>
            <button
              type="button"
              className="shrink-0 rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:text-odp-muted dark:hover:bg-odp-focusBg dark:hover:text-odp-fg"
              aria-label="업데이트 토스트 닫기"
              onClick={() => setHidePwaUpdateToast(true)}
            >
              <IconX size={16} />
            </button>
          </div>
          <div className="mt-3 flex items-center justify-end gap-2">
            <button
              type="button"
              className="rounded-md px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100 dark:text-odp-fg dark:hover:bg-odp-focusBg"
              onClick={() => setHidePwaUpdateToast(true)}
              disabled={isApplyingPwaUpdate}
            >
              나중에
            </button>
            <button
              type="button"
              className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-blue-600 dark:hover:bg-blue-700"
              onClick={handleApplyPwaUpdate}
              disabled={isApplyingPwaUpdate}
            >
              {isApplyingPwaUpdate ? '업데이트 중...' : '지금 업데이트'}
            </button>
          </div>
        </div>
      )}

      {/* Share target chooser — above lock blur; defers AuthModal while open */}
      <ShareTargetGate
        isUnlocked={isUnlocked}
        storageReady={chatStorageReady}
        chatCtx={chatStorageCtx}
        onBlockingChange={handleShareBlockingChange}
        onComposeClaimed={handleShareComposeClaimed}
        onOpenAsSession={handleOpenSessionFiles}
      />

      {isUnlocked ? (
        <AdvancedSearchHost
          getTrees={getAdvancedSearchTrees}
          onOpenFile={openAdvancedSearchFile}
          ensureBrowseFolderLoaded={ensureAdvancedSearchBrowseFolder}
          onRequestCreateItem={requestAdvancedSearchCreateItem}
          onRequestCreateTempFile={requestNewTempFile}
          getChatGroups={getAdvancedSearchChatGroups}
          getPresignedUrl={getChatImageUrlForPath}
          currentFile={currentFile}
          defaultCreateParentPath={newFileDefaultParentPath}
          editorContent={editorContent}
          snippetConfig={snippetConfig}
          theme={theme}
          chatTabActive={chatSurfaceActive}
          onOpenContentSearch={(query) => {
            if (workspaceTabsEnabled) {
              openContentSearchWorkspaceTab({ query });
              return;
            }
            navigate(query ? `/search?q=${encodeURIComponent(query)}` : '/search');
          }}
        />
      ) : null}

      {/* Auth Modal (Lock Screen) */}
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

      {/* Main UI (Blurred if locked) */}
      <div
        className={`flex min-h-0 flex-1 w-full flex-col overflow-hidden transition-all duration-300 ${
          !isUnlocked ? 'blur-md pointer-events-none select-none' : ''
        }`}
      >
        <div className="relative flex min-h-0 flex-1">
          {/* Mobile: backdrop when sidebar open (kept mounted for fade-out) */}
          {isMobile && (
            <button
              type="button"
              aria-label="사이드바 닫기"
              aria-hidden={!sidebarOpen}
              tabIndex={sidebarOpen ? 0 : -1}
              className={`fixed left-0 right-0 bottom-0 z-55 bg-black/30 md:hidden transition-opacity duration-300 ease-out ${
                sidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
              } ${
                tauriMobileSidebar
                  ? 'top-[var(--app-sidebar-mobile-top,2rem)]'
                  : 'top-0'
              }`}
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar: mobile open z-60 above main z-50; closed z-40 + pointer-events-none */}
          <ResizableSidebarPanel
            isMobile={isMobile}
            collapsed={sidebarCollapsed}
            open={sidebarOpen}
            onRequestCollapse={() => setSidebarCollapsed(true)}
            mobileBelowTitlebar={tauriMobileSidebar}
          >
            <SidebarConnected
              isMobileLayout={isMobile}
              fileTabContextMenuRef={fileTabContextMenuRef}
              appName={appName}
              onBrandClick={handleBrandClick}
              s3Bucket={s3Creds.bucket}
              onOpenSettings={() => {
                if (isMobile) setSidebarOpen(false);
                openSettingsWorkspaceTab();
              }}
              showHiddenFolders={showHiddenFolders}
              showTrashFolder={showTrashFolder}
              hideRecordingCompanions={hideRecordingCompanions}
              treeStickyFolderPathEnabled={treeStickyFolderPathEnabled}
              showTreeModifiedDate={showTreeModifiedDate}
              hoverExpandDelayMs={treeHoverExpandSettingsToMs(treeHoverExpandSettings)}
              onRequestCollapseSidebar={!isMobile ? () => setSidebarCollapsed(true) : undefined}
              onRequestCloseSidebar={isMobile ? () => setSidebarOpen(false) : undefined}
              expandPathsRef={expandPathsRef}
              onRequestMoveFile={handleRequestMoveFileFromSidebar}
              onOpenInNewWindow={handleOpenInNewWindow}
              onShareToChatWithMyself={handleShareNodeToChatWithMyself}
              onOpenChatWithMyself={() => {
                if (isMobile) setSidebarOpen(false);
                if (workspaceTabsEnabled) openChatWorkspaceTab();
                else navigate('/chat');
              }}
              chatSurfaceActive={chatSurfaceActive}
              chatAttachDropHost={chatAttachDropHost}
              onDropToChatAttach={handleDropToChatAttach}
              quizSourceDropActive={quizSourceDropActive}
              quizSourceDropHost={quizSourceDropHost}
              onDropToQuizSource={handleDropToQuizSource}
              onCloseSessionWorkspace={closeSessionWorkspace}
            />
          </ResizableSidebarPanel>

          {!isMobile && (
            <button
              type="button"
              aria-label="사이드바 펼치기"
              title="사이드바 펼치기"
              onClick={() => setSidebarCollapsed(false)}
              className={`hidden md:inline-flex absolute left-3 top-3 z-55 p-1.5 shrink-0 text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-odp-focusBg rounded transition-all duration-300 ease-in-out ${
                sidebarCollapsed
                  ? 'opacity-100 translate-x-0 pointer-events-auto'
                  : 'opacity-0 -translate-x-2 pointer-events-none'
              }`}
              tabIndex={sidebarCollapsed ? 0 : -1}
              aria-hidden={!sidebarCollapsed}
            >
              <ChevronsRight size={18} aria-hidden />
            </button>
          )}

                    {/* Main Content Routes (z-50: above closed mobile sidebar z-40 so toolbar buttons receive taps) */}
          <div
            data-llm-assist-layout-root=""
            className="relative z-50 flex min-h-0 min-w-0 flex-1 overflow-hidden"
          >
          <div className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          <Routes>
            <Route
              path="*"
              element={
                <WorkspaceMainPanels
                  tabs={workspaceTabs.tabs}
                  activeId={workspaceTabs.activeId}
                  savingTabIds={savingTabIds}
                  tabsEnabled={workspaceTabsEnabled}
                  tabBarPlacement={isTauriDesktopPlatform() ? 'titlebar' : 'inline'}
                  isChatRoute={isChatRoute}
                  isSettingsRoute={isSettingsRoute}
                  isContentSearchRoute={isContentSearchRoute}
                  vaultDropProps={{
                    storageType: storageMode,
                    localRootHandle,
                    onDropOnFolder: handleDropOnFolder,
                  }}
                  isMobileLayout={isMobile}
                  onActivateTab={(id: string) => activateWorkspaceTab(id)}
                  onCloseTab={(id: string) => {
                    closeWorkspaceTabById(id);
                  }}
                  onReorderTabs={reorderWorkspaceTabs}
                  onFileTabContextMenu={(tab: any, point: { clientX: number; clientY: number }) => {
                    fileTabContextMenuRef.current?.open?.({
                      storageType: tab.storageType,
                      path: tab.path,
                      name: tab.editedFileName || tab.currentFile?.name,
                      currentFile: tab.currentFile,
                      clientX: point.clientX,
                      clientY: point.clientY,
                      onCloseTab: () => closeWorkspaceTabById(tab.id),
                    });
                  }}
                  mirrors={{
                    currentFile,
                    editorContent,
                    editedFileName,
                    setEditedFileName,
                    onChangeEditor: handleEditorChange,
                    onInactiveEditorChange: (tabId: string, value: string) => {
                      const next = patchFileTab(workspaceTabsRef.current, tabId, {
                        editorContent: value,
                      });
                      workspaceTabsRef.current = next;
                      setWorkspaceTabs(next);
                    },
                    onInactiveEditedFileName: (tabId: string, name: string) => {
                      const next = patchFileTab(workspaceTabsRef.current, tabId, {
                        editedFileName: name,
                      });
                      workspaceTabsRef.current = next;
                      setWorkspaceTabs(next);
                    },
                  }}
                  settingsPaneProps={{
                    s3Creds,
                    masterPassword,
                    onSaveS3Creds: handleSaveS3Creds,
                    storageMode,
                    onStorageModeChange: setStorageMode,
                    localFolderName:
                      localRootHandle?.name ||
                      basenameFromVaultPath(localVaultFsPath) ||
                      pendingLocalFolderName ||
                      loadLastLocalFolderName(),
                    localVaultFsPath: isDesktopApp() ? localVaultFsPath : '',
                    onOpenLocalFolder: openLocalFolder,
                    webdavConfig,
                    onSaveWebdavConfig: async (next: any) => {
                      setWebdavConfig(next);
                      if (isDesktopApp()) {
                        if (getDesktopAppEntryLockModeSync() === 'password' && masterPassword) {
                          await refreshDesktopPasswordEntryLockSecrets(
                            masterPassword,
                            s3Creds,
                            next,
                          );
                        } else {
                          await saveDesktopWebdavConfig(next);
                          clearPlaintextWebdavConfig();
                        }
                      } else if (masterPassword) {
                        await saveWebdavConfig(next, masterPassword);
                        clearPlaintextWebdavConfig();
                      } else if (
                        !requiresEncryptedWebdavStorage() &&
                        !hasEncryptedWebdavConfig()
                      ) {
                        await saveWebdavConfig(next);
                      }
                      if (storageMode === STORAGE_MODE_WEBDAV) {
                        await refreshWebdavTree();
                      }
                      showAlert({
                        title: '연결 정보',
                        message: '연결 정보 업데이트가 완료되었습니다.',
                      });
                    },
                    onExportCreds: handleExportCreds,
                    onImportClick: () => fileInputRef.current?.click(),
                    showHiddenFolders,
                    onToggleHiddenFolders: () =>
                      setSettingsToggle('settings-show-hidden', !showHiddenFolders),
                    showTrashFolder,
                    onToggleTrashFolder: () =>
                      setSettingsToggle('settings-show-trash', !showTrashFolder),
                    hideRecordingCompanions,
                    treeStickyFolderPathEnabled,
                    showTreeModifiedDate,
                    treeHoverExpandSettings,
                    onTreeHoverExpandSettingsChange: setTreeHoverExpandSettings,
                    onToggleHideRecordingCompanions: () =>
                      setSettingsToggle('settings-hide-recording', !hideRecordingCompanions),
                    onToggleTreeStickyFolderPath: () =>
                      setSettingsToggle('settings-tree-sticky', !treeStickyFolderPathEnabled),
                    onToggleShowTreeModifiedDate: () =>
                      setSettingsToggle('settings-tree-modified-date', !showTreeModifiedDate),
                    onRequestClose: handleSettingsClose,
                    webauthnSupported: webauthnPRFSupported,
                    webauthnEnabled: isStoredWithWebAuthn() || !!getStoredWebAuthn()?.encryptedPassword,
                    webauthnStorageOnly: isStoredWithWebAuthn(),
                    onEnableWebAuthn: enableWebAuthnUnlock,
                    onDisableWebAuthn: disableWebAuthnUnlock,
                    snippetConfig,
                    onChangeSnippetConfig: handleChangeSnippetConfig,
                    onSaveSnippetConfig: handleSaveSnippetConfig,
                    isSavingSnippets,
                    snippetConfigLoaded:
                      snippetLoadedFromS3 || snippetLoadedFromLocal || snippetLoadedFromWebdav,
                    editorType,
                    onEditorTypeChange: handleEditorTypeChange,
                    isMobileLayout: isMobile,
                    sidebarOpen,
                    sidebarCollapsed,
                    onOpenSidebar: () => setSidebarOpen(true),
                    onCheckAppUpdate: handleCheckAppUpdate,
                    isCheckingAppUpdate,
                    latestAppBuildId: appBuildRemoteId,
                    onScanStorageUsage: scanActiveStorageUsageTree,
                    canScanStorageUsage,
                    onOpenStorageUsageFile: handleOpenStorageUsageFile,
                    onReadUnusedImageText: handleReadUnusedImageText,
                    onReadUnusedImageBytes: handleReadUnusedImageBytes,
                    onDeleteUnusedImagePaths: handleDeleteUnusedImagePaths,
                  }}
                  editorPaneProps={({
                    currentFile: paneFile,
                    editorContent: paneContent,
                    editedFileName: paneEditedName,
                    setEditedFileName: paneSetEditedName,
                    onChangeEditor,
                    isActiveFile,
                  }: {
                    currentFile: any;
                    editorContent: string;
                    editedFileName: string;
                    setEditedFileName: (name: string) => void;
                    onChangeEditor: (value: string) => void;
                    isActiveFile: boolean;
                  }) => ({
                    currentFile: paneFile,
                    editorType,
                    editorContent: paneContent,
                    onChangeEditor,
                    onSave: saveFile,
                    isSaving,
                    onRefreshFromDisk:
                      paneFile?.type === 'local' ? refreshLocalFileFromDisk : undefined,
                    isRefreshingFromDisk,
                    onPullFromRemote:
                      (paneFile?.type === 's3' || paneFile?.type === 'webdav') &&
                      !isEncMdPath(paneFile?.id) &&
                      !isEncMdPath(paneFile?.name)
                        ? refreshRemoteFile
                        : undefined,
                    isPullingFromRemote,
                    editedFileName: paneEditedName,
                    setEditedFileName: paneSetEditedName,
                    onRenameFullName: renameCurrentFileFullName,
                    onRequestSuffixChangeConfirmForBlur: () => {
                      setSuffixConfirmAction('renameOnly');
                      setShowSuffixChangeConfirmModal(true);
                    },
                    onRequestClose: workspaceTabsEnabled ? undefined : handleRequestCloseEditor,
                    onRequestMove: handleRequestMove,
                    onViewUnsupportedAsText: handleViewUnsupportedAsText,
                    onRequestDownload: handleRequestDownload,
                    onShareToChatWithMyself:
                      paneFile && paneFile.type !== SESSION_STORAGE_TYPE
                        ? handleShareNoteToChatWithMyself
                        : undefined,
                    theme,
                    previewOnly: false,
                    isMobileLayout: isMobile,
                    sidebarOpen,
                    sidebarCollapsed,
                    onOpenSidebar: () => {
                      if (isMobile) setSidebarOpen(true);
                      else setSidebarCollapsed(false);
                    },
                    onRequestCreateFile: requestNewFile,
                    onOpenChatWithMyself: () => {
                      if (workspaceTabsEnabledRef.current) openChatWorkspaceTab();
                      else navigate('/chat');
                    },
                    onSaveSessionToNote: handleRequestSaveSessionToNote,
                    onRequestSessionTransformDownload: handleRequestSessionTransformDownload,
                    onOpenSessionFiles: handleOpenSessionFiles,
                    onOpenSessionDirectory:
                      typeof window !== 'undefined' && 'showDirectoryPicker' in window
                        ? handleOpenSessionDirectory
                        : undefined,
                    onDropSessionTransfer: handleDropSessionTransfer,
                    onDropSessionPaths: handleDropSessionPaths,
                    isOpeningSession,
                    hideRecordingCompanions,
                    isRecording: isActiveFile ? isRecording : false,
                    audioLevel: isActiveFile ? audioLevel : 0,
                    onToggleRecording:
                      !isActiveFile || paneFile?.type === SESSION_STORAGE_TYPE
                        ? undefined
                        : handleToggleRecording,
                    recordingPipelineStatus,
                    recordingsList: isActiveFile ? recordingsList : [],
                    selectedRecordingKey: isActiveFile ? selectedRecordingKey : '',
                    onSelectRecording: setSelectedRecordingKey,
                    recordingAudioUrl: isActiveFile ? recordingAudioUrl : '',
                    recordingSyncData: isActiveFile ? recordingSyncData : null,
                    isActiveFile,
                    onUploadImage: handleUploadEditorImage,
                    isUploadingEditorImage,
                    uploadImagePercent: editorImageUploadPercent,
                    onCancelUploadImage: cancelEditorImageUpload,
                    onResolveWikiImageUrl: getPresignedUrlForPath,
                    onOpenViewPath: handleOpenNoteFromChat,
                    snippetConfig,
                    llmProviderProfiles,
                    getImgbbApiKey,
                    onRequestDelete: () =>
                      setDeleteTarget(
                        paneFile
                          ? {
                              node: {
                                path: paneFile?.id,
                                name: paneFile?.name,
                                type: 'file',
                                handle: paneFile?.handle,
                                parentHandle: paneFile?.parentHandle,
                              },
                              type: paneFile?.type,
                            }
                          : null,
                      ),
                  })}
                  chatPaneProps={{
                    storageMode,
                    getS3Client,
                    s3Bucket: s3Creds.bucket,
                    localRootHandle,
                    webdavConfig,
                    theme,
                    isMobileLayout: isMobile,
                    sidebarOpen,
                    onOpenSidebar: () => setSidebarOpen(true),
                    s3Tree,
                    localTree,
                    webdavTree,
                    shareGroupSend,
                    onShareGroupSendConsumed: handleShareGroupSendConsumed,
                    onOpenNote: handleOpenNoteFromChat,
                    selectPathAfterCreateFolder: addToNoteSelectPath,
                    onSelectPathAfterCreateFolderApplied: () => setAddToNoteSelectPath(null),
                    onRequestCreateFolderForNote: (parentPath: string, parentDirHandle: FileSystemDirectoryHandle | null) => {
                      setCreateModalContext({
                        storageType:
                          storageMode === 'local' || storageMode === 'webdav' || storageMode === 's3'
                            ? storageMode
                            : 's3',
                        parentPath,
                        parentDirHandle,
                        type: 'folder',
                        fromAddToNoteModal: true,
                      });
                      setCreateModalOpen(true);
                    },
                    onRequestMoveFolder: handleRequestMoveFolder,
                    onCreateNoteFromMessage: handleCreateNoteFromChatMessage,
                    getPresignedUrlForPath: getChatImageUrlForPath,
                    onDropOnFolder: handleDropOnFolder,
                    dropTarget,
                    onLoadLocalFolderChildren: loadLocalFolderChildren,
                    localFolderLoadingPath,
                    onAttachDropHostChange: setChatAttachDropHost,
                    onRegisterTreeAttachDrop: handleRegisterChatAttachDrop,
                  }}
                  contentSearchPaneProps={{
                    storageMode,
                    s3Tree,
                    localTree,
                    webdavTree,
                    sessionWorkspaces,
                    onOpenFile: openAdvancedSearchFile,
                  }}
                />
              }
            />
          </Routes>
          </div>
          <LlmAssistModal
            llmProviderProfiles={llmProviderProfiles}
            theme={theme}
          />
          </div>
        </div>

        {/* Status Bar — z above editor chrome (z-10100) so novel/md layers do not cover it on mobile */}
        <div
          data-app-status-bar=""
          className="relative z-10200 flex h-6 shrink-0 items-center justify-between gap-2 border-t border-gray-200 bg-white/90 px-2 pb-[max(0px,env(safe-area-inset-bottom))] text-[10px] dark:border-odp-borderSoft dark:bg-odp-bgSoft/95 md:h-7 md:gap-3 md:px-3 md:text-[11px]"
        >
          <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1 overflow-hidden">
            <FileUploadQueueStatusBar />
            <ActivityIndicatorBar />
            {!hideRecordingCompanions &&
              (recordingQueueStats.pending > 0 ||
                recordingQueueStats.uploading > 0 ||
                recordingQueueStats.failed > 0) && (
              <span
                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-gray-100 dark:bg-odp-bgSofter text-gray-700 dark:text-odp-fgStrong text-[10px] md:text-[11px] shrink-0"
                title={`녹음 업로드 큐 - 대기 ${recordingQueueStats.pending}, 업로드중 ${recordingQueueStats.uploading}, 실패 ${recordingQueueStats.failed}`}
              >
                <span className="truncate max-w-40 md:max-w-55">
                  녹음 업로드:{" "}
                  {recordingQueueStats.uploading > 0 || recordingPipelineStatus === '업로드 중'
                    ? "업로드 중"
                    : recordingQueueStats.pending > 0
                      ? `대기 ${recordingQueueStats.pending}`
                      : "재시도 대기"}
                </span>
                <span className="text-gray-500 dark:text-odp-muted shrink-0">
                  실패 {recordingQueueStats.failed}
                </span>
              </span>
            )}
            {!chatSurfaceActive ? (
              <>
                <span className="truncate shrink-0 max-w-12 md:max-w-none" title={
                  currentFile?.type === 's3'
                    ? `S3 (${s3Creds.bucket || '-'})`
                    : currentFile?.type === 'local'
                      ? '로컬'
                    : currentFile?.type === 'webdav'
                      ? 'WebDAV'
                      : currentFile?.type === SESSION_STORAGE_TYPE
                        ? '다운로드 세션'
                        : '없음'
                }>
                  <span className="md:hidden">
                    {currentFile?.type === 's3'
                      ? 'S3'
                      : currentFile?.type === 'local'
                        ? '로컬'
                        : currentFile?.type === 'webdav'
                          ? 'WebDAV'
                          : currentFile?.type === SESSION_STORAGE_TYPE
                            ? '세션'
                            : '없음'}
                  </span>
                  <span className="hidden md:inline">
                    <span className='flex items-center gap-1'>
                      <Cloud className="size-3" />
                      {' '}
                      {currentFile?.type === 's3'
                        ? `S3`
                        : currentFile?.type === 'local'
                          ? '로컬'
                          : currentFile?.type === 'webdav'
                            ? 'WebDAV'
                            : currentFile?.type === SESSION_STORAGE_TYPE
                              ? '다운로드 세션'
                              : '없음'}
                    </span>
                  </span>
                </span>
                {currentFile && (
                  <>
                    <span className="truncate min-w-0" title={currentFile.type === 's3' ? currentFile.id : currentFile.id || currentFile.name}>
                      {currentFile.type === 's3' ? currentFile.id : currentFile.id || currentFile.name}
                    </span>
                    <span className="hidden md:inline truncate text-gray-500 dark:text-odp-muted shrink-0">
                      크기: {currentFile.size != null ? formatFileSize(currentFile.size) : '알 수 없음'}
                    </span>
                  </>
                )}
                {operationStatus && (
                  <span className="truncate text-gray-500 dark:text-odp-muted hidden md:inline">
                    상태: {operationStatus}
                  </span>
                )}
              </>
            ) : (
              <span className="truncate text-gray-500 dark:text-odp-muted shrink-0">
                <span className='flex items-center gap-1'>
                  <MessagesSquare className="size-3" />
                  {storageMode === 's3'
                    ? `S3`
                    : storageMode === 'local'
                      ? '로컬'
                      : storageMode === 'webdav'
                        ? 'WebDAV'
                        : ''}
                </span>
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            {location.pathname === '/chat' || location.pathname.endsWith('/chat') ? (
              <span
                className="flex items-center gap-1 md:gap-1.5"
                title={
                  storageMode === 's3'
                    ? '채팅 메시지는 S3에 저장·동기화됩니다'
                    : storageMode === 'local'
                      ? '채팅 메시지는 로컬 폴더에 저장됩니다'
                      : storageMode === 'webdav'
                        ? '채팅 메시지는 WebDAV에 저장·동기화됩니다'
                        : '저장소 미연결'
                }
              >
                <span
                  className={`h-2 w-2 shrink-0 rounded-full md:h-2.5 md:w-2.5 ${
                    (storageMode === 's3' && s3Creds.bucket) ||
                    (storageMode === 'local' && localRootHandle) ||
                    (storageMode === 'webdav' && webdavReady)
                      ? 'bg-emerald-500'
                      : 'bg-amber-400'
                  }`}
                  aria-hidden="true"
                />
                <span className="md:hidden">
                  {(storageMode === 's3' && s3Creds.bucket) ||
                  (storageMode === 'local' && localRootHandle) ||
                  (storageMode === 'webdav' && webdavReady)
                    ? '동기화'
                    : '대기'}
                </span>
                <span className="hidden md:inline">
                  채팅 동기화:{' '}
                  {(storageMode === 's3' && s3Creds.bucket) ||
                  (storageMode === 'local' && localRootHandle) ||
                  (storageMode === 'webdav' && webdavReady)
                    ? storageMode === 's3'
                      ? 'S3 연결됨'
                      : storageMode === 'webdav'
                        ? 'WebDAV 연결됨'
                        : '로컬 준비됨'
                    : '연결 필요'}
                </span>
              </span>
            ) : (
              <>
                <span className="flex items-center gap-1 md:gap-1.5" title={isEditableStorage ? (lastAutoSaveAt ? `저장 ${formatTime(lastAutoSaveAt)}` : '대기 중') : '대상 아님'}>
                  <span
                    className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full shrink-0 ${autoSaveIndicatorClass}`}
                    aria-hidden="true"
                  />
                  <span className="md:hidden">
                    {isEditableStorage
                      ? lastAutoSaveAt
                        ? formatTime(lastAutoSaveAt)
                        : '대기'
                      : '-'}
                  </span>
                  <span className="hidden md:inline">
                    자동저장:{' '}
                    {isEditableStorage
                      ? lastAutoSaveAt
                        ? `마지막 ${formatTime(lastAutoSaveAt)}`
                        : '대기 중 (입력 후 5초)'
                      : '대상 아님'}
                  </span>
                </span>
                <span
                  className="hidden md:inline"
                  title={
                    currentFile?.type === 's3' || currentFile?.type === 'webdav'
                      ? lastAutoSyncAt
                        ? `동기화 ${formatTime(lastAutoSyncAt)}`
                        : '대기 중'
                      : '대상 아님'
                  }
                >
                  자동동기화:{' '}
                  {currentFile?.type === 's3' || currentFile?.type === 'webdav'
                    ? lastAutoSyncAt
                      ? `마지막 ${formatTime(lastAutoSyncAt)}`
                      : '대기 중 (입력 후 30초)'
                    : '대상 아님'}
                </span>
              </>
            )}
          </div>
        </div>
      </div>


      {children}
      <FileUploadQueueFloatingPanel />
    </div>
  );
}
