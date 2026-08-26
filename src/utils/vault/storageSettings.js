import { encryptData, decryptData } from '@/utils/shared/crypto';
import { isDesktopApp } from '@/utils/shared/isDesktopApp';
import {
  loadDesktopWebdavConfig,
  saveDesktopWebdavConfig,
} from '@/utils/shared/desktopStrongholdSecrets';

export const STORAGE_MODE_S3 = 's3';
export const STORAGE_MODE_LOCAL = 'local';
export const STORAGE_MODE_WEBDAV = 'webdav';

const STORAGE_MODE_KEY = 's3haim_storage_mode';
const WEBDAV_CONFIG_KEY = 's3haim_webdav_config';
const WEBDAV_ENCRYPTED_KEY = 's3haim_webdav_encrypted';
const S3_ENCRYPTED_KEY = 's3NotesEncrypted';
const WEB_AUTHN_STORAGE_KEY = 's3NotesWebAuthn';

export const DEFAULT_STORAGE_MODE = STORAGE_MODE_S3;

export const DEFAULT_WEBDAV_CONFIG = {
  endpoint: '',
  username: '',
  password: '',
  basePath: '',
};

export function loadStorageMode() {
  try {
    if (typeof window === 'undefined') return DEFAULT_STORAGE_MODE;
    const raw = window.localStorage.getItem(STORAGE_MODE_KEY);
    if (raw === STORAGE_MODE_S3 || raw === STORAGE_MODE_LOCAL || raw === STORAGE_MODE_WEBDAV) {
      return raw;
    }
    return DEFAULT_STORAGE_MODE;
  } catch {
    return DEFAULT_STORAGE_MODE;
  }
}

export function saveStorageMode(mode) {
  if (mode !== STORAGE_MODE_S3 && mode !== STORAGE_MODE_LOCAL && mode !== STORAGE_MODE_WEBDAV) {
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

function normalizeWebdavConfig(parsed) {
  return {
    endpoint: typeof parsed?.endpoint === 'string' ? parsed.endpoint : DEFAULT_WEBDAV_CONFIG.endpoint,
    username: typeof parsed?.username === 'string' ? parsed.username : DEFAULT_WEBDAV_CONFIG.username,
    password: typeof parsed?.password === 'string' ? parsed.password : DEFAULT_WEBDAV_CONFIG.password,
    basePath: typeof parsed?.basePath === 'string' ? parsed.basePath : DEFAULT_WEBDAV_CONFIG.basePath,
  };
}

/** True when WebDAV must not be kept in plaintext localStorage (encrypted S3/WebDAV/WebAuthn). */
export function requiresEncryptedWebdavStorage() {
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
export async function loadWebdavConfig() {
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
 * @param {object} config
 * @param {string} [password]
 */
export async function saveWebdavConfig(config, password) {
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

export function hasEncryptedWebdavConfig() {
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
 * @param {string} password
 */
export async function decryptWebdavConfig(password) {
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

export function clearPlaintextWebdavConfig() {
  try {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(WEBDAV_CONFIG_KEY);
    }
  } catch {
    /* ignore */
  }
}

export function getAppNameByStorageMode(mode) {
  if (mode === STORAGE_MODE_LOCAL) return 'Local Haim';
  if (mode === STORAGE_MODE_WEBDAV) return 'WebDAV Haim';
  return 'S3 Haim';
}
