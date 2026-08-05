const HEX3 = /^[0-9a-fA-F]{3}$/;
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
  if (HEX6.test(hex) || HEX8.test(hex)) {
    return `#${hex.toLowerCase()}`;
  }
  return null;
}

export function cssHexToInputValue(raw: string | null | undefined): string {
  const normalized = normalizeCssHexColor(raw);
  if (!normalized) return '#ffffff';
  if (normalized.length === 9) return normalized.slice(0, 7);
  return normalized;
}
