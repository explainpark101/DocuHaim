import { useMemo } from 'react';
import type { FileWorkspaceTab, WorkspaceTab } from '@/utils/workspaceTabs';
import { collectLeaves, countLeaves, type PaneNode } from '@/utils/workspaceTabs';
import type { PaneSplitEdge } from '@/utils/workspaceTabs/paneLayout';
import { isTauriMacOS } from '@/utils/tauriPlatform';
import { useMacosTitlebarChrome } from '@/hooks/useMacosTitlebarChrome';
import WorkspaceTabBar, { type WorkspaceTabGroup } from '@/components/workspace/WorkspaceTabBar';
import DesktopWindowControls from '@/components/desktop/DesktopWindowControls';
import { IconX } from '@/components/icons';

type MobileSidebarClose = {
  onClose: () => void;
};

type DesktopTitlebarProps = {
  tabs: WorkspaceTab[];
  activeId: string | null;
  savingTabIds?: readonly string[];
  tabsEnabled?: boolean;
  onActivateTab: (id: string) => void;
  onCloseTab: (id: string) => void;
  onReorderTabs: (activeId: string, overId: string) => void;
  layout?: PaneNode | null;
  focusedPaneId?: string | null;
  splitDragEnabled?: boolean;
  onPaneDrop?: (
    tabId: string,
    leafId: string,
    zone: PaneSplitEdge | 'center',
  ) => boolean;
  onSplitTab?: (tabId: string, edge: PaneSplitEdge) => boolean;
  onApplyPaneLayout?: (layout: PaneNode) => void;
  onCollapsePane?: (leafId: string) => void;
  onFileTabContextMenu?: (
    tab: FileWorkspaceTab,
    point: { clientX: number; clientY: number },
  ) => void;
  isMobileLayout?: boolean;
  mobileSidebarClose?: MobileSidebarClose | undefined;
  appName?: string;
};

/**
 * Full-width custom titlebar for Tauri desktop.
 * Hosts workspace tabs (when enabled) and window drag / controls.
 */
export default function DesktopTitlebar({
  tabs,
  activeId,
  savingTabIds,
  tabsEnabled = true,
  onActivateTab,
  onCloseTab,
  onReorderTabs,
  layout = null,
  focusedPaneId = null,
  splitDragEnabled = false,
  onPaneDrop,
  onSplitTab,
  onApplyPaneLayout,
  onCollapsePane,
  onFileTabContextMenu,
  isMobileLayout = false,
  mobileSidebarClose,
  appName = 'DocuHaim',
}: DesktopTitlebarProps) {
  const isMac = isTauriMacOS();
  useMacosTitlebarChrome();
  const showTabs = tabsEnabled && tabs.length > 0;
  const headerHeightClass = showTabs
    ? 'h-(--workspace-titlebar-tab-h)'
    : 'h-(--desktop-titlebar-h,2rem)';

  const tabGroups: WorkspaceTabGroup[] | null = useMemo(() => {
    if (!layout || countLeaves(layout) <= 1) return null;
    return collectLeaves(layout).map((leaf) => ({
      leafId: leaf.id,
      tabIds: leaf.tabIds,
      focused: leaf.id === focusedPaneId,
    }));
  }, [layout, focusedPaneId]);

  const macChromeClass = isMac ? 'desktop-titlebar--mac' : 'w-full';
  const splitTabs = Boolean(tabGroups && tabGroups.length > 1);

  return (
    <header
      className={`desktop-titlebar relative z-70 flex ${headerHeightClass} shrink-0 select-none items-stretch border-b border-gray-200 dark:border-odp-borderSoft ${
        splitTabs
          ? 'bg-gray-200 dark:bg-odp-bg'
          : 'bg-gray-50 dark:bg-odp-bgSoft'
      } ${macChromeClass}`}
    >
      {mobileSidebarClose ? (
        <button
          type="button"
          aria-label="사이드바 닫기"
          onClick={mobileSidebarClose.onClose}
          className="inline-flex h-full shrink-0 items-center justify-center px-2.5 text-gray-600 transition-colors hover:bg-gray-200/80 dark:text-odp-muted dark:hover:bg-odp-focusBg dark:hover:text-odp-fgStrong"
        >
          <IconX size={18} />
        </button>
      ) : null}
      {showTabs ? (
        <div className="desktop-titlebar__tab-container flex h-full min-w-0 flex-1 items-stretch overflow-hidden">
          <WorkspaceTabBar
            className="min-w-0 flex-1"
            tabs={tabs}
            activeId={activeId}
            savingTabIds={savingTabIds ?? []}
            onActivate={onActivateTab}
            onClose={onCloseTab}
            onReorder={onReorderTabs}
            tabGroups={tabGroups}
            splitDragEnabled={splitDragEnabled && !isMobileLayout}
            {...(onPaneDrop ? { onPaneDrop } : {})}
            {...(onSplitTab ? { onSplitTab } : {})}
            paneLayout={layout}
            {...(onApplyPaneLayout ? { onApplyPaneLayout } : {})}
            {...(onCollapsePane ? { onCollapsePane } : {})}
            {...(onFileTabContextMenu ? { onFileTabContextMenu } : {})}
            isMobileLayout={isMobileLayout}
            variant="titlebar"
          />
        </div>
      ) : (
        <div
          data-tauri-drag-region
          className="flex min-w-0 flex-1 items-center px-3 text-xs font-medium text-gray-500 dark:text-odp-muted"
        >
          <span data-tauri-drag-region className="truncate">
            {appName}
          </span>
        </div>
      )}

      <DesktopWindowControls />
    </header>
  );
}
