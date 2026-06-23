import { DEFAULT_GEMINI_MODEL, loadLastUsedGeminiModel } from '@/utils/geminiModelSettings';
import {
  formatGeminiApiError,
  parseRetrySecondsFromGeminiError,
  sleep,
} from '@/utils/geminiError';

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

async function postGenerateContent(apiKey, modelId, userText) {
  const url = `${API_BASE}/models/${encodeURIComponent(modelId)}:generateContent`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey,
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: userText }] }],
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

/**
 * @param {object} params
 * @param {string} params.apiKey
 * @param {string} [params.model]
 * @param {string} params.instruction
 * @param {string} params.selectedText
 * @returns {Promise<string>}
 */
export async function generateGeminiTransform({ apiKey, model, instruction, selectedText }) {
  const modelId = (model || loadLastUsedGeminiModel()).trim() || DEFAULT_GEMINI_MODEL;
  const trimmedInstruction = (instruction || '').trim();
  const trimmedSelection = (selectedText || '').trim();
  if (!trimmedInstruction) throw new Error('지시사항을 입력하세요.');
  if (!trimmedSelection) throw new Error('에디터에서 변환할 텍스트를 선택하세요.');

  const userText = [
    trimmedInstruction,
    '',
    '---',
    '아래는 사용자가 선택한 텍스트입니다. 지시사항에 따라 결과만 출력하세요. 설명이나 부가 코멘트는 최소화하세요.',
    '',
    trimmedSelection,
  ].join('\n');

  let attempt = 0;
  while (true) {
    try {
      return await postGenerateContent(apiKey, modelId, userText);
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
