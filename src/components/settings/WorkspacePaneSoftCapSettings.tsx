import { useEffect, useRef, useState } from 'react';
import {
  clampWorkspacePaneSoftCap,
  loadWorkspacePaneSoftCap,
  saveWorkspacePaneSoftCap,
  WORKSPACE_PANE_SOFT_CAP_CHANGED_EVENT,
  WORKSPACE_PANE_SOFT_CAP_FOCUS_EVENT,
  WORKSPACE_PANE_SOFT_CAP_MAX,
  WORKSPACE_PANE_SOFT_CAP_MIN,
} from '@/utils/workspaceTabsSettings';

/** Settings field for the workspace split-pane soft cap (under tab settings). */
export default function WorkspacePaneSoftCapSettings() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState(() => String(loadWorkspacePaneSoftCap()));

  useEffect(() => {
    const sync = (event?: Event) => {
      const detail = (event as CustomEvent<{ softCap?: number }> | undefined)?.detail;
      const next = detail?.softCap ?? loadWorkspacePaneSoftCap();
      setValue(String(next));
    };
    window.addEventListener(WORKSPACE_PANE_SOFT_CAP_CHANGED_EVENT, sync);
    return () => {
      window.removeEventListener(WORKSPACE_PANE_SOFT_CAP_CHANGED_EVENT, sync);
    };
  }, []);

  useEffect(() => {
    const onFocus = () => {
      const el = document.getElementById('settings-workspace-pane-soft-cap');
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      window.setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 80);
    };
    window.addEventListener(WORKSPACE_PANE_SOFT_CAP_FOCUS_EVENT, onFocus);
    return () => {
      window.removeEventListener(WORKSPACE_PANE_SOFT_CAP_FOCUS_EVENT, onFocus);
    };
  }, []);

  const commit = () => {
    const next = saveWorkspacePaneSoftCap(clampWorkspacePaneSoftCap(value));
    setValue(String(next));
  };

  return (
    <div
      id="settings-workspace-pane-soft-cap"
      tabIndex={-1}
      className="scroll-mt-4 space-y-1.5"
    >
      <label
        htmlFor="workspace-pane-soft-cap-input"
        className="block text-xs font-medium text-gray-700 dark:text-odp-fg"
      >
        분할 페인 개수 상한
      </label>
      <div className="flex flex-wrap items-center gap-2">
        <input
          ref={inputRef}
          id="workspace-pane-soft-cap-input"
          type="number"
          inputMode="numeric"
          min={WORKSPACE_PANE_SOFT_CAP_MIN}
          max={WORKSPACE_PANE_SOFT_CAP_MAX}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              commit();
              (e.target as HTMLInputElement).blur();
            }
          }}
          className="w-24 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-fgStrong"
        />
        <span className="text-[11px] text-gray-500 dark:text-odp-muted">
          {WORKSPACE_PANE_SOFT_CAP_MIN}–{WORKSPACE_PANE_SOFT_CAP_MAX}
        </span>
      </div>
      <p className="text-[11px] leading-snug text-gray-500 dark:text-odp-muted">
        한 워크스페이스에서 동시에 열 수 있는 분할 페인(창)의 최대 개수입니다. 기본값은
        4입니다. 페인마다 에디터 인스턴스 비용이 있으므로 상한을 낮추면 더 가벼워집니다.
      </p>
    </div>
  );
}
