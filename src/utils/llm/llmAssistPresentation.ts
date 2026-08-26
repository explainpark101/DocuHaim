const PRESENTATION_KEY = 's3haim-llm-assist-presentation';

export type LlmAssistPresentation = 'floating' | 'docked';

export function loadLlmAssistPresentation(): LlmAssistPresentation {
  try {
    const raw = localStorage.getItem(PRESENTATION_KEY);
    if (raw === 'docked' || raw === 'floating') return raw;
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
