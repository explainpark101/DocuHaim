# Chat note token (`[[note:…]]`)

채팅에서 노트(마크다운 파일)를 공유할 때 쓰는 딥링크 토큰. 일반 Obsidian `[[wikilink]]`와 다르다.

## 문법

```markdown
[[note:notes/foo.md|표시 라벨]]
[[note:표시라벨|표시라벨]]
```

## Spec (interop)

기준 구현: `format.js` (`formatNoteShareToken`), `attachments.js` extractor.

### 1. Match

Same combined regex as [chat-file.md](./chat-file.md); note branch (groups after file + folder):

| Group | Meaning |
|-------|---------|
| 7 | `pathOrLabel` (no `\|` or `]` ) |
| 8 | optional display label |

### 2. Structured output

```ts
{ kind: 'note', path: string, name: string, size: null }
```

- `path` = capture 5 trimmed
- `name` = `sanitizeChatFileMeta(capture 6 || basename(path) || "note")`

### 3. Canonical serialization (`formatNoteShareToken`)

```text
if notePath empty:  [[note:{label}|{label}]]
else:               [[note:{notePath}|{label}]]
```

### 4. Host behavior (reference)

- Render a note card / deep-link from `path`.
- If the target note was deleted: **keep** the token in stored body; UI shows disabled state (do not strip on delete).

### 5. Non-goals

- Resolving bare `[[Note Name]]` without `note:` prefix
- Nested wiki links inside the label
- markdown-it plugin for note tokens in general note preview

## 구현

| 역할 | 경로 |
|------|------|
| 토큰 빌드 | `src/utils/chatWithMyself/format.js` (`formatNoteShareToken`) |
| 첨부 파서 | `src/utils/chatWithMyself/attachments.js` |
| 노트 참조 | `src/utils/chatWithMyself/noteRefs.ts` |
