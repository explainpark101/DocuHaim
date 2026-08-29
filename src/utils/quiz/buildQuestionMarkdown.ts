import type { QuizAddQuestionForm, QuizQuestion } from '@/utils/quiz/quizTypes';
import { serializeQuizDocument } from '@/utils/quiz/serializeQuizDocument';
import { QUIZ_CONFIG_DEFAULT } from '@/utils/quiz/quizFileConfig';
import { parseQuizDocument } from '@/utils/quiz/parseQuizDocument';

export function nextDisplayLabel(questions: QuizQuestion[]): string {
  let max = 0;
  for (const q of questions) {
    const m = String(q.displayLabel || '').match(/^(\d+)/);
    if (m?.[1]) {
      const n = Number.parseInt(m[1], 10);
      if (Number.isFinite(n) && n > max) max = n;
    }
  }
  return String(max + 1);
}

export function formToQuizQuestion(
  form: QuizAddQuestionForm,
  fallbackLabel?: string,
): QuizQuestion {
  const label = String(form.displayLabel || fallbackLabel || '1').trim() || '1';
  const point = String(form.point || '').trim() || '문항 핵심 접근법을 확인하세요.';
  const explanation =
    String(form.explanation || '').trim() || '해설이 제공되지 않았습니다.';
  const sourcePaths =
    form.sourcePaths && form.sourcePaths.length > 0
      ? [...form.sourcePaths]
      : undefined;

  if (form.kind === 'subjective') {
    const answerStyle = form.answerStyle || 'short';
    return {
      id: label,
      displayLabel: label,
      kind: 'subjective',
      answerStyle,
      question: String(form.question || '').trim(),
      modelAnswer: String(form.modelAnswer || '').trim(),
      point,
      explanation,
      ...(sourcePaths ? { sourcePaths } : {}),
    };
  }

  const options = (form.options || []).map((o) => String(o || '').trim());
  return {
    id: label,
    displayLabel: label,
    kind: 'choice',
    question: String(form.question || '').trim(),
    options,
    answer: form.answer && form.answer >= 1 ? form.answer : 1,
    point,
    explanation,
    ...(sourcePaths ? { sourcePaths } : {}),
  };
}

/** Build a single-question markdown block (no file config comment). */
export function buildQuestionMarkdownBlock(form: QuizAddQuestionForm): string {
  const q = formToQuizQuestion(form);
  const md = serializeQuizDocument(QUIZ_CONFIG_DEFAULT, [q]);
  // Strip leading config comment for a pure question block
  return md.replace(/^<!--\s*quiz-config[\s\S]*?-->\s*/i, '').trim() + '\n';
}

export function validateAddQuestionForm(form: QuizAddQuestionForm): string | null {
  if (!String(form.question || '').trim()) {
    return '질문 본문을 입력하세요.';
  }
  if (form.kind === 'choice') {
    const options = (form.options || []).map((o) => String(o || '').trim());
    const filled = options.filter(Boolean);
    if (filled.length < 2) {
      return '객관식은 최소 2개 선택지가 필요합니다.';
    }
    const answer = form.answer || 0;
    if (answer < 1 || answer > options.length || !options[answer - 1]) {
      return '정답 선택지를 지정하세요.';
    }
    return null;
  }
  if (!String(form.modelAnswer || '').trim()) {
    return form.answerStyle === 'essay'
      ? '모범 답안을 입력하세요.'
      : '정답을 입력하세요.';
  }
  return null;
}

/** Parse a single-question block back to a question (for validation). */
export function parseQuestionBlock(markdown: string): QuizQuestion | null {
  const doc = parseQuizDocument(markdown);
  return doc.questions[0] || null;
}
