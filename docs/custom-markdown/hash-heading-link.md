# In-document hash heading links (`#…`)

Same-file Markdown links whose `href` starts with `#` scroll to a heading in that note. They must **not** open a new browser tab / window.

Standard CommonMark link syntax — this document defines **click / scroll behavior** and **heading match rules**.

## 문법

```markdown
# Introduction

See [the intro](#introduction) or [한글 제목](#한글-제목).

## 한글 제목
```

- `href` must start with `#` (fragment only). Paths like `/view/a.md#x` are **not** covered here (app route + optional hash).
- Footnote hashes (`#source-N`, `#fnref-…`) use a separate preview footnote navigator — out of scope.

## Spec (interop)

기준 구현: `src/utils/noteDocumentHashLink.ts` + Haim `HaimLink` + preview click in `MarkdownEditor`.

### 1. Grammar

```text
HASH_HREF := "#" FRAGMENT?
FRAGMENT  := /.*/   # after `#`; may be percent-encoded
```

### 2. Normalize fragment

1. Require `href` starts with `#`
2. Take body after `#` (may be empty)
3. `decodeURIComponent` (on failure, keep raw body)
4. Footnote-shaped fragments → do **not** treat as heading hash (other handler owns them)

### 3. Heading match (first wins, document order)

Given fragment `F` and a heading with text `T` and optional DOM/id `I`:

1. If `I` equals `F` (or encoded form) → match
2. Else if normalize-whitespace lowercase `T` equals same for `F` → match
3. Else if `slugify(T) === slugify(F)` → match

**slugify** (GitHub-ish):

1. trim, lowercase, Unicode NFC (keep Hangul syllables composed)
2. drop characters outside letters / numbers / whitespace / hyphen (keep CJK / Hangul via Unicode letter class)
3. whitespace → `-`; collapse `-`; strip leading/trailing `-`

Empty fragment `#` → scroll the note surface to the top (no heading required).

### 4. Canonical HTML

```html
<a href="#introduction">the intro</a>
```

Do **not** set `target="_blank"` on hash-only hrefs. External http(s) links may still use `target="_blank"` via the preview/Haim defaults.

### 5. Click → scroll (do not navigate away)

1. Prefer mark/`href` attribute over `HTMLAnchorElement.href` (browser may absolutize `#x` against the app URL).
2. If hash-only:
   - **Haim WYSIWYG**: find matching `heading` / `deepHeading` in the TipTap doc; focus + scroll the editor scroller
   - **Haim source (CM)**: find ATX line `#{1,10} title` whose title matches; scroll CM
   - **md-editor / HTML preview**: find `h1–h6` under the preview root (id or text/slug); expand folded heading sections if needed; scroll the preview scroller
3. Never `window.open` / temporary `target=_blank` anchor for these hrefs

### 6. Non-goals

- Generating permanent GitHub-style `id` attributes on every heading in the editor (match works without ids)
- Cross-file `#` fragments (`docuhaim://path#id`) — open the note first; hash-after-path may be added later
- Changing CommonMark parse of `[text](#x)`

## Implementation

| Surface | Path |
|---------|------|
| Match + scroll helpers | `src/utils/noteDocumentHashLink.ts` |
| Haim WYSIWYG click / HTML | `src/components/haimEditor/extensions/HaimLink.ts` |
| Haim hover 「열기」 | `src/components/haimEditor/HaimLinkHoverHint.tsx` |
| Haim source Mod+click | `src/components/haimEditor/HaimSourcePane.tsx` |
| Safety: never new-tab hash | `src/utils/openHaimLinkHref.ts` |
| md-editor preview click | `src/components/editor/MarkdownEditor.jsx` |
| Preview `target=_blank` skip | `src/utils/previewLinkTargetBlankMarkdownIt.ts` + `shouldOpenPreviewLinkInNewTab` |
