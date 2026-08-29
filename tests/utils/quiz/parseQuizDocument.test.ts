import { describe, expect, it } from 'vitest';
import {
  clampChoiceCount,
  normalizeQuizFileConfig,
  parseQuizConfigComment,
  serializeQuizConfigComment,
} from '@/utils/quiz/quizFileConfig';
import { parseQuizDocument } from '@/utils/quiz/parseQuizDocument';
import { serializeQuizDocument } from '@/utils/quiz/serializeQuizDocument';
import {
  buildQuestionMarkdownBlock,
  formToQuizQuestion,
  validateAddQuestionForm,
} from '@/utils/quiz/buildQuestionMarkdown';
import { mergeQuizDocuments } from '@/utils/quiz/mergeQuizDocuments';

const SAMPLE = `<!-- quiz-config {"choiceCount":5,"sourcePaths":["notes/a.md"]} -->

### 1. 맵리듀스에 대한 설명으로 가장 적절한 것은?

1. Map 후 Reduce *(정답)*
2. Reduce 후 Map
3. 단일 서버만
4. 스트리밍 전용
5. GPU 필수

> **💡 접근 Point!**
> MapReduce 처리 순서
>
> **📖 해설:**
> Map → Shuffle → Reduce

---

### 2. [단답형] MAP 단계의 역할은?

**정답:** 변환

> **💡 접근 Point!**
> Map 단계
>
> **📖 해설:**
> 키-값 변환

---

### 3. [주관식] 분산 저장의 장단점

> **📖 모범 답안:**
> 확장성, 내결함성

> **💡 접근 Point!**
> CAP
>
> **📖 해설:**
> 트레이드오프

> **📚 근거 문서:**
> - notes/dfs.md
`;

describe('quizFileConfig', () => {
  it('clamps choiceCount to 2..10', () => {
    expect(clampChoiceCount(1)).toBe(2);
    expect(clampChoiceCount(11)).toBe(10);
    expect(clampChoiceCount('abc')).toBe(4);
  });

  it('parses and serializes quiz-config comment', () => {
    const { config, body, hadComment } = parseQuizConfigComment(SAMPLE);
    expect(hadComment).toBe(true);
    expect(config.choiceCount).toBe(5);
    expect(config.sourcePaths).toEqual(['notes/a.md']);
    expect(body.startsWith('###')).toBe(true);

    const again = serializeQuizConfigComment(config);
    expect(again).toContain('choiceCount');
    expect(again).toContain('notes/a.md');
  });

  it('defaults when comment missing', () => {
    const { config, hadComment } = parseQuizConfigComment('### 1. hi\n\n1. a\n');
    expect(hadComment).toBe(false);
    expect(normalizeQuizFileConfig(config).choiceCount).toBe(4);
  });
});

describe('parseQuizDocument', () => {
  it('parses choice, short, essay and question sourcePaths', () => {
    const doc = parseQuizDocument(SAMPLE);
    expect(doc.config.choiceCount).toBe(5);
    expect(doc.questions).toHaveLength(3);
    expect(doc.questions[0]?.kind).toBe('choice');
    expect(doc.questions[0]?.options).toHaveLength(5);
    expect(doc.questions[0]?.answer).toBe(1);
    expect(doc.questions[0]?.point).toBe('MapReduce 처리 순서');
    expect(doc.questions[0]?.explanation).toBe('Map → Shuffle → Reduce');
    expect(doc.questions[1]?.kind).toBe('subjective');
    expect(doc.questions[1]?.answerStyle).toBe('short');
    expect(doc.questions[1]?.modelAnswer).toBe('변환');
    expect(doc.questions[1]?.explanation).toBe('키-값 변환');
    expect(doc.questions[2]?.kind).toBe('subjective');
    expect(doc.questions[2]?.answerStyle).toBe('essay');
    expect(doc.questions[2]?.sourcePaths).toEqual(['notes/dfs.md']);
    expect(doc.questions[2]?.modelAnswer).toBe('확장성, 내결함성');
  });

  it('persists similarOf meta for TOC nesting', () => {
    const md = `### 1. Root

1. a *(정답)*
2. b

> **💡 접근 Point!**
> p
>
> **📖 해설:**
> e

---

### 1-유사1. Similar

<!-- quiz-q-meta {"similarOf":{"id":"1","displayLabel":"1"}} -->

1. x *(정답)*
2. y

> **💡 접근 Point!**
> p
>
> **📖 해설:**
> e
`;
    const doc = parseQuizDocument(md);
    expect(doc.questions[1]?.similarOf).toEqual({ id: '1', displayLabel: '1' });
    const again = parseQuizDocument(serializeQuizDocument(doc.config, doc.questions));
    expect(again.questions[1]?.similarOf?.displayLabel).toBe('1');
  });

  it('infers similarOf from displayLabel when meta missing', () => {
    const doc = parseQuizDocument(`### 2-유사3. Q

1. a *(정답)*
2. b

> **💡 접근 Point!**
> p
>
> **📖 해설:**
> e
`);
    expect(doc.questions[0]?.similarOf).toEqual({ id: '2', displayLabel: '2' });
  });

  it('strips bold wrappers around 해설 / 접근 Point labels', () => {
    const doc = parseQuizDocument(`### 1. Q?

1. a *(정답)*
2. b

> **💡 접근 Point!**
> point body with - list item
> - kept bullet
>
> **📖 해설:**
> explain **bold** text
`);
    expect(doc.questions[0]?.point).toContain('point body');
    expect(doc.questions[0]?.point).toContain('kept bullet');
    expect(doc.questions[0]?.explanation).toBe('explain **bold** text');
    expect(doc.questions[0]?.explanation.startsWith('**')).toBe(false);
  });

  it('round-trips through serialize', () => {
    const doc = parseQuizDocument(SAMPLE);
    const md = serializeQuizDocument(doc.config, doc.questions);
    const again = parseQuizDocument(md);
    expect(again.config.choiceCount).toBe(5);
    expect(again.questions).toHaveLength(3);
    expect(again.questions[0]?.answer).toBe(1);
    expect(again.questions[1]?.modelAnswer).toBe('변환');
  });

  it('includes body lines before the first 1. choice in question stem', () => {
    const doc = parseQuizDocument(`### 1. 맵리듀스에 대한 설명으로 가장 적절한 것은?

다음 자료를 참고하세요.

![[images/diagram.png]]

**핵심:** 처리 순서를 떠올리세요.

1. Map 후 Reduce *(정답)*
2. Reduce 후 Map

> **💡 접근 Point!**
> hint
>
> **📖 해설:**
> explain
`);
    const q = doc.questions[0];
    expect(q?.question).toContain('맵리듀스에 대한 설명');
    expect(q?.question).toContain('다음 자료를 참고하세요.');
    expect(q?.question).toContain('![[images/diagram.png]]');
    expect(q?.question).toContain('**핵심:**');
    expect(q?.options?.[0]).toBe('Map 후 Reduce');
  });

  it('excludes source document blockquote from question stem', () => {
    const doc = parseQuizDocument(`### 4. Question stem only

> **📚 근거 문서:**
> - notes/a.md
> - notes/b.md

1. A *(정답)*
2. B

> **💡 접근 Point!**
> p
>
> **📖 해설:**
> e
`);
    const q = doc.questions[0];
    expect(q?.question).toBe('Question stem only');
    expect(q?.question).not.toContain('근거 문서');
    expect(q?.question).not.toContain('notes/a.md');
    expect(q?.sourcePaths).toEqual(['notes/a.md', 'notes/b.md']);
  });

  it('round-trips question body before choices', () => {
    const md = `### 3. Stem title

Body line one

Body line two

1. A *(정답)*
2. B

> **💡 접근 Point!**
> p
>
> **📖 해설:**
> e
`;
    const doc = parseQuizDocument(md);
    const again = parseQuizDocument(serializeQuizDocument(doc.config, doc.questions));
    expect(again.questions[0]?.question).toBe(doc.questions[0]?.question);
    expect(again.questions[0]?.question).toContain('Body line two');
  });
});

describe('buildQuestionMarkdown', () => {
  it('builds choice block that parses', () => {
    const block = buildQuestionMarkdownBlock({
      kind: 'choice',
      displayLabel: '9',
      question: 'Q?',
      options: ['a', 'b', 'c', 'd'],
      answer: 2,
      point: 'p',
      explanation: 'e',
    });
    const doc = parseQuizDocument(block);
    expect(doc.questions[0]?.answer).toBe(2);
    expect(doc.questions[0]?.options?.[1]).toBe('b');
  });

  it('validates form', () => {
    expect(
      validateAddQuestionForm({
        kind: 'choice',
        question: '',
        options: ['a', 'b'],
        answer: 1,
      }),
    ).toBeTruthy();
    expect(
      validateAddQuestionForm({
        kind: 'choice',
        question: 'q',
        options: ['a', ''],
        answer: 1,
      }),
    ).toBeTruthy();
    expect(
      validateAddQuestionForm({
        kind: 'subjective',
        answerStyle: 'short',
        question: 'q',
        modelAnswer: 'ans',
      }),
    ).toBeNull();
  });

  it('formToQuizQuestion sets fields', () => {
    const q = formToQuizQuestion({
      kind: 'subjective',
      answerStyle: 'essay',
      question: '서술',
      modelAnswer: '모범',
    });
    expect(q.kind).toBe('subjective');
    expect(q.modelAnswer).toBe('모범');
  });
});

describe('mergeQuizDocuments', () => {
  it('appends with renumbered labels', () => {
    const current = parseQuizDocument(SAMPLE);
    const incoming = parseQuizDocument(`### 1. New

1. x *(정답)*
2. y

> **💡 접근 Point!**
> p
>
> **📖 해설:**
> e
`);
    const merged = mergeQuizDocuments(current, incoming, { mode: 'append' });
    expect(merged.questions).toHaveLength(4);
    expect(merged.questions[3]?.displayLabel).toBe('4');
  });

  it('replaces questions', () => {
    const current = parseQuizDocument(SAMPLE);
    const incoming = parseQuizDocument(`### 1. Only

1. a *(정답)*
2. b

> **💡 접근 Point!**
> p
>
> **📖 해설:**
> e
`);
    const merged = mergeQuizDocuments(current, incoming, { mode: 'replace' });
    expect(merged.questions).toHaveLength(1);
  });
});
