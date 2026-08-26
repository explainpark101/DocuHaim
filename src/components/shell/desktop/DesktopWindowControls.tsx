import { useCallback, useEffect, useState } from 'react';
import { Tooltip } from 'radix-ui';
import { Minus, Square, Copy, X } from 'lucide-react';
import {
  closeDesktopWindow,
  isDesktopWindowMaximized,
  minimizeDesktopWindow,
  toggleMaximizeDesktopWindow,
} from '@/utils/tauriWindowControls';
import { isTauriMacOS } from '@/utils/shared/tauriPlatform';

const tooltipContentClass =
  'z-100001 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-700 shadow-md dark:border-odp-borderSoft dark:bg-odp-surface dark:text-odp-fgStrong';

const btnClass =
  'inline-flex h-8 w-11 shrink-0 items-center justify-center text-gray-600 transition-colors hover:bg-gray-200/80 dark:text-odp-muted dark:hover:bg-odp-focusBg dark:hover:text-odp-fgStrong';

/**
 * Custom minimize / maximize / close for borderless Windows (and Linux) shells.
 * Hidden on macOS — native traffic lights remain under Overlay titleBarStyle.
 */
export default function DesktopWindowControls() {
  const [maximized, setMaximized] = useState(false);

  useEffect(() => {
    if (isTauriMacOS()) return;
    let cancelled = false;
    void isDesktopWindowMaximized().then((v) => {
      if (!cancelled) setMaximized(v);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const onMinimize = useCallback(() => {
    void minimizeDesktopWindow();
  }, []);

  const onToggleMaximize = useCallback(() => {
    void toggleMaximizeDesktopWindow().then(setMaximized);
  }, []);

  const onClose = useCallback(() => {
    void closeDesktopWindow();
  }, []);

  if (isTauriMacOS()) return null;

  return (
    <Tooltip.Provider delayDuration={250} skipDelayDuration={0}>
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      <div className="flex h-full shrink-0 items-stretch">
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            <button
              type="button"
              aria-label="Minimize"
              className={btnClass}
              onClick={onMinimize}
            >
              <Minus size={14} aria-hidden />
            // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            </button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content side="bottom" sideOffset={4} className={tooltipContentClass}>
              Minimize
              <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>

        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            <button
              type="button"
              aria-label={maximized ? 'Restore' : 'Maximize'}
              className={btnClass}
              onClick={onToggleMaximize}
            >
              {maximized ? (
                <Copy size={12} aria-hidden className="-scale-x-100" />
              ) : (
                <Square size={12} aria-hidden />
              )}
            // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            </button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content side="bottom" sideOffset={4} className={tooltipContentClass}>
              {maximized ? 'Restore' : 'Maximize'}
              <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>

        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            <button
              type="button"
              aria-label="Close"
              className={`${btnClass} hover:bg-red-500 hover:text-white dark:hover:bg-red-600 dark:hover:text-white`}
              onClick={onClose}
            >
              <X size={14} aria-hidden />
            // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            </button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content side="bottom" sideOffset={4} className={tooltipContentClass}>
              Close
              <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      </div>
    </Tooltip.Provider>
  );
}
