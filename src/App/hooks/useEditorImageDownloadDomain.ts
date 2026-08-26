/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback, useRef } from 'react';
import { useActivityIndicator, ActivityTypes } from '@/contexts/ActivityIndicatorContext';
import { useAuth } from '@/contexts/AuthContext';
import { useBootstrapOwned } from '@/App/providers/AppBootstrapStateProvider';
import { useVault } from '@/App/hooks/useVault';
import { useFileSessionOwned } from '@/App/providers/AppFileSessionStateProvider';
import { useTreeOpsOwned } from '@/App/providers/AppTreeOpsStateProvider';
import { useChromeOwned } from '@/App/providers/AppChromeStateProvider';
import { getSignedGetUrl } from '@/utils/vault/s3Client';
import { createChatBackend } from '@/utils/chatWithMyself';
import { getPendingUploads } from '@/utils/pendingUploadsDb';
import { syncPendingUploads } from '@/utils/syncPendingUploads';
import { isFileProbablyImage, uploadEditorImage, buildEditorImagePathPrefix, normalizeEditorImagePathPrefix, sniffImageMimeFromFile, getExtensionFromMime } from '@/utils/editorImageUpload';
import { uploadLocalEditorImage, getLocalWikiImageObjectUrl } from '@/utils/localEditorImage';
import { dbgClipboard, fileSummaries } from '@/utils/clipboardImageDebug';
import { readLocalDirectoryTree } from '@/utils/vault/localTree';
import { isLocalVaultReady } from '@/utils/vault/localVaultReady';
import { readTauriLocalDirectoryTree } from '@/utils/storage/tauriLocalBackend';
import { resolveStorageImagePath } from '@/utils/storageImagePath';
import { SESSION_STORAGE_TYPE, mimeForSessionFileName, putSessionFileBytes } from '@/utils/vault/sessionWorkspace';

/**
 * useEditorImageDownloadDomain: context-owned domain handlers.
 */
export function useEditorImageDownloadDomain() {
  const { addIndicator, removeIndicator, updateIndicator } = useActivityIndicator();
  const { isUnlocked, s3Creds } = useAuth();
  const { scriptsLoaded } = useBootstrapOwned();
  const {
    getBackendForType,
    getS3Client,
    loadS3Files,
    localRootHandle,
    localVaultFsPath,
    refreshWebdavTree,
    setIsLocalTreeLoading,
    setLocalTree,
    setSessionWorkspace,
    storageMode,
    webdavConfig,
    webdavReady,
  } = useVault();
  const { currentFile, flushSessionEditorToWorkspaceRef, getSessionObjectUrlRef, sessionObjectUrlsRef, sessionWorkspaceRef } = useFileSessionOwned();
  const { confirmAndCancelEditorImageUploadRef } = useTreeOpsOwned();
  const { setOperationStatus } = useChromeOwned();

  const editorImageUploadInProgressRef = useRef(false);
  const editorImageUploadAbortControllerRef = useRef<any>(null);
  const editorImageUploadCancelRequestedRef = useRef(false);
  const [isUploadingEditorImage, setIsUploadingEditorImage] = useState(false);
  const [editorImageUploadPercent, setEditorImageUploadPercent] = useState(0);

  const cancelEditorImageUpload = useCallback(() => {
    if (!editorImageUploadInProgressRef.current) return false;
    editorImageUploadCancelRequestedRef.current = true;
    if (editorImageUploadAbortControllerRef.current) {
      editorImageUploadAbortControllerRef.current.abort();
    }
    return true;
  }, []);

  const confirmAndCancelEditorImageUpload = useCallback(() => {
    if (!editorImageUploadInProgressRef.current) return true;
    const confirmed = window.confirm('이미지 업로드를 취소하시겠습니까?');
    if (!confirmed) return false;
    cancelEditorImageUpload();
    return true;
  }, [cancelEditorImageUpload]);

  /** 에디터 이미지 업로드 — 현재 md 파일과 동일한 경로(하위 .images/)에 저장, 반환값은 ![[path]]용 Object Key 배열. 업로드 중에는 중복 호출 무시 */
  const handleUploadEditorImage = useCallback(
    async (files: any) => {
      dbgClipboard('app:upload:start', {
        rawCount: files?.length ?? 0,
        files: fileSummaries(files),
        currentFileId: currentFile?.id ?? null,
        currentFileType: currentFile?.type ?? null,
      });
      const isLocalUpload =
        currentFile?.type === 'local' &&
        isLocalVaultReady(localRootHandle, localVaultFsPath);
      const isWebdavUpload = currentFile?.type === 'webdav' && webdavReady;
      const isSessionUpload = currentFile?.type === SESSION_STORAGE_TYPE;
      const client = getS3Client();
      if (!isLocalUpload && !isWebdavUpload && !isSessionUpload && (!client || !s3Creds.bucket)) {
        dbgClipboard('app:upload:abort', { reason: 'no storage backend ready' });
        setOperationStatus(
          currentFile?.type === 'webdav'
            ? '이미지 업로드는 WebDAV 연결 후 사용할 수 있습니다.'
            : currentFile?.type === 'local'
              ? '이미지 업로드는 로컬 폴더를 연 뒤 사용할 수 있습니다.'
              : currentFile?.type === SESSION_STORAGE_TYPE
                ? '이미지 업로드는 열린 세션에서만 사용할 수 있습니다.'
                : '이미지 업로드는 S3 연결 후 사용할 수 있습니다.',
        );
        return [];
      }
      if (isLocalUpload && !isLocalVaultReady(localRootHandle, localVaultFsPath)) {
        dbgClipboard('app:upload:abort', { reason: 'no local vault ready' });
        setOperationStatus('이미지 업로드는 로컬 폴더를 연 뒤 사용할 수 있습니다.');
        return [];
      }
      const candidates = Array.from(files as Iterable<File>).filter((f) => f && f.size > 0);
      const imageFiles = [];
      for (const f of candidates) {
        if (f.type?.startsWith('image/')) {
          imageFiles.push(f);
          continue;
        }
        if (!f.type || f.type === 'application/octet-stream') {
          if (await isFileProbablyImage(f)) imageFiles.push(f);
        }
      }
      dbgClipboard('app:upload:afterFilter', {
        candidates: fileSummaries(candidates),
        imageFiles: fileSummaries(imageFiles),
      });
      if (!imageFiles.length) {
        dbgClipboard('app:upload:empty', { reason: 'no image files after filter' });
        return [];
      }
      if (editorImageUploadInProgressRef.current) {
        dbgClipboard('app:upload:skipped', { reason: 'editorImageUploadInProgressRef' });
        return [];
      }
      editorImageUploadInProgressRef.current = true;
      editorImageUploadCancelRequestedRef.current = false;
      setIsUploadingEditorImage(true);
      setEditorImageUploadPercent(0);
      const indicatorId = addIndicator({
        id: 'editor-image-upload',
        type: ActivityTypes.FILE_UPLOAD,
        label: '이미지 업로드 중',
      });
      const imagePathPrefix =
        (currentFile?.type === 's3' ||
          currentFile?.type === 'local' ||
          currentFile?.type === 'webdav' ||
          currentFile?.type === SESSION_STORAGE_TYPE) &&
        currentFile?.id
          ? buildEditorImagePathPrefix(currentFile.id)
          : '.images/note';
      const paths = [];
      const totalBytes = imageFiles.reduce((acc, file) => acc + (file.size || 0), 0);
      let uploadedBytes = 0;
      const reportProgress = (file: any, percent: any) => {
        const currentUploaded = (file.size || 0) * (Math.max(0, Math.min(100, percent)) / 100);
        const overallPercent =
          totalBytes > 0 ? ((uploadedBytes + currentUploaded) / totalBytes) * 100 : percent;
        const normalized = Math.max(0, Math.min(100, Math.round(overallPercent)));
        setEditorImageUploadPercent(normalized);
        updateIndicator(indicatorId, {
          progress: normalized,
          detail: `${normalized}%`,
        });
      };
      try {
        for (const file of imageFiles) {
          if (editorImageUploadCancelRequestedRef.current) break;
          const uploadController = new AbortController();
          editorImageUploadAbortControllerRef.current = uploadController;
          let path;
          if (isLocalUpload) {
            if (localVaultFsPath && !localRootHandle) {
              const backend = getBackendForType('local');
              const prefix = normalizeEditorImagePathPrefix(imagePathPrefix);
              const uuid =
                typeof crypto !== 'undefined' && crypto.randomUUID
                  ? crypto.randomUUID()
                  : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
              let mime = file.type;
              if (!mime || mime === 'application/octet-stream') {
                mime = (await sniffImageMimeFromFile(file)) || mime;
              }
              const ext = getExtensionFromMime(mime);
              path = `${prefix}${uuid}${ext}`.replace(/\/+/g, '/').replace(/^\//, '');
              reportProgress(file, 0);
              const body = new Uint8Array(await file.arrayBuffer());
              if (uploadController.signal.aborted) {
                throw new DOMException('Aborted', 'AbortError');
              }
              await backend.writeBytes(path, body, mime || 'application/octet-stream');
              reportProgress(file, 100);
            } else {
              path = await uploadLocalEditorImage(localRootHandle, file, {
                imagePathPrefix,
                signal: uploadController.signal,
                onProgress: (percent) => reportProgress(file, percent),
              });
            }
          } else if (isWebdavUpload) {
            const backend = getBackendForType('webdav');
            const prefix = normalizeEditorImagePathPrefix(imagePathPrefix);
            const uuid =
              typeof crypto !== 'undefined' && crypto.randomUUID
                ? crypto.randomUUID()
                : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
            let mime = file.type;
            if (!mime || mime === 'application/octet-stream') {
              mime = (await sniffImageMimeFromFile(file)) || mime;
            }
            const ext = getExtensionFromMime(mime);
            path = `${prefix}${uuid}${ext}`.replace(/\/+/g, '/').replace(/^\//, '');
            reportProgress(file, 0);
            const body = new Uint8Array(await file.arrayBuffer());
            if (uploadController.signal.aborted) {
              throw new DOMException('Aborted', 'AbortError');
            }
            await backend.writeBytes(path, body, mime || 'application/octet-stream');
            reportProgress(file, 100);
          } else if (isSessionUpload) {
            const prefix = normalizeEditorImagePathPrefix(imagePathPrefix);
            const uuid =
              typeof crypto !== 'undefined' && crypto.randomUUID
                ? crypto.randomUUID()
                : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
            let mime = file.type;
            if (!mime || mime === 'application/octet-stream') {
              mime = (await sniffImageMimeFromFile(file)) || mime;
            }
            const ext = getExtensionFromMime(mime);
            path = `${prefix}${uuid}${ext}`.replace(/\/+/g, '/').replace(/^\//, '');
            reportProgress(file, 0);
            const body = new Uint8Array(await file.arrayBuffer());
            if (uploadController.signal.aborted) {
              throw new DOMException('Aborted', 'AbortError');
            }
            const nextWs = putSessionFileBytes(
              flushSessionEditorToWorkspaceRef.current?.() ?? sessionWorkspaceRef.current ?? {
                origin: 'md',
                originName: 'untitled',
                files: {},
              },
              path,
              body,
            );
            sessionWorkspaceRef.current = nextWs;
            setSessionWorkspace(nextWs);
            sessionObjectUrlsRef.current.delete(path);
            reportProgress(file, 100);
          } else {
            path = await uploadEditorImage(client, s3Creds.bucket, file, {
              imagePathPrefix,
              signal: uploadController.signal,
              onProgress: (percent) => reportProgress(file, percent),
            });
          }
          uploadedBytes += file.size || 0;
          editorImageUploadAbortControllerRef.current = null;
          const committedPercent = totalBytes > 0 ? Math.round((uploadedBytes / totalBytes) * 100) : 100;
          setEditorImageUploadPercent(Math.max(0, Math.min(100, committedPercent)));
          paths.push(path);
        }
        if (isLocalUpload && paths.length > 0) {
          if (localVaultFsPath && !localRootHandle) {
            setIsLocalTreeLoading(true);
            try {
              const tree = await readTauriLocalDirectoryTree(localVaultFsPath);
              setLocalTree(tree);
            } finally {
              setIsLocalTreeLoading(false);
            }
          } else if (localRootHandle) {
            setIsLocalTreeLoading(true);
            try {
              const tree = await readLocalDirectoryTree(localRootHandle, '', localRootHandle);
              setLocalTree(tree);
            } finally {
              setIsLocalTreeLoading(false);
            }
          }
        }
        if (isWebdavUpload && paths.length > 0) {
          await refreshWebdavTree();
        }
      } catch (err: any) {
        if (err?.name === 'AbortError') {
          dbgClipboard('app:upload:cancelled', { message: err?.message ?? 'aborted' });
          setOperationStatus('이미지 업로드가 취소되었습니다.');
        } else {
          dbgClipboard('app:upload:error', { message: err?.message ?? String(err) });
          setOperationStatus('이미지 업로드 실패: ' + (err.message || String(err)));
        }
      } finally {
        editorImageUploadAbortControllerRef.current = null;
        editorImageUploadInProgressRef.current = false;
        editorImageUploadCancelRequestedRef.current = false;
        setIsUploadingEditorImage(false);
        setEditorImageUploadPercent(0);
        removeIndicator(indicatorId);
      }
      dbgClipboard('app:upload:return', { paths, pathCount: paths.length });
      return paths;
    },
    [getS3Client, s3Creds, currentFile, localRootHandle, localVaultFsPath, webdavReady, getBackendForType, refreshWebdavTree, addIndicator, removeIndicator, updateIndicator, flushSessionEditorToWorkspaceRef]
  );

  /** Preview용 ![[path]] 이미지 URL 반환 (S3: Pre-signed, 로컬/WebDAV: blob URL) */
  const getPresignedUrlForPath = useCallback(
    async (path: any) => {
      const trimmed = String(path || '').trim();
      if (!trimmed) return null;
      // Cover / single-file export may store data: URIs in note-cover paths.
      if (/^(https?:|data:|blob:|\/\/)/i.test(trimmed)) return trimmed;
      if (currentFile?.type === SESSION_STORAGE_TYPE) {
        const ws = sessionWorkspaceRef.current;
        const candidates = [
          trimmed,
          trimmed.replace(/^\/+/, ''),
          resolveStorageImagePath(trimmed, currentFile.id),
        ].filter(Boolean);
        for (const key of candidates as string[]) {
          const record = ws?.files?.[key];
          if (record) {
            return getSessionObjectUrlRef.current?.(record.path, record.bytes, mimeForSessionFileName(record.name));
          }
        }
        console.warn('[wiki-image] getPresignedUrlForPath: session failed', { path: trimmed });
        return null;
      }
      if (currentFile?.type === 'local' && isLocalVaultReady(localRootHandle, localVaultFsPath)) {
        if (localVaultFsPath && !localRootHandle) {
          try {
            const backend = getBackendForType('local');
            return await backend.getObjectUrl(trimmed);
          } catch (err) {
            console.warn('[wiki-image] getPresignedUrlForPath: local vault failed', {
              path: trimmed,
              err,
            });
            return null;
          }
        }
        const url = await getLocalWikiImageObjectUrl(localRootHandle, trimmed);
        if (url) {
          console.log('[wiki-image] getPresignedUrlForPath: local ok', { path: trimmed, urlLength: url.length });
          return url;
        }
        console.warn('[wiki-image] getPresignedUrlForPath: local failed', { path: trimmed });
        return null;
      }
      if (currentFile?.type === 'webdav' && webdavReady) {
        try {
          const backend = getBackendForType('webdav');
          return await backend.getObjectUrl(trimmed);
        } catch (err) {
          console.warn('[wiki-image] getPresignedUrlForPath: webdav failed', { path: trimmed, err });
          return null;
        }
      }
      const client = getS3Client();
      if (!client || !s3Creds.bucket) {
        console.log('[wiki-image] getPresignedUrlForPath: no client or bucket', { path: trimmed });
        return null;
      }
      try {
        const url = await getSignedGetUrl(client, s3Creds.bucket, trimmed, 3600);
        console.log('[wiki-image] getPresignedUrlForPath: ok', { path: trimmed, urlLength: url?.length });
        return url;
      } catch (err) {
        console.warn('[wiki-image] getPresignedUrlForPath: failed', { path: trimmed, err });
        return null;
      }
    },
    [getS3Client, s3Creds, currentFile, localRootHandle, localVaultFsPath, webdavReady, getBackendForType, getSessionObjectUrlRef]
  );

  /** Chat with Myself: resolve by storageMode (not current editor file). */
  const getChatImageUrlForPath = useCallback(
    async (path: any) => {
      if (storageMode === 'local' && isLocalVaultReady(localRootHandle, localVaultFsPath)) {
        if (localVaultFsPath && !localRootHandle) {
          try {
            const backend = getBackendForType('local');
            return await backend.getObjectUrl(path);
          } catch {
            return null;
          }
        }
        return getLocalWikiImageObjectUrl(localRootHandle, path);
      }
      if (storageMode === 'webdav') {
        try {
          const backend = createChatBackend({
            mode: 'webdav',
            webdavConfig,
          });
          return await backend.getBinaryBlobUrl(path);
        } catch {
          return null;
        }
      }
      const client = getS3Client();
      if (!client || !s3Creds.bucket) return null;
      try {
        return await getSignedGetUrl(client, s3Creds.bucket, path, 3600);
      } catch {
        return null;
      }
    },
    [storageMode, localRootHandle, localVaultFsPath, getBackendForType, getS3Client, s3Creds.bucket, webdavConfig],
  );

  useEffect(() => {
    if (!scriptsLoaded || !isUnlocked || storageMode !== 's3' || !s3Creds.bucket) return;
    const run = async () => {
      const client = getS3Client();
      if (!client) return;
      const pending = await getPendingUploads();
      const indicatorId =
        pending.length > 0
          ? addIndicator({
              id: 'sync-pending',
              type: ActivityTypes.FILE_UPLOAD,
              label: `${pending.length}개 대기 파일 동기화 중`,
            })
          : null;
      try {
        const { synced } = await syncPendingUploads(client, s3Creds.bucket, setOperationStatus);
        if (synced > 0) setOperationStatus(`대기 중이던 ${synced}개 파일 동기화 완료`);
      } catch (e) {
        console.error('Pending uploads sync failed:', e);
      } finally {
        if (indicatorId) removeIndicator(indicatorId);
      }
      loadS3Files();
    };
    run();
  }, [scriptsLoaded, isUnlocked, storageMode, s3Creds.bucket, loadS3Files, getS3Client, addIndicator, removeIndicator]);

  const api = {
    cancelEditorImageUpload,
    confirmAndCancelEditorImageUpload,
    handleUploadEditorImage,
    getPresignedUrlForPath,
    getChatImageUrlForPath,
    isUploadingEditorImage,
    editorImageUploadPercent,
  };
  confirmAndCancelEditorImageUploadRef.current = confirmAndCancelEditorImageUpload;
  return api;
}
