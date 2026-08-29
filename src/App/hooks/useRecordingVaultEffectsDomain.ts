/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useModalsOwned } from '@/App/providers/AppModalsStateProvider';
import { useVault } from '@/App/hooks/useVault';
import { useFileSessionOwned } from '@/App/providers/AppFileSessionStateProvider';
import { useRecordingOwned } from '@/App/providers/RecordingProvider';
import { useChromeOwned } from '@/App/providers/AppChromeStateProvider';
import {
  buildS3Tree,
  getFileLastModifiedMap,
  findFileNodeByPath,
  getRecordingKeysFromTree,
} from '@/utils/s3Tree';
import { listObjectsV2, getObjectBody } from '@/utils/s3Client';
import { getSyncKeyForRecording } from '@/utils/recordingPipeline';
import { decodeSyncData } from '@/utils/syncProto';
import { STORAGE_MODE_LOCAL, STORAGE_MODE_WEBDAV } from '@/utils/storageSettings';
import { createWebdavBackend, createStorageBackend } from '@/utils/storage';
import { tryRestoreLocalRootHandle } from '@/utils/localFolderStore';
import {
  rewriteDuplicateImageReferencesInVault,
  type UnusedImageDeleteOptions,
} from '@/utils/unusedImageCleanup';

/**
 * useRecordingVaultEffectsDomain: context-owned domain handlers.
 */
export function useRecordingVaultEffectsDomain() {
  const { isUnlocked, s3Creds } = useAuth();
  const { setLocalFolderRestoreSettled, setShowRestoreLocalFolderModal } = useModalsOwned();
  const {
    attachLocalRootFolder,
    getBackendForType,
    getS3Client,
    loadS3Files,
    localRootHandle,
    localTree,
    localVaultFsPath,
    refreshLocalTree,
    refreshWebdavTree,
    s3Tree,
    setS3Tree,
    setStorageMode,
    setWebdavTree,
    storageMode,
    webdavConfig,
    webdavReady,
    webdavTree,
  } = useVault();
  const { currentFile, currentFileRef, s3TreeRef, setCurrentFile, setEditorContent, webdavTreeRef } = useFileSessionOwned();
  const { selectedRecordingKey, setRecordingAudioUrl, setRecordingSyncData, setRecordingsList, setSelectedRecordingKey } = useRecordingOwned();
  const { isMobile } = useChromeOwned();

  // Recording list + selected recording URL/sync load
  const currentFileId = currentFile?.id;
  const currentFileType = currentFile?.type;
  const currentFileViewer = currentFile?.viewer;
  useEffect(() => {
    const pathStorageTypes = ['s3', 'local', 'webdav'];
    if (
      currentFileId == null ||
      !pathStorageTypes.includes(currentFileType) ||
      currentFileViewer !== 'markdown'
    ) {
      setRecordingsList([]);
      setSelectedRecordingKey(null);
      setRecordingAudioUrl('');
      setRecordingSyncData([]);
      return;
    }
    const noteKey = currentFileId;
    const tree =
      currentFileType === 's3'
        ? s3Tree
        : currentFileType === 'webdav'
          ? webdavTree
          : localTree;
    const list = getRecordingKeysFromTree(tree, noteKey);
    setRecordingsList(list);
    setSelectedRecordingKey(list.length > 0 ? list[0]!.key : null);
  }, [currentFileId, currentFileType, currentFileViewer, s3Tree, localTree, webdavTree]);

  useEffect(() => {
    if (!selectedRecordingKey || !currentFileType) {
      setRecordingAudioUrl('');
      setRecordingSyncData([]);
      return;
    }
    const storageType = currentFileType;
    if (!['s3', 'local', 'webdav'].includes(storageType)) {
      setRecordingAudioUrl('');
      setRecordingSyncData([]);
      return;
    }
    const backend = getBackendForType(storageType);
    if (!backend) return;

    let revoked = false;
    (async () => {
      try {
        const url = await backend.getObjectUrl(selectedRecordingKey);
        if (!revoked) setRecordingAudioUrl(url || '');
      } catch {
        if (!revoked) setRecordingAudioUrl('');
      }
    })();

    const syncKey = getSyncKeyForRecording(selectedRecordingKey);
    if (syncKey) {
      (async () => {
        try {
          const { body } = await backend.readBytes(syncKey);
          const data = decodeSyncData(body);
          if (!revoked && Array.isArray(data)) setRecordingSyncData(data);
        } catch {
          try {
            const jsonKey = syncKey.replace(/\.sync\.pb$/, '.sync.json');
            const { body } = await backend.readBytes(jsonKey);
            const json = new TextDecoder('utf-8').decode(body);
            const data = JSON.parse(json);
            if (!revoked && Array.isArray(data)) setRecordingSyncData(data);
          } catch {
            if (!revoked) setRecordingSyncData([]);
          }
        }
      })();
    }

    return () => {
      revoked = true;
      setRecordingAudioUrl('');
      setRecordingSyncData([]);
    };
  }, [selectedRecordingKey, currentFileType, getBackendForType]);

  // Mobile: poll S3 every 30s and refresh if S3 has newer LastModified
  useEffect(() => {
    if (!isMobile || !s3Creds.bucket || !isUnlocked) return;
    const client = getS3Client();
    if (!client) return;

    const poll = async () => {
      try {
        const contents = await listObjectsV2(client, s3Creds.bucket, '');
        const newTree = buildS3Tree(contents);
        const oldMap = getFileLastModifiedMap(s3TreeRef.current);
        const newMap = getFileLastModifiedMap(newTree);
        const changedKeys = new Set();
        for (const [path, newDate] of newMap) {
          const oldDate = oldMap.get(path);
          if (!oldDate || newDate.getTime() > oldDate.getTime()) changedKeys.add(path);
        }
        setS3Tree(newTree);

        const cur = currentFileRef.current;
        if (cur?.type !== 's3' || !changedKeys.has(cur.id)) return;
        const newNode = findFileNodeByPath(newTree, cur.id);
        const newLastMod = newNode?.lastModified ? (newNode.lastModified instanceof Date ? newNode.lastModified : new Date(newNode.lastModified)) : null;

        const { body, ContentType } = await getObjectBody(client, s3Creds.bucket, cur.id);
        const ext = (cur.name?.split('.').pop() || '').toLowerCase();
        if (cur.viewer === 'markdown' || ext === 'md' || ext === 'markdown' || ext === '') {
          const text = new TextDecoder('utf-8').decode(body);
          setCurrentFile((prev: any) => (prev?.id === cur.id ? { ...prev, content: text, lastModified: newLastMod } : prev));
          setEditorContent((prevContent: any) => (currentFileRef.current?.id === cur.id ? text : prevContent));
        } else if (cur.viewer === 'json' || ext === 'json') {
          const raw = new TextDecoder('utf-8').decode(body);
          let display = raw;
          try {
            const parsed = JSON.parse(raw);
            display = JSON.stringify(parsed, null, 2);
          } catch { /* keep raw */ }
          setCurrentFile((prev: any) => (prev?.id === cur.id ? { ...prev, content: display, lastModified: newLastMod } : prev));
          setEditorContent((prevContent: any) => (currentFileRef.current?.id === cur.id ? display : prevContent));
        } else if (cur.viewer === 'html' || cur.viewer === 'svg' || ext === 'html' || ext === 'htm' || ext === 'svg') {
          const text = new TextDecoder('utf-8').decode(body);
          setCurrentFile((prev: any) => (prev?.id === cur.id ? { ...prev, content: text, lastModified: newLastMod } : prev));
          setEditorContent((prevContent: any) => (currentFileRef.current?.id === cur.id ? text : prevContent));
        } else if (cur.viewer === 'image' || cur.viewer === 'pdf' || cur.viewer === 'audio' || cur.viewer === 'video') {
          const mime = ContentType || (cur.viewer === 'pdf' ? 'application/pdf' : '');
          // BlobPart is a DOM lib type; body is Uint8Array from storage read.
          // eslint-disable-next-line no-undef -- BlobPart
          const blob = new Blob([body as BlobPart], { type: mime || 'application/octet-stream' });
          const url = URL.createObjectURL(blob);
          setCurrentFile((prev: any) => {
            if (prev?.id !== cur.id) return prev;
            if (prev.objectUrl) URL.revokeObjectURL(prev.objectUrl);
            return { ...prev, objectUrl: url, lastModified: newLastMod };
          });
        }
      } catch {
        // ignore poll errors
      }
    };

    const t = setInterval(poll, 30000);
    poll();
    return () => clearInterval(t);
  }, [isMobile, s3Creds.bucket, isUnlocked, getS3Client]);

  // Mobile: poll WebDAV every 30s when in webdav mode
  useEffect(() => {
    if (!isMobile || storageMode !== 'webdav' || !webdavReady || !isUnlocked) return;

    const poll = async () => {
      try {
        const backend = createWebdavBackend(webdavConfig);
        const newTree = await backend.listAll();
        const oldMap = getFileLastModifiedMap(webdavTreeRef.current);
        const newMap = getFileLastModifiedMap(newTree);
        const changedKeys = new Set();
        for (const [path, newDate] of newMap) {
          const oldDate = oldMap.get(path);
          if (!oldDate || newDate.getTime() > oldDate.getTime()) changedKeys.add(path);
        }
        setWebdavTree(newTree);

        const cur = currentFileRef.current;
        if (cur?.type !== 'webdav' || !changedKeys.has(cur.id)) return;
        const newNode = findFileNodeByPath(newTree, cur.id);
        const newLastMod = newNode?.lastModified
          ? newNode.lastModified instanceof Date
            ? newNode.lastModified
            : new Date(newNode.lastModified)
          : null;

        const { text } = await backend.readText(cur.id);
        const ext = (cur.name?.split('.').pop() || '').toLowerCase();
        if (cur.viewer === 'markdown' || ext === 'md' || ext === 'markdown' || ext === '') {
          setCurrentFile((prev: any) => (prev?.id === cur.id ? { ...prev, content: text, lastModified: newLastMod } : prev));
          setEditorContent((prevContent: any) => (currentFileRef.current?.id === cur.id ? text : prevContent));
        } else if (cur.viewer === 'json' || ext === 'json') {
          let display = text;
          try {
            display = JSON.stringify(JSON.parse(text), null, 2);
          } catch { /* keep raw */ }
          setCurrentFile((prev: any) => (prev?.id === cur.id ? { ...prev, content: display, lastModified: newLastMod } : prev));
          setEditorContent((prevContent: any) => (currentFileRef.current?.id === cur.id ? display : prevContent));
        } else if (cur.viewer === 'html' || cur.viewer === 'svg' || ext === 'html' || ext === 'htm' || ext === 'svg') {
          setCurrentFile((prev: any) => (prev?.id === cur.id ? { ...prev, content: text, lastModified: newLastMod } : prev));
          setEditorContent((prevContent: any) => (currentFileRef.current?.id === cur.id ? text : prevContent));
        }
      } catch {
        // ignore poll errors
      }
    };

    const t = setInterval(poll, 30000);
    poll();
    return () => clearInterval(t);
  }, [isMobile, storageMode, webdavReady, webdavConfig, isUnlocked]);

  // Local folder load/open/refresh owned by VaultProvider (useVault)

  const getActiveStorageBackend = useCallback(() => {
    return createStorageBackend({
      mode:
        storageMode === STORAGE_MODE_LOCAL
          ? 'local'
          : storageMode === STORAGE_MODE_WEBDAV
            ? 'webdav'
            : 's3',
      getS3Client,
      s3Creds: s3Creds as any,
      localRootHandle,
      localVaultFsPath: localVaultFsPath ?? undefined,
      webdavConfig,
    } as any);
  }, [storageMode, getS3Client, s3Creds, localRootHandle, localVaultFsPath, webdavConfig]);

  const handleReadUnusedImageText = useCallback(
    async (path: any) => {
      const backend = getActiveStorageBackend();
      const { text } = await backend.readText(path);
      return text;
    },
    [getActiveStorageBackend],
  );

  const handleReadUnusedImageBytes = useCallback(
    async (path: any) => {
      const backend = getActiveStorageBackend();
      const { body } = await backend.readBytes(path);
      return body instanceof Uint8Array ? body : new Uint8Array(body);
    },
    [getActiveStorageBackend],
  );

  const handleDeleteUnusedImagePaths = useCallback(
    async (paths: any, mode: any, options?: UnusedImageDeleteOptions) => {
      const list = (Array.isArray(paths) ? paths : []).filter(Boolean);
      if (!list.length) return;
      const backend = getActiveStorageBackend();
      const pathRemap = options?.pathRemap ?? {};
      const hasRemap = Object.keys(pathRemap).length > 0;

      if (hasRemap) {
        const activeTree =
          storageMode === STORAGE_MODE_LOCAL
            ? localTree
            : storageMode === STORAGE_MODE_WEBDAV
              ? webdavTree
              : s3Tree;
        const updatedPaths = await rewriteDuplicateImageReferencesInVault({
          tree: activeTree,
          pathRemap,
          readText: async (path) => {
            const { text } = await backend.readText(path);
            return text;
          },
          writeText: async (path, text) => {
            await backend.writeText(path, text, 'text/markdown; charset=utf-8');
          },
        });
        const openId = currentFileRef.current?.id;
        if (openId && updatedPaths.includes(openId)) {
          const { text } = await backend.readText(openId);
          setEditorContent(text);
        }
      }

      for (const path of list) {
        try {
          if (mode === 'hard') {
            await backend.delete(path);
          } else {
            await backend.trash(path);
          }
        } catch (e: any) {
          if (e?.$metadata?.httpStatusCode === 404) continue;
          throw e;
        }
      }
      if (storageMode === STORAGE_MODE_LOCAL) await refreshLocalTree();
      else if (storageMode === STORAGE_MODE_WEBDAV) await refreshWebdavTree();
      else loadS3Files();
    },
    // refreshLocalTree is a stable-enough function declaration in this component body
    // eslint-disable-next-line react-hooks/exhaustive-deps -- refreshLocalTree recreated each render
    [
      getActiveStorageBackend,
      storageMode,
      localTree,
      webdavTree,
      s3Tree,
      currentFileRef,
      setEditorContent,
      refreshWebdavTree,
      loadS3Files,
      localRootHandle,
    ],
  );

  useEffect(() => {
    if (storageMode !== STORAGE_MODE_WEBDAV || !webdavReady || !isUnlocked) return;
    refreshWebdavTree();
  }, [storageMode, webdavReady, isUnlocked, refreshWebdavTree]);

  const handleConfirmRestoreLocalFolder = async () => {
    setShowRestoreLocalFolderModal(false);
    try {
      const handle = await tryRestoreLocalRootHandle();
      if (!handle) {
        setLocalFolderRestoreSettled(true);
        alert('폴더 접근 권한이 없습니다. 사이드바에서 폴더를 다시 선택해 주세요.');
        return;
      }
      setStorageMode(STORAGE_MODE_LOCAL);
      await attachLocalRootFolder(handle);
    } catch (e: any) {
      setLocalFolderRestoreSettled(true);
      alert(`폴더를 다시 열지 못했습니다: ${e?.message || e}`);
    }
  };

  // 5. File Read & Save

  const api = {
    handleReadUnusedImageText,
    handleReadUnusedImageBytes,
    handleDeleteUnusedImagePaths,
    handleConfirmRestoreLocalFolder,
  };
  return api;
}
