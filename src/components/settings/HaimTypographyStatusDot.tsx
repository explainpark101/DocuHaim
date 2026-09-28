/**
 * Filled status circle for Haim Typography on/off (and inherit → global color).
 */

export type HaimTypographyStatusTone = 'on' | 'off';

const TONE_CLASS: Record<HaimTypographyStatusTone, string> = {
  on: 'bg-emerald-500 dark:bg-emerald-400',
  off: 'bg-slate-400 dark:bg-slate-500',
};

const TONE_LABEL: Record<HaimTypographyStatusTone, string> = {
  on: '켜짐',
  off: '꺼짐',
};

export function haimTypographyStatusTone(enabled: boolean): HaimTypographyStatusTone {
  return enabled ? 'on' : 'off';
}

type HaimTypographyStatusDotProps = {
  /** Effective on/off color to show. */
  tone: HaimTypographyStatusTone;
  size?: 'sm' | 'md';
  className?: string;
  /** Accessible name; defaults to 켜짐/꺼짐. */
  label?: string;
};

/**
 * Solid circle indicating Typography rule on (green) / off (slate).
 */
export function HaimTypographyStatusDot({
  tone,
  size = 'sm',
  className = '',
  label,
}: HaimTypographyStatusDotProps) {
  const dim = size === 'md' ? 'h-2.5 w-2.5' : 'h-2 w-2';
  return (
    <span
      className={`inline-block shrink-0 rounded-full ${dim} ${TONE_CLASS[tone]} ${className}`.trim()}
      role="img"
      aria-label={label ?? TONE_LABEL[tone]}
      title={label ?? TONE_LABEL[tone]}
    />
  );
}
