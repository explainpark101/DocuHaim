/** @typedef {'s3' | 'local' | 'webdav' | 'idb'} StorageMode */

/**
 * @typedef {Object} StorageCapabilities
 * @property {boolean} supportsRemoteSync - idle pull, mobile poll, pending remote uploads
 * @property {boolean} supportsLazyTree
 * @property {string} label
 * @property {'cloud' | 'folder' | 'webdav' | 'idb'} icon
 */

/** @type {Record<StorageMode, StorageCapabilities>} */
export const STORAGE_CAPABILITIES = {
  s3: {
    supportsRemoteSync: true,
    supportsLazyTree: false,
    label: 'S3',
    icon: 'cloud',
  },
  local: {
    supportsRemoteSync: false,
    supportsLazyTree: true,
    label: 'Local',
    icon: 'folder',
  },
  webdav: {
    supportsRemoteSync: true,
    supportsLazyTree: true,
    label: 'WebDAV',
    icon: 'webdav',
  },
  idb: {
    supportsRemoteSync: false,
    supportsLazyTree: true,
    label: 'IDB',
    icon: 'idb',
  },
};

/**
 * @param {string | null | undefined} mode
 * @returns {StorageCapabilities}
 */
export function getStorageCapabilities(mode) {
  if (mode === 'local') return STORAGE_CAPABILITIES.local;
  if (mode === 'webdav') return STORAGE_CAPABILITIES.webdav;
  if (mode === 'idb') return STORAGE_CAPABILITIES.idb;
  return STORAGE_CAPABILITIES.s3;
}

/**
 * @param {string | null | undefined} mode
 */
export function supportsRemoteSync(mode) {
  return getStorageCapabilities(mode).supportsRemoteSync;
}
