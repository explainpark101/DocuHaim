import type { QuizWrongChoiceExplanations } from '@/utils/quiz/quizTypes';

export type { QuizWrongChoiceExplanations };

export function wrongChoiceExplanationKey(questionId: string, option: number): string {
  return `${questionId}_${option}`;
}

/** Flat `questionId_option` map → per-option markdown (`"1"`, `"2"`, …). */
export function choiceAnalysesFromFlat(
  flat: Record<string, string> | null | undefined,
  questionId: string,
): Record<string, string> {
  const out: Record<string, string> = {};
  const prefix = `${questionId}_`;
  if (!flat) return out;
  for (const [key, text] of Object.entries(flat)) {
    if (!key.startsWith(prefix)) continue;
    const opt = key.slice(prefix.length);
    if (!opt) continue;
    out[opt] = String(text ?? '');
  }
  return out;
}

/** Merge per-option analyses into a flat wrong-choice map for one question. */
export function applyChoiceAnalysesToFlat(
  flat: Record<string, string>,
  questionId: string,
  analyses: Record<string, string> | null | undefined,
): Record<string, string> {
  const next = { ...flat };
  const prefix = `${questionId}_`;
  for (const key of Object.keys(next)) {
    if (key.startsWith(prefix)) delete next[key];
  }
  if (!analyses) return next;
  for (const [opt, text] of Object.entries(analyses)) {
    const n = Number.parseInt(opt, 10);
    const trimmed = String(text || '').trim();
    if (!Number.isFinite(n) || n < 1 || !trimmed) continue;
    next[wrongChoiceExplanationKey(questionId, n)] = trimmed;
  }
  return next;
}

/** Used when the user generates analysis without a custom question. */
export const DEFAULT_CORRECT_CHOICE_ANALYSIS_INSTRUCTIONS =
  '이 보기가 정답인 이유와 나머지 보기가 오답인 이유를 명확히 설명해 주세요.';

export const DEFAULT_WRONG_CHOICE_ANALYSIS_INSTRUCTIONS =
  '이 보기가 오답인 이유와 정답 보기와의 차이를 명확히 설명해 주세요.';

export const REGENERATED_CHOICE_ANALYSIS_SEPARATOR = '\n\n---\n\n';

/** Keep prior analysis and append a new block below (regenerate). */
export function appendRegeneratedChoiceAnalysis(
  previous: string,
  generated: string,
): string {
  const prev = String(previous || '').trimEnd();
  const next = String(generated || '').trim();
  if (!prev) return next;
  if (!next) return prev;
  return `${prev}${REGENERATED_CHOICE_ANALYSIS_SEPARATOR}${next}`;
}

export function mergeStreamingRegeneratedChoiceAnalysis(
  previous: string,
  streamed: string,
): string {
  const prev = String(previous || '').trimEnd();
  const chunk = String(streamed || '');
  if (!prev) return chunk;
  if (!chunk) return prev;
  return `${prev}${REGENERATED_CHOICE_ANALYSIS_SEPARATOR}${chunk}`;
}

export const CHOICE_ANALYSIS_FOLLOW_UP_SEPARATOR = '<hr/>\n\n';

export const CHOICE_ANALYSIS_FOLLOW_UP_HEADER_RE =
  /^\*\*\[추가 질문 답변:\s*([^\]]+)\]\*\*\s*\n?/;

export function formatChoiceAnalysisFollowUpHeader(title: string): string {
  const trimmed = String(title || '').trim() || '추가 질문';
  return `**[추가 질문 답변: ${trimmed}]**\n`;
}

/** Ensure streamed/final follow-up text starts with the required header line. */
export function ensureChoiceAnalysisFollowUpHeader(
  text: string,
  fallbackTitle: string,
): string {
  const trimmed = String(text || '').trim();
  if (!trimmed) return formatChoiceAnalysisFollowUpHeader(fallbackTitle);
  if (CHOICE_ANALYSIS_FOLLOW_UP_HEADER_RE.test(trimmed)) return trimmed;
  return `${formatChoiceAnalysisFollowUpHeader(fallbackTitle)}${trimmed}`;
}

/** Append a follow-up answer block below existing analysis (`<hr/>` separator). */
export function appendFollowUpChoiceAnalysis(
  previous: string,
  followUpBlock: string,
  fallbackTitle: string,
): string {
  const prev = String(previous || '').trimEnd();
  const block = ensureChoiceAnalysisFollowUpHeader(followUpBlock, fallbackTitle);
  if (!prev) return block;
  if (!block) return prev;
  return `${prev}\n\n${CHOICE_ANALYSIS_FOLLOW_UP_SEPARATOR}${block}`;
}

export function mergeStreamingFollowUpChoiceAnalysis(
  previous: string,
  streamed: string,
): string {
  const prev = String(previous || '').trimEnd();
  const chunk = String(streamed || '');
  if (!prev) return chunk;
  if (!chunk) return prev;
  return `${prev}\n\n${CHOICE_ANALYSIS_FOLLOW_UP_SEPARATOR}${chunk}`;
}

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
