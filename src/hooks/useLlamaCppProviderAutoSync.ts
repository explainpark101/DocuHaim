import { useCallback, useEffect, useRef } from 'react';
import { isTauriDesktopPlatform } from '@/utils/tauriPlatform';
import {
  buildLlamaCppProviderSyncCreds,
  LLAMA_CPP_PROVIDER_SYNC_REQUEST_EVENT,
} from '@/utils/llm/llamaCppProviderAutoSync';

type SaveCredsOptions = { silent?: boolean };

type SaveCredsFn = (creds: Record<string, unknown>, options?: SaveCredsOptions) => void;

export function useLlamaCppProviderAutoSync(
  s3Creds: Record<string, unknown> | null | undefined,
  onSaveCreds: SaveCredsFn,
): { syncLlamaCppProviderProfile: () => Promise<void> } {
  const credsRef = useRef(s3Creds);
  credsRef.current = s3Creds;

  const saveRef = useRef(onSaveCreds);
  saveRef.current = onSaveCreds;

  const syncLlamaCppProviderProfile = useCallback(async () => {
    const result = await buildLlamaCppProviderSyncCreds(credsRef.current);
    if (result.changed && result.creds) {
      saveRef.current(result.creds, { silent: true });
    }
  }, []);

  useEffect(() => {
    if (!isTauriDesktopPlatform()) return undefined;

    const onRequest = () => {
      void syncLlamaCppProviderProfile();
    };

    void syncLlamaCppProviderProfile();
    const timer = window.setInterval(() => {
      void syncLlamaCppProviderProfile();
    }, 5000);
    window.addEventListener(LLAMA_CPP_PROVIDER_SYNC_REQUEST_EVENT, onRequest);

    return () => {
      window.clearInterval(timer);
      window.removeEventListener(LLAMA_CPP_PROVIDER_SYNC_REQUEST_EVENT, onRequest);
    };
  }, [syncLlamaCppProviderProfile, s3Creds]);

  return { syncLlamaCppProviderProfile };
}
