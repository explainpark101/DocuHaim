const HEX3 = /^[0-9a-fA-F]{3}$/;
const HEX4 = /^[0-9a-fA-F]{4}$/;
const HEX6 = /^[0-9a-fA-F]{6}$/;
const HEX8 = /^[0-9a-fA-F]{8}$/;

/**
 * Normalize a user/CSS color to `#rrggbb` or `#rrggbbaa`.
 * Rejects anything that is not a safe hex value (no css injection).
 */
export function normalizeCssHexColor(raw: string | null | undefined): string | null {
  const value = String(raw ?? '').trim();
  if (!value) return null;
  const lower = value.toLowerCase();
  if (lower === 'none' || lower === 'transparent') return null;
  const hex = value.startsWith('#') ? value.slice(1) : value;
  if (HEX3.test(hex)) {
    const a = hex.charAt(0);
    const b = hex.charAt(1);
    const c = hex.charAt(2);
    return `#${a}${a}${b}${b}${c}${c}`.toLowerCase();
  }
  if (HEX4.test(hex)) {
    const r = hex.charAt(0);
    const g = hex.charAt(1);
    const b = hex.charAt(2);
    const a = hex.charAt(3);
    return `#${r}${r}${g}${g}${b}${b}${a}${a}`.toLowerCase();
  }
  if (HEX6.test(hex)) {
    return `#${hex.toLowerCase()}`;
  }
  if (HEX8.test(hex)) {
    const lower = hex.toLowerCase();
    // Opaque alpha → prefer #rrggbb for stable comparisons / presets
    if (lower.endsWith('ff')) return `#${lower.slice(0, 6)}`;
    return `#${lower}`;
  }
  return null;
}

/** Value for HexAlphaColorPicker / HexColorInput (always `#rrggbb` or `#rrggbbaa`). */
export function cssHexToInputValue(raw: string | null | undefined): string {
  const normalized = normalizeCssHexColor(raw);
  if (!normalized) return '#ffffffff';
  return normalized;
}

export const CSS_HEX_CHECKER_STYLE = {
  backgroundImage:
    'linear-gradient(45deg,#d4d4d4 25%,transparent 25%),linear-gradient(-45deg,#d4d4d4 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#d4d4d4 75%),linear-gradient(-45deg,transparent 75%,#d4d4d4 75%)',
  backgroundSize: '6px 6px',
  backgroundPosition: '0 0,0 3px,3px -3px,-3px 0',
} as const;
