import { useCallback, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useVault } from '@/App/hooks/useVault';
import { useModalsOwned } from '@/App/providers/AppModalsStateProvider';
import {
  canUseVaultDirectoryExport,
  exportVaultArchive,
  type VaultExportResult,
} from '@/utils/vault/exportVaultArchive';
import {
  STORAGE_MODE_IDB,
  STORAGE_MODE_LOCAL,
  getAppNameByStorageMode,
} from '@/utils/storageSettings';
import { saveLocalVaultFsPath } from '@/utils/localVaultPathStore';
import { isDesktopApp } from '@/utils/isDesktopApp';
import { useActivityIndicator, ActivityTypes } from '@/contexts/ActivityIndicatorContext';

/**
 * Settings / IDB sync: full vault export (directory or ZIP) + Local Haim confirm.
 */
export function useVaultExportDomain() {
  const { s3Creds } = useAuth();
  const vault = useVault();
  const {
    storageMode,
    setStorageMode,
    getBackendForType,
    attachLocalRootFolder,
    setLocalVaultFsPath,
    setLocalRootHandle,
    refreshLocalTree,
    webdavReady,
    localRootHandle,
    localVaultFsPath,
  } = vault;
  const { triggerBlobDownload, setDownloadResultModal } = useModalsOwned();
  const { addIndicator, updateIndicator, removeIndicator } = useActivityIndicator();

  const [idbSyncLocalConfirm, setIdbSyncLocalConfirm] = useState<{
    isOpen: boolean;
    dirHandle: FileSystemDirectoryHandle | null;
    tauriPath: string | null;
  }>({ isOpen: false, dirHandle: null, tauriPath: null });

  const [zipInstructOpen, setZipInstructOpen] = useState(false);
  const [exportBusy, setExportBusy] = useState(false);

  const isVaultExportReady =
    storageMode === STORAGE_MODE_IDB ||
    (storageMode === 'local' && Boolean(localRootHandle || localVaultFsPath)) ||
    (storageMode === 'webdav' && webdavReady) ||
    (storageMode === 's3' && Boolean(s3Creds.bucket));

  const runFullVaultExport = useCallback(
    async (opts: { preferZip?: boolean; forIdbSync?: boolean } = {}) => {
      if (!isVaultExportReady) {
        alert('저장소가 준비되지 않았습니다.');
        return null;
      }
      setExportBusy(true);
      const indicatorId = addIndicator({
        type: ActivityTypes.DOWNLOAD,
        label: `Vault 내보내기: ${getAppNameByStorageMode(storageMode)}`,
      });
      try {
        const useIdb = storageMode === STORAGE_MODE_IDB;
        const backend = useIdb ? undefined : getBackendForType(storageMode);
        const exportOpts: Parameters<typeof exportVaultArchive>[0] = {
          useIdb,
          storageMode,
          triggerBlobDownload,
          onProgress: (p) => {
            const patch: { progress: number; detail?: string } = {
              progress:
                p.total > 0
                  ? Math.min(100, Math.round((p.completed / p.total) * 100))
                  : 0,
            };
            if (p.detail != null) patch.detail = p.detail;
            updateIndicator(indicatorId, patch);
          },
        };
        if (backend) exportOpts.backend = backend;
        if (opts.preferZip != null) exportOpts.preferZip = opts.preferZip;
        const result = await exportVaultArchive(exportOpts);
        if (!result) return null;

        if (opts.forIdbSync && storageMode === STORAGE_MODE_IDB) {
          if (result.channel === 'directory') {
            setIdbSyncLocalConfirm({
              isOpen: true,
              dirHandle: result.dirHandle ?? null,
              tauriPath: result.tauriPath ?? null,
            });
          } else {
            setZipInstructOpen(true);
          }
        } else if (result.channel === 'zip') {
          setDownloadResultModal({
            isOpen: true,
            title: 'ZIP 다운로드 완료',
            message:
              'Vault ZIP 다운로드가 완료되었습니다.\n압축을 해제한 뒤 Local Haim으로 해당 폴더를 열 수 있습니다.',
          });
        } else {
          setDownloadResultModal({
            isOpen: true,
            title: '내보내기 완료',
            message: `Vault 파일을 폴더에 저장했습니다. (${result.fileCount}개 파일)`,
          });
        }
        return result as VaultExportResult;
      } catch (e) {
        console.error('Vault export failed:', e);
        alert(e instanceof Error ? e.message : 'Vault 내보내기에 실패했습니다.');
        return null;
      } finally {
        removeIndicator(indicatorId);
        setExportBusy(false);
      }
    },
    [
      isVaultExportReady,
      storageMode,
      getBackendForType,
      triggerBlobDownload,
      addIndicator,
      updateIndicator,
      removeIndicator,
      setDownloadResultModal,
    ],
  );

  const handleExportVaultToFolder = useCallback(
    () => runFullVaultExport({ preferZip: false }),
    [runFullVaultExport],
  );

  const handleExportVaultAsZip = useCallback(
    () => runFullVaultExport({ preferZip: true }),
    [runFullVaultExport],
  );

  const handleIdbSyncToLocalFolder = useCallback(
    () => runFullVaultExport({ forIdbSync: true }),
    [runFullVaultExport],
  );

  const handleConfirmOpenAsLocalHaim = useCallback(async () => {
    const { dirHandle, tauriPath } = idbSyncLocalConfirm;
    setIdbSyncLocalConfirm({ isOpen: false, dirHandle: null, tauriPath: null });
    try {
      if (tauriPath && isDesktopApp()) {
        saveLocalVaultFsPath(tauriPath);
        setLocalVaultFsPath(tauriPath);
        setLocalRootHandle(null);
        setStorageMode(STORAGE_MODE_LOCAL);
        await refreshLocalTree();
        return;
      }
      if (dirHandle) {
        setStorageMode(STORAGE_MODE_LOCAL);
        await attachLocalRootFolder(dirHandle);
      }
    } catch (e) {
      console.error('Open as Local Haim failed:', e);
      alert(e instanceof Error ? e.message : 'Local Haim으로 열지 못했습니다.');
    }
  }, [
    idbSyncLocalConfirm,
    setLocalVaultFsPath,
    setLocalRootHandle,
    setStorageMode,
    attachLocalRootFolder,
    refreshLocalTree,
  ]);

  const handleCancelOpenAsLocalHaim = useCallback(() => {
    setIdbSyncLocalConfirm({ isOpen: false, dirHandle: null, tauriPath: null });
  }, []);

  const handleCloseZipInstruct = useCallback(() => {
    setZipInstructOpen(false);
  }, []);

  return {
    exportBusy,
    isVaultExportReady,
    canUseDirectoryExport: canUseVaultDirectoryExport(),
    handleExportVaultToFolder,
    handleExportVaultAsZip,
    handleIdbSyncToLocalFolder,
    idbSyncLocalConfirm,
    handleConfirmOpenAsLocalHaim,
    handleCancelOpenAsLocalHaim,
    zipInstructOpen,
    handleCloseZipInstruct,
  };
}
