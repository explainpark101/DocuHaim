import { isTauriMacOS } from '@/utils/tauriPlatform';
import { getMlxLmServerStatus } from '@/utils/llm/mlxLmShell';
import { loadMlxLmSettings } from '@/utils/llm/mlxLmSettingsStore';
import {
  AUTO_MLX_LM_PROFILE_ID,
  ensureMlxLmProviderProfile,
  resolveLlmProviderProfiles,
  saveLastUsedModelForProfile,
  syncLegacyLlmCredsFromProfiles,
} from '@/utils/llm/llmProviderProfiles';

export const MLX_LM_PROVIDER_SYNC_REQUEST_EVENT = 's3haim-mlx-lm-provider-sync-request';

type CredsLike = Record<string, unknown> & {
  llmProviderProfiles?: unknown;
};

export type MlxLmProviderSyncResult = {
  changed: boolean;
  creds: CredsLike | null;
};

export function requestMlxLmProviderSync(): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(MLX_LM_PROVIDER_SYNC_REQUEST_EVENT));
}

export async function buildMlxLmProviderSyncCreds(
  s3Creds: CredsLike | null | undefined,
): Promise<MlxLmProviderSyncResult> {
  if (!isTauriMacOS() || !s3Creds) {
    return { changed: false, creds: null };
  }

  const settings = loadMlxLmSettings();
  const status = await getMlxLmServerStatus(settings);
  if (!status.running) {
    return { changed: false, creds: null };
  }

  const profiles = resolveLlmProviderProfiles(s3Creds);
  const { profiles: nextProfiles, changed } = ensureMlxLmProviderProfile(profiles);
  if (!changed) {
    return { changed: false, creds: null };
  }

  const modelId = settings.selectedModelId.trim() || status.models[0]?.trim() || '';
  if (modelId) {
    saveLastUsedModelForProfile(AUTO_MLX_LM_PROFILE_ID, modelId);
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
