/**
 * Match CSS nth-child-like formulas for 1-based indices.
 * Supports: odd, even, N, An+B, An, n+B, -An+B
 */
export function matchesNth(formula: string | undefined | null, index1Based: number): boolean {
  if (formula == null) return false;
  const raw = String(formula).trim().toLowerCase();
  if (!raw) return false;

  if (raw === 'odd') return index1Based % 2 === 1;
  if (raw === 'even') return index1Based % 2 === 0;

  if (/^\d+$/.test(raw)) {
    return Number(raw) === index1Based;
  }

  // An+B / An-B / An / n+B / n-B / -n+B etc.
  const m = /^(-?\d*)n([+-]\d+)?$/.exec(raw);
  if (!m) return false;

  let a: number;
  if (m[1] === '' || m[1] === '+') a = 1;
  else if (m[1] === '-') a = -1;
  else a = Number(m[1]);

  const b = m[2] ? Number(m[2]) : 0;
  if (!Number.isFinite(a) || !Number.isFinite(b)) return false;

  if (a === 0) return index1Based === b;

  // index = a*n + b for integer n >= 0 (CSS nth-child semantics for positive a)
  if (a > 0) {
    if (index1Based < b) return false;
    return (index1Based - b) % a === 0;
  }

  // a < 0: n = 0,1,2,... while index > 0
  for (let n = 0; n < 1000; n += 1) {
    const v = a * n + b;
    if (v === index1Based) return true;
    if (v <= 0 && n > 0) break;
  }
  return false;
}
