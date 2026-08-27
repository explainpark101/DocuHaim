import { MlxVlmRawLogBuffer } from '@/utils/llm/mlxVlmRawLogBuffer';

export type { MlxVlmLogLine } from '@/utils/llm/mlxVlmRawLogBuffer';

export const MLX_VLM_SERVER_LOG_CHANGED_EVENT = 's3haim-mlx-vlm-server-log-changed';

const buffer = new MlxVlmRawLogBuffer();

export function getMlxVlmServerLogLines(): readonly import('@/utils/llm/mlxVlmRawLogBuffer').MlxVlmLogLine[] {
  return buffer.getLines();
}

export function getMlxVlmServerLogText(): string {
  return buffer.joinText();
}

export function resetMlxVlmServerLog(): void {
  buffer.reset();
}

export function clearMlxVlmServerLog(): void {
  resetMlxVlmServerLog();
  notifyMlxVlmServerLogChanged();
}

export function appendMlxVlmServerLogText(chunk: string): string {
  buffer.append(chunk);
  return getMlxVlmServerLogText();
}

export function notifyMlxVlmServerLogChanged(): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(MLX_VLM_SERVER_LOG_CHANGED_EVENT));
}

export function appendMlxVlmServerLog(chunk: string): void {
  appendMlxVlmServerLogText(chunk);
  notifyMlxVlmServerLogChanged();
}

export function subscribeMlxVlmServerLog(onChange: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener(MLX_VLM_SERVER_LOG_CHANGED_EVENT, onChange);
  return () => window.removeEventListener(MLX_VLM_SERVER_LOG_CHANGED_EVENT, onChange);
}
