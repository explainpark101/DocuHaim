import type { CoverShapeType } from '@/utils/noteCover/types';

export type CoverPlaceMode =
  | { kind: 'text' }
  | { kind: 'image'; files: File[] }
  | { kind: 'shape'; shapeType: CoverShapeType }
  | null;

export function coverPlaceKind(
  mode: CoverPlaceMode,
): 'text' | 'image' | 'shape' | null {
  return mode?.kind ?? null;
}
