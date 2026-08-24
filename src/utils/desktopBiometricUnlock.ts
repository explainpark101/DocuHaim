/**
 * Desktop (Tauri) biometric unlock via native Touch ID / Windows Hello.
 * WebView WebAuthn/PRF is unreliable in Tauri; this uses tauri-plugin-biometry
 * (macOS keychain, Windows Hello + native webauthn.dll PRF).
 */

import { isDesktopApp } from '@/utils/isDesktopApp';

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

async function loadBiometryApi() {
  return import('@choochmeque/tauri-plugin-biometry-api');
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
    return;
  }
  localStorage.setItem(MARKER_KEY, JSON.stringify(marker));
}

/** True when running in Tauri and platform biometry is available. */
export async function isDesktopBiometricAvailable(): Promise<boolean> {
  if (!isDesktopApp()) return false;
  try {
    const { checkStatus } = await loadBiometryApi();
    const status = await checkStatus();
    return status.isAvailable === true;
  } catch {
    return false;
  }
}

export async function enableDesktopBiometricUnlock(masterPassword: string): Promise<void> {
  const { setData, removeData } = await loadBiometryApi();
  await setData({
    domain: BIOMETRY_DOMAIN,
    name: NAME_UNLOCK_PASSWORD,
    data: masterPassword,
  });
  try {
    await removeData({ domain: BIOMETRY_DOMAIN, name: NAME_CREDS_ENTROPY });
  } catch {
    /* ignore */
  }
  setDesktopBiometryMarker({
    desktopBiometry: true,
    mode: 'password',
    encryptedPassword: true,
  });
}

export async function unlockWithDesktopBiometric(): Promise<string> {
  const marker = getDesktopBiometryMarker();
  if (!marker || marker.mode !== 'password') {
    throw new Error('등록된 생체 인증이 없습니다.');
  }
  const { getData } = await loadBiometryApi();
  const response = await getData({
    domain: BIOMETRY_DOMAIN,
    name: NAME_UNLOCK_PASSWORD,
    reason: 'Unlock DocuHaim vault',
    cancelTitle: 'Cancel',
  });
  if (!response?.data) throw new Error('생체 인증에 실패했습니다.');
  return response.data;
}

export async function updateDesktopBiometricWrappedPassword(
  newMasterPassword: string,
): Promise<void> {
  const marker = getDesktopBiometryMarker();
  if (!marker || marker.mode !== 'password') return;
  const { setData } = await loadBiometryApi();
  await setData({
    domain: BIOMETRY_DOMAIN,
    name: NAME_UNLOCK_PASSWORD,
    data: newMasterPassword,
  });
}

export async function disableDesktopBiometricUnlock(): Promise<void> {
  setDesktopBiometryMarker(null);
  try {
    const { removeData } = await loadBiometryApi();
    await removeData({ domain: BIOMETRY_DOMAIN, name: NAME_UNLOCK_PASSWORD });
    await removeData({ domain: BIOMETRY_DOMAIN, name: NAME_CREDS_ENTROPY });
  } catch {
    /* ignore keychain errors after marker cleared */
  }
}

function bufToBase64(buf: ArrayBuffer | Uint8Array): string {
  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  return btoa(String.fromCharCode(...bytes));
}

function base64ToBytes(b64: string): Uint8Array {
  return Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
}

/**
 * Store S3/WebDAV creds encrypted with biometry-protected entropy (desktop).
 */
export async function saveCredsWithDesktopBiometric(creds: unknown): Promise<void> {
  const { setData, removeData } = await loadBiometryApi();
  const { encryptWithEntropy } = await import('@/utils/crypto');
  const entropy = crypto.getRandomValues(new Uint8Array(32));
  const encrypted = await encryptWithEntropy(JSON.stringify(creds), entropy);
  await setData({
    domain: BIOMETRY_DOMAIN,
    name: NAME_CREDS_ENTROPY,
    data: bufToBase64(entropy),
  });
  try {
    await removeData({ domain: BIOMETRY_DOMAIN, name: NAME_UNLOCK_PASSWORD });
  } catch {
    /* ignore */
  }
  localStorage.setItem(
    's3NotesEncrypted',
    JSON.stringify({ ...encrypted, webauthn: true }),
  );
  setDesktopBiometryMarker({ desktopBiometry: true, mode: 'creds' });
}

export async function loadCredsWithDesktopBiometric(): Promise<unknown> {
  const marker = getDesktopBiometryMarker();
  if (!marker || marker.mode !== 'creds') {
    throw new Error('등록된 생체 인증이 없습니다.');
  }
  const raw = localStorage.getItem('s3NotesEncrypted');
  if (!raw) throw new Error('저장된 연결 정보가 없습니다.');
  const blob = JSON.parse(raw) as { webauthn?: boolean };
  if (blob?.webauthn !== true) throw new Error('보안 키로 저장된 데이터가 아닙니다.');

  const { getData } = await loadBiometryApi();
  const { decryptWithEntropy } = await import('@/utils/crypto');
  const response = await getData({
    domain: BIOMETRY_DOMAIN,
    name: NAME_CREDS_ENTROPY,
    reason: 'Unlock DocuHaim vault',
    cancelTitle: 'Cancel',
  });
  if (!response?.data) throw new Error('생체 인증에 실패했습니다.');
  const entropy = base64ToBytes(response.data);
  const decryptedStr = await decryptWithEntropy(blob as never, entropy);
  return JSON.parse(decryptedStr);
}
