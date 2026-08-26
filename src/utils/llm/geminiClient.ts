import { ApiError, GoogleGenAI, type Model, type Part } from '@google/genai';

import { DEFAULT_GEMINI_MODEL, loadLastUsedGeminiModel } from '@/utils/llm/geminiModelSettings';
import {
  formatGeminiApiError,
  parseRetrySecondsFromGeminiError,
  sleep,
} from '@/utils/llm/geminiError';
import { buildLlmTransformPrompt } from '@/utils/llm/llmTransformPrompt';
import {
  ensureGeminiFetchShim,
  resolveGeminiHttpBaseUrl,
} from '@/utils/llm/geminiApiTransport';

const MAX_RATE_LIMIT_RETRIES = 1;

export type GeminiModelOption = {
  id: string;
  displayName: string;
};

type GeminiTransformImage = {
  mimeType: string;
  dataBase64: string;
};

type GeminiApiError = Error & {
  status?: number;
  retryAfterSec?: number | null;
};

function parseModelId(name: string | undefined): string {
  return String(name || '').replace(/^models\//, '');
}

function createGeminiClient(apiKey: string): GoogleGenAI {
  ensureGeminiFetchShim();
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      baseUrl: resolveGeminiHttpBaseUrl(),
    },
  });
}

function parseGeminiApiErrorDetail(err: ApiError): string {
  try {
    const parsed: unknown = JSON.parse(err.message);
    if (parsed && typeof parsed === 'object') {
      const rec = parsed as Record<string, unknown>;
      const error = rec.error;
      if (error && typeof error === 'object') {
        const message = (error as Record<string, unknown>).message;
        if (typeof message === 'string' && message.trim()) return message;
      }
    }
  } catch {
    // ignore
  }
  return err.message;
}

function toGeminiApiError(err: unknown, modelId?: string): GeminiApiError {
  if (err instanceof ApiError) {
    const detail = parseGeminiApiErrorDetail(err);
    const wrapped = new Error(
      formatGeminiApiError({ status: err.status, detail, modelId }),
    ) as GeminiApiError;
    wrapped.status = err.status;
    wrapped.retryAfterSec = parseRetrySecondsFromGeminiError(detail);
    return wrapped;
  }

  if (err instanceof Error) return err;
  return new Error(String(err));
}

function supportsGenerateContent(model: Model): boolean {
  const actions = model.supportedActions ?? [];
  if (actions.includes('generateContent')) return true;

  const legacy = (model as Model & { supportedGenerationMethods?: string[] })
    .supportedGenerationMethods;
  return Array.isArray(legacy) && legacy.includes('generateContent');
}

/**
 * @param apiKey Gemini API key
 */
export async function listGeminiModels(apiKey: string): Promise<GeminiModelOption[]> {
  const ai = createGeminiClient(apiKey);
  const models: GeminiModelOption[] = [];
  const pager = await ai.models.list({ config: { pageSize: 100 } });

  for (;;) {
    for (const item of pager.page) {
      if (!supportsGenerateContent(item)) continue;
      const id = parseModelId(item.name);
      if (!id) continue;
      models.push({
        id,
        displayName: item.displayName || id,
      });
    }
    if (!pager.hasNextPage()) break;
    await pager.nextPage();
  }

  return models.sort((a, b) => a.displayName.localeCompare(b.displayName, 'ko'));
}

function buildContentParts({
  instruction,
  selectedText,
  images,
}: {
  instruction: string;
  selectedText: string;
  images: GeminiTransformImage[];
}): Part[] {
  const imageList = Array.isArray(images) ? images : [];
  const hasImages = imageList.length > 0;
  const parts: Part[] = imageList.map((img) => ({
    inlineData: {
      mimeType: img.mimeType,
      data: img.dataBase64,
    },
  }));
  parts.push({
    text: buildLlmTransformPrompt({ instruction, selectedText, hasImages }),
  });
  return parts;
}

async function generateGeminiContent(
  apiKey: string,
  modelId: string,
  parts: Part[],
): Promise<string> {
  const ai = createGeminiClient(apiKey);
  const response = await ai.models.generateContent({
    model: modelId,
    contents: [{ role: 'user', parts }],
    config: {
      temperature: 0.4,
    },
  });

  const text = response.text;
  if (typeof text !== 'string' || !text.trim()) {
    throw new Error('Gemini API가 빈 응답을 반환했습니다.');
  }
  return text.trim();
}

async function generateGeminiContentWithRetry(
  apiKey: string,
  modelId: string,
  parts: Part[],
): Promise<string> {
  let attempt = 0;
  while (true) {
    try {
      return await generateGeminiContent(apiKey, modelId, parts);
    } catch (err) {
      const typed = toGeminiApiError(err, modelId);
      const canRetry =
        typed.status === 429 &&
        attempt < MAX_RATE_LIMIT_RETRIES &&
        typed.retryAfterSec &&
        typed.retryAfterSec <= 120;

      if (!canRetry) throw typed;

      attempt += 1;
      await sleep((typed.retryAfterSec ?? 1) * 1000);
    }
  }
}

export async function generateGeminiTransform({
  apiKey,
  model,
  instruction,
  selectedText,
  images,
}: {
  apiKey: string;
  model?: string;
  instruction: string;
  selectedText?: string;
  images?: GeminiTransformImage[];
}): Promise<string> {
  const modelId = (model || loadLastUsedGeminiModel()).trim() || DEFAULT_GEMINI_MODEL;
  const trimmedInstruction = (instruction || '').trim();
  const trimmedSelection = (selectedText || '').trim();
  const imageList = Array.isArray(images)
    ? images.filter((img) => img?.mimeType && img?.dataBase64)
    : [];

  if (!trimmedInstruction) throw new Error('지시사항을 입력하세요.');

  const parts = buildContentParts({
    instruction: trimmedInstruction,
    selectedText: trimmedSelection,
    images: imageList,
  });

  try {
    return await generateGeminiContentWithRetry(apiKey, modelId, parts);
  } catch (err) {
    throw toGeminiApiError(err, modelId);
  }
}
