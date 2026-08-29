import { createContext } from 'react';

export const VAULT_PATH_STORAGE_TYPES = ['s3', 'local', 'webdav'] as const;
export type VaultPathStorageType = (typeof VAULT_PATH_STORAGE_TYPES)[number];

export function isVaultPathStorageType(
  type: string | null | undefined,
): type is VaultPathStorageType {
  return VAULT_PATH_STORAGE_TYPES.includes(type as VaultPathStorageType);
}

import type { SessionWorkspace, SessionWorkspacesMap } from '@/utils/sessionWorkspace';

/** §3–4 vault / storage trees + backends (owned by VaultProvider / useVaultDomain). */
export type VaultValue = {
  storageMode: string;
  setStorageMode: (mode: string | ((prev: string) => string)) => void;
  s3Tree: any[];
  localTree: any[];
  webdavTree: any[];
  sessionWorkspaces: SessionWorkspacesMap;
  setSessionWorkspaces: (
    ws: SessionWorkspacesMap | ((prev: SessionWorkspacesMap) => SessionWorkspacesMap),
  ) => void;
  upsertSessionWorkspace: (workspace: SessionWorkspace) => void;
  removeSessionWorkspace: (sessionId: string) => void;
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
  attachLocalRootFolder: (...args: any[]) => any;
  scanActiveStorageUsageTree: (...args: any[]) => any;
  canScanStorageUsage: boolean;
  setS3Tree: (...args: any[]) => any;
  setLocalTree: (...args: any[]) => any;
  setWebdavTree: (...args: any[]) => any;
  setLocalRootHandle: (...args: any[]) => any;
  setLocalVaultFsPath: (...args: any[]) => any;
  setIsLocalTreeLoading: (...args: any[]) => any;
  setIsWebdavTreeLoading: (...args: any[]) => any;
};

export const VaultContext = createContext<VaultValue | null>(null);
