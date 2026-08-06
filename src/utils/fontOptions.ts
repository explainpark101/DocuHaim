import { getCachedWebfontFamilyNames } from '@/utils/webfontSettingsStore';

/** Built-in / common font-family suggestions for FontFamilyInput. */
export const BASE_FONT_FAMILY_OPTIONS: readonly string[] = [
  'Paperozi',
  'A2z',
  'D2Coding',
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

/** Merge base + user webfonts (+ optional extras), de-duplicated. */
export function buildFontFamilyOptions(extra: readonly string[] = []): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const name of [...extra, ...getCachedWebfontFamilyNames(), ...BASE_FONT_FAMILY_OPTIONS]) {
    const trimmed = name.trim();
    if (!trimmed) continue;
    const key = trimmed.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(trimmed);
  }
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
