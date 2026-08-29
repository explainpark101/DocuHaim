import { normalizeQuizFileConfig } from '@/utils/quiz/quizFileConfig';
import type { QuizDocument, QuizFileConfig, QuizQuestion } from '@/utils/quiz/quizTypes';
import { nextDisplayLabel } from '@/utils/quiz/buildQuestionMarkdown';

export type MergeMode = 'append' | 'replace';

export type MergeQuizDocumentsOptions = {
  mode: MergeMode;
  /** When replace + incoming has config comment, merge/overwrite file config. */
  mergeConfig?: boolean;
};

function remappedAppend(
  existing: QuizQuestion[],
  incoming: QuizQuestion[],
): QuizQuestion[] {
  const out = [...existing];
  let nextLabel = Number.parseInt(nextDisplayLabel(existing), 10) || 1;
  for (const q of incoming) {
    const label = String(nextLabel);
    out.push({
      ...q,
      id: q.isGenerated ? q.id : label,
      displayLabel: label,
    });
    nextLabel += 1;
  }
  return out;
}

export function mergeQuizDocuments(
  current: QuizDocument,
  incoming: QuizDocument,
  options: MergeQuizDocumentsOptions,
): QuizDocument {
  if (options.mode === 'replace') {
    const config: QuizFileConfig =
      options.mergeConfig !== false
        ? normalizeQuizFileConfig({
            ...current.config,
            ...incoming.config,
            sourcePaths:
              incoming.config.sourcePaths.length > 0
                ? incoming.config.sourcePaths
                : current.config.sourcePaths,
          })
        : current.config;
    return {
      config,
      questions: incoming.questions.map((q) => ({ ...q })),
    };
  }

  return {
    config: current.config,
    questions: remappedAppend(current.questions, incoming.questions),
  };
}
