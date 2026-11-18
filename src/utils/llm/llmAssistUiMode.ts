const UI_MODE_KEY = 's3haim-llm-assist-ui-mode';

export type LlmAssistUiMode = 'edit' | 'chat';

export function isLlmAssistUiMode(value: unknown): value is LlmAssistUiMode {
  return value === 'edit' || value === 'chat';
}

export function loadLlmAssistUiMode(): LlmAssistUiMode {
  try {
    const raw = localStorage.getItem(UI_MODE_KEY);
    if (isLlmAssistUiMode(raw)) return raw;
  } catch {
    // ignore
  }
  return 'edit';
}

export function saveLlmAssistUiMode(value: LlmAssistUiMode): void {
  try {
    localStorage.setItem(UI_MODE_KEY, value);
  } catch {
    // ignore
  }
}
