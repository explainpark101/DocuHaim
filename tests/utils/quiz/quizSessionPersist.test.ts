import { describe, expect, it } from 'vitest';
import { parseQuizDocument } from '@/utils/quiz/parseQuizDocument';
import { serializeQuizDocument } from '@/utils/quiz/serializeQuizDocument';
import {
  isQuizSessionEmpty,
  normalizeQuizPersistedSession,
  parseQuizSessionComment,
  serializeQuizSessionComment,
} from '@/utils/quiz/quizSessionPersist';

const BASE = `<!-- quiz-config {"choiceCount":4,"sourcePaths":[]} -->

### 1. Sample?

1. A *(정답)*
2. B

> **💡 접근 Point!**
> hint
>
> **📖 해설:**
> explain

---
`;

describe('quizSessionPersist', () => {
  it('round-trips quiz-session comment', () => {
    const session = normalizeQuizPersistedSession({
      userAnswers: { '1': 2 },
      gradedQuestions: { '1': true },
      subjectiveGrades: {},
      isSubmitted: false,
    });
    const line = serializeQuizSessionComment(session);
    const { session: parsed, hadComment } = parseQuizSessionComment(`${line}\n\n### 1. x`);
    expect(hadComment).toBe(true);
    expect(parsed?.userAnswers['1']).toBe(2);
    expect(parsed?.gradedQuestions['1']).toBe(true);
    expect(isQuizSessionEmpty(session)).toBe(false);
  });

  it('embeds session in full quiz document', () => {
    const session = normalizeQuizPersistedSession({
      userAnswers: { '1': 1 },
      gradedQuestions: { '1': true },
      isSubmitted: true,
    });
    const md = serializeQuizDocument(
      { choiceCount: 4, sourcePaths: [] },
      parseQuizDocument(BASE).questions,
      session,
    );
    const doc = parseQuizDocument(md);
    expect(doc.session?.userAnswers['1']).toBe(1);
    expect(doc.session?.isSubmitted).toBe(true);
    expect(doc.session?.gradedQuestions['1']).toBe(true);
  });
});
