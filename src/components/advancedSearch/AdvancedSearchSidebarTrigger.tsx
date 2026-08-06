import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { AnimatePresence, motion as Motion } from 'motion/react';
import { Tooltip } from 'radix-ui';
import { requestOpenAdvancedSearch } from '@/utils/advancedSearch';

const CAST_MS = 480;

const TOOLTIP_TRANSITION = {
  duration: 0.22,
  ease: [0.22, 1, 0.36, 1] as const,
};

function isApplePlatform() {
  if (typeof navigator === 'undefined') return false;
  return /Mac|iPod|iPhone|iPad/.test(navigator.platform || '');
}

/**
 * Sidebar search glyph → Advanced Search.
 * Hover/click: icon lifts slightly with a soft violet–blue–green glow (icon only).
 */
export default function AdvancedSearchSidebarTrigger() {
  const [casting, setCasting] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltip = useMemo(
    () =>
      isApplePlatform()
        ? 'Advanced Search 열기 (⌘ + k)'
        : 'Advanced Search 열기 (ctrl + k)',
    [],
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (openTimerRef.current) clearTimeout(openTimerRef.current);
    };
  }, []);

  const handleClick = useCallback(() => {
    setTooltipOpen(false);
    setCasting(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (openTimerRef.current) clearTimeout(openTimerRef.current);
    timerRef.current = setTimeout(() => {
      setCasting(false);
      timerRef.current = null;
    }, CAST_MS);
    openTimerRef.current = setTimeout(() => {
      requestOpenAdvancedSearch({ source: 'sidebar' });
      openTimerRef.current = null;
    }, 70);
  }, []);

  return (
    <Tooltip.Provider delayDuration={0} skipDelayDuration={0}>
      <Tooltip.Root open={tooltipOpen} onOpenChange={setTooltipOpen}>
        <Tooltip.Trigger asChild>
          <button
            type="button"
            className={`advanced-search-trigger ${casting ? 'is-casting' : ''}`}
            onClick={handleClick}
            aria-label={tooltip}
          >
            <Search
              size={16}
              className="advanced-search-trigger__icon"
              aria-hidden
            />
          </button>
        </Tooltip.Trigger>
        <AnimatePresence>
          {tooltipOpen ? (
            <Tooltip.Portal forceMount>
              <Tooltip.Content asChild side="bottom" sideOffset={6}>
                <Motion.div
                  className="z-100001 max-w-[min(92vw,280px)] origin-(--radix-tooltip-content-transform-origin) rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-[11px] leading-snug text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong"
                  initial={{ opacity: 0, y: -8, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.97 }}
                  transition={TOOLTIP_TRANSITION}
                >
                  {tooltip}
                  <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
                </Motion.div>
              </Tooltip.Content>
            </Tooltip.Portal>
          ) : null}
        </AnimatePresence>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
