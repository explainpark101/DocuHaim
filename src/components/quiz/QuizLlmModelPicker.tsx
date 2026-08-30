import { useMemo } from 'react';
import GeminiModelSelect from '@/components/GeminiModelSelect';
import LlmProviderSelect from '@/components/llm/LlmProviderSelect';
import MlxVlmModelSelect from '@/components/llm/MlxVlmModelSelect';
import LlamaCppModelSelect from '@/components/llm/LlamaCppModelSelect';
import OpenAiCompatibleModelSelect from '@/components/OpenAiCompatibleModelSelect';
import {
  LLM_PROVIDER_LLAMA_CPP,
  LLM_PROVIDER_MLX_VLM,
  LLM_PROVIDER_OPENAI_COMPATIBLE,
  resolveSelectedLlmProfile,
  type LlmProviderProfile,
} from '@/utils/llmProviderProfiles';
import { isTauriDesktopPlatform } from '@/utils/tauriPlatform';

type QuizLlmModelPickerProps = {
  profiles: LlmProviderProfile[];
  profileId: string;
  model: string;
  onProfileIdChange: (profileId: string) => void;
  onModelChange: (model: string) => void;
  disabled?: boolean;
  /** When false, skip eager model-list fetch (use in secondary docks; session bar loads once). */
  autoLoadModels?: boolean;
};

export default function QuizLlmModelPicker({
  profiles,
  profileId,
  model,
  onProfileIdChange,
  onModelChange,
  disabled = false,
  autoLoadModels = true,
}: QuizLlmModelPickerProps) {
  const selectedProfile = useMemo(
    () => resolveSelectedLlmProfile(profiles, profileId),
    [profiles, profileId],
  );

  return (
    <div className={`space-y-2 ${disabled ? 'pointer-events-none opacity-60' : ''}`}>
      <label className="block space-y-1">
        <span className="text-xs font-semibold text-slate-700 dark:text-odp-fgStrong">
          제공자
        </span>
        <LlmProviderSelect
          profiles={profiles}
          value={profileId}
          onChange={onProfileIdChange}
          className="text-xs"
        />
      </label>
      {selectedProfile ? (
        <label className="block space-y-1">
          <span className="text-xs font-semibold text-slate-700 dark:text-odp-fgStrong">
            모델
          </span>
          {selectedProfile.kind === LLM_PROVIDER_OPENAI_COMPATIBLE ? (
            <OpenAiCompatibleModelSelect
              key={`${selectedProfile.id}-openai`}
              reloadKey={`${selectedProfile.id}:${selectedProfile.baseUrl || ''}`}
              getBaseUrl={() => selectedProfile.baseUrl || ''}
              getApiKey={() => selectedProfile.apiKey || ''}
              value={model}
              onChange={onModelChange}
              autoLoad={autoLoadModels}
            />
          ) : selectedProfile.kind === LLM_PROVIDER_LLAMA_CPP ? (
            isTauriDesktopPlatform() ? (
              <LlamaCppModelSelect
                key={`${selectedProfile.id}-llama-cpp`}
                value={model}
                onChange={onModelChange}
                autoLoad={autoLoadModels}
              />
            ) : (
              <OpenAiCompatibleModelSelect
                key={`${selectedProfile.id}-llama-cpp-remote`}
                reloadKey={`${selectedProfile.id}:${selectedProfile.baseUrl || ''}`}
                getBaseUrl={() => selectedProfile.baseUrl || ''}
                getApiKey={() => selectedProfile.apiKey || ''}
                value={model}
                onChange={onModelChange}
                autoLoad={autoLoadModels}
                aliasScope="llama-cpp"
              />
            )
          ) : selectedProfile.kind === LLM_PROVIDER_MLX_VLM ? (
            <MlxVlmModelSelect
              key={`${selectedProfile.id}-mlx`}
              value={model}
              onChange={onModelChange}
              autoLoad={autoLoadModels}
              autoLoadModelOnSelect={false}
            />
          ) : (
            <GeminiModelSelect
              key={`${selectedProfile.id}-gemini`}
              getGeminiApiKey={() => selectedProfile.apiKey || ''}
              profileId={selectedProfile.id}
              value={model}
              onChange={onModelChange}
              autoLoad={autoLoadModels}
            />
          )}
        </label>
      ) : null}
    </div>
  );
}
