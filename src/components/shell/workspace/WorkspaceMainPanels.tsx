import { Suspense, lazy, useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { Tooltip } from 'radix-ui';
import EditorPane from '@/components/EditorPane';
import SettingsVaultDropHost from '@/components/shell/SettingsVaultDropHost';
import WorkspaceTabBar, { type WorkspaceTabGroup } from '@/components/workspace/WorkspaceTabBar';
import WorkspaceTabHost, {
  WorkspaceKeepAlivePanel,
} from '@/components/workspace/WorkspaceTabHost';
import WorkspaceSplitLayout from '@/components/shell/workspace/WorkspaceSplitLayout';
import WorkspacePaneDropOverlay from '@/components/shell/workspace/WorkspacePaneDropOverlay';
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
  getWorkspaceTabDrag,
  hitTestPaneDropAt,
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
  return (
    <div className="flex h-full min-h-48 flex-1 items-center justify-center bg-white text-sm text-gray-400 dark:bg-odp-bgSofter dark:text-odp-muted">
      로딩 중…
    </div>
  );
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
  onResizeSplit?: (splitId: string, ratio: number) => void;
  onPaneDrop?: (
    tabId: string,
    leafId: string,
    zone: PaneSplitEdge | 'center',
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
): { leafId: string; zone: PaneSplitEdge | 'center' } | null {
  return hitTestPaneDropAt(clientX, clientY) as {
    leafId: string;
    zone: PaneSplitEdge | 'center';
  } | null;
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
  const showSplitPanes = Boolean(layout && isSplit && onResizeSplit && !activeIsOrphan);
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
  } | null>(null);
  /** Leaf ids that just appeared via split — amber border flash (~2s). */
  const [freshPaneIds, setFreshPaneIds] = useState<ReadonlySet<string>>(() => new Set());
  const prevLeafIdsRef = useRef<Set<string> | null>(null);
  const freshPaneTimersRef = useRef(new Map<string, number>());

  useEffect(() => {
    const nextIds = new Set(leaves.map((leaf) => leaf.id));
    const prev = prevLeafIdsRef.current;
    prevLeafIdsRef.current = nextIds;

    if (!isSplit) {
      if (freshPaneTimersRef.current.size > 0) {
        for (const timer of freshPaneTimersRef.current.values()) {
          window.clearTimeout(timer);
        }
        freshPaneTimersRef.current.clear();
        setFreshPaneIds(new Set());
      }
      return;
    }

    // Skip first observation (restore / initial mount) so persisted splits do not flash.
    if (!prev || prev.size === 0) return;

    const added = [...nextIds].filter((id) => !prev.has(id));
    if (added.length === 0) return;

    setFreshPaneIds((cur) => {
      const merged = new Set(cur);
      for (const id of added) merged.add(id);
      return merged;
    });

    for (const id of added) {
      const existing = freshPaneTimersRef.current.get(id);
      if (existing != null) window.clearTimeout(existing);
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
  }, [leaves, isSplit]);

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
        setDropHighlight(null);
        return;
      }
      const next = resolveDropHighlight(snap.clientX, snap.clientY);
      setDropHighlight((prev) =>
        prev?.leafId === next?.leafId && prev?.zone === next?.zone ? prev : next,
      );
    });
  }, [splitDragEnabled]);

  useEffect(() => {
    if (!draggingTab || !splitDragEnabled) return undefined;
    const onMove = (e: PointerEvent) => {
      if (!getWorkspaceTabDrag()) return;
      const next = resolveDropHighlight(e.clientX, e.clientY);
      setDropHighlight((prev) =>
        prev?.leafId === next?.leafId && prev?.zone === next?.zone ? prev : next,
      );
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, [draggingTab, splitDragEnabled]);

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
    },
  ): ReactNode => {
    if (tab.kind === 'chat') {
      return (
        <Suspense fallback={<RouteSuspenseFallback />}>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <ChatWithMyselfPane {...(chatPaneProps as any)} isActive={active} />
        </Suspense>
      );
    }
    if (tab.kind === 'settings') {
      return (
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        <SettingsVaultDropHost enabled={active} {...(vaultDropProps as any)}>
          <Suspense fallback={<RouteSuspenseFallback />}>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <SettingsPage {...(settingsPaneProps as any)} />
          </Suspense>
        </SettingsVaultDropHost>
      );
    }
    if (tab.kind === 'content-search') {
      return (
        <Suspense fallback={<RouteSuspenseFallback />}>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <ContentSearchPage {...(contentSearchPaneProps as any)} isActive={active} />
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
      setWorkspaceTabDrag(null);
      if (!started || !snap?.paneLeafId) return;

      const hit = resolveDropHighlight(clientX, clientY);
      if (!hit || hit.leafId === sourceLeafId) return;
      if (
        hit.zone !== 'left' &&
        hit.zone !== 'right' &&
        hit.zone !== 'top' &&
        hit.zone !== 'bottom' &&
        hit.zone !== 'center'
      ) {
        return;
      }
      const next = relocateLeaf(layoutAtStart, sourceLeafId, hit.leafId, hit.zone);
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
      <div
        {...{ [PANE_LEAF_ATTR]: leafId }}
        className={`relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-t-lg bg-white dark:bg-odp-surface ${
          focused
            ? 'ring-2 ring-inset ring-blue-500/45 dark:ring-blue-400/40'
            : ''
        }`}
        onPointerDownCapture={() => onFocusPane?.(leafId)}
      >
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
        <WorkspacePaneDropOverlay
          leafId={leafId}
          visible={
            draggingTab &&
            splitDragEnabled &&
            !isMobileLayout &&
            dropHighlight?.leafId === leafId &&
            draggingPaneLeafId !== leafId
          }
          activeZone={dropHighlight?.leafId === leafId ? dropHighlight.zone : null}
        />
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
          {leaf.tabIds.map((tabId) => {
            const tab = tabs.find((t) => t.id === tabId);
            if (!tab) return null;
            const active = tabId === leafActiveId;
            const showExport = Boolean(exportPdfForTabId && exportPdfForTabId === tabId);
            // Pane-local active: each visible leaf must load its editor (not only the focused pane).
            const paneActive = active;
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

            return (
              <WorkspaceKeepAlivePanel key={`${leafId}:${tabId}`} active={paneActive}>
                {renderTabContent(tab, paneActive, {
                  ...(isFileTab(tab) && tab.noteSurface
                    ? { noteSurface: tab.noteSurface }
                    : {}),
                  exportPdf: showExport,
                  ...(showExport ? { onExportPdfClose: handleExportClose } : {}),
                })}
              </WorkspaceKeepAlivePanel>
            );
          })}
          {leaf.tabIds.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-400 dark:text-odp-muted">
              빈 페인
            </div>
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
      {tabBarPlacement === 'inline' ? tabBar : null}
      {showSplitPanes && layout && onResizeSplit ? (
        <div className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-gray-300 p-1.5 dark:bg-black">
          <WorkspaceSplitLayout
            layout={layout}
            onResizeSplit={onResizeSplit}
            renderLeaf={renderLeafContent}
            freshPaneIds={freshPaneIds}
          />
        </div>
      ) : (
        <WorkspaceTabHost>
          <div
            className="absolute inset-0"
            {...(singleLeafId ? { [PANE_LEAF_ATTR]: singleLeafId } : {})}
          >
          {fileTabs.map((tab) => {
            const active = tab.id === activeId;
            const exportLeaf = leaves.find(
              (l) => l.exportPdfForTabId === tab.id && l.activeId === tab.id,
            );
            const handleExportClose = (result?: {
              editorContent: string;
              currentFile: ExportPdfDocumentFile;
            }) => {
              if (result) {
                const nextContent =
                  typeof result.editorContent === 'string' ? result.editorContent : '';
                if (active && mirrors?.onChangeEditor) {
                  mirrors.onChangeEditor(nextContent);
                } else {
                  mirrors?.onInactiveEditorChange?.(tab.id, nextContent);
                }
              }
              if (exportLeaf) onClearExportPdf?.(exportLeaf.id);
            };
            return (
              <WorkspaceKeepAlivePanel key={tab.id} active={active}>
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
                    {renderTabContent(tab, active, {
                      exportPdf: true,
                      onExportPdfClose: handleExportClose,
                      ...(tab.noteSurface ? { noteSurface: tab.noteSurface } : {}),
                    })}
                  </>
                ) : (
                  renderTabContent(
                    tab,
                    active,
                    tab.noteSurface ? { noteSurface: tab.noteSurface } : undefined,
                  )
                )}
              </WorkspaceKeepAlivePanel>
            );
          })}

          {showChat ? (
            <WorkspaceKeepAlivePanel active={chatActive}>
              {renderTabContent(tabs.find((t) => t.kind === 'chat')!, chatActive)}
            </WorkspaceKeepAlivePanel>
          ) : null}

          {showSettings ? (
            <WorkspaceKeepAlivePanel active={settingsActive}>
              {renderTabContent(tabs.find((t) => t.kind === 'settings')!, settingsActive)}
            </WorkspaceKeepAlivePanel>
          ) : null}

          {showContentSearch ? (
            <WorkspaceKeepAlivePanel active={contentSearchActive}>
              {renderTabContent(
                tabs.find((t) => t.kind === 'content-search')!,
                contentSearchActive,
              )}
            </WorkspaceKeepAlivePanel>
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
              />
            </div>
          ) : null}

          {singleLeafId && splitDragEnabled && !isMobileLayout ? (
            <WorkspacePaneDropOverlay
              leafId={singleLeafId}
              visible={draggingTab && dropHighlight?.leafId === singleLeafId}
              activeZone={
                dropHighlight?.leafId === singleLeafId ? dropHighlight.zone : null
              }
            />
          ) : null}
          </div>
        </WorkspaceTabHost>
      )}
    </div>
  );
}
