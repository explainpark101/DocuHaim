import { buildLlmTransformPrompt } from '@/utils/llm/llmTransformPrompt';
import {
  formatOpenAiCompatibleError,
  formatOpenAiCompatibleNetworkError,
  parseRetrySecondsFromOpenAiError,
} from '@/utils/llm/openaiCompatibleError';
import {
  loadLastUsedOpenAiCompatibleModel,
  normalizeOpenAiCompatibleBaseUrl,
} from '@/utils/llm/openaiCompatibleSettings';
import { sleep } from '@/utils/llm/geminiError';

const MAX_RATE_LIMIT_RETRIES = 1;

export type OpenAiCompatibleModel = {
  id: string;
  displayName: string;
};

type ChatMessageContentPart =
  | { type: 'text'; text: string }
  | { type: 'image_url'; image_url: { url: string } };

type ChatMessage = {
  role: 'user';
  content: string | ChatMessageContentPart[];
};

function authHeaders(apiKey: string): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  const key = String(apiKey || '').trim();
  if (key) headers.Authorization = `Bearer ${key}`;
  return headers;
}

function requireBaseUrl(baseUrl: string): string {
  const normalized = normalizeOpenAiCompatibleBaseUrl(baseUrl);
  if (!normalized) {
    throw new Error(
      'OpenAI 호환 Endpoint를 입력하세요. 예: https://api.openai.com/v1 또는 http://localhost:11434/v1',
    );
  }
  return normalized;
}

async function readErrorDetail(res: Response): Promise<string> {
  let detail = res.statusText;
  try {
    const errBody: unknown = await res.json();
    if (errBody && typeof errBody === 'object') {
      const rec = errBody as Record<string, unknown>;
      const err = rec.error;
      if (typeof err === 'string' && err.trim()) return err;
      if (err && typeof err === 'object') {
        const msg = (err as Record<string, unknown>).message;
        if (typeof msg === 'string' && msg.trim()) return msg;
      }
      if (typeof rec.message === 'string' && rec.message.trim()) return rec.message;
    }
  } catch {
    // ignore
  }
  return detail;
}

async function fetchOpenAiJson(url: string, init: RequestInit): Promise<Response> {
  try {
    return await fetch(url, init);
  } catch (err) {
    throw new Error(formatOpenAiCompatibleNetworkError(err));
  }
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function readModelId(item: unknown): string {
  if (typeof item === 'string') return item.trim();
  const rec = asRecord(item);
  if (!rec) return '';
  const id = rec.id ?? rec.name ?? rec.model;
  return typeof id === 'string' ? id.trim() : '';
}

function readModelDisplayName(item: unknown, fallbackId: string): string {
  const rec = asRecord(item);
  if (!rec) return fallbackId;
  const name = rec.display_name ?? rec.displayName ?? rec.id ?? rec.name;
  return typeof name === 'string' && name.trim() ? name.trim() : fallbackId;
}

/**
 * GET {base}/models — OpenAI-compatible list.
 * @param {string} baseUrl e.g. https://api.openai.com/v1
 * @param {string} [apiKey] optional Bearer token (local servers may omit)
 */
export async function listOpenAiCompatibleModels(
  baseUrl: string,
  apiKey = '',
): Promise<OpenAiCompatibleModel[]> {
  const base = requireBaseUrl(baseUrl);
  const res = await fetchOpenAiJson(`${base}/models`, {
    headers: authHeaders(apiKey),
  });

  if (!res.ok) {
    const detail = await readErrorDetail(res);
    throw new Error(formatOpenAiCompatibleError({ status: res.status, detail }));
  }

  const data: unknown = await res.json();
  const rec = asRecord(data);
  const rawList = rec
    ? Array.isArray(rec.data)
      ? rec.data
      : Array.isArray(rec.models)
        ? rec.models
        : []
    : Array.isArray(data)
      ? data
      : [];

  const models: OpenAiCompatibleModel[] = [];
  const seen = new Set<string>();
  for (const item of rawList) {
    const id = readModelId(item);
    if (!id || seen.has(id)) continue;
    seen.add(id);
    models.push({ id, displayName: readModelDisplayName(item, id) });
  }

  return models.sort((a, b) => a.displayName.localeCompare(b.displayName, 'ko'));
}

function extractAssistantText(data: unknown): string {
  const rec = asRecord(data);
  const choices = rec && Array.isArray(rec.choices) ? rec.choices : [];
  const first = asRecord(choices[0]);
  const message = asRecord(first?.message);
  const content = message?.content ?? first?.text;

  if (typeof content === 'string' && content.trim()) return content.trim();
  if (Array.isArray(content)) {
    const texts = content
      .map((part) => {
        if (typeof part === 'string') return part;
        const partRec = asRecord(part);
        if (!partRec) return '';
        if (typeof partRec.text === 'string') return partRec.text;
        const inner = asRecord(partRec.text);
        return typeof inner?.value === 'string' ? inner.value : '';
      })
      .filter(Boolean);
    if (texts.length) return texts.join('\n').trim();
  }
  return '';
}

function buildChatMessages({
  instruction,
  selectedText,
  images,
}: {
  instruction: string;
  selectedText: string;
  images: { mimeType: string; dataBase64: string }[];
}): ChatMessage[] {
  const hasImages = images.length > 0;
  const prompt = buildLlmTransformPrompt({
    instruction,
    selectedText,
    hasImages,
  });

  if (!hasImages) {
    return [{ role: 'user', content: prompt }];
  }

  const parts: ChatMessageContentPart[] = [
    { type: 'text', text: prompt },
    ...images.map((img) => ({
      type: 'image_url' as const,
      image_url: {
        url: `data:${img.mimeType};base64,${img.dataBase64}`,
      },
    })),
  ];
  return [{ role: 'user', content: parts }];
}

async function postChatCompletions({
  baseUrl,
  apiKey,
  modelId,
  messages,
}: {
  baseUrl: string;
  apiKey: string;
  modelId: string;
  messages: ChatMessage[];
}): Promise<string> {
  const res = await fetchOpenAiJson(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: authHeaders(apiKey),
    body: JSON.stringify({
      model: modelId,
      messages,
      temperature: 0.4,
    }),
  });

  if (!res.ok) {
    const detail = await readErrorDetail(res);
    const err = new Error(
      formatOpenAiCompatibleError({ status: res.status, detail, modelId }),
    ) as Error & { status?: number; retryAfterSec?: number | null };
    err.status = res.status;
    err.retryAfterSec = parseRetrySecondsFromOpenAiError(
      detail,
      res.headers.get('retry-after'),
    );
    throw err;
  }

  const data: unknown = await res.json();
  const text = extractAssistantText(data);
  if (!text) {
    throw new Error('OpenAI 호환 API가 빈 응답을 반환했습니다.');
  }
  return text;
}

async function postChatCompletionsWithRetry(
  params: Parameters<typeof postChatCompletions>[0],
): Promise<string> {
  let attempt = 0;
  while (true) {
    try {
      return await postChatCompletions(params);
    } catch (err) {
      const typed = err as { status?: number; retryAfterSec?: number | null };
      const canRetry =
        typed?.status === 429 &&
        attempt < MAX_RATE_LIMIT_RETRIES &&
        typed.retryAfterSec &&
        typed.retryAfterSec <= 120;

      if (!canRetry) throw err;
      attempt += 1;
      await sleep((typed.retryAfterSec ?? 1) * 1000);
    }
  }
}

export async function generateOpenAiCompatibleTransform({
  baseUrl,
  apiKey,
  model,
  instruction,
  selectedText,
  images,
}: {
  baseUrl: string;
  apiKey?: string;
  model?: string;
  instruction: string;
  selectedText?: string;
  images?: { mimeType: string; dataBase64: string }[];
}): Promise<string> {
  const base = requireBaseUrl(baseUrl);
  const modelId =
    (model || loadLastUsedOpenAiCompatibleModel()).trim();
  const trimmedInstruction = (instruction || '').trim();
  const trimmedSelection = (selectedText || '').trim();
  const imageList = Array.isArray(images)
    ? images.filter((img) => img?.mimeType && img?.dataBase64)
    : [];

  if (!modelId) throw new Error('모델 ID를 입력하거나 목록에서 선택하세요.');
  if (!trimmedInstruction) throw new Error('지시사항을 입력하세요.');

  const messages = buildChatMessages({
    instruction: trimmedInstruction,
    selectedText: trimmedSelection,
    images: imageList,
  });

  return postChatCompletionsWithRetry({
    baseUrl: base,
    apiKey: apiKey ?? '',
    modelId,
    messages,
  });
}
