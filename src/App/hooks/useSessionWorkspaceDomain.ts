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
  SESSION_STORAGE_TYPE,
  buildSessionDownload,
  decodeSessionText,
  mimeForSessionFileName,
  pickDefaultSessionOpenPath,
  sessionViewerForName,
  updateSessionFileText,
  workspaceFromDataTransfer,
  workspaceFromDirectoryHandle,
  workspaceFromFileList,
  workspaceFromOsPaths,
} from '@/utils/sessionWorkspace';

/**
 * useSessionWorkspaceDomain: context-owned domain handlers.
 */
export function useSessionWorkspaceDomain() {
  const { setSessionWorkspace } = useVault();
  const { applySessionFileToEditorRef, clearOpenFileStateRef, closeCurrentFileRef, currentFileRef, downloadSessionWorkspaceRef, editorContentRef, flushSessionEditorToWorkspaceRef, getSessionObjectUrlRef, hasUnsavedEditorChangesRef, openSessionWorkspaceRef, revokeOpenFileObjectUrlRef, revokeSessionObjectUrlsRef, sessionObjectUrlsRef, sessionVaultBindingsRef, sessionWorkspaceRef, setCurrentFile, setEditorContent, setIsOpeningSession } = useFileSessionOwned();
  const { commitOpenFile } = useFileSession();
  const { triggerBlobDownload } = useModalsOwned();
  const { isMobile, setOperationStatus, setSidebarOpen } = useChromeOwned();
  const { closeWorkspaceTabById, workspaceTabsRef } = useWorkspaceTabsCtx();
  const navigate = useNavigate();

  const revokeSessionObjectUrls = useCallback(() => {
    for (const url of sessionObjectUrlsRef.current.values()) {
      URL.revokeObjectURL(url);
    }
    sessionObjectUrlsRef.current.clear();
  }, []);

  const getSessionObjectUrl = useCallback((path: any, bytes: any, mime: any) => {
    const existing = sessionObjectUrlsRef.current.get(path);
    if (existing) return existing;
    const url = URL.createObjectURL(new Blob([bytes], { type: mime || 'application/octet-stream' }));
    sessionObjectUrlsRef.current.set(path, url);
    return url;
  }, []);

  const flushSessionEditorToWorkspace = useCallback(() => {
    const cur = currentFileRef.current;
    const ws = sessionWorkspaceRef.current;
    if (!cur || cur.type !== SESSION_STORAGE_TYPE || !cur.id || !ws) return ws;
    const editable = ['markdown', 'json', 'raw', 'html', 'svg'].includes(cur.viewer || 'markdown');
    if (!editable) return ws;
    const next = updateSessionFileText(ws, cur.id, editorContentRef.current ?? '');
    sessionWorkspaceRef.current = next;
    setSessionWorkspace(next);
    return next;
  }, []);

  const closeSessionWorkspace = useCallback(() => {
    if (
      currentFileRef.current?.type === SESSION_STORAGE_TYPE &&
      (hasUnsavedEditorChangesRef.current?.() ?? false) &&
      !window.confirm('저장하지 않은 변경이 있습니다. 세션을 닫으면 사라집니다. 닫을까요?')
    ) {
      return;
    }
    revokeSessionObjectUrls();
    sessionVaultBindingsRef.current = Object.create(null);
    sessionWorkspaceRef.current = null;
    setSessionWorkspace(null);
    if (currentFileRef.current?.type === SESSION_STORAGE_TYPE) {
      clearOpenFileStateRef.current?.();
      navigate('/');
    }
  }, [clearOpenFileStateRef, hasUnsavedEditorChangesRef, navigate, revokeSessionObjectUrls]);

  const applySessionFileToEditor = useCallback(
    (path: any, workspace: any, options: any = {}) => {
      const record = workspace?.files?.[path];
      if (!record) return false;
      const skipNavigate = (options as { skipNavigate?: boolean }).skipNavigate === true;
      const viewer = sessionViewerForName(record.name);
      const size = record.bytes.byteLength;
      const mime = mimeForSessionFileName(record.name);

      if (viewer === 'image' || viewer === 'pdf' || viewer === 'audio' || viewer === 'video') {
        const url = getSessionObjectUrl(path, record.bytes, mime);
        const file = {
          type: SESSION_STORAGE_TYPE,
          id: path,
          name: record.name,
          viewer,
          objectUrl: url,
          size,
        };
        commitOpenFile(file, '');
        if (!skipNavigate) navigate(`/view/${path}`);
        return true;
      }

      if (viewer === 'unsupported') {
        const file = {
          type: SESSION_STORAGE_TYPE,
          id: path,
          name: record.name,
          viewer: 'unsupported',
          size,
        };
        commitOpenFile(file, '');
        if (!skipNavigate) navigate(`/view/${path}`);
        return true;
      }

      const text = decodeSessionText(record.bytes);
      const file = {
        type: SESSION_STORAGE_TYPE,
        id: path,
        name: record.name,
        content: text,
        viewer,
        size,
      };
      commitOpenFile(file, text);
      if (!skipNavigate) navigate(`/view/${path}`);
      return true;
    },
    [getSessionObjectUrl, navigate, commitOpenFile],
  );

  const openSessionWorkspace = useCallback(
    async (workspace: any) => {
      if (
        sessionWorkspaceRef.current &&
        !window.confirm('이미 열린 다운로드 세션이 있습니다. 새 파일로 바꾸면 현재 세션은 사라집니다. 계속할까요?')
      ) {
        return false;
      }
      revokeSessionObjectUrls();
      sessionVaultBindingsRef.current = Object.create(null);
      sessionWorkspaceRef.current = workspace;
      setSessionWorkspace(workspace);
      const path = pickDefaultSessionOpenPath(workspace);
      if (!path) {
        alert('열 수 있는 파일이 없습니다.');
        return false;
      }
      applySessionFileToEditor(path, workspace);
      if (isMobile) setSidebarOpen(false);
      return true;
    },
    [applySessionFileToEditor, isMobile, revokeSessionObjectUrls],
  );

  const handleOpenSessionFiles = useCallback(
    async (fileList: any, origin: any) => {
      setIsOpeningSession(true);
      try {
        const workspace = await workspaceFromFileList(fileList, origin);
        return await openSessionWorkspace(workspace);
      } catch (error: any) {
        console.error('Session open failed:', error);
        alert(error?.message || '파일을 열지 못했습니다.');
        return false;
      } finally {
        setIsOpeningSession(false);
      }
    },
    [openSessionWorkspace],
  );

  const handleOpenSessionDirectory = useCallback(async () => {
    if (!('showDirectoryPicker' in window)) {
      alert('이 브라우저는 폴더 선택을 지원하지 않습니다. ZIP 또는 MD 파일을 열어 주세요.');
      return;
    }
    setIsOpeningSession(true);
    try {
      const dirHandle = await (window as any).showDirectoryPicker();
      const workspace = await workspaceFromDirectoryHandle(dirHandle);
      await openSessionWorkspace(workspace);
    } catch (error: any) {
      if (error?.name === 'AbortError') return;
      console.error('Session folder open failed:', error);
      alert(error?.message || '폴더를 열지 못했습니다.');
    } finally {
      setIsOpeningSession(false);
    }
  }, [openSessionWorkspace]);

  const handleDropSessionTransfer = useCallback(
    async (dataTransfer: any) => {
      setIsOpeningSession(true);
      try {
        const workspace = await workspaceFromDataTransfer(dataTransfer);
        await openSessionWorkspace(workspace);
      } catch (error: any) {
        console.error('Session drop failed:', error);
        alert(error?.message || '드롭한 항목을 열지 못했습니다.');
      } finally {
        setIsOpeningSession(false);
      }
    },
    [openSessionWorkspace],
  );

  const handleDropSessionPaths = useCallback(
    async (paths: string[]) => {
      setIsOpeningSession(true);
      try {
        const workspace = await workspaceFromOsPaths(paths);
        await openSessionWorkspace(workspace);
      } catch (error: any) {
        console.error('Session OS drop failed:', error);
        alert(error?.message || '드롭한 항목을 열지 못했습니다.');
      } finally {
        setIsOpeningSession(false);
      }
    },
    [openSessionWorkspace],
  );

  const downloadSessionWorkspace = useCallback(async () => {
    const flushed = flushSessionEditorToWorkspace() ?? sessionWorkspaceRef.current;
    if (!flushed) return;
    const { blob, fileName } = await buildSessionDownload(flushed);
    triggerBlobDownload(blob, fileName);
    markAutoSaveTimestamp();
    const cur = currentFileRef.current;
    if (cur?.type === SESSION_STORAGE_TYPE && cur.id) {
      const record = flushed.files[cur.id];
      const text = editorContentRef.current ?? '';
      setCurrentFile((prev: any) => {
        if (!prev || prev.type !== SESSION_STORAGE_TYPE || prev.id !== cur.id) return prev;
        const next = {
          ...prev,
          content: ['markdown', 'json', 'raw', 'html', 'svg'].includes(prev.viewer || '') ? text : prev.content,
          size: record?.bytes.byteLength ?? prev.size,
        };
        currentFileRef.current = next;
        return next;
      });
    }
    setOperationStatus(`다운로드: ${fileName}`);
  }, [flushSessionEditorToWorkspace, triggerBlobDownload]);

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

  /** Logo / brand: go to `/` home (keep tabs open; clear active selection). */

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
  };
  flushSessionEditorToWorkspaceRef.current = flushSessionEditorToWorkspace;
  applySessionFileToEditorRef.current = applySessionFileToEditor;
  closeCurrentFileRef.current = closeCurrentFile;
  openSessionWorkspaceRef.current = openSessionWorkspace;
  downloadSessionWorkspaceRef.current = downloadSessionWorkspace;
  getSessionObjectUrlRef.current = getSessionObjectUrl;
  revokeSessionObjectUrlsRef.current = revokeSessionObjectUrls;
  return api;
}
