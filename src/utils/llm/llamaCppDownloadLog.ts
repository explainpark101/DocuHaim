import { MlxVlmRawLogBuffer } from '@/utils/llm/mlxVlmRawLogBuffer';

export type LlamaCppLogLine = {
  id: number;
  text: string;
};

export const LLAMA_CPP_DOWNLOAD_LOG_CHANGED_EVENT = 's3haim-llama-cpp-download-log-changed';

const buffer = new MlxVlmRawLogBuffer();

export function getLlamaCppDownloadLogLines(): readonly LlamaCppLogLine[] {
  return buffer.getLines();
}

export function getLlamaCppDownloadLogText(): string {
  return buffer.joinText();
}

export function resetLlamaCppDownloadLog(): void {
  buffer.reset();
}

export function clearLlamaCppDownloadLog(): void {
  resetLlamaCppDownloadLog();
  notifyLlamaCppDownloadLogChanged();
}

export function notifyLlamaCppDownloadLogChanged(): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(LLAMA_CPP_DOWNLOAD_LOG_CHANGED_EVENT));
}

export function appendLlamaCppDownloadLog(chunk: string): void {
  buffer.append(chunk);
  notifyLlamaCppDownloadLogChanged();
}

export function subscribeLlamaCppDownloadLog(onChange: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener(LLAMA_CPP_DOWNLOAD_LOG_CHANGED_EVENT, onChange);
  return () => window.removeEventListener(LLAMA_CPP_DOWNLOAD_LOG_CHANGED_EVENT, onChange);
}
