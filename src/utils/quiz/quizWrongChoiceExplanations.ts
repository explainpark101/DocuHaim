import type { QuizWrongChoiceExplanations } from '@/utils/quiz/quizTypes';

export type { QuizWrongChoiceExplanations };

export function wrongChoiceExplanationKey(questionId: string, option: number): string {
  return `${questionId}_${option}`;
}

/** Used when the user generates analysis without a custom question. */
export const DEFAULT_CORRECT_CHOICE_ANALYSIS_INSTRUCTIONS =
  '이 보기가 정답인 이유와 나머지 보기가 오답인 이유를 명확히 설명해 주세요.';

export const DEFAULT_WRONG_CHOICE_ANALYSIS_INSTRUCTIONS =
  '이 보기가 오답인 이유와 정답 보기와의 차이를 명확히 설명해 주세요.';

export function resolveChoiceAnalysisUserInstructions(
  raw: string,
  isCorrectOption: boolean,
): string {
  const trimmed = String(raw || '').trim();
  if (trimmed) return trimmed;
  return isCorrectOption
    ? DEFAULT_CORRECT_CHOICE_ANALYSIS_INSTRUCTIONS
    : DEFAULT_WRONG_CHOICE_ANALYSIS_INSTRUCTIONS;
}

export function flatWrongChoiceExplanations(
  nested: QuizWrongChoiceExplanations | null | undefined,
): Record<string, string> {
  const out: Record<string, string> = {};
  if (!nested || typeof nested !== 'object') return out;
  for (const [questionId, byOption] of Object.entries(nested)) {
    if (!byOption || typeof byOption !== 'object') continue;
    for (const [opt, text] of Object.entries(byOption)) {
      const trimmed = String(text || '').trim();
      if (!trimmed) continue;
      const n = Number.parseInt(opt, 10);
      if (!Number.isFinite(n) || n < 1) continue;
      out[wrongChoiceExplanationKey(questionId, n)] = String(text);
    }
  }
  return out;
}

export function nestWrongChoiceExplanations(
  flat: Record<string, string> | null | undefined,
): QuizWrongChoiceExplanations {
  const out: QuizWrongChoiceExplanations = {};
  if (!flat || typeof flat !== 'object') return out;
  for (const [key, text] of Object.entries(flat)) {
    const trimmed = String(text || '').trim();
    if (!trimmed) continue;
    const sep = key.lastIndexOf('_');
    if (sep <= 0) continue;
    const questionId = key.slice(0, sep);
    const option = Number.parseInt(key.slice(sep + 1), 10);
    if (!questionId || !Number.isFinite(option) || option < 1) continue;
    const bucket = out[questionId] || {};
    bucket[String(option)] = String(text);
    out[questionId] = bucket;
  }
  return out;
}

export function normalizeWrongChoiceExplanations(
  raw: unknown,
  questionIds?: ReadonlySet<string>,
): QuizWrongChoiceExplanations {
  if (!raw || typeof raw !== 'object') return {};
  const out: QuizWrongChoiceExplanations = {};
  for (const [questionId, byOption] of Object.entries(raw as Record<string, unknown>)) {
    const qid = String(questionId || '').trim();
    if (!qid || (questionIds && !questionIds.has(qid))) continue;
    if (!byOption || typeof byOption !== 'object') continue;
    const bucket: Record<string, string> = {};
    for (const [opt, text] of Object.entries(byOption as Record<string, unknown>)) {
      const n = Number.parseInt(String(opt), 10);
      if (!Number.isFinite(n) || n < 1) continue;
      const value = String(text || '').trim();
      if (!value) continue;
      bucket[String(n)] = value;
    }
    if (Object.keys(bucket).length > 0) out[qid] = bucket;
  }
  return out;
}

export function isWrongChoiceExplanationsEmpty(
  value: QuizWrongChoiceExplanations | null | undefined,
): boolean {
  return Object.keys(value || {}).length === 0;
}

export function filterWrongChoiceExplanations(
  value: QuizWrongChoiceExplanations,
  questionIds: ReadonlySet<string> | readonly string[],
  optionCountByQuestion?: ReadonlyMap<string, number>,
): QuizWrongChoiceExplanations {
  const ids = questionIds instanceof Set ? questionIds : new Set(questionIds);
  const out: QuizWrongChoiceExplanations = {};
  for (const [questionId, byOption] of Object.entries(value)) {
    if (!ids.has(questionId)) continue;
    const maxOpt = optionCountByQuestion?.get(questionId);
    const bucket: Record<string, string> = {};
    for (const [opt, text] of Object.entries(byOption)) {
      const n = Number.parseInt(opt, 10);
      if (!Number.isFinite(n) || n < 1) continue;
      if (maxOpt != null && n > maxOpt) continue;
      const trimmed = String(text || '').trim();
      if (!trimmed) continue;
      bucket[String(n)] = trimmed;
    }
    if (Object.keys(bucket).length > 0) out[questionId] = bucket;
  }
  return out;
}
