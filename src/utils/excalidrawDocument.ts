/**
 * Excalidraw vault document (`.excalidraw`) — empty seed and parse.
 * Keep this module free of `@excalidraw/excalidraw` so create/open routing
 * does not pull the canvas package into the cold-load graph.
 * Serialization lives in `excalidrawSerialize.ts` (lazy editor only).
 */

export const EXCALIDRAW_DOCUMENT_TYPE = 'excalidraw' as const;
export const EXCALIDRAW_DOCUMENT_VERSION = 2 as const;

export type ExcalidrawSceneData = {
  elements: readonly unknown[];
  appState: Record<string, unknown>;
  files: Record<string, unknown>;
};

const EMPTY_APP_STATE: Record<string, unknown> = {
  viewBackgroundColor: '#ffffff',
  gridSize: null,
};

/** Minimal valid `.excalidraw` JSON string for CreateItem / new files. */
export function createEmptyExcalidrawDocument(): string {
  return JSON.stringify(
    {
      type: EXCALIDRAW_DOCUMENT_TYPE,
      version: EXCALIDRAW_DOCUMENT_VERSION,
      source: 'https://docuhaim.app',
      elements: [],
      appState: { ...EMPTY_APP_STATE },
      files: {},
    },
    null,
    2,
  );
}

function emptyScene(): ExcalidrawSceneData {
  return {
    elements: [],
    appState: { ...EMPTY_APP_STATE },
    files: {},
  };
}

/**
 * Parse vault string into scene props for `<Excalidraw initialData>`.
 * Invalid / empty input falls back to an empty scene (does not throw).
 */
export function parseExcalidrawDocument(raw: string): ExcalidrawSceneData {
  const text = String(raw ?? '').trim();
  if (!text) return emptyScene();

  try {
    const data = JSON.parse(text) as Record<string, unknown>;
    if (!data || typeof data !== 'object') return emptyScene();

    const elements = Array.isArray(data.elements) ? data.elements : [];
    const appState =
      data.appState && typeof data.appState === 'object'
        ? (data.appState as Record<string, unknown>)
        : { ...EMPTY_APP_STATE };
    const files =
      data.files && typeof data.files === 'object'
        ? (data.files as Record<string, unknown>)
        : {};

    return { elements, appState, files };
  } catch {
    return emptyScene();
  }
}
