import { describe, expect, it } from 'vitest';
import {
  appendFollowUpChoiceAnalysis,
  appendRegeneratedChoiceAnalysis,
  ensureChoiceAnalysisFollowUpHeader,
  flatWrongChoiceExplanations,
  mergeStreamingFollowUpChoiceAnalysis,
  mergeStreamingRegeneratedChoiceAnalysis,
  nestWrongChoiceExplanations,
  normalizeWrongChoiceExplanations,
  filterWrongChoiceExplanations,
  resolveChoiceAnalysisUserInstructions,
  DEFAULT_CORRECT_CHOICE_ANALYSIS_INSTRUCTIONS,
  DEFAULT_WRONG_CHOICE_ANALYSIS_INSTRUCTIONS,
  wrongChoiceExplanationKey,
} from '@/utils/quiz/quizWrongChoiceExplanations';
import {
  isQuizSessionEmpty,
  normalizeQuizPersistedSession,
  serializeQuizSessionComment,
  parseQuizSessionComment,
} from '@/utils/quiz/quizSessionPersist';

describe('quizWrongChoiceExplanations', () => {
  it('round-trips flat and nested maps', () => {
    const flat = {
      [wrongChoiceExplanationKey('q1', 2)]: 'why wrong',
      [wrongChoiceExplanationKey('q1', 4)]: 'also wrong',
    };
    const nested = nestWrongChoiceExplanations(flat);
    expect(nested).toEqual({
      q1: { '2': 'why wrong', '4': 'also wrong' },
    });
    expect(flatWrongChoiceExplanations(nested)).toEqual(flat);
  });

  it('appends regenerated analysis below existing content', () => {
    expect(appendRegeneratedChoiceAnalysis('first', 'second')).toBe(
      'first\n\n---\n\nsecond',
    );
    expect(appendRegeneratedChoiceAnalysis('', 'second')).toBe('second');
    expect(mergeStreamingRegeneratedChoiceAnalysis('first', 'partial')).toBe(
      'first\n\n---\n\npartial',
    );
  });

  it('appends follow-up analysis with hr separator and header', () => {
    const block = '**[추가 질문 답변: 지니 지수와 엔트로피의 수식적 차이]**\nanswer';
    expect(appendFollowUpChoiceAnalysis('first', block, 'fallback')).toBe(
      `first\n\n<hr/>\n\n${block}`,
    );
    expect(mergeStreamingFollowUpChoiceAnalysis('first', 'partial')).toBe(
      'first\n\n<hr/>\n\npartial',
    );
    expect(
      ensureChoiceAnalysisFollowUpHeader('body only', '질문 요약'),
    ).toBe('**[추가 질문 답변: 질문 요약]**\nbody only');
    expect(
      ensureChoiceAnalysisFollowUpHeader(
        '**[추가 질문 답변: already]**\nbody',
        'ignored',
      ),
    ).toBe('**[추가 질문 답변: already]**\nbody');
  });

  it('filters by question id and option count', () => {
    const nested = {
      q1: { '1': 'a', '5': 'drop' },
      q2: { '2': 'b' },
      removed: { '1': 'x' },
    };
    const filtered = filterWrongChoiceExplanations(
      nested,
      new Set(['q1', 'q2']),
      new Map([
        ['q1', 4],
        ['q2', 2],
      ]),
    );
    expect(filtered).toEqual({
      q1: { '1': 'a' },
      q2: { '2': 'b' },
    });
  });

  it('normalizes invalid entries', () => {
    expect(
      normalizeWrongChoiceExplanations({
        q1: { '0': 'x', '2': 'ok', bad: '' },
        '': { '1': 'nope' },
      }),
    ).toEqual({ q1: { '2': 'ok' } });
  });

  it('resolves default analysis instructions by correctness', () => {
    expect(resolveChoiceAnalysisUserInstructions('', false)).toBe(
      DEFAULT_WRONG_CHOICE_ANALYSIS_INSTRUCTIONS,
    );
    expect(resolveChoiceAnalysisUserInstructions('', true)).toBe(
      DEFAULT_CORRECT_CHOICE_ANALYSIS_INSTRUCTIONS,
    );
    expect(resolveChoiceAnalysisUserInstructions('  custom  ', false)).toBe('custom');
  });
});

describe('quiz-session wrongChoiceExplanations', () => {
  it('serializes and parses wrong choice explanations', () => {
    const session = normalizeQuizPersistedSession({
      version: 1,
      userAnswers: { '1': 2 },
      gradedQuestions: { '1': true },
      subjectiveGrades: {},
      isSubmitted: false,
      wrongChoiceExplanations: { '1': { '2': 'analysis text' } },
    });
    expect(isQuizSessionEmpty(session)).toBe(false);
    const comment = serializeQuizSessionComment(session);
    const parsed = parseQuizSessionComment(comment);
    expect(parsed.session?.wrongChoiceExplanations).toEqual({
      '1': { '2': 'analysis text' },
    });
  });
});
