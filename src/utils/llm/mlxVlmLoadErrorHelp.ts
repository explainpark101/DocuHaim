import { dispatchSettingsSectionOpen } from '@/utils/settingsPageCatalog';

export const MLX_VLM_SETTINGS_SECTION_ID = 'settings-mlx-vlm';
export const MLX_VLM_SETTINGS_PATH = `/settings#${MLX_VLM_SETTINGS_SECTION_ID}`;
export const MLX_VLM_REDOWNLOAD_FOCUS_EVENT = 's3haim-mlx-vlm-redownload-focus';

export type MlxVlmRedownloadFocusDetail = {
  modelId: string;
};

const SKIP_REDOWNLOAD_HINT_PATTERNS: readonly RegExp[] = [
  /jinja2/i,
  /uv tool install/i,
  /only available in the tauri/i,
  /select a model before/i,
  /model id is required/i,
  /not runnable via uv/i,
  /worker is not running/i,
];

export type MlxVlmLoadFailureInfo = {
  message: string;
  suggestRedownload: boolean;
};

export function extractMlxVlmLoadErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    const trimmed = error.message.trim();
    if (trimmed) return trimmed;
  }
  const raw = String(error ?? '').trim();
  return raw || 'MLX-VLM 모델 로드에 실패했습니다.';
}

export function shouldSuggestMlxVlmRedownload(errorMessage: string): boolean {
  const msg = String(errorMessage || '').trim();
  if (!msg) return false;
  return !SKIP_REDOWNLOAD_HINT_PATTERNS.some((pattern) => pattern.test(msg));
}

export function resolveMlxVlmLoadFailure(
  error: unknown,
  modelId?: string,
): MlxVlmLoadFailureInfo {
  const message = extractMlxVlmLoadErrorMessage(error);
  return {
    message,
    suggestRedownload: shouldSuggestMlxVlmRedownload(message),
  };
}

export function buildMlxVlmLoadFailureAlertMessage(
  error: unknown,
  modelId?: string,
): string {
  const { message, suggestRedownload } = resolveMlxVlmLoadFailure(error, modelId);
  if (!suggestRedownload) return message;

  const id = String(modelId || '').trim();
  const lines = [
    message,
    '',
    '로드 오류는 손상되었거나 불완전한 캐시 파일 때문일 수 있습니다.',
    id ? `대상 모델: ${id}` : null,
    '설정 > MLX-VLM > 모델에서 해당 모델을 다시 다운로드한 뒤 Load model을 실행하세요.',
  ].filter((line): line is string => Boolean(line));

  return lines.join('\n');
}

export function requestMlxVlmRedownloadFocus(modelId?: string): void {
  if (typeof window === 'undefined') return;
  dispatchSettingsSectionOpen(MLX_VLM_SETTINGS_SECTION_ID);
  const id = String(modelId || '').trim();
  window.dispatchEvent(
    new CustomEvent<MlxVlmRedownloadFocusDetail>(MLX_VLM_REDOWNLOAD_FOCUS_EVENT, {
      detail: { modelId: id },
    }),
  );
}

export function buildMlxVlmRedownloadPasteInput(modelId: string): string {
  const id = String(modelId || '').trim();
  if (!id) return '';
  if (/^https?:\/\//i.test(id)) return id;
  if (id.includes('/')) return `https://huggingface.co/${id}`;
  return id;
}
