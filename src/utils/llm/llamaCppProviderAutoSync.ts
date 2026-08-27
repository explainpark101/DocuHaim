import { isTauriDesktopPlatform } from '@/utils/tauriPlatform';
import { getLlamaCppServerStatus } from '@/utils/llm/llamaCppShell';
import { loadLlamaCppSettings } from '@/utils/llm/llamaCppSettingsStore';
import {
  AUTO_LLAMA_CPP_PROFILE_ID,
  ensureLlamaCppProviderProfile,
  resolveLlmProviderProfiles,
  saveLastUsedModelForProfile,
  syncLegacyLlmCredsFromProfiles,
} from '@/utils/llm/llmProviderProfiles';

export const LLAMA_CPP_PROVIDER_SYNC_REQUEST_EVENT = 's3haim-llama-cpp-provider-sync-request';

type CredsLike = Record<string, unknown> & {
  llmProviderProfiles?: unknown;
};

export type LlamaCppProviderSyncResult = {
  changed: boolean;
  creds: CredsLike | null;
};

export function requestLlamaCppProviderSync(): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(LLAMA_CPP_PROVIDER_SYNC_REQUEST_EVENT));
}

export async function buildLlamaCppProviderSyncCreds(
  s3Creds: CredsLike | null | undefined,
): Promise<LlamaCppProviderSyncResult> {
  if (!isTauriDesktopPlatform() || !s3Creds) {
    return { changed: false, creds: null };
  }

  const settings = loadLlamaCppSettings();
  const status = await getLlamaCppServerStatus(settings);
  if (!status.running || !status.baseUrl) {
    return { changed: false, creds: null };
  }

  const profiles = resolveLlmProviderProfiles(s3Creds);
  const { profiles: nextProfiles, changed } = ensureLlamaCppProviderProfile(profiles, status.baseUrl);
  if (!changed) {
    return { changed: false, creds: null };
  }

  const modelPath = settings.selectedModelId.trim() || status.models[0]?.trim() || '';
  if (modelPath) {
    saveLastUsedModelForProfile(AUTO_LLAMA_CPP_PROFILE_ID, modelPath);
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
