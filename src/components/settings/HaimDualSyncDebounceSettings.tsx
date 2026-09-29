import { useEffect, useState } from 'react';
import SliderWithScrubInput from '@/components/SliderWithScrubInput';
import {
  HAIM_DUAL_SYNC_DEBOUNCE_CHANGED_EVENT,
  HAIM_DUAL_SYNC_DEBOUNCE_MS_DEFAULT,
  HAIM_DUAL_SYNC_DEBOUNCE_MS_MAX,
  HAIM_DUAL_SYNC_DEBOUNCE_MS_MIN,
  loadHaimDualSyncDebounceMs,
  saveHaimDualSyncDebounceMs,
} from '@/utils/haimDualSyncDebounceSettings';

/**
 * Dual-pane TipTap ↔ source content sync debounce (ms). 0 = immediate.
 */
export default function HaimDualSyncDebounceSettings() {
  const [ms, setMs] = useState(() => loadHaimDualSyncDebounceMs());

  useEffect(() => {
    const sync = () => setMs(loadHaimDualSyncDebounceMs());
    window.addEventListener(HAIM_DUAL_SYNC_DEBOUNCE_CHANGED_EVENT, sync);
    return () =>
      window.removeEventListener(HAIM_DUAL_SYNC_DEBOUNCE_CHANGED_EVENT, sync);
  }, []);

  return (
    <div className="mt-3 border-t border-gray-200 pt-3 dark:border-odp-borderStrong">
      <p className="mb-1 text-xs font-medium text-gray-700 dark:text-odp-fg">
        Dual 소스 동기화 지연
      </p>
      <p className="mb-2 text-[11px] leading-snug text-gray-500 dark:text-odp-muted">
        소스(CodeMirror) 또는 WYSIWYG 편집 후 반대편에 반영하기까지 기다리는
        시간(ms). 기본 {HAIM_DUAL_SYNC_DEBOUNCE_MS_DEFAULT}. 0이면 즉시
        동기화합니다.
      </p>
      <label className="block space-y-1">
        <span className="text-[10px] text-gray-400">지연 (ms)</span>
        <SliderWithScrubInput
          unit="css"
          suffix="ms"
          min={HAIM_DUAL_SYNC_DEBOUNCE_MS_MIN}
          max={HAIM_DUAL_SYNC_DEBOUNCE_MS_MAX}
          step={10}
          value={ms}
          aria-label="Dual 소스 동기화 지연"
          onChange={(v) => {
            saveHaimDualSyncDebounceMs(v);
            setMs(loadHaimDualSyncDebounceMs());
          }}
        />
      </label>
    </div>
  );
}
