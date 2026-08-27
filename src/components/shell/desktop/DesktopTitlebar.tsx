import type { FileWorkspaceTab, WorkspaceTab } from '@/utils/workspaceTabs';
import { isTauriMacOS } from '@/utils/tauriPlatform';
import WorkspaceTabBar from '@/components/workspace/WorkspaceTabBar';
import DesktopWindowControls from '@/components/desktop/DesktopWindowControls';

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
  appName = 'DocuHaim',
}: DesktopTitlebarProps) {
  const isMac = isTauriMacOS();
  const showTabs = tabsEnabled && tabs.length > 0;

  // macOS Overlay: keep the left traffic-light inset free of webview chrome so
  // native close/minimize/zoom buttons stay clickable.
  const macChromeClass = isMac
    ? 'desktop-titlebar--mac ml-20 w-[calc(100%-5rem)]'
    : 'w-full';

  return (
    <header
      className={`desktop-titlebar z-60 flex h-(--desktop-titlebar-h,2rem) shrink-0 select-none items-stretch border-b border-gray-200 bg-gray-50 dark:border-odp-borderSoft dark:bg-odp-bgSoft ${macChromeClass}`}
    >
      {showTabs ? (
        <div className="flex min-w-0 flex-1 items-stretch overflow-hidden">
          <WorkspaceTabBar
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
          {/* Empty gutter: window drag (tabs themselves are interactive). */}
          <div data-tauri-drag-region className="min-w-8 flex-1" />
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
