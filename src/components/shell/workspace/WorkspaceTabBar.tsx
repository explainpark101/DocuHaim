import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragCancelEvent,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Transform } from '@dnd-kit/utilities';
import {
  IconFile,
  IconFileCode,
  IconFileJson,
  IconImage,
  IconMusic,
  IconSettings,
  IconVideo,
} from '@/components/icons';
import { MessageSquare, Search, X, Loader2, ClipboardList } from 'lucide-react';
import { Tooltip } from 'radix-ui';
import { useHorizontalOverflowScroll } from '@/hooks/useHorizontalOverflowScroll';
import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type SVGProps,
} from 'react';
import type { FileWorkspaceTab, WorkspaceTab } from '@/utils/workspaceTabs';
import {
  isFileTab,
  isFileTabDirty,
  tabDirectoryPath,
  tabDisplayTitle,
} from '@/utils/workspaceTabs';
import { useMobileContextMenuMode } from '@/hooks/useMobileContextMenuMode';
import { vibrateLongPressAction } from '@/utils/hapticFeedback';
import { PRESSABLE_CARD_MENU_MS } from '@/components/chatWithMyself/usePressableCardMenu';
import { restrictToHorizontalAxis } from '@/utils/workspace/restrictToHorizontalAxis';

/** Horizontal-only translate; never scale tabs during sortable shifts. */
function horizontalSortableTransform(transform: Transform | null): Transform | null {
  if (!transform) return null;
  return { ...transform, y: 0, scaleX: 1, scaleY: 1 };
}

type WorkspaceTabBarProps = {
  tabs: WorkspaceTab[];
  activeId: string | null;
  savingTabIds?: readonly string[];
  onActivate: (id: string) => void;
  onClose: (id: string) => void;
  onReorder: (activeId: string, overId: string) => void;
  /** Open TreeNode / Sidebar context menu for a file tab (right-click / long-press). */
  onFileTabContextMenu?: (
    tab: FileWorkspaceTab,
    point: { clientX: number; clientY: number },
  ) => void;
  isMobileLayout?: boolean;
  /**
   * `inline` — bordered strip above editor panels (web / default).
   * `titlebar` — embedded in DesktopTitlebar (no own border/bg; parent owns chrome).
   */
  variant?: 'inline' | 'titlebar';
  className?: string;
};

type IconComp = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

/** Match sidebar TreeNode file icon rules. */
function fileTabIcon(tab: FileWorkspaceTab): IconComp {
  const name = String(tab.editedFileName || tab.currentFile.name || tab.path || '');
  const lower = name.toLowerCase();
  const lastDot = lower.lastIndexOf('.');
  const ext = lastDot > -1 ? lower.slice(lastDot + 1) : '';
  const imageExts = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'ico', 'avif'];
  const videoExts = ['mp4', 'webm', 'ogv', 'mov', 'mkv'];
  const audioExts = ['m4a', 'mp3', 'wav', 'ogg', 'aac', 'flac', 'weba'];

  if (lower.endsWith('.quiz.md')) return ClipboardList as IconComp;
  if (imageExts.includes(ext)) return IconImage;
  if (videoExts.includes(ext)) return IconVideo;
  if (audioExts.includes(ext)) return IconMusic;
  if (ext === 'pdf') return IconFileJson;
  if (
    ext === 'md' ||
    ext === 'markdown' ||
    ext === 'mdx' ||
    ext === 'html' ||
    ext === 'htm' ||
    ext === 'svg' ||
    ext === 'json'
  ) {
    return IconFileCode;
  }
  return IconFile;
}

const tooltipContentClass =
  'z-100001 max-w-[min(92vw,360px)] break-all rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-700 shadow-md dark:border-odp-borderSoft dark:bg-odp-surface dark:text-odp-fgStrong';

function workspaceTabRowClassName(
  active: boolean,
  variant: 'inline' | 'titlebar',
  overlay = false,
): string {
  const tabWidthClass =
    variant === 'titlebar' ? 'h-full max-w-[18rem] min-w-[7rem]' : 'max-w-56 min-w-0';
  const tabPaddingClass = variant === 'titlebar' ? 'px-2.5' : 'px-2';
  return `group relative flex ${tabWidthClass} shrink-0 items-center gap-1 rounded-t-md border border-b-0 ${tabPaddingClass} text-xs transition-colors ${
    overlay ? 'cursor-grabbing shadow-md ' : ''
  }${
    active
      ? 'border-gray-200 bg-white text-gray-900 dark:border-odp-borderSoft dark:bg-odp-surface dark:text-odp-fgStrong'
      : 'border-transparent text-gray-600 hover:bg-white/70 dark:text-odp-muted dark:hover:bg-odp-focusBg/60'
  }`;
}

type WorkspaceTabRowProps = {
  tab: WorkspaceTab;
  active: boolean;
  saving: boolean;
  onActivate: (id: string) => void;
  onClose: (id: string) => void;
  onFileTabContextMenu?: WorkspaceTabBarProps['onFileTabContextMenu'];
  mobileContextMenu: boolean;
  variant: 'inline' | 'titlebar';
  /** DragOverlay clone — no sortable listeners or context-menu gestures. */
  overlay?: boolean;
  dragHandleProps?: Record<string, unknown>;
  innerRef?: (node: HTMLElement | null) => void;
  style?: CSSProperties;
};

function WorkspaceTabRow({
  tab,
  active,
  saving,
  onActivate,
  onClose,
  onFileTabContextMenu,
  mobileContextMenu,
  variant,
  overlay = false,
  dragHandleProps,
  innerRef,
  style,
}: WorkspaceTabRowProps) {
  const dirty = isFileTab(tab) && isFileTabDirty(tab);
  const loading = isFileTab(tab) && tab.currentFile?.viewer === 'loading';
  const title = tabDisplayTitle(tab);
  const FileIcon = isFileTab(tab) ? fileTabIcon(tab) : null;
  const dirPath = isFileTab(tab) ? tabDirectoryPath(tab) : null;
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressOpenedRef = useRef(false);
  const pressStartRef = useRef<{ x: number; y: number } | null>(null);

  const activateButtonClass =
    variant === 'titlebar'
      ? `flex h-full min-w-0 flex-1 items-center gap-1.5 text-left ${
          overlay ? 'cursor-grabbing' : 'cursor-grab active:cursor-grabbing'
        }`
      : `flex min-w-0 flex-1 items-center gap-1.5 py-1.5 text-left ${
          overlay ? 'cursor-grabbing' : 'cursor-grab active:cursor-grabbing'
        }`;

  const clearLongPress = useCallback(() => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
    pressStartRef.current = null;
  }, []);

  const openFileMenu = useCallback(
    (clientX: number, clientY: number) => {
      if (!isFileTab(tab) || !onFileTabContextMenu) return;
      onFileTabContextMenu(tab, { clientX, clientY });
    },
    [onFileTabContextMenu, tab],
  );

  const handleMiddleClose = (e: ReactMouseEvent) => {
    if (overlay || e.button !== 1) return;
    e.preventDefault();
    e.stopPropagation();
    onClose(tab.id);
  };

  const handleContextMenu = (e: ReactMouseEvent) => {
    if (overlay) return;
    // Suppress the browser menu on workspace tabs.
    e.preventDefault();
    e.stopPropagation();
    if (!isFileTab(tab) || !onFileTabContextMenu) return;
    openFileMenu(e.clientX, e.clientY);
  };

  const handlePointerDown = (e: ReactPointerEvent) => {
    if (overlay || !mobileContextMenu || !isFileTab(tab) || !onFileTabContextMenu) return;
    if (e.pointerType === 'mouse') return;
    if (e.button !== 0) return;
    longPressOpenedRef.current = false;
    pressStartRef.current = { x: e.clientX, y: e.clientY };
    clearLongPress();
    longPressTimerRef.current = setTimeout(() => {
      longPressTimerRef.current = null;
      longPressOpenedRef.current = true;
      vibrateLongPressAction();
      const start = pressStartRef.current;
      openFileMenu(start?.x ?? e.clientX, start?.y ?? e.clientY);
    }, PRESSABLE_CARD_MENU_MS);
  };

  const handlePointerMove = (e: ReactPointerEvent) => {
    if (!pressStartRef.current || !longPressTimerRef.current) return;
    const dx = e.clientX - pressStartRef.current.x;
    const dy = e.clientY - pressStartRef.current.y;
    if (dx * dx + dy * dy > 64) clearLongPress();
  };

  const handlePointerUpOrCancel = () => {
    clearLongPress();
  };

  const activateButton = (
    <button
      type="button"
      className={activateButtonClass}
      onClick={() => {
        if (overlay) return;
        if (longPressOpenedRef.current) {
          longPressOpenedRef.current = false;
          return;
        }
        onActivate(tab.id);
      }}
      {...(overlay ? {} : dragHandleProps)}
    >
      {tab.kind === 'chat' ? (
        <MessageSquare size={13} className="shrink-0 opacity-80" aria-hidden />
      ) : tab.kind === 'settings' ? (
        <IconSettings size={13} className="shrink-0 opacity-80" aria-hidden />
      ) : tab.kind === 'content-search' ? (
        <Search size={13} className="shrink-0 opacity-80" aria-hidden />
      ) : saving || loading ? (
        <Loader2
          size={13}
          className="shrink-0 animate-spin opacity-80"
          aria-label={saving ? '저장 중' : '로딩 중'}
        />
      ) : FileIcon ? (
        <FileIcon size={13} className="shrink-0 opacity-80" aria-hidden />
      ) : null}
      {dirty && !saving && !loading ? (
        <span
          className="size-1.5 shrink-0 rounded-full bg-amber-500"
          aria-label="저장되지 않은 변경"
        />
      ) : null}
      <span className="truncate">{title}</span>
    </button>
  );

  return (
    <div
      ref={innerRef}
      style={style}
      role="tab"
      aria-selected={active}
      onMouseDown={(e) => {
        if (overlay) return;
        // Prevent middle-click auto-scroll / paste quirks.
        if (e.button === 1) e.preventDefault();
      }}
      onAuxClick={handleMiddleClose}
      onContextMenu={handleContextMenu}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUpOrCancel}
      onPointerCancel={handlePointerUpOrCancel}
      className={workspaceTabRowClassName(active, variant, overlay)}
    >
      {dirPath != null ? (
        <Tooltip.Root>
          <Tooltip.Trigger asChild>{activateButton}</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content side="bottom" sideOffset={6} className={tooltipContentClass}>
              {dirPath}
              <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      ) : (
        activateButton
      )}
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            type="button"
            aria-label={`${title} 탭 닫기`}
            className={`shrink-0 rounded p-0.5 text-gray-400 hover:bg-gray-200 hover:text-gray-700 dark:hover:bg-odp-focusBg dark:hover:text-odp-fgStrong ${
              active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 focus:opacity-100'
            }`}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              if (overlay) return;
              e.stopPropagation();
              onClose(tab.id);
            }}
          >
            <X size={12} aria-hidden />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content side="bottom" sideOffset={6} className={tooltipContentClass}>
            닫기
            <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </div>
  );
}

type SortableTabProps = {
  tab: WorkspaceTab;
  active: boolean;
  saving: boolean;
  onActivate: (id: string) => void;
  onClose: (id: string) => void;
  onFileTabContextMenu?: WorkspaceTabBarProps['onFileTabContextMenu'];
  mobileContextMenu: boolean;
  variant: 'inline' | 'titlebar';
};

function SortableWorkspaceTab({
  tab,
  active,
  saving,
  onActivate,
  onClose,
  onFileTabContextMenu,
  mobileContextMenu,
  variant,
}: SortableTabProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: tab.id,
    animateLayoutChanges: () => false,
  });

  const lockedTransform = horizontalSortableTransform(transform);
  const style: CSSProperties = isDragging
    ? { opacity: 0 }
    : lockedTransform
      ? {
          transform: CSS.Transform.toString(lockedTransform),
          ...(transition ? { transition } : {}),
        }
      : {};

  return (
    <WorkspaceTabRow
      tab={tab}
      active={active}
      saving={saving}
      onActivate={onActivate}
      onClose={onClose}
      onFileTabContextMenu={onFileTabContextMenu}
      mobileContextMenu={mobileContextMenu}
      variant={variant}
      innerRef={setNodeRef}
      style={style}
      dragHandleProps={{ ...attributes, ...listeners }}
    />
  );
}

type ActiveDragState = {
  tab: WorkspaceTab;
  size: { width: number; height: number } | null;
};

export default function WorkspaceTabBar({
  tabs,
  activeId,
  savingTabIds = [],
  onActivate,
  onClose,
  onReorder,
  onFileTabContextMenu,
  isMobileLayout = false,
  variant = 'inline',
  className = '',
}: WorkspaceTabBarProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
  );
  const sortableIds = useMemo(() => tabs.map((t) => t.id), [tabs]);
  const savingSet = useMemo(() => new Set(savingTabIds), [savingTabIds]);
  const mobileContextMenu = useMobileContextMenuMode(isMobileLayout);
  const [activeDrag, setActiveDrag] = useState<ActiveDragState | null>(null);
  const [tabListEl, setTabListEl] = useState<HTMLDivElement | null>(null);

  useHorizontalOverflowScroll(tabListEl, tabs.length > 0);

  if (tabs.length === 0) return null;

  const clearActiveDrag = () => setActiveDrag(null);

  const handleDragStart = (event: DragStartEvent) => {
    const tab = tabs.find((t) => t.id === event.active.id);
    if (!tab) return;
    const initial = event.active.rect.current.initial;
    setActiveDrag({
      tab,
      size: initial ? { width: initial.width, height: initial.height } : null,
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    clearActiveDrag();
    const { active, over } = event;
    if (!over) return;
    const from = String(active.id);
    const to = String(over.id);
    if (from === to) return;
    onReorder(from, to);
  };

  const handleDragCancel = (_event: DragCancelEvent) => {
    clearActiveDrag();
  };

  const titlebarTabListClass =
    'workspace-tab-bar__tablist flex h-full min-w-0 flex-1 items-stretch gap-0.5 overflow-x-auto overflow-y-hidden px-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden';

  const listClass =
    variant === 'titlebar'
      ? titlebarTabListClass
      : `flex h-9 shrink-0 items-stretch gap-0.5 overflow-x-auto border-b border-gray-200 bg-gray-50 px-1 dark:border-odp-borderSoft dark:bg-odp-bgSoft ${className}`.trim();

  const overlayStyle: CSSProperties | undefined = activeDrag?.size
    ? {
        width: activeDrag.size.width,
        height: activeDrag.size.height,
        boxSizing: 'border-box',
      }
    : undefined;

  const tabStrip = (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToHorizontalAxis]}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={sortableIds} strategy={horizontalListSortingStrategy}>
        <div
          ref={setTabListEl}
          role="tablist"
          aria-label="워크스페이스 탭"
          className={listClass}
        >
          {tabs.map((tab) => (
            <SortableWorkspaceTab
              key={tab.id}
              tab={tab}
              active={tab.id === activeId}
              saving={savingSet.has(tab.id)}
              onActivate={onActivate}
              onClose={onClose}
              onFileTabContextMenu={onFileTabContextMenu}
              mobileContextMenu={mobileContextMenu}
              variant={variant}
            />
          ))}
          {variant === 'titlebar' ? (
            <div data-tauri-drag-region className="min-w-8 flex-1 shrink-0 self-stretch" />
          ) : null}
        </div>
      </SortableContext>
      <DragOverlay dropAnimation={null}>
        {activeDrag ? (
          <WorkspaceTabRow
            tab={activeDrag.tab}
            active={activeDrag.tab.id === activeId}
            saving={savingSet.has(activeDrag.tab.id)}
            onActivate={onActivate}
            onClose={onClose}
            {...(onFileTabContextMenu ? { onFileTabContextMenu } : {})}
            mobileContextMenu={mobileContextMenu}
            variant={variant}
            overlay
            {...(overlayStyle ? { style: overlayStyle } : {})}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );

  return (
    <Tooltip.Provider delayDuration={250} skipDelayDuration={0}>
      {variant === 'titlebar' ? (
        <div
          className={`workspace-tab-bar__container flex h-full min-h-0 min-w-0 flex-1 items-stretch overflow-hidden ${className}`.trim()}
        >
          {tabStrip}
        </div>
      ) : (
        tabStrip
      )}
    </Tooltip.Provider>
  );
}
