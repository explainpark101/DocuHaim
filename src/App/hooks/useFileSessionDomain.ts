/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useRef } from 'react';
import type { FileSessionDomainValue } from '@/App/context/FileSessionContext';
import { useNavigate, useLocation } from 'react-router';
import { getExt, getParentPathsToExpand } from '@/App/helpers';
import { useVault } from '@/App/hooks/useVault';
import { useFileSessionOwned } from '@/App/providers/AppFileSessionStateProvider';
import { useModalsOwned } from '@/App/providers/AppModalsStateProvider';
import { useChromeOwned } from '@/App/providers/AppChromeStateProvider';
import { useWorkspaceTabsCtx } from '@/App/hooks/useWorkspaceTabsCtx';
import { markAutoSaveSyncTimestamp } from '@/App/hooks/autoSaveBridge';
import { useAuth } from '@/contexts/AuthContext';
import { useAlertModal } from '@/contexts/AlertModalContext';
import { useToast } from '@/contexts/ToastContext';
import { useActivityIndicator, ActivityTypes } from '@/contexts/ActivityIndicatorContext';
import {
  getActiveFileTab,
  getActiveTab,
  isFileTabDirty,
} from '@/utils/workspaceTabs';
import {
  applyOpenedFileReducer,
  findFileTab,
  flushEditorIntoActiveFileTab,
  patchFileTab,
  softCapPrompt,
} from '@/utils/workspaceTabs/appBridge';
import { retainOnlyFileTab } from '@/utils/workspaceTabs/legacyMode';
import { resolveOpenTextContent } from '@/utils/workspaceTabs/resolveOpenText';
import {
  decryptEncMdContent,
  getEncMdPassword,
  isEncMdPath,
  prepareEncMdVaultBody,
  setEncMdPassword,
  tryUnlockEncMdContent,
} from '@/utils/encMd';
import { noteCoverCommentChanged } from '@/utils/noteCover';
import { getObjectBody, putObject, copyObject, deleteObject } from '@/utils/vault/s3Client';
import {
  createWebdavBackend,
  createLocalBackend,
} from '@/utils/storage';
import { openPathFileFromBackend } from '@/utils/storage/openPathFileFromBackend';
import { notifyAdvancedSearchChange } from '@/utils/advancedSearch';
import { isDesktopApp } from '@/utils/shared/isDesktopApp';
import {
  getDraftKey,
  saveMemoDraft,
  getMemoDraft,
  deleteMemoDraft,
} from '@/utils/memoDraftsDb';
import { savePendingUpload } from '@/utils/pendingUploadsDb';
import { rebaseMergeTexts, buildTimestampedCopyName } from '@/utils/textRebaseMerge';
import { resolveLocalFileNode } from '@/utils/localFileNode';
import { findFileNodeByPath, findNodeByPath } from '@/utils/vault/s3Tree';
import {
  parseOpenNotePathFromAppPathname,
  isExportPdfAppPathname,
  exportPdfPathnameForStoragePath,
} from '@/utils/appHref';
import {
  SESSION_STORAGE_TYPE,
  renameSessionFile,
} from '@/utils/vault/sessionWorkspace';
import {
  STORAGE_MODE_LOCAL,
  STORAGE_MODE_S3,
  STORAGE_MODE_WEBDAV,
} from '@/utils/vault/storageSettings';

type CommitOpenFileOptions = {
  activate?: boolean;
  baselineContent?: string;
};

type SelectFileOptions = {
  skipNavigate?: boolean;
};

type SaveFileOptions = {
  skipSuffixCheck?: boolean;
  skipCoverChangeCheck?: boolean;
  lastInputAt?: number;
  contentOverride?: string;
  background?: boolean;
};

type ApplyIdentityOptions = {
  oldPath?: string | null;
  retargetTabs?: boolean;
};

function isAbortOrNetworkError(e: unknown) {
  if (!e) return false;
  const err = e as { name?: string; message?: string; code?: string };
  const name = (err.name || '').toLowerCase();
  const msg = (err.message || '').toLowerCase();
  const code = err.code || '';
  return (
    name === 'aborterror' ||
    name === 'networkerror' ||
    msg.includes('abort') ||
    msg.includes('network') ||
    msg.includes('fetch') ||
    msg.includes('econnreset') ||
    msg.includes('econnrefused') ||
    msg.includes('timeout') ||
    code === 'ECONNABORTED' ||
    code === 'ETIMEDOUT' ||
    code === 'ENOTFOUND'
  );
}

/**
 * Owns file open/save/refresh/close/AS-open + P3 identity handlers.
 * Reads modals/chrome/owned refs — no register*BridgeDeps.
 */
export function useFileSessionDomain(): FileSessionDomainValue {
  const navigate = useNavigate();
  const location = useLocation();
  const { addIndicator, removeIndicator } = useActivityIndicator();
  const { showAlert } = useAlertModal();
  const { showToast } = useToast();
  const { s3Creds } = useAuth();

  const {
    storageMode,
    s3Tree,
    localTree,
    webdavTree,
    localRootHandle,
    localVaultFsPath,
    webdavConfig,
    webdavReady,
    getBackendForType,
    getS3Client,
    loadS3Files,
    refreshLocalTree,
    refreshWebdavTree,
    setSessionWorkspace,
  } = useVault();

  const {
    currentFile,
    setCurrentFile,
    editorContent,
    setEditorContent,
    editorContentRef,
    currentFileRef,
    editedFileName,
    setEditedFileName,
    setIsSaving,
    setSavingTabIds,
    savingTabIdsRef,
    setEncMdPrompt,
    setIsRefreshingFromDisk,
    setIsPullingFromRemote,
    sessionVaultBindingsRef,
    writeSessionFileToHaimRef,
    sessionWorkspaceRef,
    saveFileRef,
    selectFileRef,
    applyWorkspaceFilePathRetargetRef,
    suppressUnsavedNavGuardRef,
    flushSessionEditorToWorkspaceRef,
    applySessionFileToEditorRef,
    handleRequestSessionSaveChooserRef,
    connectedHaimStorageTypeRef,
    hasUnsavedEditorChangesRef,
    closeCurrentFileRef,
    maybeAutoSaveOnFocusChangeRef,
    requestEncMdPasswordRef,
  } = useFileSessionOwned();

  const {
    setSuffixConfirmAction,
    setShowSuffixChangeConfirmModal,
    pendingCoverSaveRef,
    setShowCoverChangeConfirmModal,
    setPendingCloseTabId,
    setShowCloseFileConfirmModal,
  } = useModalsOwned();

  const { setOperationStatus, expandPathsRef } = useChromeOwned();

  const {
    setState: setWorkspaceTabs,
    workspaceTabsRef,
    workspaceTabsEnabledRef,
    activateWorkspaceTab,
    closeWorkspaceTabById,
  } = useWorkspaceTabsCtx();

  const editedFileNameRef = useRef(editedFileName);
  editedFileNameRef.current = editedFileName;
  const openFileRequestSeqByKeyRef = useRef<Map<string, number>>(new Map());
  const resolveSavingTabIdsRef = () => savingTabIdsRef;

  const hasSuffixChange = () => {
    if (!currentFile?.name) return false;
    const trimmed = (editedFileName ?? '').trim();
    return trimmed !== currentFile.name && getExt(trimmed) !== getExt(currentFile.name);
  };

  const unlockEncMdOrPrompt = useCallback(
    async (path: string, ciphertext: string): Promise<string | null> => {
      const first = await tryUnlockEncMdContent(path, ciphertext);
      if (first.status !== 'need-password') return first.text;

      return new Promise<string | null>((resolve) => {
        const run = (password: string) => {
          void (async () => {
            try {
              const plain = await decryptEncMdContent(ciphertext, password);
              setEncMdPassword(path, password);
              setEncMdPrompt(null);
              resolve(plain);
            } catch {
              setEncMdPrompt((prev: any) =>
                prev
                  ? {
                      ...prev,
                      error:
                        '비밀번호가 올바르지 않거나 파일을 열 수 없습니다.',
                    }
                  : null,
              );
            }
          })();
        };
        setEncMdPrompt({
          title: '암호화된 노트 잠금 해제',
          message: '이 노트를 열 때 사용한 비밀번호를 입력하세요.',
          confirmLabel: '잠금 해제',
          error: '',
          resolve: run,
          reject: () => {
            setEncMdPrompt(null);
            resolve(null);
          },
        });
      });
    },
    [setEncMdPrompt],
  );

  const commitOpenFile = useCallback((file: any, content = '', options: CommitOpenFileOptions = {}) => {
    if (!file?.type || !file?.id) return false;
    const activate = options.activate !== false;
    const tabId = `${file.type}:${file.id}`;
    const flushed = flushEditorIntoActiveFileTab(workspaceTabsRef.current, {
      editorContent: editorContentRef.current ?? '',
      currentFile: currentFileRef.current,
      editedFileName: editedFileNameRef.current ?? '',
    });
    const existing = findFileTab(flushed, file.type, file.id);
    // Background finish after close: do not reopen the tab.
    if (!existing && !activate) return false;
    let next = applyOpenedFileReducer(flushed, file, content, {
      promptCloseDirty: softCapPrompt,
      activate,
    });
    if (next === flushed && !findFileTab(flushed, file.type, file.id)) {
      return false;
    }
    if (options.baselineContent != null && typeof options.baselineContent === 'string') {
      next = patchFileTab(next, tabId, {
        baselineContent: options.baselineContent,
        currentFile: { ...file, content: options.baselineContent },
        editorContent: content,
      });
    }
    // Legacy mode: one file slot only (drop other file tabs + chat tab).
    if (!workspaceTabsEnabledRef.current) {
      next = retainOnlyFileTab(next, tabId);
    }
    workspaceTabsRef.current = next;
    setWorkspaceTabs(next);
    // Only sync editor mirrors when this tab is (or became) active.
    if (next.activeId === tabId) {
      setCurrentFile(file);
      currentFileRef.current = file;
      setEditorContent(content);
      editorContentRef.current = content;
      setEditedFileName(file.name || '');
      editedFileNameRef.current = file.name || '';
    }
    return true;
  }, []);

  const selectFileRaw = useCallback(async (type: any, node: any, options: SelectFileOptions = {}) => {
    if (node.type === 'folder') return;
    const requestKey = `${type}:${node.path}`;
    const prevAttempt = openFileRequestSeqByKeyRef.current.get(requestKey) || 0;
    const attemptId = prevAttempt + 1;
    openFileRequestSeqByKeyRef.current.set(requestKey, attemptId);
    const isCurrentAttempt = () =>
      openFileRequestSeqByKeyRef.current.get(requestKey) === attemptId;
    const skipNavigate = options.skipNavigate === true;
    const goToViewPath = () => {
      if (!skipNavigate) navigate(`/view/${node.path}`);
    };

    // Already-open file: activate that tab first, then sync from server/disk.
    const existingBefore = findFileTab(workspaceTabsRef.current, type, node.path);
    let didNavigateEarly = false;

    if (existingBefore) {
      const activeBefore = getActiveFileTab(workspaceTabsRef.current);
      const shouldActivate = activeBefore ? activeBefore.id !== existingBefore.id : true;
      if (shouldActivate) {
        activateWorkspaceTab(existingBefore.id, { navigateUrl: !skipNavigate });
        if (!skipNavigate) didNavigateEarly = true;
      }
    }

    const commit = (file: any, content = '', commitOpts: CommitOpenFileOptions = {}) => {
      if (!isCurrentAttempt()) {
        if (typeof file?.objectUrl === 'string' && file.objectUrl) {
          try {
            URL.revokeObjectURL(file.objectUrl);
          } catch {
            /* ignore */
          }
        }
        return false;
      }
      const tabId = `${type}:${node.path}`;
      const wasActive = workspaceTabsRef.current.activeId === tabId;
      // Never steal focus when fetch finishes — activate only via markAsLoading / existing activate.
      const ok = commitOpenFile(file, content, { ...commitOpts, activate: false });
      if (!ok) {
        if (typeof file?.objectUrl === 'string' && file.objectUrl) {
          try {
            URL.revokeObjectURL(file.objectUrl);
          } catch {
            /* ignore */
          }
        }
        return false;
      }
      if (!wasActive) {
        const label = String(node.name || file?.name || node.path || '파일');
        showToast({ message: `「${label}」 로딩 완료`, durationMs: 2200 });
      }
      return true;
    };

    const markAsLoading = () => {
      if (!isCurrentAttempt()) return false;

      if (existingBefore) {
        const live = findFileTab(workspaceTabsRef.current, type, node.path);
        if (!live) return true;

        const next = patchFileTab(workspaceTabsRef.current, live.id, {
          currentFile: { ...live.currentFile, viewer: 'loading' },
        });
        workspaceTabsRef.current = next;
        setWorkspaceTabs(next);

        const active = getActiveFileTab(next);
        if (active && active.id === live.id) {
          setCurrentFile(active.currentFile);
          currentFileRef.current = active.currentFile;
          setEditorContent(active.editorContent);
          editorContentRef.current = active.editorContent;
          setEditedFileName(active.editedFileName || String(active.currentFile?.name || ''));
          editedFileNameRef.current = active.editedFileName || String(active.currentFile?.name || '');
        }
        return true;
      }

      const placeholder = {
        type,
        id: node.path,
        name: node.name,
        viewer: 'loading',
      };

      const ok = commitOpenFile(placeholder, '', { activate: true });
      if (ok && !skipNavigate && !didNavigateEarly) {
        goToViewPath();
        didNavigateEarly = true;
      }
      return ok;
    };

    try {
      if (type === 'webdav') {
      if (!webdavReady) return;
      try {
        const ok = markAsLoading();
        if (!ok) return;

        const backend = createWebdavBackend(webdavConfig);
        const opened = await openPathFileFromBackend({ backend, type: 'webdav', node });
        if (!opened) return;
        let { currentFile: openedFile, editorContent: content } = opened;
        if (opened.needsEncMdPassword) {
          const plain = await unlockEncMdOrPrompt(node.path, opened.encMdCiphertext ?? '');
          if (plain == null) return;
          content = plain;
          openedFile = { ...openedFile, content: plain, encMd: true } as any;
        }
        // Do not revokePrev(other tab) — only this tab's media is replaced via commitOpenFile.
        commit(openedFile, content);
      } catch (err) {
        console.error('WebDAV Read Error:', err);
      }
      return;
      }

    const ext = (node.name.split('.').pop() || '').toLowerCase();

    if (type === 's3') {
      const client = getS3Client();
      if (!client) return;

      const ok = markAsLoading();
      if (!ok) return;

      const imageExts = ['png', 'jpg', 'jpeg', 'gif', 'webp'];

      if (imageExts.includes(ext)) {
        try {
          const { body, ContentLength } = await getObjectBody(client, s3Creds.bucket, node.path);
          const mime = `image/${ext === 'jpg' ? 'jpeg' : ext}`;
          const blob = new Blob([body as any], { type: mime });
          const url = URL.createObjectURL(blob);
          commit({
            type: 's3',
            id: node.path,
            name: node.name,
            viewer: 'image',
            objectUrl: url,
            size: typeof ContentLength === 'number' ? ContentLength : null,
            lastModified: node.lastModified,
          }, '');
        } catch (err) {
          console.error('S3 Read Error:', err);
        }
        return;
      }

      if (ext === 'pdf') {
        try {
          const { body, ContentLength } = await getObjectBody(client, s3Creds.bucket, node.path);
          const blob = new Blob([body as any], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          commit({
            type: 's3',
            id: node.path,
            name: node.name,
            viewer: 'pdf',
            objectUrl: url,
            size: typeof ContentLength === 'number' ? ContentLength : null,
            lastModified: node.lastModified,
          }, '');
        } catch (err) {
          console.error('S3 Read Error:', err);
        }
        return;
      }

      if (ext === 'md' || ext === 'markdown' || ext === '') {
        try {
          const { body, ContentLength, LastModified } = await getObjectBody(client, s3Creds.bucket, node.path);
          const serverText = new TextDecoder('utf-8').decode(body);
          const serverLastModified = LastModified ?? node.lastModified;
          const serverLastModTs =
            serverLastModified instanceof Date
              ? serverLastModified.getTime()
              : serverLastModified
                ? new Date(serverLastModified).getTime()
                : 0;

          const draftKey = getDraftKey('s3', node.path);
          if (isEncMdPath(node.path)) {
            await deleteMemoDraft(draftKey);
          }
          const draft = isEncMdPath(node.path)
            ? null
            : await getMemoDraft(draftKey);
          const existingTab = findFileTab(workspaceTabsRef.current, 's3', node.path);
          const resolved = await resolveOpenTextContent({
            serverText,
            serverLastModTs,
            existingTab,
            draft,
            confirmMessage: '서버에 더 최신 버전이 있습니다. 기존 내용을 버리고 서버 버전으로 교체할까요?',
            deleteDraft: () => deleteMemoDraft(draftKey),
          });

          let contentToUse = resolved.contentToUse;
          let baselineContent = resolved.baselineContent;
          if (isEncMdPath(node.path)) {
            const plain = await unlockEncMdOrPrompt(node.path, serverText);
            if (plain == null) return;
            contentToUse = plain;
            baselineContent = plain;
          }

          commit({
            type: 's3',
            id: node.path,
            name: node.name,
            content: baselineContent,
            viewer: 'markdown',
            size: typeof ContentLength === 'number' ? ContentLength : null,
            lastModified: serverLastModified ?? node.lastModified,
            ...(isEncMdPath(node.path) ? { encMd: true } : {}),
          }, contentToUse, { baselineContent });
        } catch (err) {
          console.error('S3 Read Error:', err);
        }
        return;
      }

      if (ext === 'json') {
        try {
          const { body, ContentLength } = await getObjectBody(client, s3Creds.bucket, node.path);
          const raw = new TextDecoder('utf-8').decode(body);
          const maxFormatLen = 100000;
          let display = raw;
          if (raw.length <= maxFormatLen) {
            try {
              const parsed = JSON.parse(raw);
              display = JSON.stringify(parsed, null, 2);
            } catch {
              display = raw;
            }
          }
          commit({
            type: 's3',
            id: node.path,
            name: node.name,
            content: display,
            viewer: 'json',
            size: typeof ContentLength === 'number' ? ContentLength : null,
            lastModified: node.lastModified,
          }, display);
        } catch (err) {
          console.error('S3 Read Error:', err);
        }
        return;
      }

      if (ext === 'html' || ext === 'htm' || ext === 'svg') {
        try {
          const { body, ContentLength } = await getObjectBody(client, s3Creds.bucket, node.path);
          const text = new TextDecoder('utf-8').decode(body);
          const viewer = ext === 'svg' ? 'svg' : 'html';
          commit({
            type: 's3',
            id: node.path,
            name: node.name,
            content: text,
            viewer,
            size: typeof ContentLength === 'number' ? ContentLength : null,
            lastModified: node.lastModified,
          }, text);
        } catch (err) {
          console.error('S3 Read Error:', err);
        }
        return;
      }

      const audioExts = ['m4a', 'mp3', 'wav', 'ogg', 'aac', 'flac', 'weba'];
      const videoExts = ['mp4', 'webm', 'ogv', 'mov'];
      const isAudio = audioExts.includes(ext);
      const isVideo = videoExts.includes(ext);

      if (isAudio) {
        try {
          const { body, ContentLength } = await getObjectBody(client, s3Creds.bucket, node.path);
          const mime = ext === 'm4a' || ext === 'mp4' ? 'audio/mp4' : ext === 'mp3' ? 'audio/mpeg' : ext === 'ogg' || ext === 'ogv' ? 'audio/ogg' : ext === 'weba' ? 'audio/webm' : `audio/${ext}`;
          const blob = new Blob([body as any], { type: mime });
          const url = URL.createObjectURL(blob);
          commit({
            type: 's3',
            id: node.path,
            name: node.name,
            viewer: 'audio',
            objectUrl: url,
            size: typeof ContentLength === 'number' ? ContentLength : null,
            lastModified: node.lastModified,
          }, '');
        } catch (err) {
          console.error('S3 Read Error:', err);
        }
        return;
      }

      if (isVideo) {
        try {
          const { body, ContentLength } = await getObjectBody(client, s3Creds.bucket, node.path);
          const mime = ext === 'mp4' || ext === 'mov' ? 'video/mp4' : ext === 'webm' ? 'video/webm' : 'video/ogg';
          const blob = new Blob([body as any], { type: mime });
          const url = URL.createObjectURL(blob);
          commit({
            type: 's3',
            id: node.path,
            name: node.name,
            viewer: 'video',
            objectUrl: url,
            size: typeof ContentLength === 'number' ? ContentLength : null,
            lastModified: node.lastModified,
          }, '');
        } catch (err) {
          console.error('S3 Read Error:', err);
        }
        return;
      }

      commit({
        type: 's3',
        id: node.path,
        name: node.name,
        viewer: 'unsupported',
        size: null,
        lastModified: node.lastModified,
      }, '');
    } else if (type === 'local') {
      const ok = markAsLoading();
      if (!ok) return;

      // Desktop (Tauri) vault: no FileSystemAccess handles — use path backend.
      if ((localVaultFsPath || isDesktopApp()) && !node.handle) {
        const backend = getBackendForType('local');
        if (!backend?.isReady?.()) {
          alert('로컬 폴더를 먼저 열어주세요.');
          return;
        }
        const opened = await openPathFileFromBackend({ backend, type: 'local', node });
        if (!opened) return;
        let { currentFile: openedFile, editorContent: content } = opened;
        if (opened.needsEncMdPassword) {
          const plain = await unlockEncMdOrPrompt(node.path, opened.encMdCiphertext ?? '');
          if (plain == null) return;
          content = plain;
          openedFile = { ...openedFile, content: plain, encMd: true } as any;
        }
        commit(openedFile, content || '');
        return;
      }

      const file = await node.handle.getFile();
      const serverLastModTs = file.lastModified ?? 0;

      const imageExts = ['png', 'jpg', 'jpeg', 'gif', 'webp'];
      const audioExts = ['m4a', 'mp3', 'wav', 'ogg', 'aac', 'flac', 'weba'];
      const videoExts = ['mp4', 'webm', 'ogv', 'mov'];

      const openLocalBlobViewer = (viewer: any, mime: string) => {
        const blob = new Blob([file], { type: mime || file.type || undefined });
        const url = URL.createObjectURL(blob);
        commit({
          type: 'local',
          id: node.path,
          name: node.name,
          viewer,
          objectUrl: url,
          handle: node.handle,
          parentHandle: node.parentHandle,
          size: typeof file.size === 'number' ? file.size : null,
          lastModified: file.lastModified,
        }, '');
      };

      if (imageExts.includes(ext)) {
        const mime = `image/${ext === 'jpg' ? 'jpeg' : ext}`;
        openLocalBlobViewer('image', mime);
        return;
      }

      if (ext === 'pdf') {
        openLocalBlobViewer('pdf', 'application/pdf');
        return;
      }

      if (audioExts.includes(ext)) {
        const mime = ext === 'm4a' || ext === 'mp4' ? 'audio/mp4' : ext === 'mp3' ? 'audio/mpeg' : ext === 'ogg' ? 'audio/ogg' : ext === 'weba' ? 'audio/webm' : `audio/${ext}`;
        openLocalBlobViewer('audio', mime);
        return;
      }

      if (videoExts.includes(ext)) {
        const mime = ext === 'mp4' || ext === 'mov' ? 'video/mp4' : ext === 'webm' ? 'video/webm' : 'video/ogg';
        openLocalBlobViewer('video', mime);
        return;
      }

      if (ext === 'json') {
        const raw = await file.text();
        const maxFormatLen = 100000;
        let display = raw;
        if (raw.length <= maxFormatLen) {
          try {
            display = JSON.stringify(JSON.parse(raw), null, 2);
          } catch {
            display = raw;
          }
        }
        commit({
          type: 'local',
          id: node.path,
          name: node.name,
          content: display,
          handle: node.handle,
          parentHandle: node.parentHandle,
          viewer: 'json',
          size: typeof file.size === 'number' ? file.size : null,
          lastModified: file.lastModified,
        }, display);
        return;
      }

      if (ext === 'html' || ext === 'htm' || ext === 'svg') {
        const text = await file.text();
        const viewer = ext === 'svg' ? 'svg' : 'html';
        commit({
          type: 'local',
          id: node.path,
          name: node.name,
          content: text,
          handle: node.handle,
          parentHandle: node.parentHandle,
          viewer,
          size: typeof file.size === 'number' ? file.size : null,
          lastModified: file.lastModified,
        }, text);
        return;
      }

      if (ext !== 'md' && ext !== 'markdown' && ext !== '') {
        commit({
          type: 'local',
          id: node.path,
          name: node.name,
          handle: node.handle,
          parentHandle: node.parentHandle,
          viewer: 'unsupported',
          size: typeof file.size === 'number' ? file.size : null,
          lastModified: file.lastModified,
        }, '');
        return;
      }

      const serverText = await file.text();
      const draftKey = getDraftKey('local', node.path);
      if (isEncMdPath(node.path)) {
        await deleteMemoDraft(draftKey);
      }
      const draft = isEncMdPath(node.path)
        ? null
        : await getMemoDraft(draftKey);
      const existingTab = findFileTab(workspaceTabsRef.current, 'local', node.path);
      const resolved = await resolveOpenTextContent({
        serverText,
        serverLastModTs,
        existingTab,
        draft,
        confirmMessage: '더 최신 버전이 있습니다. 기존 내용을 버리고 최신 버전으로 교체할까요?',
        deleteDraft: () => deleteMemoDraft(draftKey),
      });

      let contentToUse = resolved.contentToUse;
      let baselineContent = resolved.baselineContent;
      if (isEncMdPath(node.path)) {
        const plain = await unlockEncMdOrPrompt(node.path, serverText);
        if (plain == null) return;
        contentToUse = plain;
        baselineContent = plain;
      }

      commit({
        type: 'local',
        id: node.path,
        name: node.name,
        content: baselineContent,
        handle: node.handle,
        parentHandle: node.parentHandle,
        viewer: 'markdown',
        size: typeof file.size === 'number' ? file.size : null,
        lastModified: file.lastModified,
        ...(isEncMdPath(node.path) ? { encMd: true } : {}),
      }, contentToUse, { baselineContent });
    } else if (type === SESSION_STORAGE_TYPE) {
      flushSessionEditorToWorkspaceRef.current?.();
      const workspace = sessionWorkspaceRef.current;
      if (!workspace) return;
      applySessionFileToEditorRef.current?.(node.path, workspace, { skipNavigate });
    }
    } finally {
      try {
        if (isCurrentAttempt()) {
          const live = findFileTab(workspaceTabsRef.current, type, node.path);
          if (live && live.currentFile?.viewer === 'loading') {
            commitOpenFile(
              {
                type,
                id: node.path,
                name: node.name,
                viewer: 'unsupported',
                lastModified: node.lastModified,
              },
              '',
              { activate: false },
            );
          }
        }
      } catch (e) {
        console.error('Failed to settle loading viewer:', e);
      }
    }
  }, [
    navigate,
    webdavReady,
    webdavConfig,
    getS3Client,
    s3Creds.bucket,
    commitOpenFile,
    activateWorkspaceTab,
    showToast,
    localVaultFsPath,
    getBackendForType,
    unlockEncMdOrPrompt,
    workspaceTabsRef,
    setWorkspaceTabs,
    setCurrentFile,
    currentFileRef,
    setEditorContent,
    editorContentRef,
    setEditedFileName,
    editedFileNameRef,
  ]);

  const saveCurrentMarkdownBeforeSwitch = useCallback(
    (storageType: any, node: any) => {
      const cur = currentFileRef.current;
      if (!cur?.id) return;
      if (cur.type === storageType && cur.id === node.path) return;

      const viewer = cur.viewer || 'markdown';
      if (!['markdown', 'json', 'raw', 'html', 'svg'].includes(viewer)) return;

      if (cur.type === SESSION_STORAGE_TYPE) {
        flushSessionEditorToWorkspaceRef.current?.();
        return;
      }

      // Flush mirrors so tab baseline/dirty match the editor.
      const flushed = flushEditorIntoActiveFileTab(workspaceTabsRef.current, {
        editorContent: editorContentRef.current ?? '',
        currentFile: currentFileRef.current,
        editedFileName: editedFileNameRef.current ?? '',
      });
      workspaceTabsRef.current = flushed;
      setWorkspaceTabs(flushed);

      const leaving = getActiveFileTab(flushed);
      if (!leaving || !isFileTabDirty(leaving)) return;

      // Fire-and-forget when onFocusChange: navigate continues immediately.
      maybeAutoSaveOnFocusChangeRef.current?.(leaving.currentFile, leaving.editorContent);
    },
    [workspaceTabsRef, setWorkspaceTabs, editorContentRef, currentFileRef, editedFileNameRef],
  );

  const handleRequestCloseEditor = () => {
    const active = getActiveTab(workspaceTabsRef.current);
    if (active) {
      closeWorkspaceTabById(active.id);
      return;
    }
    if (hasUnsavedEditorChangesRef.current?.()) {
      setPendingCloseTabId(null);
      setShowCloseFileConfirmModal(true);
    } else {
      closeCurrentFileRef.current?.();
    }
  };

  const openAdvancedSearchFile = useCallback(
    async (path: string) => {
      if (!path) return;
      const type = storageMode;
      const slash = path.lastIndexOf('/');
      const parentPath = slash >= 0 ? path.slice(0, slash + 1) : '';
      const parentPaths = getParentPathsToExpand(parentPath);
      if (parentPaths.length) {
        expandPathsRef.current?.(type, parentPaths);
      }
      let node = null;
      if (type === STORAGE_MODE_LOCAL) {
        node =
          findFileNodeByPath(localTree, path) ||
          findNodeByPath(localTree, path) ||
          (localRootHandle
            ? await resolveLocalFileNode(localRootHandle, path)
            : null);
      } else if (type === STORAGE_MODE_WEBDAV) {
        node =
          findFileNodeByPath(webdavTree, path) || findNodeByPath(webdavTree, path);
      } else if (type === STORAGE_MODE_S3) {
        node = findFileNodeByPath(s3Tree, path) || findNodeByPath(s3Tree, path);
      }
      if ((node as any)?.type === 'file') {
        selectFileRef.current?.(type, node);
      } else {
        navigate(`/view/${path}`);
      }
    },
    [
      storageMode,
      localTree,
      webdavTree,
      s3Tree,
      localRootHandle,
      navigate,
    ],
  );

  const saveFile = useCallback(async (fileOverride: any = null, options: SaveFileOptions = {}) => {
    const {
      skipSuffixCheck = false,
      skipCoverChangeCheck = false,
      lastInputAt: inputModifiedAt,
      contentOverride,
      background = false,
    } = options;
    const fileToSave = fileOverride ?? currentFile;
    if (!fileToSave) return;
    if (!skipSuffixCheck && !fileOverride && hasSuffixChange()) {
      setSuffixConfirmAction('renameAndSave');
      setShowSuffixChangeConfirmModal(true);
      return;
    }
    const viewer = fileToSave.viewer || 'markdown';
    const editableViewers = ['markdown', 'json', 'raw', 'html', 'svg'];
    if (!editableViewers.includes(viewer)) return;

    const textToSave =
      contentOverride != null ? String(contentOverride) : editorContentRef.current;

    if (
      !skipCoverChangeCheck
      && viewer === 'markdown'
      && noteCoverCommentChanged(
        String(fileToSave.content ?? ''),
        String(textToSave ?? ''),
      )
    ) {
      pendingCoverSaveRef.current = { fileOverride, options };
      setShowCoverChangeConfirmModal(true);
      return;
    }

    if (fileToSave.type === SESSION_STORAGE_TYPE) {
      const binding = sessionVaultBindingsRef.current?.[fileToSave.id];
      const bindingOk =
        Boolean(binding?.destPath) && binding.storageType === connectedHaimStorageTypeRef.current?.();
      if (!bindingOk) {
        if (fileOverride || background) return;
        handleRequestSessionSaveChooserRef.current?.();
        return;
      }
    }

    const touchesActiveEditor =
      !background &&
      currentFileRef.current?.id === fileToSave.id &&
      currentFileRef.current?.type === fileToSave.type;
    if (touchesActiveEditor) setIsSaving(true);

    const tabId =
      fileToSave.type && fileToSave.id ? `${fileToSave.type}:${fileToSave.id}` : null;
    const savingIdsRef = resolveSavingTabIdsRef();
    const manageSavingBadge = tabId != null && !savingIdsRef.current.has(tabId);
    if (tabId && manageSavingBadge) {
      savingIdsRef.current.add(tabId);
      setSavingTabIds([...savingIdsRef.current]);
    }

    const indicatorId = addIndicator({
      id: background ? `note-save-bg:${fileToSave.type}:${fileToSave.id}` : 'note-save',
      type: ActivityTypes.NOTE_PROCESSING,
      label: '필기 저장 중',
      detail: fileToSave.name,
    });
    const contentTypeForViewer =
      viewer === 'json'
        ? 'application/json'
        : viewer === 'raw'
          ? 'text/plain'
          : viewer === 'html'
            ? 'text/html'
            : viewer === 'svg'
              ? 'image/svg+xml'
              : 'text/markdown';

    let vaultBody = textToSave;
    if (isEncMdPath(fileToSave.id) || isEncMdPath(fileToSave.name)) {
      try {
        let pw = getEncMdPassword(fileToSave.id);
        if (!pw) {
          const req = requestEncMdPasswordRef.current;
          if (!req) throw new Error('cancelled');
          pw = await req({
            title: '암호화된 노트 저장',
            message: '저장하려면 비밀번호를 입력하세요.',
            confirmLabel: '암호화 저장',
          });
        }
        vaultBody = await prepareEncMdVaultBody(fileToSave.id, textToSave, pw);
      } catch (e: unknown) {
        removeIndicator(indicatorId);
        if (touchesActiveEditor) setIsSaving(false);
        if (tabId && manageSavingBadge) {
          savingIdsRef.current.delete(tabId);
          setSavingTabIds([...savingIdsRef.current]);
        }
        const err = e as { message?: string };
        if (err.message !== 'cancelled') {
          alert(err.message || '암호화 저장 실패');
        }
        return;
      }
    }

    const applySavedContentToTab = (extraFileFields: Record<string, any> = {}) => {
      const existing = findFileTab(workspaceTabsRef.current, fileToSave.type, fileToSave.id);
      if (!existing) return;
      const savedTabId = `${fileToSave.type}:${fileToSave.id}`;
      const patch: Record<string, any> = {
        currentFile: {
          ...existing.currentFile,
          content: textToSave,
          ...extraFileFields,
        },
        baselineContent: textToSave,
      };
      // Keep newer in-tab edits if the user typed while this save was in flight.
      if (existing.editorContent === textToSave) {
        patch.editorContent = textToSave;
      }
      const patched = patchFileTab(workspaceTabsRef.current, savedTabId, patch);
      workspaceTabsRef.current = patched;
      setWorkspaceTabs(patched);
    };

    try {
      if (fileToSave.type === 's3') {
        const client = getS3Client();
        if (!client) throw new Error('S3 클라이언트를 초기화하지 못했습니다.');
        await putObject(client, {
          Bucket: s3Creds.bucket,
          Key: fileToSave.id,
          Body: vaultBody,
          ContentType: contentTypeForViewer,
        });
        await deleteMemoDraft(getDraftKey('s3', fileToSave.id));
        loadS3Files();
        const savedByteLength = new TextEncoder().encode(vaultBody).length;
        setCurrentFile((prev: any) => {
          if (prev?.id !== fileToSave.id || prev?.type !== fileToSave.type) return prev;
          const next = { ...prev, content: textToSave, size: savedByteLength };
          currentFileRef.current = next;
          return next;
        });
        applySavedContentToTab({ size: savedByteLength });
        notifyAdvancedSearchChange({
          type: 'file',
          path: fileToSave.id,
          content: isEncMdPath(fileToSave.id) ? '' : textToSave,
        });
      } else if (fileToSave.type === 'local') {
        if (localVaultFsPath && !fileToSave.handle) {
          const backend = getBackendForType('local');
          if (!backend?.isReady?.()) {
            throw new Error('로컬 폴더를 먼저 열어주세요.');
          }
          await backend.writeText(fileToSave.id, vaultBody, contentTypeForViewer);
          await deleteMemoDraft(getDraftKey('local', fileToSave.id));
          await refreshLocalTree();
          const savedByteLength = new TextEncoder().encode(vaultBody).length;
          setCurrentFile((prev: any) => {
            if (prev?.id !== fileToSave.id || prev?.type !== fileToSave.type) return prev;
            const next = { ...prev, content: textToSave, size: savedByteLength };
            currentFileRef.current = next;
            return next;
          });
          applySavedContentToTab({ size: savedByteLength });
          notifyAdvancedSearchChange({
            type: 'file',
            path: fileToSave.id,
            content: isEncMdPath(fileToSave.id) ? '' : textToSave,
          });
        } else {
          const writable = await fileToSave.handle.createWritable();
          await writable.write(vaultBody);
          await writable.close();
          await deleteMemoDraft(getDraftKey('local', fileToSave.id));
          const file = await fileToSave.handle.getFile();
          setCurrentFile((prev: any) => {
            if (prev?.id !== fileToSave.id || prev?.type !== fileToSave.type) return prev;
            const next = {
              ...prev,
              content: textToSave,
              size: typeof file.size === 'number' ? file.size : prev?.size ?? null,
              lastModified: file.lastModified,
            };
            currentFileRef.current = next;
            return next;
          });
          applySavedContentToTab({
            ...(typeof file.size === 'number' ? { size: file.size } : {}),
            lastModified: file.lastModified,
          });
          notifyAdvancedSearchChange({
            type: 'file',
            path: fileToSave.id,
            content: isEncMdPath(fileToSave.id) ? '' : textToSave,
          });
        }
      } else if (fileToSave.type === SESSION_STORAGE_TYPE) {
        const binding = sessionVaultBindingsRef.current?.[fileToSave.id];
        if (!binding?.destPath) {
          throw new Error('저장 위치를 찾지 못했습니다.');
        }
        await writeSessionFileToHaimRef.current?.({
          destPath: binding.destPath,
          sessionFile: fileToSave,
          content: vaultBody,
        });
      } else if (fileToSave.type === 'webdav') {
        const backend = createWebdavBackend(webdavConfig);
        await backend.writeText(fileToSave.id, vaultBody, contentTypeForViewer);
        await deleteMemoDraft(getDraftKey('webdav', fileToSave.id));
        await refreshWebdavTree();
        const savedByteLength = new TextEncoder().encode(vaultBody).length;
        setCurrentFile((prev: any) => {
          if (prev?.id !== fileToSave.id || prev?.type !== fileToSave.type) return prev;
          const next = { ...prev, content: textToSave, size: savedByteLength };
          currentFileRef.current = next;
          return next;
        });
        applySavedContentToTab({ size: savedByteLength });
        notifyAdvancedSearchChange({
          type: 'file',
          path: fileToSave.id,
          content: isEncMdPath(fileToSave.id) ? '' : textToSave,
        });
      }
    } catch (e: unknown) {
      const err = e as { message?: string };
      const encNote =
        isEncMdPath(fileToSave.id) || isEncMdPath(fileToSave.name);
      // Never park plaintext (or password) in IndexedDB for encrypted notes.
      if (encNote) {
        alert('저장 실패: ' + (err.message || String(e)));
      } else if (fileToSave.type === 's3' && isAbortOrNetworkError(e)) {
        try {
          await savePendingUpload({
            key: fileToSave.id,
            content: textToSave,
            modifiedAt: inputModifiedAt ?? Date.now(),
            contentType: contentTypeForViewer,
          });
          alert('업로드가 중단되었습니다. 연결이 복구되면 다시 로그인하면 자동으로 동기화됩니다.');
        } catch (dbErr) {
          console.error('저장 실패 및 IndexedDB 임시 저장 실패:', dbErr);
          alert('저장 실패: ' + (err.message || String(e)));
        }
      } else if (fileToSave.type === 'webdav' && isAbortOrNetworkError(e)) {
        try {
          await saveMemoDraft({
            key: getDraftKey('webdav', fileToSave.id),
            content: textToSave,
            originalLastModified: Date.now(),
          });
          alert('저장에 실패했습니다. 임시 초안이 로컬에 보관되었습니다.');
        } catch (dbErr) {
          console.error('WebDAV save failed and draft save failed:', dbErr);
          alert('저장 실패: ' + (err.message || String(e)));
        }
      } else if (fileToSave.type === 'local') {
        try {
          await saveMemoDraft({
            key: getDraftKey('local', fileToSave.id),
            content: textToSave,
            originalLastModified: Date.now(),
          });
          alert('저장에 실패했습니다. 임시 초안이 로컬에 보관되었습니다.');
        } catch (dbErr) {
          console.error('Local save failed and draft save failed:', dbErr);
          alert('저장 실패: ' + (err.message || String(e)));
        }
      } else {
        alert('저장 실패: ' + (err.message || String(e)));
      }
    } finally {
      removeIndicator(indicatorId);
      if (touchesActiveEditor) setIsSaving(false);
      if (tabId && manageSavingBadge) {
        savingIdsRef.current.delete(tabId);
        setSavingTabIds([...savingIdsRef.current]);
      }
    }
  }, [
    currentFile,
    getS3Client,
    s3Creds.bucket,
    loadS3Files,
    webdavConfig,
    refreshWebdavTree,
    refreshLocalTree,
    getBackendForType,
    localVaultFsPath,
    addIndicator,
    removeIndicator,
    workspaceTabsRef,
    setWorkspaceTabs,
    setCurrentFile,
    currentFileRef,
    editorContentRef,
    setIsSaving,
    setSavingTabIds,
  ]);

  const refreshLocalFileFromDisk = useCallback(async () => {
    const fileToRefresh = currentFileRef.current;
    if (!fileToRefresh || fileToRefresh.type !== 'local' || !fileToRefresh.handle) return;
    const viewer = fileToRefresh.viewer || 'markdown';
    const editableViewers = ['markdown', 'json', 'raw', 'html', 'svg'];
    if (!editableViewers.includes(viewer)) return;

    setIsRefreshingFromDisk(true);
    const indicatorId = addIndicator({
      id: 'note-refresh-local',
      type: ActivityTypes.NOTE_PROCESSING,
      label: '디스크에서 새로고침 중',
      detail: fileToRefresh.name,
    });
    try {
      const diskFile = await fileToRefresh.handle.getFile();
      let diskText = await diskFile.text();
      if (viewer === 'json' && diskText.length <= 100000) {
        try {
          diskText = JSON.stringify(JSON.parse(diskText), null, 2);
        } catch {
          // keep raw json text
        }
      }

      const base = typeof fileToRefresh.content === 'string' ? fileToRefresh.content : '';
      const ours = editorContentRef.current ?? '';
      const merge = rebaseMergeTexts(base, ours, diskText);

      let nextEditorText = diskText;
      let backupName = null;
      if (merge.status === 'conflict') {
        if (!localRootHandle) throw new Error('로컬 폴더가 열려 있지 않습니다.');
        const backend = createLocalBackend(localRootHandle);
        const fileId = String(fileToRefresh.id || '');
        const lastSlash = fileId.lastIndexOf('/');
        const dirPrefix = lastSlash >= 0 ? fileId.slice(0, lastSlash + 1) : '';
        const now = new Date();
        let disambiguator = 1;
        let candidate = buildTimestampedCopyName(fileToRefresh.name || 'note', now, disambiguator);
        while (await backend.head(`${dirPrefix}${candidate}`)) {
          disambiguator += 1;
          candidate = buildTimestampedCopyName(fileToRefresh.name || 'note', now, disambiguator);
        }
        await backend.writeText(`${dirPrefix}${candidate}`, ours);
        backupName = candidate;
        await refreshLocalTree();
      } else {
        nextEditorText = merge.text;
      }

      setCurrentFile((prev: any) => {
        if (prev?.id !== fileToRefresh.id) return prev;
        const next = {
          ...prev,
          content: diskText,
          size: typeof diskFile.size === 'number' ? diskFile.size : prev?.size ?? null,
          lastModified: diskFile.lastModified,
        };
        currentFileRef.current = next;
        return next;
      });
      setEditorContent(nextEditorText);
      editorContentRef.current = nextEditorText;
      await deleteMemoDraft(getDraftKey('local', fileToRefresh.id));

      if (backupName) {
        setOperationStatus(`충돌: 현재 문서를 ${backupName}으로 저장하고 디스크 내용으로 교체했습니다`);
        showAlert({
          title: '새로고침 충돌',
          message:
            '디스크 내용과 현재 문서가 충돌하여, 현재 문서를 새 파일로 저장한 뒤 디스크 내용으로 교체했습니다.',
          detail: backupName,
        });
      } else if (nextEditorText === diskText && ours === diskText) {
        setOperationStatus('디스크 내용과 동일합니다');
      } else if (nextEditorText === diskText) {
        setOperationStatus('디스크 내용으로 새로고침했습니다');
      } else {
        setOperationStatus('디스크 변경 위에 로컬 수정을 적용했습니다. 저장하면 반영됩니다.');
      }
    } catch (e: unknown) {
      console.error('Local refresh failed:', e);
      const err = e as { message?: string };
      showAlert({
        title: '새로고침 실패',
        message: err.message || String(e),
      });
    } finally {
      removeIndicator(indicatorId);
      setIsRefreshingFromDisk(false);
    }
  }, [
    addIndicator,
    removeIndicator,
    showAlert,
    localRootHandle,
    refreshLocalTree,
    setIsRefreshingFromDisk,
    currentFileRef,
    editorContentRef,
    setCurrentFile,
    setEditorContent,
  ]);

  const refreshRemoteFile = useCallback(async () => {
    const fileToRefresh = currentFileRef.current;
    if (!fileToRefresh || (fileToRefresh.type !== 's3' && fileToRefresh.type !== 'webdav')) return;
    if (isEncMdPath(fileToRefresh.id) || isEncMdPath(fileToRefresh.name)) return;
    const viewer = fileToRefresh.viewer || 'markdown';
    const editableViewers = ['markdown', 'json', 'raw', 'html', 'svg'];
    if (!editableViewers.includes(viewer)) return;

    const backend = getBackendForType(fileToRefresh.type);
    if (!backend) return;

    setIsPullingFromRemote(true);
    const indicatorId = addIndicator({
      id: 'note-pull-remote',
      type: ActivityTypes.NOTE_PROCESSING,
      label: '원격에서 가져오는 중',
      detail: fileToRefresh.name,
    });
    try {
      const { text: rawRemoteText } = await backend.readText(fileToRefresh.id);
      let remoteText = rawRemoteText;
      if (viewer === 'json' && remoteText.length <= 100000) {
        try {
          remoteText = JSON.stringify(JSON.parse(remoteText), null, 2);
        } catch {
          // keep raw json text
        }
      }

      const base = typeof fileToRefresh.content === 'string' ? fileToRefresh.content : '';
      const ours = editorContentRef.current ?? '';
      const merge = rebaseMergeTexts(base, ours, remoteText);

      let nextEditorText = remoteText;
      let backupName = null;
      let backupPath = null;
      if (merge.status === 'conflict') {
        const fileId = String(fileToRefresh.id || '');
        const lastSlash = fileId.lastIndexOf('/');
        const dirPrefix = lastSlash >= 0 ? fileId.slice(0, lastSlash + 1) : '';
        const now = new Date();
        let disambiguator = 1;
        let candidate = buildTimestampedCopyName(fileToRefresh.name || 'note', now, disambiguator);
        while (await backend.head(`${dirPrefix}${candidate}`)) {
          disambiguator += 1;
          candidate = buildTimestampedCopyName(fileToRefresh.name || 'note', now, disambiguator);
        }
        backupPath = `${dirPrefix}${candidate}`;
        await backend.writeText(backupPath, ours);
        backupName = candidate;
        if (fileToRefresh.type === 's3') await loadS3Files();
        else await refreshWebdavTree();
      } else {
        nextEditorText = merge.text;
      }

      const remoteByteLength = new TextEncoder().encode(remoteText).length;
      setCurrentFile((prev: any) => {
        if (prev?.id !== fileToRefresh.id || prev?.type !== fileToRefresh.type) return prev;
        const next = {
          ...prev,
          content: remoteText,
          size: remoteByteLength,
        };
        currentFileRef.current = next;
        return next;
      });
      setEditorContent(nextEditorText);
      editorContentRef.current = nextEditorText;
      await deleteMemoDraft(getDraftKey(fileToRefresh.type, fileToRefresh.id));
      markAutoSaveSyncTimestamp();

      const active = getActiveFileTab(workspaceTabsRef.current);
      if (active) {
        const tabPatch: Record<string, any> = {
          editorContent: nextEditorText,
          currentFile: {
            ...active.currentFile,
            content: remoteText,
            size: remoteByteLength,
          },
        };
        if (backupName) {
          tabPatch.baselineContent = remoteText;
        }
        const nextTabs = patchFileTab(workspaceTabsRef.current, active.id, tabPatch);
        workspaceTabsRef.current = nextTabs;
        setWorkspaceTabs(nextTabs);
      }

      if (backupName && backupPath && workspaceTabsEnabledRef.current) {
        const backupByteLength = new TextEncoder().encode(ours).length;
        const backupFile = {
          type: fileToRefresh.type,
          id: backupPath,
          name: backupName,
          content: ours,
          viewer,
          size: backupByteLength,
          lastModified: Date.now(),
        };
        const opened = commitOpenFile(backupFile, ours, {
          activate: false,
          baselineContent: ours,
        });
        if (opened) {
          showToast({ message: `「${backupName}」 백업 탭 열림`, durationMs: 2200 });
        }
      }

      if (backupName) {
        setOperationStatus(`충돌: 현재 문서를 ${backupName}으로 저장하고 원격 내용으로 교체했습니다`);
        showAlert({
          title: '가져오기 충돌',
          message:
            '원격 내용과 현재 문서가 충돌하여, 현재 문서를 새 파일로 저장한 뒤 원격 내용으로 교체했습니다.',
          detail: backupName,
        });
      } else if (nextEditorText === remoteText && ours === remoteText) {
        setOperationStatus('원격 내용과 동일합니다');
      } else if (nextEditorText === remoteText) {
        setOperationStatus('원격 내용으로 가져왔습니다');
      } else {
        setOperationStatus('원격 변경 위에 로컬 수정을 적용했습니다. 저장하면 반영됩니다.');
      }
    } catch (e: unknown) {
      console.error('Remote pull failed:', e);
      const err = e as { message?: string };
      showAlert({
        title: '가져오기 실패',
        message: err.message || String(e),
      });
    } finally {
      removeIndicator(indicatorId);
      setIsPullingFromRemote(false);
    }
  }, [
    addIndicator,
    removeIndicator,
    showAlert,
    showToast,
    getBackendForType,
    loadS3Files,
    refreshWebdavTree,
    commitOpenFile,
    workspaceTabsRef,
    setWorkspaceTabs,
    workspaceTabsEnabledRef,
    setIsPullingFromRemote,
    currentFileRef,
    editorContentRef,
    setCurrentFile,
    setEditorContent,
  ]);

  const applyOpenFileIdentityChange = useCallback((updated: any, options: ApplyIdentityOptions = {}) => {
    if (!updated) return null;
    const { oldPath = null, retargetTabs = true } = options;
    const prev = currentFileRef.current;
    const fromPath =
      typeof oldPath === 'string' && oldPath
        ? oldPath
        : typeof prev?.id === 'string'
          ? prev.id
          : null;
    const storageType = updated.type || prev?.type;
    const nextPath = updated.id;

    if (
      retargetTabs &&
      workspaceTabsEnabledRef.current &&
      storageType &&
      fromPath &&
      typeof nextPath === 'string' &&
      nextPath
    ) {
      applyWorkspaceFilePathRetargetRef.current?.(storageType, fromPath, nextPath, updated);
    }

    currentFileRef.current = updated;
    setCurrentFile(updated);
    if (typeof updated.name === 'string' && updated.name) {
      setEditedFileName(updated.name);
    }
    if (typeof nextPath !== 'string' || !nextPath) return updated;
    if (parseOpenNotePathFromAppPathname(location.pathname) === nextPath) return updated;
    suppressUnsavedNavGuardRef.current = true;
    try {
      const onExport = isExportPdfAppPathname(location.pathname);
      navigate(
        onExport ? exportPdfPathnameForStoragePath(nextPath) : `/view/${nextPath}`,
        { replace: true },
      );
    } finally {
      suppressUnsavedNavGuardRef.current = false;
    }
    return updated;
  }, [
    workspaceTabsEnabledRef,
    currentFileRef,
    setCurrentFile,
    setEditedFileName,
    location.pathname,
    navigate,
  ]);


  const renameS3File = useCallback(async (file: any, newName: string, contentOverride: string | null = null) => {
    const client = getS3Client();
    if (!client) throw new Error('S3 클라이언트를 초기화하지 못했습니다.');

    const oldKey = file.id;
    const lastSlash = oldKey.lastIndexOf('/');
    const dirPrefix = lastSlash >= 0 ? oldKey.slice(0, lastSlash + 1) : '';
    const newKey = dirPrefix + newName;

    if (newKey === oldKey) return file;

    if (contentOverride != null && typeof contentOverride === 'string') {
      const viewer = file.viewer || 'markdown';
      const contentType =
        viewer === 'json'
          ? 'application/json'
          : viewer === 'raw'
            ? 'text/plain'
            : viewer === 'html'
              ? 'text/html'
              : viewer === 'svg'
                ? 'image/svg+xml'
                : 'text/markdown';
      await putObject(client, {
        Bucket: s3Creds.bucket,
        Key: newKey,
        Body: contentOverride,
        ContentType: contentType,
      });
    } else {
      await copyObject(client, s3Creds.bucket, oldKey, newKey);
    }
    await deleteObject(client, s3Creds.bucket, oldKey);

    await loadS3Files();

    const result = { ...file, id: newKey, name: newName };
    if (contentOverride != null) result.content = contentOverride;
    return result;
  }, [getS3Client, s3Creds, loadS3Files]);

  const renameLocalFile = useCallback(async (file: any, newName: string) => {
    const pHandle = file.parentHandle || localRootHandle;
    if (!pHandle) throw new Error('루트 폴더를 먼저 열어주세요.');

    const oldPath = file.id;
    const lastSlash = oldPath.lastIndexOf('/');
    const dirPrefix = lastSlash >= 0 ? oldPath.slice(0, lastSlash + 1) : '';
    const newPath = dirPrefix + newName;

    if (newPath === oldPath) return file;

    const newFileHandle = await pHandle.getFileHandle(newName, { create: true });
    const writable = await newFileHandle.createWritable();
    await writable.write(editorContent);
    await writable.close();

    await pHandle.removeEntry(file.name, { recursive: false });

    await refreshLocalTree();

    return { ...file, id: newPath, name: newName, handle: newFileHandle, content: editorContent };
  }, [localRootHandle, editorContent, refreshLocalTree]);

  const renameCurrentFileFullName = useCallback(async (newFullName: string) => {
    if (!currentFile) return null;
    const trimmed = newFullName.trim();
    if (!trimmed) return null;

    try {
      let updated = null;
      if (currentFile.type === 's3') {
        const hasUnsaved = currentFile.content !== editorContent;
        const contentOverride = hasUnsaved ? editorContent : null;
        updated = await renameS3File(currentFile, trimmed, contentOverride);
      } else if (currentFile.type === 'local') {
        updated = await renameLocalFile(currentFile, trimmed);
      } else if (currentFile.type === SESSION_STORAGE_TYPE) {
        const ws = flushSessionEditorToWorkspaceRef.current?.() ?? sessionWorkspaceRef.current;
        if (!ws) return null;
        const nextWs = renameSessionFile(ws, currentFile.id, trimmed);
        sessionWorkspaceRef.current = nextWs;
        setSessionWorkspace(nextWs);
        const lastSlash = String(currentFile.id || '').lastIndexOf('/');
        const dirPrefix = lastSlash >= 0 ? currentFile.id.slice(0, lastSlash + 1) : '';
        const newKey = dirPrefix + trimmed;
        const bindingsRef = sessionVaultBindingsRef;
        const prevBinding = bindingsRef?.current?.[currentFile.id];
        if (bindingsRef && prevBinding && newKey !== currentFile.id) {
          const nextBindings = { ...bindingsRef.current };
          delete nextBindings[currentFile.id];
          nextBindings[newKey] = prevBinding;
          bindingsRef.current = nextBindings;
        }
        updated = { ...currentFile, id: newKey, name: trimmed, content: editorContent };
      } else if (currentFile.type === 'webdav') {
        const backend = createWebdavBackend(webdavConfig);
        const oldKey = currentFile.id;
        const lastSlash = oldKey.lastIndexOf('/');
        const dirPrefix = lastSlash >= 0 ? oldKey.slice(0, lastSlash + 1) : '';
        const newKey = dirPrefix + trimmed;
        if (newKey !== oldKey) {
          const hasUnsaved = currentFile.content !== editorContent;
          if (hasUnsaved) {
            await backend.writeText(newKey, editorContent, 'text/markdown');
            await backend.delete(oldKey);
          } else {
            await backend.move(oldKey, newKey);
          }
          await refreshWebdavTree();
          updated = {
            ...currentFile,
            id: newKey,
            name: trimmed,
            ...(hasUnsaved ? { content: editorContent } : {}),
          };
        }
      }
      if (updated) {
        return applyOpenFileIdentityChange(updated);
      }
      return updated ?? null;
    } catch (e: unknown) {
      const err = e as { message?: string };
      alert("이름 변경 실패: " + (err.message || String(e)));
      return null;
    }
  }, [
    currentFile,
    editorContent,
    renameS3File,
    renameLocalFile,
    setSessionWorkspace,
    webdavConfig,
    refreshWebdavTree,
    applyOpenFileIdentityChange,
  ]);

  // Keep saveFileRef in sync for tabs / AppLogic background saves.
  saveFileRef.current = saveFile;

  return {
    saveFile,
    refreshLocalFileFromDisk,
    refreshRemoteFile,
    handleRequestCloseEditor,
    openAdvancedSearchFile,
    selectFileRaw,
    commitOpenFile,
    saveCurrentMarkdownBeforeSwitch,
    applyOpenFileIdentityChange,
    renameCurrentFileFullName,
    renameS3File,
    renameLocalFile,
  };
}
