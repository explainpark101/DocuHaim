/**
 * Tauri desktop app entry lock — password or biometrics on launch / refocus.
 */

import { deriveEntropyFromPassword, encryptData, encryptWithEntropy, decryptData } from '@/utils/crypto';
import {
  clearDesktopCreds,
  clearDesktopWebdavConfig,
  clearPasswordEncryptedCredsBlob,
  clearPasswordEncryptedWebdavBlob,
  getDesktopAppEntryLockModeSync,
  hasDesktopBiometricLockMarker,
  hasDesktopStoredCredsMarker,
  loadDesktopAppEntryLockMode,
  loadDesktopCreds,
  loadDesktopWebdavConfig,
  loadPasswordEncryptedCredsBlob,
  loadPasswordEncryptedWebdavBlob,
  saveDesktopAppEntryLockMode,
  saveDesktopCreds,
  saveDesktopWebdavConfig,
  savePasswordEncryptedCredsBlob,
  savePasswordEncryptedWebdavBlob,
  type DesktopAppEntryLockMode,
} from '@/utils/desktopStrongholdSecrets';
import {
  clearDesktopBiometricEnrollment,
  disableDesktopBiometricUnlock,
  enableDesktopBiometricGateOnly,
  isDesktopBiometricAvailable,
  saveCredsWithDesktopBiometric,
} from '@/utils/desktopBiometricUnlock';
import { DEFAULT_WEBDAV_CONFIG } from '@/utils/storageSettings';
import { isDesktopApp } from '@/utils/isDesktopApp';

export type { DesktopAppEntryLockMode };

export function hasDesktopAppEntryLock(): boolean {
  if (!isDesktopApp()) return false;
  const mode = getDesktopAppEntryLockModeSync();
  return mode === 'password' || mode === 'biometric';
}

export async function resolveDesktopAppEntryLockMode(): Promise<DesktopAppEntryLockMode> {
  if (!isDesktopApp()) return 'off';
  const stored = await loadDesktopAppEntryLockMode();
  if (stored) return stored;
  if (hasDesktopBiometricLockMarker()) return 'biometric';
  const passwordBlob = await loadPasswordEncryptedCredsBlob();
  if (passwordBlob && !hasDesktopStoredCredsMarker()) return 'password';
  return 'off';
}

async function encryptCredsWithPassword(
  password: string,
  creds: unknown,
): Promise<Record<string, unknown>> {
  const passwordSalt = crypto.getRandomValues(new Uint8Array(16));
  const entropy = await deriveEntropyFromPassword(password, passwordSalt);
  const encrypted = await encryptWithEntropy(JSON.stringify(creds), entropy);
  return {
    passwordSalt: Array.from(passwordSalt),
    salt: encrypted.salt,
    iv: encrypted.iv,
    cipher: encrypted.cipher,
  };
}

async function encryptWebdavWithPassword(password: string, webdav: unknown): Promise<unknown> {
  return encryptData(password, JSON.stringify(webdav));
}

function hasMeaningfulCreds(creds: unknown): boolean {
  if (!creds || typeof creds !== 'object') return false;
  const rec = creds as Record<string, unknown>;
  return Boolean(
    String(rec.accessKeyId ?? '').trim() ||
      String(rec.secretAccessKey ?? '').trim() ||
      String(rec.bucket ?? '').trim(),
  );
}

function normalizeWebdav(webdav: unknown) {
  const rec = (webdav && typeof webdav === 'object' ? webdav : {}) as Record<string, unknown>;
  return {
    endpoint: typeof rec.endpoint === 'string' ? rec.endpoint : DEFAULT_WEBDAV_CONFIG.endpoint,
    username: typeof rec.username === 'string' ? rec.username : DEFAULT_WEBDAV_CONFIG.username,
    password: typeof rec.password === 'string' ? rec.password : DEFAULT_WEBDAV_CONFIG.password,
    basePath: typeof rec.basePath === 'string' ? rec.basePath : DEFAULT_WEBDAV_CONFIG.basePath,
  };
}

async function resolveCredsForEntryLock(creds: unknown): Promise<Record<string, unknown>> {
  if (hasMeaningfulCreds(creds)) {
    return creds as Record<string, unknown>;
  }
  const fromStronghold = await loadDesktopCreds<Record<string, unknown>>();
  if (hasMeaningfulCreds(fromStronghold)) {
    return fromStronghold as Record<string, unknown>;
  }
  if (creds && typeof creds === 'object') {
    return creds as Record<string, unknown>;
  }
  return {};
}

function formatEntryLockError(error: unknown, fallback: string): string {
  if (error instanceof Error && error.message.trim()) return error.message;
  if (typeof error === 'string' && error.trim()) return error;
  return fallback;
}

export { formatEntryLockError };

export async function decryptDesktopPasswordWebdav(password: string): Promise<ReturnType<typeof normalizeWebdav> | null> {
  const blob = await loadPasswordEncryptedWebdavBlob();
  if (!blob || !password) return null;
  try {
    const json = await decryptData(password, blob as never);
    return normalizeWebdav(JSON.parse(json));
  } catch {
    return null;
  }
}

export async function enableDesktopPasswordEntryLock(
  password: string,
  creds: unknown,
  webdav: unknown,
): Promise<void> {
  if (!isDesktopApp()) return;
  const trimmed = password.trim();
  if (!trimmed) throw new Error('비밀번호를 입력하세요.');

  const resolvedCreds = await resolveCredsForEntryLock(creds);
  const encryptedCreds = await encryptCredsWithPassword(trimmed, resolvedCreds);
  await clearDesktopBiometricEnrollment();
  await savePasswordEncryptedCredsBlob(encryptedCreds);

  const resolvedWebdav = normalizeWebdav(
    webdav ?? (await loadDesktopWebdavConfig()) ?? DEFAULT_WEBDAV_CONFIG,
  );
  if (resolvedWebdav.endpoint || resolvedWebdav.username || resolvedWebdav.password) {
    const encryptedWebdav = await encryptWebdavWithPassword(trimmed, resolvedWebdav);
    await savePasswordEncryptedWebdavBlob(encryptedWebdav);
  } else {
    await clearPasswordEncryptedWebdavBlob();
  }

  await clearDesktopCreds();
  await clearDesktopWebdavConfig();
  await saveDesktopAppEntryLockMode('password');
}

export async function enableDesktopBiometricEntryLock(creds: unknown): Promise<void> {
  if (!isDesktopApp()) return;
  if (!(await isDesktopBiometricAvailable())) {
    throw new Error('이 기기에서는 생체 인증을 사용할 수 없습니다.');
  }

  const resolvedCreds = await resolveCredsForEntryLock(creds);
  await clearPasswordEncryptedCredsBlob();
  await clearPasswordEncryptedWebdavBlob();

  if (hasMeaningfulCreds(resolvedCreds)) {
    await saveCredsWithDesktopBiometric(resolvedCreds);
  } else {
    await enableDesktopBiometricGateOnly();
  }
  await saveDesktopAppEntryLockMode('biometric');
}

export async function disableDesktopAppEntryLock(
  creds?: unknown,
  webdav?: unknown,
): Promise<void> {
  if (!isDesktopApp()) return;

  let resolvedCreds = creds;
  if (!hasMeaningfulCreds(resolvedCreds)) {
    resolvedCreds = await loadDesktopCreds();
  }
  if (!hasMeaningfulCreds(resolvedCreds)) {
    const passwordBlob = await loadPasswordEncryptedCredsBlob();
    if (passwordBlob) {
      throw new Error('비밀번호로 잠금 해제한 뒤 사용 해제할 수 있습니다.');
    }
  }

  const resolvedWebdav = normalizeWebdav(
    webdav ?? (await loadDesktopWebdavConfig()) ?? DEFAULT_WEBDAV_CONFIG,
  );

  await disableDesktopBiometricUnlock();
  await clearPasswordEncryptedCredsBlob();
  await clearPasswordEncryptedWebdavBlob();

  if (hasMeaningfulCreds(resolvedCreds)) {
    await saveDesktopCreds(resolvedCreds);
  }
  if (resolvedWebdav.endpoint || resolvedWebdav.username || resolvedWebdav.password) {
    await saveDesktopWebdavConfig(resolvedWebdav);
  }

  await saveDesktopAppEntryLockMode('off');
}

export async function refreshDesktopPasswordEntryLockSecrets(
  password: string,
  creds: unknown,
  webdav: unknown,
): Promise<void> {
  if (!isDesktopApp()) return;
  if (getDesktopAppEntryLockModeSync() !== 'password') return;
  const trimmed = password.trim();
  if (!trimmed) return;
  await enableDesktopPasswordEntryLock(trimmed, creds, webdav);
}
