import { useEffect, useState } from 'react';
import {
  loadWorkspacePaneFreezeEnabled,
  WORKSPACE_PANE_FREEZE_CHANGED_EVENT,
} from '@/utils/workspacePaneFreezeSettings';
import {
  setSettingsToggle,
  subscribeSettingsToggles,
} from '@/utils/advancedSearch/settingsToggles';

/** Settings toggle: freeze unfocused split panes (under tab / split settings). */
export default function WorkspacePaneFreezeSettings() {
  const [enabled, setEnabled] = useState(() => loadWorkspacePaneFreezeEnabled());

  useEffect(() => {
    const unsub = subscribeSettingsToggles((id, next) => {
      if (id === 'settings-workspace-pane-freeze') setEnabled(next);
    });
    const sync = (event?: Event) => {
      const detail = (event as CustomEvent<{ enabled?: boolean }> | undefined)?.detail;
      setEnabled(
        typeof detail?.enabled === 'boolean'
          ? detail.enabled
          : loadWorkspacePaneFreezeEnabled(),
      );
    };
    window.addEventListener(WORKSPACE_PANE_FREEZE_CHANGED_EVENT, sync);
    return () => {
      unsub();
      window.removeEventListener(WORKSPACE_PANE_FREEZE_CHANGED_EVENT, sync);
    };
  }, []);

  return (
    <label
      id="settings-workspace-pane-freeze"
      tabIndex={-1}
      className="flex scroll-mt-4 items-center gap-3 text-xs text-gray-700 dark:text-odp-fg cursor-pointer group"
    >
      <button
        type="button"
        onClick={() => {
          setSettingsToggle('settings-workspace-pane-freeze', !enabled);
        }}
        className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition-all duration-200 ${
          enabled
            ? 'bg-blue-500 border-blue-500 shadow-sm'
            : 'bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft'
        } group-hover:brightness-105 group-hover:border-blue-400`}
        aria-pressed={enabled}
        aria-label="비활성 스플릿 페인 프리징"
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
            enabled ? 'translate-x-4' : 'translate-x-0.5'
          }`}
        />
      </button>
      <span className="select-none group-hover:text-gray-900 dark:group-hover:text-odp-fgStrong">
        비활성 스플릿 페인 프리징
        <span className="text-[11px] text-gray-500 dark:text-odp-muted block mt-0.5">
          포커스가 없는 분할 페인에서 md-editor-rt 등 무거운 작업을 일시 중지합니다.
          켜면 성능에 도움이 될 수 있으나, 포커스를 바꿀 때 내용이 섞일 수 있습니다. 기본값은
          꺼짐입니다.
        </span>
      </span>
    </label>
  );
}
