import { SELF_GROUP } from './paths.js';

/** Hash-based HSL background for a group name. */
export function groupColor(name) {
  let h = 0;
  const s = String(name || '');
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return `hsl(${h % 360} 55% 42%)`;
}

export function isSelfGroupName(name) {
  return !name || name === SELF_GROUP;
}
