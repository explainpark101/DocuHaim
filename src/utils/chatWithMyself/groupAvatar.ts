import { SELF_GROUP } from '@/utils/chatWithMyself/paths';

/** Hash-based HSL background for a stable group key (prefer id). */
export function groupColor(key: any) {
  let h = 0;
  const s = String(key || '');
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return `hsl(${h % 360} 55% 42%)`;
}

export function isSelfGroupName(name: any) {
  return !name || name === SELF_GROUP;
}
