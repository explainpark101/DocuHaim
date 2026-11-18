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
import {
  formatLlmAssistReferenceHeading,
  type LlmAssistChatReference,
} from '@/utils/llm/llmAssistChatReferences';

export type LlmChatImageAttachment = {
  id?: string;
  name?: string;
  mimeType: string;
  dataBase64: string;
  previewDataUrl?: string;
};

export type LlmChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  images?: LlmChatImageAttachment[];
  references?: LlmAssistChatReference[];
};

export function formatLlmChatUserContent(message: LlmChatMessage): string {
  const refs = Array.isArray(message.references)
    ? message.references.filter((r) => String(r.text || '').trim())
    : [];
  const body = String(message.content || '').trim();
  if (!refs.length) return body;
  const refBlock = refs
    .map((ref, i) => `${formatLlmAssistReferenceHeading(ref, i)}\n${String(ref.text || '').trim()}`)
    .join('\n\n');
  return body ? `${refBlock}\n\n${body}` : refBlock;
}

function formatMlxChatPrompt(messages: LlmChatMessage[]): string {
  return messages
    .map((msg) => {
      const label = msg.role === 'assistant' ? 'Assistant' : 'User';
      const content =
        msg.role === 'user' ? formatLlmChatUserContent(msg) : msg.content.trim();
      if (!content) return '';
      return `${label}:\n${content}`;
    })
    .filter((block) => block.length > 0)
    .join('\n\n');
}

function toOpenAiChatMessages(messages: LlmChatMessage[]) {
  return messages.map((msg) => {
    if (msg.role === 'assistant') {
      return { role: 'assistant' as const, content: msg.content };
    }
    const text = formatLlmChatUserContent(msg);
    const images = Array.isArray(msg.images)
      ? msg.images.filter((img) => img?.mimeType && img?.dataBase64)
      : [];
    if (!images.length) {
      return { role: 'user' as const, content: text };
    }
    return {
      role: 'user' as const,
      content: [
        { type: 'text' as const, text: text || ' ' },
        ...images.map((img) => ({
          type: 'image_url' as const,
          image_url: { url: `data:${img.mimeType};base64,${img.dataBase64}` },
        })),
      ],
    };
  });
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
  const trimmedMessages: LlmChatMessage[] = messages
    .map((msg) => {
      const next: LlmChatMessage = {
        id: msg.id,
        role: msg.role,
        content: String(msg.content || '').trim(),
      };
      if (Array.isArray(msg.images) && msg.images.length) {
        next.images = msg.images;
      }
      if (Array.isArray(msg.references) && msg.references.length) {
        next.references = msg.references;
      }
      return next;
    })
    .filter((msg) => {
      if (msg.role === 'assistant') return msg.content.length > 0;
      const hasRefs = Boolean(msg.references?.some((r) => r.text.trim()));
      const hasImages = Boolean(msg.images?.length);
      return msg.content.length > 0 || hasRefs || hasImages;
    });

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
          messages: toOpenAiChatMessages(trimmedMessages),
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
          messages: toOpenAiChatMessages(trimmedMessages),
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
    const lastUser = [...trimmedMessages].reverse().find((m) => m.role === 'user');
    const images = lastUser?.images?.map((img) => ({
      mimeType: img.mimeType,
      dataBase64: img.dataBase64,
    }));
    return generateMlxVlmCompletion({
      prompt: formatMlxChatPrompt(trimmedMessages),
      systemPrompt: (systemPrompt ?? '').trim(),
      ...(images?.length ? { images } : {}),
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
            content: m.role === 'user' ? formatLlmChatUserContent(m) : m.content,
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
