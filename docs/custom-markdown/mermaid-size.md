# Mermaid size (`<!-- mermaid-size … -->`)

PDF export에서 Mermaid 다이어그램 크기를 조절하면 fence 본문은 그대로 두고, 바로 위 HTML 주석에 크기가 저장된다. 문서를 다시 PDF로내면 주석이 파싱되어 동일한 크기가 적용된다.

## Syntax

```markdown
<!-- mermaid-size width="420px" height="280px" -->
```mermaid
flowchart TD
  A --> B
```
```

- 주석은 대상 ```mermaid fence **바로 앞**에 둔다 (사이에 빈 줄만 허용).
- `width` / `height` (또는 `w` / `h`) 중 하나 이상 필수.
- Size value 규칙은 [index.md](./index.md) shared conventions과 같다.

레거시 fence info (` ```mermaid width=… height=…`)도 읽을 수 있으나, PDF export UI에서 저장할 때는 **주석이 canonical** 이다 (fence info의 size 키는 제거).

## Spec (interop)

기준 구현: `mermaidSizeComment.ts`, `mermaidFenceMarkdownIt.ts`.

### 1. Grammar

```text
MERMAID_SIZE := "<!--" WS "mermaid-size" WS ATTRS "-->"
ATTRS        := ( WS KEY "=" '"' VALUE '"' )*
KEY          := width | height | w | h
```

### 2. Placement

Immediately before one ```mermaid fence (0-based occurrence among all mermaid fences in document order). Optional blank lines between comment and fence.

### 3. Parse algorithm

1. When rendering a mermaid fence at source line `L`, scan lines `L-1, L-2, …` skipping blank lines.
2. First non-blank line must match `<!-- mermaid-size … -->` or stop (no sidecar).
3. Parse attrs; normalize size values (`normalizeSizeValue`).
4. Merge with fence info: **comment wins** per dimension; fence info fills missing dimensions.

### 4. Canonical HTML

Same as [mermaid-fence-size.md](./mermaid-fence-size.md): `data-mermaid-width`, `data-mermaid-height`, `data-mermaid-sized="1"`, inline `style`.

### 5. Update algorithm (Export PDF free-transform)

Given 0-based mermaid occurrence:

1. Strip `width`/`height` from fence open line (plain ` ```mermaid`).
2. Insert or replace preceding `<!-- mermaid-size … -->` with new dimensions.
3. Omit comment when both dimensions cleared.

### 6. Non-goals

- Rotating / skew transforms
- Size on non-mermaid fences (except shared host attrs for base64 embeds)

## 구현

| 역할 | 경로 |
|------|------|
| parse / upsert markdown | `src/utils/mermaidSizeComment.ts` |
| markdown-it fence merge | `src/utils/mermaidFenceMarkdownIt.ts` |
| Export PDF free-transform save | `src/pages/exportPdf/hooks/useExportPdfImageInteractions.ts` |
| Lazy render attr copy | `src/utils/lazyMermaid.ts` |
| Skip auto-fit when sized | `src/hooks/usePrintMermaidFit.ts` |

See also: [mermaid-fence-size.md](./mermaid-fence-size.md) (legacy fence info).
