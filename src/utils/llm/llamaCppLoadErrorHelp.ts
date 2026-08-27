export type LlamaCppLoadFailure = {
  message: string;
  suggestRedownload: boolean;
};

export function resolveLlamaCppLoadFailure(err: unknown): LlamaCppLoadFailure {
  const message = err instanceof Error ? err.message : String(err || 'Unknown error');
  const lower = message.toLowerCase();
  const suggestRedownload =
    lower.includes('gguf') ||
    lower.includes('model') ||
    lower.includes('download') ||
    lower.includes('not found');
  return { message, suggestRedownload };
}

export function buildLlamaCppLoadFailureAlertMessage(
  err: unknown,
  modelId?: string,
): string {
  const failure = resolveLlamaCppLoadFailure(err);
  const id = String(modelId || '').trim();
  const lines = [failure.message];
  if (id) lines.push('', `Model: ${id}`);
  if (failure.suggestRedownload) {
    lines.push('', '모델 파일이 없거나 손상되었을 수 있습니다. 재다운로드 또는 경로를 확인하세요.');
  }
  return lines.join('\n');
}

export const LLAMA_CPP_REDOWNLOAD_FOCUS_EVENT = 's3haim-llama-cpp-redownload-focus';

export function requestLlamaCppRedownloadFocus(modelId?: string): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent(LLAMA_CPP_REDOWNLOAD_FOCUS_EVENT, {
      detail: { modelId: String(modelId || '').trim() },
    }),
  );
}
