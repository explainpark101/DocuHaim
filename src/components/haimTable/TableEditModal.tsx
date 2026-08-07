import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import {
  AlignLeft,
  AlignRight,
  Check,
  Columns3,
  Layers,
  LayoutTemplate,
  Maximize2,
  Paintbrush,
  PanelBottom,
  PanelTop,
  Plus,
  Redo2,
  Table2,
  TableCellsMerge,
  TableCellsSplit,
  TextCursorInput,
  Trash2,
  Undo2,
  X,
} from 'lucide-react';
import { ContextMenu, Tooltip, Form } from 'radix-ui';
import MobileContextMenuModal from '@/components/contextMenu/MobileContextMenuModal';
import {
  MOBILE_CONTEXT_MENU_DANGER_ITEM_CLASS,
} from '@/components/contextMenu/mobileContextMenuStyles';
import { useMobileContextMenuMode } from '@/hooks/useMobileContextMenuMode';
import Modal from '@/components/modals/Modal';
import { ConfirmModal } from '@/components/modals/ConfirmModal';
import { HaimTableStyleFields } from '@/components/haimTable/HaimTableStyleFields';
import { TableStyleTemplateEditor } from '@/components/settings/TableStyleTemplateEditor';
import {
  formInputClassName,
  formInputCompactClassName,
  RadixSelectField,
} from '@/components/ui/RadixSelectField';
import { useTableEditUndoHistory } from '@/hooks/useTableEditUndoHistory';
import {
  applyTemplateToMeta,
  cellKey,
  coveredCellSet,
  createDefaultHaimTableMeta,
  mergeAt,
  mergeCoveringCell,
  mergeSelection,
  resolveCellStyle,
  unmergeSelection,
  type HaimTableGrid,
  type HaimTableMeta,
  type HaimTableMerge,
  type HaimTableSectionKey,
  type HaimTableStyle,
  type HaimTableTemplate,
} from '@/utils/haimTable';
import type { TableEditUndoSnapshot } from '@/utils/haimTable/tableEditUndoHistory';
import {
  getCachedTableStyleSettings,
  loadTableStylesFromStorage,
  saveTableStylesToStorage,
  DEFAULT_TABLE_STYLE_SETTINGS,
} from '@/utils/tableStyleSettingsStore';
import { isEmptyStyle } from '@/utils/haimTable/styleNormalize';
import {
  deleteColsAt,
  deleteRowsAt,
  insertColAt,
  insertRowAt,
} from '@/utils/haimTable/gridMutations';
import { setSizeAt, sizeAt } from '@/utils/haimTable/gridSize';
import { loadWebfontsFromStorage, notifyWebfontsChanged } from '@/utils/webfontSettingsStore';

type Props = {
  isOpen: boolean;
  initialMeta: HaimTableMeta | null;
  initialGrid: HaimTableGrid;
  onClose: () => void;
  onSave: (meta: HaimTableMeta, grid: HaimTableGrid) => void;
};

type Sel = { r0: number; c0: number; r1: number; c1: number } | null;

type EdgeGeom = { left: number; top: number; width: number; height: number };

type HoverInsert = {
  kind: 'row' | 'col';
  index: number;
  /** + button position relative to wrap */
  x: number;
  y: number;
  edge: EdgeGeom;
  ghost: EdgeGeom;
  label: string;
};

const SECTION_KEYS: HaimTableSectionKey[] = ['thead', 'tbody', 'tfoot'];
/** Hit radius for detecting borders (including mid-edge, not only corners). */
const BORDER_HIT_PX = 10;
const GHOST_ROW_H = 36;
const GHOST_COL_W = 44;
/** Visible glow thickness; hit strip is thicker. */
const EDGE_THICKNESS = 4;
const EDGE_HIT_THICKNESS = 14;
const ICON_SM = 'h-3.5 w-3.5 shrink-0';
const ICON_XS = 'h-3 w-3 shrink-0';
const TEMPLATE_NONE = '__none__';
/** Default / clamp for landscape sidebar panels (px). */
const SIDEBAR_DEFAULT_W = 288;
const SIDEBAR_MIN_W = 200;
const SIDEBAR_MAX_W = 480;
/** Min / default table pane width used when sizing the modal in landscape. */
const TABLE_PANE_MIN_W = 380;
const TABLE_PANE_DEFAULT_W = 560;
/** Sidebar stack horizontal padding (p-2 × 2). */
const SIDEBAR_STACK_PAD_X = 16;
/** Vertical resize-handle hit width (matches w-1.5). */
const PANEL_HANDLE_W = 6;

const WIDTH_OPTIONS = [
  { value: 'full', label: '페이지 전체 (full)' },
  { value: 'fit', label: '내용만큼 (fit)' },
] as const;

const ALIGN_OPTIONS = [
  { value: 'left', label: '왼쪽' },
  { value: 'right', label: '오른쪽' },
] as const;

const tooltipContentClass =
  'pointer-events-none z-100050 max-w-[240px] rounded-md border border-gray-200 bg-white px-2 py-1 text-[11px] leading-snug text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong';

const ctxMenuContentClass =
  'z-100050 min-w-[168px] overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft';

const ctxMenuDangerItemClass =
  'flex cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-40 data-[highlighted]:bg-red-50 dark:text-red-400 dark:data-[highlighted]:bg-red-950/40';

type DeleteConfirmState = {
  kind: 'row' | 'col';
  indices: number[];
};

type CellMenuAt = { r: number; c: number };

const isApplePlatform =
  typeof navigator !== 'undefined'
  && (/Mac|iPhone|iPad|iPod/i.test(navigator.platform)
    || /Mac|iPhone|iPad|iPod/i.test(navigator.userAgent ?? ''));

const MOD_KEY = isApplePlatform ? '⌘' : 'Ctrl';
const MERGE_SHORTCUT = `${MOD_KEY}+E`;
const UNMERGE_SHORTCUT = `${MOD_KEY}+Shift+E`;
const FONT_SIZE_UP_SHORTCUT = `${MOD_KEY}+Shift+>`;
const FONT_SIZE_DOWN_SHORTCUT = `${MOD_KEY}+Shift+<`;
const UNDO_SHORTCUT = `${MOD_KEY}+Z`;
const REDO_SHORTCUT = isApplePlatform ? `${MOD_KEY}+Shift+Z` : `${MOD_KEY}+Y`;
const DEFAULT_CELL_FONT_SIZE_PX = 14;

/** Step cell font-size (px/pt by 1, em/rem by 0.1). */
function nudgeCssFontSize(
  current: string | undefined,
  delta: number,
  fallbackPx = DEFAULT_CELL_FONT_SIZE_PX,
): string {
  const raw = (current || '').trim();
  const m = /^(\d+(?:\.\d+)?)(px|%|em|rem|pt)?$/i.exec(raw);
  const unit = (m?.[2] || 'px').toLowerCase();
  const base = m ? Number(m[1]) : fallbackPx;
  const step = unit === 'em' || unit === 'rem' ? 0.1 : 1;
  const min = unit === 'em' || unit === 'rem' ? 0.5 : unit === '%' ? 50 : 8;
  let next = (Number.isFinite(base) ? base : fallbackPx) + delta * step;
  next = Math.max(min, next);
  if (unit === 'em' || unit === 'rem') {
    next = Math.round(next * 10) / 10;
  } else {
    next = Math.round(next);
  }
  return `${next}${unit}`;
}

function FieldLabel({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="inline-flex shrink-0 text-gray-400 dark:text-odp-muted" aria-hidden>
        {icon}
      </span>
      {children}
    </span>
  );
}

function clampSidebarW(n: number): number {
  return Math.min(SIDEBAR_MAX_W, Math.max(SIDEBAR_MIN_W, Math.round(n)));
}

/** Landscape-only column splitter between sidebars / sidebar and table. */
function PanelColResizeHandle({
  onDelta,
  ariaLabel,
}: {
  onDelta: (dx: number) => void;
  ariaLabel: string;
}) {
  const lastXRef = useRef(0);
  return (
    <div
      role="separator"
      aria-orientation="vertical"
      aria-label={ariaLabel}
      className="group relative hidden w-1.5 shrink-0 cursor-col-resize touch-none select-none landscape:flex"
      onPointerDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.setPointerCapture(e.pointerId);
        lastXRef.current = e.clientX;
      }}
      onPointerMove={(e) => {
        if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
        const dx = e.clientX - lastXRef.current;
        lastXRef.current = e.clientX;
        if (dx !== 0) onDelta(dx);
      }}
      onPointerUp={(e) => {
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
      }}
      onPointerCancel={(e) => {
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
      }}
    >
      <span
        className="absolute inset-y-2 left-1/2 w-px -translate-x-1/2 rounded-full bg-gray-300 transition-colors group-hover:bg-blue-400 group-active:bg-blue-500 dark:bg-odp-borderStrong dark:group-hover:bg-blue-400"
        aria-hidden
      />
    </div>
  );
}

function rowInsertLabel(index: number, rowCount: number): string {
  if (index === 0) return '더블클릭: 맨 위에 행 추가';
  if (index === rowCount) return '더블클릭: 맨 아래에 행 추가';
  return `더블클릭: ${index}행 위에 행 추가`;
}

function colInsertLabel(index: number, colCount: number): string {
  if (index === 0) return '더블클릭: 맨 앞에 열 추가';
  if (index === colCount) return '더블클릭: 맨 뒤에 열 추가';
  return `더블클릭: ${index}열 앞에 열 추가`;
}

function resizeHint(kind: 'row' | 'col'): string {
  return kind === 'row'
    ? '드래그: 행 높이 조절'
    : '드래그: 열 너비 조절';
}

function buildRowInsert(
  index: number,
  edgeClientY: number,
  clientX: number,
  tableRect: DOMRect,
  wrapRect: DOMRect,
  rowCount: number,
): HoverInsert {
  const left = tableRect.left - wrapRect.left;
  const top = edgeClientY - wrapRect.top;
  const width = tableRect.width;
  const btnX = Math.min(Math.max(clientX - wrapRect.left, left), left + width);
  return {
    kind: 'row',
    index,
    x: btnX,
    y: top,
    edge: { left, top: top - EDGE_THICKNESS / 2, width, height: EDGE_THICKNESS },
    ghost: {
      left,
      top: top - GHOST_ROW_H / 2,
      width,
      height: GHOST_ROW_H,
    },
    label: rowInsertLabel(index, rowCount),
  };
}

function buildColInsert(
  index: number,
  edgeClientX: number,
  clientY: number,
  tableRect: DOMRect,
  wrapRect: DOMRect,
  colCount: number,
): HoverInsert {
  const top = tableRect.top - wrapRect.top;
  const left = edgeClientX - wrapRect.left;
  const height = tableRect.height;
  const btnY = Math.min(Math.max(clientY - wrapRect.top, top), top + height);
  return {
    kind: 'col',
    index,
    x: left,
    y: btnY,
    edge: { left: left - EDGE_THICKNESS / 2, top, width: EDGE_THICKNESS, height },
    ghost: {
      left: left - GHOST_COL_W / 2,
      top,
      width: GHOST_COL_W,
      height,
    },
    label: colInsertLabel(index, colCount),
  };
}

function EdgeAddButton({
  tip,
  onDoubleClick,
  style,
}: {
  tip: string;
  onDoubleClick: () => void;
  style?: CSSProperties;
}) {
  return (
    <Tooltip.Root open>
      <Tooltip.Trigger asChild>
        <button
          type="button"
          aria-label={tip}
          style={style}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDoubleClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDoubleClick();
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onPointerDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          data-haim-edge-add=""
          className="haim-table-insert-btn pointer-events-auto absolute z-30 flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-blue-400/80 bg-white text-blue-600 shadow-sm hover:bg-blue-50 dark:border-blue-400/70 dark:bg-odp-surface dark:text-blue-300 dark:hover:bg-blue-950/60"
        >
          <Plus className="h-3 w-3" aria-hidden />
        </button>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content className={tooltipContentClass} side="top" sideOffset={8}>
          {tip}
          <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

function EdgeHitStrip({
  insert,
  tip,
  allowResize,
  onDoubleClickInsert,
  onResizePointerDown,
}: {
  insert: HoverInsert;
  tip: string;
  /** Outer top/left edges only insert; internal/right/bottom edges also resize. */
  allowResize: boolean;
  onDoubleClickInsert: () => void;
  onResizePointerDown: (e: ReactPointerEvent) => void;
}) {
  const isRow = insert.kind === 'row';
  const hit: EdgeGeom = isRow
    ? {
        left: insert.edge.left,
        top: insert.edge.top + EDGE_THICKNESS / 2 - EDGE_HIT_THICKNESS / 2,
        width: insert.edge.width,
        height: EDGE_HIT_THICKNESS,
      }
    : {
        left: insert.edge.left + EDGE_THICKNESS / 2 - EDGE_HIT_THICKNESS / 2,
        top: insert.edge.top,
        width: EDGE_HIT_THICKNESS,
        height: insert.edge.height,
      };

  return (
    <div
      role="presentation"
      title={tip}
      data-haim-edge-hit=""
      className={`pointer-events-auto absolute z-[25] ${
        allowResize
          ? isRow
            ? 'cursor-row-resize'
            : 'cursor-col-resize'
          : 'cursor-pointer'
      }`}
      style={{
        left: hit.left,
        top: hit.top,
        width: hit.width,
        height: hit.height,
      }}
      onMouseDown={(e) => {
        // Keep cells underneath from selecting / focusing during edge dblclick
        e.preventDefault();
        e.stopPropagation();
      }}
      onPointerDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.button !== 0) return;
        // Second click of a double-click: let onDoubleClick handle insert
        if (e.detail >= 2) return;
        if (!allowResize) return;

        // Defer resize until the pointer actually moves so a double-click can insert
        const startX = e.clientX;
        const startY = e.clientY;
        const downEvent = e;
        let started = false;

        const cleanup = () => {
          document.removeEventListener('pointermove', onMove, true);
          document.removeEventListener('pointerup', onUp, true);
          document.removeEventListener('pointercancel', onUp, true);
        };

        const onMove = (ev: PointerEvent) => {
          if (started) return;
          if (Math.abs(ev.clientX - startX) < 3 && Math.abs(ev.clientY - startY) < 3) {
            return;
          }
          started = true;
          cleanup();
          onResizePointerDown(downEvent);
        };

        const onUp = () => {
          cleanup();
        };

        document.addEventListener('pointermove', onMove, true);
        document.addEventListener('pointerup', onUp, true);
        document.addEventListener('pointercancel', onUp, true);
      }}
      onDoubleClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onDoubleClickInsert();
      }}
    />
  );
}

function InsertPreview({ insert }: { insert: HoverInsert }) {
  const edgeKey = `${insert.kind}-${insert.index}`;
  return (
    <div data-haim-insert-preview="" className="contents">
      <div
        key={`ghost-${edgeKey}`}
        aria-hidden
        className={`pointer-events-none absolute z-10 rounded-sm border border-transparent bg-blue-400/[0.04] dark:bg-blue-400/[0.06] ${
          insert.kind === 'row' ? 'haim-table-insert-ghost-row' : 'haim-table-insert-ghost-col'
        }`}
        style={{
          left: insert.ghost.left,
          top: insert.ghost.top,
          width: insert.ghost.width,
          height: insert.ghost.height,
        }}
      />
      <div
        key={`glow-${edgeKey}`}
        aria-hidden
        className="haim-table-insert-glow pointer-events-none absolute z-[11] rounded-full"
        style={{
          left: insert.edge.left,
          top: insert.edge.top,
          width: insert.edge.width,
          height: insert.edge.height,
        }}
      />
    </div>
  );
}

/** Red highlight over rows/cols that would be deleted (context-menu hover). */
function DeleteTargetOverlay({
  kind,
  indices,
  table,
  wrap,
  colCount,
}: {
  kind: 'row' | 'col';
  indices: number[];
  table: HTMLTableElement | null;
  wrap: HTMLElement | null;
  colCount: number;
}) {
  const [rects, setRects] = useState<EdgeGeom[]>([]);

  useEffect(() => {
    if (!table || !wrap || !indices.length) {
      setRects([]);
      return undefined;
    }
    const measure = () => {
      const wrapRect = wrap.getBoundingClientRect();
      const tableRect = table.getBoundingClientRect();
      const next: EdgeGeom[] = [];
      if (kind === 'row') {
        for (const r of indices) {
          const row = table.rows[r];
          if (!row) continue;
          const rect = row.getBoundingClientRect();
          next.push({
            left: tableRect.left - wrapRect.left,
            top: rect.top - wrapRect.top,
            width: tableRect.width,
            height: Math.max(1, rect.height),
          });
        }
      } else {
        const xs = colEdgeXs(table, colCount);
        for (const c of indices) {
          const left = xs[c];
          const right = xs[c + 1];
          if (left == null || right == null) continue;
          next.push({
            left: left - wrapRect.left,
            top: tableRect.top - wrapRect.top,
            width: Math.max(1, right - left),
            height: tableRect.height,
          });
        }
      }
      setRects(next);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [colCount, indices, kind, table, wrap]);

  if (!rects.length) return null;
  return (
    <div data-haim-delete-preview="" className="pointer-events-none absolute inset-0 z-20" aria-hidden>
      {rects.map((rect, i) => (
        <div
          key={`${kind}-${indices[i] ?? i}`}
          className="absolute rounded-sm bg-red-500/25 ring-1 ring-inset ring-red-500/50 dark:bg-red-500/30 dark:ring-red-400/40"
          style={{
            left: rect.left,
            top: rect.top,
            width: rect.width,
            height: rect.height,
          }}
        />
      ))}
    </div>
  );
}

function rowEdgeYs(table: HTMLTableElement): number[] {
  const rows = [...table.rows];
  if (!rows.length) return [];
  const ys: number[] = [];
  for (let i = 0; i < rows.length; i += 1) {
    ys.push(rows[i]!.getBoundingClientRect().top);
  }
  ys.push(rows[rows.length - 1]!.getBoundingClientRect().bottom);
  return ys;
}

function colEdgeXs(table: HTMLTableElement, colCount: number): number[] {
  const tableRect = table.getBoundingClientRect();
  const xs: number[] = [];
  for (let c = 0; c < colCount; c += 1) {
    const cells = table.querySelectorAll(`[data-edit-c="${c}"]`);
    let left: number | null = null;
    cells.forEach((node) => {
      const rect = (node as HTMLElement).getBoundingClientRect();
      if (left == null || rect.left < left) left = rect.left;
    });
    if (left != null) xs.push(left);
    else xs.push(tableRect.left + (tableRect.width * c) / Math.max(colCount, 1));
  }
  let right = tableRect.right;
  const lastCells = table.querySelectorAll(`[data-edit-c="${colCount - 1}"]`);
  lastCells.forEach((node) => {
    const rect = (node as HTMLElement).getBoundingClientRect();
    if (rect.right > right) right = rect.right;
  });
  xs.push(right);
  return xs;
}

function mergeUnderClientPoint(
  clientX: number,
  clientY: number,
  merges: HaimTableMerge[],
): HaimTableMerge | null {
  if (!merges.length || typeof document === 'undefined') return null;
  const el = document.elementFromPoint(clientX, clientY);
  const td = el?.closest?.('td[data-edit-r][data-edit-c]') as HTMLElement | null;
  if (!td) return null;
  const r = Number(td.getAttribute('data-edit-r'));
  const c = Number(td.getAttribute('data-edit-c'));
  if (!Number.isInteger(r) || !Number.isInteger(c)) return null;
  return mergeCoveringCell(merges, r, c);
}

/** True when this grid edge sits inside a merge (not on the merge outer border). */
function isEdgeInsideMerge(
  kind: 'row' | 'col',
  edgeIndex: number,
  merge: HaimTableMerge,
): boolean {
  if (kind === 'col') {
    return merge.colspan > 1 && merge.c < edgeIndex && edgeIndex < merge.c + merge.colspan;
  }
  return merge.rowspan > 1 && merge.r < edgeIndex && edgeIndex < merge.r + merge.rowspan;
}

function detectHoverInsert(
  table: HTMLTableElement,
  wrap: HTMLElement,
  clientX: number,
  clientY: number,
  rowCount: number,
  colCount: number,
  merges: HaimTableMerge[],
): HoverInsert | null {
  const tableRect = table.getBoundingClientRect();
  const wrapRect = wrap.getBoundingClientRect();
  // Allow a little slack outside the table for outer borders
  const pad = BORDER_HIT_PX + 2;
  if (
    clientX < tableRect.left - pad
    || clientX > tableRect.right + pad
    || clientY < tableRect.top - pad
    || clientY > tableRect.bottom + pad
  ) {
    return null;
  }

  const ys = rowEdgeYs(table);
  const xs = colEdgeXs(table, colCount);
  const mergeAtPoint = mergeUnderClientPoint(clientX, clientY, merges);

  let bestRow: { index: number; dist: number; y: number } | null = null;
  for (let i = 0; i < ys.length; i += 1) {
    if (mergeAtPoint && isEdgeInsideMerge('row', i, mergeAtPoint)) continue;
    const y = ys[i]!;
    const dist = Math.abs(clientY - y);
    if (dist <= BORDER_HIT_PX && clientX >= tableRect.left - pad && clientX <= tableRect.right + pad) {
      if (!bestRow || dist < bestRow.dist) bestRow = { index: i, dist, y };
    }
  }

  let bestCol: { index: number; dist: number; x: number } | null = null;
  for (let i = 0; i < xs.length; i += 1) {
    if (mergeAtPoint && isEdgeInsideMerge('col', i, mergeAtPoint)) continue;
    const x = xs[i]!;
    const dist = Math.abs(clientX - x);
    if (dist <= BORDER_HIT_PX && clientY >= tableRect.top - pad && clientY <= tableRect.bottom + pad) {
      if (!bestCol || dist < bestCol.dist) bestCol = { index: i, dist, x };
    }
  }

  // Prefer the closer axis when near a corner
  if (bestRow && bestCol) {
    if (bestRow.dist <= bestCol.dist) {
      return buildRowInsert(bestRow.index, bestRow.y, clientX, tableRect, wrapRect, rowCount);
    }
    return buildColInsert(bestCol.index, bestCol.x, clientY, tableRect, wrapRect, colCount);
  }
  if (bestRow) {
    return buildRowInsert(bestRow.index, bestRow.y, clientX, tableRect, wrapRect, rowCount);
  }
  if (bestCol) {
    return buildColInsert(bestCol.index, bestCol.x, clientY, tableRect, wrapRect, colCount);
  }
  return null;
}

export function TableEditModal({
  isOpen,
  initialMeta,
  initialGrid,
  onClose,
  onSave,
}: Props) {
  const [meta, setMeta] = useState<HaimTableMeta>(createDefaultHaimTableMeta());
  const [grid, setGrid] = useState<HaimTableGrid>(initialGrid);
  const [sel, setSel] = useState<Sel>(null);
  const [rangeDrag, setRangeDrag] = useState(false);
  const [sectionTab, setSectionTab] = useState<HaimTableSectionKey>('thead');
  const [templates, setTemplates] = useState<HaimTableTemplate[]>([]);
  const [templateEditorOpen, setTemplateEditorOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<HaimTableTemplate | null>(null);
  const [hoverInsert, setHoverInsert] = useState<HoverInsert | null>(null);
  const [edgeResizing, setEdgeResizing] = useState(false);
  const [historyKey, setHistoryKey] = useState(0);
  const [deleteConfirm, setDeleteConfirm] = useState<DeleteConfirmState | null>(null);
  const [deletePreview, setDeletePreview] = useState<DeleteConfirmState | null>(null);
  const deletePreviewRef = useRef<DeleteConfirmState | null>(null);
  const [cellMenuAt, setCellMenuAt] = useState<CellMenuAt | null>(null);
  const cellMenuOpen = cellMenuAt !== null;
  const mobileContextMenu = useMobileContextMenuMode();
  const [tableSidebarW, setTableSidebarW] = useState(SIDEBAR_DEFAULT_W);
  const [cellSidebarW, setCellSidebarW] = useState(SIDEBAR_DEFAULT_W);
  const [spacePanReady, setSpacePanReady] = useState(false);
  const [panning, setPanning] = useState(false);
  const [viewportW, setViewportW] = useState(
    () => (typeof window !== 'undefined' ? window.innerWidth : 1280),
  );
  const [isLandscape, setIsLandscape] = useState(
    () =>
      typeof window !== 'undefined'
        ? window.matchMedia('(orientation: landscape)').matches
        : true,
  );
  const tablePaneRef = useRef<HTMLDivElement | null>(null);
  const tableWrapRef = useRef<HTMLDivElement | null>(null);
  const tableRef = useRef<HTMLTableElement | null>(null);
  const hoverInsertRef = useRef<HoverInsert | null>(null);
  const rangeDragRef = useRef(false);
  const selAnchorRef = useRef<{ r: number; c: number } | null>(null);
  const selRef = useRef<Sel>(null);
  const spacePanReadyRef = useRef(false);
  const cellMenuOpenRef = useRef(false);
  const panLastRef = useRef({ x: 0, y: 0 });
  hoverInsertRef.current = hoverInsert;
  rangeDragRef.current = rangeDrag;
  selRef.current = sel;
  spacePanReadyRef.current = spacePanReady;
  cellMenuOpenRef.current = cellMenuOpen;
  deletePreviewRef.current = deletePreview;
  const initialMetaRef = useRef(initialMeta);
  const initialGridRef = useRef(initialGrid);
  initialMetaRef.current = initialMeta;
  initialGridRef.current = initialGrid;

  useEffect(() => {
    if (!isOpen) return;
    const nextMeta = initialMetaRef.current;
    const nextGrid = initialGridRef.current;
    setMeta(nextMeta ? { ...nextMeta } : createDefaultHaimTableMeta());
    setGrid({
      rows: nextGrid.rows.map((r) => [...r]),
      aligns: [...nextGrid.aligns],
    });
    setSel(null);
    setRangeDrag(false);
    selAnchorRef.current = null;
    setHoverInsert(null);
    setSpacePanReady(false);
    setPanning(false);
    setCellMenuAt(null);
    setDeletePreview(null);
    setHistoryKey((k) => k + 1);
    void loadTableStylesFromStorage().then((s) => setTemplates(s.templates));
    // Refresh webfont cache so FontFamilyInput lists newly saved vault fonts
    void loadWebfontsFromStorage().then((s) => notifyWebfontsChanged(s));
  }, [isOpen]);

  const applyUndoSnapshot = useCallback((snapshot: TableEditUndoSnapshot) => {
    setMeta(snapshot.meta);
    setGrid({
      rows: snapshot.grid.rows.map((r) => [...r]),
      aligns: [...(snapshot.grid.aligns ?? [])],
    });
    setSel(null);
    setRangeDrag(false);
    selAnchorRef.current = null;
    setHoverInsert(null);
  }, []);

  const {
    undo,
    redo,
    canUndo,
    canRedo,
    recordNow,
  } = useTableEditUndoHistory({
    enabled: isOpen,
    historyKey,
    meta,
    grid,
    applySnapshot: applyUndoSnapshot,
  });

  // Flush debounced history when a border resize finishes
  const wasEdgeResizingRef = useRef(false);
  useEffect(() => {
    if (wasEdgeResizingRef.current && !edgeResizing) {
      recordNow();
    }
    wasEdgeResizingRef.current = edgeResizing;
  }, [edgeResizing, recordNow]);

  // Capture-phase: same shortcuts as editor / crop (swallow so backdrop never undoes)
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      const mod = event.metaKey || event.ctrlKey;
      if (!mod || event.altKey) return;
      const key = event.key.toLowerCase();
      const isUndo = key === 'z' && !event.shiftKey;
      const isRedo = key === 'y' || (key === 'z' && event.shiftKey);
      if (!isUndo && !isRedo) return;
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      if (isRedo) redo();
      else undo();
    };
    window.addEventListener('keydown', onKeyDown, true);
    return () => window.removeEventListener('keydown', onKeyDown, true);
  }, [isOpen, redo, undo]);

  useEffect(() => {
    if (!isOpen || typeof window === 'undefined') return undefined;
    const mq = window.matchMedia('(orientation: landscape)');
    const sync = () => {
      setViewportW(window.innerWidth);
      setIsLandscape(mq.matches);
    };
    sync();
    window.addEventListener('resize', sync);
    mq.addEventListener('change', sync);
    return () => {
      window.removeEventListener('resize', sync);
      mq.removeEventListener('change', sync);
    };
  }, [isOpen]);

  const covered = useMemo(() => coveredCellSet(meta.merges), [meta.merges]);
  const rowCount = grid.rows.length;
  const colCount = Math.max(1, ...grid.rows.map((r) => r.length), grid.aligns.length);

  const selectedCells = useMemo(() => {
    if (!sel) return [] as Array<{ r: number; c: number }>;
    const out: Array<{ r: number; c: number }> = [];
    const top = Math.min(sel.r0, sel.r1);
    const left = Math.min(sel.c0, sel.c1);
    const bottom = Math.max(sel.r0, sel.r1);
    const right = Math.max(sel.c0, sel.c1);
    for (let r = top; r <= bottom; r += 1) {
      for (let c = left; c <= right; c += 1) {
        if (!covered.has(`${r},${c}`)) out.push({ r, c });
      }
    }
    return out;
  }, [sel, covered]);

  const primaryCell = selectedCells[0] ?? null;
  const showCellSidebar = Boolean(primaryCell);

  const tableSidebarWRef = useRef(tableSidebarW);
  const cellSidebarWRef = useRef(cellSidebarW);
  tableSidebarWRef.current = tableSidebarW;
  cellSidebarWRef.current = cellSidebarW;

  const maxSidebarStackW = useMemo(() => {
    const maxModal = viewportW * 0.95;
    return Math.max(
      SIDEBAR_MIN_W,
      maxModal - SIDEBAR_STACK_PAD_X - PANEL_HANDLE_W - TABLE_PANE_MIN_W,
    );
  }, [viewportW]);

  /** Splitter between table/group and cell sidebars: move the boundary. */
  const resizeBetweenSidebars = useCallback((dx: number) => {
    const prevT = tableSidebarWRef.current;
    const prevC = cellSidebarWRef.current;
    const sum = prevT + prevC;
    let nextT = clampSidebarW(prevT + dx);
    let nextC = clampSidebarW(sum - nextT);
    nextT = clampSidebarW(sum - nextC);
    nextC = clampSidebarW(sum - nextT);
    setTableSidebarW(nextT);
    setCellSidebarW(nextC);
  }, []);

  const resizeCellSidebar = useCallback(
    (dx: number) => {
      setCellSidebarW((prev) => {
        const next = clampSidebarW(prev + dx);
        const stack = tableSidebarW + PANEL_HANDLE_W + next;
        if (stack <= maxSidebarStackW) return next;
        const room = maxSidebarStackW - tableSidebarW - PANEL_HANDLE_W;
        return clampSidebarW(room);
      });
    },
    [maxSidebarStackW, tableSidebarW],
  );

  const modalContentStyle = useMemo((): CSSProperties => {
    const maxModal = viewportW * 0.95;
    if (!isLandscape) {
      return {
        width: maxModal,
        maxWidth: '95dvw',
        height: '95dvh',
        maxHeight: '95dvh',
      };
    }
    // Always reserve both sidebars so modal width stays stable when selection toggles
    const stack = tableSidebarW + PANEL_HANDLE_W + cellSidebarW;
    const width = Math.min(
      maxModal,
      SIDEBAR_STACK_PAD_X + stack + PANEL_HANDLE_W + TABLE_PANE_DEFAULT_W,
    );
    return {
      width,
      maxWidth: '95dvw',
      height: '95dvh',
      maxHeight: '95dvh',
    };
  }, [cellSidebarW, isLandscape, tableSidebarW, viewportW]);

  const selectedStyle: HaimTableStyle = useMemo(() => {
    if (!primaryCell) return {};
    return meta.cells[cellKey(primaryCell.r, primaryCell.c)] ?? {};
  }, [meta.cells, primaryCell]);

  const applyStyleToSelection = useCallback(
    (style: HaimTableStyle) => {
      if (!selectedCells.length) return;
      setMeta((prev) => {
        const cells = { ...prev.cells };
        for (const { r, c } of selectedCells) {
          const key = cellKey(r, c);
          if (isEmptyStyle(style)) delete cells[key];
          else cells[key] = style;
        }
        return { ...prev, cells };
      });
    },
    [selectedCells],
  );

  const applyGridMeta = useCallback((next: { grid: HaimTableGrid; meta: HaimTableMeta }) => {
    setGrid(next.grid);
    setMeta(next.meta);
    setSel(null);
    setRangeDrag(false);
    selAnchorRef.current = null;
    setHoverInsert(null);
  }, []);

  const gridRef = useRef(grid);
  const metaRef = useRef(meta);
  gridRef.current = grid;
  metaRef.current = meta;

  const addRowAt = useCallback(
    (index: number) => {
      applyGridMeta(insertRowAt(gridRef.current, metaRef.current, index));
    },
    [applyGridMeta],
  );

  const addColAt = useCallback(
    (index: number) => {
      applyGridMeta(insertColAt(gridRef.current, metaRef.current, index));
    },
    [applyGridMeta],
  );

  const requestDeleteRows = useCallback((anchorR?: number) => {
    // Prefer live selection + anchor; do not rely on hover preview (cleared on menu close).
    const s = selRef.current;
    let top: number;
    let bottom: number;
    if (s) {
      top = Math.min(s.r0, s.r1);
      bottom = Math.max(s.r0, s.r1);
      if (anchorR != null && (anchorR < top || anchorR > bottom)) {
        top = anchorR;
        bottom = anchorR;
      }
    } else if (anchorR != null) {
      top = anchorR;
      bottom = anchorR;
    } else {
      const preview = deletePreviewRef.current;
      if (preview?.kind === 'row' && preview.indices.length) {
        setDeletePreview(null);
        setDeleteConfirm({ kind: 'row', indices: [...preview.indices] });
      }
      return;
    }
    const indices: number[] = [];
    for (let r = top; r <= bottom; r += 1) indices.push(r);
    const rows = gridRef.current.rows.length;
    if (rows <= 1 || indices.length === 0 || indices.length >= rows) return;
    setDeletePreview(null);
    setDeleteConfirm({ kind: 'row', indices });
  }, []);

  const requestDeleteCols = useCallback((anchorC?: number) => {
    const s = selRef.current;
    let left: number;
    let right: number;
    if (s) {
      left = Math.min(s.c0, s.c1);
      right = Math.max(s.c0, s.c1);
      if (anchorC != null && (anchorC < left || anchorC > right)) {
        left = anchorC;
        right = anchorC;
      }
    } else if (anchorC != null) {
      left = anchorC;
      right = anchorC;
    } else {
      const preview = deletePreviewRef.current;
      if (preview?.kind === 'col' && preview.indices.length) {
        setDeletePreview(null);
        setDeleteConfirm({ kind: 'col', indices: [...preview.indices] });
      }
      return;
    }
    const indices: number[] = [];
    for (let c = left; c <= right; c += 1) indices.push(c);
    const cols = Math.max(
      1,
      ...gridRef.current.rows.map((rr) => rr.length),
      gridRef.current.aligns.length,
      1,
    );
    if (cols <= 1 || indices.length === 0 || indices.length >= cols) return;
    setDeletePreview(null);
    setDeleteConfirm({ kind: 'col', indices });
  }, []);

  const showDeleteRowPreview = useCallback((anchorR: number) => {
    const s = selRef.current;
    let top: number;
    let bottom: number;
    if (s) {
      top = Math.min(s.r0, s.r1);
      bottom = Math.max(s.r0, s.r1);
      if (anchorR < top || anchorR > bottom) {
        top = anchorR;
        bottom = anchorR;
      }
    } else {
      top = anchorR;
      bottom = anchorR;
    }
    const indices: number[] = [];
    for (let r = top; r <= bottom; r += 1) indices.push(r);
    const rows = gridRef.current.rows.length;
    if (rows <= 1 || indices.length === 0 || indices.length >= rows) {
      setDeletePreview(null);
      return;
    }
    setDeletePreview({ kind: 'row', indices });
  }, []);

  const showDeleteColPreview = useCallback((anchorC: number) => {
    const s = selRef.current;
    let left: number;
    let right: number;
    if (s) {
      left = Math.min(s.c0, s.c1);
      right = Math.max(s.c0, s.c1);
      if (anchorC < left || anchorC > right) {
        left = anchorC;
        right = anchorC;
      }
    } else {
      left = anchorC;
      right = anchorC;
    }
    const indices: number[] = [];
    for (let c = left; c <= right; c += 1) indices.push(c);
    const cols = Math.max(
      1,
      ...gridRef.current.rows.map((rr) => rr.length),
      gridRef.current.aligns.length,
      1,
    );
    if (cols <= 1 || indices.length === 0 || indices.length >= cols) {
      setDeletePreview(null);
      return;
    }
    setDeletePreview({ kind: 'col', indices });
  }, []);

  const clearDeletePreview = useCallback(() => {
    setDeletePreview(null);
  }, []);

  const confirmDelete = useCallback(() => {
    if (!deleteConfirm) return;
    if (deleteConfirm.kind === 'row') {
      applyGridMeta(deleteRowsAt(gridRef.current, metaRef.current, deleteConfirm.indices));
    } else {
      applyGridMeta(deleteColsAt(gridRef.current, metaRef.current, deleteConfirm.indices));
    }
    setDeleteConfirm(null);
    setDeletePreview(null);
  }, [applyGridMeta, deleteConfirm]);

  const canMerge = Boolean(sel && !(sel.r0 === sel.r1 && sel.c0 === sel.c1));

  const mergeSelected = useCallback(() => {
    if (!sel || (sel.r0 === sel.r1 && sel.c0 === sel.c1)) return;
    setMeta((p) => ({
      ...p,
      merges: mergeSelection(p.merges, sel.r0, sel.c0, sel.r1, sel.c1),
    }));
  }, [sel]);

  const unmergeSelected = useCallback(() => {
    if (!sel) return;
    setMeta((p) => ({
      ...p,
      merges: unmergeSelection(p.merges, sel.r0, sel.c0, sel.r1, sel.c1),
    }));
  }, [sel]);

  const nudgeSelectedFontSize = useCallback(
    (delta: number) => {
      if (!selectedCells.length) return;
      setMeta((prev) => {
        const cells = { ...prev.cells };
        const tableDefault = prev.style?.fontSize;
        for (const { r, c } of selectedCells) {
          const key = cellKey(r, c);
          const cur = cells[key] ?? {};
          cells[key] = {
            ...cur,
            fontSize: nudgeCssFontSize(cur.fontSize ?? tableDefault, delta),
          };
        }
        return { ...prev, cells };
      });
    },
    [selectedCells],
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey) || e.altKey) return;

      // Cmd/Ctrl+Shift+> / < — bump selected cell font-size
      if (e.shiftKey) {
        const up =
          e.code === 'Period'
          || e.key === '>'
          || e.key === '.';
        const down =
          e.code === 'Comma'
          || e.key === '<'
          || e.key === ',';
        if (up || down) {
          if (!selectedCells.length) return;
          e.preventDefault();
          e.stopPropagation();
          nudgeSelectedFontSize(up ? 1 : -1);
          return;
        }
      }

      if (e.code !== 'KeyE' && e.key.toLowerCase() !== 'e') return;
      e.preventDefault();
      e.stopPropagation();
      if (e.shiftKey) unmergeSelected();
      else mergeSelected();
    };
    window.addEventListener('keydown', onKeyDown, true);
    return () => window.removeEventListener('keydown', onKeyDown, true);
  }, [isOpen, mergeSelected, nudgeSelectedFontSize, selectedCells.length, unmergeSelected]);

  const onTablePointerMove = useCallback(
    (e: ReactMouseEvent) => {
      if (cellMenuOpenRef.current) {
        setHoverInsert(null);
        return;
      }
      if (rangeDrag || edgeResizing) {
        if (rangeDrag) setHoverInsert(null);
        return;
      }
      // Keep button / strip visible while pointer is on edge controls
      if (
        (e.target as HTMLElement | null)?.closest?.(
          '[data-haim-edge-add], [data-haim-edge-hit]',
        )
      ) {
        return;
      }
      const table = tableRef.current;
      const wrap = tableWrapRef.current;
      if (!table || !wrap) return;
      const next = detectHoverInsert(
        table,
        wrap,
        e.clientX,
        e.clientY,
        rowCount,
        colCount,
        meta.merges,
      );
      setHoverInsert((prev) => {
        if (!next) return null;
        if (prev && prev.kind === next.kind && prev.index === next.index) {
          if (prev.x === next.x && prev.y === next.y) return prev;
          // Same edge: only move the + button so glow/ghost animations stay put
          return { ...prev, x: next.x, y: next.y };
        }
        return next;
      });
    },
    [colCount, edgeResizing, meta.merges, rangeDrag, rowCount],
  );

  const startEdgeResize = useCallback(
    (e: ReactPointerEvent, insert: HoverInsert) => {
      // Topmost / leftmost outer border: insert only, no size drag
      if (insert.index === 0) return;
      if (cellMenuOpenRef.current) return;

      e.preventDefault();
      e.stopPropagation();
      const table = tableRef.current;
      if (!table) return;

      const resizeIndex = insert.index - 1;
      // Anchor rect at pointer-down so width/height track absolute mouse position
      let anchorLeft = 0;
      let anchorTop = 0;

      if (insert.kind === 'col') {
        const el = table.querySelector(`[data-edit-c="${resizeIndex}"]`) as HTMLElement | null;
        const rect = el?.getBoundingClientRect();
        if (!rect) return;
        anchorLeft = rect.left;
      } else {
        const row = table.rows[resizeIndex];
        const rect = row?.getBoundingClientRect();
        if (!rect) return;
        anchorTop = rect.top;
      }

      setEdgeResizing(true);
      setRangeDrag(false);
      setHoverInsert(null);

      const onMove = (moveEvent: PointerEvent) => {
        let nextPx = 24;
        if (insert.kind === 'col') {
          nextPx = moveEvent.clientX - anchorLeft;
        } else {
          nextPx = moveEvent.clientY - anchorTop;
        }
        nextPx = Math.max(24, Math.round(nextPx));
        setMeta((prev) => {
          if (insert.kind === 'col') {
            return { ...prev, colWidths: setSizeAt(prev.colWidths, resizeIndex, nextPx) };
          }
          return { ...prev, rowHeights: setSizeAt(prev.rowHeights, resizeIndex, nextPx) };
        });
      };

      const onUp = () => {
        document.removeEventListener('pointermove', onMove, true);
        document.removeEventListener('pointerup', onUp, true);
        document.removeEventListener('pointercancel', onUp, true);
        setEdgeResizing(false);
      };

      document.addEventListener('pointermove', onMove, true);
      document.addEventListener('pointerup', onUp, true);
      document.addEventListener('pointercancel', onUp, true);
    },
    [],
  );

  const setCellText = useCallback((r: number, c: number, text: string) => {
    setGrid((prev) => {
      const cols = Math.max(1, ...prev.rows.map((rr) => rr.length), prev.aligns.length);
      const rows = prev.rows.map((rr) => [...rr]);
      while (rows.length <= r) rows.push(Array(cols).fill(''));
      const line = [...(rows[r] ?? Array(cols).fill(''))];
      while (line.length < cols) line.push('');
      line[c] = text;
      rows[r] = line;
      return { ...prev, rows };
    });
  }, []);

  const focusCellAt = useCallback(
    (r: number, c: number) => {
      const table = tableRef.current;
      if (!table) return;
      const input = table.querySelector(
        `td[data-edit-r="${r}"][data-edit-c="${c}"] input`,
      ) as HTMLInputElement | null;
      if (!input) return;
      setSel({ r0: r, c0: c, r1: r, c1: c });
      selAnchorRef.current = { r, c };
      setRangeDrag(false);
      setHoverInsert(null);
      // Focus after React applies selection outline
      requestAnimationFrame(() => {
        input.focus();
        input.select();
      });
    },
    [],
  );

  const selectSingleCell = useCallback((r: number, c: number) => {
    setSel({ r0: r, c0: c, r1: r, c1: c });
    selAnchorRef.current = { r, c };
    setRangeDrag(false);
    setHoverInsert(null);
  }, []);

  const clearCellSelection = useCallback(() => {
    setSel(null);
    setRangeDrag(false);
    selAnchorRef.current = null;
    const active = document.activeElement as HTMLElement | null;
    if (active?.closest?.('td[data-edit-r]')) active.blur();
  }, []);

  const selectRangeTo = useCallback((r: number, c: number) => {
    const anchor = selAnchorRef.current;
    if (!anchor) {
      selectSingleCell(r, c);
      return;
    }
    setSel({ r0: anchor.r, c0: anchor.c, r1: r, c1: c });
    setRangeDrag(false);
    setHoverInsert(null);
  }, [selectSingleCell]);

  const beginRangeDrag = useCallback((r: number, c: number) => {
    setSel({ r0: r, c0: c, r1: r, c1: c });
    selAnchorRef.current = { r, c };
    setRangeDrag(true);
    setHoverInsert(null);
    const active = document.activeElement as HTMLElement | null;
    if (active?.closest?.('td[data-edit-r]')) active.blur();
  }, []);

  const extendRangeDragTo = useCallback((r: number, c: number) => {
    if (!rangeDragRef.current) return;
    setSel((prev) => (prev ? { ...prev, r1: r, c1: c } : prev));
  }, []);

  useEffect(() => {
    if (!rangeDrag) return undefined;
    const endDrag = () => setRangeDrag(false);
    window.addEventListener('mouseup', endDrag, true);
    window.addEventListener('pointerup', endDrag, true);
    return () => {
      window.removeEventListener('mouseup', endDrag, true);
      window.removeEventListener('pointerup', endDrag, true);
    };
  }, [rangeDrag]);

  /** Space (when no cell selected) arms click-drag pan; ignore while typing in fields. */
  useEffect(() => {
    if (!isOpen) return undefined;
    const isTypingTarget = (t: EventTarget | null) => {
      const el = t as HTMLElement | null;
      if (!el) return false;
      const tag = el.tagName?.toLowerCase?.() ?? '';
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return true;
      if (el.isContentEditable) return true;
      return Boolean(el.closest?.('input, textarea, select, [contenteditable="true"]'));
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code !== 'Space' && e.key !== ' ') return;
      if (e.repeat) return;
      if (isTypingTarget(e.target)) return;
      if (selRef.current) return;
      e.preventDefault();
      setSpacePanReady(true);
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code !== 'Space' && e.key !== ' ') return;
      setSpacePanReady(false);
    };
    const onBlur = () => setSpacePanReady(false);
    window.addEventListener('keydown', onKeyDown, true);
    window.addEventListener('keyup', onKeyUp, true);
    window.addEventListener('blur', onBlur);
    return () => {
      window.removeEventListener('keydown', onKeyDown, true);
      window.removeEventListener('keyup', onKeyUp, true);
      window.removeEventListener('blur', onBlur);
      setSpacePanReady(false);
    };
  }, [isOpen]);

  // Drop space-pan arming when a cell becomes selected
  useEffect(() => {
    if (sel) setSpacePanReady(false);
  }, [sel]);

  const endPan = useCallback(() => {
    setPanning(false);
  }, []);

  const onTablePanePointerDown = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      const pane = tablePaneRef.current;
      if (!pane) return;

      const isMiddle = e.button === 1;
      const isSpacePan =
        e.button === 0 && spacePanReady && !selRef.current;

      if (isMiddle || isSpacePan) {
        e.preventDefault();
        e.stopPropagation();
        setHoverInsert(null);
        panLastRef.current = { x: e.clientX, y: e.clientY };
        setPanning(true);
        pane.setPointerCapture(e.pointerId);
        return;
      }
    },
    [spacePanReady],
  );

  const onTablePanePointerMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (!panning) return;
      const pane = tablePaneRef.current;
      if (!pane) return;
      const dx = e.clientX - panLastRef.current.x;
      const dy = e.clientY - panLastRef.current.y;
      panLastRef.current = { x: e.clientX, y: e.clientY };
      pane.scrollLeft -= dx;
      pane.scrollTop -= dy;
    },
    [panning],
  );

  const onTablePanePointerUp = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (!panning) return;
      const pane = tablePaneRef.current;
      if (pane?.hasPointerCapture(e.pointerId)) {
        pane.releasePointerCapture(e.pointerId);
      }
      endPan();
    },
    [endPan, panning],
  );

  /** Left-click outside the table (not on sidebars) clears cell selection. */
  const onEditorPointerDownCapture = useCallback(
    (e: ReactPointerEvent<HTMLFormElement>) => {
      if (e.button !== 0) return;
      if (spacePanReady || panning) return;
      const t = e.target as HTMLElement | null;
      if (!t) return;
      if (t.closest('[data-haim-table-sidebars]')) return;
      if (
        t.closest(
          '[data-haim-table-canvas] table, [data-haim-edge-hit], [data-haim-edge-add], [data-haim-insert-preview]',
        )
      ) {
        return;
      }
      if (!selRef.current) return;
      clearCellSelection();
    },
    [clearCellSelection, panning, spacePanReady],
  );

  const moveCellFocus = useCallback(
    (fromR: number, fromC: number, dR: number, dC: number) => {
      let r = fromR + dR;
      let c = fromC + dC;
      while (r >= 0 && r < rowCount && c >= 0 && c < colCount) {
        if (!covered.has(`${r},${c}`)) {
          focusCellAt(r, c);
          return;
        }
        r += dR;
        c += dC;
      }
    },
    [colCount, covered, focusCellAt, rowCount],
  );

  const onCellInputKeyDown = useCallback(
    (e: ReactKeyboardEvent<HTMLInputElement>, r: number, c: number) => {
      if (e.nativeEvent.isComposing) return;

      if (e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        if (e.shiftKey) moveCellFocus(r, c, -1, 0);
        else moveCellFocus(r, c, 1, 0);
        return;
      }

      if (!e.altKey) return;
      let dR = 0;
      let dC = 0;
      if (e.key === 'ArrowUp') dR = -1;
      else if (e.key === 'ArrowDown') dR = 1;
      else if (e.key === 'ArrowLeft') dC = -1;
      else if (e.key === 'ArrowRight') dC = 1;
      else return;

      e.preventDefault();
      e.stopPropagation();
      moveCellFocus(r, c, dR, dC);
    },
    [moveCellFocus],
  );

  const primaryCellText = useMemo(() => {
    if (!primaryCell) return '';
    return grid.rows[primaryCell.r]?.[primaryCell.c] ?? '';
  }, [grid.rows, primaryCell]);

  const activeTemplate = useMemo(
    () => (meta.templateId ? templates.find((t) => t.id === meta.templateId) ?? null : null),
    [meta.templateId, templates],
  );

  const cellPreviewStyle = useCallback(
    (r: number, c: number): CSSProperties => {
      const style = resolveCellStyle({
        row: r,
        col: c,
        rowCount,
        colCount,
        meta,
        template: activeTemplate,
      });
      const out: CSSProperties = {};
      if (style.bg) out.backgroundColor = style.bg;
      if (style.color) out.color = style.color;
      if (style.fontFamily) out.fontFamily = style.fontFamily;
      if (style.fontSize) out.fontSize = style.fontSize;
      if (style.fontWeight) out.fontWeight = style.fontWeight;
      return out;
    },
    [activeTemplate, colCount, meta, rowCount],
  );

  const isSelected = (r: number, c: number) => {
    if (!sel) return false;
    const top = Math.min(sel.r0, sel.r1);
    const left = Math.min(sel.c0, sel.c1);
    const bottom = Math.max(sel.r0, sel.r1);
    const right = Math.max(sel.c0, sel.c1);
    return r >= top && r <= bottom && c >= left && c <= right;
  };

  const sectionIcon = (key: HaimTableSectionKey) => {
    if (key === 'thead') return <PanelTop className={ICON_XS} aria-hidden />;
    if (key === 'tfoot') return <PanelBottom className={ICON_XS} aria-hidden />;
    return <Layers className={ICON_XS} aria-hidden />;
  };

  return (
    <>
    <Modal
      isOpen={isOpen}
      onClose={() => {
        if (deleteConfirm !== null) {
          setDeleteConfirm(null);
          return;
        }
        onClose();
      }}
      overlayClassName="p-[2.5dvh]"
      contentClassName="h-[95dvh] max-h-[95dvh] max-w-[95dvw]"
      contentStyle={modalContentStyle}
      resizeHeight
    >
      <Form.Root
        className="flex h-full min-h-0 flex-col"
        onSubmit={(e) => e.preventDefault()}
        onPointerDownCapture={onEditorPointerDownCapture}
      >
        <header className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-gray-100 px-3 py-2 dark:border-odp-border">
          <h2 className="inline-flex items-center gap-1.5 text-sm font-bold text-gray-800 dark:text-odp-fgStrong">
            <Table2 className={ICON_SM} aria-hidden />
            표 편집
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={!canUndo}
              title={`실행 취소 (${UNDO_SHORTCUT})`}
              aria-label={`실행 취소 (${UNDO_SHORTCUT})`}
              onClick={() => undo()}
              className="inline-flex items-center gap-1 rounded px-2 py-1.5 text-xs text-gray-600 hover:bg-gray-100 disabled:opacity-40 dark:text-odp-muted dark:hover:bg-odp-bgSoft"
            >
              <Undo2 className={ICON_XS} aria-hidden />
              실행 취소
            </button>
            <button
              type="button"
              disabled={!canRedo}
              title={`다시 실행 (${REDO_SHORTCUT})`}
              aria-label={`다시 실행 (${REDO_SHORTCUT})`}
              onClick={() => redo()}
              className="inline-flex items-center gap-1 rounded px-2 py-1.5 text-xs text-gray-600 hover:bg-gray-100 disabled:opacity-40 dark:text-odp-muted dark:hover:bg-odp-bgSoft"
            >
              <Redo2 className={ICON_XS} aria-hidden />
              다시 실행
            </button>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1 rounded px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 dark:text-odp-muted dark:hover:bg-odp-bgSoft"
            >
              <X className={ICON_XS} aria-hidden />
              취소
            </button>
            <button
              type="button"
              onClick={() => onSave(meta, grid)}
              className="inline-flex items-center gap-1 rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700"
            >
              <Check className={ICON_XS} aria-hidden />
              적용
            </button>
          </div>
        </header>

        <div className="flex min-h-0 flex-1 flex-col landscape:flex-row">
          {/* Sidebars: (1) table+group always (2) cell when selected */}
          <div
            data-haim-table-sidebars=""
            className="order-2 flex max-h-[42%] min-h-0 w-full shrink-0 flex-col gap-2 overflow-hidden border-t border-gray-100 bg-gray-50/80 p-2 dark:border-odp-border dark:bg-odp-bgSoft/40 portrait:max-h-[42%] landscape:order-1 landscape:max-h-none landscape:w-auto landscape:flex-row landscape:gap-0 landscape:border-t-0 landscape:border-r-0"
          >
            {/* 1) Table + group (sections) */}
            <aside
              className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto rounded-lg border border-gray-200 bg-white dark:border-odp-borderStrong dark:bg-odp-surface landscape:flex-none landscape:shrink-0"
              style={isLandscape ? { width: tableSidebarW } : undefined}
            >
              <div className="sticky top-0 z-[1] border-b border-gray-100 bg-white px-2.5 py-1.5 dark:border-odp-border dark:bg-odp-surface">
                <h3 className="inline-flex items-center gap-1 text-[11px] font-semibold text-gray-700 dark:text-odp-fgStrong">
                  <Table2 className={ICON_XS} aria-hidden />
                  표 · 그룹
                </h3>
              </div>
              <div className="space-y-2 p-2.5">
              <div className="flex flex-wrap gap-2">
                <Form.Field name="template" className="flex min-w-0 flex-1 flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted">
                  <Form.Label asChild>
                    <span>
                      <FieldLabel icon={<LayoutTemplate className={ICON_XS} />}>템플릿</FieldLabel>
                    </span>
                  </Form.Label>
                  <RadixSelectField
                    aria-label="표 템플릿"
                    value={meta.templateId ?? TEMPLATE_NONE}
                    onValueChange={(id) => {
                      if (id === TEMPLATE_NONE) {
                        setMeta((p) => {
                          const next = { ...p };
                          delete next.templateId;
                          return next;
                        });
                        return;
                      }
                      const tpl = templates.find((t) => t.id === id);
                      if (!tpl) return;
                      setMeta((p) => applyTemplateToMeta(p, tpl));
                    }}
                    options={[
                      { value: TEMPLATE_NONE, label: '템플릿 없음' },
                      ...templates.map((t) => ({ value: t.id, label: t.name })),
                    ]}
                    className="w-full min-w-0"
                  />
                </Form.Field>
                <button
                  type="button"
                  className="mt-auto inline-flex h-8 items-center gap-1 self-end rounded-md bg-gray-100 px-2 text-[11px] dark:bg-odp-bgSoft"
                  onClick={() => {
                    setEditingTemplate({
                      id: `template-${Date.now().toString(36)}`,
                      name: '새 템플릿',
                      sections: {},
                      rules: [],
                    });
                    setTemplateEditorOpen(true);
                  }}
                >
                  <LayoutTemplate className={ICON_XS} aria-hidden />
                  관리
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Form.Field name="headerRows" className="flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted">
                  <Form.Label asChild>
                    <span>
                      <FieldLabel icon={<PanelTop className={ICON_XS} />}>headerRows</FieldLabel>
                    </span>
                  </Form.Label>
                  <Form.Control asChild>
                    <input
                      type="number"
                      min={0}
                      max={rowCount}
                      value={meta.headerRows}
                      onChange={(e) =>
                        setMeta((p) => ({
                          ...p,
                          headerRows: Math.max(0, Number(e.target.value) || 0),
                        }))
                      }
                      className={formInputCompactClassName}
                    />
                  </Form.Control>
                </Form.Field>
                <Form.Field name="footerRows" className="flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted">
                  <Form.Label asChild>
                    <span>
                      <FieldLabel icon={<PanelBottom className={ICON_XS} />}>footerRows</FieldLabel>
                    </span>
                  </Form.Label>
                  <Form.Control asChild>
                    <input
                      type="number"
                      min={0}
                      max={rowCount}
                      value={meta.footerRows}
                      onChange={(e) =>
                        setMeta((p) => ({
                          ...p,
                          footerRows: Math.max(0, Number(e.target.value) || 0),
                        }))
                      }
                      className={formInputCompactClassName}
                    />
                  </Form.Control>
                </Form.Field>
                <Form.Field name="width" className="flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted">
                  <Form.Label asChild>
                    <span>
                      <FieldLabel icon={<Maximize2 className={ICON_XS} />}>너비</FieldLabel>
                    </span>
                  </Form.Label>
                  <RadixSelectField
                    aria-label="표 너비"
                    value={meta.width}
                    onValueChange={(v) =>
                      setMeta((p) => ({
                        ...p,
                        width: v === 'fit' ? 'fit' : 'full',
                      }))
                    }
                    options={[...WIDTH_OPTIONS]}
                    className="w-full"
                  />
                </Form.Field>
                <Form.Field
                  name="align"
                  className={`flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted ${
                    meta.width !== 'fit' ? 'opacity-40' : ''
                  }`}
                >
                  <Form.Label asChild>
                    <span>
                      <FieldLabel
                        icon={
                          meta.align === 'right' ? (
                            <AlignRight className={ICON_XS} />
                          ) : (
                            <AlignLeft className={ICON_XS} />
                          )
                        }
                      >
                        정렬
                      </FieldLabel>
                    </span>
                  </Form.Label>
                  <RadixSelectField
                    aria-label="표 정렬"
                    value={meta.align}
                    disabled={meta.width !== 'fit'}
                    onValueChange={(v) =>
                      setMeta((p) => ({
                        ...p,
                        align: v === 'right' ? 'right' : 'left',
                      }))
                    }
                    options={[...ALIGN_OPTIONS]}
                    className="w-full"
                  />
                </Form.Field>
              </div>

              <div className="space-y-1 border-t border-gray-100 pt-2 dark:border-odp-border">
                <p className="text-[10px] font-medium text-gray-600 dark:text-odp-muted">표 기본 폰트·스타일</p>
                <p className="text-[10px] text-gray-400 dark:text-odp-muted">
                  셀·그룹 값이 있으면 그쪽이 우선합니다.
                </p>
                <HaimTableStyleFields
                  compact
                  idPrefix="table-edit-table"
                  value={meta.style ?? {}}
                  onChange={(style) =>
                    setMeta((p) => ({
                      ...p,
                      style: isEmptyStyle(style) ? {} : style,
                    }))
                  }
                />
              </div>

              <div className="space-y-1 border-t border-gray-100 pt-2 dark:border-odp-border">
                <p className="inline-flex items-center gap-1 text-[10px] font-medium text-gray-600 dark:text-odp-muted">
                  <Layers className={ICON_XS} aria-hidden />
                  그룹 스타일
                </p>
                <p className="text-[10px] text-gray-400 dark:text-odp-muted">
                  thead / tbody / tfoot 구역
                </p>
                <div className="mb-1 flex flex-wrap gap-1">
                  {SECTION_KEYS.map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSectionTab(key)}
                      className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] ${
                        sectionTab === key ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-odp-bgSoft'
                      }`}
                    >
                      {sectionIcon(key)}
                      {key}
                    </button>
                  ))}
                </div>
                <HaimTableStyleFields
                  compact
                  idPrefix={`table-edit-${sectionTab}`}
                  value={meta.sections[sectionTab] ?? {}}
                  onChange={(style) =>
                    setMeta((p) => ({
                      ...p,
                      sections: { ...p.sections, [sectionTab]: style },
                    }))
                  }
                />
              </div>
              </div>
            </aside>

            {/* 2) Cell — slot always reserved (landscape); hide only visually when unused */}
            <PanelColResizeHandle
              ariaLabel="표 사이드바와 셀 사이드바 사이 너비 조절"
              onDelta={resizeBetweenSidebars}
            />
            <aside
              aria-hidden={!showCellSidebar}
              className={`flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto rounded-lg border border-blue-200 bg-white dark:border-blue-900/50 dark:bg-odp-surface landscape:flex-none landscape:shrink-0 ${
                showCellSidebar
                  ? ''
                  : 'pointer-events-none portrait:hidden landscape:invisible'
              }`}
              style={isLandscape ? { width: cellSidebarW } : undefined}
            >
              {primaryCell ? (
                <>
                <div className="sticky top-0 z-[1] border-b border-blue-100 bg-white px-2.5 py-1.5 dark:border-blue-900/40 dark:bg-odp-surface">
                  <h3 className="inline-flex items-center gap-1 text-[11px] font-semibold text-gray-700 dark:text-odp-fgStrong">
                    <Paintbrush className={ICON_XS} aria-hidden />
                    셀
                    <span className="font-normal text-gray-400 dark:text-odp-muted">
                      ({primaryCell.r + 1}행 {primaryCell.c + 1}열
                      {selectedCells.length > 1 ? ` · ${selectedCells.length}칸` : ''})
                    </span>
                  </h3>
                </div>
                <div className="space-y-2 p-2.5">
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    disabled={!canMerge}
                    title={`병합 (${MERGE_SHORTCUT})`}
                    className="inline-flex flex-1 items-center justify-center gap-1 rounded-md bg-gray-100 px-2 py-1.5 text-[11px] disabled:opacity-40 dark:bg-odp-bgSoft"
                    onClick={mergeSelected}
                  >
                    <TableCellsMerge className={ICON_XS} aria-hidden />
                    병합
                  </button>
                  <button
                    type="button"
                    disabled={!sel}
                    title={`병합 해제 (${UNMERGE_SHORTCUT})`}
                    className="inline-flex flex-1 items-center justify-center gap-1 rounded-md bg-gray-100 px-2 py-1.5 text-[11px] disabled:opacity-40 dark:bg-odp-bgSoft"
                    onClick={unmergeSelected}
                  >
                    <TableCellsSplit className={ICON_XS} aria-hidden />
                    병합 해제
                  </button>
                </div>
                <p className="text-[10px] text-gray-400 dark:text-odp-muted">
                  글자 크기: {FONT_SIZE_UP_SHORTCUT} / {FONT_SIZE_DOWN_SHORTCUT}
                </p>
                <Form.Field name="cell-text" className="flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted">
                  <Form.Label asChild>
                    <span>
                      <FieldLabel icon={<TextCursorInput className={ICON_XS} />}>셀 텍스트</FieldLabel>
                    </span>
                  </Form.Label>
                  <Form.Control asChild>
                    <input
                      type="text"
                      value={primaryCellText}
                      onChange={(e) => setCellText(primaryCell.r, primaryCell.c, e.target.value)}
                      placeholder="셀 내용 입력"
                      className={formInputClassName}
                    />
                  </Form.Control>
                </Form.Field>
                <HaimTableStyleFields
                  compact
                  idPrefix="table-edit-cell"
                  value={selectedStyle}
                  onChange={applyStyleToSelection}
                />
                </div>
                </>
              ) : null}
            </aside>
            <PanelColResizeHandle
              ariaLabel="사이드바와 표 사이 너비 조절"
              onDelta={resizeCellSidebar}
            />
          </div>

          {/* Table preview: portrait top, landscape right */}
          <div
            ref={tablePaneRef}
            data-haim-table-canvas=""
            className={`order-1 flex min-h-0 min-w-0 flex-1 flex-col overflow-auto border-t border-gray-100 p-3 landscape:order-2 landscape:border-t-0 landscape:border-l dark:border-odp-border ${
              panning
                ? 'cursor-grabbing select-none'
                : spacePanReady && !sel
                  ? 'cursor-grab select-none'
                  : ''
            }`}
            onMouseLeave={() => {
              if (!edgeResizing) setHoverInsert(null);
            }}
            onPointerDown={onTablePanePointerDown}
            onPointerMove={onTablePanePointerMove}
            onPointerUp={onTablePanePointerUp}
            onPointerCancel={onTablePanePointerUp}
            onAuxClick={(e) => {
              // Prevent browser middle-click autoscroll affordance
              if (e.button === 1) e.preventDefault();
            }}
          >
            <p className="mb-2 inline-flex shrink-0 items-center gap-1 text-[10px] text-gray-400">
              <Columns3 className={ICON_XS} aria-hidden />
              더블클릭 드래그·Shift+클릭: 범위 선택 · 우클릭: 행/열 삭제 · 휠클릭/스페이스+드래그: 패닝 · {UNDO_SHORTCUT}/{REDO_SHORTCUT}: 실행 취소/다시 실행 · 테두리 더블클릭: 행·열 추가
            </p>
            <div
              ref={tableWrapRef}
              className="relative inline-block min-w-full p-5"
              data-haim-inserting={hoverInsert?.kind ?? undefined}
              onMouseMove={onTablePointerMove}
              onMouseLeave={() => {
                if (!edgeResizing) setHoverInsert(null);
              }}
            >
              <Tooltip.Provider delayDuration={0} skipDelayDuration={0}>
                <table
                  ref={tableRef}
                  className={`border-collapse text-sm ${
                    meta.colWidths?.some((s) => s && s.trim()) ? 'w-max max-w-full' : 'w-full'
                  }`}
                  style={{
                    tableLayout:
                      meta.colWidths?.some((s) => s && s.trim())
                      || meta.rowHeights?.some((s) => s && s.trim())
                        ? 'fixed'
                        : undefined,
                    ...(meta.style?.fontFamily ? { fontFamily: meta.style.fontFamily } : {}),
                    ...(meta.style?.fontSize ? { fontSize: meta.style.fontSize } : {}),
                    ...(meta.style?.fontWeight ? { fontWeight: meta.style.fontWeight } : {}),
                  }}
                >
                  <colgroup>
                    {Array.from({ length: colCount }, (_, c) => {
                      const w = sizeAt(meta.colWidths, c);
                      return <col key={c} style={w ? { width: w } : undefined} />;
                    })}
                  </colgroup>
                  <tbody>
                    {grid.rows.map((row, r) => {
                      const rowH = sizeAt(meta.rowHeights, r);
                      return (
                      <tr key={r} style={rowH ? { height: rowH } : undefined}>
                        {Array.from({ length: colCount }, (_, c) => {
                          if (covered.has(`${r},${c}`)) return null;
                          const merge = mergeAt(meta.merges, r, c);
                          const selected = isSelected(r, c);
                          const colW = sizeAt(meta.colWidths, c);
                          const cellTd = (
                            <td
                              key={c}
                              data-edit-r={r}
                              data-edit-c={c}
                              colSpan={merge?.colspan}
                              rowSpan={merge?.rowspan}
                              className={`min-h-11 cursor-pointer border-2 border-gray-300 p-0 transition-[box-shadow,outline-color] dark:border-odp-borderStrong ${
                                colW ? '' : 'min-w-28'
                              } ${
                                selected
                                  ? 'relative z-[1] outline outline-2 outline-offset-[-2px] outline-blue-500 ring-0'
                                  : 'hover:relative hover:z-[1] hover:outline hover:outline-2 hover:outline-offset-[-2px] hover:outline-blue-400/70'
                              }`}
                              onContextMenu={() => {
                                if (!isSelected(r, c)) selectSingleCell(r, c);
                                if (mobileContextMenu) {
                                  setCellMenuAt({ r, c });
                                  setHoverInsert(null);
                                }
                              }}
                              onMouseDown={(e) => {
                                // Middle / space-pan: let the table pane handle panning
                                if (e.button === 1) return;
                                if (e.button !== 0) return;
                                if (cellMenuOpenRef.current) return;
                                if (spacePanReadyRef.current && !selRef.current) return;

                                const target = e.target as HTMLElement | null;
                                if (target?.closest?.('[data-haim-edge-hit], [data-haim-edge-add]')) {
                                  e.preventDefault();
                                  return;
                                }
                                // Prefer edge insert/resize when pointer is on a border
                                {
                                  const table = tableRef.current;
                                  const wrap = tableWrapRef.current;
                                  if (table && wrap) {
                                    const onEdge = detectHoverInsert(
                                      table,
                                      wrap,
                                      e.clientX,
                                      e.clientY,
                                      rowCount,
                                      colCount,
                                      meta.merges,
                                    );
                                    if (onEdge) {
                                      e.preventDefault();
                                      return;
                                    }
                                  }
                                }

                                if (e.shiftKey) {
                                  e.preventDefault();
                                  selectRangeTo(r, c);
                                  return;
                                }

                                // detail>=2 is the second click of a double-click → start range drag
                                if (e.detail >= 2) {
                                  e.preventDefault();
                                  beginRangeDrag(r, c);
                                  return;
                                }

                                // Single click: select one cell (editing via input focus)
                                selectSingleCell(r, c);
                              }}
                              onDoubleClick={(e) => {
                                const table = tableRef.current;
                                const wrap = tableWrapRef.current;
                                if (table && wrap) {
                                  const onEdge = detectHoverInsert(
                                    table,
                                    wrap,
                                    e.clientX,
                                    e.clientY,
                                    rowCount,
                                    colCount,
                                    meta.merges,
                                  );
                                  if (onEdge) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    return;
                                  }
                                }
                                e.preventDefault();
                                beginRangeDrag(r, c);
                              }}
                              onMouseEnter={() => {
                                extendRangeDragTo(r, c);
                              }}
                            >
                              <Form.Field name={`cell-${r}-${c}`} className="contents">
                                <Form.Control asChild>
                                  <input
                                    type="text"
                                    value={row[c] ?? ''}
                                    onChange={(e) => setCellText(r, c, e.target.value)}
                                    onKeyDown={(e) => onCellInputKeyDown(e, r, c)}
                                    onMouseDown={(e) => {
                                      if (e.button === 1) return;
                                      if (e.button !== 0) return;
                                      if (cellMenuOpenRef.current) return;
                                      if (spacePanReadyRef.current && !selRef.current) return;

                                      // Border hit: do not focus/select — edge strip handles insert/resize
                                      if (
                                        (e.target as HTMLElement | null)?.closest?.(
                                          '[data-haim-edge-hit], [data-haim-edge-add]',
                                        )
                                      ) {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        return;
                                      }
                                      {
                                        const table = tableRef.current;
                                        const wrap = tableWrapRef.current;
                                        if (table && wrap) {
                                          const onEdge = detectHoverInsert(
                                            table,
                                            wrap,
                                            e.clientX,
                                            e.clientY,
                                            rowCount,
                                            colCount,
                                            meta.merges,
                                          );
                                          if (onEdge) {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            return;
                                          }
                                        }
                                      }

                                      if (e.shiftKey) {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        selectRangeTo(r, c);
                                        return;
                                      }
                                      if (e.detail >= 2) {
                                        // Double-click range drag: prevent text select, let handlers run
                                        e.preventDefault();
                                        return;
                                      }
                                      e.stopPropagation();
                                    }}
                                    onDoubleClick={(e) => {
                                      const table = tableRef.current;
                                      const wrap = tableWrapRef.current;
                                      if (table && wrap) {
                                        const onEdge = detectHoverInsert(
                                          table,
                                          wrap,
                                          e.clientX,
                                          e.clientY,
                                          rowCount,
                                          colCount,
                                          meta.merges,
                                        );
                                        if (onEdge) {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          return;
                                        }
                                      }
                                      e.preventDefault();
                                      e.stopPropagation();
                                      beginRangeDrag(r, c);
                                    }}
                                    onFocus={() => {
                                      if (rangeDragRef.current) return;
                                      if (spacePanReadyRef.current && !selRef.current) return;
                                      selectSingleCell(r, c);
                                    }}
                                    className={`${formInputCompactClassName} h-full min-h-11 w-full cursor-pointer border-transparent bg-transparent px-2 text-sm focus:cursor-text focus:border-gray-300 focus:bg-white/90 dark:focus:bg-odp-bgSoft/90 ${
                                      colW ? '' : 'min-w-28'
                                    }`}
                                    style={{
                                      ...cellPreviewStyle(r, c),
                                      ...(rowH ? { height: rowH } : {}),
                                    }}
                                  />
                                </Form.Control>
                              </Form.Field>
                            </td>
                          );

                          if (mobileContextMenu) {
                            return cellTd;
                          }

                          return (
                            <ContextMenu.Root
                              key={c}
                              onOpenChange={(open) => {
                                setCellMenuAt(open ? { r, c } : null);
                                if (open) {
                                  setHoverInsert(null);
                                } else {
                                  clearDeletePreview();
                                }
                              }}
                            >
                              <ContextMenu.Trigger asChild>{cellTd}</ContextMenu.Trigger>
                              <ContextMenu.Portal>
                                <ContextMenu.Content
                                  className={ctxMenuContentClass}
                                  onCloseAutoFocus={(e) => e.preventDefault()}
                                >
                                  <ContextMenu.Item
                                    className={ctxMenuDangerItemClass}
                                    disabled={rowCount <= 1}
                                    onPointerEnter={() => showDeleteRowPreview(r)}
                                    onPointerLeave={clearDeletePreview}
                                    onFocus={() => showDeleteRowPreview(r)}
                                    onBlur={clearDeletePreview}
                                    onSelect={() => {
                                      requestDeleteRows(r);
                                    }}
                                  >
                                    <Trash2 className={ICON_XS} aria-hidden />
                                    행 삭제
                                  </ContextMenu.Item>
                                  <ContextMenu.Item
                                    className={ctxMenuDangerItemClass}
                                    disabled={colCount <= 1}
                                    onPointerEnter={() => showDeleteColPreview(c)}
                                    onPointerLeave={clearDeletePreview}
                                    onFocus={() => showDeleteColPreview(c)}
                                    onBlur={clearDeletePreview}
                                    onSelect={() => {
                                      requestDeleteCols(c);
                                    }}
                                  >
                                    <Trash2 className={ICON_XS} aria-hidden />
                                    열 삭제
                                  </ContextMenu.Item>
                                </ContextMenu.Content>
                              </ContextMenu.Portal>
                            </ContextMenu.Root>
                          );
                        })}
                      </tr>
                      );
                    })}
                  </tbody>
                </table>

                {deletePreview ? (
                  <DeleteTargetOverlay
                    kind={deletePreview.kind}
                    indices={deletePreview.indices}
                    table={tableRef.current}
                    wrap={tableWrapRef.current}
                    colCount={colCount}
                  />
                ) : null}

                {mobileContextMenu && cellMenuAt ? (
                  <MobileContextMenuModal
                    open={cellMenuOpen}
                    onOpenChange={(open) => {
                      if (!open) {
                        setCellMenuAt(null);
                        clearDeletePreview();
                      }
                    }}
                    title={`${cellMenuAt.r + 1}행 ${cellMenuAt.c + 1}열`}
                    subtitle="표 편집 셀"
                  >
                    <button
                      type="button"
                      className={MOBILE_CONTEXT_MENU_DANGER_ITEM_CLASS}
                      disabled={rowCount <= 1}
                      onClick={() => {
                        requestDeleteRows(cellMenuAt.r);
                        setCellMenuAt(null);
                      }}
                    >
                      <Trash2 className={ICON_XS} aria-hidden />
                      행 삭제
                    </button>
                    <button
                      type="button"
                      className={MOBILE_CONTEXT_MENU_DANGER_ITEM_CLASS}
                      disabled={colCount <= 1}
                      onClick={() => {
                        requestDeleteCols(cellMenuAt.c);
                        setCellMenuAt(null);
                      }}
                    >
                      <Trash2 className={ICON_XS} aria-hidden />
                      열 삭제
                    </button>
                  </MobileContextMenuModal>
                ) : null}

                {hoverInsert && !cellMenuOpen ? (
                  <>
                    <InsertPreview
                      key={`preview-${hoverInsert.kind}-${hoverInsert.index}`}
                      insert={hoverInsert}
                    />
                    <EdgeHitStrip
                      key={`hit-${hoverInsert.kind}-${hoverInsert.index}`}
                      insert={hoverInsert}
                      allowResize={hoverInsert.index !== 0}
                      tip={
                        hoverInsert.index === 0
                          ? hoverInsert.label
                          : `${hoverInsert.label} · ${resizeHint(hoverInsert.kind)}`
                      }
                      onDoubleClickInsert={() => {
                        const { kind, index } = hoverInsert;
                        if (kind === 'row') addRowAt(index);
                        else addColAt(index);
                      }}
                      onResizePointerDown={(ev) => startEdgeResize(ev, hoverInsert)}
                    />
                    <EdgeAddButton
                      key={`btn-${hoverInsert.kind}-${hoverInsert.index}`}
                      tip={
                        hoverInsert.index === 0
                          ? hoverInsert.label
                          : `${hoverInsert.label} · ${resizeHint(hoverInsert.kind)}`
                      }
                      onDoubleClick={() => {
                        const { kind, index } = hoverInsert;
                        if (kind === 'row') addRowAt(index);
                        else addColAt(index);
                      }}
                      style={{ left: hoverInsert.x, top: hoverInsert.y }}
                    />
                  </>
                ) : null}
              </Tooltip.Provider>
            </div>
          </div>
        </div>
      </Form.Root>

      <TableStyleTemplateEditor
        isOpen={templateEditorOpen}
        template={editingTemplate}
        onClose={() => {
          setTemplateEditorOpen(false);
          setEditingTemplate(null);
        }}
        onSave={(tpl) => {
          const cached = getCachedTableStyleSettings();
          const next = [
            ...cached.templates.filter((t) => t.id !== editingTemplate?.id && t.id !== tpl.id),
            tpl,
          ];
          void saveTableStylesToStorage({
            ...DEFAULT_TABLE_STYLE_SETTINGS,
            templates: next,
          }).then((s) => {
            setTemplates(s.templates);
            setTemplateEditorOpen(false);
            setEditingTemplate(null);
          });
        }}
      />
    </Modal>

      {typeof document !== 'undefined'
        ? createPortal(
            <div className="relative z-[100060]">
              <ConfirmModal
                isOpen={deleteConfirm !== null}
                variant="danger"
                title={deleteConfirm?.kind === 'col' ? '열 삭제' : '행 삭제'}
                message={
                  deleteConfirm?.kind === 'col'
                    ? (deleteConfirm.indices.length > 1
                      ? `선택한 ${deleteConfirm.indices.length}개 열을 삭제할까요?`
                      : `${(deleteConfirm.indices[0] ?? 0) + 1}열을 삭제할까요?`)
                    : deleteConfirm
                      ? (deleteConfirm.indices.length > 1
                        ? `선택한 ${deleteConfirm.indices.length}개 행을 삭제할까요?`
                        : `${(deleteConfirm.indices[0] ?? 0) + 1}행을 삭제할까요?`)
                      : ''
                }
                confirmLabel="삭제"
                cancelLabel="취소"
                onConfirm={confirmDelete}
                onCancel={() => setDeleteConfirm(null)}
              />
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
