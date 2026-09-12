import type { ReactElement, ReactNode } from 'react';
import { Tooltip } from 'radix-ui';

const TOOLTIP_CONTENT_CLASS =
  'z-100010 max-w-[min(92vw,240px)] rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong';

type IconTooltipProps = {
  label: string;
  children: ReactElement;
  side?: 'top' | 'bottom' | 'left' | 'right';
};

/** Radix tooltip for icon / compact toolbar buttons (nested modal/dock safe z). */
export function PrintChromeIconTooltip({
  label,
  children,
  side = 'top',
}: IconTooltipProps) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          side={side}
          sideOffset={6}
          className={TOOLTIP_CONTENT_CLASS}
        >
          {label}
          <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

type ProviderProps = {
  children: ReactNode;
};

export function PrintChromeTooltipProvider({ children }: ProviderProps) {
  return (
    <Tooltip.Provider delayDuration={250} skipDelayDuration={0}>
      {children}
    </Tooltip.Provider>
  );
}
