# Chat folder token (`[[folder:…]]`)

채팅에서 금고 폴더를 하나의 카드로 공유할 때 쓰는 토큰. `[[note:…]]`와 같이 채팅 첨부 전처리기가 분리·카드 UI로 렌더한다.

## 문법

```markdown
[[folder:notes/project/|표시 라벨]]
[[folder:notes/project/|project]]
```

경로는 보통 trailing `/` 로 끝난다 (없어도 파서가 `/` 를 붙인다).

## Spec (interop)

기준 구현: `format.js` (`formatFolderShareChatBody`), `attachments.js` / `og.ts` extractor.

### 1. Match

Combined attachment scanner (order: wiki image → file → **folder** → note):

```js
/!\[\[([^\]]+)\]\]|\[\[file:([^|\]]+)(?:\|([^|\]]*?)(?:\|(\d+))?)?\]\]|\[\[folder:([^|\]]+)(?:\|([^\]]*?))?\]\]|\[\[note:([^|\]]+)(?:\|([^\]]*?))?\]\]/g
```

Folder branch:

| Group | Meaning |
|-------|---------|
| 5 | `path` (no `\|` or `]` ) |
| 6 | optional display label |

### 2. Structured output

```ts
{ kind: 'folder', path: string, name: string, size: null }
```

- `path` = capture 5 trimmed; if non-empty and not ending with `/`, append `/`
- `name` = `sanitizeChatFileMeta(capture 6 || basename(path) || "folder")`

### 3. Canonical serialization (`formatFolderShareChatBody`)

```text
[[folder:{folderPath}|{label}]]
```

`folderPath` always ends with `/` when non-empty. Strip leading `/`; replace `[` `]` `|` in path/label with `_`.

### 4. Host behavior (reference)

- Render a folder card.
- Tree → chat **drop stages** a folder chip in the composer; send includes `[[folder:…]]` with the message body.
- Click opens a picker listing **descendant files** currently loaded in the storage tree; selecting a file opens that note/file (same as note open).
- If the folder was deleted: **keep** the token; UI shows disabled state.

### 5. Non-goals

- Expanding a folder into many `[[note:]]` messages on share
- Uploading folder contents as chat attachments
- Resolving bare `[[Folder Name]]` without `folder:` prefix

## 구현

| 역할 | 경로 |
|------|------|
| 토큰 빌드 | `src/utils/chatWithMyself/format.js` (`formatFolderShareChatBody`) |
| 파서 | `attachments.js`, `og.ts` (`splitTextWithUrls`) |
| 트리 드롭 | `treeAttachDrop.ts` (`buildTreeNoteShareBodies`) |
| UI | `ChatFolderLinkCard.tsx`, `ChatFolderPickModal.tsx` |
