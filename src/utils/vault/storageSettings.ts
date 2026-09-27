import { encryptData, decryptData } from '@/utils/crypto';
import { isDesktopApp } from '@/utils/isDesktopApp';
import {
  loadDesktopWebdavConfig,
  saveDesktopWebdavConfig,
} from '@/utils/desktopStrongholdSecrets';

export const STORAGE_MODE_S3 = 's3';
export const STORAGE_MODE_LOCAL = 'local';
export const STORAGE_MODE_WEBDAV = 'webdav';
export const STORAGE_MODE_IDB = 'idb';

export type StorageMode =
  | typeof STORAGE_MODE_S3
  | typeof STORAGE_MODE_LOCAL
  | typeof STORAGE_MODE_WEBDAV
  | typeof STORAGE_MODE_IDB;

const STORAGE_MODE_KEY = 's3haim_storage_mode';
const WEBDAV_CONFIG_KEY = 's3haim_webdav_config';
const WEBDAV_ENCRYPTED_KEY = 's3haim_webdav_encrypted';
const S3_ENCRYPTED_KEY = 's3NotesEncrypted';
const WEB_AUTHN_STORAGE_KEY = 's3NotesWebAuthn';

export const DEFAULT_STORAGE_MODE: StorageMode = STORAGE_MODE_IDB;

const VALID_STORAGE_MODES = new Set<string>([
  STORAGE_MODE_S3,
  STORAGE_MODE_LOCAL,
  STORAGE_MODE_WEBDAV,
  STORAGE_MODE_IDB,
]);

export type WebdavConfig = {
  endpoint: string;
  username: string;
  password: string;
  basePath: string;
};

export const DEFAULT_WEBDAV_CONFIG: WebdavConfig = {
  endpoint: '',
  username: '',
  password: '',
  basePath: '',
};

export function loadStorageMode(): StorageMode {
  try {
    if (typeof window === 'undefined') return DEFAULT_STORAGE_MODE;
    const raw = window.localStorage.getItem(STORAGE_MODE_KEY);
    if (raw && VALID_STORAGE_MODES.has(raw)) {
      return raw as StorageMode;
    }
    return DEFAULT_STORAGE_MODE;
  } catch {
    return DEFAULT_STORAGE_MODE;
  }
}

/** True when the user has never persisted a storage mode (brand-new install). */
export function hasStoredStorageMode(): boolean {
  try {
    if (typeof window === 'undefined') return false;
    const raw = window.localStorage.getItem(STORAGE_MODE_KEY);
    return Boolean(raw && VALID_STORAGE_MODES.has(raw));
  } catch {
    return false;
  }
}

export function saveStorageMode(mode: string): void {
  if (!VALID_STORAGE_MODES.has(mode)) {
    return;
  }
  try {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_MODE_KEY, mode);
    }
  } catch {
    /* ignore */
  }
}

function normalizeWebdavConfig(parsed: unknown): WebdavConfig {
  const rec =
    parsed && typeof parsed === 'object' ? (parsed as Record<string, unknown>) : {};
  return {
    endpoint:
      typeof rec.endpoint === 'string' ? rec.endpoint : DEFAULT_WEBDAV_CONFIG.endpoint,
    username:
      typeof rec.username === 'string' ? rec.username : DEFAULT_WEBDAV_CONFIG.username,
    password:
      typeof rec.password === 'string' ? rec.password : DEFAULT_WEBDAV_CONFIG.password,
    basePath:
      typeof rec.basePath === 'string' ? rec.basePath : DEFAULT_WEBDAV_CONFIG.basePath,
  };
}

/** True when WebDAV must not be kept in plaintext localStorage (encrypted S3/WebDAV/WebAuthn). */
export function requiresEncryptedWebdavStorage(): boolean {
  try {
    if (typeof window === 'undefined') return false;
    if (isDesktopApp()) return false;
    return Boolean(
      window.localStorage.getItem(WEBDAV_ENCRYPTED_KEY) ||
        window.localStorage.getItem(S3_ENCRYPTED_KEY) ||
        window.localStorage.getItem(WEB_AUTHN_STORAGE_KEY),
    );
  } catch {
    return false;
  }
}

/**
 * Load plaintext WebDAV config (legacy / no master password yet).
 * Prefer decryptWebdavConfig when password available.
 * On desktop, reads from Stronghold when available.
 */
export async function loadWebdavConfig(): Promise<WebdavConfig> {
  try {
    if (typeof window === 'undefined') return { ...DEFAULT_WEBDAV_CONFIG };
    if (isDesktopApp()) {
      const fromStronghold = await loadDesktopWebdavConfig();
      if (fromStronghold) return fromStronghold;
    }
    if (requiresEncryptedWebdavStorage() || window.localStorage.getItem(WEBDAV_ENCRYPTED_KEY)) {
      return { ...DEFAULT_WEBDAV_CONFIG };
    }
    const raw = window.localStorage.getItem(WEBDAV_CONFIG_KEY);
    if (!raw) return { ...DEFAULT_WEBDAV_CONFIG };
    return normalizeWebdavConfig(JSON.parse(raw));
  } catch {
    return { ...DEFAULT_WEBDAV_CONFIG };
  }
}

/**
 * Save WebDAV config. If password is provided, encrypt and clear plaintext key.
 * Without password, persists plaintext only when no encrypted storage is in use.
 */
export async function saveWebdavConfig(
  config: unknown,
  password?: string,
): Promise<void> {
  const safe = normalizeWebdavConfig(config);
  try {
    if (typeof window === 'undefined') return;
    if (isDesktopApp()) {
      await saveDesktopWebdavConfig(safe);
      window.localStorage.removeItem(WEBDAV_CONFIG_KEY);
      window.localStorage.removeItem(WEBDAV_ENCRYPTED_KEY);
      return;
    }
    if (password) {
      const encrypted = await encryptData(password, JSON.stringify(safe));
      window.localStorage.setItem(WEBDAV_ENCRYPTED_KEY, JSON.stringify(encrypted));
      window.localStorage.removeItem(WEBDAV_CONFIG_KEY);
      return;
    }
    if (requiresEncryptedWebdavStorage() || window.localStorage.getItem(WEBDAV_ENCRYPTED_KEY)) {
      // Encrypted storage active — keep config in session/memory only until unlock password save.
      return;
    }
    window.localStorage.setItem(WEBDAV_CONFIG_KEY, JSON.stringify(safe));
  } catch {
    /* ignore */
  }
}

export function hasEncryptedWebdavConfig(): boolean {
  try {
    if (isDesktopApp() && typeof window !== 'undefined') {
      return localStorage.getItem('s3haim_desktop_stronghold_creds') === '1';
    }
    return Boolean(
      typeof window !== 'undefined' && window.localStorage.getItem(WEBDAV_ENCRYPTED_KEY),
    );
  } catch {
    return false;
  }
}

/**
 * Decrypt WebDAV config with master password. Falls back to plaintext.
 * Migrates plaintext → encrypted when password works and plaintext exists.
 */
export async function decryptWebdavConfig(password: string): Promise<WebdavConfig> {
  try {
    if (typeof window === 'undefined') return { ...DEFAULT_WEBDAV_CONFIG };
    if (isDesktopApp()) {
      const fromStronghold = await loadDesktopWebdavConfig();
      if (fromStronghold) return fromStronghold;
    }
    const encRaw = window.localStorage.getItem(WEBDAV_ENCRYPTED_KEY);
    if (encRaw && password) {
      try {
        const encrypted = JSON.parse(encRaw);
        const json = await decryptData(password, encrypted);
        return normalizeWebdavConfig(JSON.parse(json));
      } catch {
        /* fall through */
      }
    }
    const plain = await loadWebdavConfig();
    if (password && (plain.endpoint || plain.username || plain.password)) {
      try {
        await saveWebdavConfig(plain, password);
      } catch {
        /* ignore migration failure */
      }
    }
    return plain;
  } catch {
    return { ...DEFAULT_WEBDAV_CONFIG };
  }
}

export function clearPlaintextWebdavConfig(): void {
  try {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(WEBDAV_CONFIG_KEY);
    }
  } catch {
    /* ignore */
  }
}

export function getAppNameByStorageMode(mode: string | null | undefined): string {
  if (mode === STORAGE_MODE_LOCAL) return 'Local Haim';
  if (mode === STORAGE_MODE_WEBDAV) return 'WebDAV Haim';
  if (mode === STORAGE_MODE_IDB) return 'IDB Haim';
  return 'S3 Haim';
}
