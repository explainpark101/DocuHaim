# Page break (`<pgbr/>`)

인쇄·PDF용 강제 페이지 나눔. 미리보기에서는 HR처럼 보이는 구분선.

## 문법

```markdown
앞 단락

<pgbr/>

뒤 단락
```

허용 형태 (대소문자 무시): `<pgbr/>`, `<pgbr>`, `<pgbr />`.

## Spec (interop)

기준 구현: `pageBreakMarkdownIt.js`.

### 1. Match

```js
/<pgbr\s*\/?\s*>/gi
```

Exact-token check (after trim): `/^<pgbr\s*\/?\s*>$/i`.

### 2. Parse algorithm

1. Walk inline text / raw HTML inline nodes.
2. Replace every match with a **page-break marker** (see HTML below).
3. If an entire paragraph contains only markers + whitespace/softbreaks (no other text), **unwrap** the paragraph into N block-level markers (N = count of markers). Reason: CSS `page-break` inside `<p>` is unreliable for print.
4. If a raw HTML block is exactly a pgbr tag, normalize to the block marker.

Markers may appear mid-paragraph (inline form) when mixed with other content; print hosts may ignore inline markers or treat them as soft breaks — reference print CSS targets block markers.

### 3. Canonical HTML

| Form | HTML |
|------|------|
| Inline marker | `<span class="md-pgbr" data-md-pgbr="1"></span>` |
| Block marker | `<div class="md-pgbr" data-md-pgbr="1"></div>` |

Do not leave the literal `<pgbr/>` in HTML output after transform (XSS / printers should see the span/div).

### 4. Preview vs print (host)

| Context | Expected presentation |
|---------|----------------------|
| Preview | Visible rule (CSS on `.md-pgbr`) |
| Print / PDF | Invisible forced page break (`break-before` / `page-break-before` on block `.md-pgbr`) |

CSS details are host-specific; class + `data-md-pgbr="1"` are the contract.

### 5. Non-goals

- Attributes on `<pgbr>` (none supported)
- Self-closing only vs void — both whitespace variants above are equivalent
- Markdown thematic break `---` as page break (separate)

## 구현

| 역할 | 경로 |
|------|------|
| markdown-it | `src/utils/pageBreakMarkdownIt.js` |
| 인쇄 보조 | `printVisualLinePgbr.ts`, `usePrintPgbrSpacers.ts`, `printPageBreaks.ts` |
| XSS whitelist | `src/config/mdEditorConfig.js` |
| AS / toolbar | `editor-pgbr`, `MarkdownPageBreakToolbar.jsx` |
