export type CoverPlaceMode =
  | { kind: 'text' }
  | { kind: 'image'; files: File[] }
  | null;

export function coverPlaceKind(
  mode: CoverPlaceMode,
): 'text' | 'image' | null {
  return mode?.kind ?? null;
}
