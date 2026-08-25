/**
 * Tauri biometric app lock — authenticate gate only.
 * All secrets (creds, markers, wrapped passwords) live in Stronghold.
 */

import {
  clearMasterPasswordWrap,
  clearPasswordEncryptedCredsBlob,
  isBiometricLockEnabled,
  loadDesktopCreds,
  loadMasterPasswordFromWrap,
  saveDesktopCreds,
  saveMasterPasswordWrap,
  saveStrongholdWebAuthnMarker,
  setBiometricLockEnabled,
  type StrongholdWebAuthnMarker,
} from '@/utils/desktopStrongholdSecrets';
import {
  isTauriBiometricAvailable,
  promptTauriBiometric,
  TAURI_BIOMETRIC_REASON_REGISTER,
  TAURI_BIOMETRIC_REASON_UNLOCK,
} from '@/utils/tauriBiometricLock';
import { isTauriApp } from '@/utils/tauriPlatform';

const BIOMETRY_DOMAIN = 'com.docuhaim.app';
const NAME_UNLOCK_PASSWORD = 'unlock-password';
const NAME_CREDS_ENTROPY = 'creds-entropy';
const MARKER_KEY = 's3NotesWebAuthn';

export type DesktopBiometryMode = 'password' | 'creds';

export type DesktopBiometryMarker = {
  desktopBiometry: true;
  mode: DesktopBiometryMode;
  /** Present when mode is password so existing UI treats unlock as enabled. */
  encryptedPassword?: true;
};

async function loadLegacyBiometryApi() {
  return import('@choochmeque/tauri-plugin-biometry-api');
}

async function removeLegacyKeychainEntries(): Promise<void> {
  if (!isTauriApp()) return;
  try {
    const { removeData } = await loadLegacyBiometryApi();
    await removeData({ domain: BIOMETRY_DOMAIN, name: NAME_UNLOCK_PASSWORD });
    await removeData({ domain: BIOMETRY_DOMAIN, name: NAME_CREDS_ENTROPY });
  } catch {
    // ignore — keychain may be empty or unavailable
  }
}

export function isDesktopBiometryMarker(data: unknown): data is DesktopBiometryMarker {
  return (
    !!data &&
    typeof data === 'object' &&
    (data as DesktopBiometryMarker).desktopBiometry === true &&
    ((data as DesktopBiometryMarker).mode === 'password' ||
      (data as DesktopBiometryMarker).mode === 'creds')
  );
}

export function getDesktopBiometryMarker(): DesktopBiometryMarker | null {
  try {
    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(MARKER_KEY) : null;
    if (!raw) return null;
    const data = JSON.parse(raw) as unknown;
    return isDesktopBiometryMarker(data) ? data : null;
  } catch {
    return null;
  }
}

function setDesktopBiometryMarker(marker: DesktopBiometryMarker | null) {
  if (!marker) {
    localStorage.removeItem(MARKER_KEY);
    void saveStrongholdWebAuthnMarker(null);
    return;
  }
  localStorage.setItem(MARKER_KEY, JSON.stringify(marker));
  void saveStrongholdWebAuthnMarker(marker as StrongholdWebAuthnMarker);
}

/** True when running in Tauri and platform biometry is available. */
export async function isDesktopBiometricAvailable(): Promise<boolean> {
  return isTauriBiometricAvailable();
}

export async function enableDesktopBiometricUnlock(masterPassword: string): Promise<void> {
  if (!(await isTauriBiometricAvailable())) {
    throw new Error('Biometric authentication is not available on this device.');
  }
  await promptTauriBiometric(TAURI_BIOMETRIC_REASON_REGISTER);
  await saveMasterPasswordWrap(masterPassword);
  await setBiometricLockEnabled(true);
  setDesktopBiometryMarker({
    desktopBiometry: true,
    mode: 'password',
    encryptedPassword: true,
  });
  await removeLegacyKeychainEntries();
}

export async function unlockWithDesktopBiometric(): Promise<string> {
  const marker = getDesktopBiometryMarker();
  if (!marker || marker.mode !== 'password') {
    throw new Error('등록된 생체 인증이 없습니다.');
  }
  await promptTauriBiometric(TAURI_BIOMETRIC_REASON_UNLOCK);
  const password = await loadMasterPasswordFromWrap();
  if (!password) throw new Error('저장된 마스터 비밀번호가 없습니다.');
  return password;
}

export async function updateDesktopBiometricWrappedPassword(
  newMasterPassword: string,
): Promise<void> {
  const marker = getDesktopBiometryMarker();
  if (!marker || marker.mode !== 'password') return;
  await saveMasterPasswordWrap(newMasterPassword);
}

export async function disableDesktopBiometricUnlock(): Promise<void> {
  setDesktopBiometryMarker(null);
  await setBiometricLockEnabled(false);
  await clearMasterPasswordWrap();
  await clearPasswordEncryptedCredsBlob();
  await removeLegacyKeychainEntries();
}

/**
 * Store S3/WebDAV creds in Stronghold with biometric app lock (Tauri).
 */
export async function saveCredsWithDesktopBiometric(creds: unknown): Promise<void> {
  if (!(await isTauriBiometricAvailable())) {
    throw new Error('Biometric authentication is not available on this device.');
  }
  await promptTauriBiometric(TAURI_BIOMETRIC_REASON_REGISTER);
  await saveDesktopCreds(creds);
  await clearMasterPasswordWrap();
  await clearPasswordEncryptedCredsBlob();
  await setBiometricLockEnabled(true);
  setDesktopBiometryMarker({ desktopBiometry: true, mode: 'creds' });
  await removeLegacyKeychainEntries();
  try {
    localStorage.removeItem('s3NotesEncrypted');
  } catch {
    // ignore
  }
}

export async function loadCredsWithDesktopBiometric(): Promise<unknown> {
  const marker = getDesktopBiometryMarker();
  if (!marker || marker.mode !== 'creds') {
    throw new Error('등록된 생체 인증이 없습니다.');
  }
  await promptTauriBiometric(TAURI_BIOMETRIC_REASON_UNLOCK);
  const creds = await loadDesktopCreds();
  if (!creds) throw new Error('저장된 연결 정보가 없습니다.');
  return creds;
}

/** Prompt biometrics and load Stronghold session (Tauri app lock). */
export async function unlockDesktopWithBiometricGate(): Promise<{
  creds: Record<string, unknown> | null;
  webdav: Awaited<ReturnType<typeof import('@/utils/desktopStrongholdSecrets').loadDesktopWebdavConfig>>;
}> {
  if (!(await isBiometricLockEnabled())) {
    throw new Error('Biometric app lock is not enabled.');
  }
  await promptTauriBiometric(TAURI_BIOMETRIC_REASON_UNLOCK);
  const { loadDesktopStrongholdAfterBiometric } = await import('@/utils/desktopStrongholdSecrets');
  return loadDesktopStrongholdAfterBiometric();
}

export async function isDesktopBiometricLockEnabled(): Promise<boolean> {
  if (!isTauriApp()) return false;
  return isBiometricLockEnabled();
}
