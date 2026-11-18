import type { ReactNode } from 'react';
import { Tooltip } from 'radix-ui';

const TOOLTIP_CLASS =
  'z-100051 max-w-[min(92vw,280px)] rounded-md border border-violet-200/80 bg-white px-2 py-1 text-xs text-violet-950 shadow-md dark:border-violet-800/60 dark:bg-odp-surface dark:text-violet-50';

const BTN_CLASS =
  'inline-flex size-7 shrink-0 items-center justify-center rounded border border-violet-200/80 bg-white/90 text-violet-800 hover:bg-violet-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-violet-800/60 dark:bg-odp-surface dark:text-violet-100 dark:hover:bg-violet-950/50';

type LlmAssistIconTooltipButtonProps = {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
};

/** Icon-only action with Radix tooltip (and matching aria-label). */
export default function LlmAssistIconTooltipButton({
  label,
  onClick,
  disabled,
  children,
  className = '',
}: LlmAssistIconTooltipButtonProps) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <button
          type="button"
          onClick={onClick}
          disabled={disabled}
          className={`${BTN_CLASS} ${className}`}
          aria-label={label}
        >
          {children}
        </button>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content side="top" sideOffset={6} className={TOOLTIP_CLASS}>
          {label}
          <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
