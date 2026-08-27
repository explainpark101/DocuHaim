/**
 * Advanced generation options for LLM Assist (OpenAI-compatible + Gemini).
 * Suggested keys come from `src/components/llm/llmRequest.ts`; arbitrary keys are allowed.
 */

export const LLM_ASSIST_DEFAULT_REQUEST_OPTIONS: Record<string, unknown> = {
  temperature: 0.4,
};

/** Keys managed by the assist clients — never take from user advanced options. */
export const LLM_ASSIST_RESERVED_REQUEST_OPTION_KEYS = new Set([
  'model',
  'messages',
  'stream',
  'stream_options',
  'systemInstruction',
  'system_instruction',
  'contents',
  'config',
]);

/**
 * Suggested option keys (dropdown). Includes llmRequest sampling/length fields
 * plus common local-inference extras (e.g. typical_p).
 */
export const LLM_ASSIST_SUGGESTED_REQUEST_OPTION_KEYS = [
  'temperature',
  'top_p',
  'top_k',
  'min_p',
  'typical_p',
  'max_tokens',
  'max_completion_tokens',
  'n',
  'frequency_penalty',
  'presence_penalty',
  'repetition_penalty',
  'seed',
  'min_tokens',
  'stop',
  'stop_token_ids',
  'ignore_eos',
  'logprobs',
  'top_logprobs',
  'prompt_logprobs',
  'verbosity',
  'reasoning_effort',
  'thinking_token_budget',
  'include_reasoning',
  'use_beam_search',
  'length_penalty',
  'response_format',
  'user',
  'truncate_prompt_tokens',
  'truncation_side',
  'skip_special_tokens',
  'echo',
] as const;

export type LlmAssistRequestOptionEntry = {
  id: string;
  key: string;
  /** Raw text from the value field; parsed when building the options object. */
  valueText: string;
};

function newEntryId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function createDefaultRequestOptionEntries(): LlmAssistRequestOptionEntry[] {
  return [
    {
      id: newEntryId(),
      key: 'temperature',
      valueText: '0.4',
    },
  ];
}

export function createEmptyRequestOptionEntry(
  key = '',
): LlmAssistRequestOptionEntry {
  return { id: newEntryId(), key, valueText: '' };
}

/** Parse a single value cell: JSON if possible, else plain string. */
export function parseRequestOptionValueText(valueText: string): unknown {
  const trimmed = valueText.trim();
  if (!trimmed) return '';
  try {
    return JSON.parse(trimmed) as unknown;
  } catch {
    return valueText;
  }
}

export function formatRequestOptionValueText(value: unknown): string {
  if (typeof value === 'string') {
    // Prefer raw string unless it looks like structured JSON was intended.
    try {
      const parsed = JSON.parse(value) as unknown;
      if (typeof parsed === 'string') return JSON.stringify(parsed);
    } catch {
      // keep as-is
    }
    return value;
  }
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

export function requestOptionsFromEntries(
  entries: LlmAssistRequestOptionEntry[],
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const entry of entries) {
    const key = entry.key.trim();
    if (!key || LLM_ASSIST_RESERVED_REQUEST_OPTION_KEYS.has(key)) continue;
    out[key] = parseRequestOptionValueText(entry.valueText);
  }
  return out;
}

export function entriesFromRequestOptions(
  options: Record<string, unknown> | null | undefined,
): LlmAssistRequestOptionEntry[] {
  if (!options || typeof options !== 'object' || Array.isArray(options)) {
    return createDefaultRequestOptionEntries();
  }
  const entries = Object.entries(options)
    .filter(([key]) => key.trim() && !LLM_ASSIST_RESERVED_REQUEST_OPTION_KEYS.has(key))
    .map(([key, value]) => ({
      id: newEntryId(),
      key,
      valueText: formatRequestOptionValueText(value),
    }));
  return entries.length ? entries : createDefaultRequestOptionEntries();
}

export function normalizeRequestOptions(
  value: unknown,
): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return { ...LLM_ASSIST_DEFAULT_REQUEST_OPTIONS };
  }
  const out: Record<string, unknown> = {};
  for (const [key, v] of Object.entries(value as Record<string, unknown>)) {
    const k = key.trim();
    if (!k || LLM_ASSIST_RESERVED_REQUEST_OPTION_KEYS.has(k)) continue;
    out[k] = v;
  }
  return Object.keys(out).length ? out : { ...LLM_ASSIST_DEFAULT_REQUEST_OPTIONS };
}

export function requestOptionsToJsonText(options: Record<string, unknown>): string {
  try {
    return `${JSON.stringify(options, null, 2)}\n`;
  } catch {
    return '{\n  "temperature": 0.4\n}\n';
  }
}

export function parseRequestOptionsJsonText(text: string): {
  ok: true;
  options: Record<string, unknown>;
} | {
  ok: false;
  error: string;
} {
  const trimmed = text.trim();
  if (!trimmed) {
    return { ok: true, options: { ...LLM_ASSIST_DEFAULT_REQUEST_OPTIONS } };
  }
  try {
    const parsed = JSON.parse(trimmed) as unknown;
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return { ok: false, error: 'JSON must be an object of key/value pairs.' };
    }
    return { ok: true, options: normalizeRequestOptions(parsed) };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'Invalid JSON',
    };
  }
}

/** Strip reserved keys before merging into an OpenAI-compatible request body. */
export function toOpenAiCompatibleRequestExtras(
  options: Record<string, unknown> | null | undefined,
): Record<string, unknown> {
  const src = normalizeRequestOptions(options);
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(src)) {
    if (LLM_ASSIST_RESERVED_REQUEST_OPTION_KEYS.has(key)) continue;
    out[key] = value;
  }
  return out;
}

/** Map OpenAI-compatible assist options into mlx_vlm stream_generate kwargs. */
const MLX_VLM_GENERATE_OPTION_ALIASES: Record<string, string> = {
  max_completion_tokens: 'max_tokens',
  thinking_token_budget: 'thinking_budget',
  include_reasoning: 'enable_thinking',
};

const MLX_VLM_GENERATE_KWARG_KEYS = new Set([
  'max_tokens',
  'temperature',
  'top_p',
  'min_p',
  'top_k',
  'typical_p',
  'repetition_penalty',
  'repetition_context_size',
  'logit_bias',
  'max_kv_size',
  'kv_bits',
  'kv_group_size',
  'kv_quant_scheme',
  'quantized_kv_start',
  'prefill_step_size',
  'skip_special_tokens',
  'thinking_budget',
  'thinking_end_token',
  'thinking_start_token',
  'enable_thinking',
  'verbose',
  'seed',
]);

const MLX_VLM_GENERATE_DEFAULTS: Record<string, unknown> = {
  max_tokens: 512,
  temperature: 0.4,
  top_p: 1.0,
  min_p: 0.0,
};

export function toMlxVlmGenerateKwargs(
  options: Record<string, unknown> | null | undefined,
): Record<string, unknown> {
  const extras = toOpenAiCompatibleRequestExtras(options);
  const out: Record<string, unknown> = { ...MLX_VLM_GENERATE_DEFAULTS };

  for (const [key, value] of Object.entries(extras)) {
    if (value === undefined) continue;
    const mapped = MLX_VLM_GENERATE_OPTION_ALIASES[key] ?? key;
    if (MLX_VLM_GENERATE_KWARG_KEYS.has(mapped)) {
      out[mapped] = value;
    }
  }

  return out;
}

const GEMINI_OPTION_KEY_MAP: Record<string, string> = {
  temperature: 'temperature',
  top_p: 'topP',
  topP: 'topP',
  top_k: 'topK',
  topK: 'topK',
  max_tokens: 'maxOutputTokens',
  max_completion_tokens: 'maxOutputTokens',
  maxOutputTokens: 'maxOutputTokens',
  stop: 'stopSequences',
  stopSequences: 'stopSequences',
  seed: 'seed',
  n: 'candidateCount',
  candidateCount: 'candidateCount',
  presence_penalty: 'presencePenalty',
  presencePenalty: 'presencePenalty',
  frequency_penalty: 'frequencyPenalty',
  frequencyPenalty: 'frequencyPenalty',
  response_mime_type: 'responseMimeType',
  responseMimeType: 'responseMimeType',
};

/**
 * Map assist options into Gemini `GenerateContentConfig` fields.
 * Known aliases are remapped; other keys are passed through as-is
 * (provider may ignore unsupported ones).
 */
export function toGeminiGenerationConfig(
  options: Record<string, unknown> | null | undefined,
): Record<string, unknown> {
  const src = normalizeRequestOptions(options);
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(src)) {
    if (LLM_ASSIST_RESERVED_REQUEST_OPTION_KEYS.has(key)) continue;
    const mapped = GEMINI_OPTION_KEY_MAP[key] ?? key;
    out[mapped] = value;
  }
  return out;
}
