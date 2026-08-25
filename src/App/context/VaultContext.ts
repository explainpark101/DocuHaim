import { createContext } from 'react';

export const VAULT_PATH_STORAGE_TYPES = ['s3', 'local', 'webdav'] as const;
export type VaultPathStorageType = (typeof VAULT_PATH_STORAGE_TYPES)[number];

export function isVaultPathStorageType(
  type: string | null | undefined,
): type is VaultPathStorageType {
  return VAULT_PATH_STORAGE_TYPES.includes(type as VaultPathStorageType);
}

/** §3–4 vault / storage trees + backends. */
export type VaultValue = {
  storageMode: string;
  setStorageMode: (mode: string) => void;
  s3Tree: any[];
  localTree: any[];
  webdavTree: any[];
  sessionWorkspace: any;
  localRootHandle: any;
  localVaultFsPath: string | null;
  webdavConfig: any;
  setWebdavConfig: (cfg: any) => void;
  isLocalTreeLoading: boolean;
  isWebdavTreeLoading: boolean;
  localFolderLoadingPath: string | null;
  webdavFolderLoadingPath: string | null;
  getBackendForType: (type: string) => any;
  getS3Client: (...args: any[]) => any;
  loadS3Files: (...args: any[]) => any;
  refreshLocalTree: (...args: any[]) => any;
  refreshWebdavTree: (...args: any[]) => any;
  loadLocalFolderChildren: (...args: any[]) => any;
  loadWebdavFolderChildren: (...args: any[]) => any;
  openLocalFolder: (...args: any[]) => any;
  webdavReady: boolean;
};

export const VaultContext = createContext<VaultValue | null>(null);
