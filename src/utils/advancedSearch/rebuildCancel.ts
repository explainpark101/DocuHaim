/** Cooperative cancel for Advanced Search rebuild. */

export class RebuildCancelledError extends Error {
  constructor() {
    super('REBUILD_CANCELLED');
    this.name = 'RebuildCancelledError';
  }
}

export function throwIfRebuildCancelled(
  isCancelled?: (() => boolean) | null,
): void {
  if (isCancelled?.()) {
    throw new RebuildCancelledError();
  }
}
