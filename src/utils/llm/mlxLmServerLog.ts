export const MLX_LM_SERVER_LOG_CHANGED_EVENT = 's3haim-mlx-lm-server-log-changed';

const MAX_LOG_CHARS = 120_000;

let logText = '';

export function getMlxLmServerLogText(): string {
  return logText;
}

export function resetMlxLmServerLog(): void {
  logText = '';
}

export function clearMlxLmServerLog(): void {
  resetMlxLmServerLog();
  notifyMlxLmServerLogChanged();
}

export function appendMlxLmServerLogText(chunk: string): string {
  const next = String(chunk || '');
  if (!next) return logText;
  logText += next;
  if (logText.length > MAX_LOG_CHARS) {
    logText = logText.slice(logText.length - MAX_LOG_CHARS);
  }
  return logText;
}

export function notifyMlxLmServerLogChanged(): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(MLX_LM_SERVER_LOG_CHANGED_EVENT));
}

export function appendMlxLmServerLog(chunk: string): void {
  appendMlxLmServerLogText(chunk);
  notifyMlxLmServerLogChanged();
}

export function subscribeMlxLmServerLog(onChange: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener(MLX_LM_SERVER_LOG_CHANGED_EVENT, onChange);
  return () => window.removeEventListener(MLX_LM_SERVER_LOG_CHANGED_EVENT, onChange);
}
