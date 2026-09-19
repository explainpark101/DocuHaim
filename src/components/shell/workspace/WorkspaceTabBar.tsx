import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCenter,
  useDroppable,
  useSensor,
  useSensors,
  type DragCancelEvent,
  type DragEndEvent,
  type DragMoveEvent,
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
import { MessageSquare, Search, X, Loader2, ClipboardList, Columns2 } from 'lucide-react';
import { Tooltip } from 'radix-ui';
import { useHorizontalOverflowScroll } from '@/hooks/useHorizontalOverflowScroll';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type SVGProps,
} from 'react';
import type { FileWorkspaceTab, WorkspaceTab } from '@/utils/workspaceTabs';
import {
  isFileTab,
  isFileTabDirty,
  tabDirectoryPath,
  tabDisplayTitle,
} from '@/utils/workspaceTabs';
import {
  AdaptiveContextMenu,
  AdaptiveMenuItem,
  AdaptiveMenuSeparator,
} from '@/components/contextMenu/AdaptiveContextMenu';
import {
  DESKTOP_CONTEXT_MENU_Z_CLASS,
  MOBILE_CONTEXT_MENU_DANGER_ITEM_CLASS,
  MOBILE_CONTEXT_MENU_ITEM_CLASS,
} from '@/components/contextMenu/mobileContextMenuStyles';
import { chatMenuContentClass, chatMenuItemClass } from '@/components/chatWithMyself/ui/chatUiStyles';
import WorkspacePaneLayoutModal from '@/components/shell/workspace/WorkspacePaneLayoutModal';
import { useMobileContextMenuMode } from '@/hooks/useMobileContextMenuMode';
import { vibrateLongPressAction } from '@/utils/hapticFeedback';
import { PRESSABLE_CARD_MENU_MS } from '@/components/chatWithMyself/usePressableCardMenu';
import { restrictToHorizontalAxis } from '@/utils/workspace/restrictToHorizontalAxis';
import {
  hitTestPaneDropAt,
  setWorkspaceTabDrag,
  updateWorkspaceTabDragPoint,
} from '@/utils/workspaceTabs/workspaceTabDragBridge';
import {
  WORKSPACE_TAB_GROUP_ZONE_ID,
  WORKSPACE_TAB_ORPHAN_ZONE_ID,
  countLeaves,
  findLeaf,
  findLeafContainingTab,
  listOrphanTabIds,
  type PaneNode,
  type PaneSplitEdge,
} from '@/utils/workspaceTabs/paneLayout';
import {
  loadWorkspacePaneSoftCap,
  WORKSPACE_PANE_SOFT_CAP_CHANGED_EVENT,
} from '@/utils/workspaceTabsSettings';

/** Horizontal-only translate; never scale tabs during sortable shifts. */
function horizontalSortableTransform(transform: Transform | null): Transform | null {
  if (!transform) return null;
  return { ...transform, y: 0, scaleX: 1, scaleY: 1 };
}

export type WorkspaceTabGroup = {
  leafId: string;
  tabIds: string[];
  focused: boolean;
};

type WorkspaceTabBarProps = {
  tabs: WorkspaceTab[];
  activeId: string | null;
  savingTabIds?: readonly string[];
  onActivate: (id: string) => void;
  onClose: (id: string) => void;
  onReorder: (activeId: string, overId: string) => void;
  /** When set (split layout), tabs render in contiguous groups. */
  tabGroups?: WorkspaceTabGroup[] | null;
  onPaneDrop?: (
    tabId: string,
    leafId: string,
    zone: 'left' | 'right' | 'top' | 'bottom' | 'center',
  ) => boolean;
  /** Allow vertical drag / pane drop (desktop split). */
  splitDragEnabled?: boolean;
  /** Context-menu split (same edges as pane drop). */
  onSplitTab?: (tabId: string, edge: PaneSplitEdge) => boolean;
  paneLayout?: PaneNode | null;
  onApplyPaneLayout?: (layout: PaneNode, focusedPaneId?: string | null) => void;
  onFileTabContextMenu?: (
    tab: FileWorkspaceTab,
    point: { clientX: number; clientY: number },
  ) => void;
  isMobileLayout?: boolean;
  variant?: 'inline' | 'titlebar';
  className?: string;
};

const tabMenuContentClass = `${chatMenuContentClass} ${DESKTOP_CONTEXT_MENU_Z_CLASS}`;
const tabMenuItemClass = chatMenuItemClass;
const tabMenuDangerClass =
  'flex cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-40 data-[highlighted]:bg-red-50 dark:text-red-400 dark:data-[highlighted]:bg-red-950/40';


type IconComp = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

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
  /** Opens the adaptive tab menu (mobile long-press). Desktop uses Radix ContextMenu. */
  onOpenTabMenu?: (point: { clientX: number; clientY: number }) => void;
  mobileContextMenu: boolean;
  variant: 'inline' | 'titlebar';
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
  onOpenTabMenu,
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

  const handleMiddleClose = (e: ReactMouseEvent) => {
    if (overlay || e.button !== 1) return;
    e.preventDefault();
    e.stopPropagation();
    onClose(tab.id);
  };

  const handleContextMenu = (e: ReactMouseEvent) => {
    if (overlay) return;
    // Desktop AdaptiveContextMenu owns the native contextmenu via Radix Trigger.
    // Prevent browser default when we have a menu handler (mobile falls through to open).
    if (onOpenTabMenu && mobileContextMenu) {
      e.preventDefault();
      e.stopPropagation();
      onOpenTabMenu({ clientX: e.clientX, clientY: e.clientY });
    }
  };

  const handlePointerDown = (e: ReactPointerEvent) => {
    if (overlay || !mobileContextMenu || !onOpenTabMenu) return;
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
      onOpenTabMenu({ clientX: start?.x ?? e.clientX, clientY: start?.y ?? e.clientY });
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
  onOpenTabMenu?: (point: { clientX: number; clientY: number }) => void;
  mobileContextMenu: boolean;
  variant: 'inline' | 'titlebar';
};

function SortableWorkspaceTab({
  tab,
  active,
  saving,
  onActivate,
  onClose,
  onOpenTabMenu,
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
      {...(onOpenTabMenu ? { onOpenTabMenu } : {})}
      mobileContextMenu={mobileContextMenu}
      variant={variant}
      innerRef={setNodeRef}
      style={style}
      dragHandleProps={{ ...attributes, ...listeners }}
    />
  );
}

type TabMenuProps = {
  tab: WorkspaceTab;
  active: boolean;
  saving: boolean;
  onActivate: (id: string) => void;
  onClose: (id: string) => void;
  onFileTabContextMenu?: WorkspaceTabBarProps['onFileTabContextMenu'];
  onSplitTab?: WorkspaceTabBarProps['onSplitTab'];
  canSplitThisTab: boolean;
  mobileContextMenu: boolean;
  isMobileLayout: boolean;
  variant: 'inline' | 'titlebar';
};

function WorkspaceTabWithMenu({
  tab,
  active,
  saving,
  onActivate,
  onClose,
  onFileTabContextMenu,
  onSplitTab,
  canSplitThisTab,
  mobileContextMenu,
  isMobileLayout,
  variant,
}: TabMenuProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuPointRef = useRef<{ clientX: number; clientY: number }>({ clientX: 0, clientY: 0 });
  const title = tabDisplayTitle(tab);
  const itemClass = mobileContextMenu ? MOBILE_CONTEXT_MENU_ITEM_CLASS : tabMenuItemClass;
  const dangerClass = mobileContextMenu
    ? MOBILE_CONTEXT_MENU_DANGER_ITEM_CLASS
    : tabMenuDangerClass;

  const openMenu = useCallback((point: { clientX: number; clientY: number }) => {
    menuPointRef.current = point;
    setMenuOpen(true);
  }, []);

  const splitEdges: { edge: PaneSplitEdge; label: string }[] = [
    { edge: 'left', label: '왼쪽에 분할' },
    { edge: 'right', label: '오른쪽에 분할' },
    { edge: 'top', label: '위에 분할' },
    { edge: 'bottom', label: '아래에 분할' },
  ];

  return (
    <AdaptiveContextMenu
      open={menuOpen}
      onOpenChange={setMenuOpen}
      title={title}
      subtitle="워크스페이스 탭"
      contentClassName={tabMenuContentClass}
      isMobileLayout={isMobileLayout}
      trigger={
        <div className="flex h-full min-w-0 shrink-0 items-stretch">
          <SortableWorkspaceTab
            tab={tab}
            active={active}
            saving={saving}
            onActivate={onActivate}
            onClose={onClose}
            onOpenTabMenu={openMenu}
            mobileContextMenu={mobileContextMenu}
            variant={variant}
          />
        </div>
      }
    >
      {onSplitTab
        ? splitEdges.map(({ edge, label }) => (
            <AdaptiveMenuItem
              key={edge}
              className={itemClass}
              disabled={!canSplitThisTab}
              onSelect={() => {
                onSplitTab(tab.id, edge);
              }}
            >
              {label}
            </AdaptiveMenuItem>
          ))
        : null}
      {onSplitTab && (isFileTab(tab) && onFileTabContextMenu) ? <AdaptiveMenuSeparator /> : null}
      {isFileTab(tab) && onFileTabContextMenu ? (
        <AdaptiveMenuItem
          className={itemClass}
          onSelect={() => {
            const point = menuPointRef.current;
            // Defer so the adaptive menu closes before the tree menu opens.
            requestAnimationFrame(() => {
              onFileTabContextMenu(tab, point);
            });
          }}
        >
          파일 옵션…
        </AdaptiveMenuItem>
      ) : null}
      {(onSplitTab || (isFileTab(tab) && onFileTabContextMenu)) ? <AdaptiveMenuSeparator /> : null}
      <AdaptiveMenuItem
        className={dangerClass}
        danger
        onSelect={() => onClose(tab.id)}
      >
        탭 닫기
      </AdaptiveMenuItem>
    </AdaptiveContextMenu>
  );
}

type ActiveDragState = {
  tab: WorkspaceTab;
  size: { width: number; height: number } | null;
};

type TabGroupChromeProps = {
  children: ReactNode;
  focused: boolean;
  /** When true, hide individual tabs and show a compact chip. */
  collapsed: boolean;
  summaryLabel: string;
  tabCount: number;
  onExpand: () => void;
  isMobileLayout: boolean;
  mobileContextMenu: boolean;
  onOpenLayoutEditor: () => void;
};

function GroupJoinDroppable({ children }: { children: ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id: WORKSPACE_TAB_GROUP_ZONE_ID });
  return (
    <div
      ref={setNodeRef}
      data-tab-group-drop=""
      className={`flex h-full shrink-0 items-stretch self-stretch rounded-t-lg ${
        isOver ? 'ring-2 ring-blue-500/70 dark:ring-blue-400/60' : ''
      }`}
    >
      {children}
    </div>
  );
}

function OrphanLeaveDroppable({
  children,
  className = '',
}: {
  children?: ReactNode;
  className?: string;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: WORKSPACE_TAB_ORPHAN_ZONE_ID });
  return (
    <div
      ref={setNodeRef}
      data-tab-orphan-zone=""
      className={`flex min-w-8 min-h-0 flex-1 items-stretch gap-0.5 self-stretch rounded-t-md ${
        isOver ? 'bg-blue-500/10 ring-1 ring-inset ring-blue-500/40 dark:bg-blue-400/10' : ''
      } ${className}`.trim()}
    >
      {children}
    </div>
  );
}

function WorkspaceTabGroupChrome({
  children,
  focused,
  collapsed,
  summaryLabel,
  tabCount,
  onExpand,
  isMobileLayout,
  mobileContextMenu,
  onOpenLayoutEditor,
}: TabGroupChromeProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const itemClass = mobileContextMenu ? MOBILE_CONTEXT_MENU_ITEM_CLASS : tabMenuItemClass;
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pressStartRef = useRef<{ x: number; y: number } | null>(null);

  const clearLongPress = useCallback(() => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
    pressStartRef.current = null;
  }, []);

  const openGroupMenu = useCallback(() => {
    setMenuOpen(true);
  }, []);

  const grip = (
    <div
      data-tab-group-chrome=""
      className="flex w-2.5 shrink-0 cursor-context-menu items-stretch self-stretch rounded-sm hover:bg-blue-500/20 dark:hover:bg-blue-400/25"
      aria-label="분할 탭 그룹 메뉴"
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (mobileContextMenu) openGroupMenu();
      }}
      onPointerDown={(e) => {
        if (!mobileContextMenu) return;
        if (e.pointerType === 'mouse') return;
        if (e.button !== 0) return;
        pressStartRef.current = { x: e.clientX, y: e.clientY };
        clearLongPress();
        longPressTimerRef.current = setTimeout(() => {
          longPressTimerRef.current = null;
          vibrateLongPressAction();
          openGroupMenu();
        }, PRESSABLE_CARD_MENU_MS);
      }}
      onPointerMove={(e) => {
        if (!pressStartRef.current || !longPressTimerRef.current) return;
        const dx = e.clientX - pressStartRef.current.x;
        const dy = e.clientY - pressStartRef.current.y;
        if (dx * dx + dy * dy > 64) clearLongPress();
      }}
      onPointerUp={clearLongPress}
      onPointerCancel={clearLongPress}
    />
  );

  const shellClass = collapsed
    ? `flex h-full max-w-[9.5rem] shrink-0 items-stretch gap-0.5 self-stretch rounded-t-lg px-0.5 ${
        focused
          ? 'bg-blue-500/20 ring-1 ring-blue-500/50 dark:bg-blue-400/15 dark:ring-blue-400/45'
          : 'bg-gray-300/80 ring-1 ring-gray-400/40 dark:bg-odp-bg dark:ring-odp-borderSoft'
      }`
    : `flex h-full shrink-0 items-stretch gap-0.5 self-stretch rounded-t-lg px-1 ${
        focused
          ? 'bg-blue-500/20 ring-1 ring-blue-500/50 dark:bg-blue-400/15 dark:ring-blue-400/45'
          : 'bg-gray-300/90 ring-1 ring-gray-400/50 dark:bg-odp-bg dark:ring-odp-borderStrong'
      }`;

  return (
    <div
      role="group"
      aria-label={collapsed ? `스플릿 탭 그룹 (접힘, ${tabCount}개)` : '스플릿 탭 그룹'}
      aria-expanded={!collapsed}
      data-tab-group=""
      data-tab-group-collapsed={collapsed ? '' : undefined}
      className={shellClass}
      onContextMenu={(e) => {
        const target = e.target as HTMLElement | null;
        if (target?.closest?.('[role="tab"]')) return;
        if (target?.closest?.('[data-tab-group-chrome]')) return;
        e.preventDefault();
        e.stopPropagation();
        openGroupMenu();
      }}
    >
      <AdaptiveContextMenu
        open={menuOpen}
        onOpenChange={setMenuOpen}
        title="분할 탭 그룹"
        subtitle="레이아웃"
        contentClassName={tabMenuContentClass}
        isMobileLayout={isMobileLayout}
        trigger={grip}
      >
        <AdaptiveMenuItem
          className={itemClass}
          onSelect={() => {
            onOpenLayoutEditor();
          }}
        >
          레이아웃 조절…
        </AdaptiveMenuItem>
      </AdaptiveContextMenu>
      {collapsed ? (
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button
              type="button"
              data-tab-group-collapsed-trigger=""
              aria-label={`스플릿 탭 펼치기: ${summaryLabel}`}
              className="flex min-w-0 max-w-[8.5rem] flex-1 items-center gap-1 self-stretch rounded-md px-1.5 text-left text-[11px] font-medium text-gray-700 hover:bg-white/50 dark:text-odp-fg dark:hover:bg-odp-focusBg/60"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onExpand();
              }}
            >
              <Columns2 size={12} className="shrink-0 opacity-70" aria-hidden />
              <span className="min-w-0 flex-1 truncate">{summaryLabel}</span>
              {tabCount > 1 ? (
                <span className="shrink-0 tabular-nums text-[10px] text-gray-500 dark:text-odp-muted">
                  {tabCount}
                </span>
              ) : null}
            </button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              side="bottom"
              sideOffset={6}
              className="z-100001 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-700 shadow-md dark:border-odp-borderSoft dark:bg-odp-surface dark:text-odp-fgStrong"
            >
              스플릿 탭 {tabCount}개 · 클릭하여 펼치기
              <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      ) : (
        children
      )}
    </div>
  );
}

export default function WorkspaceTabBar({
  tabs,
  activeId,
  savingTabIds = [],
  onActivate,
  onClose,
  onReorder,
  tabGroups = null,
  onPaneDrop,
  splitDragEnabled = false,
  onSplitTab,
  paneLayout = null,
  onApplyPaneLayout,
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
  const byId = useMemo(() => new Map(tabs.map((t) => [t.id, t])), [tabs]);
  const orderedTabs = useMemo(() => {
    if (!tabGroups || tabGroups.length === 0) return tabs;
    const out: WorkspaceTab[] = [];
    const seen = new Set<string>();
    for (const g of tabGroups) {
      for (const id of g.tabIds) {
        const t = byId.get(id);
        if (t) {
          out.push(t);
          seen.add(id);
        }
      }
    }
    // Prefer layout order; append any tabs missing from groups (should be rare).
    for (const t of tabs) {
      if (!seen.has(t.id)) out.push(t);
    }
    return out.length > 0 ? out : tabs;
  }, [tabGroups, tabs, byId]);

  const sortableIds = useMemo(() => orderedTabs.map((t) => t.id), [orderedTabs]);
  const savingSet = useMemo(() => new Set(savingTabIds), [savingTabIds]);
  const mobileContextMenu = useMobileContextMenuMode(isMobileLayout);
  const [activeDrag, setActiveDrag] = useState<ActiveDragState | null>(null);
  const [tabListEl, setTabListEl] = useState<HTMLDivElement | null>(null);
  const [layoutModalOpen, setLayoutModalOpen] = useState(false);
  const showGroups = Boolean(tabGroups && tabGroups.length > 1);
  const leafCount = paneLayout ? countLeaves(paneLayout) : 1;
  const [paneSoftCap, setPaneSoftCap] = useState(() => loadWorkspacePaneSoftCap());
  useEffect(() => {
    const sync = (event: Event) => {
      const detail = (event as CustomEvent<{ softCap?: number }>).detail;
      setPaneSoftCap(detail?.softCap ?? loadWorkspacePaneSoftCap());
    };
    window.addEventListener(WORKSPACE_PANE_SOFT_CAP_CHANGED_EVENT, sync);
    return () => {
      window.removeEventListener(WORKSPACE_PANE_SOFT_CAP_CHANGED_EVENT, sync);
    };
  }, []);
  const canAddPane = splitDragEnabled && leafCount < paneSoftCap;
  const orphanTabs = useMemo(() => {
    if (!showGroups || !paneLayout) return [] as WorkspaceTab[];
    const orphanIds = new Set(listOrphanTabIds(tabs.map((t) => t.id), paneLayout));
    return orderedTabs.filter((t) => orphanIds.has(t.id));
  }, [showGroups, paneLayout, tabs, orderedTabs]);
  const groupedTabs = useMemo(() => {
    if (!showGroups || !tabGroups) return [] as WorkspaceTab[];
    const out: WorkspaceTab[] = [];
    for (const g of tabGroups) {
      for (const id of g.tabIds) {
        const t = byId.get(id);
        if (t) out.push(t);
      }
    }
    return out;
  }, [showGroups, tabGroups, byId]);

  const splitGroupFocused = Boolean(
    showGroups &&
      paneLayout &&
      typeof activeId === 'string' &&
      findLeafContainingTab(paneLayout, activeId),
  );

  const splitGroupSummary = useMemo(() => {
    if (!showGroups || !tabGroups?.length || !paneLayout) {
      return { label: '스플릿', expandId: null as string | null };
    }
    const focusedGroup = tabGroups.find((g) => g.focused) ?? tabGroups[0];
    if (!focusedGroup) return { label: '스플릿', expandId: null as string | null };
    const leaf = findLeaf(paneLayout, focusedGroup.leafId);
    const expandId =
      (leaf?.activeId && focusedGroup.tabIds.includes(leaf.activeId)
        ? leaf.activeId
        : focusedGroup.tabIds[0]) ?? null;
    const summaryTab = expandId ? byId.get(expandId) : null;
    return {
      label: summaryTab ? tabDisplayTitle(summaryTab) : '스플릿',
      expandId,
    };
  }, [showGroups, tabGroups, paneLayout, byId]);

  useHorizontalOverflowScroll(tabListEl, orderedTabs.length > 0);

  if (orderedTabs.length === 0) return null;

  const clearActiveDrag = () => {
    setActiveDrag(null);
    setWorkspaceTabDrag(null);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const tab = orderedTabs.find((t) => t.id === event.active.id);
    if (!tab) return;
    const initial = event.active.rect.current.initial;
    setActiveDrag({
      tab,
      size: initial ? { width: initial.width, height: initial.height } : null,
    });
    const rect = event.active.rect.current.initial;
    setWorkspaceTabDrag({
      tabId: tab.id,
      clientX: rect ? rect.left + rect.width / 2 : 0,
      clientY: rect ? rect.top + rect.height / 2 : 0,
    });
  };

  const handleDragMove = (event: DragMoveEvent) => {
    const translated = event.active.rect.current.translated;
    if (translated) {
      updateWorkspaceTabDragPoint(
        translated.left + translated.width / 2,
        translated.top + translated.height / 2,
      );
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const from = String(active.id);
    const translated = event.active.rect.current.translated;
    const cx = translated ? translated.left + translated.width / 2 : 0;
    const cy = translated ? translated.top + translated.height / 2 : 0;
    clearActiveDrag();

    if (splitDragEnabled && onPaneDrop) {
      const hit = hitTestPaneDropAt(cx, cy);
      if (
        hit &&
        (hit.zone === 'left' ||
          hit.zone === 'right' ||
          hit.zone === 'top' ||
          hit.zone === 'bottom' ||
          hit.zone === 'center')
      ) {
        if (onPaneDrop(from, hit.leafId, hit.zone)) return;
      }
    }

    if (!over) return;
    const to = String(over.id);
    if (from === to) return;
    onReorder(from, to);
  };

  const handleDragCancel = (_event: DragCancelEvent) => {
    clearActiveDrag();
  };

  const titlebarTabListClass = showGroups
    ? 'workspace-tab-bar__tablist flex h-full min-w-0 flex-1 items-stretch gap-2 overflow-x-auto overflow-y-hidden px-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
    : 'workspace-tab-bar__tablist flex h-full min-w-0 flex-1 items-stretch gap-0.5 overflow-x-auto overflow-y-hidden px-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden';

  const listClass =
    variant === 'titlebar'
      ? titlebarTabListClass
      : showGroups
        ? `flex h-9 shrink-0 items-stretch gap-2 overflow-x-auto border-b border-gray-200 bg-gray-100 px-1.5 dark:border-odp-borderSoft dark:bg-odp-bg ${className}`.trim()
        : `flex h-9 shrink-0 items-stretch gap-0.5 overflow-x-auto border-b border-gray-200 bg-gray-50 px-1 dark:border-odp-borderSoft dark:bg-odp-bgSoft ${className}`.trim();

  const overlayStyle: CSSProperties | undefined = activeDrag?.size
    ? {
        width: activeDrag.size.width,
        height: activeDrag.size.height,
        boxSizing: 'border-box',
      }
    : undefined;

  const canSplitTab = (tabId: string): boolean => {
    if (!canAddPane || !onSplitTab || !paneLayout) return false;
    const host = findLeafContainingTab(paneLayout, tabId);
    return Boolean(host && host.tabIds.length > 1);
  };

  // Collapse the split strip when focus is outside it (orphan / other); expand while dragging.
  const splitGroupCollapsed = showGroups && !splitGroupFocused && !activeDrag;

  const expandSplitGroup = () => {
    if (splitGroupSummary.expandId) onActivate(splitGroupSummary.expandId);
  };

  const renderTab = (tab: WorkspaceTab) => (
    <WorkspaceTabWithMenu
      key={tab.id}
      tab={tab}
      active={tab.id === activeId}
      saving={savingSet.has(tab.id)}
      onActivate={onActivate}
      onClose={onClose}
      {...(onFileTabContextMenu ? { onFileTabContextMenu } : {})}
      {...(onSplitTab ? { onSplitTab } : {})}
      canSplitThisTab={canSplitTab(tab.id)}
      mobileContextMenu={mobileContextMenu}
      isMobileLayout={isMobileLayout}
      variant={variant}
    />
  );

  const tabListBody = showGroups && tabGroups ? (
    <>
      {paneLayout && onApplyPaneLayout ? (
        <GroupJoinDroppable>
          <WorkspaceTabGroupChrome
            focused={splitGroupFocused}
            collapsed={splitGroupCollapsed}
            summaryLabel={splitGroupSummary.label}
            tabCount={groupedTabs.length}
            onExpand={expandSplitGroup}
            isMobileLayout={isMobileLayout}
            mobileContextMenu={mobileContextMenu}
            onOpenLayoutEditor={() => setLayoutModalOpen(true)}
          >
            {groupedTabs.map(renderTab)}
          </WorkspaceTabGroupChrome>
        </GroupJoinDroppable>
      ) : (
        <GroupJoinDroppable>
          <div
            role="group"
            aria-label={
              splitGroupCollapsed
                ? `스플릿 탭 그룹 (접힘, ${groupedTabs.length}개)`
                : '스플릿 탭 그룹'
            }
            aria-expanded={!splitGroupCollapsed}
            data-tab-group=""
            data-tab-group-collapsed={splitGroupCollapsed ? '' : undefined}
            className={
              splitGroupCollapsed
                ? `flex h-full max-w-[9.5rem] shrink-0 items-stretch self-stretch rounded-t-lg px-0.5 ${
                    splitGroupFocused
                      ? 'bg-blue-500/20 ring-1 ring-blue-500/50 dark:bg-blue-400/15 dark:ring-blue-400/45'
                      : 'bg-gray-300/80 ring-1 ring-gray-400/40 dark:bg-odp-bg dark:ring-odp-borderSoft'
                  }`
                : `flex h-full shrink-0 items-stretch gap-0.5 self-stretch rounded-t-lg px-1 ${
                    splitGroupFocused
                      ? 'bg-blue-500/20 ring-1 ring-blue-500/50 dark:bg-blue-400/15 dark:ring-blue-400/45'
                      : 'bg-gray-300/90 ring-1 ring-gray-400/50 dark:bg-odp-bg dark:ring-odp-borderStrong'
                  }`
            }
          >
            {splitGroupCollapsed ? (
              <button
                type="button"
                data-tab-group-collapsed-trigger=""
                aria-label={`스플릿 탭 펼치기: ${splitGroupSummary.label}`}
                className="flex min-w-0 max-w-[8.5rem] flex-1 items-center gap-1 self-stretch rounded-md px-1.5 text-left text-[11px] font-medium text-gray-700 hover:bg-white/50 dark:text-odp-fg dark:hover:bg-odp-focusBg/60"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  expandSplitGroup();
                }}
              >
                <Columns2 size={12} className="shrink-0 opacity-70" aria-hidden />
                <span className="min-w-0 flex-1 truncate">{splitGroupSummary.label}</span>
                {groupedTabs.length > 1 ? (
                  <span className="shrink-0 tabular-nums text-[10px] text-gray-500 dark:text-odp-muted">
                    {groupedTabs.length}
                  </span>
                ) : null}
              </button>
            ) : (
              groupedTabs.map(renderTab)
            )}
          </div>
        </GroupJoinDroppable>
      )}
      <OrphanLeaveDroppable className="items-stretch">
        {orphanTabs.map(renderTab)}
        {variant === 'titlebar' ? (
          <div data-tauri-drag-region className="min-w-8 flex-1 shrink-0 self-stretch" />
        ) : (
          <div className="min-w-4 flex-1 shrink-0 self-stretch" aria-hidden />
        )}
      </OrphanLeaveDroppable>
    </>
  ) : (
    <>
      {orderedTabs.map(renderTab)}
      {variant === 'titlebar' ? (
        <div data-tauri-drag-region className="min-w-8 flex-1 shrink-0 self-stretch" />
      ) : null}
    </>
  );

  const tabStrip = (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={splitDragEnabled ? [] : [restrictToHorizontalAxis]}
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
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
          {tabListBody}
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
      {paneLayout && onApplyPaneLayout ? (
        <WorkspacePaneLayoutModal
          open={layoutModalOpen}
          onClose={() => setLayoutModalOpen(false)}
          layout={paneLayout}
          tabs={tabs}
          onApply={onApplyPaneLayout}
        />
      ) : null}
    </Tooltip.Provider>
  );
}
