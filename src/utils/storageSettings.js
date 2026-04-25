export const STORAGE_MODE_S3 = 's3';
export const STORAGE_MODE_LOCAL = 'local';
export const STORAGE_MODE_WEBDAV = 'webdav';

const STORAGE_MODE_KEY = 's3haim_storage_mode';
const WEBDAV_CONFIG_KEY = 's3haim_webdav_config';

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
  } catch (_) {}
}

export function loadWebdavConfig() {
  try {
    if (typeof window === 'undefined') return { ...DEFAULT_WEBDAV_CONFIG };
    const raw = window.localStorage.getItem(WEBDAV_CONFIG_KEY);
    if (!raw) return { ...DEFAULT_WEBDAV_CONFIG };
    const parsed = JSON.parse(raw);
    return {
      endpoint: typeof parsed?.endpoint === 'string' ? parsed.endpoint : DEFAULT_WEBDAV_CONFIG.endpoint,
      username: typeof parsed?.username === 'string' ? parsed.username : DEFAULT_WEBDAV_CONFIG.username,
      password: typeof parsed?.password === 'string' ? parsed.password : DEFAULT_WEBDAV_CONFIG.password,
      basePath: typeof parsed?.basePath === 'string' ? parsed.basePath : DEFAULT_WEBDAV_CONFIG.basePath,
    };
  } catch {
    return { ...DEFAULT_WEBDAV_CONFIG };
  }
}

export function saveWebdavConfig(config) {
  const safe = {
    endpoint: typeof config?.endpoint === 'string' ? config.endpoint : DEFAULT_WEBDAV_CONFIG.endpoint,
    username: typeof config?.username === 'string' ? config.username : DEFAULT_WEBDAV_CONFIG.username,
    password: typeof config?.password === 'string' ? config.password : DEFAULT_WEBDAV_CONFIG.password,
    basePath: typeof config?.basePath === 'string' ? config.basePath : DEFAULT_WEBDAV_CONFIG.basePath,
  };
  try {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(WEBDAV_CONFIG_KEY, JSON.stringify(safe));
    }
  } catch (_) {}
}

export function getAppNameByStorageMode(mode) {
  if (mode === STORAGE_MODE_LOCAL) return 'Local Haim';
  if (mode === STORAGE_MODE_WEBDAV) return 'WebDAV Haim';
  return 'S3 Haim';
}
