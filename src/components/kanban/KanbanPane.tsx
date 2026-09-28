import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  lazy,
  Suspense,
  Fragment,
  type CSSProperties,
  type ComponentType,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  type TouchEvent as ReactTouchEvent,
} from 'react';
import {
  DndContext,
  DragOverlay,
  MeasuringStrategy,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
  type Modifier,
  type UniqueIdentifier,
} from '@dnd-kit/core';
import {
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
  type SortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Popover, Tooltip } from 'radix-ui';
import { HexColorInput, HexColorPicker } from 'react-colorful';
import {
  Folder,
  GripVertical,
  Image as ImageIcon,
  Link2,
  Loader2,
  Palette,
  Plus,
  Search,
  Tag,
  Trash2,
  X,
} from 'lucide-react';
import Button from '@/components/Button';
import { ConfirmModal } from '@/components/modals/ConfirmModal';
import { IconPlus, IconSave, IconTrash, IconX } from '@/components/icons';
import KanbanLinkPickerModal from '@/components/kanban/KanbanLinkPickerModal';
import KanbanColumnIconPicker from '@/components/kanban/KanbanColumnIconPicker';
import KanbanCoverImage from '@/components/kanban/KanbanCoverImage';
import KanbanFolderPickerModal from '@/components/kanban/KanbanFolderPickerModal';
import TocResizeHandleJs from '@/components/TocResizeHandle';
import { useResizablePanelWidth } from '@/hooks/useResizablePanelWidth';
import { useScrollPointerPan } from '@/hooks/useScrollPointerPan';
import { useFileSession } from '@/App/hooks/useFileSession';
import { useVault } from '@/App/hooks/useVault';
import { useChromeOwned } from '@/App/providers/AppChromeStateProvider';
import { useToast } from '@/contexts/ToastContext';
import { resolveVaultFileNode } from '@/utils/vault/resolveVaultFileNode';
import { findFileNodeByPath, findNodeByPath } from '@/utils/s3Tree';
import type { TreeAttachSourceItem } from '@/utils/chatWithMyself/treeAttachDrop';
import { resolveKanbanTreeDropCards } from '@/utils/kanban/kanbanTreeCardDrop';
import {
  STORAGE_MODE_IDB,
  STORAGE_MODE_LOCAL,
  STORAGE_MODE_WEBDAV,
} from '@/utils/storageSettings';
import KanbanDocumentSettingsModal from '@/components/kanban/KanbanDocumentSettingsModal';
import {
  addCard,
  addColumn,
  addLane,
  canAddKanbanCard,
  canAddKanbanColumn,
  canAddKanbanLane,
  cardDraftFromCard,
  collectKanbanLinkedPaths,
  countColumnCards,
  findCardPlacement,
  findColumnIdForCard,
  getLaneCardIds,
  isKanbanCardDraftDirty,
  KANBAN_MAX_COLUMN_WIDTH,
  KANBAN_MIN_COLUMN_WIDTH,
  moveCard,
  normalizeTags,
  parseKanbanDocument,
  removeCard,
  removeColumn,
  removeLane,
  reorderColumns,
  reorderLanes,
  resolveKanbanColumnWidth,
  searchKanbanCards,
  serializeKanbanDocument,
  updateBoardSettings,
  updateCard,
  updateColumn,
  updateLane,
  type KanbanBoardSettings,
  type KanbanCard,
  type KanbanCardDraft,
  type KanbanColumn,
  type KanbanDocument,
  type KanbanLane,
} from '@/utils/kanban/kanbanDocument';
import {
  createKanbanCollisionDetection,
  parseKanbanColumnDropId,
  shouldInsertAfterCard,
} from '@/utils/kanban/kanbanDndCollision';
import { useTreeOps } from '@/App/hooks/useTreeOps';
import { normalizeCssHexColor } from '@/utils/cssColor';

const NoteEditorSurface = lazy(
  () => import('@/components/editor/surface/NoteEditorSurface'),
);

const TocResizeHandle = TocResizeHandleJs as unknown as ComponentType<{
  edge?: 'left' | 'right';
  handleProps?: Record<string, unknown>;
  isResizing?: boolean;
  visibleOnHover?: boolean;
  label?: string;
  className?: string;
}>;

type KanbanFileManagementActions = {
  openSearch: () => void;
  openDocumentSettings: () => void;
};

type KanbanPaneProps = {
  content: string;
  onChange: (next: string) => void;
  onSave?: (() => void) | undefined;
  currentFile?: { id?: string; name?: string; type?: string } | null;
  theme?: string;
  isActiveFile?: boolean;
  isSurfaceLive?: boolean;
  registerFileManagement?:
    | ((actions: KanbanFileManagementActions | null) => void)
    | undefined;
  onResolveWikiImageUrl?: ((...args: unknown[]) => unknown) | undefined;
};

const COLUMN_PREFIX = 'kanban-col:';
const COLUMN_DROP_PREFIX = 'kanban-coldrop:';
const CARD_PREFIX = 'kanban-card:';
const LANE_PREFIX = 'kanban-lane:';

function colDndId(id: string): string {
  return `${COLUMN_PREFIX}${id}`;
}

function colDropDndId(columnId: string, laneId: string): string {
  return `${COLUMN_DROP_PREFIX}${columnId}:${laneId}`;
}

function cardDndId(id: string): string {
  return `${CARD_PREFIX}${id}`;
}

function laneDndId(id: string): string {
  return `${LANE_PREFIX}${id}`;
}

type KanbanCellPoint = { columnId: string; laneId: string | null };

/** Prefer column×lane cell under pointer. */
function findKanbanCellAtPoint(
  clientX: number,
  clientY: number,
  host: HTMLElement | null,
): KanbanCellPoint | null {
  if (typeof document === 'undefined') return null;

  const stack =
    typeof document.elementsFromPoint === 'function'
      ? document.elementsFromPoint(clientX, clientY)
      : [];
  for (const el of stack) {
    if (!(el instanceof Element)) continue;
    const cell = el.closest('[data-kanban-cell]');
    if (cell instanceof HTMLElement) {
      const columnId = cell.getAttribute('data-kanban-column-id');
      const laneId = cell.getAttribute('data-kanban-lane-id');
      if (columnId) return { columnId, laneId };
    }
  }

  if (host) {
    const cells = host.querySelectorAll('[data-kanban-cell]');
    for (const cell of cells) {
      if (!(cell instanceof HTMLElement)) continue;
      const r = cell.getBoundingClientRect();
      if (
        clientX >= r.left &&
        clientX <= r.right &&
        clientY >= r.top &&
        clientY <= r.bottom
      ) {
        const columnId = cell.getAttribute('data-kanban-column-id');
        const laneId = cell.getAttribute('data-kanban-lane-id');
        if (columnId) return { columnId, laneId };
      }
    }
  }

  return null;
}

function parseColDndId(id: string): string | null {
  return id.startsWith(COLUMN_PREFIX) ? id.slice(COLUMN_PREFIX.length) : null;
}

function parseColDropDndId(id: string): string | null {
  return parseKanbanColumnDropId(id)?.columnId ?? null;
}

function parseLaneFromDropDndId(id: string): string | null {
  return parseKanbanColumnDropId(id)?.laneId ?? null;
}

function parseCardDndId(id: string): string | null {
  return id.startsWith(CARD_PREFIX) ? id.slice(CARD_PREFIX.length) : null;
}

function parseLaneDndId(id: string): string | null {
  return id.startsWith(LANE_PREFIX) ? id.slice(LANE_PREFIX.length) : null;
}

const KANBAN_DND_MEASURING = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
} as const;

/** Cross-column moves on dragOver shift layout; do not compensate or pointer drifts. */
const KANBAN_DND_AUTO_SCROLL = {
  layoutShiftCompensation: false,
} as const;

/**
 * Card order is driven by React state (`moveCard` on dragOver/end).
 * Do not apply sibling CSS transforms — they fight live list moves and
 * make the pointer appear to target the wrong column/slot.
 */
const kanbanCardSortingStrategy: SortingStrategy = () => null;

/** Keep DragOverlay centered on the cursor so visual ↔ pointer stay aligned. */
const snapKanbanOverlayToCursor: Modifier = ({
  activatorEvent,
  draggingNodeRect,
  transform,
}) => {
  if (!draggingNodeRect || !activatorEvent) return transform;
  const ev = activatorEvent as PointerEvent | MouseEvent | TouchEvent;
  let x: number | null = null;
  let y: number | null = null;
  if ('clientX' in ev && typeof ev.clientX === 'number') {
    x = ev.clientX;
    y = ev.clientY;
  } else if ('touches' in ev && ev.touches[0]) {
    x = ev.touches[0].clientX;
    y = ev.touches[0].clientY;
  }
  if (x == null || y == null) return transform;
  const offsetX = x - draggingNodeRect.left;
  const offsetY = y - draggingNodeRect.top;
  return {
    ...transform,
    x: transform.x + offsetX - draggingNodeRect.width / 2,
    y: transform.y + offsetY - draggingNodeRect.height / 2,
  };
};

const KANBAN_DND_MODIFIERS: Modifier[] = [snapKanbanOverlayToCursor];

/** Interactive / DnD controls should not start Embla-like board pan. */
function shouldIgnoreKanbanBoardPanTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return true;
  return Boolean(
    target.closest(
      [
        'button',
        'input',
        'textarea',
        'select',
        'a',
        '[contenteditable="true"]',
        '[data-kanban-no-pan]',
        '[data-kanban-column-gap-resize]',
        '[data-kanban-card-id]',
        '.haim-editor',
        '.md-editor',
        '.cm-editor',
      ].join(', '),
    ),
  );
}

const SIDE_PANEL_DEFAULT_WIDTH = 380;
const SIDE_PANEL_MIN_WIDTH = 280;
const SIDE_PANEL_MAX_WIDTH = 720;

function EditorFallback() {
  return (
    <div className="flex h-full min-h-0 flex-1 items-center justify-center gap-2 text-xs text-gray-500 dark:text-odp-muted">
      <Loader2 size={14} className="animate-spin" aria-hidden />
      에디터 로딩 중…
    </div>
  );
}

function SortableColumnShell({
  column,
  widthPx,
  header,
  children,
  isWidthResizing = false,
  sortableDisabled = false,
}: {
  column: KanbanColumn;
  widthPx: number;
  header: ReactNode;
  children?: ReactNode;
  isWidthResizing?: boolean;
  /** Disable while a card is dragging so column shells do not steal collisions. */
  sortableDisabled?: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: colDndId(column.id),
    data: { type: 'column', columnId: column.id },
    disabled: sortableDisabled,
  });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition: isWidthResizing ? undefined : transition,
    opacity: isDragging ? 0.45 : 1,
    width: widthPx,
  };
  const accent = column.color || undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      data-kanban-column-id={column.id}
      className="relative flex max-h-full shrink-0 flex-col overflow-hidden rounded-lg border border-gray-200 bg-slate-50/90 dark:border-odp-borderSoft dark:bg-odp-bgSoft/80"
    >
      <div
        className="flex shrink-0 items-center gap-1 border-b border-gray-200 px-2 py-1.5 dark:border-odp-borderSoft"
        style={accent ? { borderTop: `3px solid ${accent}` } : undefined}
      >
        <button
          type="button"
          className="inline-flex cursor-grab touch-none items-center justify-center rounded p-1 text-gray-400 hover:bg-gray-200/80 hover:text-gray-700 active:cursor-grabbing dark:hover:bg-odp-focusBg dark:hover:text-odp-fg"
          aria-label="열 순서 변경"
          data-kanban-no-pan=""
          {...attributes}
          {...listeners}
        >
          <GripVertical size={14} />
        </button>
        {header}
      </div>
      {children}
    </div>
  );
}

/**
 * Resize handle sitting in the gutter between columns (resizes the column on its left).
 */
function ColumnGapResizeHandle({
  columnWidthPx,
  onLiveWidth,
  onCommitWidth,
}: {
  columnWidthPx: number;
  onLiveWidth: (width: number) => void;
  onCommitWidth: (width: number) => void;
}) {
  const [isResizing, setIsResizing] = useState(false);
  const resizeRef = useRef<{ startX: number; startWidth: number } | null>(null);
  const liveWidthRef = useRef(columnWidthPx);
  const onLiveWidthRef = useRef(onLiveWidth);
  const onCommitWidthRef = useRef(onCommitWidth);
  onLiveWidthRef.current = onLiveWidth;
  onCommitWidthRef.current = onCommitWidth;

  useEffect(() => {
    if (!isResizing) return undefined;

    const onMove = (e: MouseEvent | TouchEvent) => {
      const state = resizeRef.current;
      if (!state) return;
      const clientX =
        'touches' in e ? e.touches[0]?.clientX : (e as MouseEvent).clientX;
      if (clientX == null) return;
      if ('touches' in e) e.preventDefault();
      const next = Math.min(
        KANBAN_MAX_COLUMN_WIDTH,
        Math.max(
          KANBAN_MIN_COLUMN_WIDTH,
          Math.round(state.startWidth + (clientX - state.startX)),
        ),
      );
      liveWidthRef.current = next;
      onLiveWidthRef.current(next);
    };

    const onEnd = () => {
      const finalWidth = liveWidthRef.current;
      resizeRef.current = null;
      setIsResizing(false);
      onCommitWidthRef.current(finalWidth);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onEnd);
    window.addEventListener('touchcancel', onEnd);

    const prevCursor = document.body.style.cursor;
    const prevSelect = document.body.style.userSelect;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);
      window.removeEventListener('touchcancel', onEnd);
      document.body.style.cursor = prevCursor;
      document.body.style.userSelect = prevSelect;
    };
  }, [isResizing]);

  const startResize = (e: ReactMouseEvent | ReactTouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const clientX = 'touches' in e ? e.touches[0]?.clientX : e.clientX;
    if (clientX == null) return;
    resizeRef.current = { startX: clientX, startWidth: columnWidthPx };
    liveWidthRef.current = columnWidthPx;
    onLiveWidth(columnWidthPx);
    setIsResizing(true);
  };

  return (
    <div
      className="group relative flex w-3 shrink-0 items-stretch justify-center self-stretch"
      data-kanban-column-gap-resize=""
    >
      <Tooltip.Provider delayDuration={400} skipDelayDuration={0}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button
              type="button"
              aria-label="열 너비 조절"
              role="separator"
              aria-orientation="vertical"
              aria-valuenow={Math.round(columnWidthPx)}
              aria-valuemin={KANBAN_MIN_COLUMN_WIDTH}
              aria-valuemax={KANBAN_MAX_COLUMN_WIDTH}
              className={`absolute inset-y-2 left-1/2 z-20 w-3 -translate-x-1/2 cursor-col-resize touch-none rounded-full border-0 bg-transparent p-0 transition-colors ${
                isResizing
                  ? 'bg-sky-400/50 dark:bg-sky-500/40'
                  : 'hover:bg-sky-300/40 dark:hover:bg-sky-600/35'
              }`}
              style={{ touchAction: 'none' }}
              onMouseDown={startResize}
              onTouchStart={startResize}
            >
              <span
                className={`pointer-events-none absolute inset-y-4 left-1/2 w-0.5 -translate-x-1/2 rounded-full transition-colors ${
                  isResizing
                    ? 'bg-sky-500 dark:bg-sky-400'
                    : 'bg-transparent group-hover:bg-sky-400/80 dark:group-hover:bg-sky-500/70'
                }`}
                aria-hidden
              />
            </button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              side="top"
              sideOffset={6}
              className="z-100001 rounded-md border border-gray-200 bg-white px-2 py-1 text-xs shadow-md dark:border-odp-borderSoft dark:bg-odp-surface"
            >
              열 너비 조절
              <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </div>
  );
}

function ColumnDroppable({
  columnId,
  laneId,
  children,
}: {
  columnId: string;
  laneId: string;
  children: ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: colDropDndId(columnId, laneId),
    data: { type: 'column-drop', columnId, laneId },
  });
  return (
    <div
      ref={setNodeRef}
      data-kanban-cell=""
      data-kanban-column-id={columnId}
      data-kanban-lane-id={laneId}
      className={`flex min-h-24 flex-1 flex-col gap-2 overflow-y-auto p-2 ${
        isOver ? 'bg-blue-50/60 dark:bg-blue-950/20' : ''
      }`}
    >
      {children}
    </div>
  );
}

function SortableLaneShell({
  lane,
  disabled = false,
  children,
}: {
  lane: KanbanLane;
  disabled?: boolean;
  children: ReactNode;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: laneDndId(lane.id),
    data: { type: 'lane', laneId: lane.id },
    disabled,
  });
  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };
  return (
    <div ref={setNodeRef} style={style} className="flex min-w-0 flex-col gap-1">
      <div className="flex items-center gap-1 px-1">
        <button
          type="button"
          className="inline-flex cursor-grab touch-none items-center justify-center rounded p-1 text-gray-400 hover:bg-gray-200/80 active:cursor-grabbing dark:hover:bg-odp-focusBg"
          aria-label="레인 순서 변경"
          data-kanban-no-pan=""
          {...attributes}
          {...listeners}
        >
          <GripVertical size={14} />
        </button>
        {children}
      </div>
    </div>
  );
}

function SortableCard({
  card,
  columnId,
  laneId,
  onSelect,
  isSelected,
  searchDimmed,
  searchHit,
  resolveCoverUrl,
  showCover = true,
  showTags = true,
  showLinks = true,
}: {
  card: KanbanCard;
  columnId: string;
  laneId: string;
  onSelect: () => void;
  isSelected: boolean;
  searchDimmed?: boolean;
  searchHit?: boolean;
  resolveCoverUrl?: KanbanPaneProps['onResolveWikiImageUrl'];
  showCover?: boolean;
  showTags?: boolean;
  showLinks?: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: cardDndId(card.id),
    data: { type: 'card', cardId: card.id, columnId, laneId },
  });
  const style: CSSProperties = {
    transform: isDragging ? undefined : CSS.Transform.toString(transform),
    transition: isDragging ? undefined : transition,
    opacity: isDragging ? 0 : searchDimmed ? 0.35 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      data-kanban-card-id={card.id}
      className={`overflow-hidden rounded-md border bg-white shadow-sm dark:bg-odp-surface ${
        searchHit
          ? 'border-amber-400 ring-1 ring-amber-300/70 dark:border-amber-500'
          : isSelected
            ? 'border-blue-500 ring-1 ring-blue-400/60 dark:border-blue-400'
            : 'border-gray-200 dark:border-odp-borderSoft'
      }`}
    >
      {showCover && card.coverPath ? (
        <KanbanCoverImage
          path={card.coverPath}
          variant="card"
          {...(resolveCoverUrl ? { resolveUrl: resolveCoverUrl } : {})}
        />
      ) : null}
      <div className="flex items-start gap-1 p-2">
        <button
          type="button"
          className="mt-0.5 inline-flex cursor-grab touch-none items-center justify-center rounded p-0.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 active:cursor-grabbing dark:hover:bg-odp-focusBg"
          aria-label="카드 이동"
          data-kanban-no-pan=""
          {...attributes}
          {...listeners}
        >
          <GripVertical size={14} />
        </button>
        <button
          type="button"
          className="min-w-0 flex-1 text-left"
          onClick={onSelect}
        >
          <div className="truncate text-sm font-medium text-gray-900 dark:text-odp-fgStrong">
            {card.title.trim() || '제목 없음'}
          </div>
          {card.body.trim() ? (
            <div className="mt-0.5 line-clamp-2 text-xs text-gray-500 dark:text-odp-muted">
              {card.body}
            </div>
          ) : null}
          {showTags && card.tags.length > 0 ? (
            <div className="mt-1 flex flex-wrap gap-1">
              {card.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-violet-50 px-1 py-0.5 text-[10px] text-violet-700 dark:bg-violet-950/40 dark:text-violet-300"
                >
                  {tag}
                </span>
              ))}
              {card.tags.length > 4 ? (
                <span className="text-[10px] text-gray-400">
                  +{card.tags.length - 4}
                </span>
              ) : null}
            </div>
          ) : null}
          {showLinks && card.linkPaths.length > 0 ? (
            <div className="mt-1 truncate text-[11px] text-blue-600 dark:text-blue-400">
              {card.linkPaths.length === 1
                ? card.linkPaths[0]
                : `링크 ${card.linkPaths.length}개`}
            </div>
          ) : null}
        </button>
      </div>
    </div>
  );
}

function CardDragPreview({ card }: { card: KanbanCard }) {
  return (
    <div className="w-64 cursor-grabbing rounded-md border border-blue-400 bg-white p-2 shadow-lg dark:bg-odp-surface">
      <div className="truncate text-sm font-medium text-gray-900 dark:text-odp-fgStrong">
        {card.title.trim() || '제목 없음'}
      </div>
      {card.tags.length > 0 ? (
        <div className="mt-1 flex flex-wrap gap-1">
          {card.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded bg-violet-50 px-1 py-0.5 text-[10px] text-violet-700 dark:bg-violet-950/40 dark:text-violet-300"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function KanbanPane({
  content,
  onChange,
  onSave,
  currentFile = null,
  theme = 'light',
  isActiveFile = true,
  isSurfaceLive = true,
  registerFileManagement,
  onResolveWikiImageUrl,
}: KanbanPaneProps) {
  const { showToast } = useToast();
  const {
    setKanbanCardDropActive,
    setKanbanCardDropHost,
    handleRegisterKanbanCardDrop,
  } = useChromeOwned();
  const boardDropHostRef = useRef<HTMLElement | null>(null);
  const [boardScrollEl, setBoardScrollEl] = useState<HTMLElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const pendingSelectCardIdRef = useRef<string | null>(null);
  const fileKey = `${currentFile?.type || ''}:${currentFile?.id || ''}`;
  const parsedInitial = useMemo(() => parseKanbanDocument(content), [fileKey]);
  const [doc, setDoc] = useState<KanbanDocument>(parsedInitial.document);
  const [parseError, setParseError] = useState<string | null>(parsedInitial.error);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [cardDraft, setCardDraft] = useState<KanbanCardDraft | null>(null);
  const [tagInput, setTagInput] = useState('');
  const [linkPickerOpen, setLinkPickerOpen] = useState(false);
  const [folderPickerColumnId, setFolderPickerColumnId] = useState<string | null>(
    null,
  );
  const [coverPickerTarget, setCoverPickerTarget] = useState<{
    kind: 'column' | 'card';
    id: string;
  } | null>(null);
  const [deleteLaneId, setDeleteLaneId] = useState<string | null>(null);
  const [documentSettingsOpen, setDocumentSettingsOpen] = useState(false);
  const [discardConfirmOpen, setDiscardConfirmOpen] = useState(false);
  const [pendingCloseAfterDiscard, setPendingCloseAfterDiscard] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHitIndex, setSearchHitIndex] = useState(0);
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const [deleteColumnId, setDeleteColumnId] = useState<string | null>(null);
  const [deleteCardId, setDeleteCardId] = useState<string | null>(null);
  const [colorPopoverColId, setColorPopoverColId] = useState<string | null>(null);
  const [columnLiveWidth, setColumnLiveWidth] = useState<{
    id: string;
    width: number;
  } | null>(null);

  const sidePanelResize = useResizablePanelWidth({
    storageKey: 'kanban-card-edit-panel-width',
    defaultWidth: SIDE_PANEL_DEFAULT_WIDTH,
    minWidth: SIDE_PANEL_MIN_WIDTH,
    maxWidth: SIDE_PANEL_MAX_WIDTH,
    edge: 'left',
  });

  const undoStackRef = useRef<string[]>([]);
  const undoIndexRef = useRef(0);
  const suppressUndoRef = useRef(false);
  const baselinedRef = useRef(false);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const docRef = useRef(doc);
  docRef.current = doc;

  const {
    storageMode,
    s3Tree,
    localTree,
    webdavTree,
    idbTree,
    localRootHandle,
    loadLocalFolderChildren,
    loadWebdavFolderChildren,
    loadIdbFolderChildren,
  } = useVault();
  const { selectFileRaw, openAdvancedSearchFile } = useFileSession();
  const { setCreateModalContext, setCreateModalOpen } = useTreeOps();

  const vaultTree = useMemo(() => {
    if (storageMode === STORAGE_MODE_LOCAL) return localTree;
    if (storageMode === STORAGE_MODE_WEBDAV) return webdavTree;
    if (storageMode === STORAGE_MODE_IDB) return idbTree;
    return s3Tree;
  }, [storageMode, localTree, webdavTree, idbTree, s3Tree]);

  const storageType =
    storageMode === STORAGE_MODE_LOCAL
      ? 'local'
      : storageMode === STORAGE_MODE_WEBDAV
        ? 'webdav'
        : storageMode === STORAGE_MODE_IDB
          ? 'idb'
          : 's3';

  const vaultStorageType =
    storageType === 'local' ||
    storageType === 'webdav' ||
    storageType === 'idb' ||
    storageType === 's3'
      ? storageType
      : 's3';

  // Reset board when the opened file changes.
  useEffect(() => {
    const result = parseKanbanDocument(content);
    setDoc(result.document);
    setParseError(result.error);
    setSelectedCardId(null);
    setCardDraft(null);
    setTagInput('');
    setLinkPickerOpen(false);
    setSearchOpen(false);
    setSearchQuery('');
    setSearchHitIndex(0);
    const snap = serializeKanbanDocument(result.document);
    undoStackRef.current = [snap];
    undoIndexRef.current = 0;
    baselinedRef.current = true;
    suppressUndoRef.current = false;
  }, [fileKey]);

  const commitDoc = useCallback((next: KanbanDocument, opts?: { recordUndo?: boolean }) => {
    docRef.current = next;
    setDoc(next);
    const text = serializeKanbanDocument(next);
    onChangeRef.current(text);
    const shouldRecord = opts?.recordUndo !== false;
    if (shouldRecord && !suppressUndoRef.current && baselinedRef.current) {
      const stack = undoStackRef.current.slice(0, undoIndexRef.current + 1);
      if (stack[stack.length - 1] !== text) {
        stack.push(text);
        // Cap history length
        if (stack.length > 100) stack.shift();
        undoStackRef.current = stack;
        undoIndexRef.current = stack.length - 1;
      }
    }
  }, []);

  const selectedCard = selectedCardId ? doc.cards[selectedCardId] || null : null;
  const draftDirty =
    Boolean(selectedCard && cardDraft) &&
    selectedCard != null &&
    cardDraft != null &&
    isKanbanCardDraftDirty(cardDraft, selectedCard);

  const openCardEditor = useCallback(
    (cardId: string) => {
      const card = docRef.current.cards[cardId];
      if (!card) return;
      setSelectedCardId(cardId);
      setCardDraft(cardDraftFromCard(card));
      setTagInput('');
    },
    [],
  );

  const closeCardEditor = useCallback(() => {
    setSelectedCardId(null);
    setCardDraft(null);
    setTagInput('');
    setLinkPickerOpen(false);
  }, []);

  const requestCloseCardEditor = useCallback(() => {
    if (draftDirty) {
      setPendingCloseAfterDiscard(true);
      setDiscardConfirmOpen(true);
      return;
    }
    closeCardEditor();
  }, [closeCardEditor, draftDirty]);

  const saveCardDraft = useCallback(() => {
    if (!selectedCardId || !cardDraft) return;
    const next = updateCard(docRef.current, selectedCardId, {
      title: cardDraft.title,
      body: cardDraft.body,
      linkPaths: cardDraft.linkPaths,
      tags: cardDraft.tags,
      coverPath: cardDraft.coverPath,
    });
    commitDoc(next);
    const saved = next.cards[selectedCardId];
    if (saved) setCardDraft(cardDraftFromCard(saved));
    showToast({ message: '카드 저장됨', durationMs: 1800 });
    void onSave?.();
  }, [cardDraft, commitDoc, onSave, selectedCardId, showToast]);

  const searchHits = useMemo(
    () => (searchOpen ? searchKanbanCards(doc, searchQuery) : []),
    [doc, searchOpen, searchQuery],
  );
  const searchHitSet = useMemo(() => new Set(searchHits), [searchHits]);
  const searchActive = searchOpen && searchQuery.trim().length > 0;

  const openSearch = useCallback(() => {
    setSearchOpen(true);
    requestAnimationFrame(() => {
      searchInputRef.current?.focus();
      searchInputRef.current?.select();
    });
  }, []);

  const openDocumentSettings = useCallback(() => {
    setDocumentSettingsOpen(true);
  }, []);

  const closeSearch = useCallback(() => {
    setSearchOpen(false);
    setSearchQuery('');
    setSearchHitIndex(0);
  }, []);

  const focusSearchHit = useCallback(
    (index: number) => {
      if (!searchHits.length) return;
      const nextIndex = ((index % searchHits.length) + searchHits.length) % searchHits.length;
      setSearchHitIndex(nextIndex);
      const id = searchHits[nextIndex];
      if (!id) return;
      const safeId =
        typeof globalThis.CSS?.escape === 'function'
          ? globalThis.CSS.escape(id)
          : id.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
      const el = document.querySelector(`[data-kanban-card-id="${safeId}"]`);
      if (el instanceof HTMLElement) {
        el.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
      }
    },
    [searchHits],
  );

  useEffect(() => {
    if (!searchActive) {
      setSearchHitIndex(0);
      return;
    }
    if (searchHitIndex >= searchHits.length) {
      setSearchHitIndex(0);
    }
  }, [searchActive, searchHitIndex, searchHits.length]);

  useEffect(() => {
    if (!isActiveFile || !isSurfaceLive || !registerFileManagement) return;
    registerFileManagement({ openSearch, openDocumentSettings });
    return () => registerFileManagement(null);
  }, [
    isActiveFile,
    isSurfaceLive,
    openDocumentSettings,
    openSearch,
    registerFileManagement,
  ]);

  // Ctrl/Cmd+F opens board card search (skip when typing in nested editors).
  useEffect(() => {
    if (!isActiveFile || !isSurfaceLive) return undefined;
    const onKeyDown = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (!mod || e.altKey) return;
      if (e.key.toLowerCase() !== 'f') return;
      const target = e.target as HTMLElement | null;
      if (
        target?.closest?.(
          '.haim-editor, .md-editor, .cm-editor, [contenteditable="true"], textarea, input',
        )
      ) {
        // Allow find inside the card markdown editor; still open board search
        // when focus is our own search field (re-focus).
        if (!target.closest?.('[data-kanban-board-search]')) return;
      }
      e.preventDefault();
      e.stopPropagation();
      openSearch();
    };
    window.addEventListener('keydown', onKeyDown, true);
    return () => window.removeEventListener('keydown', onKeyDown, true);
  }, [isActiveFile, isSurfaceLive, openSearch]);

  const undo = useCallback(() => {
    if (undoIndexRef.current <= 0) return false;
    undoIndexRef.current -= 1;
    const raw = undoStackRef.current[undoIndexRef.current];
    if (!raw) return false;
    const result = parseKanbanDocument(raw);
    suppressUndoRef.current = true;
    setDoc(result.document);
    onChangeRef.current(raw);
    requestAnimationFrame(() => {
      suppressUndoRef.current = false;
    });
    return true;
  }, []);

  const redo = useCallback(() => {
    if (undoIndexRef.current >= undoStackRef.current.length - 1) return false;
    undoIndexRef.current += 1;
    const raw = undoStackRef.current[undoIndexRef.current];
    if (!raw) return false;
    const result = parseKanbanDocument(raw);
    suppressUndoRef.current = true;
    setDoc(result.document);
    onChangeRef.current(raw);
    requestAnimationFrame(() => {
      suppressUndoRef.current = false;
    });
    return true;
  }, []);

  // Capture-phase undo/redo so parent editors do not also undo — but nested
  // Markdown / CodeMirror / TipTap editors keep their own history.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (!mod) return;
      const target = e.target as HTMLElement | null;
      if (
        target?.closest?.(
          '.haim-editor, .md-editor, .cm-editor, [contenteditable="true"], textarea, input',
        )
      ) {
        return;
      }
      const key = e.key.toLowerCase();
      if (key === 'z' && !e.shiftKey) {
        if (undo()) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation?.();
        }
      } else if ((key === 'z' && e.shiftKey) || key === 'y') {
        if (redo()) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation?.();
        }
      }
    };
    window.addEventListener('keydown', onKeyDown, true);
    return () => window.removeEventListener('keydown', onKeyDown, true);
  }, [undo, redo]);

  // Drop undo history on unmount.
  useEffect(() => {
    return () => {
      undoStackRef.current = [];
      undoIndexRef.current = 0;
      baselinedRef.current = false;
    };
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );
  const lastKanbanOverIdRef = useRef<UniqueIdentifier | null>(null);
  const dragStartDocRef = useRef<string | null>(null);
  const pointerPosRef = useRef<{ x: number; y: number } | null>(null);
  const resolveCellAtPoint = useCallback(
    (x: number, y: number) =>
      findKanbanCellAtPoint(x, y, boardDropHostRef.current),
    [],
  );
  const kanbanCollisionDetection = useMemo(
    () =>
      createKanbanCollisionDetection({
        lastOverIdRef: lastKanbanOverIdRef,
        resolveCellAtPoint,
      }),
    [resolveCellAtPoint],
  );
  const isCardDragActive = Boolean(
    activeDragId && parseCardDndId(activeDragId),
  );

  const openLinkedPath = useCallback(
    async (path: string) => {
      const node = await resolveVaultFileNode(path, {
        storageType: vaultStorageType,
        localTree,
        webdavTree,
        idbTree,
        s3Tree,
        localRootHandle,
      });
      if (node) {
        await selectFileRaw(storageType, node);
        return;
      }
      void openAdvancedSearchFile?.(path);
    },
    [
      vaultStorageType,
      localTree,
      webdavTree,
      idbTree,
      s3Tree,
      localRootHandle,
      selectFileRaw,
      storageType,
      openAdvancedSearchFile,
    ],
  );

  const onExpandFolder = useCallback(
    async (node: { path: string; type: string }) => {
      if (storageType === 'local') await loadLocalFolderChildren?.(node);
      else if (storageType === 'webdav') await loadWebdavFolderChildren?.(node);
      else if (storageType === 'idb') await loadIdbFolderChildren?.(node);
    },
    [
      storageType,
      loadLocalFolderChildren,
      loadWebdavFolderChildren,
      loadIdbFolderChildren,
    ],
  );

  const excludeKanbanPath = currentFile?.id || null;

  const findVaultNode = useCallback(
    (itemStorageType: string, path: string) => {
      if (itemStorageType !== storageType) return null;
      return (
        findFileNodeByPath(vaultTree, path) || findNodeByPath(vaultTree, path)
      );
    },
    [storageType, vaultTree],
  );

  const handleBoardDropHostChange = useCallback(
    (node: HTMLElement | null) => {
      boardDropHostRef.current = node;
      setBoardScrollEl(node);
      setKanbanCardDropHost(node);
    },
    [setKanbanCardDropHost],
  );

  useScrollPointerPan(boardScrollEl, isActiveFile && isSurfaceLive && !activeDragId, {
    primaryDrag: true,
    axis: 'x',
    shouldIgnorePrimaryTarget: shouldIgnoreKanbanBoardPanTarget,
  });

  useEffect(() => {
    return () => setKanbanCardDropHost(null);
  }, [setKanbanCardDropHost]);

  const handleTreeCardDrop = useCallback(
    (
      items: TreeAttachSourceItem[],
      point?: { clientX: number; clientY: number },
    ) => {
      const seeds = resolveKanbanTreeDropCards(items, findVaultNode, {
        excludePath: excludeKanbanPath,
      });
      if (!seeds.length) {
        showToast({
          message: '추가할 파일을 찾지 못했습니다',
          durationMs: 2200,
        });
        return;
      }

      const snapshot = docRef.current;
      if (!snapshot.columns.length) return;

      const existingLinks = collectKanbanLinkedPaths(snapshot);
      const fresh = seeds.filter((s) => !existingLinks.has(s.linkPath));
      if (!fresh.length) {
        showToast({
          message: '이미 연결된 카드입니다',
          durationMs: 2200,
        });
        return;
      }

      const pointed =
        point != null
          ? findKanbanCellAtPoint(
              point.clientX,
              point.clientY,
              boardDropHostRef.current,
            )
          : null;
      const columnId =
        (pointed?.columnId &&
          snapshot.columns.some((c) => c.id === pointed.columnId) &&
          pointed.columnId) ||
        snapshot.columns[0]!.id;
      const laneId =
        (pointed?.laneId &&
          snapshot.lanes.some((l) => l.id === pointed.laneId) &&
          pointed.laneId) ||
        snapshot.lanes[0]?.id;

      let next = snapshot;
      let lastId: string | null = null;
      let added = 0;
      let skippedLimit = false;
      const resolvedLane = laneId || next.lanes[0]!.id;
      for (const seed of fresh) {
        if (!canAddKanbanCard(next, columnId, resolvedLane)) {
          skippedLimit = true;
          break;
        }
        next = addCard(
          next,
          columnId,
          {
            title: seed.title,
            linkPaths: [seed.linkPath],
          },
          resolvedLane,
        );
        const ids = getLaneCardIds(
          next.columns.find((c) => c.id === columnId)!,
          resolvedLane,
        );
        lastId = ids[ids.length - 1] || lastId;
        added += 1;
      }
      if (added > 0) {
        commitDoc(next);
        if (lastId) openCardEditor(lastId);
        showToast({
          message: skippedLimit
            ? `카드 ${added}개 추가 (셀 한도)`
            : `카드 ${added}개 추가`,
          durationMs: 2500,
        });
      } else if (skippedLimit) {
        showToast({
          message: '셀당 최대 카드 수에 도달했습니다',
          durationMs: 2200,
        });
      }
    },
    [commitDoc, excludeKanbanPath, findVaultNode, openCardEditor, showToast],
  );

  useEffect(() => {
    handleRegisterKanbanCardDrop(handleTreeCardDrop);
    return () => handleRegisterKanbanCardDrop(null);
  }, [handleRegisterKanbanCardDrop, handleTreeCardDrop]);

  useEffect(() => {
    const active = isActiveFile && isSurfaceLive;
    setKanbanCardDropActive(active);
    return () => setKanbanCardDropActive(false);
  }, [isActiveFile, isSurfaceLive, setKanbanCardDropActive]);

  const findContainerForDndId = useCallback(
    (dndId: string, snapshot: KanbanDocument): string | null => {
      const dropCol = parseColDropDndId(dndId);
      if (dropCol) return dropCol;
      const colId = parseColDndId(dndId);
      if (colId) return colId;
      const cardId = parseCardDndId(dndId);
      if (cardId) return findColumnIdForCard(snapshot, cardId);
      return null;
    },
    [],
  );

  const findLaneForDndId = useCallback(
    (dndId: string, snapshot: KanbanDocument): string | null => {
      const fromDrop = parseLaneFromDropDndId(dndId);
      if (fromDrop) return fromDrop;
      const cardId = parseCardDndId(dndId);
      if (cardId) {
        return (
          findCardPlacement(snapshot, cardId)?.laneId ||
          snapshot.cards[cardId]?.laneId ||
          null
        );
      }
      return snapshot.lanes[0]?.id ?? null;
    },
    [],
  );

  const resolveCardInsertIndex = useCallback(
    (
      targetIds: string[],
      overCardId: string | null,
      overRect: {
        top: number;
        height: number;
        left?: number;
        width?: number;
        bottom?: number;
        right?: number;
      } | null,
      activeCardId: string,
    ): number => {
      if (!overCardId) return targetIds.length;
      const idx = targetIds.indexOf(overCardId);
      if (idx < 0) return targetIds.length;
      if (overCardId === activeCardId) return idx;
      const pointerY = pointerPosRef.current?.y ?? null;
      const rect =
        overRect && typeof overRect.top === 'number'
          ? {
              left: overRect.left ?? 0,
              right:
                overRect.right ??
                (overRect.left ?? 0) + (overRect.width ?? 0),
              top: overRect.top,
              bottom:
                overRect.bottom ?? overRect.top + (overRect.height ?? 0),
              width: overRect.width ?? 0,
              height: overRect.height ?? 0,
            }
          : null;
      return shouldInsertAfterCard(rect, pointerY) ? idx + 1 : idx;
    },
    [],
  );

  const handleDragStart = (event: DragStartEvent) => {
    lastKanbanOverIdRef.current = null;
    dragStartDocRef.current = serializeKanbanDocument(docRef.current);
    const initial = event.active.rect.current.initial;
    // Prefer activator point when available; fall back to rect center.
    const activator = event.activatorEvent as PointerEvent | null;
    if (activator && typeof activator.clientX === 'number') {
      pointerPosRef.current = { x: activator.clientX, y: activator.clientY };
    } else if (initial) {
      pointerPosRef.current = {
        x: initial.left + initial.width / 2,
        y: initial.top + initial.height / 2,
      };
    }
    setActiveDragId(String(event.active.id));
  };

  useEffect(() => {
    if (!activeDragId) {
      pointerPosRef.current = null;
      return undefined;
    }
    const onMove = (e: PointerEvent) => {
      pointerPosRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('pointermove', onMove, true);
    return () => window.removeEventListener('pointermove', onMove, true);
  }, [activeDragId]);

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;
    const activeId = String(active.id);
    const overId = String(over.id);
    const activeCardId = parseCardDndId(activeId);
    if (!activeCardId) return;

    const snapshot = docRef.current;
    const fromPlacement = findCardPlacement(snapshot, activeCardId);
    const toCol = findContainerForDndId(overId, snapshot);
    const toLane =
      findLaneForDndId(overId, snapshot) || snapshot.lanes[0]?.id || null;
    if (!fromPlacement || !toCol || !toLane) return;

    const overCardId = parseCardDndId(overId);
    const targetCol = snapshot.columns.find((c) => c.id === toCol);
    if (!targetCol) return;
    const targetIds = getLaneCardIds(targetCol, toLane);
    let toIndex = resolveCardInsertIndex(
      targetIds,
      overCardId,
      over.rect,
      activeCardId,
    );

    const sameCell =
      fromPlacement.columnId === toCol && fromPlacement.laneId === toLane;
    if (sameCell) {
      const oldIndex = targetIds.indexOf(activeCardId);
      if (oldIndex < 0) return;
      if (oldIndex < toIndex) toIndex -= 1;
      toIndex = Math.max(0, Math.min(toIndex, targetIds.length - 1));
      if (oldIndex === toIndex) return;
    }

    commitDoc(moveCard(snapshot, activeCardId, toCol, toIndex, toLane), {
      recordUndo: false,
    });
  };

  const finishCardDragUndo = () => {
    const start = dragStartDocRef.current;
    dragStartDocRef.current = null;
    if (!start || !baselinedRef.current || suppressUndoRef.current) return;
    const text = serializeKanbanDocument(docRef.current);
    if (text === start) return;
    const stack = undoStackRef.current.slice(0, undoIndexRef.current + 1);
    if (stack[stack.length - 1] !== start) {
      stack.push(start);
    }
    if (stack[stack.length - 1] !== text) {
      stack.push(text);
    }
    if (stack.length > 100) {
      stack.splice(0, stack.length - 100);
    }
    undoStackRef.current = stack;
    undoIndexRef.current = stack.length - 1;
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveDragId(null);
    lastKanbanOverIdRef.current = null;
    if (!over) {
      finishCardDragUndo();
      return;
    }
    const activeId = String(active.id);
    const overId = String(over.id);
    const snapshot = docRef.current;

    const activeLaneId = parseLaneDndId(activeId);
    if (activeLaneId) {
      dragStartDocRef.current = null;
      const overLaneId = parseLaneDndId(overId);
      if (overLaneId && activeLaneId !== overLaneId) {
        commitDoc(reorderLanes(snapshot, activeLaneId, overLaneId));
      }
      return;
    }

    const activeColId = parseColDndId(activeId);
    if (activeColId) {
      dragStartDocRef.current = null;
      let overColId = parseColDndId(overId);
      if (!overColId) overColId = findContainerForDndId(overId, snapshot);
      if (overColId && activeColId !== overColId) {
        commitDoc(reorderColumns(snapshot, activeColId, overColId));
      }
      return;
    }

    const activeCardId = parseCardDndId(activeId);
    if (!activeCardId) {
      dragStartDocRef.current = null;
      return;
    }
    const fromPlacement = findCardPlacement(snapshot, activeCardId);
    const toCol = findContainerForDndId(overId, snapshot);
    const toLane =
      findLaneForDndId(overId, snapshot) || snapshot.lanes[0]?.id || null;
    if (!fromPlacement || !toCol || !toLane) {
      finishCardDragUndo();
      return;
    }

    const overCardId = parseCardDndId(overId);
    const targetCol = snapshot.columns.find((c) => c.id === toCol);
    if (!targetCol) {
      finishCardDragUndo();
      return;
    }

    const targetIds = getLaneCardIds(targetCol, toLane);
    let toIndex = resolveCardInsertIndex(
      targetIds,
      overCardId,
      over.rect,
      activeCardId,
    );
    const sameCell =
      fromPlacement.columnId === toCol && fromPlacement.laneId === toLane;
    if (sameCell) {
      const oldIndex = targetIds.indexOf(activeCardId);
      if (oldIndex < 0) {
        finishCardDragUndo();
        return;
      }
      if (oldIndex < toIndex) toIndex -= 1;
      toIndex = Math.max(0, Math.min(toIndex, targetIds.length - 1));
      if (oldIndex === toIndex) {
        finishCardDragUndo();
        return;
      }
    }

    commitDoc(moveCard(snapshot, activeCardId, toCol, toIndex, toLane), {
      recordUndo: false,
    });
    finishCardDragUndo();
  };

  const handleDragCancel = () => {
    setActiveDragId(null);
    lastKanbanOverIdRef.current = null;
    const start = dragStartDocRef.current;
    dragStartDocRef.current = null;
    if (start && start !== serializeKanbanDocument(docRef.current)) {
      const restored = parseKanbanDocument(start);
      suppressUndoRef.current = true;
      docRef.current = restored.document;
      setDoc(restored.document);
      onChangeRef.current(start);
      requestAnimationFrame(() => {
        suppressUndoRef.current = false;
      });
    }
  };

  const activeDragCard = (() => {
    if (!activeDragId) return null;
    const cardId = parseCardDndId(activeDragId);
    return cardId ? doc.cards[cardId] || null : null;
  })();

  const columnIds = doc.columns.map((c) => colDndId(c.id));
  const boardSettings = doc.settings;
  const visibleLanes = boardSettings.swimlanesEnabled
    ? doc.lanes
    : doc.lanes.slice(0, 1);
  const laneIds = visibleLanes.map((l) => laneDndId(l.id));

  const applyDocumentSettings = useCallback(
    (next: KanbanBoardSettings) => {
      commitDoc(updateBoardSettings(docRef.current, next));
    },
    [commitDoc],
  );

  const requestQuickAddNote = useCallback(
    (column: KanbanColumn, laneId: string) => {
      if (column.folderPath == null) {
        showToast({
          message: '먼저 열 폴더를 연결하세요',
          durationMs: 2500,
        });
        return;
      }
      if (!canAddKanbanCard(docRef.current, column.id, laneId)) {
        showToast({
          message: '셀당 최대 카드 수에 도달했습니다',
          durationMs: 2200,
        });
        return;
      }
      const parentPath = column.folderPath || '';
      let parentDirHandle: FileSystemDirectoryHandle | null = null;
      if (storageType === 'local') {
        if (!parentPath) {
          parentDirHandle = localRootHandle;
        } else {
          const node = (findNodeByPath(localTree, parentPath) ||
            findNodeByPath(localTree, `${parentPath}/`)) as {
            handle?: FileSystemDirectoryHandle;
          } | null;
          parentDirHandle = node?.handle || null;
        }
      }
      setCreateModalContext({
        storageType,
        parentPath: parentPath ? (parentPath.endsWith('/') ? parentPath : `${parentPath}/`) : '',
        parentDirHandle,
        type: 'file',
        onCreatedPath: (path: string) => {
          if (!canAddKanbanCard(docRef.current, column.id, laneId)) {
            showToast({
              message: '셀당 최대 카드 수에 도달했습니다',
              durationMs: 2200,
            });
            return;
          }
          const title =
            String(path).split('/').filter(Boolean).pop() || '새 노트';
          const next = addCard(
            docRef.current,
            column.id,
            { title, linkPaths: [path] },
            laneId,
          );
          commitDoc(next);
          const ids = getLaneCardIds(
            next.columns.find((c) => c.id === column.id)!,
            laneId,
          );
          const added = ids[ids.length - 1];
          if (added) openCardEditor(added);
        },
      });
      setCreateModalOpen(true);
    },
    [
      commitDoc,
      localRootHandle,
      localTree,
      openCardEditor,
      setCreateModalContext,
      setCreateModalOpen,
      showToast,
      storageType,
    ],
  );

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-white dark:bg-odp-surface">
      {parseError ? (
        <div
          role="alert"
          className="shrink-0 border-b border-amber-300 bg-amber-50 px-4 py-2 text-xs text-amber-900 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-100"
        >
          {parseError}
        </div>
      ) : null}

      {searchOpen ? (
        <div
          data-kanban-board-search=""
          className="flex shrink-0 items-center gap-2 border-b border-gray-200 bg-slate-50 px-3 py-2 dark:border-odp-borderSoft dark:bg-odp-bgSoft/50"
        >
          <Search size={14} className="shrink-0 text-gray-500" aria-hidden />
          <input
            ref={searchInputRef}
            type="search"
            value={searchQuery}
            placeholder="제목 · 본문 · 태그 검색"
            aria-label="칸반 카드 검색"
            className="min-w-0 flex-1 rounded border border-gray-300 bg-white px-2 py-1.5 text-sm dark:border-odp-borderStrong dark:bg-odp-surface"
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSearchHitIndex(0);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                e.preventDefault();
                closeSearch();
                return;
              }
              if (e.key === 'Enter') {
                e.preventDefault();
                if (!searchHits.length) return;
                const next = e.shiftKey
                  ? searchHitIndex - 1
                  : searchHitIndex + 1;
                focusSearchHit(next);
                const id = searchHits[
                  ((next % searchHits.length) + searchHits.length) %
                    searchHits.length
                ];
                if (id) openCardEditor(id);
              }
            }}
          />
          <span className="shrink-0 text-xs text-gray-500 tabular-nums">
            {searchActive
              ? searchHits.length
                ? `${searchHitIndex + 1}/${searchHits.length}`
                : '0'
              : ''}
          </span>
          <Button
            type="button"
            variant="secondary"
            disabled={!searchHits.length}
            onClick={() => focusSearchHit(searchHitIndex - 1)}
            aria-label="이전 결과"
          >
            ↑
          </Button>
          <Button
            type="button"
            variant="secondary"
            disabled={!searchHits.length}
            onClick={() => focusSearchHit(searchHitIndex + 1)}
            aria-label="다음 결과"
          >
            ↓
          </Button>
          <button
            type="button"
            aria-label="검색 닫기"
            className="inline-flex rounded p-1 text-gray-500 hover:bg-gray-200 dark:hover:bg-odp-focusBg"
            onClick={closeSearch}
          >
            <IconX size={14} />
          </button>
        </div>
      ) : null}

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <div
          ref={handleBoardDropHostChange}
          className="relative min-h-0 min-w-0 flex-1 cursor-grab overflow-auto p-3 active:cursor-grabbing"
          data-kanban-tree-card-drop-host=""
          data-kanban-board-scroll=""
        >
          <DndContext
            sensors={sensors}
            collisionDetection={kanbanCollisionDetection}
            measuring={KANBAN_DND_MEASURING}
            autoScroll={KANBAN_DND_AUTO_SCROLL}
            modifiers={KANBAN_DND_MODIFIERS}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
          >
            <div className="flex min-h-full min-w-max flex-col gap-3">
              {/* Column headers */}
              <SortableContext
                items={columnIds}
                strategy={horizontalListSortingStrategy}
              >
                <div className="flex items-stretch">
                  {boardSettings.swimlanesEnabled ? (
                    <div className="w-36 shrink-0 pr-2 pt-2">
                      <Button
                        type="button"
                        variant="secondary"
                        className="w-full"
                        disabled={!canAddKanbanLane(doc)}
                        onClick={() => {
                          if (!canAddKanbanLane(doc)) {
                            showToast({
                              message: '최대 레인 수에 도달했습니다',
                              durationMs: 2200,
                            });
                            return;
                          }
                          commitDoc(addLane(doc));
                        }}
                      >
                        <IconPlus size={14} />
                        레인 추가
                      </Button>
                    </div>
                  ) : null}
                  {doc.columns.map((column, columnIndex) => {
                    const resolvedWidth = resolveKanbanColumnWidth(column.width);
                    const widthPx =
                      columnLiveWidth?.id === column.id
                        ? columnLiveWidth.width
                        : resolvedWidth;
                    const isLastColumn =
                      columnIndex === doc.columns.length - 1;
                    return (
                      <Fragment key={column.id}>
                        <SortableColumnShell
                          column={column}
                          widthPx={widthPx}
                          isWidthResizing={columnLiveWidth?.id === column.id}
                          sortableDisabled={isCardDragActive}
                          header={
                            <>
                              {boardSettings.columnIconsEnabled ? (
                                <KanbanColumnIconPicker
                                  icon={column.icon}
                                  onChange={(icon) =>
                                    commitDoc(
                                      updateColumn(doc, column.id, { icon }),
                                    )
                                  }
                                />
                              ) : null}
                              <input
                                type="text"
                                value={column.title}
                                aria-label="열 이름"
                                className="min-w-0 flex-1 truncate rounded border border-transparent bg-transparent px-1 py-0.5 text-sm font-semibold text-gray-800 outline-none hover:border-gray-300 focus:border-blue-400 dark:text-odp-fgStrong dark:hover:border-odp-borderSoft"
                                onChange={(e) =>
                                  commitDoc(
                                    updateColumn(doc, column.id, {
                                      title: e.target.value,
                                    }),
                                  )
                                }
                              />
                              <span className="shrink-0 text-[11px] text-gray-400">
                                {countColumnCards(column)}
                              </span>
                              {boardSettings.coversEnabled ? (
                                <button
                                  type="button"
                                  aria-label="열 커버"
                                  className="inline-flex items-center justify-center rounded p-1 text-gray-500 hover:bg-gray-200/80 dark:hover:bg-odp-focusBg"
                                  onClick={() =>
                                    setCoverPickerTarget({
                                      kind: 'column',
                                      id: column.id,
                                    })
                                  }
                                >
                                  <ImageIcon size={14} />
                                </button>
                              ) : null}
                              {boardSettings.columnFoldersEnabled ? (
                                <button
                                  type="button"
                                  aria-label="열 폴더"
                                  className={`inline-flex items-center justify-center rounded p-1 hover:bg-gray-200/80 dark:hover:bg-odp-focusBg ${
                                    column.folderPath != null
                                      ? 'text-emerald-600 dark:text-emerald-400'
                                      : 'text-gray-500'
                                  }`}
                                  onClick={() =>
                                    setFolderPickerColumnId(column.id)
                                  }
                                >
                                  <Folder size={14} />
                                </button>
                              ) : null}
                              {boardSettings.columnColorsEnabled ? (
                              <Tooltip.Provider
                                delayDuration={250}
                                skipDelayDuration={0}
                              >
                                <Popover.Root
                                  open={colorPopoverColId === column.id}
                                  onOpenChange={(open) =>
                                    setColorPopoverColId(
                                      open ? column.id : null,
                                    )
                                  }
                                >
                                  <Tooltip.Root>
                                    <Tooltip.Trigger asChild>
                                      <Popover.Trigger asChild>
                                        <button
                                          type="button"
                                          aria-label="열 색상"
                                          className="inline-flex items-center justify-center rounded p-1 text-gray-500 hover:bg-gray-200/80 dark:hover:bg-odp-focusBg"
                                        >
                                          <Palette
                                            size={14}
                                            style={
                                              column.color
                                                ? { color: column.color }
                                                : undefined
                                            }
                                          />
                                        </button>
                                      </Popover.Trigger>
                                    </Tooltip.Trigger>
                                    <Tooltip.Portal>
                                      <Tooltip.Content
                                        side="top"
                                        sideOffset={6}
                                        className="z-100001 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-700 shadow-md dark:border-odp-borderSoft dark:bg-odp-surface dark:text-odp-fgStrong"
                                      >
                                        열 색상
                                        <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
                                      </Tooltip.Content>
                                    </Tooltip.Portal>
                                  </Tooltip.Root>
                                  <Popover.Portal>
                                    <Popover.Content
                                      side="bottom"
                                      sideOffset={6}
                                      className="z-100010 w-56 rounded-md border border-gray-200 bg-white p-3 shadow-lg dark:border-odp-borderSoft dark:bg-odp-surface"
                                    >
                                      <div className="[&_.react-colorful]:h-32 [&_.react-colorful]:w-full">
                                        <HexColorPicker
                                          color={column.color || '#64748b'}
                                          onChange={(next) => {
                                            const color = normalizeCssHexColor(
                                              next.startsWith('#')
                                                ? next
                                                : `#${next}`,
                                            );
                                            commitDoc(
                                              updateColumn(doc, column.id, {
                                                color: color || null,
                                              }),
                                            );
                                          }}
                                        />
                                      </div>
                                      <HexColorInput
                                        prefixed
                                        color={column.color || '#64748b'}
                                        onChange={(next) => {
                                          const color = normalizeCssHexColor(
                                            next.startsWith('#')
                                              ? next
                                              : `#${next}`,
                                          );
                                          commitDoc(
                                            updateColumn(doc, column.id, {
                                              color: color || null,
                                            }),
                                          );
                                        }}
                                        className="mt-2 w-full rounded border border-gray-300 bg-white px-2 py-1 font-mono text-xs dark:border-odp-borderStrong dark:bg-odp-bgSoft"
                                      />
                                      <Button
                                        type="button"
                                        variant="secondary"
                                        className="mt-2 w-full"
                                        onClick={() =>
                                          commitDoc(
                                            updateColumn(doc, column.id, {
                                              color: null,
                                            }),
                                          )
                                        }
                                      >
                                        <IconX size={14} />
                                        색상 지우기
                                      </Button>
                                    </Popover.Content>
                                  </Popover.Portal>
                                </Popover.Root>
                              </Tooltip.Provider>
                              ) : null}
                              <button
                                type="button"
                                aria-label="열 삭제"
                                className="inline-flex items-center justify-center rounded p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
                                onClick={() => setDeleteColumnId(column.id)}
                              >
                                <Trash2 size={14} />
                              </button>
                            </>
                          }
                        >
                          {boardSettings.coversEnabled && column.coverPath ? (
                            <KanbanCoverImage
                              path={column.coverPath}
                              variant="column"
                              {...(onResolveWikiImageUrl
                                ? { resolveUrl: onResolveWikiImageUrl }
                                : {})}
                            />
                          ) : null}
                        </SortableColumnShell>
                        <ColumnGapResizeHandle
                          columnWidthPx={widthPx}
                          onLiveWidth={(width) =>
                            setColumnLiveWidth({ id: column.id, width })
                          }
                          onCommitWidth={(width) => {
                            setColumnLiveWidth(null);
                            commitDoc(
                              updateColumn(docRef.current, column.id, {
                                width,
                              }),
                            );
                          }}
                        />
                        {isLastColumn ? (
                          <div className="flex w-40 shrink-0 items-start pl-1 pt-1">
                            <Button
                              type="button"
                              variant="secondary"
                              className="w-full"
                              disabled={!canAddKanbanColumn(doc)}
                              onClick={() => {
                                if (!canAddKanbanColumn(doc)) {
                                  showToast({
                                    message: '최대 열 수에 도달했습니다',
                                    durationMs: 2200,
                                  });
                                  return;
                                }
                                commitDoc(addColumn(doc));
                              }}
                            >
                              <IconPlus size={14} />
                              열 추가
                            </Button>
                          </div>
                        ) : null}
                      </Fragment>
                    );
                  })}
                </div>
              </SortableContext>

              {/* Lane rows × column cells */}
              <SortableContext
                items={laneIds}
                strategy={kanbanCardSortingStrategy}
              >
                {visibleLanes.map((lane) => (
                  <div key={lane.id} className="flex items-stretch">
                    {boardSettings.swimlanesEnabled ? (
                      <div className="w-36 shrink-0">
                        <SortableLaneShell
                          lane={lane}
                          disabled={isCardDragActive}
                        >
                          <input
                            type="text"
                            value={lane.title}
                            aria-label="레인 이름"
                            className="min-w-0 flex-1 truncate rounded border border-transparent bg-transparent px-1 py-0.5 text-xs font-semibold text-gray-700 outline-none hover:border-gray-300 focus:border-blue-400 dark:text-odp-fgStrong"
                            onChange={(e) =>
                              commitDoc(
                                updateLane(doc, lane.id, {
                                  title: e.target.value,
                                }),
                              )
                            }
                          />
                          {doc.lanes.length > 1 ? (
                            <button
                              type="button"
                              aria-label="레인 삭제"
                              className="inline-flex rounded p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
                              onClick={() => setDeleteLaneId(lane.id)}
                            >
                              <Trash2 size={12} />
                            </button>
                          ) : null}
                        </SortableLaneShell>
                      </div>
                    ) : null}
                    {doc.columns.map((column, columnIndex) => {
                      const resolvedWidth = resolveKanbanColumnWidth(
                        column.width,
                      );
                      const widthPx =
                        columnLiveWidth?.id === column.id
                          ? columnLiveWidth.width
                          : resolvedWidth;
                      const cellIds = getLaneCardIds(column, lane.id);
                      return (
                        <Fragment key={`${lane.id}:${column.id}`}>
                          <div
                            style={{ width: widthPx }}
                            className="flex shrink-0 flex-col overflow-hidden rounded-lg border border-gray-200 bg-slate-50/60 dark:border-odp-borderSoft dark:bg-odp-bgSoft/50"
                          >
                            <div className="flex shrink-0 items-center justify-end gap-0.5 border-b border-gray-100 px-1 py-0.5 dark:border-odp-borderSoft">
                              <button
                                type="button"
                                aria-label="카드 추가"
                                className="inline-flex rounded p-1 text-gray-500 hover:bg-gray-200/80 dark:hover:bg-odp-focusBg disabled:opacity-40"
                                disabled={
                                  !canAddKanbanCard(doc, column.id, lane.id)
                                }
                                onClick={() => {
                                  if (
                                    !canAddKanbanCard(doc, column.id, lane.id)
                                  ) {
                                    showToast({
                                      message: '셀당 최대 카드 수에 도달했습니다',
                                      durationMs: 2200,
                                    });
                                    return;
                                  }
                                  const next = addCard(
                                    doc,
                                    column.id,
                                    { title: '새 카드' },
                                    lane.id,
                                  );
                                  commitDoc(next);
                                  const ids = getLaneCardIds(
                                    next.columns.find(
                                      (c) => c.id === column.id,
                                    )!,
                                    lane.id,
                                  );
                                  const added = ids[ids.length - 1];
                                  if (added) openCardEditor(added);
                                }}
                              >
                                <Plus size={12} />
                              </button>
                              {boardSettings.columnFoldersEnabled &&
                              column.folderPath != null ? (
                                <button
                                  type="button"
                                  aria-label="노트 추가"
                                  className="inline-flex rounded p-1 text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/30"
                                  onClick={() =>
                                    requestQuickAddNote(column, lane.id)
                                  }
                                >
                                  <Folder size={12} />
                                </button>
                              ) : null}
                            </div>
                            <ColumnDroppable
                              columnId={column.id}
                              laneId={lane.id}
                            >
                              <SortableContext
                                items={cellIds.map(cardDndId)}
                                strategy={kanbanCardSortingStrategy}
                              >
                                {cellIds.map((cid) => {
                                  const card = doc.cards[cid];
                                  if (!card) return null;
                                  return (
                                    <SortableCard
                                      key={cid}
                                      card={card}
                                      columnId={column.id}
                                      laneId={lane.id}
                                      isSelected={selectedCardId === cid}
                                      searchDimmed={
                                        searchActive && !searchHitSet.has(cid)
                                      }
                                      searchHit={
                                        searchActive &&
                                        searchHits[searchHitIndex] === cid
                                      }
                                      {...(onResolveWikiImageUrl
                                        ? {
                                            resolveCoverUrl:
                                              onResolveWikiImageUrl,
                                          }
                                        : {})}
                                      showCover={boardSettings.coversEnabled}
                                      showTags={boardSettings.tagsEnabled}
                                      showLinks={boardSettings.linksEnabled}
                                      onSelect={() => {
                                        if (
                                          draftDirty &&
                                          selectedCardId &&
                                          selectedCardId !== cid
                                        ) {
                                          setPendingCloseAfterDiscard(false);
                                          setDiscardConfirmOpen(true);
                                          pendingSelectCardIdRef.current = cid;
                                          return;
                                        }
                                        openCardEditor(cid);
                                      }}
                                    />
                                  );
                                })}
                              </SortableContext>
                            </ColumnDroppable>
                          </div>
                          <div className="w-3 shrink-0" aria-hidden />
                          {columnIndex === doc.columns.length - 1 ? (
                            <div className="w-40 shrink-0" aria-hidden />
                          ) : null}
                        </Fragment>
                      );
                    })}
                  </div>
                ))}
              </SortableContext>
            </div>
            <DragOverlay dropAnimation={null}>
              {activeDragCard ? (
                <CardDragPreview card={activeDragCard} />
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>

        {selectedCard && cardDraft ? (
          <aside
            className="relative flex h-full min-h-0 shrink-0 flex-col border-l border-gray-200 bg-slate-50/50 dark:border-odp-borderSoft dark:bg-odp-bgSoft/40"
            style={{ width: sidePanelResize.width }}
          >
            <TocResizeHandle
              edge="left"
              visibleOnHover
              isResizing={sidePanelResize.isResizing}
              label="카드 편집 패널 너비 조절"
              handleProps={sidePanelResize.handleProps}
            />
            <header className="flex shrink-0 items-center justify-between gap-2 border-b border-gray-200 px-3 py-2 dark:border-odp-borderSoft">
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-odp-fgStrong">
                  카드 편집
                </h3>
                {draftDirty ? (
                  <p className="text-[11px] text-amber-600 dark:text-amber-400">
                    저장되지 않은 변경
                  </p>
                ) : null}
              </div>
              <button
                type="button"
                aria-label="패널 닫기"
                className="inline-flex rounded p-1 text-gray-500 hover:bg-gray-200 dark:hover:bg-odp-focusBg"
                onClick={requestCloseCardEditor}
              >
                <IconX size={14} />
              </button>
            </header>

            <div className="flex shrink-0 flex-col gap-2 border-b border-gray-200 px-3 py-2 dark:border-odp-borderSoft">
              <label className="block space-y-1">
                <span className="text-xs font-medium text-gray-600 dark:text-odp-muted">
                  제목
                </span>
                <input
                  type="text"
                  value={cardDraft.title}
                  className="w-full rounded border border-gray-300 bg-white px-2 py-1.5 text-sm dark:border-odp-borderStrong dark:bg-odp-surface"
                  onChange={(e) =>
                    setCardDraft((prev) =>
                      prev ? { ...prev, title: e.target.value } : prev,
                    )
                  }
                />
              </label>

              {boardSettings.coversEnabled ? (
                <div className="space-y-1">
                  <span className="text-xs font-medium text-gray-600 dark:text-odp-muted">
                    커버
                  </span>
                  {cardDraft.coverPath ? (
                    <KanbanCoverImage
                      path={cardDraft.coverPath}
                      variant="card"
                      className="rounded-md"
                      {...(onResolveWikiImageUrl
                        ? { resolveUrl: onResolveWikiImageUrl }
                        : {})}
                    />
                  ) : null}
                  <div className="flex gap-1">
                    <Button
                      type="button"
                      variant="secondary"
                      className="flex-1"
                      onClick={() =>
                        setCoverPickerTarget({
                          kind: 'card',
                          id: selectedCardId || '',
                        })
                      }
                    >
                      <ImageIcon size={14} />
                      {cardDraft.coverPath ? '커버 변경' : '커버 추가'}
                    </Button>
                    {cardDraft.coverPath ? (
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() =>
                          setCardDraft((prev) =>
                            prev ? { ...prev, coverPath: null } : prev,
                          )
                        }
                      >
                        <IconX size={14} />
                      </Button>
                    ) : null}
                  </div>
                </div>
              ) : null}

              {boardSettings.tagsEnabled ? (
                <div className="space-y-1.5">
                  <span className="text-xs font-medium text-gray-600 dark:text-odp-muted">
                    태그
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {cardDraft.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-0.5 rounded-full bg-violet-50 px-2 py-0.5 text-[11px] text-violet-700 dark:bg-violet-950/40 dark:text-violet-300"
                      >
                        {tag}
                        <button
                          type="button"
                          aria-label={`${tag} 태그 제거`}
                          className="rounded p-0.5 hover:bg-violet-100 dark:hover:bg-violet-900/50"
                          onClick={() =>
                            setCardDraft((prev) =>
                              prev
                                ? {
                                    ...prev,
                                    tags: prev.tags.filter((t) => t !== tag),
                                  }
                                : prev,
                            )
                          }
                        >
                          <X size={10} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      value={tagInput}
                      placeholder="태그 입력 후 Enter"
                      className="min-w-0 flex-1 rounded border border-gray-300 bg-white px-2 py-1.5 text-sm dark:border-odp-borderStrong dark:bg-odp-surface"
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key !== 'Enter') return;
                        e.preventDefault();
                        const nextTags = normalizeTags([
                          ...cardDraft.tags,
                          tagInput,
                        ]);
                        setCardDraft((prev) =>
                          prev ? { ...prev, tags: nextTags } : prev,
                        );
                        setTagInput('');
                      }}
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      aria-label="태그 추가"
                      onClick={() => {
                        const nextTags = normalizeTags([
                          ...cardDraft.tags,
                          tagInput,
                        ]);
                        setCardDraft((prev) =>
                          prev ? { ...prev, tags: nextTags } : prev,
                        );
                        setTagInput('');
                      }}
                    >
                      <Tag size={14} />
                    </Button>
                  </div>
                </div>
              ) : null}

              {boardSettings.linksEnabled ? (
                <div className="space-y-1.5">
                  <span className="text-xs font-medium text-gray-600 dark:text-odp-muted">
                    Vault 링크
                  </span>
                  {cardDraft.linkPaths.length > 0 ? (
                    <ul className="space-y-1">
                      {cardDraft.linkPaths.map((path) => (
                        <li key={path} className="flex items-center gap-1">
                          <button
                            type="button"
                            className="min-w-0 flex-1 truncate rounded border border-blue-200 bg-blue-50 px-2 py-1.5 text-left text-xs text-blue-700 hover:underline dark:border-blue-800 dark:bg-blue-950/30 dark:text-blue-300"
                            onClick={() => void openLinkedPath(path)}
                          >
                            {path}
                          </button>
                          <button
                            type="button"
                            aria-label={`${path} 연결 해제`}
                            className="shrink-0 rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-odp-focusBg"
                            onClick={() =>
                              setCardDraft((prev) =>
                                prev
                                  ? {
                                      ...prev,
                                      linkPaths: prev.linkPaths.filter(
                                        (p) => p !== path,
                                      ),
                                    }
                                  : prev,
                              )
                            }
                          >
                            <X size={12} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-gray-400">연결된 파일 없음</p>
                  )}
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setLinkPickerOpen(true)}
                  >
                    <Link2 size={14} />
                    파일 연결
                  </Button>
                </div>
              ) : null}
            </div>

            <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
              <div className="shrink-0 px-3 pt-2 text-xs font-medium text-gray-600 dark:text-odp-muted">
                본문
              </div>
              <div className="min-h-0 flex-1 overflow-hidden px-2 pb-2 pt-1">
                <div className="kanban-card-md-editor h-full min-h-0 overflow-hidden rounded-md border border-gray-200 bg-white dark:border-odp-borderSoft dark:bg-odp-surface [&_.haim-editor]:h-full [&_.md-editor]:h-full [&_.md-editor-content]:min-h-0">
                  <Suspense fallback={<EditorFallback />}>
                    <NoteEditorSurface
                      key={selectedCard.id}
                      value={cardDraft.body}
                      onChange={(next) =>
                        setCardDraft((prev) =>
                          prev ? { ...prev, body: next } : prev,
                        )
                      }
                      onSave={saveCardDraft}
                      theme={theme}
                      isActiveFile
                      isSurfaceLive
                      {...(currentFile ? { currentFile } : {})}
                      {...(onResolveWikiImageUrl
                        ? { onResolveWikiImageUrl }
                        : {})}
                    />
                  </Suspense>
                </div>
              </div>
            </div>

            <footer className="flex shrink-0 flex-col gap-2 border-t border-gray-200 px-3 py-2 dark:border-odp-borderSoft">
              <Button
                type="button"
                variant="primary"
                className="w-full"
                disabled={!draftDirty}
                onClick={saveCardDraft}
              >
                <IconSave size={14} />
                카드 저장
              </Button>
              <Button
                type="button"
                variant="danger"
                className="w-full"
                onClick={() => setDeleteCardId(selectedCard.id)}
              >
                <IconTrash size={14} />
                카드 삭제
              </Button>
            </footer>
          </aside>
        ) : null}
      </div>

      <ConfirmModal
        isOpen={Boolean(deleteColumnId)}
        title="열 삭제"
        message="이 열과 안의 카드를 모두 삭제할까요?"
        variant="danger"
        confirmLabel="삭제"
        cancelLabel="취소"
        onConfirm={() => {
          if (!deleteColumnId) return;
          const next = removeColumn(doc, deleteColumnId);
          commitDoc(next);
          if (
            selectedCardId &&
            !Object.prototype.hasOwnProperty.call(next.cards, selectedCardId)
          ) {
            closeCardEditor();
          }
          setDeleteColumnId(null);
        }}
        onCancel={() => setDeleteColumnId(null)}
      />

      <ConfirmModal
        isOpen={Boolean(deleteCardId)}
        title="카드 삭제"
        message="이 카드를 삭제할까요?"
        variant="danger"
        confirmLabel="삭제"
        cancelLabel="취소"
        onConfirm={() => {
          if (!deleteCardId) return;
          commitDoc(removeCard(doc, deleteCardId));
          if (selectedCardId === deleteCardId) closeCardEditor();
          setDeleteCardId(null);
        }}
        onCancel={() => setDeleteCardId(null)}
      />

      <ConfirmModal
        isOpen={discardConfirmOpen}
        title="저장되지 않은 변경"
        message="카드 편집 내용을 버리고 계속할까요?"
        variant="danger"
        confirmLabel="버리기"
        cancelLabel="계속 편집"
        onConfirm={() => {
          setDiscardConfirmOpen(false);
          const nextId = pendingSelectCardIdRef.current;
          pendingSelectCardIdRef.current = null;
          if (pendingCloseAfterDiscard) {
            setPendingCloseAfterDiscard(false);
            closeCardEditor();
            return;
          }
          if (nextId) {
            openCardEditor(nextId);
            return;
          }
          closeCardEditor();
        }}
        onCancel={() => {
          setDiscardConfirmOpen(false);
          setPendingCloseAfterDiscard(false);
          pendingSelectCardIdRef.current = null;
        }}
      />

      <KanbanLinkPickerModal
        isOpen={linkPickerOpen && Boolean(selectedCardId && cardDraft)}
        onClose={() => setLinkPickerOpen(false)}
        tree={vaultTree}
        selected={cardDraft?.linkPaths || []}
        excludePath={currentFile?.id || null}
        onConfirm={(paths) => {
          setCardDraft((prev) =>
            prev ? { ...prev, linkPaths: paths } : prev,
          );
        }}
        onExpandFolder={onExpandFolder}
      />

      <KanbanLinkPickerModal
        isOpen={Boolean(coverPickerTarget)}
        onClose={() => setCoverPickerTarget(null)}
        tree={vaultTree}
        selected={
          coverPickerTarget?.kind === 'column'
            ? (() => {
                const col = doc.columns.find(
                  (c) => c.id === coverPickerTarget.id,
                );
                return col?.coverPath ? [col.coverPath] : [];
              })()
            : cardDraft?.coverPath
              ? [cardDraft.coverPath]
              : []
        }
        excludePath={currentFile?.id || null}
        onConfirm={(paths) => {
          const path = paths[0] || null;
          if (!coverPickerTarget) return;
          if (coverPickerTarget.kind === 'column') {
            commitDoc(
              updateColumn(docRef.current, coverPickerTarget.id, {
                coverPath: path,
              }),
            );
          } else {
            setCardDraft((prev) =>
              prev ? { ...prev, coverPath: path } : prev,
            );
          }
          setCoverPickerTarget(null);
        }}
        onExpandFolder={onExpandFolder}
      />

      <KanbanFolderPickerModal
        isOpen={Boolean(folderPickerColumnId)}
        onClose={() => setFolderPickerColumnId(null)}
        tree={vaultTree}
        selected={
          doc.columns.find((c) => c.id === folderPickerColumnId)?.folderPath ??
          null
        }
        onConfirm={(folderPath) => {
          if (!folderPickerColumnId) return;
          commitDoc(
            updateColumn(docRef.current, folderPickerColumnId, {
              folderPath,
            }),
          );
          setFolderPickerColumnId(null);
        }}
        onExpandFolder={onExpandFolder}
      />

      <ConfirmModal
        isOpen={Boolean(deleteLaneId)}
        title="레인 삭제"
        message="이 레인의 카드는 첫 번째 레인으로 이동합니다. 삭제할까요?"
        variant="danger"
        confirmLabel="삭제"
        cancelLabel="취소"
        onConfirm={() => {
          if (!deleteLaneId) return;
          commitDoc(removeLane(doc, deleteLaneId));
          setDeleteLaneId(null);
        }}
        onCancel={() => setDeleteLaneId(null)}
      />

      <KanbanDocumentSettingsModal
        isOpen={documentSettingsOpen}
        onClose={() => setDocumentSettingsOpen(false)}
        settings={boardSettings}
        onApply={applyDocumentSettings}
      />
    </div>
  );
}
