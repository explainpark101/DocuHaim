/**
 * Parse Gemini API error payloads into user-facing Korean messages.
 */

/** Models known to have zero free-tier generateContent quota on AI Studio. */
export const FREE_TIER_BLOCKED_MODELS = new Set([
  'gemini-2.0-flash-lite',
]);

export function isFreeTierBlockedModel(modelId) {
  return FREE_TIER_BLOCKED_MODELS.has(String(modelId || '').trim());
}

export function sanitizeGeminiModelId(modelId) {
  const trimmed = String(modelId || '').trim();
  if (!trimmed || isFreeTierBlockedModel(trimmed)) {
    return null;
  }
  return trimmed;
}

/**
 * @param {string} detail
 * @returns {number | null} seconds
 */
export function parseRetrySecondsFromGeminiError(detail) {
  const text = String(detail || '');
  const match = text.match(/retry in ([\d.]+)s/i);
  if (!match) return null;
  const sec = Math.ceil(Number(match[1]));
  return Number.isFinite(sec) && sec > 0 ? sec : null;
}

function hasZeroFreeTierLimit(detail) {
  return /limit:\s*0/i.test(String(detail || ''));
}

/**
 * @param {object} params
 * @param {number} params.status
 * @param {string} params.detail
 * @param {string} [params.modelId]
 * @returns {string}
 */
export function formatGeminiApiError({ status, detail, modelId }) {
  const modelLabel = modelId ? ` (${modelId})` : '';
  const retrySec = parseRetrySecondsFromGeminiError(detail);
  const zeroLimit = hasZeroFreeTierLimit(detail);
  const blockedModel = modelId && isFreeTierBlockedModel(modelId);

  if (status === 429) {
    const lines = [`요청 한도를 초과했습니다${modelLabel}.`];

    if (zeroLimit || blockedModel) {
      lines.push(
        '',
        '선택한 모델은 무료 플랜에서 사용할 수 없거나 할당량이 0입니다.',
        'Gemini 2.0 Flash 또는 Gemini 2.5 Flash 같은 다른 모델을 선택해 보세요.',
        '유료 플랜·결제 정보는 Google AI Studio에서 확인할 수 있습니다.',
      );
    } else {
      lines.push(
        '',
        '잠시 후 다시 시도하거나, 다른 모델을 선택해 보세요.',
        '사용량: https://ai.dev/rate-limit',
      );
    }

    if (retrySec) {
      lines.push('', `약 ${retrySec}초 후 다시 시도할 수 있습니다.`);
    }

    return lines.join('\n');
  }

  if (status === 403) {
    return `API 키 권한이 없거나 이 모델${modelLabel}에 접근할 수 없습니다.\n\n${detail}`;
  }

  return `Gemini API 오류 (${status})${modelLabel}: ${detail}`;
}

export function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
