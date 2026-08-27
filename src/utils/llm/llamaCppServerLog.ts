import { MlxVlmRawLogBuffer } from '@/utils/llm/mlxVlmRawLogBuffer';

export type LlamaCppLogLine = {
  id: number;
  text: string;
};

export const LLAMA_CPP_SERVER_LOG_CHANGED_EVENT = 's3haim-llama-cpp-server-log-changed';

const buffer = new MlxVlmRawLogBuffer();

export function getLlamaCppServerLogLines(): readonly LlamaCppLogLine[] {
  return buffer.getLines();
}

export function getLlamaCppServerLogText(): string {
  return buffer.joinText();
}

export function resetLlamaCppServerLog(): void {
  buffer.reset();
}

export function clearLlamaCppServerLog(): void {
  resetLlamaCppServerLog();
  notifyLlamaCppServerLogChanged();
}

export function notifyLlamaCppServerLogChanged(): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(LLAMA_CPP_SERVER_LOG_CHANGED_EVENT));
}

export function appendLlamaCppServerLog(chunk: string): void {
  buffer.append(chunk);
  notifyLlamaCppServerLogChanged();
}

export function subscribeLlamaCppServerLog(onChange: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener(LLAMA_CPP_SERVER_LOG_CHANGED_EVENT, onChange);
  return () => window.removeEventListener(LLAMA_CPP_SERVER_LOG_CHANGED_EVENT, onChange);
}
