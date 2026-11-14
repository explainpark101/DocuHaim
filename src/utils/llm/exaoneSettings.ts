/** Official EXAONE API Platform base (OpenAI-compatible, Bearer auth). */
export const EXAONE_API_BASE_URL = 'https://api.exaone.ai/v1';

/** Documented model id for K-EXAONE 2.5 chat. */
export const DEFAULT_EXAONE_MODEL = 'k-exaone_v2.5';

/** Pseudo model ids for EXAONE Tabular tasks (not OpenAI chat models). */
export const EXAONE_TABULAR_CLASSIFICATION_MODEL = 'exaone-tabular-classification';
export const EXAONE_TABULAR_REGRESSION_MODEL = 'exaone-tabular-regression';

export type ExaoneModelOption = {
  id: string;
  displayName: string;
};

export type ExaoneTabularTask = 'classification' | 'regression';

export type ExaoneTabularClassificationOutput = 'class' | 'probability';
export type ExaoneTabularRegressionOutput = 'point' | 'full';

export const KNOWN_EXAONE_CHAT_MODELS: ExaoneModelOption[] = [
  { id: DEFAULT_EXAONE_MODEL, displayName: 'K-EXAONE 2.5' },
];

export const KNOWN_EXAONE_TABULAR_MODELS: ExaoneModelOption[] = [
  {
    id: EXAONE_TABULAR_CLASSIFICATION_MODEL,
    displayName: 'EXAONE Tabular · Classification',
  },
  {
    id: EXAONE_TABULAR_REGRESSION_MODEL,
    displayName: 'EXAONE Tabular · Regression',
  },
];

/** Chat + Tabular catalog shown in the EXAONE model picker. */
export const KNOWN_EXAONE_MODELS: ExaoneModelOption[] = [
  ...KNOWN_EXAONE_CHAT_MODELS,
  ...KNOWN_EXAONE_TABULAR_MODELS,
];

export function isExaoneTabularModelId(modelId: string): boolean {
  const id = String(modelId || '').trim();
  return (
    id === EXAONE_TABULAR_CLASSIFICATION_MODEL || id === EXAONE_TABULAR_REGRESSION_MODEL
  );
}

export function resolveExaoneTabularTask(modelId: string): ExaoneTabularTask | null {
  const id = String(modelId || '').trim();
  if (id === EXAONE_TABULAR_CLASSIFICATION_MODEL) return 'classification';
  if (id === EXAONE_TABULAR_REGRESSION_MODEL) return 'regression';
  return null;
}

function isAuthFailureMessage(message: string): boolean {
  return /401|403|Unauthorized|Forbidden|API.?키|권한|인증/i.test(message);
}

/**
 * List models from EXAONE (`GET /v1/models` when available).
 * Falls back to documented known models if the list endpoint is missing/empty,
 * but still surfaces auth failures so the user can fix the API key.
 */
export async function listExaoneModels(apiKey: string): Promise<ExaoneModelOption[]> {
  const key = String(apiKey || '').trim();
  if (!key) {
    throw new Error('EXAONE API 키를 입력하세요.');
  }

  const { listOpenAiCompatibleModels } = await import('@/utils/llm/openaiCompatibleClient');

  try {
    const list = await listOpenAiCompatibleModels(EXAONE_API_BASE_URL, key);
    if (list.length) {
      const knownIds = new Set(KNOWN_EXAONE_MODELS.map((m) => m.id));
      const extras = KNOWN_EXAONE_MODELS.filter((m) => !list.some((x) => x.id === m.id));
      const merged = [...list, ...extras];
      return merged.sort((a, b) => {
        const aKnown = knownIds.has(a.id) ? 0 : 1;
        const bKnown = knownIds.has(b.id) ? 0 : 1;
        if (aKnown !== bKnown) return aKnown - bKnown;
        return a.displayName.localeCompare(b.displayName, 'ko');
      });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err || '');
    if (isAuthFailureMessage(message)) throw err;
    // Models list may be unavailable; use documented catalog.
  }

  return [...KNOWN_EXAONE_MODELS];
}
