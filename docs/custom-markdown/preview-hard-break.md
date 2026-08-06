# Preview hard break (`<br/>`)

Mirror Edit에서 **프리뷰 쪽 캐럿**으로 Enter 할 때, 빈 단락 줄 대신 HTML hard break를 넣는다.

## Syntax

```markdown
첫 줄<br/>
둘째 줄
```

Canonical insertion (editor):

```text
<br/>\n
```

## Spec (interop)

### Grammar

- Inline HTML break: `<br/>` | `<br />` | `<br>`
- Optional following newline in source (this app always inserts `<br/>` + `\n`)

### Parse / render

1. Markdown engine must allow raw HTML (CommonMark `html` / markdown-it default).
2. The tag becomes a hard line break in the paragraph (or other inline container).
3. Canonical HTML output: `<br>` or `<br/>` (void element). XSS allowlists must keep `br`.

### Editor behavior (this app)

1. Applies only when Mirror Edit caret originated from the **preview** (`isMirrorEditCaretFromPreview`).
2. List continuation (GFM list Enter) still uses the normal list ContinueMarkup path first.
3. Source-pane Enter (caret not from preview) keeps a normal markdown newline.

### Caret mapping

Preview plain text treats each `<br>` as one `\n` so the mirrored caret can sit on the line after the break (DOM `textContent` alone concatenates lines).

### Non-goals

- Not a custom shortcode; stock HTML break.
- Does not change Soft-break / `breaks: true` markdown-it options globally.

## Implementation

| 역할 | 경로 |
|------|------|
| Enter → insert | `src/utils/previewHardBreak.ts`, `MarkdownEditor.jsx` (`markdownEnterSingleNewline`) |
| XSS `br` | `src/config/mdEditorConfig.js` |
| Caret / plain mapping | `src/utils/previewSelectionSync.ts` (`getPreviewPlainWithBreaks`) |
