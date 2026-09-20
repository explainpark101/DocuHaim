const PRESENTATION_KEY = 's3haim-llm-assist-presentation';

export type LlmAssistPresentation = 'floating' | 'docked' | 'split';

export function isLlmAssistPresentation(value: unknown): value is LlmAssistPresentation {
  return value === 'docked' || value === 'floating' || value === 'split';
}

export function loadLlmAssistPresentation(): LlmAssistPresentation {
  try {
    const raw = localStorage.getItem(PRESENTATION_KEY);
    if (isLlmAssistPresentation(raw)) return raw;
  } catch {
    // ignore
  }
  return 'floating';
}

export function saveLlmAssistPresentation(value: LlmAssistPresentation): void {
  try {
    localStorage.setItem(PRESENTATION_KEY, value);
  } catch {
    // ignore
  }
}
