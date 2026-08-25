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

/** Sync marker so hasStoredCreds() works without awaiting Stronghold. */
export const DESKTOP_STRONGHOLD_CREDS_MARKER = 's3haim_desktop_stronghold_creds';

const LEGACY_ENCRYPTED_KEY = 's3NotesEncrypted';
const LEGACY_WEBAUTHN_KEY = 's3NotesWebAuthn';
const LEGACY_WEBDAV_CONFIG_KEY = 's3haim_webdav_config';
const LEGACY_WEBDAV_ENCRYPTED_KEY = 's3haim_webdav_encrypted';

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
  if (!initPromise) {
    initPromise = (async () => {
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
    })();
  }
  return initPromise;
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
export async function migrateLegacyDesktopSecretsToStronghold(
  password = '',
): Promise<{ creds: Record<string, unknown> | null; webdav: ReturnType<typeof normalizeWebdavConfig> | null }> {
  if (!isDesktopApp() || hasDesktopStoredCredsMarker()) {
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
 */
export async function tryRestoreDesktopStrongholdSession(): Promise<{
  creds: Record<string, unknown> | null;
  webdav: ReturnType<typeof normalizeWebdavConfig> | null;
}> {
  if (!isDesktopApp()) return { creds: null, webdav: null };

  await migrateLegacyDesktopSecretsToStronghold();

  const creds = await loadDesktopCreds<Record<string, unknown>>();
  const webdav = await loadDesktopWebdavConfig();
  return { creds, webdav };
}
