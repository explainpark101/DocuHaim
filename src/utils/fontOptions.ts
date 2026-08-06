import { getCachedWebfontFamilyNames } from '@/utils/webfontSettingsStore';

/**
 * App-bundled webfonts (index.css + BUILTIN_WEBFONT_ENTRIES).
 * Always listed first in FontFamilyInput.
 */
export const APP_BUILTIN_FONT_FAMILY_OPTIONS: readonly string[] = [
  'Paperozi',
  'A2z',
  'D2Coding',
  'KoPub Dotum',
  'KoPub Batang',
  'JoseonShinmyeongjo',
];

/**
 * Common system / generic font-family suggestions (after app + user webfonts).
 */
export const SYSTEM_FONT_FAMILY_OPTIONS: readonly string[] = [
  'Georgia',
  'Times New Roman',
  'Palatino Linotype',
  'Garamond',
  'Noto Sans KR',
  'Noto Serif KR',
  'Nanum Gothic',
  'Nanum Myeongjo',
  'Malgun Gothic',
  'Apple SD Gothic Neo',
  'system-ui',
  'sans-serif',
  'serif',
  'monospace',
  'Consolas',
  'Monaco',
  'Menlo',
  'Courier New',
  'Source Code Pro',
  'Fira Code',
];

/** @deprecated Prefer APP_BUILTIN + SYSTEM; kept as concat for older imports. */
export const BASE_FONT_FAMILY_OPTIONS: readonly string[] = [
  ...APP_BUILTIN_FONT_FAMILY_OPTIONS,
  ...SYSTEM_FONT_FAMILY_OPTIONS,
];

/**
 * Font-family suggestions in order:
 * 1) app built-ins (Paperozi / A2z / D2Coding / KoPub / JoseonShinmyeongjo)
 * 2) user webfonts from vault
 * 3) system / generic fonts
 * 4) optional extras
 */
export function buildFontFamilyOptions(extra: readonly string[] = []): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  const push = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const key = trimmed.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    out.push(trimmed);
  };

  for (const name of APP_BUILTIN_FONT_FAMILY_OPTIONS) push(name);
  for (const name of getCachedWebfontFamilyNames()) push(name);
  for (const name of SYSTEM_FONT_FAMILY_OPTIONS) push(name);
  for (const name of extra) push(name);
  return out;
}

export const COVER_FONT_WEIGHT_OPTIONS: readonly {
  value: string;
  label: string;
}[] = [
  { value: '100', label: '100 Thin' },
  { value: '200', label: '200 Extra Light' },
  { value: '300', label: '300 Light' },
  { value: '400', label: '400 Regular' },
  { value: '500', label: '500 Medium' },
  { value: '600', label: '600 Semi Bold' },
  { value: '700', label: '700 Bold' },
  { value: '800', label: '800 Extra Bold' },
  { value: '900', label: '900 Black' },
];

export function coverFontWeightToSelectValue(
  weight: number | 'normal' | 'bold' | undefined,
): string {
  if (weight === 'bold') return '700';
  if (weight === 'normal' || weight == null) return '400';
  if (typeof weight === 'number' && Number.isFinite(weight)) {
    const stepped = Math.min(900, Math.max(100, Math.round(weight / 100) * 100));
    return String(stepped);
  }
  return '400';
}

export function selectValueToCoverFontWeight(
  value: string,
): number | 'normal' | 'bold' {
  if (value === 'normal') return 'normal';
  if (value === 'bold') return 'bold';
  const n = Number(value);
  if (!Number.isFinite(n)) return 'normal';
  return Math.min(900, Math.max(100, Math.round(n)));
}
