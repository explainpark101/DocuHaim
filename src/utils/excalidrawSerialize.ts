/**
 * Serialize Excalidraw scene to vault JSON.
 * Import only from the lazy Excalidraw editor chunk.
 */

import { serializeAsJSON } from '@excalidraw/excalidraw';

type SerializeArgs = Parameters<typeof serializeAsJSON>;

/** Serialize scene via Excalidraw `serializeAsJSON(..., "local")`. */
export function serializeExcalidrawDocument(
  elements: SerializeArgs[0],
  appState: SerializeArgs[1],
  files: SerializeArgs[2] = {},
): string {
  return serializeAsJSON(elements, appState, files, 'local');
}
