import type { FileWorkspaceTab, WorkspaceTab } from '@/utils/workspaceTabs';
import { isTauriMacOS } from '@/utils/tauriPlatform';
import { useMacosTitlebarChrome } from '@/hooks/useMacosTitlebarChrome';
import WorkspaceTabBar from '@/components/workspace/WorkspaceTabBar';
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
  onFileTabContextMenu?: (
    tab: FileWorkspaceTab,
    point: { clientX: number; clientY: number },
  ) => void;
  isMobileLayout?: boolean;
  /** Portrait Tauri: sidebar close control in the titlebar strip. */
  mobileSidebarClose?: MobileSidebarClose | undefined;
  /** Shown in the drag strip when tabs are disabled or empty. */
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

  // macOS Overlay: offset chrome right of native traffic lights (wry inset_traffic_lights).
  const macChromeClass = isMac ? 'desktop-titlebar--mac' : 'w-full';

  return (
    <header
      className={`desktop-titlebar relative z-70 flex ${headerHeightClass} shrink-0 select-none items-stretch border-b border-gray-200 bg-gray-50 dark:border-odp-borderSoft dark:bg-odp-bgSoft ${macChromeClass}`}
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
