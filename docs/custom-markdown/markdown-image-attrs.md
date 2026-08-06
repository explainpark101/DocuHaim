# Standard image size attrs (`![](){…}`)

표준 마크다운 이미지 뒤에 `{attrs}` 블록을 붙여 크기·배경을 지정한다. 위키 이미지와 옵션 키는 비슷하지만, bare `320` / `320x200` 형태는 **위키 전용**.

## 문법

```markdown
![alt](src){w=320 h=200 bg=#fff}
![alt](./relative.png){width=480}
![설명](photos/a.png){w=50% h=240}
```

## Spec (interop)

기준 구현: `parseMarkdownImageAttrsBlock` / `markdown-image-size-attrs` ruler in `wikiImageMarkdownIt.js`.

### 1. When to apply

1. Parse a normal CommonMark/GFM image → image node with `src`, `alt`.
2. If the **immediately following** text node (same inline context) begins with `{…}`, consume that attrs block.

```text
ATTRS := "{" INNER "}"
INNER := /[^}\n]+/     # no } or newline inside
```

Match only at the **start** of the following text: `/^\{([^}\n]+)\}/`.

Trailing text after `}` stays as a separate text node.

If there is no following text node, or it does not start with `{`, leave the image unchanged (still may set `data-md-src` / storage placeholder — see below).

### 2. `parseMarkdownImageAttrsBlock`

Strip outer `{` `}`. Split `INNER` on `/[,\s]+/`.

Only `key=value` chunks (no bare `320` / `320x200`):

| Key | Value |
|-----|--------|
| `w` / `width` | `normalizeSizeValue` (same as wiki-image) |
| `h` / `height` | `normalizeSizeValue` |
| `bg` / `background` | `normalizeCssHexColor` |

Unknown keys / invalid values: skip. Empty INNER → all nulls (no style).

Unlike wiki options, an attrs block that recognizes nothing still **consumes** the `{…}` from the source text once matched by `/^\{([^}\n]+)\}/` — implementers should match the block first, then parse; the reference impl always strips a well-formed `{…}` prefix when present after an image.

### 3. Canonical HTML attributes

On the image node:

| Attribute | Rule |
|-----------|------|
| `data-md-src` | original destination `src` (always set when src exists) |
| `src` | if destination is a **storage-relative** path (not `http(s):`, `data:`, `blob:`, `//`, `#`, `mailto:`, `tel:`, `javascript:`), replace with placeholder GIF and set `data-storage-image="1"`; else keep original src |
| `data-md-width` / `data-md-height` / `data-md-bg` | when parsed |
| `style` | same `buildWikiImageStyle` as wiki-image |

Storage-path detection: decode URI component of destination; reject schemes above; remaining non-empty paths are storage keys (resolve relative to note directory in the host).

Example:

```html
<img src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" alt="alt" data-md-src="photos/a.png" data-storage-image="1" data-md-width="320px" style="width:320px;">
```

### 4. Canonical write-back

```text
{w=WIDTH h=HEIGHT bg=HEX}
```

Omit empty keys; space-separated. Empty → no `{}` suffix.

### 5. Non-goals

- Pandoc/Kramdown attribute syntax beyond this `{w=…}` subset
- Title-part abuse (`![alt](src "title")`) for size
- Wiki bare size forms on `![]()`

## 구현

| 역할 | 경로 |
|------|------|
| attrs 파서·갱신 | `src/utils/wikiImageSyntax.js` |
| markdown-it ruler | `src/utils/wikiImageMarkdownIt.js` (`markdown-image-size-attrs`) |
| storage path | `src/utils/storageImagePath.ts` |
| Hydration / export | `src/utils/storageImageHydration.ts`, `markdownImageExport.ts` |
