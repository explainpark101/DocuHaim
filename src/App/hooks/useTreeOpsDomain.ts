// @ts-nocheck — tree ops domain actions; tighten with TreeOpsValue
import { useCallback, useMemo, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { getParentPathsToExpand } from '@/App/helpers';
import { useVault } from '@/App/hooks/useVault';
import { useFileSession } from '@/App/hooks/useFileSession';
import { useTreeOpsOwned } from '@/App/providers/AppTreeOpsStateProvider';
import { useWorkspaceTabsCtx } from '@/App/hooks/useWorkspaceTabsCtx';
import { useAuth } from '@/contexts/AuthContext';
import { useActivityIndicator, ActivityTypes } from '@/contexts/ActivityIndicatorContext';
import { findFileNodeByPath, findNodeByPath, flattenTreeToPaths } from '@/utils/s3Tree';
import { pruneNestedMovePaths, getParentFolderPath } from '@/utils/treeMove';
import { resolveNewFileDefaultParentPath } from '@/utils/newFileDefaultParentPath';
import { allocateUniqueCopyName, getTreeChildNames, treeChildNameTaken } from '@/utils/treeCopy';
import { resolveUploadDestFileName } from '@/utils/uploadNameConflict';
import { normalizePathToNfc, normalizeUnicodeNfc } from '@/utils/unicodeNfc';
import { resolveTreeDestName } from '@/utils/treeNameConflict';
import { buildFileComparePayload } from '@/utils/buildFileComparePayload';
import {
  upsertTreeTransferBusy,
  removeTreeTransferBusy,
} from '@/utils/treeTransferBusy';
import {
  createS3Client,
  listObjectsV2,
  getObjectBody,
  putObject,
  deleteObject,
  deleteObjects,
  copyObject,
} from '@/utils/s3Client';
import { resolveCreateItemPath } from '@/utils/createItemPath';
import {
  encryptEncMdContent,
  isEncMdPath,
  setEncMdPassword,
} from '@/utils/encMd';
import { createWebdavBackend } from '@/utils/storage';
import { webdavPropfindDeep } from '@/utils/webdavClient';
import { ensureDirectoryReadWritePermission } from '@/utils/localFolderStore';
import { isLocalVaultReady } from '@/utils/localVaultReady';
import { resolveLocalFileNode } from '@/utils/localFileNode';
import { buildZipBlob } from '@/utils/zipBuilder';
import {
  SESSION_STORAGE_TYPE,
  buildSessionTree,
} from '@/utils/sessionWorkspace';
import {
  isMarkdownFileName,
  zipFileNameForMarkdown,
} from '@/utils/markdownImageExport';
import { STORAGE_MODE_LOCAL } from '@/utils/storageSettings';
import { getActiveTab } from '@/utils/workspaceTabs';

export type TreeOpsBridgeDeps = {
  setOperationStatus?: (status: string) => void;
  expandPathsRef?: { current: ((type: string, paths: string[]) => void) | null };
  isMobile?: boolean;
  setSidebarOpen?: (open: boolean) => void;
  confirmAndCancelEditorImageUpload?: () => boolean;
  uploadFileInputRef?: { current: any };
  uploadFolderInputRef?: { current: any };
  setUploadTarget?: (t: any) => void;
  setAddToNoteSelectPath?: (p: any) => void;
  setSaveSessionToNoteSelectPath?: (p: any) => void;
  requestEncMdPassword?: (opts?: any) => Promise<string>;
  renameS3File?: (...args: any[]) => Promise<any>;
  renameLocalFile?: (...args: any[]) => Promise<any>;
  applyWorkspaceFilePathRetarget?: (...args: any[]) => void;
  applyWorkspaceFolderPathRetarget?: (...args: any[]) => void;
  readBackendBytes?: (storageType: string, path: string) => Promise<Uint8Array>;
  downloadMarkdownImageZip?: (...args: any[]) => Promise<boolean>;
  chatSurfaceActive?: boolean;
  setDownloadResultModal?: (modal: any) => void;
};

/**
 * Owns tree CRUD / DnD / select / create-upload request handlers.
 * Bridge deps inject orchestration-only pieces (modals, chrome, rename helpers).
 */
export function useTreeOpsDomain({
  bridgeDepsRef,
}: {
  bridgeDepsRef: { current: TreeOpsBridgeDeps };
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { addIndicator, removeIndicator, updateIndicator } = useActivityIndicator();
  const { s3Creds } = useAuth();

  const {
    storageMode,
    s3Tree,
    localTree,
    webdavTree,
    sessionWorkspace,
    localRootHandle,
    localVaultFsPath,
    webdavConfig,
    getBackendForType,
    getS3Client,
    loadS3Files,
    refreshLocalTree,
    refreshWebdavTree,
  } = useVault();

  const {
    currentFile,
    editorContent,
    currentFileRef,
    selectFileRaw,
    saveCurrentMarkdownBeforeSwitch,
    commitOpenFile,
    applyOpenFileIdentityChange,
  } = useFileSession();

  const {
    setSelectedIds,
    setCreateModalOpen,
    setCreateModalContext,
    createModalContext,
    setIsCreateSubmitting,
    setDropTarget,
    setTreeNameConflict,
    setTreeTransferBusy,
    setMoveFolderTarget,
    setMoveModalSelectPath,
  } = useTreeOpsOwned();

  const {
    state: workspaceTabs,
    workspaceTabsEnabled,
  } = useWorkspaceTabsCtx();
  const activeWorkspaceTab = getActiveTab(workspaceTabs);

  const lastSelectedIdRef = useRef(null);
  const treeNameConflictResolverRef = useRef(null);
  const selectFileRawRef = useRef(selectFileRaw);
  selectFileRawRef.current = selectFileRaw;

  const bridge = () => bridgeDepsRef.current;
  const setOperationStatus = (...args) => bridge().setOperationStatus?.(...args);
  const expandPaths = (type, paths) => bridge().expandPathsRef?.current?.(type, paths);

  const triggerBlobDownload = useCallback((blob, fileName) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = normalizeUnicodeNfc(String(fileName || 'download'));
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  const isAndroidBrowser = useCallback(() => {
    if (typeof navigator === 'undefined') return false;
    return /Android/i.test(navigator.userAgent || '');
  }, []);

  const openUnsupportedFolderDownloadModal = useCallback(() => {
    bridge().setDownloadResultModal?.({
      isOpen: true,
      title: '폴더 다운로드',
      message: '이 브라우저에서 폴더 다운로드는 지원하지 않습니다',
    });
  }, [bridgeDepsRef]);

  const downloadFolderAsZip = useCallback(async (storageType, node, folderName, indicatorId) => {
    const entries = [];
    const nfcFolderName = normalizeUnicodeNfc(String(folderName || 'folder'));

    if (storageType === 's3') {
      const client = createS3Client(s3Creds);
      if (!client) throw new Error('S3 클라이언트를 초기화하지 못했습니다.');
      const bucket = s3Creds.bucket;
      const prefix = node.path || '';
      const contents = await listObjectsV2(client, bucket, prefix);
      const fileObjects = (contents || []).filter((item) => item.Key && !item.Key.endsWith('/'));
      const totalFiles = fileObjects.length;
      let completed = 0;
      for (const { Key } of fileObjects) {
        const relativeKey = prefix ? Key.slice(prefix.length) : Key;
        if (!relativeKey) continue;
        const { body } = await getObjectBody(client, bucket, Key);
        entries.push({
          path: normalizePathToNfc(`${nfcFolderName}/${relativeKey}`.replace(/\\/g, '/')),
          data: body,
        });
        completed += 1;
        updateIndicator(indicatorId, {
          progress: totalFiles ? Math.min(100, Math.round((completed / totalFiles) * 100)) : 100,
          detail: `${completed}/${totalFiles}`,
        });
      }
    } else if (storageType === 'local') {
      const sourceDirHandle = node.handle || (node.path === '' ? localRootHandle : null);
      if (!sourceDirHandle) throw new Error('원본 폴더 핸들을 찾을 수 없습니다.');
      const collectLocalFiles = async (dirHandle, basePath = '') => {
        for await (const entry of dirHandle.values()) {
          if (entry.kind === 'file') {
            const file = await entry.getFile();
            entries.push({
              path: normalizePathToNfc(
                `${nfcFolderName}/${basePath}${entry.name}`.replace(/\\/g, '/'),
              ),
              data: new Uint8Array(await file.arrayBuffer()),
            });
          } else if (entry.kind === 'directory') {
            await collectLocalFiles(
              entry,
              `${basePath}${normalizeUnicodeNfc(entry.name)}/`,
            );
          }
        }
      };
      await collectLocalFiles(sourceDirHandle);
      updateIndicator(indicatorId, { progress: 100 });
    }

    const zipBlob = await buildZipBlob(entries);
    triggerBlobDownload(zipBlob, `${nfcFolderName}.zip`);
  }, [localRootHandle, s3Creds, triggerBlobDownload, updateIndicator]);

  const beginTreeTransferBusy = useCallback((entry) => {
    setTreeTransferBusy((prev) => upsertTreeTransferBusy(prev, entry));
  }, []);

  const endTreeTransferBusy = useCallback((storageType, path) => {
    setTreeTransferBusy((prev) => removeTreeTransferBusy(prev, storageType, path));
  }, []);

  /** Reload editor when an open file was overwritten by move/copy into its path. */
  const reloadOpenFileIfPath = useCallback(
    async (storageType, filePath) => {
      const cur = currentFileRef.current;
      if (!cur || !filePath) return;
      if (cur.type !== storageType || cur.id !== filePath) return;
      const tree =
        storageType === 's3'
          ? s3Tree
          : storageType === 'webdav'
            ? webdavTree
            : localTree;
      let node = findNodeByPath(tree, filePath) || findFileNodeByPath(tree, filePath);
      if ((!node || node.type !== 'file') && storageType === 'local') {
        node = await resolveLocalFileNode(localRootHandle, filePath);
      }
      if (!node || node.type !== 'file') {
        node = {
          path: filePath,
          id: filePath,
          name: String(filePath).split('/').filter(Boolean).pop() || 'file',
          type: 'file',
        };
      }
      await selectFileRawRef.current?.(storageType, node, { skipNavigate: true });
    },
    [s3Tree, webdavTree, localTree, localRootHandle],
  );

  const moveS3FileToFolder = async (file, destFolderPath, destFileName) => {
    const client = getS3Client();
    if (!client) throw new Error('S3 클라이언트를 초기화하지 못했습니다.');
    const bucket = s3Creds.bucket;
    const fileName = destFileName || file.name;
    const destPrefix = destFolderPath || '';
    const newKey = `${destPrefix}${fileName}`;
    const oldKey = file.id;
    if (newKey === oldKey) return file;

    await copyObject(client, bucket, oldKey, newKey);
    await deleteObject(client, bucket, oldKey);

    await loadS3Files();

    return { ...file, id: newKey, name: fileName };
  };

  const moveLocalFileToFolder = async (file, destDirHandle, destDirPath, destFileName) => {
    const sourceDir = file.parentHandle || localRootHandle;
    if (!sourceDir) throw new Error('원본 폴더를 찾을 수 없습니다.');
    if (!destDirHandle) throw new Error('대상 폴더를 찾을 수 없습니다.');

    const fileName = destFileName || file.name;
    const oldPath = file.id ?? file.path;
    const newPath = `${destDirPath || ''}${fileName}`;
    if (!oldPath) throw new Error('원본 파일 경로를 찾을 수 없습니다.');
    if (newPath === oldPath) return file;

    const srcFile = await file.handle.getFile();
    const newFileHandle = await destDirHandle.getFileHandle(fileName, { create: true });
    const writable = await newFileHandle.createWritable();
    await writable.write(await srcFile.arrayBuffer());
    await writable.close();

    const oldName = file.name || String(oldPath).split('/').filter(Boolean).pop();
    if (oldName && (getParentFolderPath(oldPath) !== (destDirPath || '') || oldName !== fileName)) {
      await sourceDir.removeEntry(oldName, { recursive: false });
    }

    await refreshLocalTree();

    return {
      ...file,
      id: newPath,
      name: fileName,
      handle: newFileHandle,
      parentHandle: destDirHandle,
      size: typeof srcFile.size === 'number' ? srcFile.size : file.size ?? null,
    };
  };

  const moveS3FolderToFolder = async (folderNode, destParentPath, newFolderName) => {
    const client = getS3Client();
    if (!client) throw new Error('S3 클라이언트를 초기화하지 못했습니다.');
    const bucket = s3Creds.bucket;
    const prefix = folderNode.path;
    if (!prefix) return;

    const folderName = newFolderName ?? folderNode.name;
    const destPrefix = destParentPath || '';
    const newFolderPrefix = `${destPrefix}${folderName}/`;
    if (newFolderPrefix === prefix) return;
    if (newFolderPrefix.startsWith(prefix) || prefix.startsWith(newFolderPrefix)) {
      throw new Error('폴더를 자기 자신 또는 하위 폴더 안으로 이동할 수 없습니다.');
    }

    const contents = await listObjectsV2(client, bucket, prefix);
    if (contents.length === 0) return;

    const keysToDelete = [];
    for (const { Key } of contents) {
      const relative = Key.slice(prefix.length);
      const newKey = newFolderPrefix + relative;
      if (newKey === Key) continue;
      await copyObject(client, bucket, Key, newKey);
      keysToDelete.push({ Key });
    }
    if (keysToDelete.length > 0) {
      await deleteObjects(client, bucket, keysToDelete);
    }
    await loadS3Files();
  };

  const moveLocalFolderToFolder = async (folderNode, destDirHandle, destDirPath, newFolderName) => {
    const sourceDir = folderNode.parentHandle || localRootHandle;
    if (!sourceDir) throw new Error('원본 폴더를 찾을 수 없습니다.');
    if (!destDirHandle) throw new Error('대상 폴더를 찾을 수 없습니다.');
    const nameToUse = newFolderName != null ? newFolderName : folderNode.name;
    const destFolderPath = `${destDirPath || ''}${nameToUse}/`;
    if (destFolderPath === folderNode.path) return;
    if (
      folderNode.path &&
      (destFolderPath.startsWith(folderNode.path) || folderNode.path.startsWith(destFolderPath))
    ) {
      throw new Error('폴더를 자기 자신 또는 하위 폴더 안으로 이동할 수 없습니다.');
    }

    const newFolderHandle = await destDirHandle.getDirectoryHandle(nameToUse, { create: true });
    const copyDirRecursive = async (srcHandle, destHandle) => {
      for await (const entry of srcHandle.values()) {
        if (entry.kind === 'file') {
          const file = await entry.getFile();
          const newFileHandle = await destHandle.getFileHandle(entry.name, { create: true });
          const writable = await newFileHandle.createWritable();
          await writable.write(await file.arrayBuffer());
          await writable.close();
        } else if (entry.kind === 'directory') {
          const newDirHandle = await destHandle.getDirectoryHandle(entry.name, { create: true });
          await copyDirRecursive(entry, newDirHandle);
        }
      }
    };
    await copyDirRecursive(folderNode.handle, newFolderHandle);
    await sourceDir.removeEntry(folderNode.name, { recursive: true });
    await refreshLocalTree();
  };

  const moveWebdavFileToFolder = async (file, destFolderPath, destFileName) => {
    const backend = createWebdavBackend(webdavConfig);
    const fileName = destFileName || file.name;
    const destPrefix = destFolderPath || '';
    const newKey = `${destPrefix}${fileName}`;
    const oldKey = file.id;
    if (newKey === oldKey) return file;
    await backend.move(oldKey, newKey);
    await refreshWebdavTree();
    return { ...file, id: newKey, name: fileName };
  };

  const moveWebdavFolderToFolder = async (folderNode, destParentPath, newFolderName) => {
    const backend = createWebdavBackend(webdavConfig);
    const prefix = folderNode.path;
    if (!prefix) return;
    const folderName = newFolderName ?? folderNode.name;
    const destPrefix = `${destParentPath || ''}${folderName}/`;
    if (destPrefix === prefix) return;
    if (destPrefix.startsWith(prefix) || prefix.startsWith(destPrefix)) {
      throw new Error('폴더를 자기 자신 또는 하위 폴더 안으로 이동할 수 없습니다.');
    }
    const entries = await webdavPropfindDeep(webdavConfig, prefix);
    const fileKeys = entries
      .filter((e) => e.key && !e.isCollection && e.key !== prefix)
      .map((e) => e.key)
      .sort((a, b) => b.length - a.length);
    for (const key of fileKeys) {
      const relative = key.startsWith(prefix) ? key.slice(prefix.length) : key;
      await backend.move(key, destPrefix + relative);
    }
    try {
      await backend.deletePrefix(prefix);
    } catch (_) {
      /* folder marker may already be gone */
    }
    await refreshWebdavTree();
  };

  const copyS3FileToFolder = async (file, destFolderPath, destFileName) => {
    const client = getS3Client();
    if (!client) throw new Error('S3 클라이언트를 초기화하지 못했습니다.');
    const bucket = s3Creds.bucket;
    const fileName = destFileName || file.name;
    const newKey = `${destFolderPath || ''}${fileName}`;
    const oldKey = file.id;
    if (newKey === oldKey) return file;
    await copyObject(client, bucket, oldKey, newKey);
    await loadS3Files();
    return { ...file, id: newKey };
  };

  const copyLocalFileToFolder = async (file, destDirHandle, destDirPath, destFileName) => {
    if (!destDirHandle) throw new Error('대상 폴더를 찾을 수 없습니다.');
    if (!file.handle) throw new Error('원본 파일을 찾을 수 없습니다.');
    const fileName = destFileName || file.name;
    const oldPath = file.id ?? file.path;
    const newPath = `${destDirPath || ''}${fileName}`;
    if (!oldPath) throw new Error('원본 파일 경로를 찾을 수 없습니다.');
    if (newPath === oldPath) return file;

    const srcFile = await file.handle.getFile();
    const newFileHandle = await destDirHandle.getFileHandle(fileName, { create: true });
    const writable = await newFileHandle.createWritable();
    await writable.write(await srcFile.arrayBuffer());
    await writable.close();
    await refreshLocalTree();
    return {
      ...file,
      id: newPath,
      handle: newFileHandle,
      parentHandle: destDirHandle,
      size: typeof srcFile.size === 'number' ? srcFile.size : file.size ?? null,
    };
  };

  const copyS3FolderToFolder = async (folderNode, destParentPath, newFolderName) => {
    const client = getS3Client();
    if (!client) throw new Error('S3 클라이언트를 초기화하지 못했습니다.');
    const bucket = s3Creds.bucket;
    const prefix = folderNode.path;
    if (!prefix) return;
    const folderName = newFolderName ?? folderNode.name;
    const newFolderPrefix = `${destParentPath || ''}${folderName}/`;
    if (newFolderPrefix === prefix) return;
    if (newFolderPrefix.startsWith(prefix) || prefix.startsWith(newFolderPrefix)) {
      throw new Error('폴더를 자기 자신 또는 하위 폴더 안으로 복제할 수 없습니다.');
    }
    await putObject(client, { Bucket: bucket, Key: newFolderPrefix, Body: '' });
    const contents = await listObjectsV2(client, bucket, prefix);
    for (const { Key } of contents) {
      const relative = Key.slice(prefix.length);
      const newKey = newFolderPrefix + relative;
      if (!relative || newKey === Key) continue;
      await copyObject(client, bucket, Key, newKey);
    }
    await loadS3Files();
  };

  const copyLocalFolderToFolder = async (folderNode, destDirHandle, destDirPath, newFolderName) => {
    if (!destDirHandle) throw new Error('대상 폴더를 찾을 수 없습니다.');
    if (!folderNode.handle) throw new Error('원본 폴더를 찾을 수 없습니다.');
    const nameToUse = newFolderName != null ? newFolderName : folderNode.name;
    const destFolderPath = `${destDirPath || ''}${nameToUse}/`;
    if (destFolderPath === folderNode.path) return;
    if (
      folderNode.path &&
      (destFolderPath.startsWith(folderNode.path) || folderNode.path.startsWith(destFolderPath))
    ) {
      throw new Error('폴더를 자기 자신 또는 하위 폴더 안으로 복제할 수 없습니다.');
    }
    const newFolderHandle = await destDirHandle.getDirectoryHandle(nameToUse, { create: true });
    const copyDirRecursive = async (srcHandle, destHandle) => {
      for await (const entry of srcHandle.values()) {
        if (entry.kind === 'file') {
          const file = await entry.getFile();
          const newFileHandle = await destHandle.getFileHandle(entry.name, { create: true });
          const writable = await newFileHandle.createWritable();
          await writable.write(await file.arrayBuffer());
          await writable.close();
        } else if (entry.kind === 'directory') {
          const newDirHandle = await destHandle.getDirectoryHandle(entry.name, { create: true });
          await copyDirRecursive(entry, newDirHandle);
        }
      }
    };
    await copyDirRecursive(folderNode.handle, newFolderHandle);
    await refreshLocalTree();
  };

  const copyWebdavFileToFolder = async (file, destFolderPath, destFileName) => {
    const backend = createWebdavBackend(webdavConfig);
    const fileName = destFileName || file.name;
    const newKey = `${destFolderPath || ''}${fileName}`;
    const oldKey = file.id;
    if (newKey === oldKey) return file;
    await backend.copy(oldKey, newKey);
    await refreshWebdavTree();
    return { ...file, id: newKey };
  };

  const copyWebdavFolderToFolder = async (folderNode, destParentPath, newFolderName) => {
    const backend = createWebdavBackend(webdavConfig);
    const prefix = folderNode.path;
    if (!prefix) return;
    const folderName = newFolderName ?? folderNode.name;
    const destPrefix = `${destParentPath || ''}${folderName}/`;
    if (destPrefix === prefix) return;
    if (destPrefix.startsWith(prefix) || prefix.startsWith(destPrefix)) {
      throw new Error('폴더를 자기 자신 또는 하위 폴더 안으로 복제할 수 없습니다.');
    }
    try {
      await backend.mkdir(destPrefix);
    } catch {
      /* destination may already exist or be created implicitly */
    }
    const entries = await webdavPropfindDeep(webdavConfig, prefix);
    const fileKeys = entries
      .filter((e) => e.key && !e.isCollection && e.key !== prefix)
      .map((e) => e.key)
      .sort((a, b) => a.length - b.length);
    for (const key of fileKeys) {
      const relative = key.startsWith(prefix) ? key.slice(prefix.length) : key;
      await backend.copy(key, destPrefix + relative);
    }
    await refreshWebdavTree();
  };

  const toSelectKey = (storageType, path) => `${storageType}:${path}`;

  const handleTreeNodeSelect = useCallback(
    async (storageType, node, modifiers = {}) => {
      const { ctrlKey = false, metaKey = false, shiftKey = false } = modifiers;
      const isRange = shiftKey;

      const tree =
        storageType === 's3'
          ? s3Tree
          : storageType === 'webdav'
            ? webdavTree
            : storageType === SESSION_STORAGE_TYPE
              ? sessionWorkspace
                ? buildSessionTree(sessionWorkspace)
                : []
              : localTree;
      const flatPaths = flattenTreeToPaths(tree);
      const path = node.path;
      const key = toSelectKey(storageType, path);

      if (isRange && lastSelectedIdRef.current != null) {
        const lastKey = lastSelectedIdRef.current;
        const colonIdx = lastKey.indexOf(':');
        const lastType = colonIdx >= 0 ? lastKey.slice(0, colonIdx) : storageType;
        const lastPath = colonIdx >= 0 ? lastKey.slice(colonIdx + 1) : lastKey;
        if (lastType === storageType) {
          const anchorIdx = flatPaths.indexOf(lastPath);
          const clickIdx = flatPaths.indexOf(path);
          if (anchorIdx >= 0 && clickIdx >= 0) {
            setSelectedIds((prev) => {
              const next = new Set(prev);
              const [lo, hi] = anchorIdx <= clickIdx ? [anchorIdx, clickIdx] : [clickIdx, anchorIdx];
              for (let i = lo; i <= hi; i++) {
                next.add(toSelectKey(storageType, flatPaths[i]));
              }
              return next;
            });
            lastSelectedIdRef.current = key;
            if (node.type === 'file') {
              if (!bridge().confirmAndCancelEditorImageUpload?.()) return;
              if (bridge().isMobile) bridge().setSidebarOpen?.(false);
              saveCurrentMarkdownBeforeSwitch(storageType, node);
              await selectFileRaw(storageType, node);
            }
            return;
          }
        }
      }

      if (ctrlKey || metaKey) {
        setSelectedIds((prev) => {
          const next = new Set(prev);
          if (next.has(key)) next.delete(key);
          else next.add(key);
          return next;
        });
        lastSelectedIdRef.current = key;
      } else {
        setSelectedIds(new Set([key]));
        lastSelectedIdRef.current = key;
      }

      if (node.type === 'file') {
        if (!bridge().confirmAndCancelEditorImageUpload?.()) return;
        if (bridge().isMobile) bridge().setSidebarOpen?.(false);
        saveCurrentMarkdownBeforeSwitch(storageType, node);
        await selectFileRaw(storageType, node);
      }
    },
    [s3Tree, localTree, webdavTree, sessionWorkspace, selectFileRaw, saveCurrentMarkdownBeforeSwitch, bridgeDepsRef]
  );

  const handleDownloadNode = async (storageType, node) => {
    const downloadedName = normalizeUnicodeNfc(
      node?.name || node?.path?.split('/').filter(Boolean).pop() || (node?.type === 'folder' ? '폴더' : '파일'),
    );
    const showDownloadCompleteModal = (title, message) => {
      bridge().setDownloadResultModal?.({
        isOpen: true,
        title,
        message,
      });
    };

    if (node.type === 'folder') {
      const shouldUseZipFallback = isAndroidBrowser() || !('showDirectoryPicker' in window);
      const ensureDirReadWritePermission = async (dirHandle) => {
        const ok = await ensureDirectoryReadWritePermission(dirHandle);
        if (!ok) {
          throw new Error('선택한 폴더에 쓰기 권한이 필요합니다.');
        }
      };
      try {
        const fallbackRootName = storageType === 's3' ? 's3-root' : 'local-root';
        const folderName = normalizeUnicodeNfc((node.name || '').trim() || fallbackRootName);
        const indicatorId = addIndicator({
          type: ActivityTypes.DOWNLOAD,
          label: `폴더 다운로드 중: ${folderName}`,
        });

        try {
          if (shouldUseZipFallback) {
            await downloadFolderAsZip(storageType, node, folderName, indicatorId);
          } else {
            const selectedDirHandle = await window.showDirectoryPicker({ mode: 'readwrite' });
            await ensureDirReadWritePermission(selectedDirHandle);
            const targetRootDirHandle = await selectedDirHandle.getDirectoryHandle(folderName, { create: true });
            await ensureDirReadWritePermission(targetRootDirHandle);

            if (storageType === 's3') {
              const client = getS3Client();
              if (!client) throw new Error('S3 클라이언트를 초기화하지 못했습니다.');
              const bucket = s3Creds.bucket;
              const prefix = node.path || '';
              const contents = await listObjectsV2(client, bucket, prefix);
              const fileObjects = (contents || []).filter((item) => item.Key && !item.Key.endsWith('/'));
              const totalFiles = fileObjects.length;
              if (totalFiles === 0) {
                setOperationStatus(`다운로드 완료: ${folderName} (빈 폴더)`);
                showDownloadCompleteModal('다운로드 완료', `폴더 다운로드가 완료되었습니다.\n대상: ${folderName}`);
                return;
              }

              let completed = 0;
              for (const { Key } of fileObjects) {
                const relativeKey = prefix ? Key.slice(prefix.length) : Key;
                if (!relativeKey) continue;

                const segments = normalizePathToNfc(relativeKey).split('/').filter(Boolean);
                if (segments.length === 0) continue;

                const fileName = segments.pop();
                let currentDirHandle = targetRootDirHandle;
                for (const seg of segments) {
                  currentDirHandle = await currentDirHandle.getDirectoryHandle(seg, { create: true });
                }

                const { body } = await getObjectBody(client, bucket, Key);
                const fileHandle = await currentDirHandle.getFileHandle(fileName, { create: true });
                const writable = await fileHandle.createWritable();
                await writable.write(body);
                await writable.close();

                completed += 1;
                updateIndicator(indicatorId, {
                  progress: Math.min(100, Math.round((completed / totalFiles) * 100)),
                  detail: `${completed}/${totalFiles}`,
                });
              }
            } else if (storageType === 'local') {
              const sourceDirHandle = node.handle || (node.path === '' ? localRootHandle : null);
              if (!sourceDirHandle) throw new Error('원본 폴더 핸들을 찾을 수 없습니다.');

              const copyLocalDirRecursive = async (srcDirHandle, destDirHandle) => {
                for await (const entry of srcDirHandle.values()) {
                  const nfcName = normalizeUnicodeNfc(entry.name);
                  if (entry.kind === 'file') {
                    const file = await entry.getFile();
                    const destFileHandle = await destDirHandle.getFileHandle(nfcName, { create: true });
                    const writable = await destFileHandle.createWritable();
                    await writable.write(await file.arrayBuffer());
                    await writable.close();
                  } else if (entry.kind === 'directory') {
                    const childDestDir = await destDirHandle.getDirectoryHandle(nfcName, { create: true });
                    await copyLocalDirRecursive(entry, childDestDir);
                  }
                }
              };

              await copyLocalDirRecursive(sourceDirHandle, targetRootDirHandle);
              updateIndicator(indicatorId, { progress: 100 });
            }
          }

          setOperationStatus(`폴더 다운로드 완료: ${folderName}`);
          const fallbackNotice = shouldUseZipFallback
            ? '\n\n브라우저 제한으로 폴더를 ZIP 파일로 대체 다운로드했습니다.'
            : '';
          showDownloadCompleteModal('다운로드 완료', `폴더 다운로드가 완료되었습니다.\n대상: ${folderName}${fallbackNotice}`);
        } finally {
          removeIndicator(indicatorId);
        }
      } catch (e) {
        if (e?.name === 'AbortError') return;
        const message = String(e?.message || e || '');
        if (message.toLowerCase().includes('state chached') || message.toLowerCase().includes('state cached')) {
          try {
            const fallbackRootName = storageType === 's3' ? 's3-root' : 'local-root';
            const folderName = normalizeUnicodeNfc((node.name || '').trim() || fallbackRootName);
            const indicatorId = addIndicator({
              type: ActivityTypes.DOWNLOAD,
              label: `폴더 다운로드 중: ${folderName}`,
            });
            try {
              await downloadFolderAsZip(storageType, node, folderName, indicatorId);
              setOperationStatus(`폴더 다운로드 완료: ${folderName}`);
              showDownloadCompleteModal(
                '다운로드 완료',
                `폴더 다운로드가 완료되었습니다.\n대상: ${folderName}\n\n브라우저 제한으로 폴더를 ZIP 파일로 대체 다운로드했습니다.`
              );
            } finally {
              removeIndicator(indicatorId);
            }
            return;
          } catch (_) {
            openUnsupportedFolderDownloadModal();
            return;
          }
        }
        console.error('폴더 다운로드 실패:', e);
        alert('폴더 다운로드에 실패했습니다: ' + (e?.message || e));
      }
      return;
    }
    const fileName = normalizeUnicodeNfc(
      node.name || node.path?.split('/').filter(Boolean).pop() || 'download',
    );
    try {
      if (isMarkdownFileName(fileName)) {
        const backend = getBackendForType(storageType);
        const { text } = await backend.readText(node.path);
        const bundled = await bridge().downloadMarkdownImageZip?.(storageType, node.path, fileName, text);
        if (bundled) {
          const zipName = zipFileNameForMarkdown(fileName);
          setOperationStatus(`다운로드: ${zipName}`);
          showDownloadCompleteModal('다운로드 완료', `파일 다운로드가 완료되었습니다.\n대상: ${zipName}`);
          return;
        }
        triggerBlobDownload(new Blob([text], { type: 'text/markdown;charset=utf-8' }), fileName);
        setOperationStatus(`다운로드: ${downloadedName}`);
        showDownloadCompleteModal('다운로드 완료', `파일 다운로드가 완료되었습니다.\n대상: ${downloadedName}`);
        return;
      }

      if (storageType === 's3') {
        const body = await bridge().readBackendBytes?.(storageType, node.path);
        triggerBlobDownload(new Blob([body]), fileName);
        setOperationStatus(`다운로드: ${downloadedName}`);
        showDownloadCompleteModal('다운로드 완료', `파일 다운로드가 완료되었습니다.\n대상: ${downloadedName}`);
        return;
      }
      if (storageType === 'local' && node.handle) {
        const file = await node.handle.getFile();
        triggerBlobDownload(file, normalizeUnicodeNfc(node.name || file.name));
        setOperationStatus(`다운로드: ${downloadedName}`);
        showDownloadCompleteModal('다운로드 완료', `파일 다운로드가 완료되었습니다.\n대상: ${downloadedName}`);
        return;
      }
      if (storageType === 'webdav') {
        const body = await bridge().readBackendBytes?.(storageType, node.path);
        triggerBlobDownload(new Blob([body]), fileName);
        setOperationStatus(`다운로드: ${downloadedName}`);
        showDownloadCompleteModal('다운로드 완료', `파일 다운로드가 완료되었습니다.\n대상: ${downloadedName}`);
      }
    } catch (e) {
      console.error('파일 다운로드 실패:', e);
      alert('파일 다운로드에 실패했습니다: ' + (e?.message || e));
    }
  };

  const getParentPath = (path) => {
    const trimmed = (path || '').replace(/\/$/, '');
    const parts = trimmed.split('/').filter(Boolean);
    parts.pop();
    return parts.length ? parts.join('/') + '/' : '';
  };

  const handleDuplicateNode = async (storageType, node) => {
    const parentPath = getParentPath(node.path);
    const copySuffix = ' (복사본)';
    beginTreeTransferBusy({
      storageType,
      path: node.path,
      nodeType: node.type === 'folder' ? 'folder' : 'file',
      destFolderPath: parentPath || '',
      action: 'copy',
    });
    try {
      if (node.type === 'file') {
        if (storageType === 's3') {
          const client = getS3Client();
          if (!client) throw new Error('S3 클라이언트를 초기화하지 못했습니다.');
          const lastDot = (node.name || '').lastIndexOf('.');
          const baseName = lastDot > 0 ? node.name.slice(0, lastDot) : node.name || 'file';
          const ext = lastDot > 0 ? node.name.slice(lastDot) : '.md';
          let newName = baseName + copySuffix + ext;
          let newPath = parentPath + newName;
          const bucket = s3Creds.bucket;
          const contents = await listObjectsV2(client, bucket, parentPath);
          const existingNames = new Set((contents || []).map((c) => c.Key?.replace(parentPath, '').replace(/\/$/, '')).filter(Boolean));
          let counter = 1;
          while (existingNames.has(newName)) {
            newName = baseName + copySuffix + ` (${counter})` + ext;
            newPath = parentPath + newName;
            counter++;
          }
          const { body } = await getObjectBody(client, bucket, node.path);
          await putObject(client, { Bucket: bucket, Key: newPath, Body: body });
          loadS3Files();
          const parentPaths = parentPath ? [parentPath.replace(/\/$/, '')].filter(Boolean).map((p) => p + '/') : [];
          expandPaths(storageType, parentPaths);
          setOperationStatus(`복제 완료: ${newName}`);
        } else if (storageType === 'local') {
          const pHandle = node.parentHandle || localRootHandle;
          if (!pHandle) throw new Error('루트 폴더를 먼저 열어주세요.');
          const lastDot = (node.name || '').lastIndexOf('.');
          const baseName = lastDot > 0 ? node.name.slice(0, lastDot) : node.name || 'file';
          const ext = lastDot > 0 ? node.name.slice(lastDot) : '.md';
          let newName = baseName + copySuffix + ext;
          try {
            await pHandle.getFileHandle(newName);
            let counter = 1;
            while (true) {
              newName = baseName + copySuffix + ` (${counter})` + ext;
              try {
                await pHandle.getFileHandle(newName);
                counter++;
              } catch {
                break;
              }
            }
          } catch {
            // name is free
          }
          const file = await node.handle.getFile();
          const newFileHandle = await pHandle.getFileHandle(newName, { create: true });
          const writable = await newFileHandle.createWritable();
          await writable.write(await file.arrayBuffer());
          await writable.close();
          await refreshLocalTree();
          setOperationStatus(`복제 완료: ${newName}`);
        }
      } else if (node.type === 'folder') {
        if (storageType === 's3') {
          const client = getS3Client();
          if (!client) throw new Error('S3 클라이언트를 초기화하지 못했습니다.');
          const bucket = s3Creds.bucket;
          const prefix = node.path;
          const folderName = (node.name || '').replace(/\/$/, '');
          let destFolderName = folderName + copySuffix;
          const parentContents = await listObjectsV2(client, bucket, parentPath);
          const existingDirs = new Set(
            (parentContents || [])
              .filter((c) => c.Key?.endsWith('/'))
              .map((c) => c.Key?.slice(parentPath.length).split('/')[0])
              .filter(Boolean)
          );
          let counter = 1;
          while (existingDirs.has(destFolderName)) {
            destFolderName = folderName + copySuffix + ` (${counter})`;
            counter++;
          }
          const destPrefix = parentPath + destFolderName + '/';
          await putObject(client, { Bucket: bucket, Key: destPrefix, Body: '' });
          const contents = await listObjectsV2(client, bucket, prefix);
          for (const { Key } of contents) {
            const relative = Key.slice(prefix.length);
            const newKey = destPrefix + relative;
            await copyObject(client, bucket, Key, newKey);
          }
          loadS3Files();
          expandPaths(storageType, [parentPath.replace(/\/$/, '')].filter(Boolean).map((p) => p + '/'));
          setOperationStatus(`폴더 복제 완료: ${destFolderName}`);
        } else if (storageType === 'local') {
          const pHandle = node.parentHandle || localRootHandle;
          if (!pHandle) throw new Error('루트 폴더를 먼저 열어주세요.');
          const folderName = node.name || 'folder';
          let destFolderName = folderName + copySuffix;
          try {
            await pHandle.getDirectoryHandle(destFolderName);
            let counter = 1;
            while (true) {
              destFolderName = folderName + copySuffix + ` (${counter})`;
              try {
                await pHandle.getDirectoryHandle(destFolderName);
                counter++;
              } catch {
                break;
              }
            }
          } catch {
            // name is free
          }
          const newDirHandle = await pHandle.getDirectoryHandle(destFolderName, { create: true });
          const copyDirRecursive = async (srcHandle, destHandle) => {
            for await (const entry of srcHandle.values()) {
              if (entry.kind === 'file') {
                const file = await entry.getFile();
                const newFileHandle = await destHandle.getFileHandle(entry.name, { create: true });
                const writable = await newFileHandle.createWritable();
                await writable.write(await file.arrayBuffer());
                await writable.close();
              } else if (entry.kind === 'directory') {
                const newSubDir = await destHandle.getDirectoryHandle(entry.name, { create: true });
                await copyDirRecursive(entry, newSubDir);
              }
            }
          };
          await copyDirRecursive(node.handle, newDirHandle);
          await refreshLocalTree();
          setOperationStatus(`폴더 복제 완료: ${destFolderName}`);
        }
      }
    } catch (e) {
      alert('복제 실패: ' + (e?.message || e));
    } finally {
      endTreeTransferBusy(storageType, node.path);
    }
  };

  const createItem = async (storageType, parentPath, parentDirHandle, type, nameInput) => {
    const resolved = resolveCreateItemPath(parentPath, nameInput, type === 'folder' ? 'folder' : 'file');
    if (!resolved.ok) {
      if (resolved.reason === 'outside-root') {
        throw new Error('루트 밖으로 나갈 수 없습니다.');
      }
      return;
    }

    const { path: newPath, parentDirPath, baseName: finalName } = resolved;
    const expandParent = parentDirPath || parentPath || '';

    let initialBody = '';
    let openContent = '';
    if (type !== 'folder' && isEncMdPath(newPath)) {
      let password;
      try {
        password = await bridge().requestEncMdPassword?.({
          title: '암호화해서 만들기',
          message:
            '이 노트를 암호화할 비밀번호를 입력하세요.\n같은 비밀번호로만 다시 열 수 있습니다.',
          confirmLabel: '암호화 생성',
        });
      } catch {
        return;
      }
      initialBody = await encryptEncMdContent('', password);
      setEncMdPassword(newPath, password);
      openContent = '';
    }

    const openCreatedFile = (file) => {
      const content =
        typeof file.content === 'string' ? file.content : openContent;
      if (commitOpenFile({ ...file, ...(isEncMdPath(newPath) ? { encMd: true } : {}) }, content)) {
        navigate(`/view/${file.id}`);
      }
    };

    const ensureLocalDir = async (dirPath) => {
      if (!localRootHandle) throw new Error('루트 폴더를 먼저 열어주세요.');
      const parts = String(dirPath || '')
        .replace(/\/$/, '')
        .split('/')
        .filter(Boolean);
      // Prefer walking from vault root so `..` / nested paths stay consistent.
      let dir = localRootHandle;
      for (const part of parts) {
        dir = await dir.getDirectoryHandle(part, { create: true });
      }
      return dir;
    };

    try {
      if (storageType === 's3') {
        const client = getS3Client();
        if (!client) throw new Error('S3 클라이언트를 초기화하지 못했습니다.');
        if (type === 'folder') {
          await putObject(client, { Bucket: s3Creds.bucket, Key: newPath, Body: '' });
          loadS3Files();
          const parentPaths = getParentPathsToExpand(expandParent);
          expandPaths(storageType, parentPaths);
        } else {
          await putObject(client, { Bucket: s3Creds.bucket, Key: newPath, Body: initialBody });
          loadS3Files();
          const parentPaths = getParentPathsToExpand(expandParent);
          expandPaths(storageType, parentPaths);
          openCreatedFile({ type: 's3', id: newPath, name: finalName, content: openContent });
        }
      } else if (storageType === 'local') {
        if (!isLocalVaultReady(localRootHandle, localVaultFsPath) && !parentDirHandle) {
          return alert('루트 폴더를 먼저 열어주세요.');
        }

        if (localVaultFsPath && !localRootHandle) {
          const backend = getBackendForType('local');
          if (!backend?.isReady?.()) {
            return alert('루트 폴더를 먼저 열어주세요.');
          }
          if (type === 'folder') {
            await backend.mkdir(newPath);
            const parentPaths = getParentPathsToExpand(expandParent);
            expandPaths(storageType, parentPaths);
          } else {
            await backend.writeText(newPath, initialBody, 'text/markdown');
            const parentPaths = getParentPathsToExpand(expandParent);
            expandPaths(storageType, parentPaths);
            openCreatedFile({
              type: 'local',
              id: newPath,
              name: finalName,
              content: openContent,
              viewer: 'markdown',
            });
          }
          await refreshLocalTree();
        } else {
          const targetDirHandle = localRootHandle
            ? await ensureLocalDir(parentDirPath)
            : parentDirHandle;

          if (!targetDirHandle) return alert('루트 폴더를 먼저 열어주세요.');

          if (type === 'folder') {
            await targetDirHandle.getDirectoryHandle(finalName, { create: true });
            const parentPaths = getParentPathsToExpand(expandParent);
            expandPaths(storageType, parentPaths);
          } else {
            const newFileHandle = await targetDirHandle.getFileHandle(finalName, { create: true });
            if (initialBody) {
              const writable = await newFileHandle.createWritable();
              await writable.write(initialBody);
              await writable.close();
            }
            const parentPaths = getParentPathsToExpand(expandParent);
            expandPaths(storageType, parentPaths);
            openCreatedFile({
              type: 'local',
              id: newPath,
              name: finalName,
              content: openContent,
              handle: newFileHandle,
            });
          }
          refreshLocalTree();
        }
      } else if (storageType === 'webdav') {
        const backend = createWebdavBackend(webdavConfig);
        if (type === 'folder') {
          await backend.mkdir(newPath);
          await refreshWebdavTree();
          const parentPaths = getParentPathsToExpand(expandParent);
          expandPaths(storageType, parentPaths);
        } else {
          await backend.writeText(newPath, initialBody, 'text/markdown');
          await refreshWebdavTree();
          const parentPaths = getParentPathsToExpand(expandParent);
          expandPaths(storageType, parentPaths);
          openCreatedFile({
            type: 'webdav',
            id: newPath,
            name: finalName,
            content: openContent,
            viewer: 'markdown',
          });
        }
      }
    } catch (e) {
      alert('생성 실패: ' + e.message);
      throw e;
    }
  };

  const requestCreateItem = (storageType, parentPath, parentDirHandle, type) => {
    setCreateModalContext({ storageType, parentPath, parentDirHandle, type });
    setCreateModalOpen(true);
  };

  const requestAdvancedSearchCreateItem = useCallback(
    (type, parentPath) => {
      const path = String(parentPath || '').replace(/^\/+/, '').replace(/\\/g, '/');
      const normalized =
        path && !path.endsWith('/') ? `${path}/` : path;
      let parentDirHandle = null;
      if (storageMode === STORAGE_MODE_LOCAL) {
        if (!normalized) {
          parentDirHandle = localRootHandle;
        } else {
          const node =
            findNodeByPath(localTree, normalized) ||
            findNodeByPath(localTree, normalized.replace(/\/$/, '')) ||
            findNodeByPath(localTree, `${normalized.replace(/\/$/, '')}/`);
          parentDirHandle = node?.handle || null;
        }
      }
      requestCreateItem(storageMode, normalized, parentDirHandle, type);
    },
    [storageMode, localRootHandle, localTree],
  );

  const newFileDefaultParentPath = useMemo(
    () =>
      resolveNewFileDefaultParentPath({
        pathname: location.pathname,
        chatSurfaceActive: bridge().chatSurfaceActive,
        workspaceTabsEnabled,
        activeTab: activeWorkspaceTab,
        currentFilePath: currentFile?.id,
      }),
    [
      location.pathname,
      bridgeDepsRef,
      workspaceTabsEnabled,
      activeWorkspaceTab,
      currentFile?.id,
    ],
  );


  const requestUploadFile = (storageType, parentPath, parentDirHandle) => {
    bridge().setUploadTarget?.({ storageType, parentPath, parentDirHandle });
    const input = bridge().uploadFileInputRef?.current;
    if (input) input.value = '';
    input?.click();
  };

  const requestUploadFolder = (storageType, parentPath, parentDirHandle) => {
    bridge().setUploadTarget?.({ storageType, parentPath, parentDirHandle });
    const input = bridge().uploadFolderInputRef?.current;
    if (input) input.value = '';
    input?.click();
  };

  const askTreeNameConflict = useCallback((payload) => {
    return new Promise((resolve) => {
      treeNameConflictResolverRef.current = resolve;
      setTreeNameConflict(payload);
    });
  }, []);

  const settleTreeNameConflict = useCallback((choice) => {
    const resolve = treeNameConflictResolverRef.current;
    treeNameConflictResolverRef.current = null;
    setTreeNameConflict(null);
    resolve?.(choice);
  }, []);

  /** Upload flow: same modal, without text compare. */
  const askUploadNameConflict = useCallback(
    (fileName, renameAs) =>
      askTreeNameConflict({
        name: fileName,
        renameAs,
        kind: 'file',
        action: 'upload',
      }),
    [askTreeNameConflict],
  );

  const getUploadTreeForStorage = useCallback(
    (storageType) => {
      if (storageType === 's3') return s3Tree;
      if (storageType === 'webdav') return webdavTree;
      return localTree;
    },
    [s3Tree, webdavTree, localTree],
  );

  const readVaultFileBytes = useCallback(
    async (storageType, path, nodeHint = null) => {
      const key = String(path || '');
      if (!key) return null;
      if (storageType === 's3') {
        const client = getS3Client();
        if (!client) return null;
        const { body } = await getObjectBody(client, s3Creds.bucket, key);
        return body instanceof Uint8Array ? body : new Uint8Array(body);
      }
      if (storageType === 'webdav') {
        const backend = createWebdavBackend(webdavConfig);
        const result = await backend.readBytes(key);
        return result?.body || null;
      }
      const node =
        nodeHint ||
        findNodeByPath(localTree, key) ||
        findFileNodeByPath(localTree, key);
      if (!node?.handle) return null;
      const file = await node.handle.getFile();
      return new Uint8Array(await file.arrayBuffer());
    },
    [getS3Client, s3Creds.bucket, webdavConfig, localTree],
  );

  const loadFileCompareForDest = useCallback(
    async ({
      storageType,
      destFolderPath,
      fileName,
      incomingPath,
      incomingNode,
      existingLabel,
      incomingLabel,
    }) => {
      const existingPath = `${destFolderPath || ''}${fileName}`;
      const existingNode =
        findNodeByPath(getUploadTreeForStorage(storageType), existingPath) ||
        findFileNodeByPath(getUploadTreeForStorage(storageType), existingPath);
      const [existingBytes, incomingBytes] = await Promise.all([
        readVaultFileBytes(storageType, existingPath, existingNode),
        readVaultFileBytes(storageType, incomingPath, incomingNode),
      ]);
      return buildFileComparePayload({
        existingBytes,
        incomingBytes,
        existingLabel: existingLabel || `대상: ${existingPath}`,
        incomingLabel: incomingLabel || `가져올 파일: ${incomingPath}`,
      });
    },
    [getUploadTreeForStorage, readVaultFileBytes],
  );

  const handleCreateItemSubmit = async (nameInput) => {
    if (!createModalContext) return;
    const {
      storageType,
      parentPath,
      parentDirHandle,
      type,
      fromMoveModal,
      fromAddToNoteModal,
      fromSaveSessionModal,
    } = createModalContext;
    setIsCreateSubmitting(true);
    try {
      await createItem(storageType, parentPath, parentDirHandle, type, nameInput);
      if (type === 'folder') {
        const resolved = resolveCreateItemPath(parentPath, nameInput, 'folder');
        if (resolved.ok) {
          if (fromMoveModal) setMoveModalSelectPath(resolved.path);
          if (fromAddToNoteModal) bridge().setAddToNoteSelectPath?.(resolved.path);
          if (fromSaveSessionModal) bridge().setSaveSessionToNoteSelectPath?.(resolved.path);
        }
      }
      setCreateModalOpen(false);
      setCreateModalContext(null);
    } catch (_e) {
      // createItem already shows alert
    } finally {
      setIsCreateSubmitting(false);
    }
  };

  const renameTreeItem = async (storageType, node, newTitle) => {
    const trimmed = newTitle.trim();
    if (!trimmed) return;
    try {
      if (node.type === 'folder') {
        if (storageType === 's3') {
          const prefix = node.path;
          const parentPath = prefix.slice(0, prefix.length - (node.name?.length ?? 0) - 1);
          const destPrefix = `${parentPath}${trimmed}/`;
          await moveS3FolderToFolder(node, parentPath, trimmed);
          await loadS3Files();
          bridge().applyWorkspaceFolderPathRetarget?.('s3', prefix, destPrefix);
          if (currentFile && currentFile.type === 's3' && currentFile.id.startsWith(node.path)) {
            const newPath = currentFile.id.replace(prefix, destPrefix);
            applyOpenFileIdentityChange(
              { ...currentFile, id: newPath },
              { oldPath: currentFile.id, retargetTabs: false },
            );
          }
        } else if (storageType === 'local') {
          if (localVaultFsPath && !localRootHandle) {
            const backend = getBackendForType('local');
            if (!backend?.isReady?.()) throw new Error('루트 폴더를 먼저 열어주세요.');
            const oldPrefix = node.path.endsWith('/') ? node.path : `${node.path}/`;
            const newPrefix =
              node.path.slice(0, -(node.name?.length ?? 0) - 1) + trimmed + '/';
            const fromRel = String(node.path || '').replace(/\/+$/, '');
            const toRel = String(newPrefix || '').replace(/\/+$/, '');
            await backend.move(fromRel, toRel);
            await refreshLocalTree();
            bridge().applyWorkspaceFolderPathRetarget?.('local', oldPrefix, newPrefix);
            if (currentFile && currentFile.type === 'local' && (currentFile.id === node.path || currentFile.id.startsWith(oldPrefix) || currentFile.id.startsWith(node.path))) {
              const newPathForFile = currentFile.id.startsWith(oldPrefix)
                ? newPrefix + currentFile.id.slice(oldPrefix.length)
                : currentFile.id.startsWith(node.path)
                  ? newPrefix + currentFile.id.slice(node.path.length)
                  : currentFile.id;
              applyOpenFileIdentityChange(
                { ...currentFile, id: newPathForFile },
                { oldPath: currentFile.id, retargetTabs: false },
              );
            }
          } else {
            const parentHandle = node.parentHandle || localRootHandle;
            if (!parentHandle) throw new Error('루트 폴더를 먼저 열어주세요.');
            const oldPrefix = node.path.endsWith('/') ? node.path : `${node.path}/`;
            const newPrefix =
              node.path.slice(0, -(node.name?.length ?? 0) - 1) + trimmed + '/';
            await moveLocalFolderToFolder(node, parentHandle, '', trimmed);
            bridge().applyWorkspaceFolderPathRetarget?.('local', oldPrefix, newPrefix);
            if (currentFile && currentFile.type === 'local' && (currentFile.id === node.path || currentFile.id.startsWith(oldPrefix) || currentFile.id.startsWith(node.path))) {
              const newPathForFile = currentFile.id.startsWith(oldPrefix)
                ? newPrefix + currentFile.id.slice(oldPrefix.length)
                : currentFile.id.startsWith(node.path)
                  ? newPrefix + currentFile.id.slice(node.path.length)
                  : currentFile.id;
              applyOpenFileIdentityChange(
                { ...currentFile, id: newPathForFile },
                { oldPath: currentFile.id, retargetTabs: false },
              );
            }
          }
        } else if (storageType === 'webdav') {
          const oldPrefix = node.path.endsWith('/') ? node.path : `${node.path}/`;
          const destPrefix = node.path.slice(0, -(node.name?.length ?? 0) - 1) + trimmed + '/';
          await moveWebdavFolderToFolder(node, '', trimmed);
          bridge().applyWorkspaceFolderPathRetarget?.('webdav', oldPrefix, destPrefix);
          if (currentFile && currentFile.type === 'webdav' && currentFile.id.startsWith(node.path)) {
            const newPathForFile = currentFile.id.startsWith(oldPrefix)
              ? destPrefix + currentFile.id.slice(oldPrefix.length)
              : destPrefix + currentFile.id.slice(node.path.length);
            applyOpenFileIdentityChange(
              { ...currentFile, id: newPathForFile },
              { oldPath: currentFile.id, retargetTabs: false },
            );
          }
        }
        return;
      }
      if (storageType === 's3') {
        const originalName = node.name || '';
        const lastDot = originalName.lastIndexOf('.');
        const ext = lastDot > 0 ? originalName.slice(lastDot) : '';
        const newName = `${trimmed}${ext}`;
        const oldPath = node.path;

        const isCurrentFile = currentFile?.type === 's3' && currentFile?.id === node.path;
        const fileToRename = isCurrentFile ? { ...currentFile, viewer: currentFile.viewer } : { id: node.path, name: node.name };
        const hasUnsaved = isCurrentFile && currentFile.content !== editorContent;
        const contentOverride = hasUnsaved ? editorContent : null;

        const updated = await bridge().renameS3File?.(fileToRename, newName, contentOverride);
        if (isCurrentFile) {
          applyOpenFileIdentityChange(updated, { oldPath });
        } else {
          bridge().applyWorkspaceFilePathRetarget?.('s3', oldPath, updated.id, {
            ...updated,
            name: newName,
          });
        }
      } else if (storageType === 'local') {
        if (localVaultFsPath && !localRootHandle) {
          const backend = getBackendForType('local');
          if (!backend?.isReady?.()) throw new Error('루트 폴더를 먼저 열어주세요.');

          const oldPath = node.path;
          const lastSlash = oldPath.lastIndexOf('/');
          const dirPrefix = lastSlash >= 0 ? oldPath.slice(0, lastSlash + 1) : '';
          const originalName = node.name || '';
          const nameLastDot = originalName.lastIndexOf('.');
          const ext = nameLastDot > 0 ? originalName.slice(nameLastDot) : '';
          const newName = `${trimmed}${ext}`;
          const newPath = dirPrefix + newName;
          if (newPath === oldPath) return;

          const isCurrentFile = currentFile?.type === 'local' && currentFile?.id === node.path;
          const hasUnsaved = isCurrentFile && currentFile.content !== editorContent;
          if (hasUnsaved) {
            await backend.writeText(newPath, editorContent, 'text/markdown');
            await backend.delete(oldPath);
          } else {
            await backend.move(oldPath, newPath);
          }
          await refreshLocalTree();
          if (isCurrentFile) {
            applyOpenFileIdentityChange(
              { ...currentFile, id: newPath, name: newName },
              { oldPath },
            );
          } else {
            bridge().applyWorkspaceFilePathRetarget?.('local', oldPath, newPath, {
              id: newPath,
              name: newName,
            });
          }
        } else {
          const pHandle = node.parentHandle || localRootHandle;
          if (!pHandle) throw new Error('루트 폴더를 먼저 열어주세요.');

          const oldPath = node.path;
          const lastSlash = oldPath.lastIndexOf('/');
          const dirPrefix = lastSlash >= 0 ? oldPath.slice(0, lastSlash + 1) : '';
          const originalName = node.name || '';
          const nameLastDot = originalName.lastIndexOf('.');
          const ext = nameLastDot > 0 ? originalName.slice(nameLastDot) : '';
          const newName = `${trimmed}${ext}`;
          const newPath = dirPrefix + newName;

          if (newPath === oldPath) return;

          const file = await node.handle.getFile();
          const newFileHandle = await pHandle.getFileHandle(newName, { create: true });
          const writable = await newFileHandle.createWritable();
          await writable.write(await file.arrayBuffer());
          await writable.close();

          await pHandle.removeEntry(node.name, { recursive: false });

          await refreshLocalTree();

          if (currentFile && currentFile.type === 'local' && currentFile.id === node.path) {
            applyOpenFileIdentityChange(
              {
                ...currentFile,
                id: newPath,
                name: newName,
                handle: newFileHandle,
              },
              { oldPath },
            );
          } else {
            bridge().applyWorkspaceFilePathRetarget?.('local', oldPath, newPath, {
              id: newPath,
              name: newName,
              handle: newFileHandle,
            });
          }
        }
      } else if (storageType === 'webdav') {
        const backend = createWebdavBackend(webdavConfig);
        const oldPath = node.path;
        const lastSlash = oldPath.lastIndexOf('/');
        const dirPrefix = lastSlash >= 0 ? oldPath.slice(0, lastSlash + 1) : '';
        const originalName = node.name || '';
        const nameLastDot = originalName.lastIndexOf('.');
        const ext = nameLastDot > 0 ? originalName.slice(nameLastDot) : '';
        const newName = `${trimmed}${ext}`;
        const newPath = dirPrefix + newName;
        if (newPath === oldPath) return;

        const isCurrentFile = currentFile?.type === 'webdav' && currentFile?.id === node.path;
        const hasUnsaved = isCurrentFile && currentFile.content !== editorContent;
        if (hasUnsaved) {
          await backend.writeText(newPath, editorContent, 'text/markdown');
          await backend.delete(oldPath);
        } else {
          await backend.move(oldPath, newPath);
        }
        await refreshWebdavTree();
        if (isCurrentFile) {
          applyOpenFileIdentityChange(
            { ...currentFile, id: newPath, name: newName },
            { oldPath },
          );
        } else {
          bridge().applyWorkspaceFilePathRetarget?.('webdav', oldPath, newPath, {
            id: newPath,
            name: newName,
          });
        }
      }
    } catch (e) {
      alert("이름 변경 실패: " + e.message);
    }
  };

  const handleRequestMoveFolder = (node, storageType) => {
    if (!node || node.type !== 'folder') return;
    setMoveFolderTarget({ node, storageType });
  };

  const handleDropOnFolder = async (targetNode, targetStorageType, action, payload) => {
    if (action === 'dragOver') {
      if (!targetNode) return;
      setDropTarget({ folderPath: targetNode.path, storageType: targetStorageType });
      return;
    }
    if (action === 'dragLeave') {
      setDropTarget(null);
      return;
    }
    if (action !== 'drop' || !targetNode || targetNode.type !== 'folder') return;

    setDropTarget(null);

    const destPath = targetNode.path || '';
    let destHandle = null;
    if (targetStorageType === 'local') {
      destHandle = targetNode.handle || null;
      if (!destHandle) {
        if (!destPath) {
          destHandle = localRootHandle;
        } else {
          destHandle = findNodeByPath(localTree, destPath)?.handle || localRootHandle;
        }
      }
    }

    const rawItems = Array.isArray(payload?.items) && payload.items.length
      ? payload.items
      : (payload?.storageType !== undefined && payload?.path
        ? [{ storageType: payload.storageType, path: payload.path, nodeType: payload.nodeType }]
        : null);

    if (rawItems) {
      const isCopy = Boolean(payload?.copy);
      const verb = isCopy ? '복제' : '이동';
      const items = pruneNestedMovePaths(rawItems).filter((item) => {
        if (item.storageType !== targetStorageType) return false;
        if (item.path === destPath) return false;
        if (item.nodeType === 'folder' && (destPath === item.path || destPath.startsWith(item.path))) {
          return false;
        }
        return true;
      });

      if (!items.length) return;

      const tree =
        targetStorageType === 's3'
          ? s3Tree
          : targetStorageType === 'webdav'
            ? webdavTree
            : localTree;
      const usedDestNames = new Set(getTreeChildNames(tree, destPath, findNodeByPath));
      let successCount = 0;
      let failCount = 0;
      let lastError = null;
      let lastSuccessName = null;

      if (items.length > 1) {
        setOperationStatus(`${items.length}개 항목 ${verb} 중…`);
      }

      for (const item of items) {
        const { storageType: srcStorageType, path: srcPath, nodeType } = item;
        const srcNode = findNodeByPath(tree, srcPath);
        if (!srcNode) {
          failCount += 1;
          lastError = new Error(`${verb}할 항목을 트리에서 찾을 수 없습니다.`);
          continue;
        }

        if (!isCopy) {
          if (nodeType === 'file') {
            const destFilePath = `${destPath || ''}${srcNode.name}`;
            if (destFilePath === srcPath) continue;
          } else if (nodeType === 'folder') {
            const destFolderPrefix = `${destPath || ''}${srcNode.name}/`;
            if (destFolderPrefix === srcPath) continue;
            if (destFolderPrefix.startsWith(srcPath) || srcPath.startsWith(destFolderPrefix)) continue;
          }
        }

        try {
          const isFolder = nodeType === 'folder';
          const sameFolderCopy = isCopy && getParentFolderPath(srcPath) === destPath;
          let destName = srcNode.name;

          if (sameFolderCopy) {
            destName = allocateUniqueCopyName(srcNode.name, usedDestNames, {
              forceSuffix: true,
              isFolder,
            });
          } else if (treeChildNameTaken(usedDestNames, srcNode.name)) {
            const resolved = await resolveTreeDestName({
              name: srcNode.name,
              usedNames: usedDestNames,
              kind: isFolder ? 'folder' : 'file',
              action: isCopy ? 'copy' : 'move',
              askConflict: askTreeNameConflict,
              loadCompare: isFolder
                ? undefined
                : () =>
                    loadFileCompareForDest({
                      storageType: srcStorageType,
                      destFolderPath: destPath,
                      fileName: srcNode.name,
                      incomingPath: srcPath,
                      incomingNode: srcNode,
                      existingLabel: `대상 폴더의 "${srcNode.name}"`,
                      incomingLabel: isCopy
                        ? `복제할 "${srcNode.name}"`
                        : `이동할 "${srcNode.name}"`,
                    }),
            });
            if (!resolved) {
              continue;
            }
            destName = resolved;
          }

          if (srcStorageType === 'local' && destHandle && destName !== srcNode.name) {
            const existing = new Set(usedDestNames);
            while (true) {
              try {
                if (isFolder) await destHandle.getDirectoryHandle(destName);
                else await destHandle.getFileHandle(destName);
                existing.add(destName);
                destName = allocateUniqueCopyName(srcNode.name, existing, {
                  forceSuffix: true,
                  isFolder,
                });
              } catch {
                break;
              }
            }
          }

          usedDestNames.add(destName);
          const destFilePath = `${destPath || ''}${destName}`;

          beginTreeTransferBusy({
            storageType: srcStorageType,
            path: srcPath,
            nodeType: isFolder ? 'folder' : 'file',
            destFolderPath: destPath || '',
            action: isCopy ? 'copy' : 'move',
          });

          try {
            if (isCopy) {
              if (nodeType === 'file') {
                const fileNode = srcStorageType === 's3'
                  ? { id: srcPath, name: srcNode.name }
                  : { ...srcNode, id: srcNode.path };
                if (srcStorageType === 's3') {
                  await copyS3FileToFolder(fileNode, destPath, destName);
                } else if (srcStorageType === 'webdav') {
                  await copyWebdavFileToFolder(fileNode, destPath, destName);
                } else {
                  await copyLocalFileToFolder(fileNode, destHandle, destPath, destName);
                }
                await reloadOpenFileIfPath(srcStorageType, destFilePath);
              } else if (srcStorageType === 's3') {
                await copyS3FolderToFolder(srcNode, destPath, destName);
              } else if (srcStorageType === 'webdav') {
                await copyWebdavFolderToFolder(srcNode, destPath, destName);
              } else {
                await copyLocalFolderToFolder(srcNode, destHandle, destPath, destName);
              }
              lastSuccessName = destName;
            } else if (nodeType === 'file') {
              const fileNode = srcStorageType === 's3'
                ? { id: srcPath, name: srcNode.name }
                : { ...srcNode, id: srcNode.path };
              if (srcStorageType === 's3') {
                await moveS3FileToFolder(fileNode, destPath, destName);
                if (currentFileRef.current?.type === 's3' && currentFileRef.current.id === srcPath) {
                  applyOpenFileIdentityChange(
                    { ...currentFileRef.current, id: destFilePath, name: destName },
                    { oldPath: srcPath },
                  );
                } else {
                  bridge().applyWorkspaceFilePathRetarget?.(srcStorageType, srcPath, destFilePath, {
                    id: destFilePath,
                    name: destName,
                  });
                  await reloadOpenFileIfPath(srcStorageType, destFilePath);
                }
              } else if (srcStorageType === 'webdav') {
                const updated = await moveWebdavFileToFolder(fileNode, destPath, destName);
                if (currentFileRef.current?.type === 'webdav' && currentFileRef.current.id === srcPath) {
                  applyOpenFileIdentityChange(updated, { oldPath: srcPath });
                } else {
                  bridge().applyWorkspaceFilePathRetarget?.(srcStorageType, srcPath, destFilePath, {
                    id: destFilePath,
                    name: destName,
                  });
                  await reloadOpenFileIfPath(srcStorageType, destFilePath);
                }
              } else {
                const updated = await moveLocalFileToFolder(fileNode, destHandle, destPath, destName);
                if (currentFileRef.current?.type === 'local' && currentFileRef.current.id === srcPath) {
                  applyOpenFileIdentityChange(updated, { oldPath: srcPath });
                } else {
                  bridge().applyWorkspaceFilePathRetarget?.(srcStorageType, srcPath, destFilePath, {
                    id: destFilePath,
                    name: destName,
                    ...(updated?.handle ? { handle: updated.handle } : {}),
                  });
                  await reloadOpenFileIfPath(srcStorageType, destFilePath);
                }
              }
              lastSuccessName = destName;
            } else {
              if (srcStorageType === 's3') {
                await moveS3FolderToFolder(srcNode, destPath, destName);
              } else if (srcStorageType === 'webdav') {
                await moveWebdavFolderToFolder(srcNode, destPath, destName);
              } else {
                await moveLocalFolderToFolder(srcNode, destHandle, destPath, destName);
              }
              const oldPrefix = srcNode.path.endsWith('/') ? srcNode.path : `${srcNode.path}/`;
              const newPrefix = `${destPath}${destName}/`;
              bridge().applyWorkspaceFolderPathRetarget?.(srcStorageType, oldPrefix, newPrefix);
              if (
                currentFileRef.current &&
                currentFileRef.current.type === srcStorageType &&
                (currentFileRef.current.id.startsWith(oldPrefix) ||
                  currentFileRef.current.id.startsWith(srcNode.path))
              ) {
                const cur = currentFileRef.current;
                const newPath = cur.id.startsWith(oldPrefix)
                  ? newPrefix + cur.id.slice(oldPrefix.length)
                  : newPrefix + cur.id.slice(srcNode.path.length);
                applyOpenFileIdentityChange(
                  { ...cur, id: newPath },
                  { oldPath: cur.id, retargetTabs: false },
                );
              }
              lastSuccessName = destName;
            }
            successCount += 1;
          } finally {
            endTreeTransferBusy(srcStorageType, srcPath);
          }
        } catch (e) {
          failCount += 1;
          lastError = e;
          endTreeTransferBusy(srcStorageType, srcPath);
        }
      }

      if (successCount === 0 && failCount === 0) return;

      if (successCount > 0 && !isCopy) {
        setSelectedIds(new Set());
      }
      if (successCount > 0 && isCopy) {
        const parentPaths = getParentPathsToExpand(destPath);
        expandPaths(targetStorageType, parentPaths);
      }

      if (failCount === 0) {
        setOperationStatus(
          successCount > 1
            ? `${successCount}개 항목 ${verb} 완료`
            : `${items[0].nodeType === 'folder' ? '폴더' : '파일'} ${verb} 완료: ${lastSuccessName || items[0].name || items[0].path}`,
        );
      } else if (successCount === 0) {
        alert(`${verb} 실패: ` + (lastError?.message || '알 수 없는 오류'));
        setOperationStatus(`${verb} 실패: ${lastError?.message || ''}`);
      } else {
        alert(`${successCount}개 ${verb} 완료, ${failCount}개 실패` + (lastError ? `: ${lastError.message}` : ''));
        setOperationStatus(`${successCount}개 ${verb}, ${failCount}개 실패`);
      }
      return;
    }

    if (payload?.files?.length > 0 || payload?.dirHandles?.length > 0) {
      const { files = [], dirHandles = [] } = payload;
      const totalItems = files.length + dirHandles.length;
      const indicatorId = addIndicator({
        id: 'drop-upload',
        type: ActivityTypes.FILE_UPLOAD,
        label: totalItems > 1 ? `${totalItems}개 항목 업로드 중` : '업로드 중',
      });
      try {
        const usedNames = new Set(
          getTreeChildNames(
            getUploadTreeForStorage(targetStorageType),
            destPath || '',
            findNodeByPath,
          ),
        );
        let uploadedCount = 0;
        let skippedCount = 0;

        if (targetStorageType === 's3') {
          const client = getS3Client();
          if (!client) throw new Error('S3 클라이언트를 초기화하지 못했습니다.');
          const uploadFile = async (file, prefix, destName = normalizeUnicodeNfc(file.name)) => {
            const key = prefix + normalizeUnicodeNfc(destName);
            const body = await file.arrayBuffer();
            await putObject(client, {
              Bucket: s3Creds.bucket,
              Key: key,
              Body: new Uint8Array(body),
              ContentType: file.type || 'application/octet-stream',
            });
          };
          const uploadDir = async (dirHandle, prefix) => {
            for await (const entry of dirHandle.values()) {
              const nfcName = normalizeUnicodeNfc(entry.name);
              if (entry.kind === 'file') {
                const file = await entry.getFile();
                await uploadFile(file, prefix, nfcName);
              } else if (entry.kind === 'directory') {
                await uploadDir(entry, `${prefix}${nfcName}/`);
              }
            }
          };
          for (const file of files) {
            const destName = await resolveUploadDestFileName(
              file.name,
              usedNames,
              askUploadNameConflict,
            );
            if (!destName) {
              skippedCount += 1;
              continue;
            }
            await uploadFile(file, destPath, destName);
            usedNames.add(destName);
            uploadedCount += 1;
            await reloadOpenFileIfPath(targetStorageType, `${destPath || ''}${destName}`);
          }
          for (const handle of dirHandles) {
            const nfcDirName = normalizeUnicodeNfc(handle.name || '');
            await uploadDir(handle, `${destPath}${nfcDirName}/`);
            uploadedCount += 1;
          }
          loadS3Files();
          const parentPaths = getParentPathsToExpand(destPath);
          expandPaths(targetStorageType, parentPaths);
        } else if (targetStorageType === 'webdav') {
          const backend = createWebdavBackend(webdavConfig);
          const uploadFile = async (file, prefix, destName = normalizeUnicodeNfc(file.name)) => {
            const key = prefix + normalizeUnicodeNfc(destName);
            const body = new Uint8Array(await file.arrayBuffer());
            await backend.writeBytes(key, body, file.type || 'application/octet-stream');
          };
          const uploadDir = async (dirHandle, prefix) => {
            for await (const entry of dirHandle.values()) {
              const nfcName = normalizeUnicodeNfc(entry.name);
              if (entry.kind === 'file') {
                const file = await entry.getFile();
                await uploadFile(file, prefix, nfcName);
              } else if (entry.kind === 'directory') {
                await uploadDir(entry, `${prefix}${nfcName}/`);
              }
            }
          };
          for (const file of files) {
            const destName = await resolveUploadDestFileName(
              file.name,
              usedNames,
              askUploadNameConflict,
            );
            if (!destName) {
              skippedCount += 1;
              continue;
            }
            await uploadFile(file, destPath, destName);
            usedNames.add(destName);
            uploadedCount += 1;
            await reloadOpenFileIfPath(targetStorageType, `${destPath || ''}${destName}`);
          }
          for (const handle of dirHandles) {
            const nfcDirName = normalizeUnicodeNfc(handle.name || '');
            await uploadDir(handle, `${destPath}${nfcDirName}/`);
            uploadedCount += 1;
          }
          await refreshWebdavTree();
          const parentPaths = getParentPathsToExpand(destPath);
          expandPaths(targetStorageType, parentPaths);
        } else {
          const targetDirHandle = destHandle || localRootHandle;
          if (!targetDirHandle) throw new Error('루트 폴더를 먼저 열어주세요.');
          const copyFile = async (file, dirHandle, destName = normalizeUnicodeNfc(file.name)) => {
            const nfcName = normalizeUnicodeNfc(destName);
            const newFileHandle = await dirHandle.getFileHandle(nfcName, { create: true });
            const writable = await newFileHandle.createWritable();
            await writable.write(await file.arrayBuffer());
            await writable.close();
          };
          const copyDir = async (dirHandle, destDirHandle) => {
            const nfcDirName = normalizeUnicodeNfc(dirHandle.name);
            const newDir = await destDirHandle.getDirectoryHandle(nfcDirName, { create: true });
            for await (const entry of dirHandle.values()) {
              const nfcName = normalizeUnicodeNfc(entry.name);
              if (entry.kind === 'file') {
                const file = await entry.getFile();
                const fh = await newDir.getFileHandle(nfcName, { create: true });
                const w = await fh.createWritable();
                await w.write(await file.arrayBuffer());
                await w.close();
              } else if (entry.kind === 'directory') {
                await copyDir(entry, newDir);
              }
            }
          };
          for (const file of files) {
            const destName = await resolveUploadDestFileName(
              file.name,
              usedNames,
              askUploadNameConflict,
            );
            if (!destName) {
              skippedCount += 1;
              continue;
            }
            await copyFile(file, targetDirHandle, destName);
            usedNames.add(destName);
            uploadedCount += 1;
            await reloadOpenFileIfPath(targetStorageType, `${destPath || ''}${destName}`);
          }
          for (const handle of dirHandles) {
            await copyDir(handle, targetDirHandle);
            uploadedCount += 1;
          }
          refreshLocalTree();
          const parentPaths = getParentPathsToExpand(destPath);
          expandPaths(targetStorageType, parentPaths);
        }
        if (uploadedCount === 0 && skippedCount > 0) {
          setOperationStatus('업로드 취소됨');
        } else if (skippedCount > 0) {
          setOperationStatus(`업로드 완료 (${skippedCount}개 취소)`);
        } else {
          setOperationStatus('업로드 완료');
        }
      } catch (e) {
        alert('업로드 실패: ' + e.message);
        setOperationStatus(`업로드 실패: ${e.message}`);
      } finally {
        if (treeNameConflictResolverRef.current) {
          settleTreeNameConflict('cancel');
        }
        removeIndicator(indicatorId);
      }
    }
  };

  const handleDragEndNode = () => {
    setDropTarget(null);
  };

  return {
    handleTreeNodeSelect,
    handleDownloadNode,
    handleDuplicateNode,
    createItem,
    requestCreateItem,
    requestAdvancedSearchCreateItem,
    newFileDefaultParentPath,
    // requestNewFile,
    requestUploadFile,
    requestUploadFolder,
    askTreeNameConflict,
    settleTreeNameConflict,
    askUploadNameConflict,
    getUploadTreeForStorage,
    loadFileCompareForDest,
    handleCreateItemSubmit,
    renameTreeItem,
    handleRequestMoveFolder,
    handleDropOnFolder,
    handleDragEndNode,
    beginTreeTransferBusy,
    endTreeTransferBusy,
    reloadOpenFileIfPath,
    moveS3FileToFolder,
    moveLocalFileToFolder,
    moveS3FolderToFolder,
    moveLocalFolderToFolder,
    moveWebdavFileToFolder,
    moveWebdavFolderToFolder,
    copyS3FileToFolder,
    copyLocalFileToFolder,
    copyS3FolderToFolder,
    copyLocalFolderToFolder,
    copyWebdavFileToFolder,
    copyWebdavFolderToFolder,
    lastSelectedIdRef,
    toSelectKey,
  };
}
