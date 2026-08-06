# Haim table (`<!-- haim-table … -->` + GFM table)

GFM pipe table 바로 위에 HTML 주석으로 셀 병합·구역/셀 스타일 메타를 저장한다. 미리보기·인쇄는 markdown-it 플러그인이 HTML `<table>`로 렌더한다.

## 문법

```markdown
<!-- haim-table
{"v":1,"headerRows":1,"footerRows":0,"width":"fit","align":"right","boxWidth":"420px","boxHeight":"180px","style":{"fontFamily":"Paperozi","fontSize":"14px"},"merges":[{"r":0,"c":0,"colspan":2,"rowspan":1}],"sections":{"thead":{"bg":"#1e293b","color":"#ffffff","fontFamily":"Pretendard","fontSize":"14px","fontWeight":"700"}},"cells":{"1,0":{"bg":"#eee","fontFamily":"D2Coding"}},"templateId":"striped"}
-->
| A | B |
| --- | --- |
| 1 | 2 |
```

- 주석이 없으면 일반 GFM 표로 렌더된다.
- 병합에 가려진 셀은 GFM에 빈 칸으로 두고, 렌더러가 생략한다.
- `style.fontFamily` 등 표 전체 기본 폰트는 셀(`cells`)·구역(`sections`)에 같은 속성이 있으면 **셀 → 구역 → 표** 순으로 셀 값이 이긴다.
- Preview / Export PDF에서 표 모서리를 드래그하면 `boxWidth` / `boxHeight`가 저장된다 (`width`는 `fit`으로 맞춰짐).

## Spec (interop)

기준 구현: `src/utils/haimTable/*`, 플러그인 `haimTableMarkdownItPlugin`.

### 1. Grammar

Comment (anywhere in the document, immediately before a GFM pipe table, optional blank lines between):

```js
/<!--\s*haim-table\s*([\s\S]*?)-->/
```

Capture group 1 = JSON payload (may span lines).

GFM table: standard pipe table with a separator row (`|---|`).  
A single `-` per cell (`| - | - |`) is also accepted (md-editor-rt renders these as tables).

### 2. `--` escaping inside JSON

HTML comments cannot contain `--`. On write:

```text
escape:   replace all "--" with "\\u002d\\u002d" in the JSON string
unescape: replace "\\u002d\\u002d" with "--" before JSON.parse
```

Canonical serialize:

```text
<!-- haim-table\n{escapedJson}\n-->
```

Then one newline and the GFM table.

If JSON parse / normalize fails → treat as default meta (`headerRows:1`, empty merges/sections/cells) when the comment is present; do not strip the following table.

### 3. JSON schema (`v = 1`)

```ts
type HaimTableStyle = {
  bg?: string;           // background-color hex
  borderInner?: string;
  borderOuter?: string;
  color?: string;
  fontFamily?: string;
  fontSize?: string;     // e.g. "14px"
  fontWeight?: string;   // "400" | "bold" | …
};

type HaimTableMeta = {
  v: 1;
  headerRows: number;    // default 1; first N rows → thead
  footerRows: number;    // default 0; last N rows → tfoot
  width: 'full' | 'fit'; // default 'full'; page width vs shrink-to-content
  align: 'left' | 'right'; // default 'left'; only applies when width === 'fit' (or box size set)
  /** Explicit box size from preview corner-drag (e.g. "420px"). Overrides full/fit width CSS. */
  boxWidth?: string;
  boxHeight?: string;
  /** Per-column / per-row sizes (e.g. "120px"); empty/`null` = auto. */
  colWidths?: Array<string | null>;
  rowHeights?: Array<string | null>;
  merges: Array<{ r: number; c: number; colspan: number; rowspan: number }>;
  /** Whole-table default style (fontFamily / fontSize / …). */
  style?: HaimTableStyle;
  sections: Partial<Record<'thead' | 'tbody' | 'tfoot', HaimTableStyle>>;
  cells: Record<`${number},${number}`, HaimTableStyle>;
  templateId?: string;
  templateOverrides?: Partial<HaimTableMeta>;
};
```

- `r`/`c` are 0-based indices into the GFM data rows (header row is row 0).
- Merges with `colspan===1 && rowspan===1` are dropped on normalize.
- Covered cells (non-origin cells under a merge) must not be rendered.
- `width` aliases on read: `min`/`auto` → `fit`; `100%`/`page` → `full`. Alias `layout` is accepted as `width`.
- When `width` is `full`, `align` is stored but has no visual effect (unless `boxWidth` is set).
- Alias `tableStyle` is accepted as `style` on read.
- `boxWidth` / `boxHeight`: CSS lengths (`Npx`, `%`, …); bare digits → `Npx`. Aliases `box_width` / `box_height` on read.
- `colWidths` / `rowHeights`: arrays of CSS lengths (or `null`/empty for auto), index-aligned with columns / data rows. Aliases `col_widths` / `row_heights` on read. Edited in the table modal by dragging borders; insert remaps slots.

### 4. Value normalization

Follows shared rules in [index.md](./index.md):

| Field | Rule |
|-------|------|
| Hex colors | `#RGB` / `#RRGGBB` / `#RRGGBBAA`; expand 3→6; lowercase; reject `transparent`/`none` |
| `fontSize` | bare digits → `Npx`; else `^\d+(\.\d+)?(px|%|em|rem|pt)?$` |
| `fontWeight` | `normal`/`bold`/`bolder`/`lighter` or 100–900 |
| `fontFamily` | trimmed non-empty string |

YAML templates (`.settings/table-styles.yaml`) use snake_case (`background`, `border_inner`, `font_family`, …) which map to the camelCase fields above. `background` ↔ `bg`.

### 5. Style priority (high → low)

1. Cell override (`cells["r,c"]`) — e.g. cell `fontFamily` wins over table `style.fontFamily`
2. Section style for that row (`sections.thead|tbody|tfoot` from document meta, else template sections)
3. Whole-table `style` (document meta)
4. Template nth `rules` — **earlier rules win** (first filled property sticks)
5. Unset

Nth formulas (`rows` / `cols`): `odd`, `even`, integer `N` (1-based), or `An+B` CSS nth-child form. Indices are **1-based** over the full table (including header rows).

### 6. Canonical HTML

```html
<table data-haim-table="1" data-haim-width="fit" data-haim-align="right" style="width:auto;max-width:100%;margin-left:auto;margin-right:0;">
  <thead style="…">…<th colspan rowspan style data-haim-r data-haim-c>…</th>…</thead>
  <tbody style="…">…<td …>…</td>…</tbody>
  <tfoot style="…">…</tfoot>
</table>
```

- `headerRows` / `footerRows` split rows into thead / tbody / tfoot.
- `data-haim-width="full"` → `width:100%`; `"fit"` → `width:auto` + `data-haim-align` left/right margins.
- Cell `style` may include `background-color`, `color`, `font-family`, `font-size`, `font-weight`, `border-*`.
- Covered cells are omitted (not empty placeholders).

### 7. Post-process

- **Download `tableFormat: html`**: replace each comment+GFM block with canonical HTML; leave other markdown intact.
- **Download `tableFormat: haim`**: keep comment+GFM as authored.

### 8. Non-goals

- Novel / TipTap table editing
- Hydration of remote template CSS beyond vault YAML
- Changing stock GFM tables that have no `haim-table` comment (except editor can attach a comment via the table edit modal)

## Appendix: `.settings/table-styles.yaml`

Not inline Markdown. Schema:

```yaml
version: 1
templates:
  - id: striped
    name: Striped
    sections:
      thead:
        background: "#1e293b"
        color: "#ffffff"
        font_family: "Pretendard"
        font_size: "14px"
        font_weight: "700"
      tbody:
        font_size: "13px"
      tfoot:
        font_weight: "600"
    rules:
      - rows: "odd"
        background: "#f5f5f5"
      - cols: "1"
        font_weight: "500"
```

## 구현

| 역할 | 경로 |
|------|------|
| Types / parse / merge / resolve / HTML | `src/utils/haimTable/` |
| markdown-it plugin | `src/utils/haimTable/markdownItPlugin.ts` |
| Global register + XSS | `src/config/mdEditorConfig.js` |
| Template store | `src/utils/tableStyleSettingsStore.ts` |
| Settings UI | `src/components/settings/TableStyleSettings.tsx` |
| Table edit modal | `src/components/haimTable/TableEditModal.tsx` |
| Editor wiring | `src/components/MarkdownEditor.jsx` |
