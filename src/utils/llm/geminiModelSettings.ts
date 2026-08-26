const LOCAL_STORAGE_KEY = 's3haim_gemini_last_used_model';
const LEGACY_STORAGE_KEY = 's3haim_gemini_model';

export const DEFAULT_GEMINI_MODEL = 'gemini-2.0-flash';

/** @type {{ id: string, displayName: string }[]} */
export const FALLBACK_GEMINI_MODELS = [
  { id: 'gemini-2.0-flash', displayName: 'Gemini 2.0 Flash' },
  { id: 'gemini-2.5-flash', displayName: 'Gemini 2.5 Flash' },
  { id: 'gemini-2.5-pro', displayName: 'Gemini 2.5 Pro' },
];

function readStoredModelId() {
  if (typeof window === 'undefined') return '';
  try {
    const current = window.localStorage.getItem(LOCAL_STORAGE_KEY)?.trim();
    if (current) return current;
    const legacy = window.localStorage.getItem(LEGACY_STORAGE_KEY)?.trim();
    if (legacy) {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, legacy);
      window.localStorage.removeItem(LEGACY_STORAGE_KEY);
      return legacy;
    }
    return '';
  } catch {
    return '';
  }
}

function normalizeModelId(modelId: any) {
  const trimmed = String(modelId || '').trim();
  if (!trimmed || trimmed === 'gemini-2.0-flash-lite') {
    return DEFAULT_GEMINI_MODEL;
  }
  return trimmed;
}

/** @returns {string} */
export function loadLastUsedGeminiModel() {
  const stored = readStoredModelId();
  return normalizeModelId(stored || DEFAULT_GEMINI_MODEL);
}

/** @param {string} modelId */
export function saveLastUsedGeminiModel(modelId: any) {
  if (typeof window === 'undefined') return;
  const normalized = normalizeModelId(modelId);
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, normalized);
    window.localStorage.removeItem(LEGACY_STORAGE_KEY);
  } catch {
    // ignore
  }
}

/** @deprecated use loadLastUsedGeminiModel */
export const loadGeminiModel = loadLastUsedGeminiModel;

/** @deprecated use saveLastUsedGeminiModel */
export const saveGeminiModel = saveLastUsedGeminiModel;
