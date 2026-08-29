import { useCallback, useMemo, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useVaultOwned } from '@/App/providers/AppVaultStateProvider';
import { createS3Client, listObjectsV2 } from '@/utils/s3Client';
import { buildS3Tree } from '@/utils/s3Tree';
import {
  createStorageBackendForType,
  createWebdavBackend,
} from '@/utils/storage';
import {
  STORAGE_MODE_LOCAL,
  STORAGE_MODE_WEBDAV,
} from '@/utils/storageSettings';
import { patchWebdavTreeChildren } from '@/utils/webdavTree.js';
import {
  patchLocalTreeChildren,
  hydrateExpandedLocalFolders,
  readLocalDirectoryLevel,
  readLocalDirectoryTree,
} from '@/utils/localTree';
import { loadExpandedFolderPaths } from '@/utils/expandedFoldersStore';
import { isDesktopApp } from '@/utils/isDesktopApp';
import {
  pickLocalRootDirectory,
  ensureDirectoryReadWritePermission,
  saveLocalRootHandle,
} from '@/utils/localFolderStore';
import {
  saveLocalVaultFsPath,
  clearLocalVaultFsPath,
} from '@/utils/localVaultPathStore';
import {
  pickTauriLocalVaultDirectory,
  loadTauriLocalTreeInitial,
  readTauriLocalDirectoryTree,
  createTauriLocalBackend,
} from '@/utils/storage/tauriLocalBackend';
import type { VaultValue } from '@/App/context/VaultContext';

/**
 * Vault load / backend handlers. Consumes AppVaultStateProvider + Auth.
 */
export function useVaultDomain(): VaultValue {
  const { s3Creds } = useAuth();
  const owned = useVaultOwned();
  const {
    storageMode,
    setStorageMode,
    s3Tree,
    setS3Tree,
    localTree,
    setLocalTree,
    webdavTree,
    setWebdavTree,
    sessionWorkspaces,
    localRootHandle,
    setLocalRootHandle,
    localVaultFsPath,
    setLocalVaultFsPath,
    webdavConfig,
    setWebdavConfig,
    isLocalTreeLoading,
    setIsLocalTreeLoading,
    isWebdavTreeLoading,
    setIsWebdavTreeLoading,
    localFolderLoadingPath,
    setLocalFolderLoadingPath,
    webdavFolderLoadingPath,
    setWebdavFolderLoadingPath,
  } = owned;

  const localFolderLoadInFlightRef = useRef<Set<string>>(new Set());

  const webdavReady = Boolean(webdavConfig?.endpoint && webdavConfig?.username);

  const getS3Client = useCallback(
    (creds = s3Creds) => createS3Client(creds),
    [s3Creds],
  );

  const getBackendForType = useCallback(
    (type: string) =>
      createStorageBackendForType(type, {
        getS3Client,
        s3Creds,
        localRootHandle,
        localVaultFsPath,
        webdavConfig,
      }),
    [getS3Client, s3Creds, localRootHandle, localVaultFsPath, webdavConfig],
  );

  const refreshWebdavTree = useCallback(async () => {
    if (!webdavReady) return;
    setIsWebdavTreeLoading(true);
    try {
      const backend = createWebdavBackend(webdavConfig);
      const children = await backend.listChildren('');
      setWebdavTree(children);
    } catch (err) {
      console.error('WebDAV tree load error:', err);
    } finally {
      setIsWebdavTreeLoading(false);
    }
  }, [webdavReady, webdavConfig, setIsWebdavTreeLoading, setWebdavTree]);

  const loadWebdavFolderChildren = useCallback(
    async (folderNode: any) => {
      if (!folderNode?.path || folderNode.childrenLoaded === true || !webdavReady) return;
      const folderPath = folderNode.path as string;
      setWebdavFolderLoadingPath(folderPath);
      try {
        const backend = createWebdavBackend(webdavConfig);
        const children = await backend.listChildren(folderPath);
        setWebdavTree((prev) => patchWebdavTreeChildren(prev, folderPath, children));
      } finally {
        setWebdavFolderLoadingPath((current) =>
          current === folderPath ? null : current,
        );
      }
    },
    [webdavReady, webdavConfig, setWebdavFolderLoadingPath, setWebdavTree],
  );

  const loadS3Files = useCallback(
    async (creds = s3Creds) => {
      const client = getS3Client(creds);
      if (!client || !creds.bucket) return;
      try {
        const contents = await listObjectsV2(client, creds.bucket, '');
        setS3Tree(buildS3Tree(contents));
      } catch (err) {
        console.error('S3 Load Error:', err);
      }
    },
    [getS3Client, s3Creds, setS3Tree],
  );

  const attachLocalRootFolder = useCallback(
    async (dirHandle: FileSystemDirectoryHandle, { fullScan = false } = {}) => {
      const canWrite = await ensureDirectoryReadWritePermission(dirHandle);
      if (!canWrite) {
        throw new Error(
          '선택한 폴더에 쓰기 권한이 없습니다. 폴더를 다시 선택해 주세요.',
        );
      }
      setIsLocalTreeLoading(true);
      setLocalRootHandle(dirHandle);
      try {
        await saveLocalRootHandle(dirHandle);
        let tree = fullScan
          ? await readLocalDirectoryTree(dirHandle, '', dirHandle)
          : await readLocalDirectoryLevel(dirHandle, '', dirHandle);
        if (!fullScan) {
          tree = await hydrateExpandedLocalFolders(
            tree,
            loadExpandedFolderPaths().local,
          );
        }
        setLocalTree(tree);
      } finally {
        setIsLocalTreeLoading(false);
      }
    },
    [setIsLocalTreeLoading, setLocalRootHandle, setLocalTree],
  );

  const loadLocalFolderChildren = useCallback(
    async (folderNode: any) => {
      if (!folderNode || folderNode.childrenLoaded === true) return;
      const folderPath = folderNode.path;
      if (!folderPath || localFolderLoadInFlightRef.current.has(folderPath)) return;
      localFolderLoadInFlightRef.current.add(folderPath);
      setLocalFolderLoadingPath(folderPath);
      try {
        if (!folderNode.handle && localVaultFsPath) {
          const backend = createTauriLocalBackend(localVaultFsPath);
          const children = await backend.listChildren(folderPath);
          setLocalTree((prev) => patchLocalTreeChildren(prev, folderPath, children));
          return;
        }
        if (!folderNode?.handle) return;
        const children = await readLocalDirectoryLevel(
          folderNode.handle,
          folderPath,
          folderNode.handle,
        );
        setLocalTree((prev) => patchLocalTreeChildren(prev, folderPath, children));
      } finally {
        localFolderLoadInFlightRef.current.delete(folderPath);
        setLocalFolderLoadingPath((current) =>
          current === folderPath ? null : current,
        );
      }
    },
    [localVaultFsPath, setLocalFolderLoadingPath, setLocalTree],
  );

  const openLocalFolder = useCallback(async () => {
    try {
      if (isDesktopApp()) {
        const abs = await pickTauriLocalVaultDirectory();
        if (!abs) return;
        saveLocalVaultFsPath(abs);
        setLocalVaultFsPath(abs);
        setLocalRootHandle(null);
        setStorageMode(STORAGE_MODE_LOCAL);
        setIsLocalTreeLoading(true);
        try {
          const tree = await loadTauriLocalTreeInitial(
            abs,
            loadExpandedFolderPaths().local,
          );
          setLocalTree(tree);
        } finally {
          setIsLocalTreeLoading(false);
        }
        return;
      }
      const dirHandle = await pickLocalRootDirectory();
      clearLocalVaultFsPath();
      setLocalVaultFsPath('');
      setStorageMode(STORAGE_MODE_LOCAL);
      await attachLocalRootFolder(dirHandle);
    } catch (e: unknown) {
      if (e instanceof Error && e.name === 'AbortError') return;
      console.error('Local folder selection cancelled or failed:', e);
      alert(e instanceof Error ? e.message : '로컬 폴더를 열지 못했습니다.');
    }
  }, [
    attachLocalRootFolder,
    setLocalVaultFsPath,
    setLocalRootHandle,
    setStorageMode,
    setIsLocalTreeLoading,
    setLocalTree,
  ]);

  const refreshLocalTree = useCallback(async () => {
    if (isDesktopApp() && localVaultFsPath) {
      setIsLocalTreeLoading(true);
      try {
        const tree = await readTauriLocalDirectoryTree(localVaultFsPath);
        setLocalTree(tree);
      } finally {
        setIsLocalTreeLoading(false);
      }
      return;
    }
    if (!localRootHandle) return;
    setIsLocalTreeLoading(true);
    try {
      const tree = await readLocalDirectoryTree(
        localRootHandle,
        '',
        localRootHandle,
      );
      setLocalTree(tree);
    } finally {
      setIsLocalTreeLoading(false);
    }
  }, [localVaultFsPath, localRootHandle, setIsLocalTreeLoading, setLocalTree]);

  const scanActiveStorageUsageTree = useCallback(async () => {
    if (storageMode === STORAGE_MODE_LOCAL) {
      if (isDesktopApp() && localVaultFsPath) {
        return readTauriLocalDirectoryTree(localVaultFsPath);
      }
      if (!localRootHandle) throw new Error('로컬 폴더가 열려 있지 않습니다.');
      return readLocalDirectoryTree(localRootHandle, '', localRootHandle);
    }
    if (storageMode === STORAGE_MODE_WEBDAV) {
      if (!webdavReady) throw new Error('WebDAV가 연결되지 않았습니다.');
      const backend = createWebdavBackend(webdavConfig);
      return backend.listAll();
    }
    const client = getS3Client();
    if (!client || !s3Creds.bucket) throw new Error('S3가 연결되지 않았습니다.');
    const contents = await listObjectsV2(client, s3Creds.bucket, '');
    return buildS3Tree(contents);
  }, [
    storageMode,
    localRootHandle,
    localVaultFsPath,
    webdavReady,
    webdavConfig,
    getS3Client,
    s3Creds.bucket,
  ]);

  const canScanStorageUsage =
    (storageMode === STORAGE_MODE_LOCAL &&
      Boolean(localRootHandle || localVaultFsPath)) ||
    (storageMode === STORAGE_MODE_WEBDAV && webdavReady) ||
    (storageMode !== STORAGE_MODE_LOCAL &&
      storageMode !== STORAGE_MODE_WEBDAV &&
      Boolean(s3Creds.bucket));

  return useMemo(
    () => ({
      storageMode,
      setStorageMode,
      s3Tree,
      localTree,
      webdavTree,
      sessionWorkspaces,
      localRootHandle,
      localVaultFsPath,
      webdavConfig,
      setWebdavConfig,
      isLocalTreeLoading,
      isWebdavTreeLoading,
      localFolderLoadingPath,
      webdavFolderLoadingPath,
      getBackendForType,
      getS3Client,
      loadS3Files,
      refreshLocalTree,
      refreshWebdavTree,
      loadLocalFolderChildren,
      loadWebdavFolderChildren,
      openLocalFolder,
      webdavReady,
      attachLocalRootFolder,
      scanActiveStorageUsageTree,
      canScanStorageUsage,
      // Setters for orchestration / TreeOps until those domains own mutations
      setS3Tree,
      setLocalTree,
      setWebdavTree,
      setSessionWorkspaces: owned.setSessionWorkspaces,
      upsertSessionWorkspace: owned.upsertSessionWorkspace,
      removeSessionWorkspace: owned.removeSessionWorkspace,
      setLocalRootHandle,
      setLocalVaultFsPath,
      setIsLocalTreeLoading,
      setIsWebdavTreeLoading,
    }),
    [
      storageMode,
      setStorageMode,
      s3Tree,
      localTree,
      webdavTree,
      sessionWorkspaces,
      localRootHandle,
      localVaultFsPath,
      webdavConfig,
      setWebdavConfig,
      isLocalTreeLoading,
      isWebdavTreeLoading,
      localFolderLoadingPath,
      webdavFolderLoadingPath,
      getBackendForType,
      getS3Client,
      loadS3Files,
      refreshLocalTree,
      refreshWebdavTree,
      loadLocalFolderChildren,
      loadWebdavFolderChildren,
      openLocalFolder,
      webdavReady,
      attachLocalRootFolder,
      scanActiveStorageUsageTree,
      canScanStorageUsage,
      setS3Tree,
      setLocalTree,
      setWebdavTree,
      owned.setSessionWorkspaces,
      owned.upsertSessionWorkspace,
      owned.removeSessionWorkspace,
      setLocalRootHandle,
      setLocalVaultFsPath,
      setIsLocalTreeLoading,
      setIsWebdavTreeLoading,
    ],
  );
}
