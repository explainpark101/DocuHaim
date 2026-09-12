# Print chrome (`<!-- print-chrome … -->`)

인쇄/PDF 페이지 크롬(쪽번호·고정 텍스트·고정 이미지)을 노트 마크다운 **리딩 메타** HTML 주석에 JSON으로 저장한다. Export PDF에서 paged.js `.pagedjs_page` / 표지 위에 오버레이로 그린다.

## 문법

```html
<!-- note-cover
{…}
-->
<!-- print-chrome
{"v":1,"showOnCover":false,"numbering":"body","templates":[…]}
-->
```

이어서 footnotes / document-settings(선택)와 일반 마크다운 본문.

## Spec (interop)

기준 구현: `src/utils/printChrome/parse.ts`, `src/utils/printChrome/types.ts`.

### 1. Leading comment match

```js
/<!--\s*print-chrome\s*([\s\S]*?)-->/i
```

- Accept only in the **leading metadata region**: before the comment, only BOM/whitespace and/or `note-cover` / `print-chrome` / `footnotes` / `document-settings` comments.
- Capture group 1 = raw JSON payload.
- Body = document with that comment removed (trim one leading newline if present).

If no valid leading match → `{ chrome: null, body: original }`.

Canonical leading order:

1. Optional `<!-- note-cover … -->`
2. Optional `<!-- print-chrome … -->`
3. Optional `<!-- footnotes … -->`
4. Optional `<!-- document-settings … -->`
5. Body markdown

### 2. `--` escaping inside JSON

Same as note-cover:

```text
escape:   "--" → "\\u002d\\u002d"
unescape: "\\u002d\\u002d" → "--" before JSON.parse
```

Canonical serialize:

```text
<!-- print-chrome\n{escapedJson}\n-->
```

### 3. JSON schema (`PrintChromeDoc`, `v = 1`)

```ts
type PrintChromePosition =
  | 'top-left' | 'top-center' | 'top-right'
  | 'middle-left' | 'middle-right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right';

type PrintChromeNumbering = 'document' | 'body';

type PrintChromeDoc = {
  v: 1;
  showOnCover: boolean;            // default false
  numbering: PrintChromeNumbering; // default 'body'
  templates: PrintChromeTemplate[];
};

type PrintChromePlacement = { xPercent: number; yPercent: number }; // 0–100, item center

type PrintChromeTemplateBase = {
  id: string;
  enabled: boolean;
  position: PrintChromePosition;
  /** Free placement for all pages (overrides named position when set). */
  placement?: PrintChromePlacement | null;
  /** Per-page overrides. Keys: `cover` | `body:{0-based}`. Wins over placement/position. */
  pagePlacements?: Record<string, PrintChromePlacement>;
};

type PrintChromeTemplate =
  | {
      type: 'page-number';
      // ...base
      fontFamily: string;         // trim; may be ''
      fontSizePx: number;         // clamp 8–72; default 10
      format: string;             // default "{page}/{total}"; tokens {page} {total}
    }
  | {
      type: 'text';
      // ...base
      fontFamily: string;
      fontSizePx: number;
      text: string;
    }
  | {
      type: 'image';
      // ...base
      path: string;               // vault-relative; trim; may be ''
      widthPx: number;            // clamp 8–800; default 48
      heightPx: number;           // clamp 8–800; default 48
    };
```

Normalization:

- Unknown `type` → drop template.
- Invalid `position` → type default (`page-number` → `bottom-center`, `text` → `top-center`, `image` → `top-right`).
- Missing `id` → generate a new id.
- `placement` / `pagePlacements` entries: clamp x/y to 0–100; drop invalid.
- Persist comment when templates.length > 0, or `showOnCover`, or `numbering !== 'body'`. Otherwise upsert removes the comment.

### 4. Numbering

| `numbering` | Cover | Body page `i` (0-based) | `{total}` |
|-------------|-------|-------------------------|-----------|
| `body` | page-number templates omitted | `{page}=i+1` | body page count |
| `document` | `{page}=1` when cover present | `{page}=i+2` if cover else `i+1` | cover(0/1) + body count |

`text` / `image` on cover still respect `showOnCover` independently of numbering.

### 5. Free placement (preview drag)

- Export PDF: drag a **page-number** overlay, then confirm **모든 페이지** (`placement`, clear `pagePlacements`) or **이 페이지만** / **표지만** (`pagePlacements[pageKey]`).
- Resolve order: `pagePlacements[pageKey]` → `placement` → named `position`.

### 6. Render (non-goals for other engines)

- Canonical HTML is **not** required for interop; engines may emit absolute overlays per page box.
- This app mounts overlays on each paged.js page and optional cover; inset follows per-side page margins (`--print-page-margin-*`) or a small edge inset when margins are 0.

### Non-goals

- CSS `@page` margin boxes as the storage/render mechanism.
- Odd/even-only rules, running headers from H1.
- Global vault `.settings` chrome (per-note comment only).

## Options / attrs

See schema above. Image `path` empty → skip paint. Format tokens: `{page}`, `{total}` only. Default new page-number format: `{page}/{total}`.

Page **sheet** margins (top/right/bottom/left mm + presets) live in print layout settings (Export PDF / 페이지 크롬 UI), not inside the `print-chrome` comment.

## Implementation

| Role | Path |
|------|------|
| Types | `src/utils/printChrome/types.ts` |
| Parse / upsert / rebuild | `src/utils/printChrome/parse.ts` |
| Overlay UI | `src/components/print/PrintChromeLayer.tsx` |
| Modal | `src/components/print/PrintChromeModal.tsx` |
| Export PDF wiring | `src/pages/exportPdf/` hooks + shell |
