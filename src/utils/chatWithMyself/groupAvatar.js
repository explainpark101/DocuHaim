import { SELF_GROUP } from './paths.js';

/** Hash-based HSL background for a stable group key (prefer id). */
export function groupColor(key) {
  let h = 0;
  const s = String(key || '');
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return `hsl(${h % 360} 55% 42%)`;
}

export function isSelfGroupName(name) {
  return !name || name === SELF_GROUP;
}
