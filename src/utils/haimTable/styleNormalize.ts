import type { HaimTableStyle } from '@/utils/haimTable/types';
import { STYLE_KEYS } from '@/utils/haimTable/types';

/** Hex color per docs/custom-markdown README shared rules. */
export function normalizeHexColor(raw: unknown): string | undefined {
  if (typeof raw !== 'string') return undefined;
  let s = raw.trim().toLowerCase();
  if (!s || s === 'transparent' || s === 'none') return undefined;
  if (!s.startsWith('#')) s = `#${s}`;
  if (/^#[0-9a-f]{3}$/.test(s)) {
    const r = s[1]!;
    const g = s[2]!;
    const b = s[3]!;
    return `#${r}${r}${g}${g}${b}${b}`;
  }
  if (/^#[0-9a-f]{6}$/.test(s) || /^#[0-9a-f]{8}$/.test(s)) return s;
  return undefined;
}

const FONT_SIZE_RE = /^\d+(\.\d+)?(px|%|em|rem|pt)?$/i;

export function normalizeFontSize(raw: unknown): string | undefined {
  if (typeof raw !== 'string' && typeof raw !== 'number') return undefined;
  let s = String(raw).trim();
  if (!s) return undefined;
  if (/^\d+(\.\d+)?$/.test(s)) s = `${s}px`;
  if (!FONT_SIZE_RE.test(s)) return undefined;
  return s;
}

export function normalizeFontWeight(raw: unknown): string | undefined {
  if (raw === 'normal' || raw === 'bold' || raw === 'bolder' || raw === 'lighter') {
    return raw;
  }
  if (typeof raw === 'number' && Number.isFinite(raw)) {
    const n = Math.min(900, Math.max(100, Math.round(raw)));
    return String(n);
  }
  if (typeof raw === 'string') {
    const t = raw.trim();
    if (!t) return undefined;
    if (t === 'normal' || t === 'bold' || t === 'bolder' || t === 'lighter') return t;
    const n = Number(t);
    if (Number.isFinite(n)) {
      return String(Math.min(900, Math.max(100, Math.round(n))));
    }
  }
  return undefined;
}

export function normalizeFontFamily(raw: unknown): string | undefined {
  if (typeof raw !== 'string') return undefined;
  const t = raw.trim();
  return t || undefined;
}

const SNAKE_TO_CAMEL: Record<string, keyof HaimTableStyle> = {
  background: 'bg',
  bg: 'bg',
  border_inner: 'borderInner',
  borderInner: 'borderInner',
  border_outer: 'borderOuter',
  borderOuter: 'borderOuter',
  color: 'color',
  font_family: 'fontFamily',
  fontFamily: 'fontFamily',
  font_size: 'fontSize',
  fontSize: 'fontSize',
  font_weight: 'fontWeight',
  fontWeight: 'fontWeight',
};

export function normalizeHaimTableStyle(raw: unknown): HaimTableStyle {
  if (!raw || typeof raw !== 'object') return {};
  const o = raw as Record<string, unknown>;
  const out: HaimTableStyle = {};

  for (const [k, v] of Object.entries(o)) {
    const camel = SNAKE_TO_CAMEL[k];
    if (!camel) continue;
    if (camel === 'bg' || camel === 'borderInner' || camel === 'borderOuter' || camel === 'color') {
      const hex = normalizeHexColor(v);
      if (hex) out[camel] = hex;
    } else if (camel === 'fontFamily') {
      const f = normalizeFontFamily(v);
      if (f) out.fontFamily = f;
    } else if (camel === 'fontSize') {
      const f = normalizeFontSize(v);
      if (f) out.fontSize = f;
    } else if (camel === 'fontWeight') {
      const f = normalizeFontWeight(v);
      if (f) out.fontWeight = f;
    }
  }
  return out;
}

/** Fill only missing keys from `source` into `target` (earlier / higher priority wins). */
export function mergeStylePreferExisting(
  target: HaimTableStyle,
  source: HaimTableStyle,
): HaimTableStyle {
  const out: HaimTableStyle = { ...target };
  for (const key of STYLE_KEYS) {
    if (out[key] === undefined && source[key] !== undefined) {
      out[key] = source[key];
    }
  }
  return out;
}

/** Later source overwrites (for cell overrides on top of section). */
export function mergeStyleOverwrite(
  base: HaimTableStyle,
  overlay: HaimTableStyle,
): HaimTableStyle {
  const out: HaimTableStyle = { ...base };
  for (const key of STYLE_KEYS) {
    if (overlay[key] !== undefined) out[key] = overlay[key];
  }
  return out;
}

export function styleToCss(style: HaimTableStyle, opts?: { includeOuterBorder?: boolean }): string {
  const parts: string[] = [];
  if (style.bg) parts.push(`background-color:${style.bg}`);
  if (style.color) parts.push(`color:${style.color}`);
  if (style.fontFamily) parts.push(`font-family:${style.fontFamily}`);
  if (style.fontSize) parts.push(`font-size:${style.fontSize}`);
  if (style.fontWeight) parts.push(`font-weight:${style.fontWeight}`);
  if (style.borderInner) {
    parts.push(`border-color:${style.borderInner}`);
    parts.push('border-style:solid');
    parts.push('border-width:1px');
  }
  if (opts?.includeOuterBorder && style.borderOuter) {
    parts.push(`outline:1px solid ${style.borderOuter}`);
  }
  return parts.length ? `${parts.join(';')};` : '';
}

export function styleToSnakeRecord(style: HaimTableStyle): Record<string, string> {
  const out: Record<string, string> = {};
  if (style.bg) out.background = style.bg;
  if (style.borderInner) out.border_inner = style.borderInner;
  if (style.borderOuter) out.border_outer = style.borderOuter;
  if (style.color) out.color = style.color;
  if (style.fontFamily) out.font_family = style.fontFamily;
  if (style.fontSize) out.font_size = style.fontSize;
  if (style.fontWeight) out.font_weight = style.fontWeight;
  return out;
}

export function isEmptyStyle(style: HaimTableStyle | undefined | null): boolean {
  if (!style) return true;
  return STYLE_KEYS.every((k) => style[k] === undefined);
}
