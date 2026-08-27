export type LocalLlmModelAliasScope = 'mlx-vlm' | 'llama-cpp';

type AliasStore = Record<LocalLlmModelAliasScope, Record<string, string>>;

const STORAGE_KEY = 's3haim_local_llm_model_aliases';

export const LOCAL_LLM_MODEL_ALIASES_CHANGED_EVENT = 's3haim-local-llm-model-aliases-changed';

function emptyStore(): AliasStore {
  return { 'mlx-vlm': {}, 'llama-cpp': {} };
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function normalizeScopeMap(raw: unknown): Record<string, string> {
  const rec = asRecord(raw);
  if (!rec) return {};
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(rec)) {
    const id = String(key || '').trim();
    if (!id) continue;
    const alias = typeof value === 'string' ? value.trim() : '';
    if (!alias) continue;
    out[id] = alias;
  }
  return out;
}

export function normalizeLocalLlmModelAliasStore(raw: unknown): AliasStore {
  const rec = asRecord(raw);
  if (!rec) return emptyStore();
  return {
    'mlx-vlm': normalizeScopeMap(rec['mlx-vlm']),
    'llama-cpp': normalizeScopeMap(rec['llama-cpp']),
  };
}

export function loadLocalLlmModelAliasStore(): AliasStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyStore();
    return normalizeLocalLlmModelAliasStore(JSON.parse(raw) as unknown);
  } catch {
    return emptyStore();
  }
}

function saveStore(store: AliasStore): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  window.dispatchEvent(new CustomEvent(LOCAL_LLM_MODEL_ALIASES_CHANGED_EVENT));
}

export function getLocalLlmModelAlias(
  scope: LocalLlmModelAliasScope,
  modelId: string,
): string {
  const id = String(modelId || '').trim();
  if (!id) return '';
  return loadLocalLlmModelAliasStore()[scope][id] || '';
}

export function setLocalLlmModelAlias(
  scope: LocalLlmModelAliasScope,
  modelId: string,
  alias: string,
): void {
  const id = String(modelId || '').trim();
  if (!id) return;
  const nextAlias = String(alias || '').trim();
  const store = loadLocalLlmModelAliasStore();
  const scopeMap = { ...store[scope] };
  if (!nextAlias) {
    delete scopeMap[id];
  } else {
    scopeMap[id] = nextAlias;
  }
  saveStore({ ...store, [scope]: scopeMap });
}

/** Label for dropdowns: alias when set, otherwise the model id. */
export function localLlmModelDisplayName(
  scope: LocalLlmModelAliasScope,
  modelId: string,
): string {
  const id = String(modelId || '').trim();
  if (!id) return '';
  const alias = getLocalLlmModelAlias(scope, id);
  return alias || id;
}

export function withLocalLlmModelAliases<T extends { id: string; displayName: string }>(
  scope: LocalLlmModelAliasScope,
  options: readonly T[],
): T[] {
  return options.map((option) => {
    const id = String(option.id || '').trim();
    if (!id) return option;
    return {
      ...option,
      displayName: localLlmModelDisplayName(scope, id),
    };
  });
}
