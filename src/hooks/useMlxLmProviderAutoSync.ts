import { useCallback, useEffect, useRef } from 'react';
import { isTauriMacOS } from '@/utils/tauriPlatform';
import {
  buildMlxLmProviderSyncCreds,
  MLX_LM_PROVIDER_SYNC_REQUEST_EVENT,
} from '@/utils/llm/mlxLmProviderAutoSync';

type SaveCredsOptions = { silent?: boolean };

type SaveCredsFn = (creds: Record<string, unknown>, options?: SaveCredsOptions) => void;

export function useMlxLmProviderAutoSync(
  s3Creds: Record<string, unknown> | null | undefined,
  onSaveCreds: SaveCredsFn,
): { syncMlxLmProviderProfile: () => Promise<void> } {
  const credsRef = useRef(s3Creds);
  credsRef.current = s3Creds;

  const saveRef = useRef(onSaveCreds);
  saveRef.current = onSaveCreds;

  const syncMlxLmProviderProfile = useCallback(async () => {
    const result = await buildMlxLmProviderSyncCreds(credsRef.current);
    if (result.changed && result.creds) {
      saveRef.current(result.creds, { silent: true });
    }
  }, []);

  useEffect(() => {
    if (!isTauriMacOS()) return undefined;

    const onRequest = () => {
      void syncMlxLmProviderProfile();
    };

    void syncMlxLmProviderProfile();
    const timer = window.setInterval(() => {
      void syncMlxLmProviderProfile();
    }, 5000);
    window.addEventListener(MLX_LM_PROVIDER_SYNC_REQUEST_EVENT, onRequest);

    return () => {
      window.clearInterval(timer);
      window.removeEventListener(MLX_LM_PROVIDER_SYNC_REQUEST_EVENT, onRequest);
    };
  }, [syncMlxLmProviderProfile, s3Creds]);

  return { syncMlxLmProviderProfile };
}
