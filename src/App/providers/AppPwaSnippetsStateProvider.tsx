import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { getLocalAppBuildId } from '@/utils/pwaUpdate';

export type PwaSnippetsOwnedApi = {
  snippetConfig: { snippets: any[] };
  setSnippetConfig: (
    cfg: { snippets: any[] } | ((prev: { snippets: any[] }) => { snippets: any[] }),
  ) => void;
  swRegistration: any;
  setSwRegistration: (r: any | ((prev: any) => any)) => void;
  isApplyingPwaUpdate: boolean;
  setIsApplyingPwaUpdate: (v: boolean | ((prev: boolean) => boolean)) => void;
  hidePwaUpdateToast: boolean;
  setHidePwaUpdateToast: (v: boolean | ((prev: boolean) => boolean)) => void;
  isCheckingAppUpdate: boolean;
  setIsCheckingAppUpdate: (v: boolean | ((prev: boolean) => boolean)) => void;
  showAppUpdateConfirmModal: boolean;
  setShowAppUpdateConfirmModal: (v: boolean | ((prev: boolean) => boolean)) => void;
  appUpdateAvailable: boolean;
  setAppUpdateAvailable: (v: boolean | ((prev: boolean) => boolean)) => void;
  appBuildLocalId: string;
  setAppBuildLocalId: (id: string | ((prev: string) => string)) => void;
  appBuildRemoteId: string;
  setAppBuildRemoteId: (id: string | ((prev: string) => string)) => void;
  appUpdateCheckError: string;
  setAppUpdateCheckError: (e: string | ((prev: string) => string)) => void;
};

const PwaSnippetsOwnedContext = createContext<PwaSnippetsOwnedApi | null>(null);

export function usePwaSnippetsOwned(): PwaSnippetsOwnedApi {
  const ctx = useContext(PwaSnippetsOwnedContext);
  if (!ctx) throw new Error('usePwaSnippetsOwned must be used within AppPwaSnippetsStateProvider');
  return ctx;
}

/** Owns PWA update UI state and snippetConfig outside the main controller. */
export function AppPwaSnippetsStateProvider({ children }: { children: ReactNode }) {
  const [snippetConfig, setSnippetConfig] = useState({ snippets: [] as any[] });
  const [swRegistration, setSwRegistration] = useState<any>(null);
  const [isApplyingPwaUpdate, setIsApplyingPwaUpdate] = useState(false);
  const [hidePwaUpdateToast, setHidePwaUpdateToast] = useState(false);
  const [isCheckingAppUpdate, setIsCheckingAppUpdate] = useState(false);
  const [showAppUpdateConfirmModal, setShowAppUpdateConfirmModal] = useState(false);
  const [appUpdateAvailable, setAppUpdateAvailable] = useState(false);
  const [appBuildLocalId, setAppBuildLocalId] = useState(() => getLocalAppBuildId());
  const [appBuildRemoteId, setAppBuildRemoteId] = useState('');
  const [appUpdateCheckError, setAppUpdateCheckError] = useState('');

  const value = useMemo(
    () => ({
      snippetConfig,
      setSnippetConfig,
      swRegistration,
      setSwRegistration,
      isApplyingPwaUpdate,
      setIsApplyingPwaUpdate,
      hidePwaUpdateToast,
      setHidePwaUpdateToast,
      isCheckingAppUpdate,
      setIsCheckingAppUpdate,
      showAppUpdateConfirmModal,
      setShowAppUpdateConfirmModal,
      appUpdateAvailable,
      setAppUpdateAvailable,
      appBuildLocalId,
      setAppBuildLocalId,
      appBuildRemoteId,
      setAppBuildRemoteId,
      appUpdateCheckError,
      setAppUpdateCheckError,
    }),
    [
      snippetConfig,
      swRegistration,
      isApplyingPwaUpdate,
      hidePwaUpdateToast,
      isCheckingAppUpdate,
      showAppUpdateConfirmModal,
      appUpdateAvailable,
      appBuildLocalId,
      appBuildRemoteId,
      appUpdateCheckError,
    ],
  );

  return (
    <PwaSnippetsOwnedContext.Provider value={value}>{children}</PwaSnippetsOwnedContext.Provider>
  );
}
