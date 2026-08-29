export type QuizQuestionMemos = Record<string, string>;

export function normalizeQuestionMemos(raw: unknown): QuizQuestionMemos {
  if (!raw || typeof raw !== 'object') return {};
  const out: QuizQuestionMemos = {};
  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    const id = String(key || '').trim();
    if (!id) continue;
    if (typeof value !== 'string') continue;
    const text = value;
    if (!text.trim()) continue;
    out[id] = text;
  }
  return out;
}

export function isQuestionMemosEmpty(
  memos: QuizQuestionMemos | null | undefined,
): boolean {
  return Object.keys(normalizeQuestionMemos(memos)).length === 0;
}

export function filterQuestionMemos(
  memos: QuizQuestionMemos | null | undefined,
  questionIds: ReadonlySet<string> | readonly string[],
): QuizQuestionMemos {
  const ids = questionIds instanceof Set ? questionIds : new Set(questionIds);
  const normalized = normalizeQuestionMemos(memos);
  const out: QuizQuestionMemos = {};
  for (const [id, text] of Object.entries(normalized)) {
    if (ids.has(id)) out[id] = text;
  }
  return out;
}
