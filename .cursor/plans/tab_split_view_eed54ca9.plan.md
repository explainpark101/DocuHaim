---
name: Tab split view
overview: 워크스페이스 탭 모드에 VS Code식 재귀 스플릿(상·하·좌·우 드롭)을 추가하고, Export PDF는 해당 페인 안에서 노트↔인쇄 미리보기로 전환·뒤로가기로 복귀하도록 한다.
todos:
  - id: pane-model
    content: Add PaneNode types + pure layout ops (split/move/collapse/resize) and extend WorkspaceTabsState
    status: pending
  - id: split-ui
    content: WorkspaceSplitLayout + per-leaf tab bars; convert WorkspaceMainPanels to tsx; titlebar single-leaf only
    status: pending
  - id: dnd-edges
    content: "Extend tab DnD: 4-edge drop zones, cross-leaf move, lift horizontal-only restriction while over panes"
    status: pending
  - id: quiz-surface
    content: Per-tab/pane quiz vs edit surface so secondary panes work without global pathname
    status: pending
  - id: export-pdf-pane
    content: Pane-local ExportPDFPage + history overlay back; tabs-on skip ExportPdfGate; wire toolbar/AS/menu entry points
    status: pending
  - id: domain-persist
    content: Update useWorkspaceTabsDomain + persistence v2 for layout/focus/tab membership
    status: pending
isProject: false
---

# Tab drag-to-split view

## Decisions (locked)

- **Layout**: 상·하·좌·우 edge drop + **재귀 스플릿** (3페인 이상). 리프 soft max **4**.
- **Export PDF**: 새 탭 kind 아님. 노트 페인에서 Export PDF → **그 페인**에 `ExportPDFPage` 표시, **뒤로가기**면 같은 페인이 노트로 복귀 (`useHistoryOverlayBack`).
- **대상 콘텐츠**: `.md` / `.quiz.md`(file 탭 + EditorPane/QuizPane), `chat`, 페인 내 export-pdf. settings/content-search 탭도 일반 탭으로 페인 이동은 허용.
- **모바일/좁은 폭**: 스플릿 비활성 (단일 리프만).

## Current constraints

- State는 [`WorkspaceTabsState`](src/utils/workspaceTabs/types.ts) `{ tabs, activeId }` 단일 활성만 지원.
- [`WorkspaceMainPanels.jsx`](src/components/shell/workspace/WorkspaceMainPanels.jsx) keep-alive 스택 + 한 패널만 `active`.
- 탭 DnD는 [`WorkspaceTabBar.tsx`](src/components/shell/workspace/WorkspaceTabBar.tsx) 가로 재정렬만 (`restrictToHorizontalAxis`).
- `/export-pdf`는 [`AppShellView`](src/App/AppShellView.tsx)에서 `ExportPdfGate`로 **셸 전체 교체** → 스플릿과 공존 불가.
- Quiz 모드는 `location.pathname` 의존 ([`EditorPane.jsx`](src/components/shell/EditorPane.jsx)) → 보조 페인에서 깨짐.

## Architecture

```mermaid
flowchart TB
  subgraph state [WorkspaceTabsState v2]
    tabs[tabs global]
    layout[layout PaneNode tree]
    focused[focusedPaneId]
  end
  subgraph ui [WorkspaceMainPanels]
    split[WorkspaceSplitLayout]
    leafA[PaneLeaf A tabbar plus content]
    leafB[PaneLeaf B tabbar plus content]
  end
  tabs --> leafA
  tabs --> leafB
  layout --> split
  split --> leafA
  split --> leafB
  focused --> urlSync[URL sync focused leaf only]
```

**Pane model** (new module e.g. `src/utils/workspaceTabs/paneLayout.ts`):

```ts
type PaneLeaf = {
  type: 'leaf';
  id: string;
  tabIds: string[];
  activeId: string | null;
  /** File tab in this leaf showing ExportPDFPage instead of editor */
  exportPdfForTabId?: string | null;
};
type PaneSplit = {
  type: 'split';
  id: string;
  direction: 'horizontal' | 'vertical'; // row = L/R, column = T/B
  ratio: number; // 0..1 first child
  children: [PaneNode, PaneNode];
};
type PaneNode = PaneLeaf | PaneSplit;
```

Extend `WorkspaceTabsState`:

- `layout: PaneNode` (default single leaf owning all tab ids)
- `focusedPaneId: string`
- Keep `activeId` as **focused leaf’s** `activeId` for backward compat with mirrors / existing domain hooks, or derive via helpers everywhere (prefer helpers + migrate callers).

**Ops**: `splitLeaf(leafId, edge, tabId)`, `moveTabToLeaf`, `reorderInLeaf`, `setLeafActive`, `setFocusedPane`, `setLeafExportPdf`, `collapseEmptyLeaf`, `resizeSplit`.

## UX / DnD

1. Lift DnD: one `DndContext` wrapping tab bars + pane drop zones (or pointer drop detection outside horizontal-only sortable).
2. While dragging a tab over a leaf content area, show **4 edge zones** (~20–25% edges). Center drop = move into that leaf’s tab list (activate). Edge drop = split that leaf in that direction and place the tab in the new leaf.
3. Same-bar drop = existing reorder.
4. Last tab leaving a leaf → collapse leaf into sibling (restore single pane when one leaf remains).
5. Each leaf has its own `WorkspaceTabBar`. Tauri titlebar strip: **only when layout is a single leaf**; when split, tab bars render **inside each leaf** (inline).

## Content per leaf

Refactor [`WorkspaceMainPanels`](src/components/shell/workspace/WorkspaceMainPanels.jsx) → `.tsx`:

- Render recursive `WorkspaceSplitLayout` (flex + drag handle; reuse patterns from [`useResizablePanelWidth.js`](src/hooks/useResizablePanelWidth.js) / sidebar resize).
- Per leaf: tab bar + content host.
- A tab’s panel is **visible if any leaf has it active** (same keep-alive instance shared — mount once under a portal/host keyed by tab id, or duplicate only for chat singleton carefully). Prefer **one keep-alive mount per tab id**, CSS-positioned into the focused/visible leaf slot via absolute fill of that leaf’s content box (or render into leaf when active there). Simplest robust approach: **render panel inside the leaf that currently owns/activates it**; when moving tabs between leaves, React remount risk — mitigate with stable keys + keep file buffer in tab state (already there). Chat/settings remain singletons: if shown in two leaves simultaneously, disallow second open (activate existing leaf) or only allow one leaf to hold the singleton id.

**File / quiz**: add per-tab `noteSurface: 'edit' | 'quiz'` (or derive from last focused URL for that tab) so QuizPane does not depend solely on global pathname. Focused leaf’s active file tab drives `navigate(/view|/quiz/...)`.

**Export PDF (pane mode)** when `workspaceTabsEnabled`:

- Change [`ExportPDF.jsx`](src/components/print/ExportPDF.jsx) / [`PrintButton`](src/components/print/PrintButton.jsx) / Novel/Markdown/AS/desktop menu paths to call a workspace API `openExportPdfInFocusedPane(...)` instead of `navigate('/export-pdf/...')` when tabs are on.
- Leaf sets `exportPdfForTabId` and shows lazy `ExportPDFPage` with document props from that file tab.
- Wire `useHistoryOverlayBack(open, clearExportPdf, true, \`export-pdf-${leafId}\`)` so back clears only that leaf’s print surface.
- [`AppShellView`](src/App/AppShellView.tsx): if tabs enabled, **do not** early-return `ExportPdfGate` for `/export-pdf/*`; instead AppLayout opens print surface on the matching/focused file leaf (compat for deep links). Tabs off → keep current full-page gate.

## Domain / persistence

- [`useWorkspaceTabsDomain.ts`](src/App/hooks/useWorkspaceTabsDomain.ts): activate/close/open/reorder update **leaf** lists; close last tab in leaf collapses; focus pane on click; URL sync from focused leaf only.
- Persist schema bump to **version 2** in [`persistence.ts`](src/utils/workspaceTabs/persistence.ts) / last-open restore: layout tree + focusedPaneId + tab membership (exportPdf surface session-only, not persisted).
- Soft cap 12 file tabs still global.

## Out of scope

- Nested split beyond soft max 4 leaves (show no-op / toast).
- Split on mobile portrait.
- Persisting unsaved editor buffers (unchanged).
- Making settings/content-search “special” split targets beyond normal tabs.
