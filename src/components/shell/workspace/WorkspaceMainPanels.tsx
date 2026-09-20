import { Suspense, lazy, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { Tooltip } from 'radix-ui';
import EditorPane from '@/components/EditorPane';
import SettingsVaultDropHost from '@/components/shell/SettingsVaultDropHost';
import WorkspaceTabBar, { type WorkspaceTabGroup } from '@/components/workspace/WorkspaceTabBar';
import WorkspaceTabHost from '@/components/workspace/WorkspaceTabHost';
import WorkspaceSplitLayout from '@/components/shell/workspace/WorkspaceSplitLayout';
import WorkspacePaneDropOverlay from '@/components/shell/workspace/WorkspacePaneDropOverlay';
import WorkspacePanePlaceholder, {
  WorkspacePaneContentReveal,
} from '@/components/shell/workspace/WorkspacePanePlaceholder';
import WorkspacePaneCompactHost from '@/components/shell/workspace/WorkspacePaneCompactHost';
import { PANE_SPLIT_ROOT_ATTR } from '@/utils/workspaceTabs/paneBoundarySnap';
import {
  CHAT_TAB_ID,
  CONTENT_SEARCH_TAB_ID,
  SETTINGS_TAB_ID,
  collectLeaves,
  countLeaves,
  findLeaf,
  findLeafContainingTab,
  isFileTab,
  isPaneLeaf,
  tabDisplayTitle,
  type FileWorkspaceTab,
  type PaneNode,
  type PaneSplitEdge,
  type WorkspaceTab,
} from '@/utils/workspaceTabs';
import {
  getPaneDropOverlayHit,
  getWorkspaceTabDrag,
  hitTestPaneDropAt,
  setPaneDropOverlayHit,
  setWorkspaceTabDrag,
  subscribeWorkspaceTabDrag,
  updateWorkspaceTabDragPoint,
} from '@/utils/workspaceTabs/workspaceTabDragBridge';
import { PANE_LEAF_ATTR } from '@/utils/workspaceTabs/paneDropGeometry';
import { relocateLeaf } from '@/utils/workspaceTabs/paneLayoutEdit';
import { lockPaneDragSelection } from '@/utils/workspaceTabs/paneDragSelectLock';
import { useHistoryOverlayBack } from '@/hooks/useHistoryOverlayBack';
import type { ExportPdfDocumentFile } from '@/pages/exportPdf/exportPdfTypes';
import { consumePendingPrintReturnState } from '@/utils/printNavigationState';

const PANE_HEADER_DRAG_SLOP_PX = 8;

const ChatWithMyselfPane = lazy(() => import('@/components/chatWithMyself/ChatWithMyselfPane'));
const SettingsPage = lazy(() => import('@/pages/SettingsPage'));
const ContentSearchPage = lazy(() => import('@/pages/ContentSearchPage'));
const ExportPDFPage = lazy(() => import('@/pages/exportPdf/ExportPDFPage'));

function RouteSuspenseFallback() {
  return <WorkspacePanePlaceholder label="로딩 중" />;
}

type Mirrors = {
  currentFile: Record<string, unknown> | null;
  editorContent: string;
  editedFileName: string;
  setEditedFileName?: (name: string) => void;
  onChangeEditor?: (value: string) => void;
  onInactiveEditorChange?: (tabId: string, value: string) => void;
  onInactiveEditedFileName?: (tabId: string, name: string) => void;
};

export type WorkspaceMainPanelsProps = {
  tabs: WorkspaceTab[];
  activeId: string | null;
  savingTabIds?: string[];
  onActivateTab: (id: string) => void;
  onCloseTab: (id: string) => void;
  onReorderTabs: (activeId: string, overId: string) => void;
  onFileTabContextMenu?: (
    tab: FileWorkspaceTab,
    point: { clientX: number; clientY: number },
  ) => void;
  isMobileLayout?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  editorPaneProps: (...args: any[]) => any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chatPaneProps?: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contentSearchPaneProps?: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  settingsPaneProps?: Record<string, any>;
  mirrors?: Mirrors;
  tabsEnabled?: boolean;
  isChatRoute?: boolean;
  isSettingsRoute?: boolean;
  isContentSearchRoute?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vaultDropProps?: Record<string, any>;
  tabBarPlacement?: 'inline' | 'titlebar';
  layout?: PaneNode | null;
  focusedPaneId?: string | null;
  splitDragEnabled?: boolean;
  onFocusPane?: (leafId: string) => void;
  onResizeSplit?: (
    splitId: string,
    ratio: number,
    opts?: { linkAligned?: boolean },
  ) => void;
  /** After sash drag with Alt; may transpose aligned 2×2 into a spanning outer sash. */
  onResizeSplitEnd?: (
    splitId: string,
    snapped: boolean,
    opts?: { linkAligned?: boolean },
  ) => void;
  onPaneDrop?: (
    tabId: string,
    leafId: string,
    zone: PaneSplitEdge | 'center',
    opts?: { centerBehavior?: 'swap' | 'join'; workspaceEdge?: boolean },
  ) => boolean;
  onSplitTab?: (tabId: string, edge: PaneSplitEdge) => boolean;
  onApplyPaneLayout?: (layout: PaneNode, focusedPaneId?: string | null) => void;
  onCollapsePane?: (leafId: string) => void;
  onClearExportPdf?: (leafId: string) => void;
};

function LeafExportPdfBack({
  leafId,
  open,
  onClose,
  onApplyPendingReturn,
}: {
  leafId: string;
  open: boolean;
  onClose: () => void;
  /** After history-back unmount, apply ExportPDF handoff into the note tab. */
  onApplyPendingReturn?: () => void;
}) {
  useHistoryOverlayBack(
    open,
    () => {
      onClose();
      // ExportPDFPage unmount writes pending print return in layout cleanup.
      queueMicrotask(() => {
        onApplyPendingReturn?.();
      });
    },
    open,
    `export-pdf-${leafId}`,
  );
  return null;
}

function applyExportPdfHandoffToTab({
  tab,
  activeId,
  mirrors,
}: {
  tab: WorkspaceTab | null | undefined;
  activeId: string | null;
  mirrors?: Mirrors;
}) {
  if (!tab || !isFileTab(tab)) return;
  const pending = consumePendingPrintReturnState();
  if (!pending) return;
  const nextContent =
    typeof pending.editorContent === 'string' ? pending.editorContent : '';
  if (tab.id === activeId && mirrors?.onChangeEditor) {
    mirrors.onChangeEditor(nextContent);
  } else {
    mirrors?.onInactiveEditorChange?.(tab.id, nextContent);
  }
}

function resolveDropHighlight(
  clientX: number,
  clientY: number,
): { leafId: string; zone: PaneSplitEdge | 'center'; workspaceEdge: boolean } | null {
  return hitTestPaneDropAt(clientX, clientY);
}

/**
 * Unified workspace: single tab strip (with leaf groups) + split content layout.
 */
export default function WorkspaceMainPanels({
  tabs,
  activeId,
  savingTabIds = [],
  onActivateTab,
  onCloseTab,
  onReorderTabs,
  onFileTabContextMenu,
  isMobileLayout = false,
  editorPaneProps,
  chatPaneProps = {},
  contentSearchPaneProps = {},
  settingsPaneProps = {},
  mirrors,
  tabsEnabled = true,
  isChatRoute = false,
  isSettingsRoute = false,
  isContentSearchRoute = false,
  vaultDropProps = {},
  tabBarPlacement = 'inline',
  layout = null,
  focusedPaneId = null,
  splitDragEnabled = false,
  onFocusPane,
  onResizeSplit,
  onResizeSplitEnd,
  onPaneDrop,
  onSplitTab,
  onApplyPaneLayout,
  onCollapsePane,
  onClearExportPdf,
}: WorkspaceMainPanelsProps) {
  const fileTabs = tabs.filter(isFileTab);
  const hasChatTab = tabs.some((t) => t.kind === 'chat');
  const hasSettingsTab = tabs.some((t) => t.kind === 'settings');
  const hasContentSearchTab = tabs.some((t) => t.kind === 'content-search');

  const leaves = useMemo(() => (layout ? collectLeaves(layout) : []), [layout]);
  const isSplit = layout != null && countLeaves(layout) > 1;
  const activeIsOrphan =
    Boolean(
      isSplit &&
        layout &&
        typeof activeId === 'string' &&
        !findLeafContainingTab(layout, activeId),
    );
  /** Keep the split tree mounted even while an orphan tab is full-window (hide only). */
  const splitLayoutMounted = Boolean(layout && isSplit && onResizeSplit);
  const singleLeafId = leaves[0]?.id ?? (layout && isPaneLeaf(layout) ? layout.id : null);

  const tabGroups: WorkspaceTabGroup[] | null = useMemo(() => {
    if (!isSplit || leaves.length <= 1) return null;
    return leaves.map((leaf) => ({
      leafId: leaf.id,
      tabIds: leaf.tabIds,
      focused: leaf.id === focusedPaneId,
    }));
  }, [isSplit, leaves, focusedPaneId]);

  const [draggingTab, setDraggingTab] = useState(false);
  const [draggingPaneLeafId, setDraggingPaneLeafId] = useState<string | null>(null);
  const [dropHighlight, setDropHighlight] = useState<{
    leafId: string;
    zone: PaneSplitEdge | 'center';
    workspaceEdge: boolean;
  } | null>(null);
  const dropHighlightRef = useRef(dropHighlight);
  dropHighlightRef.current = dropHighlight;

  const publishDropHighlight = useCallback(
    (next: { leafId: string; zone: PaneSplitEdge | 'center'; workspaceEdge: boolean } | null) => {
      setDropHighlight((prev) =>
        prev?.leafId === next?.leafId &&
        prev?.zone === next?.zone &&
        prev?.workspaceEdge === next?.workspaceEdge
          ? prev
          : next,
      );
      setPaneDropOverlayHit(next);
    },
    [],
  );
  /** Leaf ids that just appeared via split — amber border flash (~2s). */
  const [freshPaneIds, setFreshPaneIds] = useState<ReadonlySet<string>>(() => new Set());
  /** Leaves that still show a body placeholder until content mounts. */
  const [pendingPlaceholderLeafIds, setPendingPlaceholderLeafIds] = useState<ReadonlySet<string>>(
    () => new Set(),
  );
  const prevLeafIdsRef = useRef<Set<string> | null>(null);
  const freshPaneTimersRef = useRef(new Map<string, number>());

  const clearPlaceholderLeaf = useCallback((leafId: string) => {
    setPendingPlaceholderLeafIds((cur) => {
      if (!cur.has(leafId)) return cur;
      const next = new Set(cur);
      next.delete(leafId);
      return next;
    });
  }, []);

  const nextLeafIdSet = useMemo(() => new Set(leaves.map((leaf) => leaf.id)), [leaves]);

  // Adjust pending ids during render (before paint) so the new leaf's first
  // paint already uses the placeholder path — including the first 1→2 split.
  const prevLeafIds = prevLeafIdsRef.current;
  if (prevLeafIds) {
    const added: string[] = [];
    for (const id of nextLeafIdSet) {
      if (!prevLeafIds.has(id)) added.push(id);
    }
    if (isSplit && added.length > 0) {
      let missing = false;
      for (const id of added) {
        if (!pendingPlaceholderLeafIds.has(id)) {
          missing = true;
          break;
        }
      }
      if (missing) {
        setPendingPlaceholderLeafIds((cur) => {
          const merged = new Set(cur);
          for (const id of added) merged.add(id);
          return merged;
        });
        setFreshPaneIds((cur) => {
          const merged = new Set(cur);
          for (const id of added) merged.add(id);
          return merged;
        });
      }
    }
  }

  useLayoutEffect(() => {
    prevLeafIdsRef.current = nextLeafIdSet;
    if (!isSplit) {
      setPendingPlaceholderLeafIds((cur) => (cur.size === 0 ? cur : new Set()));
      setFreshPaneIds((cur) => (cur.size === 0 ? cur : new Set()));
      return;
    }
    setPendingPlaceholderLeafIds((cur) => {
      const next = new Set([...cur].filter((id) => nextLeafIdSet.has(id)));
      return next.size === cur.size ? cur : next;
    });
    setFreshPaneIds((cur) => {
      const next = new Set([...cur].filter((id) => nextLeafIdSet.has(id)));
      return next.size === cur.size ? cur : next;
    });
  }, [nextLeafIdSet, isSplit]);

  useEffect(() => {
    if (!isSplit) {
      if (freshPaneTimersRef.current.size > 0) {
        for (const timer of freshPaneTimersRef.current.values()) {
          window.clearTimeout(timer);
        }
        freshPaneTimersRef.current.clear();
      }
      return;
    }
    for (const id of freshPaneIds) {
      if (freshPaneTimersRef.current.has(id)) continue;
      const timer = window.setTimeout(() => {
        freshPaneTimersRef.current.delete(id);
        setFreshPaneIds((cur) => {
          if (!cur.has(id)) return cur;
          const next = new Set(cur);
          next.delete(id);
          return next;
        });
      }, 2000);
      freshPaneTimersRef.current.set(id, timer);
    }
  }, [freshPaneIds, isSplit]);

  useEffect(
    () => () => {
      for (const timer of freshPaneTimersRef.current.values()) {
        window.clearTimeout(timer);
      }
      freshPaneTimersRef.current.clear();
    },
    [],
  );

  useEffect(() => {
    if (!splitDragEnabled) return undefined;
    return subscribeWorkspaceTabDrag((snap) => {
      setDraggingTab(Boolean(snap));
      setDraggingPaneLeafId(snap?.paneLeafId ?? null);
      if (!snap) {
        publishDropHighlight(null);
        return;
      }
      const next = resolveDropHighlight(snap.clientX, snap.clientY);
      publishDropHighlight(next);
    });
  }, [publishDropHighlight, splitDragEnabled]);

  useEffect(() => {
    if (!draggingTab || !splitDragEnabled) return undefined;
    const onMove = (e: PointerEvent) => {
      if (!getWorkspaceTabDrag()) return;
      // Keep bridge point on the real pointer so overlay and commit stay aligned.
      updateWorkspaceTabDragPoint(e.clientX, e.clientY);
      const next = resolveDropHighlight(e.clientX, e.clientY);
      publishDropHighlight(next);
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, [draggingTab, publishDropHighlight, splitDragEnabled]);

  const chatActive = tabsEnabled ? activeId === CHAT_TAB_ID : isChatRoute;
  const settingsActive = tabsEnabled ? activeId === SETTINGS_TAB_ID : isSettingsRoute;
  const contentSearchActive = tabsEnabled
    ? activeId === CONTENT_SEARCH_TAB_ID
    : isContentSearchRoute;
  const showChat = tabsEnabled ? hasChatTab : isChatRoute;
  const showSettings = tabsEnabled ? hasSettingsTab : isSettingsRoute;
  const showContentSearch = tabsEnabled ? hasContentSearchTab : isContentSearchRoute;
  const showEmpty = tabsEnabled
    ? tabs.length === 0 || activeId == null
    : !isChatRoute &&
      !isSettingsRoute &&
      !isContentSearchRoute &&
      !mirrors?.currentFile &&
      fileTabs.length === 0;

  const renderTabContent = (
    tab: WorkspaceTab,
    active: boolean,
    opts?: {
      noteSurface?: 'edit' | 'quiz';
      exportPdf?: boolean;
      onExportPdfClose?: (result?: {
        editorContent: string;
        currentFile: ExportPdfDocumentFile;
      }) => void;
      /** Pane-local compact layout (window mobile OR narrow split pane). */
      contentIsMobileLayout?: boolean;
      /**
       * Focused / interactive surface. Visible unfocused split panes stay mounted
       * but pause editor/preview work. Defaults to `active`.
       */
      isSurfaceLive?: boolean;
    },
  ): ReactNode => {
    const contentIsMobileLayout = opts?.contentIsMobileLayout ?? isMobileLayout;
    const isSurfaceLive = opts?.isSurfaceLive ?? active;

    if (tab.kind === 'chat') {
      return (
        <Suspense fallback={<RouteSuspenseFallback />}>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <ChatWithMyselfPane
            {...(chatPaneProps as any)}
            isMobileLayout={contentIsMobileLayout}
            isActive={active && isSurfaceLive}
          />
        </Suspense>
      );
    }
    if (tab.kind === 'settings') {
      return (
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        <SettingsVaultDropHost enabled={active && isSurfaceLive} {...(vaultDropProps as any)}>
          <Suspense fallback={<RouteSuspenseFallback />}>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <SettingsPage
              {...(settingsPaneProps as any)}
              isMobileLayout={contentIsMobileLayout}
            />
          </Suspense>
        </SettingsVaultDropHost>
      );
    }
    if (tab.kind === 'content-search') {
      return (
        <Suspense fallback={<RouteSuspenseFallback />}>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <ContentSearchPage
            {...(contentSearchPaneProps as any)}
            isActive={active && isSurfaceLive}
          />
        </Suspense>
      );
    }

    if (opts?.exportPdf && isFileTab(tab)) {
      return (
        <Suspense fallback={<RouteSuspenseFallback />}>
          <ExportPDFPage
            documentValue={tab.editorContent}
            documentFile={tab.currentFile as never}
            hasNavigationSession
            {...(opts.onExportPdfClose ? { onRequestClose: opts.onExportPdfClose } : {})}
          />
        </Suspense>
      );
    }

    const useMirrors =
      active &&
      tab.id === activeId &&
      mirrors?.currentFile &&
      mirrors.currentFile.type === tab.storageType &&
      mirrors.currentFile.id === tab.path;
    const paneFile = useMirrors ? mirrors!.currentFile : tab.currentFile;
    const paneContent = useMirrors ? mirrors!.editorContent : tab.editorContent;
    const paneName = useMirrors ? mirrors!.editedFileName : tab.editedFileName;
    const noteSurface = opts?.noteSurface ?? tab.noteSurface;

    return (
      <EditorPane
        {...editorPaneProps({
          currentFile: paneFile,
          editorContent: paneContent,
          editedFileName: paneName,
          ...(useMirrors
            ? {
                setEditedFileName: mirrors!.setEditedFileName,
                onChangeEditor: mirrors!.onChangeEditor,
              }
            : {
                setEditedFileName: (name: string) =>
                  mirrors?.onInactiveEditedFileName?.(tab.id, name),
                onChangeEditor: (value: string) =>
                  mirrors?.onInactiveEditorChange?.(tab.id, value),
              }),
          isActiveFile: active,
          ...(noteSurface ? { noteSurface } : {}),
          forceQuizMode: noteSurface === 'quiz',
        })}
        isMobileLayout={contentIsMobileLayout}
        isSurfaceLive={isSurfaceLive}
      />
    );
  };

  if (!tabsEnabled) {
    return (
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <WorkspaceTabHost>
          {isSettingsRoute ? (
            <div className="absolute inset-0 flex min-h-0 min-w-0 flex-col overflow-hidden">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <SettingsVaultDropHost enabled {...(vaultDropProps as any)}>
                <Suspense fallback={<RouteSuspenseFallback />}>
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  <SettingsPage {...(settingsPaneProps as any)} />
                </Suspense>
              </SettingsVaultDropHost>
            </div>
          ) : isChatRoute ? (
            <div className="absolute inset-0 flex min-h-0 min-w-0 flex-col overflow-hidden">
              <Suspense fallback={<RouteSuspenseFallback />}>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <ChatWithMyselfPane {...(chatPaneProps as any)} isActive />
              </Suspense>
            </div>
          ) : isContentSearchRoute ? (
            <div className="absolute inset-0 flex min-h-0 min-w-0 flex-col overflow-hidden">
              <Suspense fallback={<RouteSuspenseFallback />}>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <ContentSearchPage {...(contentSearchPaneProps as any)} isActive />
              </Suspense>
            </div>
          ) : (
            <div className="absolute inset-0 flex min-h-0 min-w-0 flex-col overflow-hidden">
              <EditorPane
                {...editorPaneProps({
                  currentFile: mirrors?.currentFile ?? null,
                  editorContent: mirrors?.editorContent ?? '',
                  editedFileName: mirrors?.editedFileName ?? '',
                  ...(mirrors?.setEditedFileName
                    ? { setEditedFileName: mirrors.setEditedFileName }
                    : {}),
                  ...(mirrors?.onChangeEditor
                    ? { onChangeEditor: mirrors.onChangeEditor }
                    : {}),
                  isActiveFile: true,
                })}
              />
            </div>
          )}
        </WorkspaceTabHost>
      </div>
    );
  }

  const tabBar = (
    <WorkspaceTabBar
      tabs={tabs}
      activeId={activeId}
      savingTabIds={savingTabIds}
      onActivate={onActivateTab}
      onClose={onCloseTab}
      onReorder={onReorderTabs}
      tabGroups={tabGroups}
      splitDragEnabled={splitDragEnabled && !isMobileLayout}
      {...(onPaneDrop ? { onPaneDrop } : {})}
      {...(onSplitTab ? { onSplitTab } : {})}
      paneLayout={layout}
      {...(onApplyPaneLayout ? { onApplyPaneLayout } : {})}
      {...(onFileTabContextMenu ? { onFileTabContextMenu } : {})}
      isMobileLayout={isMobileLayout}
    />
  );

  const handlePaneHeaderPointerDown = (
    leafId: string,
    e: ReactPointerEvent<HTMLDivElement>,
  ) => {
    if (!splitDragEnabled || isMobileLayout || !onApplyPaneLayout || !layout) return;
    if (e.button !== 0) return;
    const target = e.target;
    if (target instanceof Element && target.closest('[data-pane-dismiss]')) return;

    onFocusPane?.(leafId);

    const startX = e.clientX;
    const startY = e.clientY;
    let started = false;
    const sourceLeafId = leafId;
    const layoutAtStart = layout;
    let unlockSelection: (() => void) | null = null;

    const finish = (clientX: number, clientY: number) => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onCancel);
      unlockSelection?.();
      unlockSelection = null;
      const snap = getWorkspaceTabDrag();
      // Prefer the overlay hit the user last saw (before tearing down the drag).
      const hit =
        getPaneDropOverlayHit() ??
        dropHighlightRef.current ??
        resolveDropHighlight(clientX, clientY);
      setWorkspaceTabDrag(null);
      if (!started || !snap?.paneLeafId) return;
      if (!hit) return;
      if (!hit.workspaceEdge && hit.leafId === sourceLeafId) return;
      if (
        hit.zone !== 'left' &&
        hit.zone !== 'right' &&
        hit.zone !== 'top' &&
        hit.zone !== 'bottom' &&
        hit.zone !== 'center'
      ) {
        return;
      }
      const next = relocateLeaf(
        layoutAtStart,
        sourceLeafId,
        hit.leafId || sourceLeafId,
        hit.zone,
        hit.workspaceEdge ? { workspaceEdge: true } : undefined,
      );
      if (!next) return;
      onApplyPaneLayout(next.layout, next.focusedPaneId);
    };

    const onMove = (ev: PointerEvent) => {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      if (!started) {
        if (Math.hypot(dx, dy) < PANE_HEADER_DRAG_SLOP_PX) return;
        started = true;
        unlockSelection = lockPaneDragSelection();
        setWorkspaceTabDrag({
          tabId: '',
          paneLeafId: sourceLeafId,
          clientX: ev.clientX,
          clientY: ev.clientY,
        });
        return;
      }
      try {
        window.getSelection()?.removeAllRanges();
      } catch {
        // ignore
      }
      updateWorkspaceTabDragPoint(ev.clientX, ev.clientY);
    };

    const onUp = (ev: PointerEvent) => {
      finish(ev.clientX, ev.clientY);
    };

    const onCancel = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onCancel);
      unlockSelection?.();
      unlockSelection = null;
      setWorkspaceTabDrag(null);
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onCancel);
  };

  const renderLeafContent = (leafId: string) => {
    const leaf = layout ? findLeaf(layout, leafId) : null;
    if (!leaf) return null;
    const leafActiveId = leaf.activeId;
    const exportPdfForTabId = leaf.exportPdfForTabId ?? null;
    const focused = leafId === focusedPaneId;
    const leafActiveTab =
      (leafActiveId && tabs.find((t) => t.id === leafActiveId)) ||
      (leaf.tabIds[0] ? tabs.find((t) => t.id === leaf.tabIds[0]) : null) ||
      null;
    const paneTitle = leafActiveTab ? tabDisplayTitle(leafActiveTab) : '빈 페인';
    const headerDragEnabled =
      Boolean(onApplyPaneLayout) && splitDragEnabled && !isMobileLayout && isSplit;

    return (
      <WorkspacePaneCompactHost
        key={leafId}
        shellIsMobile={isMobileLayout}
        {...{ [PANE_LEAF_ATTR]: leafId }}
        className={`relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-t-lg bg-white dark:bg-odp-surface ${
          focused
            ? 'ring-2 ring-inset ring-blue-500/45 dark:ring-blue-400/40'
            : ''
        } ${freshPaneIds.has(leafId) ? 'workspace-pane-appear-glow' : ''}`}
        onPointerDownCapture={() => onFocusPane?.(leafId)}
      >
        {(contentIsMobileLayout) => (
          <>
            {onCollapsePane && isSplit ? (
              <div
                data-pane-chrome={leafId}
                className={`flex h-8 shrink-0 items-center gap-1 border-b border-gray-200 bg-gray-50 px-1.5 dark:border-odp-borderSoft dark:bg-odp-bgSoft ${
                  headerDragEnabled
                    ? 'cursor-grab touch-none active:cursor-grabbing select-none'
                    : ''
                } ${draggingPaneLeafId === leafId ? 'opacity-60' : ''}`}
                onPointerDown={(e) => {
                  if (!headerDragEnabled) return;
                  handlePaneHeaderPointerDown(leafId, e);
                }}
              >
                <p className="min-w-0 flex-1 truncate px-1 text-xs font-medium text-gray-700 dark:text-odp-fg">
                  {paneTitle}
                </p>
                <Tooltip.Provider delayDuration={250} skipDelayDuration={0}>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <button
                        type="button"
                        aria-label="분할 끄기"
                        data-pane-dismiss={leafId}
                        className="inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-200/80 hover:text-gray-800 dark:text-odp-muted dark:hover:bg-odp-focusBg dark:hover:text-odp-fgStrong"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          onCollapsePane(leafId);
                        }}
                        onPointerDown={(e) => e.stopPropagation()}
                      >
                        <X size={15} strokeWidth={2} aria-hidden />
                      </button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content
                        side="bottom"
                        sideOffset={6}
                        className="z-100001 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-700 shadow-md dark:border-odp-borderSoft dark:bg-odp-surface dark:text-odp-fgStrong"
                      >
                        분할 끄기
                        <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.Provider>
              </div>
            ) : null}
            {exportPdfForTabId ? (
              <LeafExportPdfBack
                leafId={leafId}
                open
                onClose={() => onClearExportPdf?.(leafId)}
                onApplyPendingReturn={() => {
                  const exportTab = tabs.find((t) => t.id === exportPdfForTabId);
                  applyExportPdfHandoffToTab({
                    tab: exportTab,
                    activeId,
                    ...(mirrors ? { mirrors } : {}),
                  });
                }}
              />
            ) : null}
            <div className="relative min-h-0 min-w-0 flex-1 overflow-hidden">
              <WorkspacePaneContentReveal
                key={leafId}
                pending={pendingPlaceholderLeafIds.has(leafId)}
                onReady={() => clearPlaceholderLeaf(leafId)}
              >
                <Suspense fallback={<WorkspacePanePlaceholder variant="body" />}>
                  {(() => {
                    if (!leafActiveId) {
                      return (
                        <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-400 dark:text-odp-muted">
                          빈 페인
                        </div>
                      );
                    }
                    const tab = tabs.find((t) => t.id === leafActiveId);
                    if (!tab) {
                      return (
                        <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-400 dark:text-odp-muted">
                          빈 페인
                        </div>
                      );
                    }
                    const showExport = Boolean(
                      exportPdfForTabId && exportPdfForTabId === leafActiveId,
                    );
                    const handleExportClose = (result?: {
                      editorContent: string;
                      currentFile: ExportPdfDocumentFile;
                    }) => {
                      if (result && isFileTab(tab)) {
                        const nextContent =
                          typeof result.editorContent === 'string' ? result.editorContent : '';
                        if (tab.id === activeId && mirrors?.onChangeEditor) {
                          mirrors.onChangeEditor(nextContent);
                        } else {
                          mirrors?.onInactiveEditorChange?.(tab.id, nextContent);
                        }
                      }
                      onClearExportPdf?.(leafId);
                    };

                    // Mount only the leaf's active tab (invisible tabs unmount).
                    // Visible but unfocused panes stay mounted with isSurfaceLive=false.
                    // Include file path so remount clears CM/undo when the leaf
                    // active tab identity would otherwise reuse the wrong body.
                    const fileKey =
                      isFileTab(tab) ? `${tab.storageType}:${tab.path}` : tab.id;
                    return (
                      <div
                        key={`${leafId}:${fileKey}`}
                        className="absolute inset-0 flex min-h-0 min-w-0 flex-col overflow-hidden"
                      >
                        {renderTabContent(tab, true, {
                          ...(isFileTab(tab) && tab.noteSurface
                            ? { noteSurface: tab.noteSurface }
                            : {}),
                          exportPdf: showExport,
                          ...(showExport ? { onExportPdfClose: handleExportClose } : {}),
                          contentIsMobileLayout,
                          // Orphan full-window view keeps the split tree mounted but hidden — pause it.
                          isSurfaceLive: focused && !activeIsOrphan,
                        })}
                      </div>
                    );
                  })()}
                </Suspense>
              </WorkspacePaneContentReveal>
            </div>
          </>
        )}
      </WorkspacePaneCompactHost>
    );
  };

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
      {tabBarPlacement === 'inline' ? tabBar : null}
      <div className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        {splitLayoutMounted && layout && onResizeSplit ? (
          <div
            className={
              activeIsOrphan
                ? 'pointer-events-none invisible absolute inset-0 z-0 flex flex-col overflow-hidden bg-gray-300 p-1.5 dark:bg-black'
                : 'relative z-0 flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-gray-300 p-1.5 dark:bg-black'
            }
            aria-hidden={activeIsOrphan}
            {...{ [PANE_SPLIT_ROOT_ATTR]: '' }}
          >
            <WorkspaceSplitLayout
              layout={layout}
              onResizeSplit={onResizeSplit}
              {...(onResizeSplitEnd ? { onResizeSplitEnd } : {})}
              renderLeaf={renderLeafContent}
            />
            <WorkspacePaneDropOverlay
              leafId={
                dropHighlight?.workspaceEdge
                  ? dropHighlight.leafId || null
                  : dropHighlight && dropHighlight.leafId !== draggingPaneLeafId
                    ? dropHighlight.leafId
                    : null
              }
              workspaceEdge={Boolean(dropHighlight?.workspaceEdge)}
              visible={Boolean(
                !activeIsOrphan &&
                  draggingTab &&
                  splitDragEnabled &&
                  !isMobileLayout &&
                  dropHighlight &&
                  (dropHighlight.workspaceEdge ||
                    dropHighlight.leafId !== draggingPaneLeafId),
              )}
              activeZone={
                dropHighlight &&
                (dropHighlight.workspaceEdge ||
                  dropHighlight.leafId !== draggingPaneLeafId)
                  ? dropHighlight.zone
                  : null
              }
            />
          </div>
        ) : null}

        {!splitLayoutMounted || activeIsOrphan ? (
          <WorkspaceTabHost>
            <WorkspacePaneCompactHost
              shellIsMobile={isMobileLayout}
              className="absolute inset-0"
              {...(singleLeafId && !activeIsOrphan
                ? { [PANE_LEAF_ATTR]: singleLeafId }
                : {})}
            >
              {(contentIsMobileLayout) =>
                activeIsOrphan
                  ? (() => {
                      const orphanTab = tabs.find((t) => t.id === activeId);
                      if (!orphanTab) return null;
                      return (
                        <div
                          key={orphanTab.id}
                          className="absolute inset-0 flex min-h-0 min-w-0 flex-col overflow-hidden"
                        >
                          {renderTabContent(orphanTab, true, {
                            ...(isFileTab(orphanTab) && orphanTab.noteSurface
                              ? { noteSurface: orphanTab.noteSurface }
                              : {}),
                            contentIsMobileLayout,
                            isSurfaceLive: true,
                          })}
                        </div>
                      );
                    })()
                  : (
                    <>
                      {fileTabs.map((tab) => {
                        const active = tab.id === activeId;
                        if (!active) return null;
                        const exportLeaf = leaves.find(
                          (l) => l.exportPdfForTabId === tab.id && l.activeId === tab.id,
                        );
                        const handleExportClose = (result?: {
                          editorContent: string;
                          currentFile: ExportPdfDocumentFile;
                        }) => {
                          if (result) {
                            const nextContent =
                              typeof result.editorContent === 'string'
                                ? result.editorContent
                                : '';
                            if (active && mirrors?.onChangeEditor) {
                              mirrors.onChangeEditor(nextContent);
                            } else {
                              mirrors?.onInactiveEditorChange?.(tab.id, nextContent);
                            }
                          }
                          if (exportLeaf) onClearExportPdf?.(exportLeaf.id);
                        };
                        return (
                          <div
                            key={tab.id}
                            className="absolute inset-0 flex min-h-0 min-w-0 flex-col overflow-hidden"
                          >
                            {exportLeaf ? (
                              <>
                                <LeafExportPdfBack
                                  leafId={exportLeaf.id}
                                  open
                                  onClose={() => onClearExportPdf?.(exportLeaf.id)}
                                  onApplyPendingReturn={() => {
                                    applyExportPdfHandoffToTab({
                                      tab,
                                      activeId,
                                      ...(mirrors ? { mirrors } : {}),
                                    });
                                  }}
                                />
                                {renderTabContent(tab, true, {
                                  exportPdf: true,
                                  onExportPdfClose: handleExportClose,
                                  ...(tab.noteSurface
                                    ? { noteSurface: tab.noteSurface }
                                    : {}),
                                  contentIsMobileLayout,
                                  isSurfaceLive: true,
                                })}
                              </>
                            ) : (
                              renderTabContent(tab, true, {
                                ...(tab.noteSurface
                                  ? { noteSurface: tab.noteSurface }
                                  : {}),
                                contentIsMobileLayout,
                                isSurfaceLive: true,
                              })
                            )}
                          </div>
                        );
                      })}

                      {showChat && chatActive ? (
                        <div className="absolute inset-0 flex min-h-0 min-w-0 flex-col overflow-hidden">
                          {renderTabContent(
                            tabs.find((t) => t.kind === 'chat')!,
                            true,
                            { contentIsMobileLayout, isSurfaceLive: true },
                          )}
                        </div>
                      ) : null}

                      {showSettings && settingsActive ? (
                        <div className="absolute inset-0 flex min-h-0 min-w-0 flex-col overflow-hidden">
                          {renderTabContent(
                            tabs.find((t) => t.kind === 'settings')!,
                            true,
                            { contentIsMobileLayout, isSurfaceLive: true },
                          )}
                        </div>
                      ) : null}

                      {showContentSearch && contentSearchActive ? (
                        <div className="absolute inset-0 flex min-h-0 min-w-0 flex-col overflow-hidden">
                          {renderTabContent(
                            tabs.find((t) => t.kind === 'content-search')!,
                            true,
                            { contentIsMobileLayout, isSurfaceLive: true },
                          )}
                        </div>
                      ) : null}

                      {showEmpty ? (
                        <div className="absolute inset-0 flex min-h-0 min-w-0 flex-col overflow-hidden">
                          <EditorPane
                            {...editorPaneProps({
                              currentFile: null,
                              editorContent: '',
                              editedFileName: '',
                              ...(mirrors?.setEditedFileName
                                ? { setEditedFileName: mirrors.setEditedFileName }
                                : {}),
                              ...(mirrors?.onChangeEditor
                                ? { onChangeEditor: mirrors.onChangeEditor }
                                : {}),
                              isActiveFile: true,
                            })}
                            isMobileLayout={contentIsMobileLayout}
                          />
                        </div>
                      ) : null}

                      {singleLeafId && splitDragEnabled && !isMobileLayout ? (
                        <WorkspacePaneDropOverlay
                          leafId={
                            dropHighlight?.leafId === singleLeafId
                              ? dropHighlight.leafId
                              : null
                          }
                          visible={Boolean(
                            draggingTab && dropHighlight?.leafId === singleLeafId,
                          )}
                          activeZone={
                            dropHighlight?.leafId === singleLeafId
                              ? dropHighlight.zone
                              : null
                          }
                        />
                      ) : null}
                    </>
                  )
              }
            </WorkspacePaneCompactHost>
          </WorkspaceTabHost>
        ) : null}
      </div>
    </div>
  );
}
