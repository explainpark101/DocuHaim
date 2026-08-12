# Document settings (`<!-- document-settings … -->`)

Per-document settings for the editor, preview, and PDF export. This is a hidden HTML comment block placed near the top of the document, after an optional note cover / footnotes meta block.

## Syntax

```html
<!-- note-cover
{...}
-->
<!-- footnotes
{"v":1,"enabled":true}
-->
<!-- document-settings
{
  "v": 1,
  "sourceList": {
    "show": true,
    "title": "Sources"
  },
  "fonts": {
    "body": "Noto Sans KR",
    "heading": "Noto Serif KR",
    "bold": "Noto Sans KR",
    "code": "JetBrains Mono"
  },
  "webfontCss": "@import url('https://fonts.googleapis.com/css2?family=...');"
}
-->
```

## Spec (interop)

Implementation: `src/utils/documentSettingsMeta.ts`, `src/components/DocumentSettingsModal.jsx`, `src/components/MarkdownEditor.jsx`, `src/pages/ExportPDFPage.jsx`, `src/utils/footnoteMarkdownIt.ts`.

### 1. Grammar

```text
DOCUMENT_SETTINGS_COMMENT := '<!--' WS 'document-settings' WS JSON '-->'
JSON := object with keys:
  v: 1
  sourceList: { show: boolean, title: string }
  fonts: { body: string, heading: string, bold: string, code: string }
  webfontCss: string
```

The parser accepts the comment only when it appears in the leading metadata region:

1. Optional BOM / whitespace.
2. Optional `<!-- note-cover … -->`.
3. Optional `<!-- footnotes … -->`.
4. Then `<!-- document-settings … -->`.

If the comment appears later in the body, it is ignored and left as normal text.

### 2. Parse algorithm

1. Find the first `<!-- document-settings … -->` block in the leading metadata region.
2. Parse the payload as JSON after unescaping `\u002d\u002d` back to `--`.
3. Normalize missing or invalid values to defaults.
4. Remove the comment from the rendered markdown body before downstream parsing.

Failure behavior:

- Invalid JSON falls back to the default settings shape.
- Missing keys fall back individually.
- Unknown keys are ignored.

### 3. Value normalization

- `sourceList.show`: any value other than `false` becomes `true`.
- `sourceList.title`: trimmed string; empty string falls back to `Sources`.
- `fonts.*`: each field is a free-form CSS `font-family` string. No extra validation is applied beyond string type.
- `webfontCss`: raw CSS text. Stored as-is and injected into preview / PDF as a `<style>` block.

### 4. Canonical output

The comment is serialized as:

```html
<!-- document-settings
{"v":1,"sourceList":{"show":true,"title":"Sources"},"fonts":{"body":"...","heading":"...","bold":"...","code":"..."},"webfontCss":"..."}
-->
```

The JSON payload is escaped for HTML comments by replacing `--` with `\u002d\u002d`.

### 5. Behavior

- `sourceList.show = false` hides the rendered bottom Sources section, but keeps body footnote links active.
- `sourceList.title` changes the visible heading for the bottom list.
- `fonts` drives the document body, headings, bold text, and code fonts in preview and PDF.
- `webfontCss` is document-local and applies only to the current document.

### 6. Non-goals

- This is not a new inline Markdown token.
- It does not define note-cover layout or chat metadata.
- It does not replace the global print font settings; it only overrides them for the current document.

## Implementation

| Role | Path |
|------|------|
| Meta parse / serialize | `src/utils/documentSettingsMeta.ts` |
| Editor modal | `src/components/DocumentSettingsModal.jsx` |
| File menu entry | `src/components/EditorPane.jsx` |
| Preview font application | `src/components/MarkdownEditor.jsx`, `src/styles/md-editor-rt/footnotes.css` |
| PDF font application | `src/pages/ExportPDFPage.jsx` |
| Sources list title / visibility | `src/utils/footnoteMarkdownIt.ts` |

