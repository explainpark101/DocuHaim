# Mermaid fence size (`width` / `height` on info line)

Export PDF에서 Mermaid 다이어그램을 자유변형한 뒤 저장하면 fence info에 크기가 기록된다.

## 문법

````markdown
```mermaid width=420px height=280px
flowchart TD
  A --> B
```
````

허용 형태 (info 줄, `mermaid` 다음 토큰):

| 형태 | 의미 |
|------|------|
| `width=420px` / `w=420` | 가로 |
| `height=280px` / `h=280` | 세로 |
| `420x280` | 가로×세로 |
| bare `420` | 가로만 (`420px`) |

Size value 규칙은 [index.md](./index.md) shared conventions와 같다 (bare digits → `Npx`).

## Spec (interop)

기준 구현: `mermaidFenceSize.ts`, `mermaidFenceMarkdownIt.ts`.

### 1. Grammar

Fence open line:

```
^```mermaid\b([^\n]*)\r?\n
```

Info tail tokens after optional language token `mermaid`: whitespace-separated.

### 2. Parse algorithm

1. Split info on whitespace; skip leading `mermaid` (case-insensitive).
2. For each token:
   - `NxM` → width=`Npx`, height=`Mpx`
   - bare digits → width if not yet set
   - `key=value` with key in `w|width|h|height` → `normalizeSizeValue(value)`
3. Invalid size values are ignored (token skipped).

### 3. Canonical HTML

On the Mermaid host (`div`/`p.md-editor-mermaid`):

| Attr | When |
|------|------|
| `data-mermaid-width` | width set |
| `data-mermaid-height` | height set |
| `data-mermaid-sized="1"` | either set |
| `style` | `width:…;height:…;max-width:100%;overflow:hidden;` for present fields |

Lazy render must **copy** these attrs from placeholder → processed host.

### 4. Update algorithm (host UI)

Given 0-based occurrence among ```mermaid fences in document order, rewrite the open line to:

```
```mermaid width=<W> height=<H>
```

Omit a key when that dimension is cleared. Preserve fence body unchanged.

### 5. Non-goals

- Per-theme size
- Rotating / skew free-transform
- Applying size to non-`mermaid` language fences (except collapsible base64 embeds that still use a mermaid host)

## 구현

| 역할 | 경로 |
|------|------|
| parse / update markdown | `src/utils/mermaidFenceSize.ts` |
| markdown-it fence | `src/utils/mermaidFenceMarkdownIt.ts` |
| Export PDF free-transform | `src/pages/exportPdf/hooks/useExportPdfImageInteractions.ts` |
| Skip auto-fit when sized | `src/hooks/usePrintMermaidFit.ts` |
| XSS whitelist | `src/utils/appMarkdownItPlugins.ts` |
