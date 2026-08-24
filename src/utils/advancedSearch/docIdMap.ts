/** Map string doc ids (file:/chat:) ↔ Lucivy numeric _node_id. */

export type DocIdMapState = {
  stringToNumeric: Map<string, number>;
  numericToString: Map<number, string>;
  nextNumericId: number;
};

export function emptyDocIdMap(nextNumericId = 1): DocIdMapState {
  return {
    stringToNumeric: new Map(),
    numericToString: new Map(),
    nextNumericId: Math.max(1, nextNumericId | 0),
  };
}

export function allocateNumericId(map: DocIdMapState, docId: string): number {
  const existing = map.stringToNumeric.get(docId);
  if (existing != null) return existing;
  const id = map.nextNumericId;
  map.nextNumericId = id + 1;
  map.stringToNumeric.set(docId, id);
  map.numericToString.set(id, docId);
  return id;
}

export function getNumericId(map: DocIdMapState, docId: string): number | null {
  return map.stringToNumeric.get(docId) ?? null;
}

export function getStringId(map: DocIdMapState, numericId: number): string | null {
  return map.numericToString.get(numericId) ?? null;
}

export function releaseDocId(map: DocIdMapState, docId: string): number | null {
  const numeric = map.stringToNumeric.get(docId);
  if (numeric == null) return null;
  map.stringToNumeric.delete(docId);
  map.numericToString.delete(numeric);
  return numeric;
}

export function hydrateDocIdMapFromDocs(
  docs: Map<string, { numericId?: number }>,
  nextNumericIdHint?: number,
): DocIdMapState {
  const map = emptyDocIdMap(nextNumericIdHint ?? 1);
  let maxId = 0;
  for (const [docId, meta] of docs) {
    const n = meta.numericId;
    if (typeof n !== 'number' || !Number.isFinite(n) || n < 1) continue;
    map.stringToNumeric.set(docId, n);
    map.numericToString.set(n, docId);
    if (n > maxId) maxId = n;
  }
  map.nextNumericId = Math.max(map.nextNumericId, maxId + 1);
  return map;
}

export function docIdMapToObject(map: DocIdMapState): {
  nextNumericId: number;
  entries: Record<string, number>;
} {
  const entries: Record<string, number> = {};
  for (const [docId, n] of map.stringToNumeric) {
    entries[docId] = n;
  }
  return { nextNumericId: map.nextNumericId, entries };
}

export function objectToDocIdMap(obj: {
  nextNumericId?: number;
  entries?: Record<string, number>;
} | null | undefined): DocIdMapState {
  const map = emptyDocIdMap(obj?.nextNumericId ?? 1);
  if (!obj?.entries) return map;
  let maxId = 0;
  for (const [docId, n] of Object.entries(obj.entries)) {
    if (typeof n !== 'number' || !Number.isFinite(n) || n < 1) continue;
    map.stringToNumeric.set(docId, n);
    map.numericToString.set(n, docId);
    if (n > maxId) maxId = n;
  }
  map.nextNumericId = Math.max(map.nextNumericId, maxId + 1);
  return map;
}
