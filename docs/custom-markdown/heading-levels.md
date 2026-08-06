# Extended ATX headings (h7–h10)

표준 ATX는 h1–h6(`#`…`######`)까지. 앱에서는 `#` 최대 10개까지 파싱한다.

## 문법

```markdown
# h1
…
###### h6
####### h7
######## h8
######### h9
########## h10
```

`#` 뒤에는 공백(또는 탭)이 필요하다.

## Spec (interop)

기준 구현: `markdownItHeadingLevels.ts`, constants in `markdownHeadings.ts`.

### 1. Constants

```text
MAX_APP_HEADING_LEVEL    = 10
MAX_EXPORT_HEADING_LEVEL = 6
```

### 2. Grammar (ATX-like)

Replace the engine’s ATX heading rule (levels 1–6) with:

```text
ATX := MARKER SPACES CONTENT OPTIONAL_CLOSING_HASHES
MARKER := "#{1,10}"     # at most MAX_APP_HEADING_LEVEL
```

Rules aligned with CommonMark ATX:

- Indentation: line indent relative to block indent must be `< 4` spaces (same as md default).
- After the run of `#`, next char must be space/tab **or** end of line (reject `###not-a-heading`).
- Trailing `#` run may be stripped when preceded by space (CommonMark closing sequence).
- Content is trimmed.

### 3. Canonical HTML

| Level | Tag | Extra attrs |
|-------|-----|-------------|
| 1–6 | `h{level}` | none required |
| 7–10 | `h6` | `data-heading-level="{N}"` and `class="md-heading md-heading-{N}"` |

Rationale: HTML only defines h1–h6; XSS whitelists and browsers stay valid while CSS/TOC can read `data-heading-level`.

Example:

```html
<h6 data-heading-level="8" class="md-heading md-heading-8">Deep section</h6>
```

### 4. TOC / remapping hosts

Hosts that build TOC or remap headings should use **logical** level 1–10 (from `#` count or `data-heading-level`), not the HTML tag name alone.

### 5. Non-goals

- Setext headings for levels > 2
- More than 10 hashes (reject / do not treat as heading)
- Emitting invalid `<h7>`…`<h10>` tags

## 구현

| 역할 | 경로 |
|------|------|
| 상수·리맵 | `src/utils/markdownHeadings.ts` |
| markdown-it | `src/utils/markdownItHeadingLevels.ts` |
| marked (Novel) | `src/utils/markedHeadingLevels.ts` |
| TipTap | `src/extensions/novelHeading.ts` |
| 툴바 | `src/components/MarkdownHeadingRemapToolbar.tsx` |
