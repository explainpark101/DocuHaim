// @ts-nocheck — AppLogic compose: providers + setup + domain hooks
/**
 * Thin AppLogic compose. Owned state lives in App*StateProviders;
 * setup effects in useAppLogicSetupDomain; handlers in use*Domain.
 */
import { useCallback, useMemo, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { getParentPathsToExpand } from '@/App/helpers';
import { useWorkspaceTabsCtx } from '@/App/hooks/useWorkspaceTabsCtx';
import { useBootstrapOwned } from '@/App/providers/AppBootstrapStateProvider';
import { useVault } from '@/App/hooks/useVault';
import { useFileSessionOwned } from '@/App/providers/AppFileSessionStateProvider';
import { useFileSession } from '@/App/hooks/useFileSession';
import { useTreeOpsOwned } from '@/App/providers/AppTreeOpsStateProvider';
import { useTreeOps } from '@/App/hooks/useTreeOps';
import { useRecordingOwned } from '@/App/providers/RecordingProvider';
import { usePwaSnippetsOwned } from '@/App/providers/AppPwaSnippetsStateProvider';
import { useModalsOwned } from '@/App/providers/AppModalsStateProvider';
import { useChromeOwned } from '@/App/providers/AppChromeStateProvider';
import { useAlertModal } from '@/contexts/AlertModalContext';
import { useToast } from '@/contexts/ToastContext';
import { useActivityIndicator } from '@/contexts/ActivityIndicatorContext';
import { useAuth } from '@/contexts/AuthContext';
import { resolveLlmProviderProfiles } from '@/utils/llmProviderProfiles';
import {
  enableWebAuthnUnlock,
  disableWebAuthnUnlock,
} from '@/utils/webauthn';
import { getActiveTab, isChatTab } from '@/utils/workspaceTabs';

import { useAppLogicSetupDomain } from '@/App/hooks/useAppLogicSetupDomain';
import { useBootstrapDomain } from '@/App/hooks/useBootstrapDomain';
import { useSessionWorkspaceDomain } from '@/App/hooks/useSessionWorkspaceDomain';
import { useAppChromeDomain } from '@/App/hooks/useAppChromeDomain';
import { useAdvancedSearchTabsDomain } from '@/App/hooks/useAdvancedSearchTabsDomain';
import { useChatIntegrationDomain } from '@/App/hooks/useChatIntegrationDomain';
import { useEditorImageDownloadDomain } from '@/App/hooks/useEditorImageDownloadDomain';
import { useRecordingVaultEffectsDomain } from '@/App/hooks/useRecordingVaultEffectsDomain';
import { useFileOpenRoutingDomain } from '@/App/hooks/useFileOpenRoutingDomain';
import { useDownloadSessionDomain } from '@/App/hooks/useDownloadSessionDomain';
import { useTempChatRecordingDomain } from '@/App/hooks/useTempChatRecordingDomain';
import { useRenameBridgeDomain } from '@/App/hooks/useRenameBridgeDomain';

export function useAppLogicSharedState() {
  const { addIndicator, removeIndicator, updateIndicator } = useActivityIndicator();
  const { showAlert } = useAlertModal();
  const { showToast } = useToast();
  const auth = useAuth();
  const bootstrapOwned = useBootstrapOwned();
  const vault = useVault();
  const fileOwned = useFileSessionOwned();
  const fileSessionApi = useFileSession();
  const treeOwned = useTreeOpsOwned();
  const treeOpsApi = useTreeOps();
  const recording = useRecordingOwned();
  const pwa = usePwaSnippetsOwned();
  const modals = useModalsOwned();
  const chrome = useChromeOwned();
  const workspaceTabsApi = useWorkspaceTabsCtx();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    isUnlocked,
    showAuthModal,
    setShowAuthModal,
    showSetPasswordModal,
    setShowSetPasswordModal,
    masterPassword,
    setMasterPassword,
    s3Creds,
    setS3Creds,
    unlock,
    proceedWithoutStoredCreds,
    lock,
    appLockPromptManual,
  } = auth;

  const workspaceTabs = workspaceTabsApi.state;
  const setWorkspaceTabs = workspaceTabsApi.setState;
  const workspaceTabsRef = workspaceTabsApi.workspaceTabsRef;
  workspaceTabsRef.current = workspaceTabs;
  const workspaceTabsEnabled = workspaceTabsApi.workspaceTabsEnabled;
  const setWorkspaceTabsEnabled = workspaceTabsApi.setWorkspaceTabsEnabled;
  const workspaceTabsEnabledRef = workspaceTabsApi.workspaceTabsEnabledRef;
  workspaceTabsEnabledRef.current = workspaceTabsEnabled;
  const activeWorkspaceTab = getActiveTab(workspaceTabs);
  const chatTabActive = isChatTab(activeWorkspaceTab);

  const llmProviderProfiles = useMemo(
    () => resolveLlmProviderProfiles(s3Creds),
    [s3Creds],
  );
  const getImgbbApiKey = useCallback(
    () => (s3Creds?.imgbbApiKey || '').trim(),
    [s3Creds?.imgbbApiKey],
  );

  const setup = useAppLogicSetupDomain({
    s3Creds,
    setWebdavConfig: vault.setWebdavConfig,
    lock,
    unlock,
    proceedWithoutStoredCreds,
    isUnlocked,
    masterPassword,
    webdavConfig: vault.webdavConfig,
    navigate,
    location,
    setSelectedIds: treeOwned.setSelectedIds,
    setCurrentFile: fileOwned.setCurrentFile,
    currentFileRef: fileOwned.currentFileRef,
    setEditorContent: fileOwned.setEditorContent,
    editorContentRef: fileOwned.editorContentRef,
    setEditedFileName: fileOwned.setEditedFileName,
    editedFileName: fileOwned.editedFileName,
    currentFile: fileOwned.currentFile,
    editedFileNameRef: fileOwned.editedFileNameRef,
    workspaceTabsApi,
    workspaceTabsRef,
    workspaceTabsEnabledRef,
    setWorkspaceTabs,
    setWorkspaceTabsEnabled,
    setSavingTabIds: fileOwned.setSavingTabIds,
    savingTabIdsRef: fileOwned.savingTabIdsRef,
    saveFileRef: fileOwned.saveFileRef,
    setPendingCloseTabId: modals.setPendingCloseTabId,
    setShowCloseFileConfirmModal: modals.setShowCloseFileConfirmModal,
    s3Tree: vault.s3Tree,
    webdavTree: vault.webdavTree,
    sessionWorkspace: vault.sessionWorkspace,
    sessionWorkspaceRef: fileOwned.sessionWorkspaceRef,
    storageMode: vault.storageMode,
    fileSessionApi,
    appLockPromptManual,
    setAuthWanted: chrome.setAuthWanted,
    authWanted: chrome.authWanted,
    shareBlockingAuth: bootstrapOwned.shareBlockingAuth,
    setShowAuthModal,
    setWebauthnPRFSupported: modals.setWebauthnPRFSupported,
    setWebauthnAvailable: modals.setWebauthnAvailable,
    webauthnAvailable: modals.webauthnAvailable,
    isChatRoute: chrome.isChatRoute,
    isSettingsRoute: chrome.isSettingsRoute,
    setShowTrashFolder: chrome.setShowTrashFolder,
    setShowHiddenFolders: chrome.setShowHiddenFolders,
    setHideRecordingCompanions: chrome.setHideRecordingCompanions,
    setTreeStickyFolderPathEnabled: chrome.setTreeStickyFolderPathEnabled,
    setShowTreeModifiedDate: chrome.setShowTreeModifiedDate,
  });

  fileOwned.saveFileRef.current = setup.saveFile;
  fileOwned.selectFileRawRef.current = setup.selectFileRaw;

  const bag: Record<string, any> = {
    addIndicator, removeIndicator, updateIndicator, showAlert, showToast, auth,
    ...bootstrapOwned,
    ...vault,
    ...fileOwned,
    ...treeOwned,
    ...treeOpsApi,
    ...recording,
    ...pwa,
    ...modals,
    ...chrome,
    fileSessionApi,
    treeOpsApi,
    workspaceTabsApi,
    isUnlocked, showAuthModal, setShowAuthModal,
    showSetPasswordModal, setShowSetPasswordModal,
    masterPassword, setMasterPassword, s3Creds, setS3Creds,
    unlock, proceedWithoutStoredCreds, lock,
    navigate, location,
    workspaceTabs, setWorkspaceTabs, workspaceTabsRef,
    workspaceTabsEnabled, setWorkspaceTabsEnabled, workspaceTabsEnabledRef,
    activeWorkspaceTab, chatTabActive,
    llmProviderProfiles, getImgbbApiKey,
    enableWebAuthnUnlock, disableWebAuthnUnlock,
    getParentPathsToExpand,
    ...setup,
  };

  const glueRef = useRef({});
  Object.assign(glueRef.current, {
    setOperationStatus: chrome.setOperationStatus,
    expandPathsRef: chrome.expandPathsRef,
    isMobile: chrome.isMobile,
    setSidebarOpen: chrome.setSidebarOpen,
    uploadFileInputRef: chrome.uploadFileInputRef,
    uploadFolderInputRef: chrome.uploadFolderInputRef,
    setAddToNoteSelectPath: modals.setAddToNoteSelectPath,
    setSaveSessionToNoteSelectPath: modals.setSaveSessionToNoteSelectPath,
    chatSurfaceActive: chrome.chatSurfaceActive,
    setDownloadResultModal: modals.setDownloadResultModal,
    sessionWorkspaceRef: fileOwned.sessionWorkspaceRef,
    sessionVaultBindingsRef: fileOwned.sessionVaultBindingsRef,
    savingTabIdsRef: fileOwned.savingTabIdsRef,
    suppressUnsavedNavGuardRef: setup.suppressUnsavedNavGuardRef,
    pendingCoverSaveRef: modals.pendingCoverSaveRef,
  });

  useBootstrapDomain(bag, glueRef);
  useSessionWorkspaceDomain(bag, glueRef);
  useAppChromeDomain(bag, glueRef);
  useAdvancedSearchTabsDomain(bag, glueRef);
  useChatIntegrationDomain(bag, glueRef);
  useEditorImageDownloadDomain(bag, glueRef);
  useRecordingVaultEffectsDomain(bag, glueRef);
  useFileOpenRoutingDomain(bag, glueRef);
  useDownloadSessionDomain(bag, glueRef);
  useTempChatRecordingDomain(bag, glueRef);
  useRenameBridgeDomain(bag, glueRef);

  Object.assign(glueRef.current, {
    selectFile: bag.selectFile,
    closeCurrentFile: bag.closeCurrentFile,
    confirmAndCancelEditorImageUpload: bag.confirmAndCancelEditorImageUpload,
    requestEncMdPassword: bag.requestEncMdPassword,
    renameS3File: bag.renameS3File,
    renameLocalFile: bag.renameLocalFile,
    readBackendBytes: bag.readBackendBytes,
    downloadMarkdownImageZip: bag.downloadMarkdownImageZip,
    writeSessionFileToHaim: bag.writeSessionFileToHaim,
    flushSessionEditorToWorkspace: bag.flushSessionEditorToWorkspace,
    applySessionFileToEditor: bag.applySessionFileToEditor,
    openSessionWorkspace: bag.openSessionWorkspace,
    hasUnsavedEditorChanges: bag.hasUnsavedEditorChanges,
    maybeAutoSaveOnFocusChange: setup.maybeAutoSaveOnFocusChange,
  });

  return bag;
}
