import { isExaoneTabularModelId } from '@/utils/exaoneSettings';
import { isFreeTierBlockedModel } from '@/utils/geminiError';
import { streamGeminiChat } from '@/utils/llm/geminiClient';
import { withLlmProfileApiKey } from '@/utils/llmApiKeySession';
import { ensureLlamaCppServerReadyForAssist } from '@/utils/llamaCppShell';
import { loadLlamaCppSettings } from '@/utils/llamaCppSettingsStore';
import { generateMlxVlmCompletion } from '@/utils/llm/mlxVlmRuntime';
import { toMlxVlmGenerateKwargs } from '@/utils/llm/llmAssistRequestOptions';
import { streamOpenAiCompatibleChat } from '@/utils/llm/openaiCompatibleClient';
import {
  LLM_PROVIDER_EXAONE,
  LLM_PROVIDER_GEMINI,
  LLM_PROVIDER_LLAMA_CPP,
  LLM_PROVIDER_MLX_VLM,
  LLM_PROVIDER_OPENAI_COMPATIBLE,
  resolveOpenAiCompatibleProfileBaseUrl,
  saveLastUsedModelForProfile,
  type LlmProviderProfile,
} from '@/utils/llm/llmProviderProfiles';
import { loadMlxVlmSettings } from '@/utils/mlxVlmSettingsStore';
import { getMlxVlmServerStatus } from '@/utils/mlxVlmShell';
import { saveLastUsedGeminiModel } from '@/utils/geminiModelSettings';
import { saveLastUsedOpenAiCompatibleModel } from '@/utils/openaiCompatibleSettings';

export type LlmChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

function formatMlxChatPrompt(messages: LlmChatMessage[]): string {
  return messages
    .map((msg) => {
      const label = msg.role === 'assistant' ? 'Assistant' : 'User';
      return `${label}:\n${msg.content.trim()}`;
    })
    .filter((block) => block.length > 0)
    .join('\n\n');
}

/**
 * Stream a multi-turn chat reply for the selected LLM Assist provider.
 */
export async function streamLlmChatReply({
  profile,
  model,
  messages,
  systemPrompt,
  requestOptions,
  onChunk,
  signal,
}: {
  profile: LlmProviderProfile;
  model: string;
  messages: LlmChatMessage[];
  systemPrompt?: string;
  requestOptions?: Record<string, unknown>;
  onChunk?: (accumulated: string) => void;
  signal?: AbortSignal;
}): Promise<string> {
  const trimmedMessages = messages
    .map((msg) => ({
      ...msg,
      content: String(msg.content || '').trim(),
    }))
    .filter((msg) => msg.content.length > 0);

  if (!trimmedMessages.length) {
    throw new Error('채팅 메시지를 입력하세요.');
  }

  if (
    profile.kind === LLM_PROVIDER_OPENAI_COMPATIBLE ||
    profile.kind === LLM_PROVIDER_EXAONE
  ) {
    if (profile.kind === LLM_PROVIDER_EXAONE && isExaoneTabularModelId(model)) {
      throw new Error(
        'Tabular 모델은 채팅 모드를 지원하지 않습니다. 채팅 모델을 선택하세요.',
      );
    }
    const baseUrl = resolveOpenAiCompatibleProfileBaseUrl(profile);
    saveLastUsedModelForProfile(profile.id, model);
    saveLastUsedOpenAiCompatibleModel(model);
    return withLlmProfileApiKey(
      profile.id,
      () => profile.apiKey || '',
      (apiKey) =>
        streamOpenAiCompatibleChat({
          baseUrl,
          apiKey,
          model,
          messages: trimmedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          ...(systemPrompt !== undefined ? { systemPrompt } : {}),
          ...(requestOptions !== undefined ? { requestOptions } : {}),
          ...(onChunk ? { onChunk } : {}),
          ...(signal ? { signal } : {}),
        }),
      {
        allowEmpty: profile.kind === LLM_PROVIDER_OPENAI_COMPATIBLE,
        missingKeyMessage:
          profile.kind === LLM_PROVIDER_EXAONE
            ? 'EXAONE API 키가 없습니다.'
            : 'OpenAI 호환 API 키가 없습니다.',
      },
    );
  }

  if (profile.kind === LLM_PROVIDER_LLAMA_CPP) {
    const llamaSettings = loadLlamaCppSettings();
    const status = await ensureLlamaCppServerReadyForAssist(llamaSettings, {
      ...(signal ? { signal } : {}),
    });
    const baseUrl = (profile.baseUrl || status.baseUrl || '').trim();
    if (!baseUrl) {
      throw new Error('llama.cpp 서버 URL을 확인할 수 없습니다. 설정에서 서버를 다시 시작하세요.');
    }
    const resolvedModel = model.trim() || llamaSettings.selectedModelId || status.models[0] || '';
    if (!resolvedModel) throw new Error('사용할 모델을 선택하세요.');
    saveLastUsedModelForProfile(profile.id, resolvedModel);
    return withLlmProfileApiKey(
      profile.id,
      () => profile.apiKey || llamaSettings.apiKey || 'no-key-required',
      (apiKey) =>
        streamOpenAiCompatibleChat({
          baseUrl,
          apiKey,
          model: resolvedModel,
          messages: trimmedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          ...(systemPrompt !== undefined ? { systemPrompt } : {}),
          ...(requestOptions !== undefined ? { requestOptions } : {}),
          ...(onChunk ? { onChunk } : {}),
          ...(signal ? { signal } : {}),
        }),
      { allowEmpty: true, missingKeyMessage: 'llama.cpp API 키가 없습니다.' },
    );
  }

  if (profile.kind === LLM_PROVIDER_MLX_VLM) {
    const mlxSettings = loadMlxVlmSettings();
    const status = await getMlxVlmServerStatus(mlxSettings);
    if (!status.running) {
      throw new Error(
        'MLX-VLM 모델이 로드되어 있지 않습니다.\n설정 > MLX-VLM (Tauri macOS)에서 모델을 선택한 뒤 Load model을 실행하세요.',
      );
    }
    const resolvedModel = model.trim() || mlxSettings.selectedModelId || status.models[0] || '';
    if (!resolvedModel) throw new Error('사용할 MLX 모델을 선택하세요.');
    saveLastUsedModelForProfile(profile.id, resolvedModel);
    return generateMlxVlmCompletion({
      prompt: formatMlxChatPrompt(trimmedMessages),
      systemPrompt: (systemPrompt ?? '').trim(),
      generateOptions: toMlxVlmGenerateKwargs(requestOptions ?? {}),
      resetCache: true,
      ...(onChunk ? { onChunk } : {}),
      ...(signal ? { signal } : {}),
    });
  }

  if (profile.kind === LLM_PROVIDER_GEMINI) {
    if (isFreeTierBlockedModel(model)) {
      throw new Error(
        '선택한 모델은 무료 플랜에서 사용할 수 없습니다.\nGemini 2.0 Flash 또는 Gemini 2.5 Flash로 변경해 주세요.',
      );
    }
    saveLastUsedModelForProfile(profile.id, model);
    saveLastUsedGeminiModel(model);
    return withLlmProfileApiKey(
      profile.id,
      () => profile.apiKey || '',
      (apiKey) =>
        streamGeminiChat({
          apiKey,
          model,
          messages: trimmedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          ...(systemPrompt !== undefined ? { systemPrompt } : {}),
          ...(requestOptions !== undefined ? { requestOptions } : {}),
          ...(onChunk ? { onChunk } : {}),
          ...(signal ? { signal } : {}),
        }),
      {
        missingKeyMessage:
          'Google AI Studio API 키가 설정되지 않았습니다. 설정 페이지에서 입력하세요.',
      },
    );
  }

  throw new Error('지원하지 않는 AI 제공자입니다.');
}

export function createLlmChatMessageId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
