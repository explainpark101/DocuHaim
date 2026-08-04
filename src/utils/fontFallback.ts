/** System UI stacks used when a primary font lacks a glyph. */
export const SYSTEM_SANS_FALLBACK =
  'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Apple SD Gothic Neo", "Malgun Gothic", "Noto Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';

export const SYSTEM_MONO_FALLBACK =
  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';

/** Tailwind / CSS array form of {@link SYSTEM_SANS_FALLBACK}. */
export const SYSTEM_SANS_FALLBACK_LIST = [
  'system-ui',
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  '"Apple SD Gothic Neo"',
  '"Malgun Gothic"',
  '"Noto Sans"',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
  '"Noto Color Emoji"',
] as const;

function quoteFontFamily(name: string): string {
  const trimmed = name.trim();
  if (/^["'].*["']$/.test(trimmed)) return trimmed;
  if (/[\s#()]/.test(trimmed)) return `"${trimmed.replace(/"/g, '')}"`;
  return trimmed;
}

/**
 * Append system fallbacks so unsupported glyphs fall back per character.
 * Leaves multi-family stacks and empty/`inherit` values unchanged.
 */
export function withFontFallback(
  font: string | null | undefined,
  kind: 'sans' | 'mono' = 'sans',
): string {
  const trimmed = String(font ?? '').trim();
  if (!trimmed || trimmed === 'inherit') return 'inherit';
  if (trimmed.includes(',')) return trimmed;

  const fallback = kind === 'mono' ? SYSTEM_MONO_FALLBACK : SYSTEM_SANS_FALLBACK;
  return `${quoteFontFamily(trimmed)}, ${fallback}`;
}
