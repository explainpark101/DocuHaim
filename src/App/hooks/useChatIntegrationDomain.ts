// @ts-nocheck — context-owned useChatIntegrationDomain (no bag / glueRef)
import { useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useBootstrapOwned } from '@/App/providers/AppBootstrapStateProvider';
import { useVault } from '@/App/hooks/useVault';
import { useRecordingOwned } from '@/App/providers/RecordingProvider';
import { useChromeOwned } from '@/App/providers/AppChromeStateProvider';
import { getRecordingQueueStats } from '@/utils/recordingDb';
import { drainRecordingUploadQueue } from '@/utils/recordingUploadQueue';
import { setPrintSettingsStore } from '@/utils/printSettingsStore';
import {
  loadWebfontsFromStorage,
  notifyWebfontsChanged,
  setWebfontSettingsStore,
} from '@/utils/webfontSettingsStore';
import { loadTableStylesFromStorage, setTableStyleSettingsStore } from '@/utils/tableStyleSettingsStore';
import {
  loadCoverSettingsFromStorage,
  notifyCoverSettingsChanged,
  setCoverSettingsStore,
} from '@/utils/coverSettingsStore';
import {
  loadOgWorkerSettingsFromStorage,
  notifyOgWorkerSettingsChanged,
  setOgWorkerSettingsStore,
} from '@/utils/ogWorkerSettings';
import {
  setLlmPromptTemplatesStore,
  syncLlmPromptTemplatesToRemote,
} from '@/utils/llmPromptTemplatesDb';
import { createWebdavBackend } from '@/utils/storage';
import { isLocalVaultReady } from '@/utils/localVaultReady';

/**
 * useChatIntegrationDomain: context-owned domain handlers.
 */
export function useChatIntegrationDomain() {
  const { isUnlocked, s3Creds } = useAuth();
  const { setShareBlockingAuth } = useBootstrapOwned();
  const { getS3Client, loadS3Files, localRootHandle, localVaultFsPath, refreshWebdavTree, storageMode, webdavConfig, webdavReady } = useVault();
  const { setRecordingQueueStats } = useRecordingOwned();
  const { setShareGroupSend } = useChromeOwned();

  const handleShareBlockingChange = useCallback((blocking) => {
    setShareBlockingAuth(Boolean(blocking));
  }, [setShareBlockingAuth]);

  const handleShareComposeClaimed = useCallback((seed) => {
    if (seed?.body || seed?.files?.length) setShareGroupSend(seed);
  }, [setShareGroupSend]);

  const handleShareGroupSendConsumed = useCallback(() => {
    setShareGroupSend(null);
  }, [setShareGroupSend]);

  // refreshWebdavTree / loadWebdavFolderChildren / loadS3Files owned by VaultProvider

  // IndexedDB recording upload retry: on app start / network recovery (S3/WebDAV only)
  useEffect(() => {
    if (!isUnlocked) return;
    if (storageMode === 'local') {
      getRecordingQueueStats().then(setRecordingQueueStats).catch(() => {});
      return;
    }

    const refreshStats = () => getRecordingQueueStats().then(setRecordingQueueStats).catch(() => {});

    const kick = () => {
      if (storageMode === 's3') {
        const client = getS3Client();
        const bucket = s3Creds.bucket;
        if (!client || !bucket) return Promise.resolve();
        return drainRecordingUploadQueue({ client, bucket })
          .then((r) => {
            refreshStats();
            if (r?.processed > 0) loadS3Files();
          })
          .catch(() => {
            refreshStats();
          });
      }
      if (storageMode === 'webdav' && webdavReady) {
        const backend = createWebdavBackend(webdavConfig);
        const writeObject = ({ key, body, contentType }) => backend.writeBytes(key, body, contentType);
        return drainRecordingUploadQueue({ writeObject })
          .then((r) => {
            refreshStats();
            if (r?.processed > 0) refreshWebdavTree();
          })
          .catch(() => {
            refreshStats();
          });
      }
      return Promise.resolve();
    };

    refreshStats();
    kick();
    const onOnline = () => kick();
    window.addEventListener('online', onOnline);
    const pollId = window.setInterval(refreshStats, 2000);

    const beforeUnload = () => {
      try {
        if (storageMode === 's3') {
          const client = getS3Client();
          const bucket = s3Creds.bucket;
          if (client && bucket) drainRecordingUploadQueue({ client, bucket }).catch(() => {});
        } else if (storageMode === 'webdav' && webdavReady) {
          const backend = createWebdavBackend(webdavConfig);
          const writeObject = ({ key, body, contentType }) => backend.writeBytes(key, body, contentType);
          drainRecordingUploadQueue({ writeObject }).catch(() => {});
        }
      } catch (_) {}
    };
    window.addEventListener('beforeunload', beforeUnload);

    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('beforeunload', beforeUnload);
      window.clearInterval(pollId);
    };
  }, [isUnlocked, storageMode, webdavReady, webdavConfig, getS3Client, s3Creds.bucket, loadS3Files, refreshWebdavTree]);

  useEffect(() => {
    setPrintSettingsStore({ getS3Client, s3Creds, localRootHandle, storageMode, webdavConfig });
    setWebfontSettingsStore({ getS3Client, s3Creds, localRootHandle, storageMode, webdavConfig });
    setTableStyleSettingsStore({ getS3Client, s3Creds, localRootHandle, storageMode, webdavConfig });
    setCoverSettingsStore({ getS3Client, s3Creds, localRootHandle, storageMode, webdavConfig });
    setOgWorkerSettingsStore({ getS3Client, s3Creds, localRootHandle, storageMode, webdavConfig });
    setLlmPromptTemplatesStore({ getS3Client, s3Creds, localRootHandle, storageMode, webdavConfig });
    void loadWebfontsFromStorage().then((settings) => {
      notifyWebfontsChanged(settings);
    });
    void loadTableStylesFromStorage();
    void loadCoverSettingsFromStorage().then((settings) => {
      notifyCoverSettingsChanged(settings);
    });
    void loadOgWorkerSettingsFromStorage().then((settings) => {
      notifyOgWorkerSettingsChanged(settings);
    });
  }, [getS3Client, s3Creds, localRootHandle, storageMode, webdavConfig]);

  // Push existing IndexedDB AI templates to remote as soon as storage is ready
  useEffect(() => {
    if (!isUnlocked) return;
    const ready =
      (storageMode === 'local' && isLocalVaultReady(localRootHandle, localVaultFsPath)) ||
      (storageMode === 'webdav' && webdavReady) ||
      (storageMode === 's3' && s3Creds.bucket);
    if (!ready) return;
    syncLlmPromptTemplatesToRemote();
  }, [isUnlocked, storageMode, localRootHandle, localVaultFsPath, webdavReady, s3Creds.bucket]);

  // snippet load owned by usePwaSnippetsDomain

  const api = {
    handleShareBlockingChange,
    handleShareComposeClaimed,
    handleShareGroupSendConsumed,
  };
  return api;
}
