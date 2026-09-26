/**
 * Perf / architecture checklist for Haim Editor (manual + CI smoke).
 *
 * - NoteEditorSurface must lazy-import only the selected engine.
 * - Dual mode mounts HaimSourcePane only when viewMode === dual.
 * - useHaimDualSync debounces TipTap↔CM; origin tags block feedback loops.
 * - getCachedMarkdown skips serialize when JSON identity unchanged.
 * - vite manualChunks: vendor-tiptap separate from vendor-md-editor.
 * - Frozen panes use MarkdownPreviewSurface (no TipTap) when demoted.
 */

export const HAIM_PERF_CHECKLIST = [
  'lazy-engine-isolation',
  'dual-lazy-cm',
  'dual-debounce-origin',
  'markdown-serialize-cache',
  'vendor-tiptap-chunk',
  'freeze-demote-preview-surface',
] as const;
