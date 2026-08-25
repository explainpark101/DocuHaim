/**
 * Desktop (Tauri) secret storage via @tauri-apps/plugin-stronghold.
 * Secrets are encrypted at rest in the app data directory; no master password
 * prompt is required on each launch (unlike the web localStorage flow).
 */

import { Stronghold, type Client, type Store } from '@tauri-apps/plugin-stronghold';
import { appDataDir, join } from '@tauri-apps/api/path';
import { isDesktopApp } from '@/utils/isDesktopApp';
import {
  decryptData,
  encryptWithEntropy,
  decryptWithEntropy,
  deriveEntropyFromPassword,
} from '@/utils/crypto';
import {
  getStoredWebAuthn,
  isStoredWithWebAuthn,
  loadCredsWithWebAuthn,
} from '@/utils/webauthn';
import { DEFAULT_WEBDAV_CONFIG } from '@/utils/storageSettings';

const VAULT_FILE = 'docuhaim-vault.hold';
/** Internal vault password — Stronghold still encrypts the snapshot on disk. */
const VAULT_PASSWORD = 'docuhaim-stronghold-vault-v1';
const CLIENT_NAME = 'docuhaim';

const KEY_S3_CREDS = 's3-creds';
const KEY_WEBDAV_CONFIG = 'webdav-config';
const KEY_BIOMETRIC_LOCK = 'biometric-lock-v1';
const KEY_PASSWORD_ENCRYPTED_CREDS = 'password-encrypted-creds-v1';
const KEY_MASTER_PASSWORD_WRAP = 'master-password-wrap-v1';
const KEY_WEBAUTHN_MARKER = 'webauthn-marker-v1';

/** Sync marker so hasStoredCreds() works without awaiting Stronghold. */
export const DESKTOP_STRONGHOLD_CREDS_MARKER = 's3haim_desktop_stronghold_creds';
/** Sync marker: biometric app lock is enabled (Tauri only). */
export const DESKTOP_BIOMETRIC_LOCK_MARKER = 's3haim_desktop_biometric_lock';

const LEGACY_ENCRYPTED_KEY = 's3NotesEncrypted';
const LEGACY_WEBAUTHN_KEY = 's3NotesWebAuthn';
const LEGACY_WEBDAV_CONFIG_KEY = 's3haim_webdav_config';
const LEGACY_WEBDAV_ENCRYPTED_KEY = 's3haim_webdav_encrypted';

export type StrongholdBiometricLockConfig = {
  enabled: boolean;
  enrolledAt?: string;
};

export type StrongholdWebAuthnMarker =
  | { desktopBiometry: true; mode: 'password'; encryptedPassword?: true }
  | { desktopBiometry: true; mode: 'creds' }
  | { credentialId: string; salt: number[]; encryptedPassword?: string };

function markBiometricLockEnabled(enabled: boolean) {
  try {
    if (enabled) {
      localStorage.setItem(DESKTOP_BIOMETRIC_LOCK_MARKER, '1');
    } else {
      localStorage.removeItem(DESKTOP_BIOMETRIC_LOCK_MARKER);
    }
  } catch {
    // ignore
  }
}

export function hasDesktopBiometricLockMarker(): boolean {
  if (!isDesktopApp()) return false;
  try {
    return localStorage.getItem(DESKTOP_BIOMETRIC_LOCK_MARKER) === '1';
  } catch {
    return false;
  }
}

export async function loadBiometricLockConfig(): Promise<StrongholdBiometricLockConfig | null> {
  if (!isDesktopApp()) return null;
  const raw = await getRecord(KEY_BIOMETRIC_LOCK);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as StrongholdBiometricLockConfig;
    if (typeof parsed?.enabled !== 'boolean') return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function isBiometricLockEnabled(): Promise<boolean> {
  const config = await loadBiometricLockConfig();
  return config?.enabled === true;
}

export async function setBiometricLockEnabled(enabled: boolean): Promise<void> {
  if (!isDesktopApp()) return;
  if (enabled) {
    await setRecord(
      KEY_BIOMETRIC_LOCK,
      JSON.stringify({ enabled: true, enrolledAt: new Date().toISOString() } satisfies StrongholdBiometricLockConfig),
    );
    markBiometricLockEnabled(true);
    return;
  }
  await removeRecord(KEY_BIOMETRIC_LOCK);
  markBiometricLockEnabled(false);
}

export async function saveStrongholdWebAuthnMarker(marker: StrongholdWebAuthnMarker | null): Promise<void> {
  if (!isDesktopApp()) return;
  if (!marker) {
    await removeRecord(KEY_WEBAUTHN_MARKER);
    try {
      localStorage.removeItem(LEGACY_WEBAUTHN_KEY);
    } catch {
      // ignore
    }
    return;
  }
  const json = JSON.stringify(marker);
  await setRecord(KEY_WEBAUTHN_MARKER, json);
  try {
    localStorage.setItem(LEGACY_WEBAUTHN_KEY, json);
  } catch {
    // ignore
  }
}

export async function loadStrongholdWebAuthnMarker(): Promise<StrongholdWebAuthnMarker | null> {
  if (!isDesktopApp()) return null;
  const raw = await getRecord(KEY_WEBAUTHN_MARKER);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StrongholdWebAuthnMarker;
  } catch {
    return null;
  }
}

export async function savePasswordEncryptedCredsBlob(blob: unknown): Promise<void> {
  if (!isDesktopApp()) return;
  await setRecord(KEY_PASSWORD_ENCRYPTED_CREDS, JSON.stringify(blob));
}

export async function loadPasswordEncryptedCredsBlob(): Promise<unknown | null> {
  if (!isDesktopApp()) return null;
  const raw = await getRecord(KEY_PASSWORD_ENCRYPTED_CREDS);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
}

export async function clearPasswordEncryptedCredsBlob(): Promise<void> {
  if (!isDesktopApp()) return;
  await removeRecord(KEY_PASSWORD_ENCRYPTED_CREDS);
}

type MasterPasswordWrap = {
  wrapKeyB64: string;
  salt: number[];
  iv: number[];
  cipher: number[];
};

export async function saveMasterPasswordWrap(masterPassword: string): Promise<void> {
  if (!isDesktopApp()) return;
  const wrapKey = crypto.getRandomValues(new Uint8Array(32));
  const encrypted = await encryptWithEntropy(masterPassword, wrapKey);
  const payload: MasterPasswordWrap = {
    wrapKeyB64: btoa(String.fromCharCode(...wrapKey)),
    salt: encrypted.salt,
    iv: encrypted.iv,
    cipher: encrypted.cipher,
  };
  await setRecord(KEY_MASTER_PASSWORD_WRAP, JSON.stringify(payload));
}

export async function loadMasterPasswordFromWrap(): Promise<string | null> {
  if (!isDesktopApp()) return null;
  const raw = await getRecord(KEY_MASTER_PASSWORD_WRAP);
  if (!raw) return null;
  try {
    const payload = JSON.parse(raw) as MasterPasswordWrap;
    const wrapKey = Uint8Array.from(atob(payload.wrapKeyB64), (c) => c.charCodeAt(0));
    return decryptWithEntropy(
      { salt: payload.salt, iv: payload.iv, cipher: payload.cipher },
      wrapKey,
    );
  } catch {
    return null;
  }
}

export async function clearMasterPasswordWrap(): Promise<void> {
  if (!isDesktopApp()) return;
  await removeRecord(KEY_MASTER_PASSWORD_WRAP);
}

let strongholdRef: Stronghold | null = null;
let storeRef: Store | null = null;
let initPromise: Promise<Store> | null = null;

function markDesktopCredsStored(stored: boolean) {
  try {
    if (stored) {
      localStorage.setItem(DESKTOP_STRONGHOLD_CREDS_MARKER, '1');
    } else {
      localStorage.removeItem(DESKTOP_STRONGHOLD_CREDS_MARKER);
    }
  } catch {
    // ignore
  }
}

export function hasDesktopStoredCredsMarker(): boolean {
  if (!isDesktopApp()) return false;
  try {
    return localStorage.getItem(DESKTOP_STRONGHOLD_CREDS_MARKER) === '1';
  } catch {
    return false;
  }
}

async function getStore(): Promise<Store> {
  if (storeRef) return storeRef;
  initPromise ??= initStrongholdStore().catch((err) => {
    initPromise = null;
    throw err;
  });
  return initPromise;
}

async function initStrongholdStore(): Promise<Store> {
  const dir = await appDataDir();
  const vaultPath = await join(dir, VAULT_FILE);
  const stronghold = await Stronghold.load(vaultPath, VAULT_PASSWORD);
  strongholdRef = stronghold;
  let client: Client;
  try {
    client = await stronghold.loadClient(CLIENT_NAME);
  } catch {
    client = await stronghold.createClient(CLIENT_NAME);
  }
  storeRef = client.getStore();
  return storeRef;
}

async function setRecord(key: string, value: string): Promise<void> {
  const store = await getStore();
  const data = Array.from(new TextEncoder().encode(value));
  await store.insert(key, data);
  await strongholdRef?.save();
}

async function getRecord(key: string): Promise<string | null> {
  const store = await getStore();
  const data = await store.get(key);
  if (!data) return null;
  return new TextDecoder().decode(new Uint8Array(data));
}

async function removeRecord(key: string): Promise<void> {
  const store = await getStore();
  await store.remove(key);
  await strongholdRef?.save();
}

function normalizeWebdavConfig(parsed: unknown) {
  const rec = (parsed && typeof parsed === 'object' ? parsed : {}) as Record<string, unknown>;
  return {
    endpoint: typeof rec.endpoint === 'string' ? rec.endpoint : DEFAULT_WEBDAV_CONFIG.endpoint,
    username: typeof rec.username === 'string' ? rec.username : DEFAULT_WEBDAV_CONFIG.username,
    password: typeof rec.password === 'string' ? rec.password : DEFAULT_WEBDAV_CONFIG.password,
    basePath: typeof rec.basePath === 'string' ? rec.basePath : DEFAULT_WEBDAV_CONFIG.basePath,
  };
}

export async function saveDesktopCreds(creds: unknown): Promise<void> {
  if (!isDesktopApp()) return;
  await setRecord(KEY_S3_CREDS, JSON.stringify(creds));
  markDesktopCredsStored(true);
}

export async function loadDesktopCreds<T = Record<string, unknown>>(): Promise<T | null> {
  if (!isDesktopApp()) return null;
  const raw = await getRecord(KEY_S3_CREDS);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function clearDesktopCreds(): Promise<void> {
  if (!isDesktopApp()) return;
  await removeRecord(KEY_S3_CREDS);
  markDesktopCredsStored(false);
}

export async function saveDesktopWebdavConfig(config: unknown): Promise<void> {
  if (!isDesktopApp()) return;
  await setRecord(KEY_WEBDAV_CONFIG, JSON.stringify(normalizeWebdavConfig(config)));
}

export async function loadDesktopWebdavConfig() {
  if (!isDesktopApp()) return null;
  const raw = await getRecord(KEY_WEBDAV_CONFIG);
  if (!raw) return null;
  try {
    return normalizeWebdavConfig(JSON.parse(raw));
  } catch {
    return null;
  }
}

export async function clearDesktopWebdavConfig(): Promise<void> {
  if (!isDesktopApp()) return;
  await removeRecord(KEY_WEBDAV_CONFIG);
}

function clearLegacyDesktopStorage() {
  try {
    localStorage.removeItem(LEGACY_ENCRYPTED_KEY);
    localStorage.removeItem(LEGACY_WEBAUTHN_KEY);
    localStorage.removeItem(LEGACY_WEBDAV_CONFIG_KEY);
    localStorage.removeItem(LEGACY_WEBDAV_ENCRYPTED_KEY);
    localStorage.removeItem(DESKTOP_BIOMETRIC_LOCK_MARKER);
  } catch {
    // ignore
  }
}

async function decryptLegacyPasswordCreds(
  password: string,
): Promise<Record<string, unknown> | null> {
  const stored = localStorage.getItem(LEGACY_ENCRYPTED_KEY);
  if (!stored) return null;
  const encryptedObj = JSON.parse(stored) as {
    webauthn?: boolean;
    passwordSalt?: number[];
  };
  if (encryptedObj?.webauthn) return null;
  let decryptedStr: string;
  if (Array.isArray(encryptedObj.passwordSalt)) {
    const entropy = await deriveEntropyFromPassword(
      password,
      new Uint8Array(encryptedObj.passwordSalt),
    );
    decryptedStr = await decryptWithEntropy(encryptedObj as never, entropy);
  } else {
    decryptedStr = await decryptData(password, encryptedObj as never);
  }
  return JSON.parse(decryptedStr) as Record<string, unknown>;
}

async function decryptLegacyWebdav(password: string) {
  const encRaw = localStorage.getItem(LEGACY_WEBDAV_ENCRYPTED_KEY);
  if (!encRaw || !password) return null;
  try {
    const encrypted = JSON.parse(encRaw);
    const json = await decryptData(password, encrypted);
    return normalizeWebdavConfig(JSON.parse(json));
  } catch {
    return null;
  }
}

function loadLegacyPlainWebdav() {
  try {
    const raw = localStorage.getItem(LEGACY_WEBDAV_CONFIG_KEY);
    if (!raw) return null;
    return normalizeWebdavConfig(JSON.parse(raw));
  } catch {
    return null;
  }
}

/**
 * One-time migration from localStorage / biometry blobs to Stronghold.
 * Password-encrypted legacy blobs require `password` (from unlock modal).
 */
export async function syncDesktopStrongholdMarkers(): Promise<void> {
  if (!isDesktopApp()) return;

  const strongholdMarker = await loadStrongholdWebAuthnMarker();
  if (!strongholdMarker) {
    try {
      const raw = localStorage.getItem(LEGACY_WEBAUTHN_KEY);
      if (raw) {
        await saveStrongholdWebAuthnMarker(JSON.parse(raw) as StrongholdWebAuthnMarker);
      }
    } catch {
      // ignore
    }
  } else {
    try {
      localStorage.setItem(LEGACY_WEBAUTHN_KEY, JSON.stringify(strongholdMarker));
    } catch {
      // ignore
    }
  }

  const lockConfig = await loadBiometricLockConfig();
  if (!lockConfig?.enabled) {
    try {
      const raw = localStorage.getItem(LEGACY_WEBAUTHN_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { desktopBiometry?: boolean };
        if (parsed?.desktopBiometry === true) {
          await setBiometricLockEnabled(true);
        }
      }
    } catch {
      // ignore
    }
  }

  const legacyEnc = localStorage.getItem(LEGACY_ENCRYPTED_KEY);
  const strongholdEnc = await loadPasswordEncryptedCredsBlob();
  if (legacyEnc && !strongholdEnc) {
    try {
      await savePasswordEncryptedCredsBlob(JSON.parse(legacyEnc));
    } catch {
      // ignore
    }
  }
}

export async function migrateLegacyDesktopSecretsToStronghold(
  password = '',
): Promise<{ creds: Record<string, unknown> | null; webdav: ReturnType<typeof normalizeWebdavConfig> | null }> {
  if (!isDesktopApp()) {
    return { creds: null, webdav: null };
  }

  await syncDesktopStrongholdMarkers();

  if (hasDesktopStoredCredsMarker()) {
    return { creds: null, webdav: null };
  }

  let creds: Record<string, unknown> | null = null;
  let webdav: ReturnType<typeof normalizeWebdavConfig> | null = null;

  if (isStoredWithWebAuthn() && getStoredWebAuthn()) {
    try {
      creds = (await loadCredsWithWebAuthn()) as Record<string, unknown>;
    } catch {
      // fall through — user may unlock with password instead
    }
  }

  if (!creds && password) {
    try {
      creds = await decryptLegacyPasswordCreds(password);
    } catch {
      creds = null;
    }
  }

  if (creds) {
    await saveDesktopCreds(creds);
  }

  if (password) {
    webdav = await decryptLegacyWebdav(password);
  }
  if (!webdav) {
    webdav = loadLegacyPlainWebdav();
  }
  if (webdav && (webdav.endpoint || webdav.username || webdav.password)) {
    await saveDesktopWebdavConfig(webdav);
  }

  if (creds) {
    clearLegacyDesktopStorage();
  }

  return { creds, webdav };
}

/**
 * Try auto-restore on desktop cold start (no password prompt).
 * Skips restore when biometric app lock is enabled — caller must prompt biometrics first.
 */
export async function tryRestoreDesktopStrongholdSession(): Promise<{
  creds: Record<string, unknown> | null;
  webdav: ReturnType<typeof normalizeWebdavConfig> | null;
}> {
  if (!isDesktopApp()) return { creds: null, webdav: null };

  await migrateLegacyDesktopSecretsToStronghold();

  if (await isBiometricLockEnabled()) {
    return { creds: null, webdav: null };
  }

  const creds = await loadDesktopCreds<Record<string, unknown>>();
  const webdav = await loadDesktopWebdavConfig();
  return { creds, webdav };
}

/**
 * Load secrets from Stronghold after biometric verification (Tauri app lock).
 */
export async function loadDesktopStrongholdAfterBiometric(): Promise<{
  creds: Record<string, unknown> | null;
  webdav: ReturnType<typeof normalizeWebdavConfig> | null;
}> {
  if (!isDesktopApp()) return { creds: null, webdav: null };
  await migrateLegacyDesktopSecretsToStronghold();
  const creds = await loadDesktopCreds<Record<string, unknown>>();
  const webdav = await loadDesktopWebdavConfig();
  return { creds, webdav };
}
