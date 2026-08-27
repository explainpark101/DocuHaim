import type { FileWorkspaceTab, WorkspaceTab } from '@/utils/workspaceTabs';
import { useEffect } from 'react';
import { isTauriMacOS } from '@/utils/tauriPlatform';
import WorkspaceTabBar from '@/components/workspace/WorkspaceTabBar';
import DesktopWindowControls from '@/components/desktop/DesktopWindowControls';
import { initMacosTrafficLights } from '@/utils/initMacosTrafficLights';

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
  const headerHeightClass = showTabs
    ? 'h-(--workspace-titlebar-tab-h)'
    : 'h-(--desktop-titlebar-h,2rem)';

  useEffect(() => {
    if (!isMac) return undefined;
    initMacosTrafficLights();
    return undefined;
  }, [isMac]);

  // macOS Overlay: leave the traffic-light inset click-through; interactive chrome
  // to the right keeps pointer-events.
  const macChromeClass = isMac ? 'desktop-titlebar--mac pointer-events-none' : '';
  const macHitClass = isMac ? 'desktop-titlebar__hit pointer-events-auto' : '';

  return (
    <header
      className={`desktop-titlebar z-60 flex ${headerHeightClass} shrink-0 select-none items-stretch border-b border-gray-200 bg-gray-50 dark:border-odp-borderSoft dark:bg-odp-bgSoft ${macChromeClass}`}
    >
      {showTabs ? (
        <div
          className={`desktop-titlebar__tab-container flex h-full min-w-0 flex-1 items-stretch overflow-hidden ${macHitClass}`}
        >
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
          <div data-tauri-drag-region className="min-w-8 flex-1" />
        </div>
      ) : (
        <div
          data-tauri-drag-region
          className={`flex min-w-0 flex-1 items-center px-3 text-xs font-medium text-gray-500 dark:text-odp-muted ${macHitClass}`}
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
