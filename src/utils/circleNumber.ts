/** Unicode circled digit for 0–50; falls back to plain decimal outside range. */
export function toCircledNumber(n: number): string {
  if (!Number.isFinite(n)) return String(n);
  const value = Math.trunc(n);
  if (value === 0) return '\u24EA'; // ⓪
  if (value >= 1 && value <= 20) return String.fromCodePoint(0x2460 + value - 1); // ①–⑳
  if (value >= 21 && value <= 35) return String.fromCodePoint(0x3251 + value - 21); // ㉑–㉟
  if (value >= 36 && value <= 50) return String.fromCodePoint(0x32b1 + value - 36); // ㊱–㊿
  return String(value);
}

/** Default range offered in Advanced Search circle-number picker. */
export const CIRCLE_NUMBER_PICKER_MIN = 1;
export const CIRCLE_NUMBER_PICKER_MAX = 50;
