/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react';
import { useVault } from '@/App/hooks/useVault';
import { useFileSessionOwned } from '@/App/providers/AppFileSessionStateProvider';
import { useFileSession } from '@/App/hooks/useFileSession';
import { useModalsOwned } from '@/App/providers/AppModalsStateProvider';
import { useChromeOwned } from '@/App/providers/AppChromeStateProvider';
import { useWorkspaceTabsCtx } from '@/App/hooks/useWorkspaceTabsCtx';
import { useNavigate } from 'react-router';
import { markAutoSaveTimestamp } from '@/App/hooks/autoSaveBridge';
import { getActiveTab } from '@/utils/workspaceTabs';
import {
  decryptEncMdContent,
  encryptEncMdContent,
  getEncMdPassword,
  isEncMdPath,
  setEncMdPassword,
  tryUnlockEncMdContent,
} from '@/utils/encMd';
import {
  SESSION_STORAGE_TYPE,
  bindSessionLocalAbsBindings,
  buildSessionDownload,
  decodeSessionText,
  ensureSessionWorkspaceId,
  mimeForSessionFileName,
  parseSessionFileKey,
  pickDefaultSessionOpenPath,
  resolveSessionFileRef,
  sessionFileKey,
  sessionViewerForName,
  updateSessionFileText,
  workspaceFromDataTransfer,
  workspaceFromDirectoryHandle,
  workspaceFromFileList,
  workspaceFromOsPaths,
  type SessionWorkspacesMap,
} from '@/utils/sessionWorkspace';

/**
 * useSessionWorkspaceDomain: context-owned domain handlers.
 */
export function useSessionWorkspaceDomain() {
  const {
    sessionWorkspaces,
    upsertSessionWorkspace,
    removeSessionWorkspace,
  } = useVault();
  const {
    applySessionFileToEditorRef,
    clearOpenFileStateRef,
    closeCurrentFileRef,
    currentFileRef,
    downloadSessionWorkspaceRef,
    editorContentRef,
    flushSessionEditorToWorkspaceRef,
    getSessionObjectUrlRef,
    hasUnsavedEditorChangesRef,
    openSessionWorkspaceRef,
    revokeOpenFileObjectUrlRef,
    revokeSessionObjectUrlsRef,
    sessionObjectUrlsRef,
    sessionVaultBindingsRef,
    sessionWorkspacesRef,
    setCurrentFile,
    setEditorContent,
    setEncMdPrompt,
    setIsOpeningSession,
  } = useFileSessionOwned();
  const { commitOpenFile } = useFileSession();
  const { triggerBlobDownload } = useModalsOwned();
  const { isMobile, setOperationStatus, setSidebarOpen } = useChromeOwned();
  const { closeWorkspaceTabById, workspaceTabsRef } = useWorkspaceTabsCtx();
  const navigate = useNavigate();

  const syncSessionWorkspacesRef = useCallback(
    (map: SessionWorkspacesMap) => {
      sessionWorkspacesRef.current = map;
    },
    [sessionWorkspacesRef],
  );

  const revokeSessionObjectUrls = useCallback(() => {
    for (const url of sessionObjectUrlsRef.current.values()) {
      URL.revokeObjectURL(url);
    }
    sessionObjectUrlsRef.current.clear();
  }, [sessionObjectUrlsRef]);

  const getSessionObjectUrl = useCallback(
    (path: any, bytes: any, mime: any) => {
      const existing = sessionObjectUrlsRef.current.get(path);
      if (existing) return existing;
      const url = URL.createObjectURL(
        new Blob([bytes], { type: mime || 'application/octet-stream' }),
      );
      sessionObjectUrlsRef.current.set(path, url);
      return url;
    },
    [sessionObjectUrlsRef],
  );

  const unlockEncMdOrPrompt = useCallback(
    async (passwordKey: string, ciphertext: string) => {
      const first = await tryUnlockEncMdContent(passwordKey, ciphertext);
      if (first.status !== 'need-password') return first.text;

      return new Promise<string | null>((resolve) => {
        const run = (password: string) => {
          void (async () => {
            try {
              const plain = await decryptEncMdContent(ciphertext, password);
              setEncMdPassword(passwordKey, password);
              setEncMdPrompt(null);
              resolve(plain);
            } catch {
              setEncMdPrompt((prev: any) =>
                prev
                  ? { ...prev, error: '비밀번호가 올바르지 않습니다.' }
                  : prev,
              );
            }
          })();
        };
        setEncMdPrompt({
          title: '암호화된 노트',
          message: '비밀번호를 입력하세요.',
          confirmLabel: '열기',
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

  const flushSessionEditorToWorkspace = useCallback(async () => {
    const cur = currentFileRef.current;
    const map = sessionWorkspacesRef.current ?? {};
    if (!cur || cur.type !== SESSION_STORAGE_TYPE || !cur.id) return map;

    const ref = resolveSessionFileRef(map, cur.id);
    if (!ref) return map;

    const { workspace, sessionId, path } = ref;
    const record = workspace.files[path];
    if (!record) return map;

    const viewer = cur.viewer || sessionViewerForName(record.name);
    const editable = ['markdown', 'json', 'raw', 'html', 'svg'].includes(viewer);
    if (!editable) return map;

    let textToStore = editorContentRef.current ?? '';
    if (isEncMdPath(record.name)) {
      const passwordKey = sessionFileKey(sessionId, path);
      let pw = getEncMdPassword(passwordKey) || getEncMdPassword(path);
      if (!pw) return map;
      try {
        textToStore = await encryptEncMdContent(textToStore, pw);
        setEncMdPassword(passwordKey, pw);
      } catch {
        return map;
      }
    }

    const nextWorkspace = updateSessionFileText(workspace, path, textToStore);
    const nextMap = { ...map, [sessionId]: nextWorkspace };
    sessionWorkspacesRef.current = nextMap;
    upsertSessionWorkspace(nextWorkspace);
    return nextMap;
  }, [currentFileRef, editorContentRef, sessionWorkspacesRef, upsertSessionWorkspace]);

  const closeSessionWorkspace = useCallback(
    (sessionId?: string) => {
      const map = sessionWorkspacesRef.current ?? {};
      const ids = sessionId ? [sessionId] : Object.keys(map);
      if (!ids.length) return;

      const cur = currentFileRef.current;
      const curParsed = cur?.type === SESSION_STORAGE_TYPE ? parseSessionFileKey(cur.id) : null;
      const closingActive =
        curParsed && ids.includes(curParsed.sessionId) && cur?.type === SESSION_STORAGE_TYPE;

      if (
        closingActive &&
        (hasUnsavedEditorChangesRef.current?.() ?? false) &&
        !window.confirm('저장하지 않은 변경이 있습니다. 세션을 닫으면 사라집니다. 닫을까요?')
      ) {
        return;
      }

      const nextMap = { ...map };
      for (const id of ids) {
        delete nextMap[id];
        removeSessionWorkspace(id);
      }
      sessionWorkspacesRef.current = nextMap;

      if (closingActive) {
        clearOpenFileStateRef.current?.();
        navigate('/');
      }
    },
    [
      clearOpenFileStateRef,
      currentFileRef,
      hasUnsavedEditorChangesRef,
      navigate,
      removeSessionWorkspace,
      sessionWorkspacesRef,
    ],
  );

  const applySessionFileToEditor = useCallback(
    async (fileKey: any, workspace: any, options: any = {}) => {
      const parsed = parseSessionFileKey(fileKey);
      const path = parsed?.path ?? String(fileKey || '');
      const sessionId = parsed?.sessionId ?? workspace?.id;
      if (!sessionId || !path) return false;

      const record = workspace?.files?.[path];
      if (!record) return false;

      const skipNavigate = (options as { skipNavigate?: boolean }).skipNavigate === true;
      const compositeId = sessionFileKey(sessionId, path);
      const viewer = sessionViewerForName(record.name);
      const size = record.bytes.byteLength;
      const mime = mimeForSessionFileName(record.name);

      if (viewer === 'image' || viewer === 'pdf' || viewer === 'audio' || viewer === 'video') {
        const url = getSessionObjectUrl(compositeId, record.bytes, mime);
        const file = {
          type: SESSION_STORAGE_TYPE,
          id: compositeId,
          name: record.name,
          viewer,
          objectUrl: url,
          size,
        };
        commitOpenFile(file, '');
        if (!skipNavigate) navigate(`/view/${encodeURIComponent(compositeId)}`);
        return true;
      }

      if (viewer === 'unsupported') {
        const file = {
          type: SESSION_STORAGE_TYPE,
          id: compositeId,
          name: record.name,
          viewer: 'unsupported',
          size,
        };
        commitOpenFile(file, '');
        if (!skipNavigate) navigate(`/view/${encodeURIComponent(compositeId)}`);
        return true;
      }

      const rawText = decodeSessionText(record.bytes);
      let text = rawText;
      let encMd = false;
      if (isEncMdPath(record.name)) {
        const plain = await unlockEncMdOrPrompt(compositeId, rawText);
        if (plain == null) return false;
        text = plain;
        encMd = true;
      }

      const file = {
        type: SESSION_STORAGE_TYPE,
        id: compositeId,
        name: record.name,
        content: text,
        viewer,
        size,
        ...(encMd ? { encMd: true } : {}),
      };
      commitOpenFile(file, text);
      if (!skipNavigate) navigate(`/view/${encodeURIComponent(compositeId)}`);
      return true;
    },
    [getSessionObjectUrl, navigate, commitOpenFile, unlockEncMdOrPrompt],
  );

  const openSessionWorkspace = useCallback(
    async (workspaceInput: any) => {
      const workspace = ensureSessionWorkspaceId(workspaceInput);
      const nextMap = {
        ...(sessionWorkspacesRef.current ?? {}),
        [workspace.id]: workspace,
      };
      sessionWorkspacesRef.current = nextMap;
      upsertSessionWorkspace(workspace);
      bindSessionLocalAbsBindings(workspace, sessionVaultBindingsRef.current);

      const path = pickDefaultSessionOpenPath(workspace);
      if (!path) {
        alert('열 수 있는 파일이 없습니다.');
        return false;
      }
      await applySessionFileToEditor(sessionFileKey(workspace.id, path), workspace);
      if (isMobile) setSidebarOpen(false);
      return true;
    },
    [applySessionFileToEditor, isMobile, upsertSessionWorkspace, sessionWorkspacesRef],
  );

  const handleOpenSessionFiles = useCallback(
    async (fileList: any, origin: any) => {
      setIsOpeningSession(true);
      try {
        const workspace = ensureSessionWorkspaceId(await workspaceFromFileList(fileList, origin));
        return await openSessionWorkspace(workspace);
      } catch (error: any) {
        console.error('Session open failed:', error);
        alert(error?.message || '파일을 열지 못했습니다.');
        return false;
      } finally {
        setIsOpeningSession(false);
      }
    },
    [openSessionWorkspace, setIsOpeningSession],
  );

  const handleOpenSessionDirectory = useCallback(async () => {
    if (!('showDirectoryPicker' in window)) {
      alert('이 브라우저는 폴더 선택을 지원하지 않습니다. ZIP 또는 MD 파일을 열어 주세요.');
      return;
    }
    setIsOpeningSession(true);
    try {
      const dirHandle = await (window as any).showDirectoryPicker();
      const workspace = ensureSessionWorkspaceId(await workspaceFromDirectoryHandle(dirHandle));
      await openSessionWorkspace(workspace);
    } catch (error: any) {
      if (error?.name === 'AbortError') return;
      console.error('Session folder open failed:', error);
      alert(error?.message || '폴더를 열지 못했습니다.');
    } finally {
      setIsOpeningSession(false);
    }
  }, [openSessionWorkspace, setIsOpeningSession]);

  const handleDropSessionTransfer = useCallback(
    async (dataTransfer: any) => {
      setIsOpeningSession(true);
      try {
        const workspace = ensureSessionWorkspaceId(await workspaceFromDataTransfer(dataTransfer));
        await openSessionWorkspace(workspace);
      } catch (error: any) {
        console.error('Session drop failed:', error);
        alert(error?.message || '드롭한 항목을 열지 못했습니다.');
      } finally {
        setIsOpeningSession(false);
      }
    },
    [openSessionWorkspace, setIsOpeningSession],
  );

  const handleDropSessionPaths = useCallback(
    async (paths: string[]) => {
      setIsOpeningSession(true);
      try {
        const workspace = ensureSessionWorkspaceId(await workspaceFromOsPaths(paths));
        await openSessionWorkspace(workspace);
      } catch (error: any) {
        console.error('Session OS drop failed:', error);
        alert(error?.message || '드롭한 항목을 열지 못했습니다.');
      } finally {
        setIsOpeningSession(false);
      }
    },
    [openSessionWorkspace, setIsOpeningSession],
  );

  const downloadSessionWorkspace = useCallback(async () => {
    await flushSessionEditorToWorkspace();
    const cur = currentFileRef.current;
    const map = sessionWorkspacesRef.current ?? {};
    const ref =
      cur?.type === SESSION_STORAGE_TYPE
        ? resolveSessionFileRef(map, cur.id)
        : null;
    const flushed = ref?.workspace;
    if (!flushed) return;

    const { blob, fileName } = await buildSessionDownload(flushed);
    triggerBlobDownload(blob, fileName);
    markAutoSaveTimestamp();

    if (cur?.type === SESSION_STORAGE_TYPE && cur.id && ref) {
      const record = flushed.files[ref.path];
      const text = editorContentRef.current ?? '';
      setCurrentFile((prev: any) => {
        if (!prev || prev.type !== SESSION_STORAGE_TYPE || prev.id !== cur.id) return prev;
        const next = {
          ...prev,
          content: ['markdown', 'json', 'raw', 'html', 'svg'].includes(prev.viewer || '')
            ? text
            : prev.content,
          size: record?.bytes.byteLength ?? prev.size,
        };
        currentFileRef.current = next;
        return next;
      });
    }
    setOperationStatus(`다운로드: ${fileName}`);
  }, [
    flushSessionEditorToWorkspace,
    triggerBlobDownload,
    currentFileRef,
    editorContentRef,
    sessionWorkspacesRef,
    setCurrentFile,
    setOperationStatus,
  ]);

  const closeCurrentFile = () => {
    const active = getActiveTab(workspaceTabsRef.current);
    if (active) {
      closeWorkspaceTabById(active.id, { skipDirtyConfirm: true });
      return;
    }
    setCurrentFile((prev: any) => {
      revokeOpenFileObjectUrlRef.current?.(prev);
      return null;
    });
    currentFileRef.current = null;
    setEditorContent('');
    editorContentRef.current = '';
    navigate('/');
  };

  const api = {
    flushSessionEditorToWorkspace,
    closeSessionWorkspace,
    applySessionFileToEditor,
    openSessionWorkspace,
    handleOpenSessionFiles,
    handleOpenSessionDirectory,
    handleDropSessionTransfer,
    handleDropSessionPaths,
    downloadSessionWorkspace,
    closeCurrentFile,
    getSessionObjectUrl,
    revokeSessionObjectUrls,
    syncSessionWorkspacesRef,
  };
  flushSessionEditorToWorkspaceRef.current = flushSessionEditorToWorkspace;
  applySessionFileToEditorRef.current = applySessionFileToEditor;
  closeCurrentFileRef.current = closeCurrentFile;
  openSessionWorkspaceRef.current = openSessionWorkspace;
  downloadSessionWorkspaceRef.current = downloadSessionWorkspace;
  getSessionObjectUrlRef.current = getSessionObjectUrl;
  revokeSessionObjectUrlsRef.current = revokeSessionObjectUrls;
  sessionWorkspacesRef.current = sessionWorkspaces;
  return api;
}
