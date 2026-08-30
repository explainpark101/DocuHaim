import type { QuizAddQuestionForm } from '@/utils/quiz/quizTypes';

export type AnswerKeyEntry = {
  questionNumber: number;
  answer: number;
};

const CIRCLED_DIGIT_TO_NUMBER: Record<string, number> = {
  '①': 1,
  '②': 2,
  '③': 3,
  '④': 4,
  '⑤': 5,
  '⑥': 6,
  '⑦': 7,
  '⑧': 8,
  '⑨': 9,
  '⑩': 10,
  '⓵': 1,
  '⓶': 2,
  '⓷': 3,
  '⓸': 4,
  '⓹': 5,
};

const HANGUL_CHOICE_LABELS = ['가', '나', '다', '라', '마', '바', '사', '아', '자', '차'];

/** Normalize a single answer cell (3, ③, c, 가, …) to a 1-based choice index. */
export function parseAnswerChoiceNumber(raw: string): number | null {
  const token = String(raw || '')
    .trim()
    .replace(/번$/u, '')
    .replace(/[.)]+$/u, '')
    .trim();
  if (!token) return null;

  const circled = CIRCLED_DIGIT_TO_NUMBER[token];
  if (circled) return circled;

  const digit = token.match(/^(\d+)/u);
  if (digit?.[1]) {
    const n = Number.parseInt(digit[1], 10);
    return Number.isFinite(n) && n > 0 ? n : null;
  }

  const lower = token.toLowerCase();
  if (/^[a-j]$/u.test(lower)) {
    return lower.charCodeAt(0) - 96;
  }

  const hangulIndex = HANGUL_CHOICE_LABELS.indexOf(token[0] || '');
  if (hangulIndex >= 0) return hangulIndex + 1;

  return null;
}

function isLikelyHeaderLine(line: string): boolean {
  const normalized = line.replace(/\s+/gu, '').toLowerCase();
  if (!normalized) return true;
  if (/^(문항|번호|no|#|정답|답|answer|question)/u.test(normalized) && !/\d/u.test(line)) {
    return true;
  }
  return false;
}

function parsePairLine(line: string): AnswerKeyEntry | null {
  const trimmed = line.trim();
  if (!trimmed || isLikelyHeaderLine(trimmed)) return null;

  const pairPatterns = [
    /^(\d+)\s*(?:번)?\s*[-–—>→:.)]\s*(.+)$/u,
    /^(\d+)\s*(?:번)?\s+(.+)$/u,
    /^(\d+)\s*[,，]\s*(.+)$/u,
  ];

  for (const pattern of pairPatterns) {
    const match = trimmed.match(pattern);
    if (!match?.[1] || !match[2]) continue;
    const questionNumber = Number.parseInt(match[1], 10);
    const answer = parseAnswerChoiceNumber(match[2]);
    if (Number.isFinite(questionNumber) && questionNumber > 0 && answer) {
      return { questionNumber, answer };
    }
  }

  const tabParts = trimmed.split(/\t+/u).map((part) => part.trim()).filter(Boolean);
  if (tabParts.length >= 2) {
    const questionNumber = Number.parseInt(tabParts[0]!, 10);
    const answer = parseAnswerChoiceNumber(tabParts[1]!);
    if (Number.isFinite(questionNumber) && questionNumber > 0 && answer) {
      return { questionNumber, answer };
    }
  }

  return null;
}

function parseHorizontalAnswerTable(lines: string[]): AnswerKeyEntry[] | null {
  if (lines.length < 2) return null;
  const splitRow = (line: string) =>
    line
      .split(/[\t|,]+/u)
      .map((cell) => cell.trim())
      .filter(Boolean);

  const questionCells = splitRow(lines[0]!);
  const answerCells = splitRow(lines[1]!);
  if (questionCells.length < 2 || questionCells.length !== answerCells.length) {
    return null;
  }

  const entries: AnswerKeyEntry[] = [];
  for (let i = 0; i < questionCells.length; i++) {
    const questionNumber = Number.parseInt(questionCells[i]!, 10);
    const answer = parseAnswerChoiceNumber(answerCells[i]!);
    if (!Number.isFinite(questionNumber) || questionNumber <= 0 || !answer) return null;
    entries.push({ questionNumber, answer });
  }
  return entries.length ? entries : null;
}

/**
 * Parse pasted answer-key tables such as `1 3`, `1\t③`, or two-row TSV grids.
 */
export function parseAnswerKeyTableText(text: string): AnswerKeyEntry[] {
  const lines = String(text || '')
    .split(/\r?\n/u)
    .map((line) => line.trim())
    .filter(Boolean);
  if (!lines.length) return [];

  const horizontal = parseHorizontalAnswerTable(lines);
  if (horizontal?.length) return horizontal;

  const entries: AnswerKeyEntry[] = [];
  const seen = new Set<number>();
  for (const line of lines) {
    const entry = parsePairLine(line);
    if (!entry || seen.has(entry.questionNumber)) continue;
    seen.add(entry.questionNumber);
    entries.push(entry);
  }
  return entries.sort((a, b) => a.questionNumber - b.questionNumber);
}

export function answerKeyEntriesToMap(entries: AnswerKeyEntry[]): Map<number, number> {
  return new Map(entries.map((entry) => [entry.questionNumber, entry.answer]));
}

/** Apply parsed answer-key rows onto generated choice questions (by questionNumber or order). */
export function applyAnswerKeyToForms(
  forms: Omit<QuizAddQuestionForm, 'displayLabel'>[],
  entries: AnswerKeyEntry[],
  choiceCount: number,
): Omit<QuizAddQuestionForm, 'displayLabel'>[] {
  if (!entries.length) return forms;
  const keyMap = answerKeyEntriesToMap(entries);
  return forms.map((form, index) => {
    if (form.kind !== 'choice') return form;
    const questionNumber = index + 1;
    const answer = keyMap.get(questionNumber);
    if (!answer) return form;
    return {
      ...form,
      answer: Math.min(choiceCount, Math.max(1, answer)),
    };
  });
}

export function parseAnswerKeyEntriesFromLlmJson(raw: unknown): AnswerKeyEntry[] {
  const root =
    raw && typeof raw === 'object' && !Array.isArray(raw)
      ? (raw as Record<string, unknown>)
      : null;
  const list = Array.isArray(raw)
    ? raw
    : Array.isArray(root?.entries)
      ? root.entries
      : Array.isArray(root?.answers)
        ? root.answers
        : [];

  const entries: AnswerKeyEntry[] = [];
  const seen = new Set<number>();
  for (const item of list) {
    if (!item || typeof item !== 'object') continue;
    const obj = item as Record<string, unknown>;
    const questionNumber = Number.parseInt(
      String(obj.questionNumber ?? obj.number ?? obj.question ?? obj.no ?? ''),
      10,
    );
    const answer = parseAnswerChoiceNumber(
      String(obj.answer ?? obj.correct ?? obj.choice ?? obj.value ?? ''),
    );
    if (!Number.isFinite(questionNumber) || questionNumber <= 0 || !answer) continue;
    if (seen.has(questionNumber)) continue;
    seen.add(questionNumber);
    entries.push({ questionNumber, answer });
  }
  return entries.sort((a, b) => a.questionNumber - b.questionNumber);
}
