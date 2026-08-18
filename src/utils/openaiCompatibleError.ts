export function parseRetrySecondsFromOpenAiError(detail: string, retryAfterHeader?: string | null): number | null {
  const headerSec = Number.parseInt(String(retryAfterHeader || '').trim(), 10);
  if (Number.isFinite(headerSec) && headerSec > 0) return headerSec;

  const text = String(detail || '');
  const match = text.match(/try again in ([\d.]+)\s*s/i) || text.match(/retry in ([\d.]+)s/i);
  if (!match) return null;
  const sec = Math.ceil(Number(match[1]));
  return Number.isFinite(sec) && sec > 0 ? sec : null;
}

export function formatOpenAiCompatibleError({
  status,
  detail,
  modelId,
}: {
  status: number;
  detail: string;
  modelId?: string;
}): string {
  const modelLabel = modelId ? ` (${modelId})` : '';
  const retrySec = parseRetrySecondsFromOpenAiError(detail);

  if (status === 401 || status === 403) {
    return `API 키 권한이 없거나 이 모델${modelLabel}에 접근할 수 없습니다.\n\n${detail}`;
  }

  if (status === 404) {
    return `Endpoint 또는 모델을 찾을 수 없습니다${modelLabel}.\n베이스 URL이 /v1 을 포함하는지, 모델 ID가 맞는지 확인하세요.\n\n${detail}`;
  }

  if (status === 429) {
    const lines = [`요청 한도를 초과했습니다${modelLabel}.`, '', detail];
    if (retrySec) lines.push('', `약 ${retrySec}초 후 다시 시도할 수 있습니다.`);
    return lines.join('\n');
  }

  return `OpenAI 호환 API 오류 (${status})${modelLabel}: ${detail}`;
}

export function formatOpenAiCompatibleNetworkError(err: unknown): string {
  const message = err instanceof Error ? err.message : String(err || '');
  if (err instanceof TypeError || /failed to fetch|networkerror|load failed/i.test(message)) {
    return [
      '서버에 연결할 수 없습니다.',
      'Endpoint URL과 브라우저 CORS 허용 여부를 확인하세요.',
      '로컬 서버(Ollama, LM Studio, vLLM 등)는 보통 CORS를 직접 열어야 합니다.',
    ].join('\n');
  }
  return message || 'OpenAI 호환 요청에 실패했습니다.';
}
