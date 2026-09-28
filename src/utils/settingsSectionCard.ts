/**
 * Shared tint classes for settings / floating-panel section cards.
 * Adjacent sections should use different tones so groups stay visually distinct.
 */

export type SettingsSectionTone =
  | 'slate'
  | 'sky'
  | 'blue'
  | 'violet'
  | 'amber'
  | 'emerald';

const TONE_SURFACE: Record<SettingsSectionTone, string> = {
  slate:
    'border-slate-200/90 bg-slate-50/70 dark:border-odp-borderSoft dark:bg-odp-bgSoft/50',
  sky: 'border-sky-200/90 bg-sky-50/70 dark:border-sky-900/50 dark:bg-sky-950/25',
  blue: 'border-blue-200/90 bg-blue-50/70 dark:border-blue-900/50 dark:bg-blue-950/30',
  violet:
    'border-violet-200/90 bg-violet-50/70 dark:border-violet-900/50 dark:bg-violet-950/25',
  amber:
    'border-amber-200/90 bg-amber-50/70 dark:border-amber-900/50 dark:bg-amber-950/25',
  emerald:
    'border-emerald-200/90 bg-emerald-50/70 dark:border-emerald-900/50 dark:bg-emerald-950/25',
};

/** Base chrome: rounded card + gap for title/fields inside. */
export const SETTINGS_SECTION_CARD_BASE =
  'space-y-3 rounded-lg border p-3.5';

/** Compact variant (e.g. 보기 설정 floating panel). */
export const SETTINGS_SECTION_CARD_COMPACT =
  'space-y-2 rounded-md border p-2.5';

export function settingsSectionCardClass(
  tone: SettingsSectionTone,
  options?: { compact?: boolean; className?: string },
): string {
  const base = options?.compact
    ? SETTINGS_SECTION_CARD_COMPACT
    : SETTINGS_SECTION_CARD_BASE;
  return [base, TONE_SURFACE[tone], options?.className]
    .filter(Boolean)
    .join(' ');
}

/** Suggested rotation when stacking many sections in one panel. */
export const SETTINGS_SECTION_TONE_SEQUENCE: readonly SettingsSectionTone[] = [
  'sky',
  'violet',
  'amber',
  'emerald',
  'blue',
  'slate',
] as const;
