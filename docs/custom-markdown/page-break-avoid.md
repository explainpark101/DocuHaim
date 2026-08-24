# Page break avoid (`<!-- page-break-avoid -->`)

Print / PDF Export sidecar that keeps a **table** or **fenced code block** on one page when it fits. Default behavior (no comment) allows Paged.js to fragment tables and code across pages.

## Syntax

```markdown
<!-- page-break-avoid -->
| A | B |
| --- | --- |
| 1 | 2 |

<!-- page-break-avoid -->
```js
console.log('hello')
```
```

Stacks with other HTML comment sidecars (order does not matter):

```markdown
<!-- page-break-avoid -->
<!-- haim-table
{"v":1,"headerRows":1,"footerRows":0,"merges":[],"sections":{},"cells":{}}
-->
| A | B |
| --- | --- |
| 1 | 2 |

<!-- haim-table
{"v":1,"headerRows":1,"footerRows":0,"merges":[],"sections":{},"cells":{}}
-->
<!-- page-break-avoid -->
| A | B |
| --- | --- |
| 1 | 2 |
```

Both apply page-break-avoid to the following GFM table.

## Spec (interop)

기준 구현: `src/utils/pageBreakAvoid.ts`, `src/utils/pageBreakAvoidMarkdownIt.ts`, Paged.js preview `src/utils/printPagedJs.ts`.

### 1. Grammar

```text
PAGE_BREAK_AVOID := "<!--" WS "page-break-avoid" WS "-->"
```

Exact-token check (after trim): `/^<!--\s*page-break-avoid\s*-->$/i`.

No attributes.

### 2. Placement

Immediately before one of:

- GFM pipe table
- Fenced code block (not `mermaid`)

Optional blank / whitespace-only lines between comment and target.

May stack with other HTML comments in the same region (e.g. `haim-table`). Any order is valid; the avoid flag attaches to the next table/fence after the stacked comments.

### 3. Parse algorithm

1. Find each `page-break-avoid` HTML comment token.
2. Walk forward, skipping empty paragraphs and other HTML comments.
3. If the next block is `table_open` or `fence` (non-mermaid), mark it with `data-page-break-avoid="1"`.
4. Hide the comment token (do not leave literal `<!-- page-break-avoid -->` in preview HTML).

### 4. Canonical HTML

| Target | Attribute |
|--------|-----------|
| `<table>` | `data-page-break-avoid="1"` |
| Fence / `<pre>` (and `.md-editor-code` when present) | `data-page-break-avoid="1"` |

### 5. Print packing rules (host)

Export PDF uses [Paged.js](https://pagedjs.org/) (`Previewer.preview`) with `@page` CSS and fragmentation rules in `printPagedJs.ts`. Staging preview is cloned once per `layoutKey` after images/Mermaid are ready; `usePagedJsPreview` does not re-render on later DOM mutations.

| Condition | Behavior |
|-----------|----------|
| Default | Paged.js fragments prose, tables (row-level), and code blocks across pages |
| Avoid + block fits one page | `break-inside: avoid` via `data-page-break-avoid="1"` |
| Avoid + taller than one page | Paged.js may still split (avoid does not apply inside oversized blocks) |

### 6. Non-goals

- Avoid for images / Mermaid / headings (out of scope)
- Attributes or JSON payload on the comment
- Changing editor layout outside Export PDF packing (attr is still set in preview)

## 구현

| 역할 | 경로 |
|------|------|
| Sidecar upsert / stack | `src/utils/pageBreakAvoid.ts` |
| markdown-it | `src/utils/pageBreakAvoidMarkdownIt.ts` |
| Packing | `src/utils/printPagedJs.ts`, `src/hooks/usePagedJsPreview.ts` |
| Export PDF menu | `src/components/print/PrintPageBreakAvoidContextMenu.tsx` |
| XSS whitelist | `src/utils/appMarkdownItPlugins.ts` |
