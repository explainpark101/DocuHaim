# Chat saved note (`<!-- chat-with-myself … -->`)

채팅 메시지를 “노트로 저장”할 때 노트 본문 상단에 넣는 메타 주석. MdPreview에서는 주석 + 인용 + 링크를 하나의 카드로 접는다.

## 저장 마크업 (전형)

```markdown
<!-- chat-with-myself id="msgId" at="ISO" group="그룹명" href="/chat#msg-…" notePath="notes/….md" -->

> 그룹명 · 날짜시간

[채팅에서 저장된 노트](/chat#msg-…)

메시지 본문…
```

## Spec (interop)

기준 구현: `format.js` (`parseChatWithMyselfNoteMeta`, `formatChatMessageAsNoteMarkdown`) + `chatSavedNoteMarkdownIt.js`.

### 1. Meta comment

```text
META := "<!--" WS "chat-with-myself" WS ATTRS "-->"
```

Match: `/<!--\s*chat-with-myself\s+([^>]*?)-->/`

Attrs use the same `key="value"` + escape rules as [chat-day-file-comments.md](./chat-day-file-comments.md).

| Attr | Required | Notes |
|------|----------|-------|
| `id` | soft | message id; may be empty if `href` present |
| `href` | soft | chat deep link; default `/chat#msg-{id}` style |
| `at` | no | ISO timestamp |
| `group` | no | display group name (unescape) |
| `notePath` / `note-path` | no | saved note path |

Invalid if both `id` and `href` missing/empty.

### 2. Source shape produced by the app

Canonical generator order:

1. Meta comment line
2. Blank line
3. Blockquote: `> {group} · {formattedDateTime}`
4. Blank line
5. Link paragraph: `[채팅에서 저장된 노트]({href})` (legacy label also: `채팅으로 이동`)
6. Optional thread sections (`### 원본 메시지` / `### 답장`)
7. Message body

### 3. Preview fold algorithm (after inline parse)

Scan block tokens left → right:

1. If token is HTML block/inline whose content matches the meta comment → start a fold.
2. Optionally consume one following **blockquote** (any depth-balanced `blockquote_open`…`blockquote_close`).
3. Optionally consume one following **paragraph** that is only a single link (whitespace/breaks ignored) whose `href` matches:

   ```js
   /(?:^|\/)chat(?:\/)?(?:#|%23)msg-/i
   // or contains /#msg-/
   ```

   Link text ideally matches `/채팅으로\s*이동|채팅에서\s*저장된\s*노트/`, but **accept** `/chat#msg-` hrefs even if the label was customized.

4. Replace the consumed span with one HTML block: the card (below). **Do not** alter the source markdown on disk.

### 4. Canonical card HTML

```html
<a class="md-chat-saved-note" href="{href}" data-chat-saved-note="1" data-chat-href="{href}" data-chat-id="{id}">
  <span class="md-chat-saved-note__icon" aria-hidden="true"></span>
  <span class="md-chat-saved-note__body">
    <span class="md-chat-saved-note__title">채팅에서 저장된 노트</span>
    <span class="md-chat-saved-note__hint">탭하여 원본 채팅으로 이동</span>
  </span>
  <span class="md-chat-saved-note__arrow" aria-hidden="true">→</span>
</a>
```

HTML-escape `href` and `id` in attributes. Styling is host CSS (`chat-saved-note.css`).

### 5. Non-goals

- Folding when meta comment is missing
- Requiring the blockquote (optional in fold)
- Changing export/print to expand the card back to comment+quote (source remains authoritative)

## 구현

| 역할 | 경로 |
|------|------|
| 메타 파서·노트 본문 생성 | `src/utils/chatWithMyself/format.js` |
| markdown-it | `src/utils/chatSavedNoteMarkdownIt.js` |
| CSS | `src/styles/md-editor-rt/chat-saved-note.css` |
| 전역 등록 | `src/config/mdEditorConfig.js` |
