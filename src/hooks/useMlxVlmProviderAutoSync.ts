import { useCallback, useEffect, useRef } from 'react';
import { isTauriMacOS } from '@/utils/tauriPlatform';
import {
  buildMlxVlmProviderSyncCreds,
  MLX_VLM_PROVIDER_SYNC_REQUEST_EVENT,
} from '@/utils/llm/mlxVlmProviderAutoSync';

type SaveCredsOptions = { silent?: boolean };

type SaveCredsFn = (creds: Record<string, unknown>, options?: SaveCredsOptions) => void;

export function useMlxVlmProviderAutoSync(
  s3Creds: Record<string, unknown> | null | undefined,
  onSaveCreds: SaveCredsFn,
): { syncMlxVlmProviderProfile: () => Promise<void> } {
  const credsRef = useRef(s3Creds);
  credsRef.current = s3Creds;

  const saveRef = useRef(onSaveCreds);
  saveRef.current = onSaveCreds;

  const syncMlxVlmProviderProfile = useCallback(async () => {
    const result = await buildMlxVlmProviderSyncCreds(credsRef.current);
    if (result.changed && result.creds) {
      saveRef.current(result.creds, { silent: true });
    }
  }, []);

  useEffect(() => {
    if (!isTauriMacOS()) return undefined;

    const onRequest = () => {
      void syncMlxVlmProviderProfile();
    };

    void syncMlxVlmProviderProfile();
    const timer = window.setInterval(() => {
      void syncMlxVlmProviderProfile();
    }, 5000);
    window.addEventListener(MLX_VLM_PROVIDER_SYNC_REQUEST_EVENT, onRequest);

    return () => {
      window.clearInterval(timer);
      window.removeEventListener(MLX_VLM_PROVIDER_SYNC_REQUEST_EVENT, onRequest);
    };
  }, [syncMlxVlmProviderProfile, s3Creds]);

  return { syncMlxVlmProviderProfile };
}
