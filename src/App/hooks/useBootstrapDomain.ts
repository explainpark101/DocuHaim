/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react';
import { useAlertModal } from '@/contexts/AlertModalContext';
import { useAuth } from '@/contexts/AuthContext';
import { useVault } from '@/App/hooks/useVault';
import { useFileSessionOwned } from '@/App/providers/AppFileSessionStateProvider';
import { useFileSession } from '@/App/hooks/useFileSession';
import { useModalsOwned } from '@/App/providers/AppModalsStateProvider';
import { useWorkspaceTabsCtx } from '@/App/hooks/useWorkspaceTabsCtx';
import { useNavigate } from 'react-router';
import { resolveLlmProviderProfiles } from '@/utils/llmProviderProfiles';
import { encryptData, decryptData, encryptWithEntropy, decryptWithEntropy, deriveEntropyFromPassword } from '@/utils/crypto';
import {
  getStoredWebAuthn,
  isStoredWithWebAuthn,
  unlockWithWebAuthn,
  loadCredsWithWebAuthn,
  saveCredsWithWebAuthn,
  updateWebAuthnWrappedPassword,
} from '@/utils/webauthn';
import { SETTINGS_TAB_ID, anyFileTabDirty, getActiveFileTab } from '@/utils/workspaceTabs';
import { flushEditorIntoActiveFileTab } from '@/utils/workspaceTabs/appBridge';
import {
  saveWebdavConfig,
  decryptWebdavConfig,
  clearPlaintextWebdavConfig,
  hasEncryptedWebdavConfig,
} from '@/utils/storageSettings';
import { isDesktopApp } from '@/utils/isDesktopApp';
import { useUnsavedNavigationGuard } from '@/hooks/useUnsavedNavigationGuard';
import {
  hasDesktopStoredCredsMarker,
  getDesktopAppEntryLockModeSync,
  loadDesktopWebdavConfig,
  loadPasswordEncryptedCredsBlob,
  migrateLegacyDesktopSecretsToStronghold,
  saveDesktopCreds,
  saveDesktopWebdavConfig,
  savePasswordEncryptedCredsBlob,
} from '@/utils/desktopStrongholdSecrets';
import { decryptDesktopPasswordWebdav, refreshDesktopPasswordEntryLockSecrets } from '@/utils/desktopAppEntryLock';
import { unlockDesktopWithBiometricGate } from '@/utils/desktopBiometricUnlock';

/**
 * useBootstrapDomain: context-owned domain handlers.
 */
export function useBootstrapDomain() {
  const { showAlert } = useAlertModal();
  const { isUnlocked, masterPassword, proceedWithoutStoredCreds, s3Creds, setMasterPassword, setS3Creds, setShowSetPasswordModal, unlock } = useAuth();
  const { loadS3Files, setWebdavConfig, webdavConfig } = useVault();
  const { clearLastOpenedFileRef, clearOpenFileStateRef, currentFile, currentFileRef, editedFileName, editedFileNameRef, editorContentRef, hasUnsavedEditorChangesRef, navGuardRef, revokeOpenFileObjectUrlRef, setCurrentFile, setEditedFileName, setEditorContent, suppressUnsavedNavGuardRef } = useFileSessionOwned();
  const { renameCurrentFileFullName, saveFile } = useFileSession();
  const { importFileContent, pendingPasswordSave, pendingWebAuthnSave, setImportFileContent, setPendingPasswordSave, setPendingWebAuthnSave, setSaveMethodModalCreds, setShowExportPasswordModal, setShowImportPasswordModal, setShowOverwriteCredsConfirmModal, setShowSaveMethodModal, setShowSuffixChangeConfirmModal, setShowUnsavedConfirmModal, suffixConfirmAction, webauthnPRFSupported } = useModalsOwned();
  const { closeWorkspaceTabById, workspaceTabsEnabledRef, workspaceTabsRef } = useWorkspaceTabsCtx();
  const navigate = useNavigate();
  const handleUnlock = async (password: any) => {
    try {
      if (isDesktopApp()) {
        const migrated = await migrateLegacyDesktopSecretsToStronghold(password);
        if (migrated.creds) {
          unlock(migrated.creds as any, '');
          if (migrated.webdav) setWebdavConfig(migrated.webdav);
          return;
        }
      }

      const storedBlob = isDesktopApp() ? await loadPasswordEncryptedCredsBlob() : null;
      const stored = storedBlob
        ? JSON.stringify(storedBlob)
        : localStorage.getItem('s3NotesEncrypted');
      if (!stored) throw new Error("저장된 데이터가 없습니다.");
      const encryptedObj = JSON.parse(stored);
      if (encryptedObj?.webauthn) throw new Error("보안 키로 저장된 데이터는 비밀번호로 해제할 수 없습니다.");
      let decryptedStr;
      if (Array.isArray(encryptedObj.passwordSalt)) {
        const entropy = await deriveEntropyFromPassword(password, new Uint8Array(encryptedObj.passwordSalt));
        decryptedStr = await decryptWithEntropy(encryptedObj, entropy);
      } else {
        decryptedStr = await decryptData(password, encryptedObj);
      }
      const creds = JSON.parse(decryptedStr);
      if (isDesktopApp()) {
        const entryLockMode = getDesktopAppEntryLockModeSync();
        if (entryLockMode === 'password') {
          const decryptedWebdav = await decryptDesktopPasswordWebdav(password);
          if (decryptedWebdav) setWebdavConfig(decryptedWebdav);
          unlock(creds, password);
          return;
        }
        await saveDesktopCreds(creds);
        if (stored) {
          await savePasswordEncryptedCredsBlob(JSON.parse(stored));
        }
        const decryptedWebdav = await decryptWebdavConfig(password);
        if (decryptedWebdav) {
          await saveDesktopWebdavConfig(decryptedWebdav);
          setWebdavConfig(decryptedWebdav);
        }
        await migrateLegacyDesktopSecretsToStronghold(password);
      }
      unlock(creds as any, isDesktopApp() ? '' : password);
      if (!isDesktopApp()) {
        try {
          const decryptedWebdav = await decryptWebdavConfig(password);
          if (decryptedWebdav) setWebdavConfig(decryptedWebdav);
        } catch (webdavErr) {
          console.warn('WebDAV config decrypt failed:', webdavErr);
        }
      }
    } catch (e: any) {
      alert(e?.message || "비밀번호가 틀렸거나 데이터가 손상되었습니다.");
      console.error(e);
    }
  };

  const handleUnlockWithWebAuthn = async () => {
    if (isDesktopApp() && getDesktopAppEntryLockModeSync() === 'biometric') {
      const desktop = await unlockDesktopWithBiometricGate();
      if (desktop.creds) {
        unlock(desktop.creds as any, '');
        if (desktop.webdav) setWebdavConfig(desktop.webdav);
        loadS3Files(desktop.creds);
      } else {
        proceedWithoutStoredCreds();
      }
      navigate('/');
      return;
    }
    if (isStoredWithWebAuthn()) {
      const creds = await loadCredsWithWebAuthn();
      if (isDesktopApp()) {
        await saveDesktopCreds(creds);
        await migrateLegacyDesktopSecretsToStronghold();
        const webdav = await loadDesktopWebdavConfig();
        if (webdav) setWebdavConfig(webdav);
      }
      unlock(creds as any, '');
      loadS3Files(creds as any);
      navigate('/');
    } else {
      const password = await unlockWithWebAuthn();
      if (password) await handleUnlock(password);
    }
  };

  const saveEncryptedSettings = async (creds: any, password: any, options: any = {}) => {
    const { stayOnSettings = false } = options as { stayOnSettings?: boolean };
    try {
      if (isDesktopApp()) {
        await saveDesktopCreds(creds);
        setS3Creds(creds);
        setMasterPassword('');
        setShowSetPasswordModal(false);
        loadS3Files(creds);
        if (stayOnSettings) {
          showAlert({
            title: '연결 정보',
            message: '연결 정보 업데이트가 완료되었습니다.',
          });
        } else {
          navigate('/');
        }
        return;
      }

      const passwordSalt = window.crypto.getRandomValues(new Uint8Array(16));
      const entropy = await deriveEntropyFromPassword(password, passwordSalt);
      const encrypted = await encryptWithEntropy(JSON.stringify(creds), entropy);
      const stored = {
        passwordSalt: Array.from(passwordSalt),
        salt: encrypted.salt,
        iv: encrypted.iv,
        cipher: encrypted.cipher,
      };
      localStorage.setItem('s3NotesEncrypted', JSON.stringify(stored));
      if (webdavConfig?.endpoint || webdavConfig?.username || webdavConfig?.password) {
        await saveWebdavConfig(webdavConfig, password);
      }
      clearPlaintextWebdavConfig();
      setS3Creds(creds);
      setMasterPassword(password);
      setShowSetPasswordModal(false);
      if (getStoredWebAuthn()) {
        try {
          await updateWebAuthnWrappedPassword(password);
        } catch {
          // WebAuthn 래핑 갱신 실패 시에도 저장은 완료된 상태로 둠
        }
      }
      loadS3Files(creds);
      if (stayOnSettings) {
        showAlert({
          title: '연결 정보',
          message: '연결 정보 업데이트가 완료되었습니다.',
        });
      } else {
        navigate('/');
      }
    } catch (e: any) {
      alert("설정 저장 중 오류가 발생했습니다: " + e.message);
    }
  };

  /** Fields the settings S3/Gemini forms can change; missing/null ≡ ''. */
  const CREDS_COMPARE_KEYS = [
    'accessKeyId',
    'secretAccessKey',
    'region',
    'bucket',
    'endpoint',
    'googleAiStudioApiKey',
    'openaiCompatibleBaseUrl',
    'openaiCompatibleApiKey',
    'llmProviderProfiles',
    'imgbbApiKey',
  ];

  const S3_CONNECTION_KEYS = [
    'accessKeyId',
    'secretAccessKey',
    'region',
    'bucket',
    'endpoint',
  ];

  const normalizeCredsForCompare = (creds: any) => {
    if (!creds || typeof creds !== 'object') return null;
    const out: Record<string, any> = {};
    for (const key of CREDS_COMPARE_KEYS) {
      if (key === 'llmProviderProfiles') {
        out[key] = JSON.stringify(resolveLlmProviderProfiles(creds));
      } else {
        out[key] = creds[key] == null ? '' : String(creds[key]);
      }
    }
    return out;
  };

  const isCredsDirty = (formCreds: any, savedCreds: any) => {
    const a = normalizeCredsForCompare(formCreds);
    const b = normalizeCredsForCompare(savedCreds);
    if (!a || !b) return !!a !== !!b;
    return CREDS_COMPARE_KEYS.some((key) => a[key] !== b[key]);
  };

  const isS3ConnectionDirty = (formCreds: any, savedCreds: any) => {
    const a = normalizeCredsForCompare(formCreds);
    const b = normalizeCredsForCompare(savedCreds);
    if (!a || !b) return !!a !== !!b;
    return S3_CONNECTION_KEYS.some((key) => a[key] !== b[key]);
  };

  const shouldConfirmDesktopCredsOverwrite = (formCreds: any, savedCreds: any) => {
    if (!isDesktopApp()) return true;
    return isS3ConnectionDirty(formCreds, savedCreds);
  };

  const handleSaveS3Creds = (creds: any) => {
    if (isDesktopApp()) {
      void (async () => {
        try {
          if (getDesktopAppEntryLockModeSync() === 'password' && masterPassword) {
            await refreshDesktopPasswordEntryLockSecrets(masterPassword, creds, webdavConfig);
            setS3Creds(creds);
            loadS3Files(creds);
            showAlert({
              title: '연결 정보',
              message: '연결 정보 업데이트가 완료되었습니다.',
            });
            return;
          }
          if (hasStoredCreds() && shouldConfirmDesktopCredsOverwrite(creds, s3Creds)) {
            setPendingPasswordSave({ creds, password: '', options: { stayOnSettings: true } });
            setShowOverwriteCredsConfirmModal(true);
            return;
          }
          await saveDesktopCreds(creds);
          setS3Creds(creds);
          loadS3Files(creds);
          showAlert({
            title: '연결 정보',
            message: '연결 정보 업데이트가 완료되었습니다.',
          });
        } catch (e: any) {
          alert(e?.message || '설정 저장 중 오류가 발생했습니다.');
        }
      })();
      return;
    }
    setS3Creds(creds);
    setSaveMethodModalCreds(creds);
    setShowSaveMethodModal(true);
  };

  const handleSaveWithWebAuthn = async (creds: any) => {
    if (typeof localStorage !== 'undefined' && (localStorage.getItem('s3NotesEncrypted') || getStoredWebAuthn())) {
      setPendingWebAuthnSave(creds);
      setShowOverwriteCredsConfirmModal(true);
      return;
    }
    await saveCredsWithWebAuthn(creds);
    loadS3Files(creds);
    setShowSaveMethodModal(false);
    setSaveMethodModalCreds(null);
    showAlert({
      title: '연결 정보',
      message: '연결 정보 업데이트가 완료되었습니다.',
    });
  };

  const handleSaveWithPasswordFromModal = () => {
    setShowSaveMethodModal(false);
    setSaveMethodModalCreds(null);
    setShowSetPasswordModal(true);
  };

  const hasStoredCreds = () => {
    if (isDesktopApp()) {
      return (
        hasDesktopStoredCredsMarker() || getDesktopAppEntryLockModeSync() !== 'off'
      );
    }
    return (
      typeof localStorage !== 'undefined' &&
      (!!localStorage.getItem('s3NotesEncrypted') ||
        !!getStoredWebAuthn() ||
        hasEncryptedWebdavConfig())
    );
  };

  const requestSaveEncryptedSettings = (creds: any, password: any, options: any = {}) => {
    if (hasStoredCreds()) {
      if (isDesktopApp() && !shouldConfirmDesktopCredsOverwrite(creds, s3Creds)) {
        void saveEncryptedSettings(creds, password, options);
        return;
      }
      setPendingPasswordSave({ creds, password, options });
      setShowOverwriteCredsConfirmModal(true);
      return;
    }
    saveEncryptedSettings(creds, password, options);
  };

  const handleOverwriteCredsConfirm = async () => {
    try {
      if (pendingWebAuthnSave) {
        await saveCredsWithWebAuthn(pendingWebAuthnSave);
        loadS3Files(pendingWebAuthnSave);
        setShowSaveMethodModal(false);
        setSaveMethodModalCreds(null);
        setPendingWebAuthnSave(null);
        showAlert({
          title: '연결 정보',
          message: '연결 정보 업데이트가 완료되었습니다.',
        });
      } else if (pendingPasswordSave) {
        if (isDesktopApp()) {
          await saveDesktopCreds(pendingPasswordSave.creds);
          setS3Creds(pendingPasswordSave.creds);
          loadS3Files(pendingPasswordSave.creds);
          setPendingPasswordSave(null);
          showAlert({
            title: '연결 정보',
            message: '연결 정보 업데이트가 완료되었습니다.',
          });
        } else {
          await saveEncryptedSettings(
            pendingPasswordSave.creds,
            pendingPasswordSave.password,
            pendingPasswordSave.options
          );
          setPendingPasswordSave(null);
        }
      }
    } finally {
      setShowOverwriteCredsConfirmModal(false);
    }
  };

  const handleExportCreds = () => {
    if (!s3Creds?.bucket && !hasStoredCreds()) return alert("내보낼 데이터가 없습니다.");
    setShowExportPasswordModal(true);
  };

  const handleExportConfirm = async (exportPassword: any) => {
    try {
      const dataToExport = s3Creds;
      if (!dataToExport?.bucket) {
        alert("내보낼 연결 정보가 없습니다. 먼저 설정에서 S3 연결 정보를 저장하세요.");
        setShowExportPasswordModal(false);
        return;
      }
      const encryptedObj = await encryptData(exportPassword, JSON.stringify(dataToExport));
      const blob = new Blob([JSON.stringify(encryptedObj)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `s3-haim-creds-${new Date().toISOString()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setShowExportPasswordModal(false);
    } catch (e: any) {
      alert("내보내기 중 오류가 발생했습니다: " + (e?.message || e));
    }
  };

  const handleImportCreds = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      try {
        const content = event.target?.result;
        if (typeof content !== 'string') return;
        const parsed = JSON.parse(content);
        if (!parsed || typeof parsed !== 'object' || !parsed.salt || !parsed.iv || !parsed.ciphertext) {
          alert("잘못된 백업 파일 형식입니다. 비밀번호로 암호화된 JSON 파일이어야 합니다.");
          return;
        }
        setImportFileContent(content);
        setShowImportPasswordModal(true);
      } catch {
        alert("잘못된 파일 형식입니다.");
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleImportConfirm = async (importPassword: any) => {
    try {
      const encryptedObj = JSON.parse(importFileContent);
      const decryptedStr = await decryptData(importPassword, encryptedObj);
      const creds = JSON.parse(decryptedStr);
      setImportFileContent(null);
      setShowImportPasswordModal(false);
      if (isDesktopApp()) {
        await saveDesktopCreds(creds);
        setS3Creds(creds);
        setMasterPassword('');
        loadS3Files(creds);
        navigate('/');
        alert('복원되었습니다.');
      } else if (webauthnPRFSupported) {
        await saveCredsWithWebAuthn(creds);
        setS3Creds(creds);
        setMasterPassword('');
        loadS3Files(creds);
        navigate('/');
        alert("복원되었습니다. 이 기기에서는 보안 키로 잠금 해제됩니다.");
      } else {
        await saveEncryptedSettings(creds, importPassword);
      }
    } catch (_e) {
      alert("비밀번호가 틀렸거나 파일이 손상되었습니다.");
    }
  };

  const handleSettingsClose = (formCreds: any) => {
    if (!isUnlocked && hasStoredCreds()) {
      alert("저장소 잠금 해제 후 닫을 수 있습니다.");
      return;
    }
    if (formCreds != null && isCredsDirty(formCreds, s3Creds)) {
      setShowUnsavedConfirmModal(true);
      return;
    }
    if (workspaceTabsEnabledRef.current) {
      const hasSettings = workspaceTabsRef.current.tabs.some((t) => t.kind === 'settings');
      if (hasSettings) {
        closeWorkspaceTabById(SETTINGS_TAB_ID);
        return;
      }
    }
    navigate('/');
  };

  const handleUnsavedConfirmLeave = () => {
    setShowUnsavedConfirmModal(false);
    if (workspaceTabsEnabledRef.current) {
      const hasSettings = workspaceTabsRef.current.tabs.some((t) => t.kind === 'settings');
      if (hasSettings) {
        closeWorkspaceTabById(SETTINGS_TAB_ID, { skipHistory: false });
        return;
      }
    }
    navigate('/');
  };

  const handleSuffixChangeConfirm = async () => {
    const trimmed = (editedFileName ?? '').trim();
    if (!trimmed || !currentFile) {
      setShowSuffixChangeConfirmModal(false);
      return;
    }
    const isRenameAndSave = suffixConfirmAction === 'renameAndSave';
    setShowSuffixChangeConfirmModal(false);
    try {
      const updated = await renameCurrentFileFullName(trimmed);
      if (isRenameAndSave && updated) {
        await saveFile(updated);
      }
    } catch {
      // rename/save errors already handled inside
    }
  };

  const handleSuffixChangeCancel = () => {
    setShowSuffixChangeConfirmModal(false);
    if (suffixConfirmAction === 'renameOnly') {
      setEditedFileName(currentFile?.name ?? '');
    }
  };

  const hasUnsavedEditorChanges = useCallback(() => {
    if (suppressUnsavedNavGuardRef.current) return false;
    // Flush mirrors into a copy for accurate dirty check across tabs.
    const flushed = flushEditorIntoActiveFileTab(workspaceTabsRef.current, {
      editorContent: editorContentRef.current ?? '',
      currentFile: currentFileRef.current,
      editedFileName: editedFileNameRef.current ?? '',
    });
    if (anyFileTabDirty(flushed.tabs)) return true;
    const file = currentFileRef.current;
    if (!file) return false;
    const editable = ['markdown', 'json', 'raw', 'html', 'svg'].includes(file.viewer || 'markdown');
    return editable && file.content !== editorContentRef.current;
  }, []);

  const allowWorkspaceTabNavigation = useCallback(({ currentLocation, nextLocation }: any) => {
    if (!workspaceTabsEnabledRef.current) return false;
    const isShell = (pathname: any) => {
      const p = String(pathname || '');
      return (
        p === '/' ||
        p === '/chat' ||
        p.endsWith('/chat') ||
        p === '/settings' ||
        p.endsWith('/settings') ||
        p.startsWith('/view/')
      );
    };
    return isShell(currentLocation.pathname) && isShell(nextLocation.pathname);
  }, []);

  const navGuard = useUnsavedNavigationGuard({
    isDirty: hasUnsavedEditorChanges,
    shouldAllowNavigation: allowWorkspaceTabNavigation,
  });

  const revokeOpenFileObjectUrl = (file: any) => {
    if (
      file &&
      (file.viewer === 'image' || file.viewer === 'pdf' || file.viewer === 'audio' || file.viewer === 'video') &&
      file.objectUrl
    ) {
      URL.revokeObjectURL(file.objectUrl);
    }
  };

  const clearOpenFileState = useCallback(() => {
    // Close active file tab only (or clear mirrors when no tab model match).
    const active = getActiveFileTab(workspaceTabsRef.current);
    if (active) {
      closeWorkspaceTabById(active.id, { skipDirtyConfirm: true });
      return;
    }
    setCurrentFile((prev: any) => {
      revokeOpenFileObjectUrl(prev);
      return null;
    });
    currentFileRef.current = null;
    setEditorContent('');
    editorContentRef.current = '';
    clearLastOpenedFileRef.current?.();
  }, [clearLastOpenedFileRef, closeWorkspaceTabById]);

  const api = {
    handleUnlock,
    handleUnlockWithWebAuthn,
    handleSaveS3Creds,
    handleSaveWithWebAuthn,
    handleSaveWithPasswordFromModal,
    requestSaveEncryptedSettings,
    handleOverwriteCredsConfirm,
    handleExportCreds,
    handleExportConfirm,
    handleImportCreds,
    handleImportConfirm,
    handleSettingsClose,
    handleUnsavedConfirmLeave,
    handleSuffixChangeConfirm,
    handleSuffixChangeCancel,
    hasUnsavedEditorChanges,
    navGuard,
    clearOpenFileState,
    revokeOpenFileObjectUrl,
  };
  hasUnsavedEditorChangesRef.current = hasUnsavedEditorChanges;
  clearOpenFileStateRef.current = clearOpenFileState;
  revokeOpenFileObjectUrlRef.current = revokeOpenFileObjectUrl;
  navGuardRef.current = navGuard;
  return api;
}
