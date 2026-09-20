/**
 * In-session scroll memory for markdown editors (split panes / tab remounts).
 * Keyed by `type:path` so positions survive pane focus changes and remounts.
 */

export type EditorScrollSnapshot = {
  editorTop: number;
  editorLeft: number;
  previewTop: number;
  previewLeft: number;
};

const memory = new Map<string, EditorScrollSnapshot>();

export function editorScrollMemoryKeyFromFile(
  currentFile: { type?: string; id?: string } | null | undefined,
): string | null {
  if (!currentFile?.id || !currentFile?.type) return null;
  return `${currentFile.type}:${currentFile.id}`;
}

export function rememberEditorScroll(key: string, snap: EditorScrollSnapshot): void {
  if (!key) return;
  memory.set(key, {
    editorTop: Number.isFinite(snap.editorTop) ? snap.editorTop : 0,
    editorLeft: Number.isFinite(snap.editorLeft) ? snap.editorLeft : 0,
    previewTop: Number.isFinite(snap.previewTop) ? snap.previewTop : 0,
    previewLeft: Number.isFinite(snap.previewLeft) ? snap.previewLeft : 0,
  });
}

export function recallEditorScroll(key: string): EditorScrollSnapshot | null {
  if (!key) return null;
  return memory.get(key) ?? null;
}

export function clearEditorScroll(key: string): void {
  if (!key) return;
  memory.delete(key);
}

/** Test helper — wipe all remembered positions. */
export function clearAllEditorScrollMemory(): void {
  memory.clear();
}
