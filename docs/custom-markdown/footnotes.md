# Footnotes / Sources (`[^1]`)

Numeric source footnotes. Body `[^N]` becomes an in-preview link; matching definitions at the **bottom** of the note render as a **Sources** list.

## Per-document enable (JSON comment)

Place **below** optional `<!-- note-cover … -->` at the document top:

```html
<!-- note-cover
{…}
-->
<!-- footnotes
{"v":1,"enabled":true}
-->
```

| Field | Type | Default | Meaning |
|-------|------|---------|---------|
| `v` | `1` | `1` | Schema version |
| `enabled` | boolean | `true` | When `false`, no body linking / no Sources block |

If the comment is omitted, footnotes stay **enabled** (compatible with existing notes).

`--` inside JSON must be escaped as `\u002d\u002d` (same rule as note-cover).

## Syntax (body + sources)

```markdown
Claim[^1]and more[^2]text.

[^1]: docs.docker.com - Define services in Docker Compose
https://docs.docker.com/reference/compose-file/services/

[^2]: github.com - Example issue
https://github.com/example/repo/issues/1
```

- **Ref (body):** `[^` + digits + `]` — no surrounding whitespace required
- **Definition (trailing only):** each entry is `[^N]:` (title) plus immediately following non-blank continuation lines (URL / extra text). **Blank lines may separate entries.**
- Unknown refs (no bottom definition) stay as plain text

## Global display mode

Settings → 마크다운 에디터 → **각주 표기 방식** (also Advanced Search):

| Mode | Preview |
|------|---------|
| `sup` (default) | `[^N]` in `<sup>` |
| `sub` | `[^N]` in `<sub>` |
| `rawText` | `[^N]` as normal-weight inline text |

Body always shows the literal form `[^N]` (not `[N]` / `^N`).

## Spec (interop)

Implementation: `noteFootnotesMeta.ts`, `footnoteMarkdownIt.ts`, `previewFootnotesSettings.ts`.

### 1. Grammar

```
FOOTNOTE_REF  := '[' '^' DIGITS+ ']'
SOURCE_LINE   := FOOTNOTE_REF ( ':' SP* )? REST_OF_LINE
DIGITS+       := /[0-9]+/
META_COMMENT  := '<!--' WS 'footnotes' WS JSON '-->'
```

### 2. Parse algorithm

0. **Guard (temporary):** disable markdown-it CommonMark `reference` block rule entirely (`md.disable('reference')`) so `[^N]: …` is never stored in `env.references`. After block parse, delete `env.references` as a safety net.
1. If a leading `<!-- footnotes … -->` exists (after optional note-cover / blanks), parse JSON; `enabled:false` disables the rest.
2. From the document end, collect trailing source **entries**. Each entry is a `SOURCE_LINE` header plus immediately following non-blank continuation lines (no blanks inside an entry). Blank lines between entries are allowed. Stop when the next non-blank group above has no header (that group is body).
3. Remove meta comment + sources block from the body before block parsing.
4. Replace each `FOOTNOTE_REF` (claim before built-in `link`) with a known label by an in-preview link token; unknown labels stay literal `[^N]` text (still claimed so reference-links cannot steal them).
5. After block parse, delete `env.references` so inline reference-links cannot resolve.
6. Append Sources HTML (when enabled).

### 3. Canonical HTML

| Part | HTML |
|------|------|
| Inline ref | `<a href="#" class="footnote-ref-link" id="fnref-N" data-md-footnote-to="source-N">` + wrapped `[^N]` + `</a>` |
| Wrap | `<sup\|sub class="footnote-ref">` or `<span class="footnote-ref footnote-ref--raw">` |
| Item | `<li id="source-N" …><p><span class="footnote-label">[^N]:</span> …</p></li>` |
| Backref | `<a href="#" class="footnote-backref" data-md-footnote-to="fnref-N">↩︎</a>` |

Navigation uses `data-md-footnote-to` (not URL hash / path) so HashRouter and SPA path handlers do not steal the click.

### 4. Non-goals

- Mid-document `[^N]:` definitions
- Non-numeric labels
- Novel / TipTap footnote UI

## Implementation

| Role | Path |
|------|------|
| Doc meta | `src/utils/noteFootnotesMeta.ts` |
| markdown-it | `src/utils/footnoteMarkdownIt.ts` |
| Display mode | `src/utils/previewFootnotesSettings.ts` |
| Preview scroll | `src/utils/previewFootnoteScroll.ts` |
| Global register | `src/config/mdEditorConfig.js` |
| Styles | `src/styles/md-editor-rt/footnotes.css` |
| AS commands | `settings-footnote-display-sup` / `-sub` / `-rawText` |
