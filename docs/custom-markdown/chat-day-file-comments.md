# Chat day-file HTML comments

채팅 “나 자신과 대화” 일별 마크다운 파일(`.chat-with-myself/YYYY-MM-DD.md`)의 **저장 포맷**. MdPreview 본문 문법이 아니라 메시지 경계·메타데이터 마커다.

## 문법 (개요)

```html
<!-- chat-msg id="…" at="…" tz="…" source="compose" group="나" … -->
메시지 본문

<!-- chat-msg-deleted id="…" at="…" -->
```

## Spec (interop)

기준 구현: `format.js` (`parseDayFile`, `serializeMessage`, `serializeDeletedMarker`).

### 1. Attribute grammar (all chat HTML comments)

```text
ATTRS := ( WS KEY "=" '"' VALUE '"' )*
KEY   := /[\w-]+/
VALUE := /[^"]*/          # after unescape on read
```

Parse: `/([\w-]+)="([^"]*)"/g` over the attribute region.

**Write escape** (`escapeAttr`): `&` → `&amp;`, `"` → `&quot;`, `<` → `&lt;`, `\r\n`/`\n` → `&#10;`, strip lone `\r`.

**Read unescape** (`unescapeAttr`): reverse `&#10;`, `&lt;`, `&quot;`, `&amp;` (order: `&#10;` then `&lt;` then `&quot;` then `&amp;`).

### 2. Message start

```text
MSG_START := "<!--" WS "chat-msg" WS ATTRS "-->" WS?
```

Regex: `/<!--\s*chat-msg\s+([^>]*?)-->\s*/g`

**Required attrs:** `id`, `at` (ISO UTC).  
**Common attrs:** `tz`, `source`, `group`.  
**Optional:** `replyTo`, `replySnippet`, `replyGroup`, `editedAt`, `pinnedAt`, `notePath`, `collapsed` (`"1"`), `markdown` (`"1"`), `reactions`, `reactionsAt`.

**Body region:** from end of start marker to the next `chat-msg` start (or EOF). Strip leading single `\n`, trailing newlines. Strip interleaved `chat-msg-deleted` markers found inside the slice from the body text (tombstones are global, not part of body).

`markdown` truthy values on read: `true` | `"1"` | `"true"`; missing → false.

### 3. Deletion tombstone

```text
MSG_DELETED := "<!--" WS "chat-msg-deleted" WS ATTRS "-->"
```

Regex: `/<!--\s*chat-msg-deleted\s+([^>]*?)-->/g`

Attrs: `id` (required), `at` (optional; default epoch ISO if missing when indexing).

Canonical write:

```html
<!-- chat-msg-deleted id="{id}" at="{at}" -->\n
```

### 4. Day file layout

```text
DAY_FILE := ( MSG | TOMBSTONE | other )*
```

Messages and tombstones may be interleaved. Parser collects all tombstones into `deletedIds` / `deletedAtById`, then walks all `chat-msg` starts for message list.

### 5. Legacy (optional to implement)

- Trailing `<!-- chat-edits id="…" -->…<!-- /chat-edits -->` — legacy inline history; prefer sidecar `.chat-with-myself/edits/<id>/`.
- Edit version files: `<!-- chat-edit-version at="…" group="…" -->` (`editHistory.ts`).

### 6. Non-goals

- Rendering these comments as visible Markdown
- JSON body instead of HTML comments (not the on-disk format)

## 구현

| 역할 | 경로 |
|------|------|
| 직렬화·파싱 | `src/utils/chatWithMyself/format.js` |
| reactions attr | `src/utils/chatWithMyself/reactions.js` |
| 일별 경로 | `src/utils/chatWithMyself/paths.js` |
