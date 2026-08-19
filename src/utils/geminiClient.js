import { DEFAULT_GEMINI_MODEL, loadLastUsedGeminiModel } from '@/utils/geminiModelSettings';
import {
  formatGeminiApiError,
  parseRetrySecondsFromGeminiError,
  sleep,
} from '@/utils/geminiError';
import { buildLlmTransformPrompt } from '@/utils/llmTransformPrompt';

const API_BASE = 'https://generativelanguage.googleapis.com/v1beta';
const MAX_RATE_LIMIT_RETRIES = 1;

function parseModelId(name) {
  return String(name || '').replace(/^models\//, '');
}

async function readGeminiErrorDetail(res) {
  let detail = res.statusText;
  try {
    const errBody = await res.json();
    detail = errBody?.error?.message || detail;
  } catch {
    // ignore
  }
  return detail;
}

/**
 * @param {string} apiKey
 * @returns {Promise<{ id: string, displayName: string }[]>}
 */
export async function listGeminiModels(apiKey) {
  const models = [];
  let pageToken;

  do {
    const url = new URL(`${API_BASE}/models`);
    url.searchParams.set('pageSize', '100');
    if (pageToken) url.searchParams.set('pageToken', pageToken);

    const res = await fetch(url.toString(), {
      headers: { 'x-goog-api-key': apiKey },
    });

    if (!res.ok) {
      const detail = await readGeminiErrorDetail(res);
      throw new Error(formatGeminiApiError({ status: res.status, detail }));
    }

    const data = await res.json();
    for (const item of data.models || []) {
      const methods = item.supportedGenerationMethods || [];
      if (!methods.includes('generateContent')) continue;
      models.push({
        id: parseModelId(item.name),
        displayName: item.displayName || parseModelId(item.name),
      });
    }
    pageToken = data.nextPageToken;
  } while (pageToken);

  return models.sort((a, b) => a.displayName.localeCompare(b.displayName, 'ko'));
}

async function postGenerateContent(apiKey, modelId, parts) {
  const url = `${API_BASE}/models/${encodeURIComponent(modelId)}:generateContent`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey,
    },
    body: JSON.stringify({
      contents: [{ parts }],
      generationConfig: {
        temperature: 0.4,
      },
    }),
  });

  if (!res.ok) {
    const detail = await readGeminiErrorDetail(res);
    const err = new Error(formatGeminiApiError({ status: res.status, detail, modelId }));
    err.status = res.status;
    err.retryAfterSec = parseRetrySecondsFromGeminiError(detail);
    throw err;
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (typeof text !== 'string' || !text.trim()) {
    throw new Error('Gemini API가 빈 응답을 반환했습니다.');
  }
  return text.trim();
}

function buildContentParts({ instruction, selectedText, images }) {
  const imageList = Array.isArray(images) ? images : [];
  const hasImages = imageList.length > 0;
  const parts = imageList.map((img) => ({
    inline_data: {
      mime_type: img.mimeType,
      data: img.dataBase64,
    },
  }));
  parts.push({
    text: buildLlmTransformPrompt({ instruction, selectedText, hasImages }),
  });
  return parts;
}

async function postGenerateContentWithRetry(apiKey, modelId, parts) {
  let attempt = 0;
  while (true) {
    try {
      return await postGenerateContent(apiKey, modelId, parts);
    } catch (err) {
      const canRetry =
        err?.status === 429 &&
        attempt < MAX_RATE_LIMIT_RETRIES &&
        err.retryAfterSec &&
        err.retryAfterSec <= 120;

      if (!canRetry) throw err;

      attempt += 1;
      await sleep(err.retryAfterSec * 1000);
    }
  }
}

/**
 * @param {object} params
 * @param {string} params.apiKey
 * @param {string} [params.model]
 * @param {string} params.instruction
 * @param {string} [params.selectedText]
 * @param {{ mimeType: string, dataBase64: string }[]} [params.images]
 * @returns {Promise<string>}
 */
export async function generateGeminiTransform({ apiKey, model, instruction, selectedText, images }) {
  const modelId = (model || loadLastUsedGeminiModel()).trim() || DEFAULT_GEMINI_MODEL;
  const trimmedInstruction = (instruction || '').trim();
  const trimmedSelection = (selectedText || '').trim();
  const imageList = Array.isArray(images) ? images.filter((img) => img?.mimeType && img?.dataBase64) : [];
  const hasImages = imageList.length > 0;

  if (!trimmedInstruction) throw new Error('지시사항을 입력하세요.');

  const parts = buildContentParts({
    instruction: trimmedInstruction,
    selectedText: trimmedSelection,
    images: imageList,
  });

  return postGenerateContentWithRetry(apiKey, modelId, parts);
}
