import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { DEFAULT_WEBDAV_CONFIG, loadStorageMode } from '@/utils/storageSettings';
import { isDesktopApp } from '@/utils/isDesktopApp';
import { loadLocalVaultFsPath } from '@/utils/localVaultPathStore';

export type VaultOwnedApi = {
  storageMode: string;
  setStorageMode: (mode: string | ((prev: string) => string)) => void;
  s3Tree: any[];
  setS3Tree: (tree: any[] | ((prev: any[]) => any[])) => void;
  localTree: any[];
  setLocalTree: (tree: any[] | ((prev: any[]) => any[])) => void;
  webdavTree: any[];
  setWebdavTree: (tree: any[] | ((prev: any[]) => any[])) => void;
  sessionWorkspaces: Record<string, import('@/utils/sessionWorkspace').SessionWorkspace>;
  setSessionWorkspaces: (
    ws:
      | Record<string, import('@/utils/sessionWorkspace').SessionWorkspace>
      | ((
          prev: Record<string, import('@/utils/sessionWorkspace').SessionWorkspace>,
        ) => Record<string, import('@/utils/sessionWorkspace').SessionWorkspace>),
  ) => void;
  upsertSessionWorkspace: (workspace: import('@/utils/sessionWorkspace').SessionWorkspace) => void;
  removeSessionWorkspace: (sessionId: string) => void;
  localRootHandle: any;
  setLocalRootHandle: (h: any | ((prev: any) => any)) => void;
  localVaultFsPath: string;
  setLocalVaultFsPath: (p: string | ((prev: string) => string)) => void;
  webdavConfig: any;
  setWebdavConfig: (cfg: any | ((prev: any) => any)) => void;
  isLocalTreeLoading: boolean;
  setIsLocalTreeLoading: (v: boolean | ((prev: boolean) => boolean)) => void;
  isWebdavTreeLoading: boolean;
  setIsWebdavTreeLoading: (v: boolean | ((prev: boolean) => boolean)) => void;
  localFolderLoadingPath: string | null;
  setLocalFolderLoadingPath: (
    p: string | null | ((prev: string | null) => string | null),
  ) => void;
  webdavFolderLoadingPath: string | null;
  setWebdavFolderLoadingPath: (
    p: string | null | ((prev: string | null) => string | null),
  ) => void;
};

const VaultOwnedContext = createContext<VaultOwnedApi | null>(null);

export function useVaultOwned(): VaultOwnedApi {
  const ctx = useContext(VaultOwnedContext);
  if (!ctx) throw new Error('useVaultOwned must be used within AppVaultStateProvider');
  return ctx;
}

/** Owns vault React state (trees, storageMode, handles) outside the main controller. */
export function AppVaultStateProvider({ children }: { children: ReactNode }) {
  const [storageMode, setStorageMode] = useState(() => loadStorageMode());
  const [s3Tree, setS3Tree] = useState<any[]>([]);
  const [localTree, setLocalTree] = useState<any[]>([]);
  const [webdavTree, setWebdavTree] = useState<any[]>([]);
  const [sessionWorkspaces, setSessionWorkspaces] = useState<
    Record<string, import('@/utils/sessionWorkspace').SessionWorkspace>
  >({});
  const [localRootHandle, setLocalRootHandle] = useState<any>(null);
  const [localVaultFsPath, setLocalVaultFsPath] = useState(() =>
    isDesktopApp() ? loadLocalVaultFsPath() : '',
  );
  const [webdavConfig, setWebdavConfig] = useState(() => ({ ...DEFAULT_WEBDAV_CONFIG }));
  const [isLocalTreeLoading, setIsLocalTreeLoading] = useState(false);
  const [isWebdavTreeLoading, setIsWebdavTreeLoading] = useState(false);
  const [localFolderLoadingPath, setLocalFolderLoadingPath] = useState<string | null>(null);
  const [webdavFolderLoadingPath, setWebdavFolderLoadingPath] = useState<string | null>(null);

  const upsertSessionWorkspace = (
    workspace: import('@/utils/sessionWorkspace').SessionWorkspace,
  ) => {
    setSessionWorkspaces((prev) => ({
      ...prev,
      [workspace.id]: workspace,
    }));
  };

  const removeSessionWorkspace = (sessionId: string) => {
    setSessionWorkspaces((prev) => {
      if (!prev[sessionId]) return prev;
      const next = { ...prev };
      delete next[sessionId];
      return next;
    });
  };

  const value = useMemo(
    () => ({
      storageMode,
      setStorageMode,
      s3Tree,
      setS3Tree,
      localTree,
      setLocalTree,
      webdavTree,
      setWebdavTree,
      sessionWorkspaces,
      setSessionWorkspaces,
      upsertSessionWorkspace,
      removeSessionWorkspace,
      localRootHandle,
      setLocalRootHandle,
      localVaultFsPath,
      setLocalVaultFsPath,
      webdavConfig,
      setWebdavConfig,
      isLocalTreeLoading,
      setIsLocalTreeLoading,
      isWebdavTreeLoading,
      setIsWebdavTreeLoading,
      localFolderLoadingPath,
      setLocalFolderLoadingPath,
      webdavFolderLoadingPath,
      setWebdavFolderLoadingPath,
    }),
    [
      storageMode,
      s3Tree,
      localTree,
      webdavTree,
      sessionWorkspaces,
      localRootHandle,
      localVaultFsPath,
      webdavConfig,
      isLocalTreeLoading,
      isWebdavTreeLoading,
      localFolderLoadingPath,
      webdavFolderLoadingPath,
    ],
  );

  return (
    <VaultOwnedContext.Provider value={value}>{children}</VaultOwnedContext.Provider>
  );
}
