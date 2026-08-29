import { serializeQuizConfigComment } from '@/utils/quiz/quizFileConfig';
import {
  isQuizSessionEmpty,
  serializeQuizSessionComment,
} from '@/utils/quiz/quizSessionPersist';
import type {
  QuizDocument,
  QuizFileConfig,
  QuizPersistedSession,
  QuizQuestion,
} from '@/utils/quiz/quizTypes';

function blockquoteLines(text: string): string {
  const lines = String(text || '').split('\n');
  return lines.map((l) => `> ${l}`).join('\n');
}

function serializeOneQuestion(q: QuizQuestion): string {
  const parts: string[] = [];

  if (q.kind === 'subjective' && q.answerStyle === 'short') {
    parts.push(`### ${q.displayLabel}. [단답형] ${q.question}`);
  } else if (q.kind === 'subjective') {
    parts.push(`### ${q.displayLabel}. [주관식] ${q.question}`);
  } else {
    parts.push(`### ${q.displayLabel}. ${q.question}`);
  }

  if (q.similarOf?.id || q.similarOf?.displayLabel) {
    const meta = {
      similarOf: {
        id: String(q.similarOf.id || q.similarOf.displayLabel || '').trim(),
        displayLabel: String(
          q.similarOf.displayLabel || q.similarOf.id || '',
        ).trim(),
      },
    };
    parts.push(`<!-- quiz-q-meta ${JSON.stringify(meta)} -->`);
  }
  parts.push('');

  if (q.image) {
    parts.push(`![이미지](${q.image})`);
    parts.push('');
  }

  if (q.sourcePaths && q.sourcePaths.length > 0) {
    parts.push('> **📚 근거 문서:**');
    for (const p of q.sourcePaths) {
      parts.push(`> - ${p}`);
    }
    parts.push('>');
  }

  if (q.kind === 'choice' && q.options) {
    q.options.forEach((opt, i) => {
      const n = i + 1;
      const mark = q.answer === n ? ' *(정답)*' : '';
      parts.push(`${n}. ${opt}${mark}`);
    });
    parts.push('');
  }

  if (q.kind === 'subjective' && q.answerStyle === 'short' && q.modelAnswer) {
    parts.push(`**정답:** ${q.modelAnswer}`);
    parts.push('');
  }

  if (q.kind === 'subjective' && q.answerStyle !== 'short' && q.modelAnswer) {
    parts.push('> **📖 모범 답안:**');
    parts.push(blockquoteLines(q.modelAnswer));
    parts.push('>');
  }

  parts.push('> **💡 접근 Point!**');
  parts.push(blockquoteLines(q.point || '문항 핵심 접근법을 확인하세요.'));
  parts.push('>');
  parts.push('> **📖 해설:**');
  parts.push(blockquoteLines(q.explanation || '해설이 제공되지 않았습니다.'));
  parts.push('');
  parts.push('---');
  parts.push('');

  return parts.join('\n');
}

export function serializeQuizDocument(
  config: QuizFileConfig,
  questions: QuizQuestion[],
  session?: QuizPersistedSession | null,
): string {
  const header = serializeQuizConfigComment(config);
  const body = questions.map(serializeOneQuestion).join('\n');
  const parts = [header];
  if (session && !isQuizSessionEmpty(session)) {
    parts.push(serializeQuizSessionComment(session));
  }
  parts.push(body);
  return parts.join('\n\n').trimEnd() + '\n';
}

export function serializeQuizDocumentFromDoc(doc: QuizDocument): string {
  return serializeQuizDocument(doc.config, doc.questions, doc.session);
}
