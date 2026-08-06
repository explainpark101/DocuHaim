# Wiki image (`![[…]]`)

Obsidian 스타일 위키 이미지. 스토리지 상대 경로를 가리키며, 미리보기에서 hydration으로 실제 URL을 채운다.

## 문법

```markdown
![[path/to/image.png]]
![[path/to/image.png|320]]
![[path/to/image.png|320x200]]
![[path/to/image.png|w=50% h=240]]
![[path/to/image.png|width=480]]
![[path/to/image.png|bg=#ffffff]]
![[path/to/image.png|w=320 bg=#fff]]
```

캡션(암시적):

```markdown
![[photos/cover.jpg|w=480]]
표지 사진 설명
```

## Spec (interop)

다른 Markdown 엔진에 포팅할 때의 계약. 기준 구현: `wikiImageSyntax.js` + `wikiImageMarkdownIt.js`.

### 1. Match

```text
WIKI_IMAGE := "!" "[[" INNER "]]"
INNER      := /[^[\]]+/   # no nested [ or ]
```

Regex (global, on plain-text leaves only — not inside code spans/fences if your engine already split them):

```js
/!\[\[([^[\]]+)\]\]/g
```

Scan **text nodes** left-to-right. Unmatched leftovers stay as text.

### 2. Split path / options

Given `INNER` trimmed:

1. Let `pipe = lastIndexOf('|')`.
2. If `pipe < 0` → `{ path: INNER, width: null, height: null, background: null }`.
3. Else:
   - `pathCandidate = INNER.slice(0, pipe).trim()`
   - `optionCandidate = INNER.slice(pipe + 1).trim()`
   - `opts = parseWikiImageOptions(optionCandidate)`
   - If `!pathCandidate || !opts` → treat **entire** `INNER` as `path` (options ignored; no attrs). This allows paths that contain `|` when the suffix is not a valid option string.
   - Else → `{ path: pathCandidate, ...opts }`.

Empty path after parse → do **not** emit an image; keep the original `![[…]]` as literal text.

### 3. `parseWikiImageOptions(option)`

If `option` empty → `null` (invalid).

**Whole-string forms** (checked first):

| Pattern | Result |
|---------|--------|
| `^(\d+)$` | `{ width: "$1px", height: null, background: null }` |
| `^(\d+)x(\d+)$` (i) | `{ width: "$1px", height: "$2px", background: null }` |

**Chunk form**: split on `/[,\s]+/`, drop empties. For each chunk:

| Chunk | Effect |
|-------|--------|
| `^(\d+)$` | set `width = "$1px"` |
| `^(\d+)x(\d+)$` (i) | set width/height px |
| `key=value` | see keys below |

Keys (case-insensitive):

- `w` / `width` → `normalizeSizeValue(value)`
- `h` / `height` → `normalizeSizeValue(value)`
- `bg` / `background` → `normalizeCssHexColor(value)` (null → skip)

`normalizeSizeValue`: trim; `^\d+$` → `Npx`; else must match `^\d+(\.\d+)?(px|%|vh|vw)$`; else reject chunk.

If **no** chunk was recognized → return `null` (whole option invalid).

Unrecognized `key=` chunks are skipped; they do not invalidate siblings if at least one chunk was recognized.

### 4. Hex color (`normalizeCssHexColor`)

See [README Spec conventions](./index.md#spec-conventions-all-features). Output `#rrggbb` or `#rrggbbaa` lowercase.

### 5. Canonical HTML (pre-hydration)

Emit a void `<img>` (or equivalent AST image node) with:

| Attribute | When |
|-----------|------|
| `src` | always placeholder GIF (see README) |
| `alt` | `""` |
| `data-wiki-path` | path (required) |
| `data-wiki-width` | normalized width string if set |
| `data-wiki-height` | normalized height string if set |
| `data-wiki-bg` | normalized hex if set |
| `style` | `buildWikiImageStyle`: `width:…;height:…;background-color:…;` for present fields |

Example:

```html
<img src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" alt="" data-wiki-path="photos/a.png" data-wiki-width="320px" data-wiki-bg="#ffffff" style="width:320px;background-color:#ffffff;">
```

**Hydration** (resolve `data-wiki-path` → real `src`) is app-specific and **out of scope** for a generic parser. Keep attributes so a host can hydrate later.

### 6. Caption post-process

No dedicated caption syntax. After wiki images are recognized, fold captions:

**A. Same paragraph** (image + break + caption inline):

```text
paragraph:
  wiki_image, (softbreak|hardbreak), captionInlineTokens...
```

Conditions: first child is wiki image; second is soft/hard break; remaining children include at least one `text` with non-whitespace. Transform to:

```html
<figure>
  <!-- image only -->
  <figcaption><!-- captionInlineTokens (keep emphasis etc.) --></figcaption>
</figure>
```

Do **not** insert a `<br>` between image and caption.

**B. Adjacent paragraphs**:

```text
paragraph: [wiki_image only]
paragraph: [caption tokens with non-empty text]
```

Same `<figure>` / `<figcaption>` fold. Image paragraph must contain **exactly one** child: the wiki image.

If caption has no non-empty text → leave paragraphs unchanged.

### 7. Canonical write-back (editor resize)

When serializing attrs back to source, prefer:

```text
![[path]]
![[path|w=WIDTH h=HEIGHT bg=HEX]]
```

Omit absent keys; join options with a single space. (`wikiImageMarkupFromAttrs`)

### 8. Non-goals

- General `[[wikilink]]` without `!`
- Nested brackets inside path
- Non-hex CSS colors (`rgb()`, named colors)
- Bare `320` / `320x200` on **standard** `![]()` images (see [markdown-image-attrs.md](./markdown-image-attrs.md))

## 구현

| 역할 | 경로 |
|------|------|
| 파서/옵션 | `src/utils/wikiImageSyntax.js` |
| markdown-it | `src/utils/wikiImageMarkdownIt.js` |
| URL / 캐시 | `src/utils/wikiImageResolver.js`, `wikiImageCacheDb.js`, `wikiImageSettings.js` |
| Hydration | `src/utils/storageImageHydration.ts`, `src/hooks/useWikiImageHydration.js` |
| TipTap (Novel) | `src/extensions/wikiImageTiptap.js`, `src/utils/wikiImageHtmlInject.js` |
| Hex helper | `src/utils/cssColor.ts` |

관련 스킬: `.cursor/skills/md-editor-rt-wiki-image/`
