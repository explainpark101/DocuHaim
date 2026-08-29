# Quiz markdown (`.quiz.md`)

Vault quiz notes opened in **퀴즈 모드** (`/quiz/<path>`). Authors can also open the same file in **편집 모드** (`/view/<path>`).

## Syntax

### File config (leading HTML comment)

```html
<!-- quiz-config {"choiceCount":4,"sourcePaths":["notes/ch1.md"]} -->
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `choiceCount` | number | `4` | Multiple-choice option count (clamped **2–10**) |
| `sourcePaths` | string[] | `[]` | Vault `.md` paths registered as RAG sources for the whole file |
| `disabledSourcePaths` | string[] | *(omitted)* | Subset of `sourcePaths` excluded from RAG / generation while kept in the list. Omitted when all sources are enabled. |

In the quiz UI, each file-level source row has a checkbox (dock). The dock header shows **active/total** (e.g. `2/3 사용`). Only enabled paths are passed to RAG and AI generation; question-level `sourcePaths` are unchanged.

### Session state (optional, after `quiz-config`)

User answers and grading results are persisted so reopening the quiz restores progress:

```html
<!-- quiz-session {"version":1,"userAnswers":{"1":2,"2":"변환"},"gradedQuestions":{"1":true,"2":true},"subjectiveGrades":{"3":{"verdict":"partial","score":65,"feedback":"…"}},"isSubmitted":true,"timeLog":{"version":1,"events":[{"type":"start","at":"2026-08-30T10:00:00.000Z","elapsedMs":0},{"type":"pause","at":"2026-08-30T10:00:30.000Z","elapsedMs":30000}]}} -->
```

| Field | Type | Description |
|-------|------|-------------|
| `userAnswers` | object | Question id → choice index (number) or subjective text (string) |
| `gradedQuestions` | object | Question id → `true` if graded, `false` if answered but not yet graded (omitted when no answer) |
| `subjectiveGrades` | object | Question id → `{ verdict, score, feedback, rationale? }` |
| `isSubmitted` | boolean | Whole-quiz submit was used |
| `timeLog` | object | Stopwatch event log (see below) |
| `wrongChoiceExplanations` | object | Question id → option number string → markdown analysis text |
| `questionMemos` | object | Question id → user-authored markdown memo text |

#### `timeLog` (stopwatch)

| Field | Type | Description |
|-------|------|-------------|
| `version` | `1` | Schema version |
| `events` | array | Chronological stopwatch events |

Each event:

| Field | Type | Description |
|-------|------|-------------|
| `type` | `"start"` \| `"pause"` \| `"resume"` \| `"stop"` | Event kind |
| `at` | string | ISO-8601 timestamp when the event occurred |
| `elapsedMs` | number | Active elapsed time in ms at this event (paused intervals excluded) |

#### `questionEntries` (per-question focus while stopwatch runs)

Optional array of segments recorded when a question card is the primary visible item in the quiz scroll area **while the stopwatch is running**.

| Field | Type | Description |
|-------|------|-------------|
| `questionId` | string | Question id |
| `displayLabel` | string | Question display label (e.g. `1`, `1-유사1`) |
| `at` | string | ISO-8601 when focus on this question started |
| `endedAt` | string | ISO-8601 when focus ended (switch, pause, or stop) |
| `durationMs` | number | Active ms on this question (paused intervals excluded) |

Segments shorter than 300ms are omitted. Omitted when the array is empty.

Written automatically by 퀴즈 모드 (`QuizPane`); omitted when empty. Per-question **다시풀기** clears that question’s grade in UI and updates this block on save.

### Similar-question metadata (per question)

After a generated similar item’s heading:

```html
### 1-유사1. …

<!-- quiz-q-meta {"similarOf":{"id":"1","displayLabel":"1"}} -->
```

| Field | Description |
|-------|-------------|
| `similarOf.id` | Parent question id |
| `similarOf.displayLabel` | Parent display label (TOC nesting) |

If the comment is missing, labels matching `N-유사K` still infer `similarOf` from `N`.

```markdown
### 1. Question text here?

Optional stem body (markdown) until the first `1. ` choice line.

1. Option A *(정답)*
2. Option B
3. Option C
4. Option D

> **💡 접근 Point!**
> Strategy hint
>
> **📖 해설:**
> Full explanation
```

The **question stem** in the app is the heading text plus any non-blockquote body lines **above** the first `1. ` choice line (images and markdown included). Answer markers on the correct option: `*(정답)*`, `(정답)`, `[정답]`, `*정답*`.

### Short answer (단답형)

```markdown
### 2. [단답형] One-word answer?

**정답:** Map

> **💡 접근 Point!**
> …
>
> **📖 해설:**
> …
```

### Essay (주관식 / 서술형)

```markdown
### 3. [주관식] Explain …

> **📖 모범 답안:**
> Model answer for AI grading

> **💡 접근 Point!**
> …
>
> **📖 해설:**
> …
```

### Per-question RAG sources (optional override)

```markdown
### 4. Question

> **📚 근거 문서:**
> - notes/a.md
> - notes/b.md

1. …
```

When present and non-empty, these paths **replace** file-level `sourcePaths` for AI generation on that question only.

## Spec (interop)

Implementation: `src/utils/quiz/*`, `src/components/quiz/QuizPane.tsx`.

### 1. Grammar

```text
QUIZ_DOC := [ QUIZ_CONFIG_COMMENT ] [ QUIZ_SESSION_COMMENT ] QUESTION_BLOCK*

QUIZ_CONFIG_COMMENT := '<!--' WS 'quiz-config' WS JSON '-->'
QUIZ_SESSION_COMMENT := '<!--' WS 'quiz-session' WS JSON '-->'
JSON := { choiceCount?: number, sourcePaths?: string[], disabledSourcePaths?: string[] }
SESSION_JSON := { version: 1, userAnswers?: object, gradedQuestions?: object, subjectiveGrades?: object, isSubmitted?: boolean }

QUESTION_BLOCK := HEADING NL [STEM_BODY] [IMAGE] [SOURCE_QUOTE] (CHOICE_BODY | SHORT_BODY | ESSAY_BODY) [POINT_EXP_QUOTE]

HEADING := '#'+ WS [🔖 WS] LABEL '.' WS [TYPE_TAG WS] QUESTION_HEADING_LINE
STEM_BODY := (LINE NL)*   /* lines until first `1. ` choice or subjective structural line */
LABEL := DIGIT+ ('-유사' DIGIT+)?
TYPE_TAG := '[단답형]' | '[주관식]' | '[서술형]'

CHOICE_BODY := (DIGIT '.' WS OPTION_LINE NL)+
SHORT_BODY := '**정답:**' WS ANSWER_LINE
ESSAY_BODY := '>' WS '**📖 모범 답안:**' NL ('>' LINE)*
```

### 2. Parse algorithm

1. If a leading `<!-- quiz-config … -->` exists (only whitespace before it), parse JSON and normalize `choiceCount` / `sourcePaths`. Remove the comment from the body.
2. If a leading `<!-- quiz-session … -->` exists (only whitespace before it), parse session JSON and remove the comment.
3. Split remaining body on `(?=^#+\s*(?:🔖\s*)?\d+)` (multiline).
3. For each block:
   - Parse heading label + optional type tag.
   - Collect numbered options; detect answer markers.
   - Collect `**정답:**` and blockquotes for sources / model answer / point / explanation.
   - Kind inference: type tag wins; else options → `choice`; else model answer → `subjective`.
4. Failure: empty / unparseable blocks are skipped (not fatal).

### 3. Value normalization

- `choiceCount`: round to int; clamp to `[2, 10]`; invalid → `4`.
- `sourcePaths`: trim, strip leading `/`, dedupe, POSIX separators.
- `disabledSourcePaths`: same normalization as `sourcePaths`; entries not in `sourcePaths` are dropped; omitted from serialized config when empty (all enabled).
- Choice `answer`: 1-based index; default `1` if no marker.

### 4. Canonical serialization

```html
<!-- quiz-config {"choiceCount":4,"sourcePaths":[]} -->
<!-- quiz-session {"version":1,"userAnswers":{"1":2},"gradedQuestions":{"1":true},"isSubmitted":false} -->

### N. [optional type tag] question

> **📚 근거 문서:**   (optional)
> - path

1. opt *(정답)*        (choice)
**정답:** …            (short)
> **📖 모범 답안:**    (essay)

> **💡 접근 Point!**
> …
>
> **📖 해설:**
> …

---
```

### 5. Non-goals

- Lucivy index is optional for RAG ranking; selected files are always readable via storage `readText`.
- Wrong-choice AI explanations are persisted in `quiz-session` as `wrongChoiceExplanations` (not inline in question blocks).
  - **재생성** appends below prior analysis with `---` separator.
  - **추가질문** appends a follow-up answer below prior analysis with `<hr/>`, block header `**[추가 질문 답변: …]**`.
- Per-question study memos are persisted in `quiz-session` as `questionMemos` (Markdown; edited via **메모작성** in 퀴즈 모드).

### AI generation logs (`.quiz/` sidecar)

AI-generated items (유사문제, 근거 출제) write a **per-question** markdown log under vault `.quiz/`, mirroring the quiz file path without the `.quiz.md` suffix:

| Quiz file | Log directory | Example log file |
|-----------|---------------|----------------|
| `notes/ch1/exam.quiz.md` | `.quiz/notes/ch1/exam/` | `.quiz/notes/ch1/exam/gen-1730000000.md` |

Each log records job metadata and every pipeline step (system prompt, instruction, model response / artifacts). Written via `src/utils/quiz/quizGenerationLog.ts`; UI queue panel links the path after save.

## Implementation

| Concern | Path |
|---------|------|
| Parse / serialize | `src/utils/quiz/parseQuizDocument.ts`, `serializeQuizDocument.ts`, `quizSessionPersist.ts` |
| Config | `src/utils/quiz/quizFileConfig.ts` |
| UI | `src/components/quiz/QuizPane.tsx` |
| Generation logs | `src/utils/quiz/quizGenerationLog.ts`, `QuizGenerationQueuePanel.tsx` |
| Route | `/quiz/<path>` via `src/utils/appHref.ts` |
| Settings | `src/components/settings/QuizSettings.tsx` |
