/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useCallback } from 'react';
import { useActivityIndicator, ActivityTypes } from '@/contexts/ActivityIndicatorContext';
import { useAlertModal } from '@/contexts/AlertModalContext';
import { useAuth } from '@/contexts/AuthContext';
import { useVault } from '@/App/hooks/useVault';
import { useFileSessionOwned } from '@/App/providers/AppFileSessionStateProvider';
import { useFileSession } from '@/App/hooks/useFileSession';
import { useTreeOpsOwned } from '@/App/providers/AppTreeOpsStateProvider';
import { useTreeOps } from '@/App/hooks/useTreeOps';
import { useRecordingOwned } from '@/App/providers/RecordingProvider';
import { useChromeOwned } from '@/App/providers/AppChromeStateProvider';
import { useNavigate } from 'react-router';
import { useChatStorageCtx } from '@/components/chatWithMyself/ShareTargetGate';
import { findFileNodeByPath, findNodeByPath } from '@/utils/s3Tree';
import { putObject } from '@/utils/s3Client';
import {
  detectTimeZone,
  formatChatMessageAsNoteMarkdown,
  formatNoteShareChatBody,
  patchChatMessageMeta,
  appendChatMessage,
  enqueuePendingShare,
  SELF_GROUP,
  postChatSyncEvent,
  postChatLocalSyncEvent,
  localDateString,
  resolveReplyThreadMessages,
} from '@/utils/chatWithMyself';
import { runEncodeAndWritePipeline } from '@/utils/recordingPipeline';
import { deleteRecordingById, deleteRecordingFragments } from '@/utils/recordingDb';
import { drainRecordingUploadQueue } from '@/utils/recordingUploadQueue';
import { STORAGE_MODE_LOCAL, STORAGE_MODE_WEBDAV } from '@/utils/storageSettings';
import { createWebdavBackend, createLocalBackend } from '@/utils/storage';
import { resolveLocalFileNode } from '@/utils/localFileNode';
import { usePwaNewFileShortcut } from '@/hooks/usePwaNewFileShortcut';
import { useNewTempFileShortcut } from '@/hooks/useNewTempFileShortcut';
import {
  SESSION_STORAGE_TYPE,
  addEmptyUntitledSessionFile,
  createEmptyUntitledSessionWorkspace,
  resolveSessionFileRef,
  sessionFileKey,
} from '@/utils/sessionWorkspace';

/**
 * useTempChatRecordingDomain: context-owned domain handlers.
 */
export function useTempChatRecordingDomain() {
  const { addIndicator, removeIndicator } = useActivityIndicator();
  const { showAlert } = useAlertModal();
  const { isUnlocked, s3Creds } = useAuth();
  const { canScanStorageUsage, getS3Client, loadS3Files, localRootHandle, localTree, refreshLocalTree, refreshWebdavTree, s3Tree, upsertSessionWorkspace, storageMode, webdavConfig, webdavReady, webdavTree } = useVault();
  const { applySessionFileToEditorRef, currentFile, currentFileRef, editedFileName, editorContent, editorContentRef, flushSessionEditorToWorkspaceRef, revokeSessionObjectUrlsRef, selectFileRef, sessionVaultBindingsRef, sessionWorkspacesRef } = useFileSessionOwned();
  const { saveCurrentMarkdownBeforeSwitch, selectFileRaw } = useFileSession();
  const { confirmAndCancelEditorImageUploadRef, setSelectedIds } = useTreeOpsOwned();
  const { lastSelectedIdRef, requestNewFile, toSelectKey } = useTreeOps();
  const { isRecording, setRecordingPipelineStatus, startRecording, stopRecording } = useRecordingOwned();
  const { isMobile, setOperationStatus, setSidebarOpen } = useChromeOwned();
  const navigate = useNavigate();
  const { ready: chatStorageReady, ctx: chatStorageCtx } = useChatStorageCtx({
    storageMode,
    getS3Client,
    s3Bucket: s3Creds.bucket,
    localRootHandle,
    webdavConfig,
  });

  const requestNewTempFile = useCallback(() => {
    void (async () => {
      await flushSessionEditorToWorkspaceRef.current?.();
      const map = sessionWorkspacesRef.current ?? {};
      const curRef =
        currentFileRef.current?.type === SESSION_STORAGE_TYPE
          ? resolveSessionFileRef(map, currentFileRef.current.id)
          : null;
      if (curRef) {
        const { workspace, path } = addEmptyUntitledSessionFile(curRef.workspace);
        const nextMap = { ...map, [workspace.id]: workspace };
        sessionWorkspacesRef.current = nextMap;
        upsertSessionWorkspace(workspace);
        await applySessionFileToEditorRef.current?.(
          sessionFileKey(workspace.id, path),
          workspace,
        );
        if (isMobile) setSidebarOpen(false);
        return;
      }
      const workspace = createEmptyUntitledSessionWorkspace();
      revokeSessionObjectUrlsRef.current?.();
      sessionVaultBindingsRef.current = Object.create(null);
      const nextMap = { ...map, [workspace.id]: workspace };
      sessionWorkspacesRef.current = nextMap;
      upsertSessionWorkspace(workspace);
      await applySessionFileToEditorRef.current?.(
        sessionFileKey(workspace.id, 'untitled.md'),
        workspace,
      );
      if (isMobile) setSidebarOpen(false);
    })();
  }, [
    applySessionFileToEditorRef,
    currentFileRef,
    flushSessionEditorToWorkspaceRef,
    isMobile,
    revokeSessionObjectUrlsRef,
    sessionVaultBindingsRef,
    sessionWorkspacesRef,
    upsertSessionWorkspace,
  ]);

  usePwaNewFileShortcut({
    enabled: isUnlocked && canScanStorageUsage,
    onNewFile: requestNewFile,
  });

  useNewTempFileShortcut({
    enabled: isUnlocked && canScanStorageUsage,
    onNewTempFile: requestNewTempFile,
  });

  // moved to useTreeOpsDomain (lines were 5100-5321)

  // moved to useTreeOpsDomain (lines were 5323-5432)

  // moved to useTreeOpsDomain (lines were 5434-5752)

  const handleCreateNoteFromChatMessage = async ({
    message,
    parentPath = '',
    parentHandle,
    fileName,
    includeReplyThread = false,
  }: any) => {
    let finalName = String(fileName || '').trim();
    if (!finalName) throw new Error('파일명이 비어 있습니다.');
    if (!finalName.endsWith('.md')) finalName += '.md';
    if (finalName.includes('/') || finalName.includes('\\')) {
      throw new Error('파일명에 / 를 넣을 수 없습니다.');
    }
    const newPath = `${parentPath || ''}${finalName}`;
    const tz = detectTimeZone();
    /** @type {any[]} */
    let threadMessages: any[] = [];
    if (includeReplyThread && message?.replyTo && chatStorageCtx) {
      try {
        threadMessages = await resolveReplyThreadMessages(chatStorageCtx, message);
      } catch (err) {
        console.warn('Failed to resolve reply thread for note:', err);
        if (message.replySnippet) {
          threadMessages = [
            {
              id: message.replyTo,
              at: '',
              group: message.replyGroup || '나',
              body: message.replySnippet,
            },
          ];
        }
      }
    }
    const body = formatChatMessageAsNoteMarkdown(message, tz, newPath, {
      threadMessages,
    });

    if (storageMode === 's3') {
      const client = getS3Client();
      if (!client) throw new Error('S3 클라이언트를 초기화하지 못했습니다.');
      await putObject(client, {
        Bucket: s3Creds.bucket,
        Key: newPath,
        Body: body,
        ContentType: 'text/markdown; charset=utf-8',
      });
      await loadS3Files();
    } else if (storageMode === 'webdav') {
      const backend = createWebdavBackend(webdavConfig);
      await backend.writeText(newPath, body, 'text/markdown; charset=utf-8');
      await refreshWebdavTree();
    } else {
      const targetDir = parentHandle || localRootHandle;
      if (!targetDir) throw new Error('루트 폴더를 먼저 열어주세요.');
      const newFileHandle = await targetDir.getFileHandle(finalName, { create: true });
      const writable = await newFileHandle.createWritable();
      await writable.write(body);
      await writable.close();
      await refreshLocalTree();
    }

    if (chatStorageCtx && message?.id) {
      const dateStr =
        message.dateStr || localDateString(new Date(message.at || Date.now()), tz);
      try {
        await patchChatMessageMeta(chatStorageCtx, dateStr, message.id, {
          notePath: newPath,
        });
        postChatSyncEvent('day', { dateStr });
      } catch (err) {
        console.warn('Failed to link chat message to note:', err);
      }
    }

    setOperationStatus(`노트 생성 완료: ${newPath}`);
    return newPath;
  };

  const handleOpenNoteFromChat = useCallback(
    async (notePath: any) => {
      if (!notePath) return;
      const path = String(notePath);
      const type =
        storageMode === STORAGE_MODE_LOCAL
          ? 'local'
          : storageMode === STORAGE_MODE_WEBDAV
            ? 'webdav'
            : 's3';
      const tree =
        type === 's3' ? s3Tree : type === 'webdav' ? webdavTree : localTree;
      let node = findNodeByPath(tree, path) || findFileNodeByPath(tree, path);
      if ((!node || (node as any).type !== 'file') && type === 'local') {
        node = await resolveLocalFileNode(localRootHandle, path);
      }
      if (!node || (node as any).type !== 'file') {
        showAlert({
          title: '노트 열기',
          message: '해당 노트가 삭제되어 열 수 없습니다',
          detail: path,
        });
        return;
      }
      await selectFileRef.current?.(type, node);
    },
    [
      storageMode,
      s3Tree,
      webdavTree,
      localTree,
      localRootHandle,
      selectFileRef,
      showAlert,
    ],
  );

  const handleOpenStorageUsageFile = useCallback(
    async (file: any) => {
      const scanned = file?.node;
      const path = String(file?.path || scanned?.path || '');
      if (!path) return;

      const type =
        storageMode === STORAGE_MODE_LOCAL
          ? 'local'
          : storageMode === STORAGE_MODE_WEBDAV
            ? 'webdav'
            : 's3';
      const tree =
        type === 's3' ? s3Tree : type === 'webdav' ? webdavTree : localTree;
      const live = findNodeByPath(tree, path) || findFileNodeByPath(tree, path);
      const node =
        type === 'local' && scanned?.handle
          ? scanned
          : live || scanned;

      if (!node) {
        showAlert({
          title: '파일 열기',
          message: '해당 파일을 찾을 수 없습니다',
          detail: path,
        });
        return;
      }
      if (type === 'local' && !node.handle) {
        showAlert({
          title: '파일 열기',
          message: '로컬 파일 핸들을 찾을 수 없습니다. 폴더를 다시 연 뒤 분석해 주세요.',
          detail: path,
        });
        return;
      }

      if (!(confirmAndCancelEditorImageUploadRef.current?.() ?? true)) return;
      saveCurrentMarkdownBeforeSwitch(type, node);
      setSelectedIds(new Set([toSelectKey(type, path)]));
      lastSelectedIdRef.current = toSelectKey(type, path);
      await selectFileRaw(type, node);
    },
    [
      storageMode,
      s3Tree,
      webdavTree,
      localTree,
      selectFileRaw,
      showAlert,
      confirmAndCancelEditorImageUploadRef,
      saveCurrentMarkdownBeforeSwitch,
    ],
  );

  const handleShareNoteToChatWithMyself = useCallback(async (fileOverride: any = null) => {
    const file = fileOverride || currentFile;
    if (!file?.id && !file?.path) return;
    const path = String(file.id || file.path || '');
    if (!path) return;
    const name =
      (!fileOverride && String(editedFileName || '').trim()) ||
      file.name ||
      path.split('/').filter(Boolean).pop() ||
      'note';
    const body = formatNoteShareChatBody({ path, name });
    try {
      if (chatStorageReady && chatStorageCtx) {
        const { dateStr } = await appendChatMessage(chatStorageCtx, {
          body,
          group: SELF_GROUP,
          source: 'share',
        });
        if (dateStr) {
          postChatSyncEvent('day', { dateStr });
          postChatLocalSyncEvent('day', { dateStr });
        }
      } else {
        await enqueuePendingShare({ body, intent: 'sendSelf' });
      }
      setOperationStatus('나와의 채팅에 공유했습니다');
      navigate('/chat');
    } catch (err: any) {
      try {
        await enqueuePendingShare({ body, intent: 'sendSelf' });
        setOperationStatus('나와의 채팅에 공유했습니다 (동기화 대기)');
        navigate('/chat');
      } catch {
        setOperationStatus(
          `공유 실패: ${err?.message || String(err) || 'unknown error'}`,
        );
      }
    }
  }, [
    currentFile,
    editedFileName,
    chatStorageReady,
    chatStorageCtx,
    navigate,
  ]);

  const handleShareNodeToChatWithMyself = useCallback(
    async (_storageType: any, node: any) => {
      if (!node || node.type !== 'file') return;
      const path = String(node.path || node.id || '');
      if (!path) return;
      if (isMobile) setSidebarOpen(false);
      await handleShareNoteToChatWithMyself({
        id: path,
        path,
        name: node.name,
      });
    },
    [handleShareNoteToChatWithMyself, isMobile],
  );

  // moved to useTreeOpsDomain (lines were 5986-6144)

  // §7–8 Auto save / sync owned by AutoSaveProvider (useAutoSaveDomain).

  useEffect(() => {
    editorContentRef.current = editorContent;
  }, [editorContent]);

  const handleToggleRecording = async () => {
    const pathStorageTypes = ['s3', 'local', 'webdav'];
    const noteKey =
      pathStorageTypes.includes(currentFile?.type) && currentFile?.viewer === 'markdown'
        ? currentFile.id
        : '';

    if (isRecording) {
      const result = await stopRecording({
        noteKey,
        markdown: editorContent,
      });
      if (!result || !noteKey) return;

      const indicatorId = addIndicator({
        id: 'recording-upload',
        type: ActivityTypes.RECORDING,
        label: '녹음 업로드 중',
      });
      try {
        if (currentFile?.type === 'local' && localRootHandle) {
          setRecordingPipelineStatus('저장 중');
          const localBackend = createLocalBackend(localRootHandle);
          await runEncodeAndWritePipeline({
            recording: result,
            writeObject: ({ key, body }: any) => localBackend.writeBytes(key, body),
            recordId: result.id,
            onStatus: setRecordingPipelineStatus,
          } as any);
          if (result.id) {
            await deleteRecordingFragments(result.id);
            await deleteRecordingById(result.id);
          }
          await refreshLocalTree();
        } else if (currentFile?.type === 's3') {
          const client = getS3Client();
          if (client && s3Creds.bucket) {
            setRecordingPipelineStatus('업로드 중');
            await drainRecordingUploadQueue({
              client,
              bucket: s3Creds.bucket,
              onStatus: setRecordingPipelineStatus,
            });
            loadS3Files();
          }
        } else if (currentFile?.type === 'webdav' && webdavReady) {
          setRecordingPipelineStatus('업로드 중');
          const backend = createWebdavBackend(webdavConfig);
          await drainRecordingUploadQueue({
            writeObject: ({ key, body, contentType }) => backend.writeBytes(key, body, contentType),
            onStatus: setRecordingPipelineStatus,
          });
          await refreshWebdavTree();
        }
      } catch (e: any) {
        alert('녹음 업로드 실패: ' + (e?.message || e));
      } finally {
        removeIndicator(indicatorId);
        setRecordingPipelineStatus('');
      }
    } else {
      await startRecording();
    }
  };

  const formatTime = (ts: any) => {
    if (!ts) return '—';
    const d = new Date(ts);
    const hh = `${d.getHours()}`.padStart(2, '0');
    const mm = `${d.getMinutes()}`.padStart(2, '0');
    const ss = `${d.getSeconds()}`.padStart(2, '0');
    return `${hh}:${mm}:${ss}`;
  };

  const formatFileSize = (bytes: any) => {
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

  const api = {
    requestNewTempFile,
    handleCreateNoteFromChatMessage,
    handleOpenNoteFromChat,
    handleOpenStorageUsageFile,
    handleShareNoteToChatWithMyself,
    handleShareNodeToChatWithMyself,
    handleToggleRecording,
    formatTime,
    formatFileSize,
    isEditableStorage
  };
  return api;
}
