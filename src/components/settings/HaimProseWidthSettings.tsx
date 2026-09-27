import { useEffect, useState } from 'react';
import { PanelRightOpen } from 'lucide-react';
import { Tooltip } from 'radix-ui';
import Button from '@/components/Button';
import HaimProseWidthControls from '@/components/settings/HaimProseWidthControls';
import { useWorkspaceTabsCtxOptional } from '@/App/hooks/useWorkspaceTabsCtx';
import { subscribeSettingsToggles } from '@/utils/advancedSearch/settingsToggles';
import { openHaimProseWidthLivePanel } from '@/utils/haimProseWidthPanel';
import {
  HAIM_PROSE_WIDTH_CHANGED_EVENT,
  loadHaimProseWidthSettings,
  type HaimProseWidthSettings,
} from '@/utils/haimProseWidthSettings';

export default function HaimProseWidthSettings() {
  const [settings, setSettings] = useState<HaimProseWidthSettings>(() =>
    loadHaimProseWidthSettings(),
  );
  const tabsCtx = useWorkspaceTabsCtxOptional();

  useEffect(() => {
    const sync = () => setSettings(loadHaimProseWidthSettings());
    window.addEventListener(HAIM_PROSE_WIDTH_CHANGED_EVENT, sync);
    const unsub = subscribeSettingsToggles((id) => {
      if (id === 'settings-haim-prose-width-clamp') sync();
    });
    return () => {
      window.removeEventListener(HAIM_PROSE_WIDTH_CHANGED_EVENT, sync);
      unsub();
    };
  }, []);

  const openLivePanel = () => {
    openHaimProseWidthLivePanel();

    // Switch to the most recently used file tab so width changes are visible.
    if (!tabsCtx?.workspaceTabsEnabled) return;
    const state = tabsCtx.workspaceTabsRef.current;
    const fileTabs = state.tabs.filter((t) => t.kind === 'file');
    if (fileTabs.length === 0) return;
    const latest = [...fileTabs].sort(
      (a, b) => (b.lastActivatedAt || 0) - (a.lastActivatedAt || 0),
    )[0];
    if (latest) tabsCtx.activateWorkspaceTab(latest.id);
  };

  return (
    <div className="mt-3 space-y-2 border-t border-gray-200 pt-3 dark:border-odp-borderStrong">
      <HaimProseWidthControls settings={settings} />
      <Tooltip.Provider delayDuration={250} skipDelayDuration={0}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Button
              type="button"
              variant="secondary"
              className="w-full justify-center text-xs"
              onClick={openLivePanel}
              aria-label="플로팅 패널로 본문 너비 조절"
            >
              <PanelRightOpen size={14} />
              플로팅으로 조절
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              side="top"
              sideOffset={6}
              className="z-100001 max-w-[min(92vw,280px)] rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg"
            >
              노트 탭으로 전환한 뒤 슬라이더로 너비를 바로 맞춥니다
              <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </div>
  );
}
