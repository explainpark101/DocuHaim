import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { subscribeSettingsToggles } from '@/utils/advancedSearch/settingsToggles';
import {
  formatStatusBarClock,
  loadStatusBarClockDisplay,
  loadStatusBarClockEnabled,
  STATUS_BAR_CLOCK_DISPLAY_CHANGED_EVENT,
  type StatusBarClockDisplay,
} from '@/utils/statusBarClockSettings';

/**
 * Optional status-bar clock (right cluster). Enabled via Settings / Advanced Search.
 */
export default function StatusBarClock() {
  const [enabled, setEnabled] = useState(() => loadStatusBarClockEnabled());
  const [display, setDisplay] = useState<StatusBarClockDisplay>(() =>
    loadStatusBarClockDisplay(),
  );
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    return subscribeSettingsToggles((id, next) => {
      if (id === 'settings-status-bar-clock') setEnabled(next);
      if (id === 'settings-status-bar-clock-date') {
        setDisplay((prev) => ({ ...prev, showDate: next }));
      }
    });
  }, []);

  useEffect(() => {
    const onDisplay = (event: Event) => {
      const detail = (event as CustomEvent<StatusBarClockDisplay>).detail;
      setDisplay(detail ?? loadStatusBarClockDisplay());
    };
    window.addEventListener(STATUS_BAR_CLOCK_DISPLAY_CHANGED_EVENT, onDisplay);
    return () => {
      window.removeEventListener(STATUS_BAR_CLOCK_DISPLAY_CHANGED_EVENT, onDisplay);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;

    const tick = () => setNow(Date.now());
    tick();

    let intervalId = window.setInterval(tick, 1000);

    const onVisibility = () => {
      if (document.visibilityState === 'visible') {
        tick();
        window.clearInterval(intervalId);
        intervalId = window.setInterval(tick, 1000);
      } else {
        window.clearInterval(intervalId);
      }
    };

    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [enabled]);

  if (!enabled) return null;

  const label = formatStatusBarClock(now, display);

  return (
    <time
      dateTime={new Date(now).toISOString()}
      className="inline-flex items-center gap-1 tabular-nums text-gray-600 dark:text-odp-muted shrink-0"
      aria-label={`현재 시각 ${label}`}
    >
      <Clock className="size-3 shrink-0" aria-hidden="true" />
      <span>{label}</span>
    </time>
  );
}
