import { isTauriMacOS } from '@/utils/tauriPlatform';
import { getMlxVlmServerStatus } from '@/utils/llm/mlxVlmShell';
import { loadMlxVlmSettings } from '@/utils/llm/mlxVlmSettingsStore';
import {
  AUTO_MLX_VLM_PROFILE_ID,
  ensureMlxVlmProviderProfile,
  resolveLlmProviderProfiles,
  saveLastUsedModelForProfile,
  syncLegacyLlmCredsFromProfiles,
} from '@/utils/llm/llmProviderProfiles';

export const MLX_VLM_PROVIDER_SYNC_REQUEST_EVENT = 's3haim-mlx-vlm-provider-sync-request';

type CredsLike = Record<string, unknown> & {
  llmProviderProfiles?: unknown;
};

export type MlxVlmProviderSyncResult = {
  changed: boolean;
  creds: CredsLike | null;
};

export function requestMlxVlmProviderSync(): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(MLX_VLM_PROVIDER_SYNC_REQUEST_EVENT));
}

export async function buildMlxVlmProviderSyncCreds(
  s3Creds: CredsLike | null | undefined,
): Promise<MlxVlmProviderSyncResult> {
  if (!isTauriMacOS() || !s3Creds) {
    return { changed: false, creds: null };
  }

  const settings = loadMlxVlmSettings();
  const status = await getMlxVlmServerStatus(settings);
  if (!status.running) {
    return { changed: false, creds: null };
  }

  const profiles = resolveLlmProviderProfiles(s3Creds);
  const { profiles: nextProfiles, changed } = ensureMlxVlmProviderProfile(profiles);
  if (!changed) {
    return { changed: false, creds: null };
  }

  const modelId = settings.selectedModelId.trim() || status.models[0]?.trim() || '';
  if (modelId) {
    saveLastUsedModelForProfile(AUTO_MLX_VLM_PROFILE_ID, modelId);
  }

  return {
    changed: true,
    creds: {
      ...s3Creds,
      llmProviderProfiles: nextProfiles,
      ...syncLegacyLlmCredsFromProfiles(nextProfiles),
    },
  };
}
