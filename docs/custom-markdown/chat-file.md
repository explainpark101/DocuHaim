# Chat file token (`[[file:…]]`)

채팅 메시지 본문에 넣는 비이미지 첨부 토큰. markdown-it 플러그인이 아니라 **채팅 첨부 전처리기**가 분리·카드 UI로 렌더한다. 일반 MdPreview만 쓰는 노트 본문에서는 기본적으로 해석하지 않는다.

## 문법

```markdown
[[file:path/to/doc.pdf|표시이름]]
[[file:path/to/doc.pdf|표시이름|12345]]
```

## Spec (interop)

기준 구현: `attachments.js` (`parseChatFileToken`, `extractChatBodyAttachments`).

### 1. Match (within chat body extractor)

Combined attachment scanner (order matters — wiki image first):

```js
/!\[\[([^\]]+)\]\]|\[\[file:([^|\]]+)(?:\|([^|\]]*?)(?:\|(\d+))?)?\]\]|\[\[note:([^|\]]+)(?:\|([^\]]*?))?\]\]/g
```

File branch captures:

| Group | Meaning |
|-------|---------|
| 2 | `path` (no `\|` or `]` inside) |
| 3 | optional `name` |
| 4 | optional decimal `size` bytes |

### 2. Parse (`parseChatFileToken`)

Input: inner after `file:` **or** full `path|name|size` string.

1. Split on `|` → `[path, name?, size?]`.
2. `path` trim; empty → invalid (`null`).
3. `name` = `sanitizeChatFileMeta(name || basename(path) || "file")`.
4. `size` = `Number(parts[2])` if present and finite; else `null`.

`sanitizeChatFileMeta`: replace `[` `]` `|` with `_`; trim; fallback `"file"`.

### 3. Structured output (not HTML)

Emit a descriptor (host renders a card):

```ts
{ kind: 'file', path: string, name: string, size: number | null }
```

Remove the matched token from the remaining plain-text body (preserve surrounding text/newlines via slice join).

### 4. Canonical serialization

```text
[[file:{path}|{name}]]
[[file:{path}|{name}|{size}]]   # size only when finite >= 0
```

Name/path must already be sanitized so `|` / brackets do not appear.

### 5. Non-goals

- Rendering as markdown-it HTML in note preview
- MIME sniffing inside the token
- `[[file:]]` for images (images use `![[…]]`)

## 구현

| 역할 | 경로 |
|------|------|
| 직렬화·파싱 | `src/utils/chatWithMyself/attachments.js` |
| OG/본문 스캔 | `src/utils/chatWithMyself/og.js` |
| 저장 경로 | `.chat-with-myself/files/YYYY-MM-DD/` (`paths.js`) |
