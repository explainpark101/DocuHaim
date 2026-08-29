import type { QuizFileConfig } from '@/utils/quiz/quizTypes';

export const QUIZ_CONFIG_DEFAULT: QuizFileConfig = {
  choiceCount: 4,
  sourcePaths: [],
};

export const CHOICE_COUNT_MIN = 2;
export const CHOICE_COUNT_MAX = 10;

const QUIZ_CONFIG_COMMENT_RE = /<!--\s*quiz-config\s*([\s\S]*?)-->/i;

function unescapeJsonFromComment(raw: string): string {
  return String(raw || '').replace(/\\u002d\\u002d/gi, '--');
}

export function escapeJsonForComment(json: string): string {
  return String(json || '').replace(/--/g, '\\u002d\\u002d');
}

export function clampChoiceCount(value: unknown): number {
  const n = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(n)) return QUIZ_CONFIG_DEFAULT.choiceCount;
  return Math.min(CHOICE_COUNT_MAX, Math.max(CHOICE_COUNT_MIN, Math.round(n)));
}

export function normalizeSourcePaths(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  const out: string[] = [];
  const seen = new Set<string>();
  for (const item of raw) {
    const p = String(item || '')
      .trim()
      .replace(/\\/g, '/')
      .replace(/^\/+/, '');
    if (!p || seen.has(p)) continue;
    seen.add(p);
    out.push(p);
  }
  return out;
}

export function normalizeQuizFileConfig(
  raw: Partial<QuizFileConfig> | null | undefined,
): QuizFileConfig {
  return {
    choiceCount: clampChoiceCount(raw?.choiceCount),
    sourcePaths: normalizeSourcePaths(raw?.sourcePaths),
  };
}

export type ParseQuizConfigResult = {
  config: QuizFileConfig;
  body: string;
  hadComment: boolean;
};

/** Strip leading `<!-- quiz-config … -->` and return normalized config + body. */
export function parseQuizConfigComment(markdown: string): ParseQuizConfigResult {
  const src = String(markdown || '');
  const match = src.match(QUIZ_CONFIG_COMMENT_RE);
  if (!match || match.index == null) {
    return {
      config: { ...QUIZ_CONFIG_DEFAULT, sourcePaths: [] },
      body: src,
      hadComment: false,
    };
  }

  // Only accept when comment is near the start (leading meta region).
  const before = src.slice(0, match.index).replace(/^\uFEFF/, '').trim();
  if (before.length > 0) {
    return {
      config: { ...QUIZ_CONFIG_DEFAULT, sourcePaths: [] },
      body: src,
      hadComment: false,
    };
  }

  let parsed: Partial<QuizFileConfig> = {};
  try {
    const json = unescapeJsonFromComment(match[1] || '').trim();
    const obj = JSON.parse(json) as unknown;
    if (obj && typeof obj === 'object') {
      parsed = obj as Partial<QuizFileConfig>;
    }
  } catch {
    // invalid JSON → defaults
  }

  const body = `${src.slice(0, match.index)}${src.slice(match.index + match[0].length)}`.replace(
    /^\s*\n/,
    '',
  );

  return {
    config: normalizeQuizFileConfig(parsed),
    body,
    hadComment: true,
  };
}

export function serializeQuizConfigComment(config: QuizFileConfig): string {
  const normalized = normalizeQuizFileConfig(config);
  const payload: QuizFileConfig = {
    choiceCount: normalized.choiceCount,
    sourcePaths: normalized.sourcePaths,
  };
  const json = JSON.stringify(payload);
  return `<!-- quiz-config ${escapeJsonForComment(json)} -->`;
}
