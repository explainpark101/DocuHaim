import { MlxVlmRawLogBuffer } from '@/utils/llm/mlxVlmRawLogBuffer';

export type { MlxVlmLogLine } from '@/utils/llm/mlxVlmRawLogBuffer';

export const MLX_VLM_DOWNLOAD_LOG_CHANGED_EVENT = 's3haim-mlx-vlm-download-log-changed';

const buffer = new MlxVlmRawLogBuffer();

export function getMlxVlmDownloadLogLines(): readonly import('@/utils/llm/mlxVlmRawLogBuffer').MlxVlmLogLine[] {
  return buffer.getLines();
}

/** Joined view for tests and legacy callers. */
export function getMlxVlmDownloadLogText(): string {
  return buffer.joinText();
}

export function resetMlxVlmDownloadLog(): void {
  buffer.reset();
}

export function clearMlxVlmDownloadLog(): void {
  resetMlxVlmDownloadLog();
  notifyMlxVlmDownloadLogChanged();
}

export function appendMlxVlmDownloadLogText(chunk: string): string {
  buffer.append(chunk);
  return getMlxVlmDownloadLogText();
}

export function notifyMlxVlmDownloadLogChanged(): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(MLX_VLM_DOWNLOAD_LOG_CHANGED_EVENT));
}

/** Append raw subprocess stdout/stderr only. */
export function appendMlxVlmDownloadLog(chunk: string): void {
  appendMlxVlmDownloadLogText(chunk);
  notifyMlxVlmDownloadLogChanged();
}

export function subscribeMlxVlmDownloadLog(onChange: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener(MLX_VLM_DOWNLOAD_LOG_CHANGED_EVENT, onChange);
  return () => window.removeEventListener(MLX_VLM_DOWNLOAD_LOG_CHANGED_EVENT, onChange);
}
