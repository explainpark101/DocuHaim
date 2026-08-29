/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { useAuth } from '@/contexts/AuthContext';
import { useVault } from '@/App/hooks/useVault';
import { useBootstrapOwned } from '@/App/providers/AppBootstrapStateProvider';
import { useChromeOwned } from '@/App/providers/AppChromeStateProvider';
import {
  applyForcedAppUpdate,
  checkAppBuildUpdate,
  checkServiceWorkerUpdate,
  getLocalAppBuildId,
} from '@/utils/pwaUpdate';
import {
  checkTauriDesktopUpdate,
  initTauriDesktopUpdaterPolling,
  installPendingTauriDesktopUpdate,
  setTauriDesktopUpdateListener,
} from '@/utils/tauriDesktopUpdater';
import { isTauriDesktopPlatform } from '@/utils/tauriPlatform';
import { getObjectBody, headObject, putObject } from '@/utils/s3Client';
import { createWebdavBackend } from '@/utils/storage';

/** Owned setters/state passed from AppPwaSnippetsStateProvider (avoids circular import). */
export type PwaSnippetsOwnedForDomain = {
  snippetConfig: { snippets: any[] };
  setSnippetConfig: (cfg: any) => void;
  swRegistration: any;
  setSwRegistration: (r: any) => void;
  setIsApplyingPwaUpdate: (v: any) => void;
  setHidePwaUpdateToast: (v: any) => void;
  setIsCheckingAppUpdate: (v: any) => void;
  showAppUpdateConfirmModal: boolean;
  setShowAppUpdateConfirmModal: (v: any) => void;
  appUpdateAvailable: boolean;
  setAppUpdateAvailable: (v: any) => void;
  appBuildLocalId: string;
  setAppBuildLocalId: (id: any) => void;
  appBuildRemoteId: string;
  setAppBuildRemoteId: (id: any) => void;
  setAppUpdateCheckError: (e: any) => void;
};

/**
 * Owns PWA update handlers + snippet load/save.
 * Call from AppPwaSnippetsStateProvider (below Chrome, above AppLogic).
 */
export function usePwaSnippetsDomain(owned: PwaSnippetsOwnedForDomain) {
  const { isUnlocked, s3Creds } = useAuth();
  const { scriptsLoaded } = useBootstrapOwned();
  const { setOperationStatus } = useChromeOwned();
  const {
    storageMode,
    localRootHandle,
    webdavConfig,
    webdavReady,
    getS3Client,
  } = useVault();

  const {
    snippetConfig,
    setSnippetConfig,
    setSwRegistration,
    swRegistration,
    setIsApplyingPwaUpdate,
    setHidePwaUpdateToast,
    setIsCheckingAppUpdate,
    showAppUpdateConfirmModal,
    setShowAppUpdateConfirmModal,
    appUpdateAvailable,
    setAppUpdateAvailable,
    appBuildLocalId,
    setAppBuildLocalId,
    appBuildRemoteId,
    setAppBuildRemoteId,
    setAppUpdateCheckError,
  } = owned;

  const [snippetLoadedFromS3, setSnippetLoadedFromS3] = useState(false);
  const [snippetLoadedFromLocal, setSnippetLoadedFromLocal] = useState(false);
  const [snippetLoadedFromWebdav, setSnippetLoadedFromWebdav] = useState(false);
  const [isSavingSnippets, setIsSavingSnippets] = useState(false);

  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    immediate: true,
    onRegisteredSW(_swUrl, registration) {
      if (registration) setSwRegistration(registration);
    },
    onRegisterError(error) {
      console.error('PWA service worker registration error:', error);
    },
  });

  useEffect(() => {
    if (!isTauriDesktopPlatform()) return undefined;

    setTauriDesktopUpdateListener((result) => {
      if (!result.updateAvailable) return;
      setAppBuildLocalId(result.localVersion);
      setAppBuildRemoteId(result.remoteVersion ?? '');
      setAppUpdateCheckError('');
      setAppUpdateAvailable(true);
      setShowAppUpdateConfirmModal(true);
    });
    initTauriDesktopUpdaterPolling();

    return () => {
      setTauriDesktopUpdateListener(null);
    };
  }, [
    setAppBuildLocalId,
    setAppBuildRemoteId,
    setAppUpdateCheckError,
    setAppUpdateAvailable,
    setShowAppUpdateConfirmModal,
  ]);

  useEffect(() => {
    if (isTauriDesktopPlatform()) return undefined;
    if (!swRegistration) return undefined;

    const checkForUpdate = () => {
      swRegistration.update().catch((error: any) => {
        console.warn('PWA update check failed:', error);
      });
    };

    checkForUpdate();
    const interval = setInterval(checkForUpdate, 5 * 60 * 1000);
    const onVisible = () => {
      if (document.visibilityState === 'visible') checkForUpdate();
    };
    document.addEventListener('visibilitychange', onVisible);
    window.addEventListener('focus', checkForUpdate);
    window.addEventListener('pageshow', checkForUpdate);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('focus', checkForUpdate);
      window.removeEventListener('pageshow', checkForUpdate);
    };
  }, [swRegistration]);

  useEffect(() => {
    if (needRefresh) {
      setHidePwaUpdateToast(false);
      setIsApplyingPwaUpdate(false);
    }
  }, [needRefresh, setHidePwaUpdateToast, setIsApplyingPwaUpdate]);

  useEffect(() => {
    if (showAppUpdateConfirmModal && needRefresh) {
      setAppUpdateAvailable(true);
    }
  }, [needRefresh, showAppUpdateConfirmModal, setAppUpdateAvailable]);

  const handleApplyPwaUpdate = useCallback(async () => {
    try {
      setIsApplyingPwaUpdate(true);
      await updateServiceWorker(true);
    } catch (error) {
      console.error('PWA update apply failed:', error);
      setIsApplyingPwaUpdate(false);
    }
  }, [updateServiceWorker, setIsApplyingPwaUpdate]);

  const handleCheckAppUpdate = useCallback(async () => {
    setIsCheckingAppUpdate(true);
    try {
      if (isTauriDesktopPlatform()) {
        const desktopCheck = await checkTauriDesktopUpdate();
        setAppBuildLocalId(desktopCheck.localVersion || '');
        setAppBuildRemoteId(desktopCheck.remoteVersion ?? '');
        if (desktopCheck.ok) {
          setAppUpdateCheckError('');
          setAppUpdateAvailable(desktopCheck.updateAvailable);
        } else {
          setAppUpdateCheckError(desktopCheck.error || 'unknown');
          setAppUpdateAvailable(Boolean(desktopCheck.updateAvailable));
        }
        return;
      }

      const buildCheck = await checkAppBuildUpdate();
      setAppBuildLocalId(buildCheck.localId || getLocalAppBuildId());

      let swFound = false;
      try {
        swFound = await checkServiceWorkerUpdate(swRegistration, 2500);
      } catch (error) {
        console.warn('Service worker update check failed:', error);
      }

      const waiting = Boolean(needRefresh || swRegistration?.waiting || swFound);
      if (buildCheck.ok) {
        setAppBuildRemoteId(buildCheck.remoteId);
        setAppUpdateCheckError('');
        setAppUpdateAvailable(Boolean(buildCheck.updateAvailable || waiting));
      } else {
        setAppBuildRemoteId(buildCheck.remoteId || '');
        setAppUpdateCheckError(buildCheck.error || 'unknown');
        setAppUpdateAvailable(waiting);
        console.warn('App update check failed:', buildCheck.error);
      }
    } catch (error: any) {
      console.warn('App update check failed:', error);
      setAppBuildLocalId(getLocalAppBuildId());
      setAppBuildRemoteId('');
      setAppUpdateCheckError(error?.message || String(error) || 'unknown');
      setAppUpdateAvailable(Boolean(needRefresh || swRegistration?.waiting));
    } finally {
      setIsCheckingAppUpdate(false);
      setShowAppUpdateConfirmModal(true);
    }
  }, [
    needRefresh,
    swRegistration,
    setIsCheckingAppUpdate,
    setAppBuildLocalId,
    setAppBuildRemoteId,
    setAppUpdateCheckError,
    setAppUpdateAvailable,
    setShowAppUpdateConfirmModal,
  ]);

  const handleConfirmAppUpdate = useCallback(async () => {
    setShowAppUpdateConfirmModal(false);
    setHidePwaUpdateToast(true);
    if (isTauriDesktopPlatform()) {
      try {
        setIsApplyingPwaUpdate(true);
        await installPendingTauriDesktopUpdate();
      } catch (error) {
        console.error('Tauri desktop update apply failed:', error);
        setIsApplyingPwaUpdate(false);
      }
      return;
    }
    const buildMismatch = Boolean(
      appBuildLocalId && appBuildRemoteId && appBuildLocalId !== appBuildRemoteId,
    );
    try {
      setIsApplyingPwaUpdate(true);
      if (buildMismatch) {
        await applyForcedAppUpdate();
        return;
      }
      if (needRefresh || appUpdateAvailable || swRegistration?.waiting) {
        await updateServiceWorker(true);
        return;
      }
      window.location.reload();
    } catch (error) {
      console.error('App update apply failed:', error);
      setIsApplyingPwaUpdate(false);
      window.location.reload();
    }
  }, [
    appBuildLocalId,
    appBuildRemoteId,
    appUpdateAvailable,
    needRefresh,
    swRegistration,
    updateServiceWorker,
    setShowAppUpdateConfirmModal,
    setHidePwaUpdateToast,
    setIsApplyingPwaUpdate,
  ]);

  const loadSnippetConfigFromS3 = useCallback(
    async (creds = s3Creds) => {
      const client = getS3Client(creds);
      if (!client || !creds?.bucket) return;
      try {
        const head = await headObject(client, creds.bucket, '.settings/snippets.json');
        if (!head) {
          setSnippetLoadedFromS3(true);
          return;
        }
        const { body } = await getObjectBody(client, creds.bucket, '.settings/snippets.json');
        const text = new TextDecoder('utf-8').decode(body);
        const parsed = JSON.parse(text);
        if (parsed && Array.isArray(parsed.snippets)) {
          setSnippetConfig({ snippets: parsed.snippets });
        }
        setSnippetLoadedFromS3(true);
      } catch (e) {
        console.error('Snippet settings load from S3 failed:', e);
        setSnippetLoadedFromS3(true);
      }
    },
    [getS3Client, s3Creds, setSnippetConfig],
  );

  const loadSnippetConfigFromLocal = useCallback(async () => {
    if (!localRootHandle) return;
    try {
      const settingsDir = await localRootHandle.getDirectoryHandle('.settings', { create: false });
      const fileHandle = await settingsDir.getFileHandle('snippets.json', { create: false });
      const file = await fileHandle.getFile();
      const text = await file.text();
      const parsed = JSON.parse(text);
      if (parsed && Array.isArray(parsed.snippets)) {
        setSnippetConfig({ snippets: parsed.snippets });
      }
      setSnippetLoadedFromLocal(true);
    } catch (_e) {
      setSnippetLoadedFromLocal(true);
    }
  }, [localRootHandle, setSnippetConfig]);

  const loadSnippetConfigFromWebdav = useCallback(async () => {
    if (!webdavReady) return;
    try {
      const backend = createWebdavBackend(webdavConfig);
      const head = await backend.head('.settings/snippets.json');
      if (!head) {
        setSnippetLoadedFromWebdav(true);
        return;
      }
      const { text } = await backend.readText('.settings/snippets.json');
      const parsed = JSON.parse(text);
      if (parsed && Array.isArray(parsed.snippets)) {
        setSnippetConfig({ snippets: parsed.snippets });
      }
      setSnippetLoadedFromWebdav(true);
    } catch (e) {
      console.error('Snippet settings load from WebDAV failed:', e);
      setSnippetLoadedFromWebdav(true);
    }
  }, [webdavConfig, webdavReady, setSnippetConfig]);

  useEffect(() => {
    if (!scriptsLoaded || !isUnlocked) return;
    if (storageMode === 'local' && localRootHandle && !snippetLoadedFromLocal) {
      loadSnippetConfigFromLocal();
    } else if (storageMode === 'webdav' && webdavReady && !snippetLoadedFromWebdav) {
      loadSnippetConfigFromWebdav();
    } else if (storageMode === 's3' && s3Creds.bucket && !snippetLoadedFromS3) {
      loadSnippetConfigFromS3();
    }
  }, [
    scriptsLoaded,
    isUnlocked,
    storageMode,
    s3Creds.bucket,
    localRootHandle,
    webdavReady,
    snippetLoadedFromS3,
    snippetLoadedFromLocal,
    snippetLoadedFromWebdav,
    loadSnippetConfigFromS3,
    loadSnippetConfigFromLocal,
    loadSnippetConfigFromWebdav,
  ]);

  const saveSnippetConfigToS3 = useCallback(
    async (config: any) => {
      const client = getS3Client();
      if (!client || !s3Creds.bucket) return;
      try {
        await putObject(client, {
          Bucket: s3Creds.bucket,
          Key: '.settings/snippets.json',
          Body: JSON.stringify(config ?? { snippets: [] }, null, 2),
          ContentType: 'application/json',
          CacheControl: 'no-cache, no-store, must-revalidate',
        });
      } catch (e) {
        console.error('Snippet settings save to S3 failed:', e);
        throw e;
      }
    },
    [getS3Client, s3Creds],
  );

  const saveSnippetConfigToLocal = useCallback(
    async (config: any) => {
      if (!localRootHandle) return;
      try {
        const settingsDir = await localRootHandle.getDirectoryHandle('.settings', { create: true });
        const fileHandle = await settingsDir.getFileHandle('snippets.json', { create: true });
        const writable = await fileHandle.createWritable();
        await writable.write(JSON.stringify(config ?? { snippets: [] }, null, 2));
        await writable.close();
      } catch (e) {
        console.error('Snippet settings save to local failed:', e);
      }
    },
    [localRootHandle],
  );

  const saveSnippetConfigToWebdav = useCallback(
    async (config: any) => {
      if (!webdavReady) return;
      try {
        const backend = createWebdavBackend(webdavConfig);
        await backend.writeText(
          '.settings/snippets.json',
          JSON.stringify(config ?? { snippets: [] }, null, 2),
          'application/json',
        );
      } catch (e) {
        console.error('Snippet settings save to WebDAV failed:', e);
        throw e;
      }
    },
    [webdavConfig, webdavReady],
  );

  const handleChangeSnippetConfig = useCallback(
    (nextConfig: any) => {
      setSnippetConfig(nextConfig ?? { snippets: [] });
    },
    [setSnippetConfig],
  );

  const handleSaveSnippetConfig = useCallback(
    async (config: any) => {
      const toSave = config ?? snippetConfig;
      setIsSavingSnippets(true);
      try {
        if (storageMode === 's3') {
          await saveSnippetConfigToS3(toSave);
        } else if (storageMode === 'local') {
          await saveSnippetConfigToLocal(toSave);
        } else if (storageMode === 'webdav') {
          await saveSnippetConfigToWebdav(toSave);
        }
        setOperationStatus('스니펫 설정이 저장되었습니다.');
      } catch (e: any) {
        alert('스니펫 설정 저장에 실패했습니다: ' + (e?.message || e));
      } finally {
        setIsSavingSnippets(false);
      }
    },
    [
      snippetConfig,
      storageMode,
      saveSnippetConfigToS3,
      saveSnippetConfigToLocal,
      saveSnippetConfigToWebdav,
      setOperationStatus,
    ],
  );

  return {
    needRefresh,
    handleApplyPwaUpdate,
    handleCheckAppUpdate,
    handleConfirmAppUpdate,
    handleChangeSnippetConfig,
    handleSaveSnippetConfig,
    isSavingSnippets,
    snippetLoadedFromLocal,
    snippetLoadedFromS3,
    snippetLoadedFromWebdav,
  };
}
