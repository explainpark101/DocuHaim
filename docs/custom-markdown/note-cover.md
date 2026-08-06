# Note cover (`<!-- note-cover … -->`)

인쇄/PDF 표지 레이아웃을 노트 마크다운 **최상단** HTML 주석에 JSON으로 저장한다. 본문 MdPreview에서는 strip하고, Export UI에서 별도 렌더한다.

## 문법

```html
<!-- note-cover
{"v":1,"enabled":true,"layout":{…},"bg":{…},"rootLayerIds":[…],"groups":[…],"elements":[…]}
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

### 3. JSON schema (`NoteCover`, `v = 1`)

```ts
type NoteCover = {
  v: 1;
  enabled: boolean;           // default true; only false when explicitly false
  layout: {
    align: 'left' | 'center' | 'right';  // default 'center'
    containerWidthPct: number;           // clamp 10–100, default 80
    gapPct: number;                      // clamp 0–40, default 2
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
};

type CoverElement =
  | {
      id: string;
      type: 'text';
      name?: string;
      groupId?: string;
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
      x: number; y: number; w: number; h: number;
      path: string;           // required non-empty
      lockAspect?: boolean;   // only store when true
      naturalAspect?: number; // > 0 if known
    };
```

**Normalize on read** (`normalizeNoteCover`):

- Unknown / invalid elements dropped; missing `id` → `cover-el-{index}`.
- Position defaults (if missing): text ≈ `(10,20,80,12)`, image ≈ `(20,40,50,35)`; `x,y` clamp 0–100; `w,h` clamp 1–100.
- Orphan `groupId`s get synthetic groups; then `ensureLayerTree` repairs `rootLayerIds` / `childIds` consistency (host must keep a valid layer tree; see `layerTree.ts`).

### 4. Host responsibilities

| Stage | Behavior |
|-------|----------|
| Note MdPreview | Strip cover comment; render body only |
| Export / print | Parse cover; if `enabled`, render cover surface from JSON; body follows |
| Editor | Mutate JSON via upsert; never rely on in-body shortcodes for cover |

Image `path` / `bg.imagePath` are storage keys; URL resolution is host-specific (same as wiki images).

### 5. Non-goals

- Cover mid-document (leading only)
- Unversioned free-form HTML cover blocks
- Emitting `<h7>`-style invalid HTML for cover text (cover is not Markdown)

## 구현

| 역할 | 경로 |
|------|------|
| 파서·직렬화 | `src/utils/noteCover/parse.ts` |
| 타입 | `src/utils/noteCover/types.ts` |
| 레이어 트리 | `src/utils/noteCover/layerTree.ts` |
| 에디터 UI | `src/components/noteCover/*` |
| Export | `src/pages/ExportPDFPage.jsx` |
