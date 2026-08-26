/**
 * Thin AppLogic compose. Owned state in App*StateProviders;
 * setup + use*Domain are context-owned (no bag / glueRef). Merge returns only.
 */
import { useCallback, useMemo } from 'react';
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
import { resolveLlmProviderProfiles } from '@/utils/llm/llmProviderProfiles';
import { enableWebAuthnUnlock, disableWebAuthnUnlock } from '@/utils/shared/webauthn';
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

export function useAppLogicSharedState(): Record<string, any> {
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
    isUnlocked, showAuthModal, setShowAuthModal, showSetPasswordModal, setShowSetPasswordModal,
    masterPassword, setMasterPassword, s3Creds, setS3Creds, unlock, proceedWithoutStoredCreds, lock,
  } = auth;

  const workspaceTabs = workspaceTabsApi.state;
  const setWorkspaceTabs = workspaceTabsApi.setState;
  const { workspaceTabsRef, workspaceTabsEnabled, setWorkspaceTabsEnabled, workspaceTabsEnabledRef } =
    workspaceTabsApi;
  workspaceTabsRef.current = workspaceTabs;
  workspaceTabsEnabledRef.current = workspaceTabsEnabled;
  const activeWorkspaceTab = getActiveTab(workspaceTabs);
  const chatTabActive = isChatTab(activeWorkspaceTab);
  const llmProviderProfiles = useMemo(() => resolveLlmProviderProfiles(s3Creds), [s3Creds]);
  const getImgbbApiKey = useCallback(
    () => (s3Creds?.imgbbApiKey || '').trim(),
    [s3Creds?.imgbbApiKey],
  );

  const setup = useAppLogicSetupDomain();
  fileOwned.selectFileRawRef.current = setup.selectFileRaw;

  const bootstrap = useBootstrapDomain();
  const session = useSessionWorkspaceDomain();
  const appChrome = useAppChromeDomain();
  const advancedSearch = useAdvancedSearchTabsDomain();
  const chat = useChatIntegrationDomain();
  const editorImage = useEditorImageDownloadDomain();
  const recordingEffects = useRecordingVaultEffectsDomain();
  const fileOpen = useFileOpenRoutingDomain();
  const download = useDownloadSessionDomain();
  const tempChat = useTempChatRecordingDomain();

  treeOwned.confirmAndCancelEditorImageUploadRef.current =
    editorImage.confirmAndCancelEditorImageUpload ?? null;
  treeOwned.readBackendBytesRef.current = download.readBackendBytes ?? null;
  treeOwned.downloadMarkdownImageZipRef.current = download.downloadMarkdownImageZip ?? null;

  return {
    addIndicator, removeIndicator, updateIndicator, showAlert, showToast, auth,
    ...bootstrapOwned, ...vault, ...fileOwned, ...treeOwned, ...treeOpsApi, ...recording, ...pwa,
    ...modals, ...chrome, fileSessionApi, treeOpsApi, workspaceTabsApi,
    isUnlocked, showAuthModal, setShowAuthModal, showSetPasswordModal, setShowSetPasswordModal,
    masterPassword, setMasterPassword, s3Creds, setS3Creds, unlock, proceedWithoutStoredCreds, lock,
    navigate, location, workspaceTabs, setWorkspaceTabs, workspaceTabsRef, workspaceTabsEnabled,
    setWorkspaceTabsEnabled, workspaceTabsEnabledRef, activeWorkspaceTab, chatTabActive,
    llmProviderProfiles, getImgbbApiKey, enableWebAuthnUnlock, disableWebAuthnUnlock,
    getParentPathsToExpand, ...setup,
    suppressUnsavedNavGuardRef: fileOwned.suppressUnsavedNavGuardRef,
    ...bootstrap, ...session, ...appChrome, ...advancedSearch, ...chat, ...editorImage,
    ...recordingEffects, ...fileOpen, ...download, ...tempChat,
    renameS3File: (...args: any[]) => fileSessionApi.renameS3File?.(...args),
    renameLocalFile: (...args: any[]) => fileSessionApi.renameLocalFile?.(...args),
  };
}
