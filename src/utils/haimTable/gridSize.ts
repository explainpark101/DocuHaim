import { normalizeHaimTableBoxSize } from '@/utils/haimTable/layout';

/** Sparse or dense list of CSS sizes; empty / null slots = auto. */
export type HaimTableSizeList = Array<string | null | undefined>;

export function normalizeHaimTableSizeList(raw: unknown): string[] | undefined {
  if (!Array.isArray(raw)) return undefined;
  const out: string[] = [];
  let any = false;
  for (let i = 0; i < raw.length; i += 1) {
    const v = normalizeHaimTableBoxSize(raw[i]);
    out[i] = v ?? '';
    if (v) any = true;
  }
  if (!any) return undefined;
  // Normalize empty slots to '' for stable serialize (omit trailing empties)
  while (out.length && !out[out.length - 1]) out.pop();
  return out.length ? out.map((s) => s || '') : undefined;
}

/** Compact for JSON: drop trailing empty; use null for holes when serializing? Keep '' as omit in sparse form. */
export function serializeSizeList(list: string[] | undefined): Array<string | null> | undefined {
  if (!list?.length) return undefined;
  const out: Array<string | null> = list.map((s) => (s && s.trim() ? s : null));
  while (out.length && out[out.length - 1] == null) out.pop();
  return out.length ? out : undefined;
}

export function sizeAt(list: string[] | undefined, index: number): string | undefined {
  const v = list?.[index];
  return v && v.trim() ? v : undefined;
}

export function setSizeAt(
  list: string[] | undefined,
  index: number,
  sizePx: number,
): string[] {
  const next = [...(list ?? [])];
  while (next.length <= index) next.push('');
  next[index] = `${Math.max(24, Math.round(sizePx))}px`;
  return next;
}

export function insertSizeSlot(list: string[] | undefined, index: number): string[] | undefined {
  if (!list?.length) return list;
  const next = [...list];
  while (next.length < index) next.push('');
  next.splice(index, 0, '');
  return next;
}

export function removeSizeSlot(list: string[] | undefined, index: number): string[] | undefined {
  if (!list?.length) return list;
  if (index < 0 || index >= list.length) return list;
  const next = [...list];
  next.splice(index, 1);
  while (next.length && !next[next.length - 1]) next.pop();
  return next.length ? next : undefined;
}

export function appendGridSizeCss(
  existing: string | null | undefined,
  extra: string,
): string {
  const prev = (existing || '').trim();
  const add = extra.trim();
  if (!add) return prev;
  if (!prev) return add.endsWith(';') ? add : `${add};`;
  const base = prev.endsWith(';') ? prev : `${prev};`;
  return `${base}${add.endsWith(';') ? add : `${add};`}`;
}
