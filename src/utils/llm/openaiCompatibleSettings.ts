const LOCAL_STORAGE_KEY = 's3haim_openai_compatible_last_used_model';

export function loadLastUsedOpenAiCompatibleModel(): string {
  if (typeof window === 'undefined') return '';
  try {
    return window.localStorage.getItem(LOCAL_STORAGE_KEY)?.trim() || '';
  } catch {
    return '';
  }
}

export function saveLastUsedOpenAiCompatibleModel(modelId: string): void {
  if (typeof window === 'undefined') return;
  const normalized = String(modelId || '').trim();
  try {
    if (!normalized) {
      window.localStorage.removeItem(LOCAL_STORAGE_KEY);
      return;
    }
    window.localStorage.setItem(LOCAL_STORAGE_KEY, normalized);
  } catch {
    // ignore
  }
}

/** Strip trailing slashes. Returns '' when empty or not http(s). */
export function normalizeOpenAiCompatibleBaseUrl(raw: string): string {
  const trimmed = String(raw || '').trim();
  if (!trimmed) return '';
  try {
    const url = new URL(trimmed);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return '';
  } catch {
    return '';
  }
  return trimmed.replace(/\/+$/, '');
}
