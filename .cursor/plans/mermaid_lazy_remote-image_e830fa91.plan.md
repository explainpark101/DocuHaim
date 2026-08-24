---
name: Mermaid lazy remote-image
overview: Mermaid는 viewport에서만 렌더하고, Export PDF는 차트 높이를 solid/fit으로 반영해 잘림을 막습니다. 서식 유지 복사·ImgBB 변환 시 wiki/base64/표준 이미지/Mermaid 모두 원본 마크다운에 `<!-- remote-image -->` 사이드카를 남기고 소스는 그대로 둡니다.
todos:
  - id: lazy-mermaid
    content: noMermaid + fence plugin + useLazyMermaidRender (IO); dynamic import mermaid; Export PDF eager
    status: completed
  - id: pdf-mermaid
    content: collectPrintMermaidBlocks + text skip + print break-inside avoid + usePrintMermaidFit
    status: completed
  - id: remote-image-grammar
    content: remoteImageComment.ts + docs/custom-markdown/remote-image.md + index + VitePress
    status: completed
  - id: imgbb-sidecar
    content: ImgBB convert writes sidecar comment; keep vault/md src
    status: completed
  - id: blog-copy-mermaid
    content: "서식 유지 복사: wiki/base64/md/mermaid ImgBB 후 원본 MD에 sidecar 일괄 기록 + hash 재사용 + clipboard"
    status: completed
isProject: false
---

# Mermaid lazy load + PDF height + remote-image

## Decisions (confirmed)

- Blog path: extend existing **서식 유지 복사** ([EditorPane.jsx](src/components/EditorPane.jsx)).
- Remote URL storage: **sidecar** `<!-- remote-image url="…" hash="…" -->` immediately before the target (`![[…]]`, `![](…)`, base64/`data:` image, or ` ```mermaid ` fence); **keep the original source markup unchanged**.
- Change 「ImgBB로 변환」 from path→`https` replacement to this comment.
- **서식 유지 복사에서도 동일**: ImgBB 업로드가 끝난 뒤 클립보드뿐 아니라 **원본 노트 MD에 sidecar를 반드시 기록** (wiki · base64 · 표준 MD 이미지 · Mermaid 전부).

## Architecture

```mermaid
flowchart TD
  subgraph preview [Editor preview]
    Fence["```mermaid fence"] --> Placeholder[div.md-editor-mermaid lazy]
    Placeholder --> IO[IntersectionObserver]
    IO --> Render[mermaid.render when visible]
  end
  subgraph pdf [Export PDF]
    Eager[Force render all mermaids]
    Eager --> Solids[collectPrintMermaidBlocks]
    Solids --> Starts[pageStarts / break-inside avoid]
  end
  subgraph blog [서식 유지 복사]
    Candidates[wiki base64 mdImg mermaid]
    Candidates --> CheckComment{remote-image hash match?}
    CheckComment -->|yes| ReuseURL[Use cached ImgBB URL]
    CheckComment -->|no| Upload[uploadImageToImgbb]
    Upload --> WriteComment[Upsert sidecar on original MD]
    ReuseURL --> Clipboard[HTML clipboard img src]
    WriteComment --> Clipboard
  end
```

---

## 1. Mermaid viewport-only rendering

md-editor-rt `useMermaid` renders **all** `div.md-editor-mermaid` at once. Bypass it:

1. Pass `noMermaid={true}` on note/chat/LLM `MdEditor` / `MdPreview` surfaces that should be lazy.
2. Add app markdown-it fence plugin (register in [mdEditorConfig.js](src/config/mdEditorConfig.js) / [appMarkdownItPlugins.ts](src/utils/appMarkdownItPlugins.ts)) that emits placeholders, e.g.  
   `<div class="md-editor-mermaid" data-haim-mermaid-lazy="1">escaped source</div>` (same class so existing CSS / print selectors stay useful).
3. New hook `useLazyMermaidRender(rootRef, { eager?: boolean })`:
   - `IntersectionObserver` (`rootMargin` ~100–200px) → `mermaid.render` → replace with processed SVG (mirror md-editor-rt `data-processed` shape where practical).
   - `eager: true` for Export PDF: render **all** placeholders before/while `usePrintPageStarts` measures.
4. Mermaid package: move from static import in [mdEditorConfig.js](src/config/mdEditorConfig.js) to `await import('mermaid')` on first diagram (keep `patchMermaidRender` + `securityLevel: 'loose'`). Toolbar insert of ````mermaid` stays unchanged.
5. Surfaces: [MarkdownEditor.jsx](src/components/MarkdownEditor.jsx), [ExportPDFPage.jsx](src/pages/ExportPDFPage.jsx) (`eager`), [ChatMessageMarkdown.tsx](src/components/chatWithMyself/ChatMessageMarkdown.tsx), [LlmAssistPanel.jsx](src/components/LlmAssistPanel.jsx).

---

## 2. Export PDF — Mermaid height / no mid-chart cuts

In [printPageBreaks.ts](src/utils/printPageBreaks.ts):

1. Extend `isSkippableTextContext` to skip `.md-editor-mermaid` (and nested SVG text) so label lines are not fake solids.
2. Add `collectPrintMermaidBlocks` (same pattern as `collectPrintImageBlocks`): host `.md-editor-mermaid`, height `max(host, svg)`.
3. Merge into `collectPrintSolidBlocks`.

Also:

4. Print CSS in [style.css](src/styles/md-editor-rt/style.css) `@media print`:  
   `.md-editor-preview .md-editor-mermaid { break-inside: avoid; page-break-inside: avoid; }`
5. Add `usePrintMermaidFit` (follow [usePrintImageAspectFit.ts](src/hooks/usePrintImageAspectFit.ts) / table fit): scale oversized charts into page max box so one-page charts stay atomic; wire from [ExportPDFPage.jsx](src/pages/ExportPDFPage.jsx) after eager mermaid render.

Ensure measure order: **eager mermaid complete → fit → pagination remeasure** (MutationObserver / layoutKey already in [usePrintPageStarts.ts](src/hooks/usePrintPageStarts.ts)).

---

## 3. `<!-- remote-image -->` grammar (shared wiki + mermaid)

New module e.g. [src/utils/remoteImageComment.ts](src/utils/remoteImageComment.ts) + docs:

| Piece | Contract |
|-------|----------|
| Grammar | `<!-- remote-image url="…" hash="…" -->` (attr style per [index.md](docs/custom-markdown/index.md) HTML comment attrs) |
| Placement | Immediately before target; optional blank lines OK (like haim-table). Targets: `![[path|opts]]`, `![alt](src){attrs}`, `data:` / base64 wiki-or-md images, mermaid fence |
| `url` | Absolute `https://…` (ImgBB display URL) |
| `hash` | `hashText` from [advancedSearch/hash.ts](src/utils/advancedSearch/hash.ts): mermaid = fence body; wiki = path string (occurrence keyed); markdown / base64 = src string (data URI or path) |
| APIs | parse preceding comment; upsert comment for Nth wiki / md-image / mermaid; find reusable URL if hash matches |
| Editor preview | **No** visual change — still vault hydrate / live Mermaid / inline data URI. Comment is cache metadata only; original bytes/path stay in the file. |

Docs (same change):

- [docs/custom-markdown/remote-image.md](docs/custom-markdown/remote-image.md) — Syntax + Spec
- Row in [docs/custom-markdown/index.md](docs/custom-markdown/index.md)
- VitePress sidebar in [docs/.vitepress/config.ts](docs/.vitepress/config.ts)
- Cross-link from [wiki-image.md](docs/custom-markdown/wiki-image.md)

---

## 4. ImgBB convert + 서식 유지 복사

### 「ImgBB로 변환」 (wiki / standard MD)

In [MarkdownEditor.jsx](src/components/MarkdownEditor.jsx) (and Novel / ExportPDF equivalents that call the same helpers):

- Stop `updateWikiImagePathInMarkdown` / `updateMarkdownImageSrcInMarkdown` to https.
- After upload: `upsertRemoteImageComment` before the target; keep `![[vault/path|opts]]` / `![](src){attrs}` and size updates only.
- Treat “already public” as: matching `remote-image` comment with current hash (not `isPublicHttpImageUrl(path)` alone). Legacy notes that already have `![[https://…]]` keep working via existing remote path resolution.

### 서식 유지 복사 (통일 규칙)

Extend [imgbbCopyCandidates.ts](src/utils/imgbbCopyCandidates.ts) + [EditorPane.jsx](src/components/EditorPane.jsx).  
**규칙: ImgBB로 올린 모든 후보(wiki · base64 · 표준 MD 이미지 · Mermaid)는 클립보드 치환과 함께 원본 MD에 sidecar를 upsert한다.** 원본 `![[…]]` / `![](…)` / `data:` / mermaid fence 본문은 바꾸지 않는다.

공통 파이프라인 (후보 종류별):

1. Hash 계산 → 직전 `remote-image` 주석이 있고 `hash` 일치 → **재업로드 없이** `url` 재사용 (MD는 이미 sidecar 있음 → 추가 write 불필요).
2. 미스 시 `uploadImageToImgbb` → **즉시** `upsertRemoteImageComment`로 원본 노트 MD 패치 (`onChange`/undo 채널; EditorPane이 현재 value 접근 필요) → 클립보드용 replacement map에 URL 기록.
3. 업로드 확인 모달에서 「업로드 후 복사」성공 시: **한 번의 MD 패치 배치**로 이번 세션에 새로 올린 모든 sidecar를 반영한 뒤 HTML 복사.

종류별 소스:

| 후보 | 업로드 입력 | Sidecar 위치 | 클립보드 |
|------|-------------|--------------|----------|
| wiki (vault path) | hydrated/fetch URL | `![[path…]]` 직전 | `img` `src` → ImgBB URL |
| base64 (`data:` wiki 또는 md) | data URI | 해당 이미지 마크업 직전 | 동일 |
| 표준 `![](src)` (비-https) | fetchSrc | `![](…)` 직전 | 동일 |
| Mermaid | SVG→PNG ([svgToPng.ts](src/utils/svgToPng.ts)); 미렌더면 해당 노드 먼저 force-render | ` ```mermaid ` fence 직전 | mermaid host → `<img src=url>` |

Confirm modal 문구: “wiki·base64·이미지·Mermaid N개를 ImgBB에 올린 뒤 **원본에 링크를 저장하고** 복사합니다.”

「업로드 없이 복사」스킵 시: sidecar 미기록, Mermaid는 SVG 그대로(기존과 같이 깨질 수 있음) — ImgBB 경로만 sidecar 의무.

---

## 5. Out of scope / non-goals

- Replacing live Mermaid preview with the remote PNG in the editor.
- Migrating existing `![[https://…]]` notes back to vault+comment automatically.
- ECharts lazy loading.
- Changing print paper math in [printPageLayout.ts](src/utils/printPageLayout.ts).

---

## Key files

| Area | Files |
|------|--------|
| Lazy Mermaid | new hook/plugin utils; `mdEditorConfig.js`; MarkdownEditor / ExportPDF / Chat / LlmAssist |
| PDF | `printPageBreaks.ts`; print CSS; `usePrintMermaidFit`; ExportPDFPage |
| remote-image | `remoteImageComment.ts`; docs + VitePress; ImgBB handlers; EditorPane + imgbbCopyCandidates + copyFormattedPageHtml |
