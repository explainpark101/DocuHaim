import {
  normalizeQuizFileConfig,
  parseQuizConfigComment,
  QUIZ_CONFIG_DEFAULT,
} from '@/utils/quiz/quizFileConfig';
import {
  filterQuizSessionForQuestions,
  isQuizSessionEmpty,
  parseQuizSessionComment,
} from '@/utils/quiz/quizSessionPersist';
import type {
  QuizAnswerStyle,
  QuizDocument,
  QuizQuestion,
  QuizQuestionKind,
} from '@/utils/quiz/quizTypes';

const ANSWER_MARKER_RE =
  /\*\(\s*정답\s*\)\*|\(\s*정답\s*\)|\[\s*정답\s*\]|\*\s*정답\s*\*/;

function stripAnswerMarkers(text: string): string {
  return text
    .replace(/\*\(\s*정답\s*\)\*/g, '')
    .replace(/\(\s*정답\s*\)/g, '')
    .replace(/\[\s*정답\s*\]/g, '')
    .replace(/\*\s*정답\s*\*/g, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    .trim();
}

function detectKindFromHeader(headerRest: string): {
  kind: QuizQuestionKind;
  answerStyle?: QuizAnswerStyle;
  question: string;
} {
  let rest = headerRest.trim();
  const shortMatch = rest.match(/^\[단답형\]\s*(.*)$/i);
  if (shortMatch) {
    return {
      kind: 'subjective',
      answerStyle: 'short',
      question: (shortMatch[1] || '').trim(),
    };
  }
  const essayMatch = rest.match(/^\[(?:주관식|서술형)\]\s*(.*)$/i);
  if (essayMatch) {
    return {
      kind: 'subjective',
      answerStyle: 'essay',
      question: (essayMatch[1] || '').trim(),
    };
  }
  return { kind: 'choice', question: rest };
}

const SECTION_MODEL_ANSWER_RE = /\*{0,2}\s*📖\s*모범\s*답안\s*:?\s*\*{0,2}/;
const SECTION_POINT_RE = /\*{0,2}\s*💡\s*접근\s*Point!?\s*\*{0,2}/;
const SECTION_EXPLAIN_RE = /\*{0,2}\s*📖\s*해설\s*:?\s*\*{0,2}/;
const SECTION_SOURCES_RE = /\*{0,2}\s*📚\s*근거\s*문서\s*:?\s*\*{0,2}/;

function parseSourcePathsFromQuote(quoteLines: string[]): string[] | undefined {
  const full = quoteLines.join('\n');
  if (!SECTION_SOURCES_RE.test(full) && !full.includes('📚 근거 문서')) {
    return undefined;
  }
  const after = full.split(SECTION_SOURCES_RE)[1] ?? '';
  const paths: string[] = [];
  for (const line of after.split('\n')) {
    const m = line.trim().match(/^[-*]\s+(.+)$/);
    if (m?.[1]) {
      const p = m[1].trim().replace(/\\/g, '/').replace(/^\/+/, '');
      if (p) paths.push(p);
    }
  }
  return paths.length > 0 ? paths : undefined;
}

function cleanSectionBody(text: string): string {
  return String(text || '')
    .replace(/^\*+\s*/, '')
    .replace(/\s*\*+$/, '')
    .trim();
}

function parsePointAndExplanation(quoteLines: string[]): {
  point: string;
  explanation: string;
  modelAnswer?: string;
} {
  const fullQuote = quoteLines.join('\n').trim();
  if (!fullQuote) {
    return {
      point: '문항 핵심 접근법을 확인하세요.',
      explanation: '해설이 제공되지 않았습니다.',
    };
  }

  let modelAnswer: string | undefined;
  let working = fullQuote;

  if (SECTION_MODEL_ANSWER_RE.test(working)) {
    const parts = working.split(SECTION_MODEL_ANSWER_RE);
    const after = (parts[1] || '').trim();
    const nextSplit = after.split(
      /(?=\*{0,2}\s*(?:💡\s*접근\s*Point!?|📖\s*해설|📚\s*근거\s*문서))/,
    );
    modelAnswer = cleanSectionBody(nextSplit[0] || '');
    working = [parts[0], ...nextSplit.slice(1)].join('\n').trim();
  }

  // Remove only the 📚 sources section (keep list items inside point/explanation).
  const sourcesSplit = working.split(SECTION_SOURCES_RE);
  working = (sourcesSplit[0] || '').trim();

  let point = '';
  let explanation = '';

  if (SECTION_POINT_RE.test(working) || SECTION_EXPLAIN_RE.test(working)) {
    const explainParts = working.split(SECTION_EXPLAIN_RE);
    const beforeExplain = explainParts[0] || '';
    explanation = cleanSectionBody(explainParts.slice(1).join('\n'));
    point = cleanSectionBody(beforeExplain.replace(SECTION_POINT_RE, ''));
  } else {
    explanation = cleanSectionBody(working);
  }

  return {
    point: point || '문항 핵심 접근법을 확인하세요.',
    explanation: explanation || '해설이 제공되지 않았습니다.',
    ...(modelAnswer ? { modelAnswer } : {}),
  };
}

const QUIZ_Q_META_RE = /^<!--\s*quiz-q-meta\s+([\s\S]*?)-->\s*$/;

function parseQuizQuestionMeta(raw: string): {
  similarOf?: { id: string; displayLabel: string };
} | null {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    const rec = parsed as Record<string, unknown>;
    const similarRaw = rec.similarOf;
    if (!similarRaw || typeof similarRaw !== 'object') return {};
    const s = similarRaw as Record<string, unknown>;
    const id = String(s.id || s.displayLabel || '').trim();
    const displayLabel = String(s.displayLabel || s.id || '').trim();
    if (!id && !displayLabel) return {};
    return {
      similarOf: {
        id: id || displayLabel,
        displayLabel: displayLabel || id,
      },
    };
  } catch {
    return null;
  }
}

function inferSimilarOfFromLabel(
  displayLabel: string,
): { id: string; displayLabel: string } | undefined {
  const m = String(displayLabel || '').match(/^(.+)-유사\d+$/);
  const parent = m?.[1]?.trim();
  if (!parent) return undefined;
  return { id: parent, displayLabel: parent };
}

function parseSingleBlock(block: string, index: number): QuizQuestion | null {
  const trimmed = block.trim();
  if (!trimmed || !/^#+/.test(trimmed)) return null;

  const lines = trimmed.split('\n');
  let id = String(index + 1);
  let displayLabel = id;
  let questionText = '';
  let image: string | null = null;
  const options: string[] = [];
  let answer = 1;
  let modelAnswerLine: string | undefined;
  const quoteLines: string[] = [];
  let headerKind: QuizQuestionKind = 'choice';
  let headerAnswerStyle: QuizAnswerStyle | undefined;
  let similarOf: { id: string; displayLabel: string } | undefined;

  for (const line of lines) {
    const l = line.trim();

    const metaMatch = l.match(QUIZ_Q_META_RE);
    if (metaMatch?.[1]) {
      const meta = parseQuizQuestionMeta(metaMatch[1]);
      if (meta?.similarOf) similarOf = meta.similarOf;
      continue;
    }

    const headerMatch = l.match(/^#+\s*(?:🔖\s*)?(\d+(?:-유사\d+)?)\.?(.*)/);
    if (headerMatch) {
      displayLabel = (headerMatch[1] || '').trim();
      id = displayLabel;
      const detected = detectKindFromHeader((headerMatch[2] || '').trim());
      headerKind = detected.kind;
      headerAnswerStyle = detected.answerStyle;
      questionText = detected.question;
      continue;
    }

    if (l.startsWith('![')) {
      const imgMatch = l.match(/!\[.*?\]\((.*?)\)/);
      if (imgMatch?.[1]) image = imgMatch[1];
      continue;
    }

    const shortAnswerMatch = l.match(/^\*\*정답:\*\*\s*(.*)$/);
    if (shortAnswerMatch) {
      modelAnswerLine = (shortAnswerMatch[1] || '').trim();
      continue;
    }

    if (/^\d+\.\s+/.test(l)) {
      const optMatch = l.match(/^(\d+)\.\s+(.*)/);
      if (optMatch) {
        const optIndex = Number.parseInt(optMatch[1] || '0', 10);
        const rawOptText = (optMatch[2] || '').trim();
        const isCorrect = ANSWER_MARKER_RE.test(rawOptText);
        options.push(stripAnswerMarkers(rawOptText));
        if (isCorrect) answer = optIndex;
      }
      continue;
    }

    if (l.startsWith('>')) {
      quoteLines.push(l.replace(/^>\s?/, ''));
    }
  }

  const { point, explanation, modelAnswer: quoteModel } =
    parsePointAndExplanation(quoteLines);
  const sourcePaths = parseSourcePathsFromQuote(quoteLines);
  const modelAnswer = modelAnswerLine || quoteModel;

  // Infer kind when header had no type tag
  let kind = headerKind;
  let answerStyle = headerAnswerStyle;
  if (kind === 'choice' && options.length === 0 && modelAnswer) {
    kind = 'subjective';
    answerStyle = modelAnswerLine ? 'short' : 'essay';
  }
  if (kind === 'choice' && options.length === 0 && !modelAnswer) {
    return null;
  }
  if (kind === 'subjective' && !questionText) return null;
  if (kind === 'choice' && (!questionText || options.length === 0)) return null;

  if (!similarOf) {
    similarOf = inferSimilarOfFromLabel(displayLabel);
  }

  const q: QuizQuestion = {
    id,
    displayLabel,
    kind,
    question: questionText,
    image,
    point,
    explanation,
    ...(kind === 'subjective' && answerStyle ? { answerStyle } : {}),
    ...(kind === 'choice' ? { options, answer } : {}),
    ...(kind === 'subjective' && modelAnswer ? { modelAnswer } : {}),
    ...(sourcePaths ? { sourcePaths } : {}),
    ...(similarOf ? { similarOf, isGenerated: true } : {}),
  };
  return q;
}

/**
 * Parse a full `.quiz.md` document into config + questions.
 */
export function parseQuizDocument(markdown: string): QuizDocument {
  const { config, body: afterConfig } = parseQuizConfigComment(markdown);
  const { session: rawSession, body } = parseQuizSessionComment(afterConfig);
  const questions: QuizQuestion[] = [];
  const blocks = body.split(/(?=^#+\s*(?:🔖\s*)?\d+)/m);

  blocks.forEach((block, index) => {
    const q = parseSingleBlock(block, index);
    if (q) questions.push(q);
  });

  const questionIds = new Set(questions.map((q) => q.id));
  const session =
    rawSession && questionIds.size > 0
      ? filterQuizSessionForQuestions(rawSession, questionIds)
      : rawSession;

  return {
    config: normalizeQuizFileConfig(config),
    questions,
    session: session && !isQuizSessionEmpty(session) ? session : null,
  };
}

/** Parse questions only (legacy helper). */
export function parseMarkdownToQuestions(markdown: string): QuizQuestion[] {
  return parseQuizDocument(markdown).questions;
}

export function resolveEffectiveSourcePaths(
  fileConfig: { sourcePaths?: string[] } | null | undefined,
  question: { sourcePaths?: string[] } | null | undefined,
): string[] {
  if (question?.sourcePaths && question.sourcePaths.length > 0) {
    return [...question.sourcePaths];
  }
  return [...(fileConfig?.sourcePaths || [])];
}

export { QUIZ_CONFIG_DEFAULT };
