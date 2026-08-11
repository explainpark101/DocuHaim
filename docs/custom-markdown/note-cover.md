# Note cover (`<!-- note-cover … -->`)

인쇄/PDF 표지 레이아웃을 노트 마크다운 **최상단** HTML 주석에 JSON으로 저장한다. 본문 MdPreview에서는 strip하고, Export UI에서 별도 렌더한다.

## 문법

```html
<!-- note-cover
{"v":2,"enabled":true,"pageSizeId":"a4","layout":{…},"bg":{…},"rootLayerIds":[…],"groups":[…],"elements":[…]}
-->
```

이어서 일반 마크다운 본문.

## Spec (interop)

기준 구현: `noteCover/parse.ts`, `noteCover/types.ts`.

### 1. Leading comment match

```js
/^[\uFEFF\s]*<!--\s*note-cover\s*([\s\S]*?)-->/
```

- Only at document start (optional BOM/whitespace).
- Capture group 1 = raw JSON payload (may span lines).
- Body = remainder after the full match; strip one leading newline if present.

If no match → `{ cover: null, body: original }`.

### 2. `--` escaping inside JSON

HTML comments cannot contain `--`. On write:

```text
escape:   replace all "--" with "\\u002d\\u002d" in the JSON string
unescape: replace "\\u002d\\u002d" with "--" before JSON.parse
```

Canonical serialize:

```text
<!-- note-cover\n{escapedJson}\n-->
```

`upsert`: replace/remove leading comment; if cover is null, return body only; else `comment + "\n" + body` (strip BOM from body).

### 3. JSON schema (`NoteCover`, `v = 2`)

```ts
type NoteCover = {
  v: 2;
  enabled: boolean;           // default true; only false when explicitly false
  pageSizeId: PrintPageSizeId; // paper while designing; default 'a4' if missing/invalid
  layout: {
    align: 'left' | 'center' | 'right';  // default 'center'
    containerWidthPct: number;           // always normalized to 100
    gapPx: number;                       // clamp 0–400; legacy gapPct ≈ A4@96dpi
  };
  bg: {
    color: string;      // non-empty trim or default '#ffffff'
    imagePath: string;  // trim; may be ''
  };
  rootLayerIds: string[];  // front-first stack of element or group ids
  groups: CoverGroup[];
  elements: CoverElement[];
};

type CoverGroup = {
  id: string;
  name: string;
  parentGroupId?: string;
  childIds: string[];      // front-first children
  locked?: boolean;        // only store when true; locks descendants on canvas
};

type CoverShapeType = 'rect' | 'ellipse' | 'roundRect';
type CoverBorderStyle = 'solid' | 'dashed' | 'dotted';

type CoverElement =
  | {
      id: string;
      type: 'text';
      name?: string;
      groupId?: string;
      locked?: boolean;      // only store when true
      x: number; y: number; w: number; h: number;  // % of content frame; clamp
      text: string;
      fontSize: number;       // clamp 6–400
      textAlign: 'left' | 'center' | 'right';
      color: string;
      fontWeight: number | 'normal' | 'bold';  // number clamp 100–900
      fontFamily?: string;
    }
  | {
      id: string;
      type: 'image';
      name?: string;
      groupId?: string;
      locked?: boolean;
      x: number; y: number; w: number; h: number;
      path: string;           // required non-empty
      lockAspect?: boolean;   // only store when true
      naturalAspect?: number; // > 0 if known
    }
  | {
      id: string;
      type: CoverShapeType;
      name?: string;
      groupId?: string;
      locked?: boolean;
      x: number; y: number; w: number; h: number;
      fill: string;                 // default '#e0f2fe'
      borderColor: string;          // default '#0284c7'
      borderWidth: number;          // CSS px; clamp 0–40
      borderStyle: CoverBorderStyle;
      cornerRadiusPct?: number;     // roundRect only; clamp 0–50
      text?: string;                // optional in-shape text
      textAlign?: 'left' | 'center' | 'right';
      textVAlign?: 'top' | 'middle' | 'bottom';  // default middle when placing
      fontSize?: number;            // clamp 6–400
      color?: string;
      fontWeight?: number | 'normal' | 'bold';
      fontFamily?: string;
      paddingPct?: number;          // % of shape box; clamp 0–40
    };
```

**Normalize on read** (`normalizeNoteCover`):

- Always write/emit `v: 2` after normalize (v1 payloads accepted).
- Missing / invalid `pageSizeId` → `'a4'` (must be a `PRINT_PAGE_SIZES` id).
- Unknown / invalid elements dropped; missing `id` → `cover-el-{index}`.
- Position defaults (if missing): text ≈ `(10,20,80,12)`, image ≈ `(20,40,50,35)`, shape ≈ `(10,20,80,30)`; `x,y` clamp 0–100; `w,h` clamp 1–100.
- Orphan `groupId`s get synthetic groups; then `ensureLayerTree` repairs `rootLayerIds` / `childIds` consistency (host must keep a valid layer tree; see `layerTree.ts`).
- `locked: true` on an element or group blocks canvas move/resize/in-place edit (group lock applies to descendants). Editor shows a yellow ring on locked elements only while selected; omit `locked` when false.

**Shape render notes**

- `rect`: square corners; `ellipse`: `border-radius: 50%`; `roundRect`: `border-radius: {cornerRadiusPct}%`.
- Fill/border must survive print (`print-color-adjust: exact` on `.export-pdf-cover` and `[data-cover-shape]`).
- In-shape text is optional CSS text inside the padded box (not Markdown).
- Text placement: `textAlign` (horizontal) + `textVAlign` (vertical via flex `justify-content`).

### 4. Host responsibilities

| Stage | Behavior |
|-------|----------|
| Note MdPreview | Replace leading cover comment with a mount host; **auto-mount** `CoverSlide` when `enabled` (re-hydrate if preview DOM recreates). Cover uses `cover.pageSizeId` aspect + scaled fonts. Cover paper always **light**; body below follows editor theme. Click opens Export cover editor confirm. |
| Export / print | Persist toolbar paper size onto `cover.pageSizeId` while editing; restore toolbar from cover when entering cover edit. Render/print as before (`--print-cover-fit-*`, named `@page size`, logical page 1). |
| MD download / image bundle | `planMarkdownImageExport` / `embedMarkdownImagesAsDataUris` also rewrite `bg.imagePath` and image-element `path` (same as body wiki/md images): `.pictures/…` zip/folder mode, or `data:` URIs for single-file base64. |
| Editor | Mutate JSON via upsert; fold cover JSON with gutter chevron (persisted in IndexedDB per document); never rely on in-body shortcodes for cover |

Image `path` / `bg.imagePath` are storage keys (or, after download rewrite, `.pictures/…` / `data:`); URL resolution is host-specific (same as wiki images).

Editor fold: first cover line shows a chevron left of line numbers (`cursor-pointer`); collapse hides the JSON body with a short motion animation. Fold open/closed state is stored in IndexedDB (`s3haim-note-cover-fold`) keyed by storage type + path and restored when the document is opened.

### 5. Non-goals

- Cover mid-document (leading only)
- Unversioned free-form HTML cover blocks
- Emitting `<h7>`-style invalid HTML for cover text (cover is not Markdown)
- Freehand / path shapes, connectors, animations, multi-slide

## 구현

| 역할 | 경로 |
|------|------|
| 파서·직렬화 | `src/utils/noteCover/parse.ts` |
| 타입 | `src/utils/noteCover/types.ts` |
| 도형 스타일 | `src/utils/noteCover/shapeStyle.ts` |
| 레이어 트리 | `src/utils/noteCover/layerTree.ts` |
| 에디터 UI | `src/components/noteCover/*` |
| Preview mount | `src/utils/noteCoverPlaceholderMarkdownIt.ts`, `hydrateNoteCoverPreview.ts`, `NoteCoverPreviewMount.tsx` |
| Editor fold | `src/utils/noteCover/noteCoverFoldExtension.ts`, `noteCoverFoldStateDb.ts` |
| Export | `src/pages/ExportPDFPage.jsx` |
| MD image download | `src/utils/markdownImageExport.ts` (cover paths included) |
