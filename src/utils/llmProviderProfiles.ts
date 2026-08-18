import { DEFAULT_GEMINI_MODEL, loadLastUsedGeminiModel } from '@/utils/geminiModelSettings';
import {
  loadLastUsedOpenAiCompatibleModel,
  normalizeOpenAiCompatibleBaseUrl,
} from '@/utils/openaiCompatibleSettings';

export const LLM_PROVIDER_GEMINI = 'gemini';
export const LLM_PROVIDER_OPENAI_COMPATIBLE = 'openai-compatible';

export type LlmProviderKind =
  | typeof LLM_PROVIDER_GEMINI
  | typeof LLM_PROVIDER_OPENAI_COMPATIBLE;

export type LlmProviderProfile = {
  id: string;
  name: string;
  kind: LlmProviderKind;
  /** OpenAI-compatible base URL (including /v1). */
  baseUrl: string;
  apiKey: string;
};

const LAST_PROFILE_KEY = 's3haim_llm_last_profile_id';
const PROFILE_MODELS_KEY = 's3haim_llm_profile_models';
const LEGACY_PROVIDER_KIND_KEY = 's3haim_llm_provider';

export const LLM_LAST_PROFILE_CHANGED_EVENT = 's3haim-llm-last-profile-changed';

export const LEGACY_GEMINI_PROFILE_ID = 'legacy-gemini';
export const LEGACY_OPENAI_COMPAT_PROFILE_ID = 'legacy-openai-compat';

export function isLlmProviderKind(value: string): value is LlmProviderKind {
  return value === LLM_PROVIDER_GEMINI || value === LLM_PROVIDER_OPENAI_COMPATIBLE;
}

export function createLlmProviderProfileId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `llm-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

export function normalizeLlmProviderProfile(raw: unknown): LlmProviderProfile | null {
  const rec = asRecord(raw);
  if (!rec) return null;
  const id = typeof rec.id === 'string' ? rec.id.trim() : '';
  if (!id) return null;
  const kindRaw = typeof rec.kind === 'string' ? rec.kind : typeof rec.type === 'string' ? rec.type : '';
  const kind = isLlmProviderKind(kindRaw) ? kindRaw : LLM_PROVIDER_OPENAI_COMPATIBLE;
  const name =
    (typeof rec.name === 'string' && rec.name.trim()) ||
    (kind === LLM_PROVIDER_GEMINI ? 'Google Gemini' : 'OpenAI 호환');
  const baseUrl =
    kind === LLM_PROVIDER_OPENAI_COMPATIBLE
      ? String(rec.baseUrl || rec.endpoint || '').trim()
      : '';
  const apiKey = typeof rec.apiKey === 'string' ? rec.apiKey : '';
  return { id, name, kind, baseUrl, apiKey };
}

export function normalizeLlmProviderProfiles(raw: unknown): LlmProviderProfile[] {
  if (!Array.isArray(raw)) return [];
  const out: LlmProviderProfile[] = [];
  const seen = new Set<string>();
  for (const item of raw) {
    const profile = normalizeLlmProviderProfile(item);
    if (!profile || seen.has(profile.id)) continue;
    seen.add(profile.id);
    out.push(profile);
  }
  return out;
}

type LlmCredsLike = {
  llmProviderProfiles?: unknown;
  googleAiStudioApiKey?: unknown;
  openaiCompatibleBaseUrl?: unknown;
  openaiCompatibleApiKey?: unknown;
} | null | undefined;

function migrateLegacyLlmProviderProfiles(creds: LlmCredsLike): LlmProviderProfile[] {
  const profiles: LlmProviderProfile[] = [];
  const geminiKey = String(creds?.googleAiStudioApiKey || '').trim();
  if (geminiKey) {
    profiles.push({
      id: LEGACY_GEMINI_PROFILE_ID,
      name: 'Google Gemini',
      kind: LLM_PROVIDER_GEMINI,
      baseUrl: '',
      apiKey: geminiKey,
    });
  }
  const openaiUrl = String(creds?.openaiCompatibleBaseUrl || '').trim();
  const openaiKey = String(creds?.openaiCompatibleApiKey || '').trim();
  if (openaiUrl || openaiKey) {
    profiles.push({
      id: LEGACY_OPENAI_COMPAT_PROFILE_ID,
      name: 'OpenAI 호환',
      kind: LLM_PROVIDER_OPENAI_COMPATIBLE,
      baseUrl: openaiUrl,
      apiKey: openaiKey,
    });
  }
  return profiles;
}

/** Prefer stored profiles; otherwise build from legacy singleton Gemini/OpenAI fields. */
export function resolveLlmProviderProfiles(creds: LlmCredsLike): LlmProviderProfile[] {
  if (Array.isArray(creds?.llmProviderProfiles)) {
    return normalizeLlmProviderProfiles(creds.llmProviderProfiles);
  }
  return migrateLegacyLlmProviderProfiles(creds);
}

export function syncLegacyLlmCredsFromProfiles(profiles: LlmProviderProfile[]): {
  googleAiStudioApiKey: string;
  openaiCompatibleBaseUrl: string;
  openaiCompatibleApiKey: string;
} {
  const gemini = profiles.find((p) => p.kind === LLM_PROVIDER_GEMINI);
  const openai = profiles.find((p) => p.kind === LLM_PROVIDER_OPENAI_COMPATIBLE);
  return {
    googleAiStudioApiKey: gemini?.apiKey || '',
    openaiCompatibleBaseUrl: openai?.baseUrl || '',
    openaiCompatibleApiKey: openai?.apiKey || '',
  };
}

export function resolveSelectedLlmProfile(
  profiles: LlmProviderProfile[],
  selectedId: string,
): LlmProviderProfile | null {
  if (!profiles.length) return null;
  const id = String(selectedId || '').trim();
  return profiles.find((p) => p.id === id) ?? profiles[0] ?? null;
}

export function loadLastLlmProfileId(): string {
  if (typeof window === 'undefined') return '';
  try {
    const current = window.localStorage.getItem(LAST_PROFILE_KEY)?.trim() ?? '';
    if (current) return current;
    const legacyKind = window.localStorage.getItem(LEGACY_PROVIDER_KIND_KEY)?.trim() ?? '';
    if (legacyKind === LLM_PROVIDER_OPENAI_COMPATIBLE) return LEGACY_OPENAI_COMPAT_PROFILE_ID;
    if (legacyKind === LLM_PROVIDER_GEMINI) return LEGACY_GEMINI_PROFILE_ID;
    return '';
  } catch {
    return '';
  }
}

export function saveLastLlmProfileId(profileId: string): void {
  if (typeof window === 'undefined') return;
  const next = String(profileId || '').trim();
  try {
    if (!next) {
      window.localStorage.removeItem(LAST_PROFILE_KEY);
    } else {
      window.localStorage.setItem(LAST_PROFILE_KEY, next);
    }
    window.dispatchEvent(
      new CustomEvent(LLM_LAST_PROFILE_CHANGED_EVENT, { detail: { profileId: next } }),
    );
  } catch {
    // ignore
  }
}

function readProfileModelMap(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(PROFILE_MODELS_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    const rec = asRecord(parsed);
    if (!rec) return {};
    const out: Record<string, string> = {};
    for (const [key, value] of Object.entries(rec)) {
      if (typeof value === 'string' && value.trim()) out[key] = value.trim();
    }
    return out;
  } catch {
    return {};
  }
}

export function loadLastUsedModelForProfile(
  profileId: string,
  kind: LlmProviderKind,
): string {
  const id = String(profileId || '').trim();
  if (id) {
    const stored = readProfileModelMap()[id];
    if (stored) return stored;
  }
  if (kind === LLM_PROVIDER_GEMINI) return loadLastUsedGeminiModel();
  return loadLastUsedOpenAiCompatibleModel();
}

export function saveLastUsedModelForProfile(profileId: string, modelId: string): void {
  if (typeof window === 'undefined') return;
  const id = String(profileId || '').trim();
  if (!id) return;
  const nextModel = String(modelId || '').trim();
  try {
    const map = readProfileModelMap();
    if (!nextModel) delete map[id];
    else map[id] = nextModel;
    window.localStorage.setItem(PROFILE_MODELS_KEY, JSON.stringify(map));
  } catch {
    // ignore
  }
}

export function defaultModelForKind(kind: LlmProviderKind): string {
  return kind === LLM_PROVIDER_GEMINI ? DEFAULT_GEMINI_MODEL : '';
}

export function validateLlmProviderProfileDraft(draft: {
  name: string;
  kind: LlmProviderKind;
  baseUrl: string;
  apiKey: string;
  hasStoredKey?: boolean;
}): string | null {
  const name = String(draft.name || '').trim();
  if (!name) return '제공자 이름을 입력하세요.';
  if (draft.kind === LLM_PROVIDER_GEMINI) {
    if (!String(draft.apiKey || '').trim() && !draft.hasStoredKey) {
      return 'Gemini API 키를 입력하세요.';
    }
    return null;
  }
  const url = normalizeOpenAiCompatibleBaseUrl(draft.baseUrl);
  if (!url) {
    return 'Endpoint URL을 입력하세요. 예: https://api.openai.com/v1';
  }
  return null;
}
